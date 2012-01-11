package parser

import(
	tp "tritium/proto"
	. "exec"
	"log"
	proto "goprotobuf.googlecode.com/hg/proto"
	"io/ioutil"
	. "strings"
)

func ParseFile(file string) (*tp.ScriptObject) {
	output_file := Replace(file, ".ts", ".to", 1)
	cmd := Command("./bin/ts2to", file, output_file)

	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Panic("ts2to failed with message:", err.String(), "\n", string(output))
	}

	data, err := ioutil.ReadFile(output_file)

	if err != nil {
		log.Panic("Couldn't find output of ts2to :", output_file)
	}

	obj := &tp.ScriptObject{}
	err = proto.Unmarshal(data, obj)
	if err != nil {
		log.Panic(err)
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