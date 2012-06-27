package transform

import (
	tp "tritium/proto"
	"tritium/packager"
	"tritium/linker"
)

func CompileString(data string, path string, pkg *tp.Package) (*tp.Transform, error) {
	return linker.RunStringWithPackage(data, path, pkg)
}

func LoadFunctions(functionPath string, pack *tp.Package) {
	packager.ReadPackageDefinitions(pack, functionPath)
}
