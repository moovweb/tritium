package transform

import (
	"tritium/linker"
	"tritium/packager/legacy"
	tp "tritium/proto"
)

func CompileString(data, projectPath, scriptPath, fileName string, pkg *tp.Package) (*tp.Transform, error) {
	return linker.RunStringWithPackage(data, projectPath, scriptPath, fileName, pkg)
}

func LoadFunctions(projectPath, functionsPath, functionsFile string, pack *tp.Package) {
	legacy.ReadPackageDefinitions(pack, projectPath, functionsPath, functionsFile)
}
