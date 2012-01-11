package linker

import(
	tp "tritium/proto"
	parser "tritium/parser"
)

/*
func Run(file string) (*tp.Transform) {
	return RunWithPackage(file, packager.BuildDefaultPackage())
}*/

func RunWithPackage(file string, pkg *tp.Package) (*tp.Transform) {
	objs := parser.ParseFileSet(file)
	ctx := NewObjectLinkingContext(pkg, objs)
	ctx.Link()
	
	return ctx.Transform
}

