package parser

import (
	// "fmt"
	"io/ioutil"
	"path/filepath"

	tp "tritium/proto"
)

func ParseFile(projectPath, scriptPath, fileName string, compilingMixer bool, activeLayers []string) *tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return ParseScript(src, projectPath, scriptPath, fileName, compilingMixer, activeLayers)
}

func ParseScript(src, projectPath, scriptPath, fileName string, compilingMixer bool, activeLayers []string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, false, compilingMixer, activeLayers).Parse()
}

func ParseRootScript(src, projectPath, scriptPath, fileName string, compilingMixer bool, activeLayers []string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, true, compilingMixer, activeLayers).Parse()
}

func ParseFileSet(projectPath, scriptPath, fileName string, compilingMixer bool, activeLayers []string) []*tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return Parse(src, projectPath, scriptPath, fileName, compilingMixer, activeLayers)
}

func Parse(src, projectPath, scriptPath, fileName string, compilingMixer bool, activeLayers []string) []*tp.ScriptObject {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseRootScript(src, projectPath, scriptPath, fileName, compilingMixer, activeLayers))
	// files[file] = 1 // Don't register the top-level mixer scripts!
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importNode := range obj.ImportInstructions() {
			importFile := importNode.GetValue()
			if files[importFile] == 0 {
				objs = append(objs, ParseFile(projectPath, filepath.Dir(importFile), filepath.Base(importFile), compilingMixer, activeLayers))
				// register the user-accessible scripts to avoid duplicate imports
				files[importFile] = 1
			}
		}
	}
	return objs
}

func readFile(projectPath, scriptPath, fileName string) (src, fullpath string) {
	scriptLocationInProject := filepath.Join(scriptPath, fileName)
	fullpath = filepath.Join(projectPath, scriptPath, fileName)
	fullpath, err := filepath.Abs(fullpath)

	// The parser checks whether the file exists now, and provides a better error message.
	// But might as well leave these here as failsafes.
	if err != nil {
		panic("No tritium file found at: " + scriptLocationInProject)
	}
	srcBytes, err := ioutil.ReadFile(fullpath)

	if err != nil {
		panic("No tritium file found at: " + scriptLocationInProject)
	}
	src = string(srcBytes)
	return
}


func reverse(seq []string) []string {
	res := make([]string, len(seq))
	for i, elt := range seq {
		res[len(seq)-1-i] = elt
	}
	return res
}