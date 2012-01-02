package linker

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	"log"
	. "tritium/packager"
)

type LinkingContext struct {
	objMap map[string]int
	funMap map[string]int
	*tp.Executable
}

func NewLinkingContext(pkg *Package, objs []*tp.ScriptObject) (*LinkingContext){
	
	// Setup object script lookup map!
	objScriptLookup := make(map[string]int, len(objs))
	for objIndex, obj := range(objs) {
		objScriptLookup[proto.GetString(obj.Name)] = objIndex
	}
	
	// Setup the function map!
	functionLookupMap := make(map[string]int, len(pkg.Functions))
	for _, fun := range(pkg.Functions) {
		println("Func!", fun.Stub())
	}
	
	// Setup the main context object
	ctx := &LinkingContext{ 
		objMap: objScriptLookup,
		funMap: functionLookupMap,
		Executable: &tp.Executable{
			Pkg: pkg.Package,
			Objects: objs,
		},
	}

	return ctx
}

func (ctx *LinkingContext) Link() {
	for _, obj := range(ctx.Objects) {
		instructionList := make([]*tp.Instruction, 0)
		instructionList = append(instructionList, obj.Root)

		/* 
			This is how I am currently looping through all of the 
			instructions. The array above is going to end up being
			an array of *every* instruction. Pushing and popping
			is probably a better idea, but I don't have access to the 
			Golang docs right now, so this is my solution. I don't believe
			it will be that slow to do it this way, but feel free to
			change this code to be more efficient in the future.
		*/
		for i := 0; i < len(instructionList); i++ {
			ins := instructionList[i]
			if ins.Children != nil {
				for _, child := range(ins.Children) {
					instructionList = append(instructionList, child)
				}
			}
			// Grab all imports
			switch *ins.Type {
				case tp.Instruction_IMPORT:
					// set its import_id and blank the value field
					importValue := proto.GetString(ins.Value)
					importId, ok := ctx.objMap[importValue]
					if ok != true {
						log.Fatal("Invalid import ", proto.GetString(obj.Name), ins.String())
					}
					//println("befor", ins.String())
					ins.ObjectId = proto.Int(importId)
					ins.Value = nil
					//println("after", ins.String())
				case tp.Instruction_FUNCTION_CALL:
					//signature := 
					//println("ZOMG, function!")
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
		}
	}
	// optionally, remove functions from pkg that aren't used (dead code removal)
}
