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
	
	exec.ProcessImports() //(change string in Instruction objects to import_id)
	// t.ProcessInstructions()
		// Figure out function signature (name + arg types)
			// have to start at the bottom of the tree (args first) and check types.
		// Is this a real function?
			// aka, text(regexp()) ... have to see that regexp returns Regexp object,
			// which, then, when we go to process text() we notice we don't have a text(Regexp) 
			// function, so we need to throw a reasonable error
			// Hrrrm.... need line numbers, huh?
		// Set the function_id if it is real, error otherwise
	// optionally, remove functions from pkg that aren't used (dead code removal)
}

func (exec *Executable) ProcessImports() {
	for _, obj := range(exec.Objects) {
		// RESOLVE IMPORTS HERE!
		println(proto.GetString(obj.Name))
	}
}