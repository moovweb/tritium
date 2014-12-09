package proto

import (
	"fmt"
)

import (
	pb "code.google.com/p/goprotobuf/proto"
	"tritium/dependencies/butler/null"
	"tritium/protoface"
	"tritium/constants"
)

func (f *Function) Stub(pkg2 protoface.Package) string {
	pkg := pkg2.(*Package)
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

// prettier signatures than what `Stub` provides
func (f *Function) FullSignature(pkg2 protoface.Package) string {
	pkg := pkg2.(*Package)
	ns := f.GetNamespace()
	if len(ns) == 0 {
		ns = "tritium"
	}

	return fmt.Sprintf("%s.%s", ns, f.BaseSignature(pkg))
}

func (f *Function) BaseSignature(pkg2 protoface.Package) string {
	pkg := pkg2.(*Package)
	args := "("
	for i, arg := range f.Args {
		argName := null.GetString(arg.TypeString)
		if argName == "" {
			t := pkg.Types[int(null.GetInt32(arg.TypeId))]
			argName = null.GetString(t.Name)
		}
		if i != 0 {
			args += ","
		}
		args += argName
	}
	return fmt.Sprintf("%s.%s%s)", pkg.GetTypeName(f.GetScopeTypeId()), f.GetName(), args)
}


// We need this for inherited function resolution.
// - for now we just make duplicated functions for the package w the types changed
// - this way, the engine can play dumb

func (fun *Function) Clone() protoface.Function {
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
func (fun *Function) ReturnTypeString(pkg2 protoface.Package) string {
	pkg := pkg2.(*Package)
	return pkg.GetTypeName(null.GetInt32(fun.ReturnTypeId))
}
func (fun *Function) ScopeTypeString(pkg2 protoface.Package) string {
	pkg := pkg2.(*Package)
	return pkg.GetTypeName(null.GetInt32(fun.ScopeTypeId))
}
func (fun *Function) OpensTypeString(pkg2 protoface.Package) string {
	pkg := pkg2.(*Package)
	return pkg.GetTypeName(null.GetInt32(fun.OpensTypeId))
}

func (fun *Function) DebugInfo(pkg2 protoface.Package) string {
	pkg := pkg2.(*Package)
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

func (f *Function) RelocateCallsBy(offset int) {
	if f.Instruction == nil {
		return
	}
	f.Instruction.IterateAll(func (ins *Instruction) {
		if ins.GetType() != constants.Instruction_FUNCTION_CALL {
			return
		}
		ins.FunctionId = pb.Int32(ins.GetFunctionId() + int32(offset))
	})
}

func (f *Function) RelocateTypes(relocations map[int]int) {
	f.ScopeTypeId  = pb.Int32(int32(relocations[int(f.GetScopeTypeId())]))
	f.ReturnTypeId = pb.Int32(int32(relocations[int(f.GetReturnTypeId())]))
	f.OpensTypeId  = pb.Int32(int32(relocations[int(f.GetOpensTypeId())]))
	for _, arg := range f.Args {
		arg.TypeId = pb.Int32(int32(relocations[int(arg.GetTypeId())]))
	}
}