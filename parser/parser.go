package parser

import (
	"io/ioutil"
	"path/filepath"
	tp "tritium/proto"
)

func ParseFile(projectPath, scriptPath, fileName string) *tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return ParseScript(src, projectPath, scriptPath, fileName)
}

func ParseScript(src, projectPath, scriptPath, fileName string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, false).Parse()
}

func ParseRootScript(src, projectPath, scriptPath, fileName string) *tp.ScriptObject {
	return MakeParser(src, projectPath, scriptPath, fileName, true).Parse()
}

func ParseFileSet(projectPath, scriptPath, fileName string) []*tp.ScriptObject {
	src, _ := readFile(projectPath, scriptPath, fileName)
	return Parse(src, projectPath, scriptPath, fileName)
}

func Parse(src, projectPath, scriptPath, fileName string) []*tp.ScriptObject {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseRootScript(src, projectPath, scriptPath, fileName))
	// files[file] = 1 // Don't register the top-level mixer scripts!
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importFile := range obj.Imports() {
			// importFile already is already prepended with the script path relative to the project folder
			// fullPath := filepath.Join(filepath.Base(projectPath), importFile)
			if files[importFile] == 0 {
				objs = append(objs, ParseFile(projectPath, filepath.Dir(importFile), filepath.Base(importFile)))
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
