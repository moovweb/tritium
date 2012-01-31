package proto

import pb "goprotobuf.googlecode.com/hg/proto"

func (fun *Function) Stub(pkg *Package) (string) {
	name := pb.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		argName := pb.GetString(arg.TypeString)
		if argName == "" {
			t := pkg.Types[int(pb.GetInt32(arg.TypeId))]
			argName = pb.GetString(t.Name)
		}
		args = args + "," + argName
	}
	return name + args
}

// We need this for inherited function resolution. 
// - for now we just make duplicated functions for the package w the types changed
// - this way, the engine can play dumb

func (fun *Function)Clone() (*Function) {
	bytes, err := pb.Marshal(fun)

	if err != nil {
		panic("Couldn't clone function" + pb.GetString( fun.Name ) )
	}
	
	newFun := &Function{}
	pb.Unmarshal(bytes, newFun)

	return newFun
}

func (fun *Function) NameString() (string) {
	return pb.GetString(fun.Name)
}
func (fun *Function) ReturnTypeString(pkg *Package) (string) {
	return pkg.GetTypeName(pb.GetInt32(fun.ReturnTypeId))
}
func (fun *Function) ScopeTypeString(pkg *Package) (string) {
	return pkg.GetTypeName(pb.GetInt32(fun.ScopeTypeId))
}
func (fun *Function) OpensTypeString(pkg *Package) (string) {
	return pkg.GetTypeName(pb.GetInt32(fun.OpensTypeId))
}

func (fun *Function) DebugInfo(pkg *Package) (string) {
	name := fun.NameString()
	scopeType := fun.ScopeTypeString(pkg)
	returnType := fun.ReturnTypeString(pkg)
	openType := fun.OpensTypeString(pkg)
	
	args := ""
	for _, arg := range(fun.Args) {
		argName := pb.GetString(arg.TypeString)
		if argName == "" {
			argName = pkg.GetTypeName(pb.GetInt32(arg.TypeId))
		}
		args = args + "," + argName
	}
	
	return "@func " + scopeType + "." + name + "(" + args + ") " + returnType + " " + openType
}