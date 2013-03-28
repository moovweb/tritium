package packager

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
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
	TypeMap       map[string]int
	ExtensionMap  map[string]string
	*tp.Mixer
}

const (
	PACKAGER_VERSION = 1
	LIB_DIR          = "lib"
	SCRIPTS_DIR      = "scripts"
	ENTRY_FILE       = "main.ts"
	DEPS_FILE        = "dependencies.yml"
	TYPES_FILE       = "types.yml"
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
		pkgr.loadDependency(name, version)
	}
}

func (pkgr *Packager) loadDependency(name, specifiedVersion string) {
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
		pkgr.mergeWith(needed)
		return
	}

	// TODO: check if the dependency is among the compiled mixers

	if foundMixerSrc || foundCompiledMixer {
		panic(fmt.Sprintf("version %s needed for dependency `%s` of `%s`",
		      specifiedVersion, name, pkgr.GetName()))
	}
	panic(fmt.Sprintf("unable to find dependency `%s` of `%s`", name, pkgr.GetName()))
}

func (pkgr *Packager) resolveTypes() {
	var typeDecs []string
	// see whether a type declarations file exists; if so, read it
	typeFilePath := filepath.Join(pkgr.MixerDir, LIB_DIR, TYPES_FILE)		
	there, existsErr := fileutil.Exists(typeFilePath)
	if there && existsErr == nil {
		data, readErr := ioutil.ReadFile(typeFilePath)
		if readErr != nil {
			panic(fmt.Sprintf("error reading type declarations file for `%s`", pkgr.Mixer.GetName()))
		}
		typeDecs = make([]string, 0)
		yaml.Unmarshal(data, &typeDecs)
		if pkgr.TypeMap == nil {
			pkgr.TypeMap = make(map[string]int)
		}
		if pkgr.ExtensionMap == nil {
			pkgr.ExtensionMap = make(map[string]string)
		}

		// comb out the types that don't extend anything
		// for i, typeDec := range typeDecs {
		// 	if !strings.Contains(typeDec, "<") {
		// 		_, isThere := pkgr.TypeMap[typeDec]
		// 		if !isThere {
		// 			pkgr.TypeMap[typeDec] = len(pkgr.TypeMap)
		// 			pkgr.ExtensionMap[typeDec] = ""
		// 		}
		// 		typeDecs[i] = "" // so we can more easily skip over it in the next loop
		// 	}
		// }

		// now handle the types that extend others
		for _, typeDec := range typeDecs {
			// if the type doesn't extend anything ...
			if !strings.Contains(typeDec, "<") {
				_, isThere := pkgr.TypeMap[typeDec]
				if !isThere {
					pkgr.TypeMap[typeDec] = len(pkgr.TypeMap)
					pkgr.ExtensionMap[typeDec] = ""
					// if the type has already been declared, check for a semantic conflict
				} else if extendee := pkgr.ExtensionMap[typeDec]; extendee != "" {
					panic(fmt.Sprintf("type declaration %s conflicts with previous declaration %s < %s", typeDec, typeDec, extendee))
				}
				// else the declaration is a duplicate, so do nothing
			} else { // it's an extension
				splitted := strings.Split(typeDec, "<")
				if len(splitted) != 2 {
					panic(fmt.Sprintf("invalid syntax in type declaration `%s`; only one extension is permitted per declaration", typeDec))
				}
				sub, super := strings.TrimSpace(splitted[0]), strings.TrimSpace(splitted[1])
				// make sure that the supertype in a declaration actually exists
				_, there := pkgr.TypeMap[super]
				if !there {
					panic(fmt.Sprintf("cannot extend type `%s` before it has been declared", super))
				}
				// check for conflicts with previous declarations
				// (and incidentally ensure that subtypes always have a higher id than their supertypes
				extendee, subHasAlreadyExtended := pkgr.ExtensionMap[sub]				
				if subHasAlreadyExtended && extendee != super {
					var previousDec string
					if extendee == "" {
						previousDec = sub + " (extends nothing)"
					} else {
						previousDec = fmt.Sprintf("%s < %s", sub, extendee)
					}
					panic(fmt.Sprintf("type declaration `%s` conflicts with previous declaration `%s`", typeDec, previousDec))
				}
				// if we get this far, we can proceed with the type extension
				pkgr.TypeMap[sub] = len(pkgr.TypeMap)
				pkgr.ExtensionMap[sub] = super
			}
		} 

		for name, id := range pkgr.TypeMap {
			println(name, id)
		}
		for sub, super := range pkgr.ExtensionMap {
			println(sub, "<", super)
		}
	}

}

func (pkgr *Packager) buildLib() {
	return
}

func (pkgr *Packager) mergeWith(dep *Packager) {
	return
}