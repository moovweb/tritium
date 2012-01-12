package spec

import(
	tp "tritium/proto"
	"tritium/linker"
	. "path/filepath"
	. "io/ioutil"
	"log"
	. "fmt"
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
	result.Merge(spec.compareExports(exports))	
	return result
}

// TODO : Consolidate these comparisons into an interface

func (spec *Spec) compareData(data string) (*Result) {
	result := newResult()
	if spec.Output != data {
		result.Error("Bad Output", data, spec.Output, "Didn't match")
	}
	return result
}

func (spec *Spec) compareExports(exports [][]string) (*Result) {
	exportsResult := newResult()

	if summarizeExports(spec.Exports) != summarizeExports(exports) {
		exportsResult.Error("Bad Export", summarizeExports(exports), summarizeExports(spec.Exports), "Missing export(s)")
	}

	return exportsResult
}

func (spec *Spec)checkExport(globalResult *Result, export []string) {
	result := newResult()
	spec_export := make([]string,10)

	defer func() {
		if r := recover(); r != nil {
			Printf("Recovering %v", r)
			// Here is where I would add a 'missing export' error to the result
			result.Error("Export", summarizeExport(export), summarizeExport(spec_export), "Extra export")
		}
	}()

	spec_export = findByName(&spec.Exports, export[0])



}

func summarizeExport(export []string) string{
	return export[0] + " : " + export[1]
}

func summarizeExports(exports [][]string) string {
	var summary string
	summary += "["
	for index, export := range(exports){
		if index == 0 {
			summary += "\n"
		}
		summary += "\t" + summarizeExport(export) + "\n"
	}
	summary += "]"
	return summary
}


// TODO(SJ): Make exports a struct and define this find method on the struct. This way I could cache the searches

func findByName(exports *[][]string, name string) ([]string) {
	for _, export := range(*exports) {
		if export[0] == name {
			return export
		}
	}

	println("CANT FIND EXPORT", name)
	panic("Couldn't find export :" + name)
}