package tritium

import(
	"tritium/linker"
	tp "tritium/proto"
	"tritium/packager"
)

func Compile(file string) (*tp.Transform) {
/*
	defaultPackage := packager.LoadDefaultPackage(PackagePath)

	println("\n\n\n ADDING USER PACKAGE \n\n\n")
	defaultPackage.LoadUserPackage(UserPackagePath, PackagePath)
	println("\n\n\n DONE ADDING USER PACKAGE \n\n\n")
*/
	defaultPackage := packager.NewUserPackage(UserPackagePath, PackagePath)
	println(defaultPackage.DebugInfo())
	return linker.RunWithPackage(file, defaultPackage.Package)
}

var PackagePath *string
var UserPackagePath *string