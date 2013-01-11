package transform

import (
  "path/filepath"
)

import (
	"tritium/linker"
	"tritium/packager"
	tp "tritium/proto"
)

func CompileString(data string, path string, pkg *tp.Package) (*tp.Transform, error) {
  projDir, _ := filepath.Split(path)
	return linker.RunStringWithPackage(data, path, pkg, projDir)
}

func LoadFunctions(functionPath string, pack *tp.Package) {
  projDir, _ := filepath.Split(functionPath)
	packager.ReadPackageDefinitions(pack, functionPath, projDir)
}
