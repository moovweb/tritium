package parser

import (
	"io/ioutil"
	"path/filepath"
	tp "tritium/proto"
)

func ParseFile(file string) *tp.ScriptObject {
	src, fullpath := readFile(file)
	return ParseScript(src, fullpath, "")
}

func ParseScript(src, path, projDir string) *tp.ScriptObject {
	return MakeParser(src, path, projDir).Parse()
}

func ParseFileSet(file string) []*tp.ScriptObject {
	src, fullpath := readFile(file)
	return Parse(src, fullpath, "")
}

func Parse(data, file string, projDir string) []*tp.ScriptObject {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseScript(data, file, projDir))
	// files[file] = 1 // Don't register the top-level mixer scripts!
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importFile := range obj.Imports() {
			if files[importFile] == 0 {
				objs = append(objs, ParseWithProjectFolder(importFile, projDir))
				// register the user-accessible scripts to avoid duplicate imports
				files[importFile] = 1
			}
		}
	}
	return objs
}

func readFile(file string) (src, fullpath string) {
	fullpath, err := filepath.Abs(file)
	if err != nil {
		panic("No tritium file found at: " + fullpath)
	}
	srcBytes, err := ioutil.ReadFile(file)

	if err != nil {
		panic("No tritium file found at: " + fullpath)
	}
	src = string(srcBytes)
	return
}

func ParseWithProjectFolder(fullpath, projectDir string) *tp.ScriptObject {
	src, fp := readFile(fullpath)
	return MakeParser(src, fp, projectDir).Parse()
}