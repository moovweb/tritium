package parser

import(
	tp "tritium/proto"
	//. "exec"
	//"log"
	//proto "goprotobuf.googlecode.com/hg/proto"
	//"io/ioutil"
	//. "strings"
)

func ParseFile(file string) (*tp.ScriptObject) {
	p := MakeParser(file)
	return p.Parse()
}

func ParseFileSet(file string) ([]*tp.ScriptObject) {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseFile(file))
	files[file] = 1
	for i := 0; i < len(objs); i++ {
		obj := objs[i]
		for _, importFile := range(obj.Imports()) {
			if(files[importFile] == 0) {
				objs = append(objs, ParseFile(importFile))
			}
		}
	}
	
	return objs
}