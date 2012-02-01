package tritium

import (
	"tritium/linker"
	ap "athena/proto"
	"tritium/packager"
	"os"
	"fmt"
	"path/filepath"
	"strings"
)

func Compile(file string, rootPackage *ap.Package) (*ap.Transform, os.Error) {

//	defaultPackage := packager.LoadDefaultPackage(PackagePath)
//	defaultPackage.BuildUserPackage(UserPackagePath, PackagePath)

	// TODO(SJ) : Make a copy constructor from a raw ap.Package object
	//	-- the path here should be optional since I'm passing in the ap.Package

	compileOptions := packager.PackageOptions{"stdout": false, "output_tpkg": false, "use_tpkg": false}

//	defaultPackage := packager.NewPackage(PackagePath, compileOptions)
	defaultPackage := packager.NewPackage(*UserPackagePath, compileOptions)
	defaultPackage.Merge(rootPackage)

	userPackages, _ := filepath.Glob(filepath.Join(*UserPackagePath, "*"))	

	for _, path := range userPackages {
		components := strings.Split(path, "/")
		name := components[len(components)-1]
		defaultPackage.Load(name)
	}

//	rootPackage.BuildUserPackage(UserPackagePath, PackagePath)
	fmt.Printf("Using ROOT PACKAGE %v\n", rootPackage)


	return linker.RunWithPackage(file, defaultPackage.Package)
}

func CompileString(data, path string, rootPackage *ap.Package) (*ap.Transform, os.Error) {

	defaultPackage := packager.LoadDefaultPackage(PackagePath)
	defaultPackage.BuildUserPackage(UserPackagePath, PackagePath)

	return linker.RunStringWithPackage(data, path, defaultPackage.Package)
}

var PackagePath *string
var UserPackagePath *string
