package tritium

import(
	"tritium/linker"
	tp "tritium/proto"
	"tritium/packager"
)

func Compile(file string) (*tp.Transform) {
	return linker.RunWithPackage(file, packager.LoadDefaultPackage().Package)
}

var DefaultPackagePath = "packages"