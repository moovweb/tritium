package tritium

import(
	"tritium/linker"
	tp "athena/proto"
	"tritium/packager"
	"os"
)

func Compile(file string) (*tp.Transform, os.Error) {

	defaultPackage := packager.LoadDefaultPackage(PackagePath)
	defaultPackage.BuildUserPackage(UserPackagePath, PackagePath)

	return linker.RunWithPackage(file, defaultPackage.Package)
}

func CompileString(data, path string) (*tp.Transform, os.Error) {

	defaultPackage := packager.LoadDefaultPackage(PackagePath)
	defaultPackage.BuildUserPackage(UserPackagePath, PackagePath)

	return linker.RunStringWithPackage(data, path, defaultPackage.Package)
}

var PackagePath *string
var UserPackagePath *string