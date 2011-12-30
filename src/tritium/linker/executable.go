package linker

import(
	tp "tritium/proto"
	. "tritium/packager"
)

type Executable struct {
	*tp.Executable
}

func NewExecutable(pkg *Package) (*Executable){
	exec := &Executable{ 
		Executable: &tp.Executable{Pkg: pkg.Package},
	}
	return exec
}