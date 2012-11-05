package transform

import (
	"tritium/linker"
	"tritium/packager"
	tp "tritium/proto"
)

func CompileString(data string, path string, pkg *tp.Package) (*tp.Transform, error) {
	return linker.RunStringWithPackage(data, path, pkg)
}

func LoadFunctions(functionPath string, pack *tp.Package) {
	packager.ReadPackageDefinitions(pack, functionPath)
}
