package transform

import (
	tp "tritium/proto"
	"tritium/linker"
	"tritium/packager"
)

func CompileString(data string, path string, pkg *tp.Package) (*tp.Transform, error) {
	return linker.RunStringWithPackage(data, path, pkg)
}

//******************************************************************************
// "...add a big comment saying its a stop gap till go1/new testing framework 
// support" - Sean
//******************************************************************************
func CompileTest(test *tp.TritiumTest, path string, pkg *tp.Package) (err error) {
	test_transform, err := linker.RunStringWithPackage(*test.Script, path, pkg)
	if err != nil {
		return err
	}
	test.Transformer = test_transform
	return
}

func MakeProjectPackage(functionPath string, rootPackage *tp.Package) *tp.Package {
	packager.ReadPackageDefinitions(rootPackage, functionPath)
	return rootPackage
}
