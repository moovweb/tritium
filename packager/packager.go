package packager

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

import (
	// data "butler/data"
	fileutil "butler/fileutil"
	proto "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
	yaml "goyaml"
)

type Packager struct {
	MixerDir      string
	IncludePaths  []string
	IsTransformer bool
	Dependencies  map[string]string
	*tp.Mixer
}

const (
	PACKAGER_VERSION = 1
	LIB_DIR          = "lib"
	SCRIPTS_DIR      = "scripts"
	ENTRY_FILE       = "main.ts"
	DEPS_FILE        = "dependencies.yml"
	MIXER_DIR        = "mixers"
)

func New(relSrcDir string) *Packager {
	pkgr := new(Packager)

	wd, wdErr := os.Getwd()
	if wdErr != nil {
		panic("unable to determine current directory for mixer creation")
	}

	absSrcDir, absErr := filepath.Abs(relSrcDir)
	if absErr != nil {
		panic("unable to absolutize mixer source directory for mixer creation")
	}

	pkgr.MixerDir        = absSrcDir
	pkgr.IncludePaths    = make([]string, 1)
	pkgr.IncludePaths[0] = wd

	pkgr.Mixer           = tp.NewMixer(absSrcDir)
	pkgr.PackagerVersion = proto.Int32(1)
	pkgr.readDependenciesFile()

	pkgr.Mixer.Package      = new(tp.Package)
	pkgr.Mixer.Package.Name = proto.String(pkgr.Mixer.GetName())
	pkgr.Mixer.Package.Path = proto.String(pkgr.MixerDir)

	return pkgr
}

func (pkgr *Packager) readDependenciesFile() {
	depPath := filepath.Join(pkgr.MixerDir, DEPS_FILE)
	depPathExists, existsErr := fileutil.Exists(depPath)
	if existsErr != nil {
		panic(fmt.Sprintf("error reading dependencies file for `%s`", pkgr.Mixer.GetName()))
	}
	if !depPathExists {
		return
	}
	data, readErr := ioutil.ReadFile(filepath.Join(pkgr.MixerDir, DEPS_FILE))
	if readErr != nil {
		panic(fmt.Sprintf("error reading dependencies file for `%s`", pkgr.Mixer.GetName()))
	}
	pkgr.Dependencies = make(map[string]string)
	yaml.Unmarshal(data, &pkgr.Dependencies)
}

func (pkgr *Packager) Build() {
	pkgr.resolveDependencies()
	pkgr.resolveTypes()
	pkgr.buildLib()
}

func (pkgr *Packager) resolveDependencies() {
	for name, version := range pkgr.Dependencies {
		needed := pkgr.loadDependency(name, version)
		needed.Build()
		pkgr.merge(needed)
	}
}

func (pkgr *Packager) loadDependency(name, specifiedVersion string) *Packager {
	foundMixerSrc := false
	foundCompiledMixer := false
	for _, incPath := range pkgr.IncludePaths {
		depPath := filepath.Join(incPath, name)
		there, err := fileutil.Exists(depPath)
		if !there || err != nil {
			continue
		}
		foundMixerSrc = true
		needed := New(depPath)
		if needed.GetVersion() != specifiedVersion {
			continue
		}
		needed.Build()
		return needed
	}

	// TODO: check if the dependency is among the compiled mixers

	if foundMixerSrc || foundCompiledMixer {
		panic(fmt.Sprintf("version %s needed for dependency `%s` of `%s`",
		      specifiedVersion, name, pkgr.GetName()))
	}
	panic(fmt.Sprintf("unable to find dependency `%s` of `%s`", name, pkgr.GetName()))
	return nil
}

