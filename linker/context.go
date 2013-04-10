package linker

import (
	"fmt"
	"log"
	"strings"
	// "path/filepath"
)

import (
	"butler/null"
	proto "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
)

type FuncMap map[string]int

type LinkingContext struct {
	objMap        map[string]int
	funList       []FuncMap
	textType      int
	types         []string
	files         []string
	Errors        []string
	ProjectFolder string
	ScriptsFolder string
	*tp.Transform
	Visiting      map[string]bool
}

type LocalDef map[string]int

func NewObjectLinkingContext(pkg *tp.Package, objs []*tp.ScriptObject, projectPath, scriptPath string) *LinkingContext {
	// Setup object lookup map!
	objScriptLookup := make(map[string]int, len(objs))
	for index, obj := range objs {
		objScriptLookup[null.GetString(obj.Name)] = index
	}
	ctx := NewLinkingContext(pkg)
	ctx.objMap = objScriptLookup
	ctx.Objects = objs
	ctx.ProjectFolder = projectPath
	ctx.ScriptsFolder = scriptPath
	ctx.Visiting = make(map[string]bool, 0)
	return ctx
}

func NewLinkingContext(pkg *tp.Package) *LinkingContext {
	println(".")
	// Setup the function map!
	functionLookup := make([]FuncMap, len(pkg.Types))
	types := make([]string, len(pkg.Types))

	for typeId, typeObj := range pkg.Types {
		funcMap := make(FuncMap)
		types[typeId] = typeObj.GetName()
		//println("Type:",null.GetString(typeObj.Name))
		//println("Implements:", null.GetInt32(typeObj.Implements))
		implements := functionLookup[typeObj.GetImplements()]
		for index, fun := range pkg.Functions {
			stub := fun.Stub(pkg)

			funScopeId := fun.GetScopeTypeId()
			inherited := false
			// funScopeId is ancestor of typeId
			if (implements != nil) && pkg.AncestorOf(funScopeId, int32(typeId)) {
				_, inherited = implements[stub]
			}
			if (funScopeId == int32(typeId)) || inherited {
				//println(null.GetString(typeObj.Name), ":", stub)
				funcMap[stub] = index
			}
		}
		functionLookup[typeId] = funcMap
	}

	// Setup the main context object
	ctx := &LinkingContext{
		funList: functionLookup,
		types:   types,
		Errors:  make([]string, 0),
		Transform: &tp.Transform{
			Pkg: pkg,
		},
	}

	// Find Text type int -- need its ID to deal with Text literals during processing
	ctx.textType = pkg.GetTypeId("Text")

	// println("TYPES")
	// for i, t := range types {
	// 	println(i, ":", t)
	// }
	// println()

	// println("FUNCTIONS")
	// for t, fm := range functionLookup {
	// 	println("TYPE", t)
	// 	for n, f:= range fm {
	// 		println(n, ":", f)
	// 	}
	// 	println()
	// }
	// println()

	return ctx
}

func (ctx *LinkingContext) Link() {
	ctx.link(0, ctx.Pkg.GetTypeId("Text"))
}

func (ctx *LinkingContext) link(objId, scopeType int) {
	obj := ctx.Objects[objId]
	//println("link object", objId)
	//println(obj.String())
	if null.GetBool(obj.Linked) == false {
		//println("Linking", null.GetString(obj.Name))
		obj.ScopeTypeId = proto.Int(scopeType)
		obj.Linked = proto.Bool(true)
		path := obj.GetName()
		ctx.files = append(ctx.files, null.GetString(obj.Name))
		ctx.ProcessInstruction(obj.Root, scopeType, path)
		ctx.files = ctx.files[:(len(ctx.files) - 1)]
	} else {
		if scopeType != int(null.GetInt32(obj.ScopeTypeId)) {
			ctx.error("script", "Imported a script in two different scopes! Not processing second import.")
		}
	}
}

func (ctx *LinkingContext) ProcessInstruction(ins *tp.Instruction, scopeType int, path string) (returnType int) {
	localScope := make(LocalDef, 0)
	return ctx.ProcessInstructionWithLocalScope(ins, scopeType, localScope, "", path)
}

