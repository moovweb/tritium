package spec

import(
	tp "tritium/proto"
	"tritium/linker"
	. "path/filepath"
	"log"
	. "io/ioutil"
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

func LoadSpec(dir string, pkg *tp.Package) (*Spec) {
	//ParseFileSet()
	return &Spec{
		Location: dir,
		Input: loadFile(dir, "input.*"),
		Vars: make(map[string]string, 0),
		script: linker.RunWithPackage(Join(dir, "main.ts"), pkg),
		Output: "hi",
		Exports: make([][]string, 0),
		Logs: make([]string, 0),
	}
}

func loadFile(dir, filename string) (string) {
	list, err := Glob(Join(dir, filename))
	if err != nil {
		log.Fatal(err)
	}
	if len(list) == 0 {
		println("Found nothing", Join(dir, filename))
		return ""
	}
	data, err := ReadFile(list[0])
	if err != nil {
		return ""
	}
	println("Loaded file!")
	return string(data)
}