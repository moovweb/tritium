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

func (fun *Function) NameString() (string) {
	return proto.GetString(fun.Name)
}
func (fun *Function) ReturnTypeString(pkg *Package) (string) {
	return pkg.GetTypeName(proto.GetInt32(fun.ReturnTypeId))
}
func (fun *Function) ScopeTypeString(pkg *Package) (string) {
	return pkg.GetTypeName(proto.GetInt32(fun.ScopeTypeId))
}
func (fun *Function) OpensTypeString(pkg *Package) (string) {
	return pkg.GetTypeName(proto.GetInt32(fun.OpensTypeId))
}

func (fun *Function) DebugInfo(pkg *Package) (string) {
	name := fun.NameString()
	scopeType := fun.ScopeTypeString(pkg)
	returnType := fun.ReturnTypeString(pkg)
	openType := fun.OpensTypeString(pkg)
	
	args := ""
	for _, arg := range(fun.Args) {
		argName := proto.GetString(arg.TypeString)
		if argName == "" {
			argName = pkg.GetTypeName(proto.GetInt32(arg.TypeId))
		}
		args = args + "," + argName
	}
	
	return "@func " + scopeType + "." + name + "(" + args + ") " + returnType + " " + openType
}