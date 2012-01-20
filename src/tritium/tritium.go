package tritium

import(
	"tritium/linker"
	tp "tritium/proto"
	"tritium/packager"
)

func Compile(file string) (*tp.Transform) {
	defaultPackage := packager.LoadDefaultPackage(PackagePath)
	defaultPackage.LoadUserPackage(UserPackagePath, PackagePath)

	return linker.RunWithPackage(file, defaultPackage.Package)
}

var PackagePath *string
var UserPackagePath *string