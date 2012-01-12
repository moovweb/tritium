package spec

import(
	tp "tritium/proto"
	"tritium/linker"
	. "path/filepath"
	. "io/ioutil"
	"log"
	yaml "launchpad.net/goyaml"
	strings "strings"
	. "fmt"
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
		Vars: loadVars(dir),
		Script: linker.RunWithPackage(Join(dir, "main.ts"), pkg),
		Output: loadFile(dir, "output.*"),
		Exports: loadExports(dir),
		Logs: loadLogs(dir),
	}
}

func loadLogs(dir string) ([]string) {
	data := []byte(loadFile(dir, "logs.yml"))
	logs := make([]string, 0)
	err := yaml.Unmarshal(data, &logs)
	if err != nil {
		log.Panic(err)
	}
	return logs
}

func loadVars(dir string) (map[string]string) {
	data := []byte(loadFile(dir, "vars.yml"))
	vars := make(map[string]string, 0)
	err := yaml.Unmarshal(data, &vars)
	if err != nil {
		log.Panic(err)
	}
	return vars
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
	result.Merge(spec.compareLogs(logs))
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

func (spec *Spec) compareLogs(logs []string) (*Result) {
	result := newResult()
	
	expectedSummary := summarizeLogs(spec.Logs)
	outputSummary := summarizeLogs(logs)
	
	if expectedSummary != outputSummary {
		result.Error("Bad Log Output", outputSummary, expectedSummary, "Didn't match")
	}
	return result
}

func summarizeLogs(logs []string) string {
	return Sprintf("(%v)", strings.Join(logs, ")\n("))
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