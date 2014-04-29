package linker

import (
	"errors"

	parser "tritium/parser"
	tp "tritium/proto"
	. "tritium/util"
)

func RunStringWithPackage(src, projectPath, scriptPath, fileName string, pkg *tp.Package, activeLayers map[string]bool, ranges ...Range) (*tp.Transform, error) {
	objs := parser.Parse(src, projectPath, scriptPath, fileName, false, activeLayers)
	return runWithObjs(objs, pkg, projectPath, scriptPath, activeLayers, ranges...)
}

func RunWithPackage(projectPath, scriptPath, fileName string, pkg *tp.Package, activeLayers map[string]bool) (*tp.Transform, error) {
	objs := parser.ParseFileSet(projectPath, scriptPath, fileName, false, activeLayers)
	return runWithObjs(objs, pkg, projectPath, scriptPath, activeLayers)
}

func runWithObjs(objs []*tp.ScriptObject, pkg *tp.Package, projectPath, scriptPath string, activeLayers map[string]bool, ranges ...Range) (*tp.Transform, error) {
	ctx := NewObjectLinkingContext(pkg, objs, projectPath, scriptPath, ranges...)
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
