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
	pkgr.ReadDependenciesFile()

	pkgr.Mixer.Package      = new(tp.Package)
	pkgr.Mixer.Package.Name = proto.String(pkgr.Mixer.GetName())
	pkgr.Mixer.Package.Path = proto.String(pkgr.MixerDir)

	return pkgr
}

func (pkgr *Packager) ReadDependenciesFile() {
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

	depmap := make(map[string]string)
	yaml.Unmarshal(data, &depmap)
	pkgr.Dependencies = depmap
	// pkgr.Dependencies = make([]string, 0)

	// for name, version := range depmap {
	// 	pkgr.Dependencies = append(pkgr.Dependencies, fmt.Sprintf("%s:%s", name, version))
	// }
}

func (pkgr *Packager) BuildMixer() *tp.Mixer {


	return pkgr.Mixer
}