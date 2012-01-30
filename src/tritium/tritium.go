package tritium

import(
	"tritium/linker"
	tp "athena/tritium"
	"tritium/packager"
)

func Compile(file string) (*tp.Transform) {

	defaultPackage := packager.LoadDefaultPackage(PackagePath)
	defaultPackage.BuildUserPackage(UserPackagePath, PackagePath)

	return linker.RunWithPackage(file, defaultPackage.Package)
}

var PackagePath *string
var UserPackagePath *string