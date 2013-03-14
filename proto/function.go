package proto

import (
	"fmt"
)

import (
	pb "code.google.com/p/goprotobuf/proto"
	"butler/null"
)

func (f *Function) Stub(pkg *Package) string {
	ns := f.GetNamespace()
	if len(ns) == 0 {
		ns = "tritium"
	}
	fname := fmt.Sprintf("%s.%s", ns, f.GetName())
	args := ""
	for _, arg := range f.Args {
		argName := null.GetString(arg.TypeString)
		if argName == "" {
			t := pkg.Types[int(null.GetInt32(arg.TypeId))]
			argName = null.GetString(t.Name)
		}
		args = args + "," + argName
	}
	return fname + args
}

// We need this for inherited function resolution. 
// - for now we just make duplicated functions for the package w the types changed
// - this way, the engine can play dumb

func (fun *Function) Clone() *Function {
	bytes, err := pb.Marshal(fun)

	if err != nil {
		panic("Couldn't clone function" + null.GetString(fun.Name))
	}

	newFun := &Function{}
	pb.Unmarshal(bytes, newFun)

	return newFun
}

func (fun *Function) NameString() string {
	return null.GetString(fun.Name)
}
func (fun *Function) ReturnTypeString(pkg *Package) string {
	return pkg.GetTypeName(null.GetInt32(fun.ReturnTypeId))
}
func (fun *Function) ScopeTypeString(pkg *Package) string {
	return pkg.GetTypeName(null.GetInt32(fun.ScopeTypeId))
}
func (fun *Function) OpensTypeString(pkg *Package) string {
	return pkg.GetTypeName(null.GetInt32(fun.OpensTypeId))
}

func (fun *Function) DebugInfo(pkg *Package) string {
	name := fun.NameString()
	scopeType := fun.ScopeTypeString(pkg)
	returnType := fun.ReturnTypeString(pkg)
	openType := fun.OpensTypeString(pkg)

	args := ""
	for _, arg := range fun.Args {
		argName := null.GetString(arg.TypeString)
		if argName == "" {
			argName = pkg.GetTypeName(null.GetInt32(arg.TypeId))
		}
		args = args + "," + argName
	}

	return "@func " + scopeType + "." + name + "(" + args + ") " + returnType + " " + openType
}
