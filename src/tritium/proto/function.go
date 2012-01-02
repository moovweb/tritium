package tritium

import proto "goprotobuf.googlecode.com/hg/proto"
import "fmt"

func (fun *Function) Stub() (string) {
	name := proto.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		args = args + "," + fmt.Sprintf("%d", proto.GetInt32(arg.TypeId))
	}
	return name + args
}