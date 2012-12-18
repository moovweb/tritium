package linker

import (
	"errors"
	parser "tritium/parser"
	tp "tritium/proto"
)

func RunStringWithPackage(src, projdir, filename string, pkg *tp.Package) (*tp.Transform, error) {
	objs := parser.Parse(src, projdir, filename)
	return runWithObjs(objs, pkg, projdir)
}

func RunWithPackage(projdir, filename string, pkg *tp.Package) (*tp.Transform, error) {
	objs := parser.ParseFileSet(projdir, filename)
	return runWithObjs(objs, pkg, projdir)
}

func runWithObjs(objs []*tp.ScriptObject, pkg *tp.Package, projdir string) (*tp.Transform, error) {
	ctx := NewObjectLinkingContext(pkg, objs, projdir)
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
