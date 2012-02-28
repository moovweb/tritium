package tritium

import (
	"tritium/src/tritium/linker"
	ap "athena/src/athena/proto"
	"tritium/src/tritium/packager"
	"os"
	"path/filepath"
	"strings"
)

func Compile(file string, rootPackage *ap.Package) (*ap.Transform, os.Error) {

	// TODO(SJ) : Make a copy constructor from a raw ap.Package object
	//	-- the path here should be optional since I'm passing in the ap.Package

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

func CompileString(data string, path string, pkg *ap.Package) (*ap.Transform, os.Error) {
	return linker.RunStringWithPackage(data, path, pkg)
}

func MakeProjectPackage(functionPath string, rootPackage *ap.Package) *ap.Package {
	packager.ReadPackageDefinitions(rootPackage, functionPath)

	return rootPackage
}

var PackagePath *string
var UserPackagePath *string
