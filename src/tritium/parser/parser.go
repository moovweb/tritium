package parser

import(
	tp "tritium/proto"
	. "exec"
	"log"
	proto "goprotobuf.googlecode.com/hg/proto"
)

func ParseFile(file string) (*tp.ScriptObject) {
	cmd := Command("ts2to", file)
	data, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal("ts2to failed with message:", err.String(), "\n", string(data))
	}
	obj := &tp.ScriptObject{}
	err = proto.Unmarshal(data, obj)
	if err != nil {
		log.Fatal(err)
	}
	return obj
}

func ParseFileSet(file string) ([]*tp.ScriptObject) {
	objs := make([]*tp.ScriptObject, 0)
	files := make(map[string]int)
	objs = append(objs, ParseFile(file))
	files[file] = 1
	for _, obj := range(objs) {
		for _, importFile := range(obj.Imports()) {
			if(files[importFile] == 0) {
				println("must import ", importFile)
			}
		}
	}
	
	return objs
}