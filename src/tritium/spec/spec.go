package spec

import(
	tp "tritium/proto"
	"tritium/linker"
	. "path/filepath"
)

type Spec struct {
	Location string

	// Inputs
	Input string
	Vars map[string]string
	
	// Script
	script *tp.Executable
	
	// Expected outputs
	Output string
	Exports [][]string
	Logs []string
}

func LoadSpec(dir string) (*Spec) {
	//ParseFileSet()
	return &Spec{
		Location: dir,
		Input: "hi",
		Vars: make(map[string]string, 0),
		script: linker.Run(Join(dir, "main.ts")),
		Output: "hi",
		Exports: make([][]string, 0),
		Logs: make([]string, 0),
	}
}