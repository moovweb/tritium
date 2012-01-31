package linker

import(
	tp "athena/tritium"
	parser "tritium/parser"
)


func RunStringWithPackage(src, path string, pkg *tp.Package) (*tp.Transform) {
	objs := parser.Parse(src, path)
	ctx := NewObjectLinkingContext(pkg, objs)
	ctx.Link()

	return ctx.Transform
}

func RunWithPackage(file string, pkg *tp.Package) (*tp.Transform) {
	objs := parser.ParseFileSet(file)
	ctx := NewObjectLinkingContext(pkg, objs)
	ctx.Link()

	return ctx.Transform
}

