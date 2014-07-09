package doc

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"sort"
	"strings"
	"text/template"
)

import (
	"tritium/dependencies/butler/null"
	yaml "goyaml"
	"tritium/packager"
	tp "tritium/proto"
	"tritium/constants"
)

func Process(pkg *tp.Package) string {
	for tindex, ttype := range pkg.Types {
		ttypeString := null.GetString(ttype.Name)
		println()
		for _, fun := range pkg.Functions {
			if tindex == int(null.GetInt32(fun.ScopeTypeId)) {
				println(ttypeString + "." + FuncStub(pkg, fun))
			}
		}
	}
	return ""
}

func FuncStub(pkg *tp.Package, fun *tp.Function) string {
	name := null.GetString(fun.Name)
	args := ""
	for _, arg := range fun.Args {
		t := pkg.Types[int(null.GetInt32(arg.TypeId))]
		argName := null.GetString(t.Name)
		argName = argName + " %" + null.GetString(arg.Name)
		args = args + ", " + argName
	}
	if len(args) > 1 {
		args = args[2:]
	}
	returnVal := name + "(" + args + ") " + fun.ReturnTypeString(pkg) + " "
	opens := fun.OpensTypeString(pkg)
	if opens != "Base" {
		returnVal = returnVal + opens
	}
	return returnVal
}

type FunctionDefinition struct {
	Name        string
	CallPattern string
	Description string
	Stub        string
	ShortStub   string
	ReturnType  string
	YieldType   string
	ParentScope string
	Body        string
	ID          string
	PackageName string
}

type DefinitionList struct {
	// Key on parent-scope-type and function-stub
	Definitions map[string]map[string]*FunctionDefinition
}

func (f *FunctionDefinition) setID() {
	f.ID = f.ParentScope + ":" + f.Name
}

func Generate(outputFile string) {
	// Need to define packages in order of dependence
	packages := []string{"base", "node", "url", "libxml", "tritium"}

	definitions := &DefinitionList{
		Definitions: make(map[string]map[string]*FunctionDefinition),
	}

	for _, packageName := range packages {
		definitions.generatePackageDocs(packageName)
	}

	docs := RenderDocumentation(definitions)

	err := ioutil.WriteFile(outputFile, docs, 0666)
	if err != nil {
		panic("Couldn't write doc file:\n" + err.Error())
	}
}

func RenderDocumentationAsYaml(d *DefinitionList) []byte {
	docs, err := yaml.Marshal(&d)
	if err != nil {
		panic("Couldn't create YAML of Tritium spec: " + err.Error())
	}
	return docs
}

func RenderDocumentation(d *DefinitionList) []byte {
	docTemplate := template.New("tritium-docs")
	templatePath := "src/tritium/doc/definition.haml.got"
	docTemplate, err := docTemplate.ParseFiles(templatePath)

	if err != nil {
		panic("Couldn't parse template :" + templatePath)
	}

	docs := make([]byte, 0)

	offset := "  "
	docs = append(docs, []byte("%div#header\n")...)

	sortedScopes, sortedDefinitions := d.SortKeys()

	for _, scopeName := range sortedScopes {
		definitions := d.Definitions[scopeName]

		docs = append(docs, []byte(offset+"%h3 "+scopeName+"\n")...)

		for _, definitionKey := range sortedDefinitions[scopeName] {
			definition := definitions[definitionKey]
			link := fmt.Sprintf(offset+"%%a(href='#%v') %v\n", definition.ID, definition.ShortStub)
			docs = append(docs, []byte(link)...)
		}
	}

	docs = append(docs, []byte("%div#content\n")...)

	for _, scopeName := range sortedScopes {
		docs = append(docs, []byte(offset+"%h2 "+scopeName+"\n")...)
		definitions := d.Definitions[scopeName]

		for _, definitionKey := range sortedDefinitions[scopeName] {
			definition := definitions[definitionKey]
			var definitionDoc bytes.Buffer

			//fmt.Printf("This defn: %v\n", definition)

			err := docTemplate.Execute(&definitionDoc, definition)

			if err != nil {
				panic(fmt.Sprintf("Error rendering template w defintion: %v\n", definition))
			}

			definitionBytes := definitionDoc.Bytes()
			docs = append(docs, definitionBytes...)
		}
	}

	return docs
}

func ShortFuncStub(pkg *tp.Package, fun *tp.Function) string {
	name := null.GetString(fun.Name)
	args := ""
	for _, arg := range fun.Args {
		t := pkg.Types[int(null.GetInt32(arg.TypeId))]
		argName := null.GetString(t.Name)
		argName = argName
		args = args + ", " + argName
	}
	if len(args) > 1 {
		args = args[2:]
	}
	returnVal := name + "(" + args + ")"
	return returnVal
}

