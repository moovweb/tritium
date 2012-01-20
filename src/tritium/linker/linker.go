package linker

import(
	tp "tritium/proto"
	parser "tritium/parser"
)


func RunWithPackage(file string, pkg *tp.Package) (*tp.Transform) {
	println("BEGIN LINKING")
	objs := parser.ParseFileSet(file)
	ctx := NewObjectLinkingContext(pkg, objs)
	//println("start linking", file, len(objs))
	ctx.Link()

	println("DONE LINKING")
	return ctx.Transform
}

