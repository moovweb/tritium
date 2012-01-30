package linker

import(
	. "athena/tritium"
	proto "goprotobuf.googlecode.com/hg/proto"
	log "log4go"
	"fmt"
)

type FuncMap map[string]int;

type LinkingContext struct {
	objMap map[string]int
	funList []FuncMap
	textType int
	types []string
	files []string
	*Transform
}

type LocalDef map[string]int

func NewObjectLinkingContext(pkg *Package, objs []*ScriptObject) (*LinkingContext) {
	// Setup object lookup map!
	objScriptLookup := make(map[string]int, len(objs))
	for index, obj := range(objs) {
		objScriptLookup[proto.GetString(obj.Name)] = index
	}
	ctx := NewLinkingContext(pkg)
	ctx.objMap = objScriptLookup
	ctx.Objects = objs
	return ctx
}

func NewLinkingContext(pkg *Package) (*LinkingContext){
	// Setup the function map!
	functionLookup := make([]FuncMap, len(pkg.Types))
	types := make([]string, len(pkg.Types))

	for typeId, typeObj := range(pkg.Types) {
		funcMap := make(FuncMap)
		types[typeId] = proto.GetString(typeObj.Name)
		//println("Type:",proto.GetString(typeObj.Name))
		//println("Implements:", proto.GetInt32(typeObj.Implements))
		implements := functionLookup[proto.GetInt32(typeObj.Implements)]
		for index, fun := range(pkg.Functions) {
			stub := fun.Stub(pkg)

			funScopeId := proto.GetInt32(fun.ScopeTypeId)
			inherited := false
			if implements != nil {
				_, inherited = implements[stub]
			}
			if (funScopeId == int32(typeId)) || inherited {
				//println(proto.GetString(typeObj.Name), ":", stub)
				funcMap[stub] = index
			}
		}
		functionLookup[typeId] = funcMap
	}
	
	// Setup the main context object
	ctx := &LinkingContext{ 
		funList: functionLookup,
		types: types,
		Transform: &Transform{
			Pkg: pkg,
		},
	}
	
	// Find Text type int -- need its ID to deal with Text literals during processing
	ctx.textType = pkg.GetTypeId("Text")

	return ctx
}

func (ctx *LinkingContext) Link() {
	ctx.link(0, ctx.Pkg.GetTypeId("Text"))
}

func (ctx *LinkingContext) link(objId, scopeType int) {
	obj := ctx.Objects[objId]
	//println("link object", objId)
	//println(obj.String())
	if proto.GetBool(obj.Linked) == false {
		//println("Linking", proto.GetString(obj.Name))
		obj.ScopeTypeId = proto.Int(scopeType)
		obj.Linked = proto.Bool(true)
		ctx.files = append(ctx.files, proto.GetString(obj.Name))
		ctx.ProcessInstruction(obj.Root, scopeType)
		ctx.files = ctx.files[:(len(ctx.files)-1)]
	} else {
		if scopeType != int(proto.GetInt32(obj.ScopeTypeId)) {
			log.Error("Imported a script in two different scopes!")
		}
		//println("Already linked", proto.GetString(obj.Name))
	}
}

func (ctx *LinkingContext) ProcessInstruction(ins *Instruction, scopeType int) (returnType int) {
	localScope := make(LocalDef, 0)
	return ctx.ProcessInstructionWithLocalScope(ins, scopeType, localScope)
}

