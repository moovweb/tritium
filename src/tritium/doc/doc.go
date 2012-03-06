package doc;

import(
	tp "athena/src/athena/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	"tritium/src/tritium/packager"
	"fmt"
	"io/ioutil"
	"strings"
	"bytes"
	"template"
)



func Process(pkg *tp.Package) string {
	for tindex, ttype := range(pkg.Types) {
		ttypeString := proto.GetString(ttype.Name)
		println()
		for _, fun := range(pkg.Functions) {
			if tindex == int(proto.GetInt32(fun.ScopeTypeId)) {
				println(ttypeString + "." + FuncStub(pkg, fun))
			}
		}
	}
	return ""
}

func FuncStub(pkg *tp.Package, fun *tp.Function) string {
	name := proto.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		t := pkg.Types[int(proto.GetInt32(arg.TypeId))]
		argName := proto.GetString(t.Name)
		argName = argName + " %" + proto.GetString(arg.Name)
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
	Name string
	CallPattern string
	Description string
	Stub string
	ShortStub string
	ReturnType string
	YieldType string
	ParentScope string
	Body string
	ID string
	PackageName string
}

type DefinitionList struct {
	// Key on parent-scope-type and function-stub
	Definitions map[string]map[string]*FunctionDefinition
}

func (f *FunctionDefinition) setID() {
	f.ID = f.ParentScope + ":" + f.Name
}

func Generate(outputFile string){
	// Need to define packages in order of dependence
	packages := []string{"base", "node", "libxml"}

	definitions := &DefinitionList{
	Definitions: make(map[string]map[string]*FunctionDefinition),
	}

	for _, packageName := range(packages) {
		definitions.generatePackageDocs(packageName)
	}

	docs := RenderDocumentation(definitions)

	err := ioutil.WriteFile(outputFile, docs, uint32(0666) )
	if err != nil {
		panic("Couldn't write doc file:\n" + err.String())
	}
}

func RenderDocumentation(d *DefinitionList) ([]byte) {
	docTemplate := template.New("tritium-docs")
	templatePath := "src/tritium/doc/definition.haml.got"
	docTemplate, err := docTemplate.ParseFile(templatePath)

	if err != nil {
		panic("Couldn't parse template :" + templatePath)
	}
	
	docs := make([]byte,0)

	offset := "  "
	docs = append(docs, []byte("%div#header\n")...)	
	for scopeName, scopeType := range(d.Definitions) {
		docs = append(docs, []byte(offset + "%h3 " + scopeName + "\n")...)			
		for _, definition := range(scopeType) {
			link := fmt.Sprintf(offset + "%%a(href='#%v') %v\n", definition.ID, definition.ShortStub)
			docs = append(docs, []byte(link)...)
		}
	}

	docs = append(docs, []byte("%div#content\n")...)
	for scopeName, scopeType := range(d.Definitions) {
		docs = append(docs, []byte(offset + "%h2 " + scopeName + "\n")...)

		for _, definition := range(scopeType) {
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
	name := proto.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		t := pkg.Types[int(proto.GetInt32(arg.TypeId))]
		argName := proto.GetString(t.Name)
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

	for tindex, ttype := range(pkg.Types) {
		ttypeString := proto.GetString(ttype.Name)

		for _, fun := range(pkg.Functions) {
			stub := FuncStub(pkg.Package, fun)

			if tindex == int(proto.GetInt32(fun.ScopeTypeId)) && d.Definitions[ttypeString][stub] == nil{

				function := &FunctionDefinition{
				Name: proto.GetString(fun.Name),
				ParentScope: ttypeString,
				ShortStub: ShortFuncStub(pkg.Package, fun),
				PackageName: name,
				}
				function.setID()
				description := proto.GetString(fun.Description)

				if len(description) > 0 {
					function.Description = description
				}

				// Description / Examples will come when we can look at comment nodes

				function.Stub = stub
				segments := strings.Split(function.Stub,")")
				
				function.CallPattern = segments[0] + ")"

				function.ReturnType = fun.ReturnTypeString(pkg.Package)
				function.YieldType = fun.OpensTypeString(pkg.Package)

				//println("Getting body for function: " + stub + " from package : " + name)
				ancestralScope, ancestralStub := d.findAncestralFunction(pkg.Package, fun)
				
				if ancestralScope != nil {
					//println("Found ancestral function in scope:" + *ancestralScope)
					ancestralFunction := d.Definitions[*ancestralScope][*ancestralStub]

					d.Definitions[*ancestralScope][*ancestralStub] = nil, false // Delete it

					//println("Loading body from package:" + ancestralFunction.PackageName)
					function.Body = getBody(ancestralFunction.PackageName, fun)
				} else {
					function.Body = getBody(name, fun)
				}

				// Hacky ... I need a way to specify the indent level for the body text to play nice w haml:
				function.Body = strings.Join(strings.Split(function.Body,"\n"), "\n              ")

				if d.Definitions[ttypeString] == nil {
					d.Definitions[ttypeString] = make(map[string]*FunctionDefinition)
				}
				d.Definitions[ttypeString][stub] = function
			}
		}
	}

	return
}

func (d *DefinitionList) findAncestralFunction(pkg *tp.Package, fun *tp.Function) (scopeName *string, ancestralStub *string){

	ancestralStub = ancestralFuncStub(pkg, fun)

	if ancestralStub == nil {
		return nil, nil
	}

	for scopeName, scopeType := range(d.Definitions) {
		if scopeType[*ancestralStub] != nil && scopeName != "Base" {
			return &scopeName, ancestralStub
		}
	}

	return 
}

func ancestralFuncStub(pkg *tp.Package, fun *tp.Function) *string {
	foundAncestor := false


	name := proto.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		argType := proto.GetInt32(arg.TypeId)
		ancestralArgType := FindAncestralType(pkg, argType)

		if ancestralArgType != -1 {
			foundAncestor = true
			argType = ancestralArgType
		}

		argTypeString := pkg.GetTypeName(argType)
		
		argName := argTypeString
		argName = argName + " %" + proto.GetString(arg.Name)
		args = args + ", " + argName
	}
	if len(args) > 1 {
		args = args[2:]
	}

	returnType := proto.GetInt32(fun.ReturnTypeId)
	ancestralReturnType := FindAncestralType(pkg, returnType)

	if ancestralReturnType != -1 {
		foundAncestor = true
		returnType = ancestralReturnType
	}

	returnTypeString := pkg.GetTypeName(returnType)
	returnVal := name + "(" + args + ") " + returnTypeString + " " 

	opensType := proto.GetInt32(fun.OpensTypeId)
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

	implements := proto.GetInt32(someType.Implements)
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
			for _, instruction := range(fun.Instruction.Children) {
				if *instruction.Type != tp.Instruction_TEXT {
					start = int(proto.GetInt32(instruction.LineNumber))
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
					end = int(proto.GetInt32(thisInstruction.LineNumber))
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