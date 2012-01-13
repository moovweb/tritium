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

// We need this for inherited function resolution. 
// - for now we just make duplicated functions for the package w the types changed
// - this way, the engine can play dumb

func (fun *Function)Clone() (*Function) {
	bytes, err := proto.Marshal(fun)

	if err != nil {
		panic("Couldn't clone function" + proto.GetString( fun.Name ) )
	}
	
	newFun := &Function{}
	proto.Unmarshal(bytes, newFun)

	return newFun
}