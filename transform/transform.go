package transform

import (
	tp "tritium/proto"
	"path/filepath"
	"strings"
	"tritium/linker"
	"tritium/packager"
)

func Compile(file string, rootPackage *tp.Package) (*tp.Transform, error) {

	// TODO(SJ) : Make a copy constructor from a raw tp.Package object
	//	-- the path here should be optional since I'm passing in the tp.Package

	compileOptions := packager.PackageOptions{"stdout": false, "output_tpkg": false, "use_tpkg": false}

	defaultPackage := packager.NewPackage(*UserPackagePath, compileOptions)
	defaultPackage.Merge(rootPackage)

	userPackages, _ := filepath.Glob(filepath.Join(*UserPackagePath, "*"))

	for _, path := range userPackages {
		components := strings.Split(path, "/")
		name := components[len(components)-1]
		defaultPackage.Load(name)
	}

	return linker.RunWithPackage(file, defaultPackage.Package)
}

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

var PackagePath *string
var UserPackagePath *string