func (d *DefinitionList) generatePackageDocs(name string) {
	options := packager.BuildOptions()
	options["generate_docs"] = true
	pkg := packager.NewPackage(packager.DefaultPackagePath, options)
	pkg.Load(name)

	for tindex, ttype := range pkg.Types {
		ttypeString := null.GetString(ttype.Name)

		for _, fun := range pkg.Functions {
			stub := FuncStub(pkg.Package, fun)

			if tindex == int(null.GetInt32(fun.ScopeTypeId)) && d.Definitions[ttypeString][stub] == nil {

				function := &FunctionDefinition{
					Name:        null.GetString(fun.Name),
					ParentScope: ttypeString,
					ShortStub:   ShortFuncStub(pkg.Package, fun),
					PackageName: name,
				}
				function.setID()
				description := null.GetString(fun.Description)

				if len(description) > 0 {
					lines := make([]string, 0)

					// Trim the description. Haml doesn't like extra new lines
					for _, line := range strings.Split(description, "\n") {
						if len(strings.TrimLeft(line, " \r\n")) > 0 {
							lines = append(lines, line)
						}
					}

					//function.Description = description

					// Hacky ... I need a way to specify the indent level to play nice w haml:
					function.Description = strings.Join(lines, "\n        ")
				}

				// Description / Examples will come when we can look at comment nodes

				function.Stub = stub
				segments := strings.Split(function.Stub, ")")

				function.CallPattern = segments[0] + ")"

				function.ReturnType = fun.ReturnTypeString(pkg.Package)
				function.YieldType = fun.OpensTypeString(pkg.Package)

				//println("Getting body for function: " + stub + " from package : " + name)
				ancestralScope, ancestralStub := d.findAncestralFunction(pkg.Package, fun)

				if ancestralScope != nil {
					//println("Found ancestral function in scope:" + *ancestralScope)
					ancestralFunction := d.Definitions[*ancestralScope][*ancestralStub]

					delete(d.Definitions[*ancestralScope], *ancestralStub) // Delete it

					//println("Loading body from package:" + ancestralFunction.PackageName)
					function.Body = getBody(ancestralFunction.PackageName, fun)
				} else {
					function.Body = getBody(name, fun)
				}

				// Hacky ... I need a way to specify the indent level for the body text to play nice w haml:
				function.Body = strings.Join(strings.Split(function.Body, "\n"), "\n            ")

				if d.Definitions[ttypeString] == nil {
					d.Definitions[ttypeString] = make(map[string]*FunctionDefinition)
				}
				d.Definitions[ttypeString][stub] = function
			}
		}
	}

	return
}

func (d *DefinitionList) findAncestralFunction(pkg *tp.Package, fun *tp.Function) (scopeName *string, ancestralStub *string) {

	ancestralStub = ancestralFuncStub(pkg, fun)

	if ancestralStub == nil {
		return nil, nil
	}

	for scopeName, scopeType := range d.Definitions {
		if scopeType[*ancestralStub] != nil && scopeName != "Base" {
			return &scopeName, ancestralStub
		}
	}

	return
}

func ancestralFuncStub(pkg *tp.Package, fun *tp.Function) *string {
	foundAncestor := false

	name := null.GetString(fun.Name)
	args := ""
	for _, arg := range fun.Args {
		argType := null.GetInt32(arg.TypeId)
		ancestralArgType := FindAncestralType(pkg, argType)

		if ancestralArgType != -1 {
			foundAncestor = true
			argType = ancestralArgType
		}

		argTypeString := pkg.GetTypeName(argType)

		argName := argTypeString
		argName = argName + " %" + null.GetString(arg.Name)
		args = args + ", " + argName
	}
	if len(args) > 1 {
		args = args[2:]
	}

	returnType := null.GetInt32(fun.ReturnTypeId)
	ancestralReturnType := FindAncestralType(pkg, returnType)

	if ancestralReturnType != -1 {
		foundAncestor = true
		returnType = ancestralReturnType
	}

	returnTypeString := pkg.GetTypeName(returnType)
	returnVal := name + "(" + args + ") " + returnTypeString + " "

	opensType := null.GetInt32(fun.OpensTypeId)
	ancestralOpensType := FindAncestralType(pkg, opensType)

	if ancestralOpensType != -1 {
		foundAncestor = true
		opensType = ancestralOpensType
	}

	opensTypeString := pkg.GetTypeName(opensType)

	if opensTypeString != "Base" {
		returnVal = returnVal + opensTypeString
	}

	if foundAncestor {
		return &returnVal
	}
	return nil

}

func FindAncestralType(pkg *tp.Package, thisType int32) int32 {
	someType := pkg.Types[thisType]

	implements := null.GetInt32(someType.Implements)
	if implements != 0 {
		return implements
	}

	return -1
}

func getBody(name string, fun *tp.Function) (body string) {
	var start int
	var end int
	depth := 0

	if fun.Instruction != nil {
		if len(fun.Instruction.Children) > 0 {
			for _, instruction := range fun.Instruction.Children {
				if *instruction.Type != constants.Instruction_TEXT {
					start = int(null.GetInt32(instruction.LineNumber))
					break
				}
			}

			done := false
			thisInstruction := fun.Instruction.Children[len(fun.Instruction.Children)-1]

			for !done {
				if len(thisInstruction.Children) > 0 {
					thisInstruction = thisInstruction.Children[len(thisInstruction.Children)-1]
					depth += 1
				} else {
					done = true
					end = int(null.GetInt32(thisInstruction.LineNumber))
				}
			}

		} else {
			return ""
		}
	} else {
		return "  [native function]"
	}

	data, err := ioutil.ReadFile("packages/" + name + "/functions.ts")
	if err != nil {
		panic("Couldnt find functions file for " + name)
	}

	lines := strings.Split(string(data), "\n")
	body = strings.Join(lines[start-1:end+depth], "\n")

	return
}

func (dl *DefinitionList) SortKeys() (sortedScopes []string, sortedDefinitions map[string][]string) {

	sortedScopes = make([]string, len(dl.Definitions))
	sortedDefinitions = make(map[string][]string)

	index := 0
	for scopeName, _ := range dl.Definitions {
		sortedScopes[index] = scopeName
		index += 1
	}

	sort.Strings(sortedScopes)

	for _, scopeName := range sortedScopes {
		scopeDefinitions := dl.Definitions[scopeName]
		sortedScopeDefinitions := make([]string, len(scopeDefinitions))

		index := 0
		for definitionKey, _ := range scopeDefinitions {
			sortedScopeDefinitions[index] = definitionKey
			index += 1
		}

		sort.Strings(sortedScopeDefinitions)
		sortedDefinitions[scopeName] = sortedScopeDefinitions
	}

	return
}