func (ctx *LinkingContext) ProcessInstructionWithLocalScope(ins *tp.Instruction, scopeType int, localScope LocalDef, caller string, path string) (returnType int) {
	returnType = -1
	ins.IsValid = proto.Bool(true)
	switch *ins.Type {
	case tp.Instruction_IMPORT:
		importLocation := ins.GetValue()

		// keep track of which files we're inside of, to detect circular imports
		val, present := ctx.Visiting[importLocation]
		if present && val {
			ctx.error(ins, "Circular import detected: %s", importLocation)
			panic(fmt.Sprintf("Circular import detected: %s", importLocation))
		}
		ctx.Visiting[importLocation] = true

		// set its import_id and blank the value field
		// importValue := filepath.Join(ctx.ProjectFolder, null.GetString(ins.Value))
		//println("import: ", importValue)
		//println(null.GetInt32(ins.LineNumber))
		importId, ok := ctx.objMap[null.GetString(ins.Value)]
		if ok != true {
			ctx.error(ins, "Invalid import `%s`", ins.String())
		}
		// Make sure this object is linked with the right scopeType
		ctx.link(importId, scopeType)
		// unset this after visiting an import
		ctx.Visiting[importLocation] = false
		//println("befor", ins.String())
		ins.ObjectId = proto.Int(importId)
		ins.Value = nil
		//println("after", ins.String())
	case tp.Instruction_LOCAL_VAR:
		name := null.GetString(ins.Value)
		if name == "1" || name == "2" || name == "3" || name == "4" || name == "5" || name == "6" || name == "7" {
			if len(ins.Arguments) > 0 {
				// We are going to assign something to this variable
				returnType = ctx.ProcessInstructionWithLocalScope(ins.Arguments[0], scopeType, localScope, caller, path)
				if returnType != ctx.textType {
					ctx.error(ins, "Numeric local vars can ONLY be Text")
				}
			}
			if ins.Children != nil {
				for _, child := range ins.Children {
					ctx.ProcessInstructionWithLocalScope(child, ctx.textType, localScope, caller, path)
				}
			}
			returnType = ctx.textType
		} else { // Not numeric.
			typeId, found := localScope[name]
			if found {
				returnType = typeId
				if len(ins.Arguments) > 0 {
					ctx.error(ins, "The local variable \"%%%s\" has been assigned before and cannot be reassigned! Open a scope on it if you need to alter the contents.", name)
				} else {
					if ins.Children != nil {
						for _, child := range ins.Children {
							returnType = ctx.ProcessInstructionWithLocalScope(child, typeId, localScope, caller, path)
						}
					}
				}

			} else {
				if len(ins.Arguments) > 0 {
					// We are going to assign something to this variable
					// But first, check for possible mutation and prevent it for now.
					if ins.Children != nil {
						ctx.error(ins, "May not open a scope during initialization of local variable \"%%%s\".", name)
					}
					returnType = ctx.ProcessInstructionWithLocalScope(ins.Arguments[0], scopeType, localScope, caller, path)
					localScope[name] = returnType
				} else {
					println(ins.String())
					ctx.error(ins, "I've never seen the variable \"%%%s\" before! Please assign a value before usage.", name)
				}
			}
		}

	case tp.Instruction_FUNCTION_CALL:
		stub := null.GetString(ins.Value)
		if stub == "yield" {
			ins.YieldTypeId = proto.Int32(int32(scopeType))
		}
		namespaces := ins.Namespaces()
		// process the args
		if ins.Arguments != nil {
			for _, arg := range ins.Arguments {
				argReturn := ctx.ProcessInstructionWithLocalScope(arg, scopeType, localScope, caller, path)
				if argReturn == -1 {
					ctx.error(ins, "Invalid argument object %q", arg.String())
					return
				}
				stub = stub + "," + ctx.types[argReturn]
			}
		}
		// for each namespace specified by the user, look up the function wrt the current context type + function name
		var funcId int
		var ok bool
		for _, ns := range namespaces {
			funcId, ok = ctx.funList[scopeType][ns + "." + stub]
			if ok {
				break
			}
		}

		if !ok {
      readableCalleeStub := readableStub(stub)
			readableCallerStub := readableStub(caller)

			location := ""
			if len(path) > 0 {
				location = path
			} else {
				location = "Package " + ctx.Pkg.GetName()
			}

			msg := fmt.Sprintf("%s:%d: function %s.%s does not exist in namespace %s", location, ins.GetLineNumber(), ctx.types[scopeType], readableCalleeStub, namespaces[0])
			for i := 1; i < len(namespaces)-1; i++ {
				msg += ", " + namespaces[i]
			}
			if len(namespaces) > 1 {
				msg += " or " + namespaces[len(namespaces)-1]
			}
			msg += fmt.Sprintf("; (called from %s.%s).", ctx.types[scopeType], readableCallerStub)

			ctx.error(ins, msg)

			// message := fmt.Sprintf("Available functions in %s.%s:\n", ns, ctx.types[scopeType])
			// ns := strings.SplitN(stub, ".", 2)[0]
			// nsPrefix := ns + "."
			// for funcName, _ := range ctx.funList[scopeType] {
			// 	if strings.HasPrefix(funcName, nsPrefix) {
			// 		message += "\t" + nsPrefix + readableStub(funcName) + "\n"
			// 	}
			// }
			// log.Printf("%s\n", message)


			// ctx.error(ins, "%s:%d: could not find function %s.%s.%s (called from %s.%s.%s)", location, ins.GetLineNumber(), ns, ctx.types[scopeType], readableCalleeStub, callerNamespace, ctx.types[scopeType], readableCallerStub)

		} else {
			// println()
			// println("processed call to", ctx.types[scopeType], stub)
			// println("call target is", funcId, ":", ctx.Transform.Pkg.Functions[funcId].FullSignature(ctx.Transform.Pkg))

			ins.FunctionId = proto.Int32(int32(funcId))
			fun := ctx.Pkg.Functions[funcId]
			returnType = int(null.GetInt32(fun.ReturnTypeId))
			opensScopeType := int(null.GetInt32(fun.OpensTypeId))
			if opensScopeType == 0 {
				// If we're a Base scope, don't mess with texas!
				opensScopeType = scopeType
			}
			// If it inherits:
			inheritedOpensScopeType := ctx.Pkg.FindDescendantType(int32(opensScopeType))
			if inheritedOpensScopeType != -1 {
				opensScopeType = inheritedOpensScopeType
			}

			// Copy the local scope
			parentScope := localScope
			localScope = make(LocalDef, len(parentScope))
			for s, t := range parentScope {
				localScope[s] = t
			}

			if ins.Children != nil {
				for _, child := range ins.Children {
					ctx.ProcessInstructionWithLocalScope(child, opensScopeType, localScope, stub, path) // thread the name of the caller through the linkages
				}
			}
		}
	case tp.Instruction_TEXT:
		returnType = ctx.textType
	case tp.Instruction_BLOCK:
		if ins.Children != nil {
			for _, child := range ins.Children {
				returnType = ctx.ProcessInstructionWithLocalScope(child, scopeType, localScope, caller, path)
			}
		}
	}
	return
}

func (ctx *LinkingContext) HasErrors() bool {
	return (len(ctx.Errors) > 0)
}

func (ctx *LinkingContext) error(obj interface{}, format string, data ...interface{}) {
	message := fmt.Sprintf(format, data...)
	ctx.Errors = append(ctx.Errors, message)
	ins, ok := obj.(*tp.Instruction)
	if ok {
		ins.IsValid = proto.Bool(false)
	}
	log.Printf("%s\n", message)
}

func readableStub(stub string) string {
	betterStub := strings.Replace(stub, ",", "(", 1)
	if strings.Index(betterStub, "(") != -1 {
		betterStub += ")"
	} else {
		betterStub += "()"
	} 
	return betterStub
}