package tritium

import (
	"tritium/linker"
	ap "athena/proto"
	"tritium/packager"
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


func MakeProjectPackage(functionPath string, rootPackage *ap.Package) (*ap.Package) {

	options := packager.PackageOptions{"stdout": false, "output_tpkg": false, "use_tpkg": false}

	defaultPackage := packager.NewPackage(functionPath, options)
	defaultPackage.Merge(rootPackage)

	userPackages, _ := filepath.Glob(filepath.Join(functionPath, "*"))	

	for _, path := range userPackages {
		components := strings.Split(path, "/")
		name := components[len(components)-1]
		defaultPackage.Load(name)
	}

	return defaultPackage.Package
}


var PackagePath *string
var UserPackagePath *string
