package linker

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	. "tritium/packager"
)

type Executable struct {
	*tp.Executable
}

func NewExecutable(pkg *Package) (*Executable){
	exec := &Executable{ 
		Executable: &tp.Executable{
			Pkg: pkg.Package,
		},
	}
	return exec
}

func (exec *Executable) ProcessObjects(objs []*tp.ScriptObject) {
	// Add script objects to the exec
	exec.Objects = objs
	
	// Loop through all the objects, and get the index of every
	// script object name.
	objScriptNameLookupMap := make(map[string]int, 0)
	for objIndex, obj := range(exec.Objects) {
		objScriptNameLookupMap[proto.GetString(obj.Name)] = objIndex
	}
	
	for _, obj := range(exec.Objects) {
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
			if *ins.Type == tp.Instruction_IMPORT {
				// set its import_id and blank the value field
				importValue := proto.GetString(ins.Value)
				println("Found import!", importValue)
				println("Index is...", objScriptNameLookupMap[importValue])
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
