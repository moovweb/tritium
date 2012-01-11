package spec

import(
	tp "tritium/proto"
	"tritium/linker"
	. "path/filepath"
	. "io/ioutil"
	"log"
	yaml "launchpad.net/goyaml"
)

type Spec struct {
	Location string

	// Inputs
	Input string
	Vars map[string]string
	
	// Script
	Script *tp.Transform
	
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
		Script: linker.RunWithPackage(Join(dir, "main.ts"), pkg),
		Output: loadFile(dir, "output.*"),
		Exports: loadExports(dir),
		Logs: make([]string, 0),
	}
}

func loadExports(dir string) ([][]string) {
	data := []byte(loadFile(dir, "exports.yml"))
	exports := make([][]string, 0)
	err := yaml.Unmarshal(data, &exports)
	if err != nil {
		log.Panic(err)
	}
	return exports
}

func loadFile(dir, filename string) (string) {
	list, err := Glob(Join(dir, filename))
	if err != nil {
		return ""
		//log.Panic(err)
	}
	if len(list) == 0 {
		//println("Found nothing", Join(dir, filename))
		return ""
	}
	data, err := ReadFile(list[0])
	if err != nil {
		return ""
	}
	return string(data)
}

func (spec *Spec) Compare(data string, exports [][]string, logs []string) (*Result) {
	result := newResult()
	result.Merge(spec.compareData(data))
	return result
}

func (spec *Spec) compareData(data string) (*Result) {
	result := newResult()
	if spec.Output != data {
		result.Error("Bad Output", data, spec.Output, "Didn't match")
	}
	return result
}