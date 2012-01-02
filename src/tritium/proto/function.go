package tritium

import proto "goprotobuf.googlecode.com/hg/proto"
import "fmt"

func (fun *Function) Stub() (string) {
	name := proto.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		argName := fmt.Sprintf("%d", proto.GetInt32(arg.TypeId))
		args = args + "," + argName
	}
	return name + args
}