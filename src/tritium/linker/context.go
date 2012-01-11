package linker

import(
	. "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	"log"
	"fmt"
	//packager "tritium/packager"
)

type FuncMap map[string]int;

type LinkingContext struct {
	objMap map[string]int
	funList []FuncMap
	textType int
	*Executable
}

type localDef map[string]int

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
	for typeId, typeObj := range(pkg.Types) {
		funcMap := make(FuncMap)
		//println("Type:",proto.GetString(typeObj.Name))
		//println("Implements:", proto.GetInt32(typeObj.Implements))
		implements := functionLookup[proto.GetInt32(typeObj.Implements)]
		for index, fun := range(pkg.Functions) {
			stub := fun.Stub()
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
		Executable: &Executable{
			Pkg: pkg,
		},
	}
	
	// Find Text type int -- need its ID to deal with Text literals during processing
	for index, t := range(pkg.Types) {
		if proto.GetString(t.Name) == "Text" {
			ctx.textType = index
		}
	}

	return ctx
}

func (ctx *LinkingContext) Link() {
	ctx.link(0, ctx.Pkg.GetTypeId("Text"))
}

func (ctx *LinkingContext) link(objId, scopeType int) {
	obj := ctx.Objects[objId]
	if proto.GetBool(obj.Linked) == false {
		//println("Linking", proto.GetString(obj.Name))
		obj.ScopeTypeId = proto.Int(scopeType)
		ctx.ProcessInstruction(obj.Root, scopeType)
	} else {
		if scopeType != int(proto.GetInt32(obj.ScopeTypeId)) {
			log.Fatal("Imported a script in two different scopes!")
		}
		//println("Already linked", proto.GetString(obj.Name))
	}
}

func (ctx *LinkingContext) ProcessInstruction(ins *Instruction, scopeType int) (returnType int) {
	localScope := make(localDef, 0)
	return ctx.ProcessInstructionWithLocalScope(ins, scopeType, localScope)
}

func (ctx *LinkingContext) ProcessInstructionWithLocalScope(ins *Instruction, scopeType int, localScope localDef) (returnType int) {
	returnType = -1
	switch *ins.Type {
		case Instruction_IMPORT:
			// set its import_id and blank the value field
			importValue := proto.GetString(ins.Value)
			importId, ok := ctx.objMap[importValue]
			if ok != true {
				log.Fatal("Invalid import ", ins.String())
			}
			// Make sure this object is linked with the right scopeType
			ctx.link(importId, scopeType)
			//println("befor", ins.String())
			ins.ObjectId = proto.Int(importId)
			ins.Value = nil
			//println("after", ins.String())
		case Instruction_LOCAL_VAR:
			name := proto.GetString(ins.Value)
			typeId, found := localScope[name]
			if found {
				returnType = typeId
				if len(ins.Arguments) > 0 {
					log.Panic("The local variable %", name, " has been assigned before and cannot be reassigned!")
				}
			} else {
				if len(ins.Arguments) > 0 {
					// We are going to assign something to this variable
					returnType = ctx.ProcessInstructionWithLocalScope(ins.Arguments[0], scopeType, localScope)
					// Duplicate the localScope before we go messing with my parents scope
					parentScope := localScope
					localScope = make(localDef, len(parentScope))
					for s, t := range(parentScope) {
						localScope[s] = t
					}
					localScope[proto.GetString(ins.Value)] = returnType
				} else {
					log.Panic("I've never seen the variable %", name, " before! Please assign a value before usage.")
				}
			}
		case Instruction_FUNCTION_CALL:
			stub := proto.GetString(ins.Value)
			if ins.Arguments != nil {
				for _, arg := range(ins.Arguments) {
					argReturn := ctx.ProcessInstructionWithLocalScope(arg, scopeType, localScope)
					if argReturn == -1 {
						log.Fatal("Invalid argument object", arg.String())
					}
					stub = stub + "," + fmt.Sprintf("%d", argReturn)
				}
			}
			funcId, ok := ctx.funList[scopeType][stub]
			if ok != true {
				println("Available functions...")
				for funcName, _ := range(ctx.funList[scopeType]) {
					println(funcName)
				}
				log.Fatal("No such function found....", ins.String(), "with the stub: ",scopeType, stub)
			}
			ins.FunctionId = proto.Int32(int32(funcId))
			fun := ctx.Pkg.Functions[funcId]
			returnType = int(proto.GetInt32(fun.ReturnTypeId))
			opensScopeType := int(proto.GetInt32(fun.OpensTypeId))
			//println("Zomg, found function", fun.String())
			//println("I open a Scope of type ", opensScopeType)
			
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
