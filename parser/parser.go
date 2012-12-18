package parser

import (
	"io/ioutil"
	"path/filepath"
	tp "tritium/proto"
)

func ParseFile(projdir, filename string) *tp.ScriptObject {
	src, _ := readFile(projdir, filename)
	return ParseScript(src, projdir, filename)
}

func ParseScript(src, dir, filename string) *tp.ScriptObject {
	return MakeParser(src, dir, filename).Parse()
}

func ParseFileSet(projdir, filename string) []*tp.ScriptObject {
	src, _ := readFile(projdir, filename)
	return Parse(src, projdir, filename)
}

func Parse(data, projdir, filename string) []*tp.ScriptObject {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseScript(data, projdir, filename))
	// files[file] = 1 // Don't register the top-level mixer scripts!
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importFile := range obj.Imports() {
			fullPath := filepath.Join(projdir, importFile)
			if files[fullPath] == 0 {
				objs = append(objs, ParseFile(projdir, importFile))
				// register the user-accessible scripts to avoid duplicate imports
				files[filepath.Join(projdir, importFile)] = 1
			}
		}
	}
	return objs
}

func readFile(projdir, filename string) (src, fullpath string) {
	fullpath = filepath.Join(projdir, filename)
	fullpath, err := filepath.Abs(fullpath)
	if err != nil {
		panic("No tritium file found at: " + filename)
	}
	srcBytes, err := ioutil.ReadFile(fullpath)

	if err != nil {
		panic("No tritium file found at: " + filename)
	}
	src = string(srcBytes)
	return
}
