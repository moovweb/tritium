package linker

import (
	tp "tritium/proto"
	"errors"
	parser "tritium/parser"
)

func RunStringWithPackage(src, path string, pkg *tp.Package) (*tp.Transform, error) {
	objs := parser.Parse(src, path)
	return runWithObjs(objs, pkg)
}

func RunWithPackage(file string, pkg *tp.Package) (*tp.Transform, error) {
	objs := parser.ParseFileSet(file)
	return runWithObjs(objs, pkg)
}

func runWithObjs(objs []*tp.ScriptObject, pkg *tp.Package) (*tp.Transform, error) {
	ctx := NewObjectLinkingContext(pkg, objs)
	ctx.Link()
	if ctx.HasErrors() {
		message := ""
		for _, msg := range ctx.Errors {
			message = message + "\n" + msg
		}
		return nil, errors.New(message)
	}

	return ctx.Transform, nil
}
