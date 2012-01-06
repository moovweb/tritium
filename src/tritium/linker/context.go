package linker

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	"log"
	"fmt"
	. "tritium/packager"
)

type FuncMap map[string]int;

type LinkingContext struct {
	objMap map[string]int
	funList []FuncMap
	textType int
	*tp.Executable
}

func NewLinkingContext(pkg *Package, objs []*tp.ScriptObject) (*LinkingContext){
	
	// Setup object lookup map!
	objScriptLookup := make(map[string]int, len(objs))
	for index, obj := range(objs) {
		objScriptLookup[proto.GetString(obj.Name)] = index
	}
	
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
		objMap: objScriptLookup,
		funList: functionLookup,
		Executable: &tp.Executable{
			Pkg: pkg.Package,
			Objects: objs,
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
	for _, obj := range(ctx.Objects) {
		ctx.ProcessInstruction(obj.Root)
	}
	// optionally, remove functions from pkg that aren't used (dead code removal)
}

func (ctx *LinkingContext) ProcessInstruction(ins *tp.Instruction) (returnType int) {
	returnType = -1
	if ins.Children != nil {
		for _, child := range(ins.Children) {
			// Process all children.
			// In the case of blocks, we'll actually want to have our return type be the
			// return type of our LAST child. So, save that!
			returnType = ctx.ProcessInstruction(child)
		}
	}
	// Grab all imports
	switch *ins.Type {
		case tp.Instruction_IMPORT:
			// set its import_id and blank the value field
			importValue := proto.GetString(ins.Value)
			importId, ok := ctx.objMap[importValue]
			if ok != true {
				log.Fatal("Invalid import ", ins.String())
			}
			//println("befor", ins.String())
			ins.ObjectId = proto.Int(importId)
			ins.Value = nil
			//println("after", ins.String())
		case tp.Instruction_FUNCTION_CALL:
			stub := proto.GetString(ins.Value)
			if ins.Arguments != nil {
				for _, arg := range(ins.Arguments) {
					argReturn := ctx.ProcessInstruction(arg)
					println(argReturn)
					if argReturn == -1 {
						log.Fatal("Invalid argument object", arg.String())
					}
					stub = stub + "," + fmt.Sprintf("%d", argReturn)
				}
			}
			funcId, ok := ctx.funList[0][stub]
			if ok != true {
				log.Fatal("No such function found....", ins.String(), "with the stub: ", stub)
			}
			ins.FunctionId = proto.Int32(int32(funcId))
			fun := ctx.Pkg.Functions[funcId]
			returnType = int(proto.GetInt32(fun.ReturnTypeId))
			println("Zomg, found function", fun.String())
		case tp.Instruction_TEXT:
			returnType = ctx.textType
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
