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
//	rootPackage := "libxml"
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
	templatePath := "src/tritium/doc/definition.html.got"
	docTemplate, err := docTemplate.ParseFile(templatePath)

	if err != nil {
		panic("Couldn't parse template :" + templatePath)
	}
	
	docs := make([]byte,0)

	for _, scopeType := range(d.Definitions) {

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

func (d *DefinitionList) generatePackageDocs(name string) { //(definitions []*FunctionDefinition) {
	pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
	pkg.Load(name)

	for tindex, ttype := range(pkg.Types) {
		ttypeString := proto.GetString(ttype.Name)

		for _, fun := range(pkg.Functions) {
			stub := FuncStub(pkg.Package, fun)

			// STACK: Im keying on the stub w contains the return/yield types, which won't match across inheritance
			// If I just use the call pattern ... it might work (although arg types can be inherited too ...)


			if tindex == int(proto.GetInt32(fun.ScopeTypeId)) && d.Definitions[ttypeString][stub] == nil{
				function := &FunctionDefinition{
				Name: proto.GetString(fun.Name),
				Description: "... descriptions coming soon ...",
				ParentScope: ttypeString,
				Body: ".",
				ReturnType: ".",
				YieldType: ".",
				Stub: ".",
				PackageName: name,
				}
				function.setID()

				// Description / Examples will come when we can look at comment nodes

				function.Stub = stub
				segments := strings.Split(function.Stub,")")
				
				function.CallPattern = segments[0] + ")"

				function.ReturnType = fun.ReturnTypeString(pkg.Package)
				function.YieldType = fun.OpensTypeString(pkg.Package)

				println("Getting body for function: " + stub + " from package : " + name)
				ancestralScope, ancestralStub := d.findAncestralFunction(pkg.Package, fun)
				
				if ancestralScope != nil {
					println("Found ancestral function in scope:" + *ancestralScope)
					ancestralFunction := d.Definitions[*ancestralScope][*ancestralStub]

					d.Definitions[*ancestralScope][*ancestralStub] = nil, false // Delete it
					if d.Definitions[*ancestralScope][*ancestralStub] != nil {
						panic("Didn't delete ancestral definition")
					} else {
						println("Deleted ancestral function: " + *ancestralStub)
					}

					println("Loading body from package:" + ancestralFunction.PackageName)
					function.Body = getBody(ancestralFunction.PackageName, fun)
				} else {
					function.Body = getBody(name, fun)
				}

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
			start = int(proto.GetInt32(fun.Instruction.Children[0].LineNumber))

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
			println("")
			return ""
		}
	} else {
		println("")
		return "  [native function]"
	}

	fmt.Printf(" : lines [%d,%d]\n", start, end)


	data, err := ioutil.ReadFile("packages/" + name + "/functions.ts")
	if err != nil {
		panic("Couldnt find functions file for " + name)
	}

	lines := strings.Split(string(data), "\n")
	body = strings.Join(lines[start-1:end+depth], "\n")

	return
}