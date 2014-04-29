package transform

import (
	"manhattan/project"
	"tritium/linker"
	"tritium/packager/legacy"
	tp "tritium/proto"
	. "tritium/util"
)

func CompileString(data, projectPath, scriptPath, fileName string, pkg *tp.Package, activeLayers []string, ranges ...Range) (*tp.Transform, error) {
	return linker.RunStringWithPackage(data, projectPath, scriptPath, fileName, pkg, activeLayers, ranges...)
}

func LoadFunctions(projectPath, functionsPath, functionsFile string, pack *tp.Package, ranges ...Range) {
	legacy.ReadPackageDefinitions(pack, projectPath, functionsPath, functionsFile, ranges...)
}


func LoadFunctionsWrtMixerExports(proj *project.Project, functionsFile string, pack *tp.Package) {
	proj.MixerExports = legacy.ReadPackageDefinitions(pack, proj.Path, proj.FunctionsPath, functionsFile, proj.MixerExports...)
}