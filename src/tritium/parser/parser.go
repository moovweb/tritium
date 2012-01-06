package parser

import(
	tp "tritium/proto"
	. "exec"
	"log"
	proto "goprotobuf.googlecode.com/hg/proto"
)

func ParseFile(file string) (*tp.ScriptObject) {
	cmd := Command("../../../bin/ts2to", file)
	data, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal("ts2to failed with message:", err.String(), "\n", string(data))
	}
	obj := &tp.ScriptObject{}
	err = proto.Unmarshal(data, obj)
	if err != nil {
		log.Fatal(err)
	}
	obj.Imports()
	return obj
}

//func ParseFileSet(mainFile string) ([]*tp.ScriptObject) {
	
//}