func (ctx *LinkingContext) ProcessInstructionWithLocalScope(ins *Instruction, scopeType int, localScope LocalDef) (returnType int) {
	returnType = -1
	switch *ins.Type {
		case Instruction_IMPORT:
			// set its import_id and blank the value field
			importValue := proto.GetString(ins.Value)
			//println("import: ", importValue)
			//println(proto.GetInt32(ins.LineNumber))
			importId, ok := ctx.objMap[importValue]
			if ok != true {
				log.Error("Invalid import ", ins.String())
			}
			// Make sure this object is linked with the right scopeType
			ctx.link(importId, scopeType)
			//println("befor", ins.String())
			ins.ObjectId = proto.Int(importId)
			ins.Value = nil
			//println("after", ins.String())
		case Instruction_LOCAL_VAR:
			name := proto.GetString(ins.Value)
			if name == "1" || name == "2" || name == "3"  || name == "4"  || name == "5"  || name == "6"  || name == "7" {
				if len(ins.Arguments) > 0 {
					// We are going to assign something to this variable
					returnType = ctx.ProcessInstructionWithLocalScope(ins.Arguments[0], scopeType, localScope)
					if returnType != ctx.textType {
						log.Error("Numeric local vars can ONLY be Text")
					}
				}
				returnType = ctx.textType
			} else { // Not numeric.
				typeId, found := localScope[name]
				if found {
					returnType = typeId
					if len(ins.Arguments) > 0 {
						log.Error("The local variable %", name, " has been assigned before and cannot be reassigned!")
					}
				} else {
					if len(ins.Arguments) > 0 {
						// We are going to assign something to this variable
						returnType = ctx.ProcessInstructionWithLocalScope(ins.Arguments[0], scopeType, localScope)
						localScope[name] = returnType
					} else {
						println(ins.String())
						println("referenced: ", localScope)
						log.Error("I've never seen the variable %", name, " before! Please assign a value before usage.")
					}
				}
			}
			if ins.Children != nil {
				for _, child := range(ins.Children) {
					ctx.ProcessInstructionWithLocalScope(child, ctx.textType, localScope)
				}
			}
		case Instruction_FUNCTION_CALL:
			stub := proto.GetString(ins.Value)
			if stub == "yield" {
				ins.YieldTypeId = proto.Int32(int32(scopeType))
			}
			if ins.Arguments != nil {
				for _, arg := range(ins.Arguments) {
				//fmt.Printf("\narg:(%v)\n", arg)
				//fmt.Printf("localScope: (%v) \n", localScope)
					argReturn := ctx.ProcessInstructionWithLocalScope(arg, scopeType, localScope)
					if argReturn == -1 {
						log.Error("Invalid argument object", arg.String())
					}
					stub = stub + "," + ctx.types[argReturn]
				}
			}
			funcId, ok := ctx.funList[scopeType][stub]
			if ok != true {
				message := "Available functions...\n"
				for funcName, _ := range(ctx.funList[scopeType]) {
					message = message + funcName + "\n"
				}
				log.Debug(message)
				fileName := ""
				if len(ctx.files) > 0 {
					fileName = ctx.files[(len(ctx.files)-1)]
				} else {
					fileName = "in package"
				}
				log.Error("No such function found: " + ctx.types[scopeType] + "." + stub + " in file " + fileName + ":" + fmt.Sprintf("%d", proto.GetInt32(ins.LineNumber)))
			}
			ins.FunctionId = proto.Int32(int32(funcId))
			fun := ctx.Pkg.Functions[funcId]
			returnType = int(proto.GetInt32(fun.ReturnTypeId))
			opensScopeType := int(proto.GetInt32(fun.OpensTypeId))
			if opensScopeType == 0 {
				// If we're a Base scope, don't mess with texas!
				opensScopeType = scopeType
			}
			// If it inherits:
			inheritedOpensScopeType := ctx.Pkg.FindDescendantType( int32( opensScopeType ) )
			if inheritedOpensScopeType != -1 {
				opensScopeType = inheritedOpensScopeType
			}


			//println("Zomg, found function", fun.String())
			//println("I open a Scope of type ", opensScopeType)
			
			// Copy the local scope
			parentScope := localScope
			localScope = make(LocalDef, len(parentScope))
			for s, t := range(parentScope) {
				localScope[s] = t
			}
			
			if ins.Children != nil {
				for _, child := range(ins.Children) {
					ctx.ProcessInstructionWithLocalScope(child, opensScopeType, localScope)
				}
			}
		case Instruction_TEXT:
			returnType = ctx.textType
		case Instruction_BLOCK:
			if ins.Children != nil {
				for _, child := range(ins.Children) {
					returnType = ctx.ProcessInstructionWithLocalScope(child, scopeType, localScope)
				}
			}
	}
	
	
	// if function
		// Figure out function signature (name + arg types)
			// have to start at the bottom of the tree (args first) and check types.
		// Is this a real function?
			// aka, text(regexp()) ... have to see that regexp returns Regexp object,
			// which, then, when we go to process text() we notice we don't have a text(Regexp) 
			// function, so we need to throw a reasonable error
			// Hrrrm.... need line numbers, huh?
		// Set the function_id if it is real, error otherwise
	return
}
