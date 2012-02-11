package linker

import (
	tp "athena/proto"
	parser "tritium/parser"
	"os"
)

func RunStringWithPackage(src, path string, pkg *tp.Package) (*tp.Transform, os.Error) {
	objs := parser.Parse(src, path)
	return runWithObjs(objs, pkg)
}

func RunWithPackage(file string, pkg *tp.Package) (*tp.Transform, os.Error) {
	objs := parser.ParseFileSet(file)
	return runWithObjs(objs, pkg)
}

func runWithObjs(objs []*tp.ScriptObject, pkg *tp.Package) (*tp.Transform, os.Error) {
	ctx := NewObjectLinkingContext(pkg, objs)
	ctx.Link()
	if ctx.HasErrors() {
		message := ""
		for _, msg := range ctx.errors {
			message = message + "\n" + msg
		}
		return nil, os.NewError(message)
	}

	return ctx.Transform, nil
}
