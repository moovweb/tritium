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
}

func (f *FunctionDefinition) getID() (string) {
	return f.ParentScope + ":" + f.Name
}

func Generate(outputFile string){
//	rootPackage := "libxml"
	rootPackage := "base"
	definitions := generatePackageDocs(rootPackage)

	docTemplate := template.New(rootPackage)
	templatePath := "src/tritium/doc/definition.html.got"
	docTemplate, err := docTemplate.ParseFile(templatePath)

	if err != nil {
		panic("Couldn't parse template :" + templatePath)
	}
	
	docs := make([]byte,0)

	for _, definition := range(definitions) {
		var definitionDoc bytes.Buffer

		fmt.Printf("This defn: %v\n", definition)

		err := docTemplate.Execute(&definitionDoc, definition)

		if err != nil {
			panic(fmt.Sprintf("Error rendering template w defintion: %v\n", definition))
		}

		definitionBytes := definitionDoc.Bytes()
		docs = append(docs, definitionBytes...)
	}

	println("DOCS")

	err = ioutil.WriteFile(outputFile, docs, uint32(0666) )
	if err != nil {
		panic("Couldn't write doc file:\n" + err.String())
	}
}

func generatePackageDocs(name string) (definitions []*FunctionDefinition) {
	pkg := packager.NewPackage(packager.DefaultPackagePath, packager.BuildOptions())
	pkg.Load(name)

	for tindex, ttype := range(pkg.Types) {
		ttypeString := proto.GetString(ttype.Name)

		for _, fun := range(pkg.Functions) {

			if tindex == int(proto.GetInt32(fun.ScopeTypeId)) {
				function := &FunctionDefinition{
				Name: proto.GetString(fun.Name),
				Description: "... descriptions coming soon ...",
				ParentScope: ttypeString,
				Body: ".",
				ReturnType: ".",
				YieldType: ".",
				Stub: ".",
				}
				// Description / Examples will come when we can look at comment nodes

				function.Stub = FuncStub(pkg.Package, fun)
				segments := strings.Split(function.Stub,")")
				
				function.CallPattern = segments[0] + ")"

				function.ReturnType = fun.ReturnTypeString(pkg.Package)
				function.YieldType = fun.OpensTypeString(pkg.Package)

				function.Body = getBody(name, fun)
				definitions = append(definitions, function)
			}
		}
	}

	return
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