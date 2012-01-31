package tritium

import(
	"tritium/linker"
	tp "athena/proto"
	"tritium/packager"
)

func Compile(file string) (*tp.Transform) {

	defaultPackage := packager.LoadDefaultPackage(PackagePath)
	defaultPackage.BuildUserPackage(UserPackagePath, PackagePath)

	return linker.RunWithPackage(file, defaultPackage.Package)
}

func CompileString(data, path string) (*tp.Transform) {

	defaultPackage := packager.LoadDefaultPackage(PackagePath)
	defaultPackage.BuildUserPackage(UserPackagePath, PackagePath)

	return linker.RunStringWithPackage(data, path, defaultPackage.Package)
}

var PackagePath *string
var UserPackagePath *string