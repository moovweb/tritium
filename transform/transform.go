package transform

import (
	"tritium/linker"
	"tritium/packager"
	tp "tritium/proto"
)

func CompileString(data , projdir, filename string, pkg *tp.Package) (*tp.Transform, error) {
	return linker.RunStringWithPackage(data, projdir, filename, pkg)
}

func LoadFunctions(functionsDir, functionsFile string, pack *tp.Package) {
	packager.ReadPackageDefinitions(pack, functionsDir, functionsFile)
}
