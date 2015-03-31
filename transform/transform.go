package transform

import (
	"github.com/moovweb/manhattan/project"
	"github.com/moovweb/tritium/linker"
	"github.com/moovweb/tritium/packager/legacy"
	tp "github.com/moovweb/tritium/proto"
	. "github.com/moovweb/tritium/util"
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
