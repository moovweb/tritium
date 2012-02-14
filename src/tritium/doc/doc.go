package doc;

import(
	tp "athena/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
)



func Process(pkg *tp.Package) string {
	for tindex, ttype := range(pkg.Types) {
		ttypeString := proto.GetString(ttype.Name)
		println()
		for _, fun := range(pkg.Functions) {
			if tindex == int(proto.GetInt32(fun.ScopeTypeId)) {
				println(ttypeString + "." + FuncStub(pkg, fun))
			}
		}
	}
	return ""
}

func FuncStub(pkg *tp.Package, fun *tp.Function) string {
	name := proto.GetString(fun.Name)
	args := ""
	for _, arg := range(fun.Args) {
		t := pkg.Types[int(proto.GetInt32(arg.TypeId))]
		argName := proto.GetString(t.Name)
		argName = argName + " %" + proto.GetString(arg.Name)
		args = args + ", " + argName
	}
	if len(args) > 1 {
		args = args[2:]
	}
	returnVal := name + "(" + args + ") " + fun.ReturnTypeString(pkg) + " " 
	opens := fun.OpensTypeString(pkg)
	if opens != "Base" {
		returnVal = returnVal + opens
	}
	return returnVal
}