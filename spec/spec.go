package spec

import (
	. "fmt"
	. "io/ioutil"
	"log"
	. "path/filepath"
	"strings"

	yaml "goyaml"
	"tritium"
	"tritium/linker"
	tp "tritium/proto"
	"tritium/transform"
)

type Spec struct {
	Location string

	// Inputs
	Input string
	Vars  map[string]string

	// Script
	Script *tp.Transform

	// Expected outputs
	Output  string
	Exports [][]string
	Logs    []string
}

func LoadSpec(dir string, pkg *tp.Package) (*Spec, error) {
	// If there are functions defined in the test, load them
	customFunctions, _ := Glob(Join(dir, "functions.ts"))

	if len(customFunctions) == 1 {
		// functionsFile := customFunctions[0]
		transform.LoadFunctions(Dir(dir), Base(dir), "functions.ts", pkg)
	}

	script, err := linker.RunWithPackage(Dir(dir), Base(dir), "main.ts", pkg, make([]string, 0))

	spec := &Spec{
		Location: dir,
		Input:    string(loadFile(dir, "input.*")),
		Vars:     loadVars(dir),
		Script:   script,
		Output:   string(loadFile(dir, "output.*")),
		Exports:  loadExports(dir),
		Logs:     loadLogs(dir),
	}
	return spec, err
}

func loadLogs(dir string) []string {
	data := []byte(loadFile(dir, "logs.yml"))
	logs := make([]string, 0)
	err := yaml.Unmarshal(data, &logs)
	if err != nil {
		log.Panic(err)
	}
	return logs
}

func loadVars(dir string) map[string]string {
	data := []byte(loadFile(dir, "vars.yml"))
	vars := make(map[string]string, 0)
	err := yaml.Unmarshal(data, &vars)
	if err != nil {
		log.Panic(err)
	}
	return vars
}

func loadExports(dir string) [][]string {
	data := []byte(loadFile(dir, "exports.yml"))
	exports := make([][]string, 0)
	err := yaml.Unmarshal(data, &exports)
	if err != nil {
		log.Panic(err)
	}
	return exports
}

func loadFile(dir, filename string) []byte {
	list, err := Glob(Join(dir, filename))
	if err != nil {
		return nil
		//log.Panic(err)
	}
	if len(list) == 0 {
		//println("Found nothing", Join(dir, filename))
		return nil
	}
	data, err := ReadFile(list[0])
	if err != nil {
		return nil
	}
	return data
}

func (spec *Spec) Compare(exhaust *tritium.Exhaust) *Result {
	result := NewResult()
	result.Merge(spec.compareData(exhaust.Output))
	result.Merge(spec.compareExports(exhaust.Exports))
	result.Merge(spec.compareLogs(exhaust.Logs))
	return result
}

// TODO : Consolidate these comparisons into an interface

func (spec *Spec) compareData(data string) *Result {
	result := NewResult()
	if strings.TrimSpace(spec.Output) != strings.TrimSpace(data) {
		result.Fail(spec.Location, "Bad Output", data, spec.Output, "Didn't match")
	}
	return result
}

func (spec *Spec) compareExports(exports [][]string) *Result {
	exportsResult := NewResult()

	if summarizeExports(spec.Exports) != summarizeExports(exports) {
		exportsResult.Fail(spec.Location, "Bad Export", summarizeExports(exports), summarizeExports(spec.Exports), "Missing export(s)")
	}

	return exportsResult
}

func (spec *Spec) compareLogs(logs []string) *Result {
	result := NewResult()

	expectedSummary := summarizeLogs(spec.Logs)
	outputSummary := summarizeLogs(logs)

	if expectedSummary != outputSummary {
		result.Fail(spec.Location, "Bad Log Output", outputSummary, expectedSummary, "Didn't match")
	}
	return result
}

func summarizeLogs(logs []string) string {
	return Sprintf("(%v)", strings.Join(logs, ")\n("))
}

func summarizeExport(export []string) string {
	return export[0] + " : " + export[1]
}

func summarizeExports(exports [][]string) string {
	var summary string
	summary += "["
	for index, export := range exports {
		if index == 0 {
			summary += "\n"
		}
		summary += "\t" + summarizeExport(export) + "\n"
	}
	summary += "]"
	return summary
}
