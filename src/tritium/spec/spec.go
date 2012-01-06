package spec

import(
	tp "tritium/proto"
)


type Spec struct {
	Location string

	// Inputs
	Input string
	Vars map[string]string
	
	// Script
	script tp.Executable
	
	// Expected outputs
	Output string
	Exports [][]string
	Logs []string
}

func LoadTest(directory string) (*Spec) {
	return &Spec{
		Location: directory,
		Input: "hi",
		Vars: make(map[string]string, 0),
		
		Output: "hi",
		Exports: make([][]string, 0),
		Logs: make([]string, 0),
	}
}