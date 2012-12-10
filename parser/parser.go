package parser

import (
	"io/ioutil"
	"path/filepath"
	tp "tritium/proto"
)

func ParseFile(file string) *tp.ScriptObject {
	src, fullpath := readFile(file)
	return ParseScript(src, fullpath)
}

func ParseScript(src, path string) *tp.ScriptObject {
	return MakeParser(src, path).Parse()
}

func ParseFileSet(file string) []*tp.ScriptObject {
	src, fullpath := readFile(file)
	return Parse(src, fullpath)
}

func Parse(data, file string) []*tp.ScriptObject {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseScript(data, file))
	files[file] = 1
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importFile := range obj.Imports() {
			if files[importFile] == 0 {
				objs = append(objs, ParseFile(importFile))
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
