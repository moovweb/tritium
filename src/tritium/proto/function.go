package tritium

import proto "goprotobuf.googlecode.com/hg/proto"

func (fun *Function) Stub(pkg *Package) (string) {
	name := proto.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		argName := proto.GetString(arg.TypeString)
		if argName == "" {
			t := pkg.Types[int(proto.GetInt32(arg.TypeId))]
			argName = proto.GetString(t.Name)
		}
		args = args + "," + argName
	}
	return name + args
}