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
	"tritium/parser"
	proto "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
	yaml "goyaml"
)

type Packager struct {
	MixerDir      string
	LibDir        string
	IncludePaths  []string
	IsTransformer bool
	Dependencies  map[string]string
	TypeMap       map[string]int
	ExtensionMap  map[string]string
	TypeList      []string
	*tp.Mixer
}

const (
	PACKAGER_VERSION = 1
	SCRIPTS_DIR      = "scripts"
	ENTRY_FILE       = "main.ts"
	DEPS_FILE        = "dependencies.yml"
	TYPES_FILE       = "types.yml"
)

func New(relSrcDir, libDir string) *Packager {
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
	pkgr.LibDir          = libDir
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
	depPathExists, _ := fileutil.Exists(depPath)
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
	pkgr.populateTypeList()
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
		needed := New(depPath, "lib")
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
	typeFilePath := filepath.Join(pkgr.MixerDir, pkgr.LibDir, TYPES_FILE)		
	there, _ := fileutil.Exists(typeFilePath)
	if !there {
		return
	}
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

	// now resolve the type declarations
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
			// if we get to this point, the declaration is a duplicate, so do nothing

		// else it's an extension
		} else {
			// parse the supertype and subtype
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

	println()
	println("TYPES:")
	for name, id := range pkgr.TypeMap {
		println(name, id)
	}
	println()
	println("EXTENSIONS:")
	for sub, super := range pkgr.ExtensionMap {
		if super != "" {
			println(sub, "<", super)
		} else {
			println(sub)
		}
	}
}

func (pkgr *Packager) populateTypeList() {
	numTypes := len(pkgr.TypeMap)
	pkgr.TypeList = make([]string, numTypes)
	pkgr.Package.Types = make([]*tp.Type, numTypes)
	for name, id := range pkgr.TypeMap {
		pkgr.TypeList[id] = name
		pkgr.Package.Types[id] = &tp.Type{
			Name: proto.String(name),
			Implements: proto.Int32(int32(pkgr.TypeMap[pkgr.ExtensionMap[name]])),
		}
	}
	println()
	println("TYPES IN ORDER:")
	for _, typeObj := range pkgr.Package.Types {
		println(typeObj.GetName())
	}
}

func (pkgr *Packager) buildLib() {
	// tritium libraries are optional -- compile them if they're there, otherwise do nothing
	libPath := filepath.Join(pkgr.MixerDir, pkgr.LibDir, ENTRY_FILE)
	there, _ := fileutil.Exists(libPath)
	if !there {
		return
	}

	pkgr.resolveDefinitions(pkgr.LibDir, ENTRY_FILE)
}

func (pkgr *Packager) mergeWith(dep *Packager) {
	// should be safe to share maps -- dependencies won't be used after they're resolved

	if pkgr.TypeMap == nil {
		pkgr.TypeMap = dep.TypeMap
	} else {
		for name, _ := range dep.TypeMap {
			_, alreadyDeclared := pkgr.TypeMap[name]
			if alreadyDeclared {
				panic(fmt.Sprintf("redeclaration of type `%s` in different packages", name))
			} else {
				// should be safe to append, since inheritance requires supertypes to
				// be declared either in the same mixer or in a dependency, so the
				// invariant that subtypes come after their supertypes is maintained
				pkgr.TypeMap[name] = len(pkgr.TypeMap)
			}
		}
	}

	if pkgr.ExtensionMap == nil {
		pkgr.ExtensionMap = dep.ExtensionMap
	} else {
		// the previous step ensured that there are no conflicts, so just add the maps
		for sub, super := range dep.ExtensionMap {
			pkgr.ExtensionMap[sub] = super
		}
	}
}

func (pkgr *Packager) resolveDefinitions(dirName, fileName string) {
	// the existence of `fileName` should be verified by the caller
	defs := parser.ParseFile(pkgr.MixerDir, dirName, fileName)

	for _, f := range defs.Functions {
		// if it's an import
		if f.GetName() == "@import" {
			importPath := f.GetDescription()
			importExists, _ := fileutil.Exists(filepath.Join(pkgr.MixerDir, importPath))
			if !importExists {
				errURL := "http://help.moovweb.com/entries/22335641-importing-non-existent-files-in-functions-main-ts"
				msg := fmt.Sprintf("\n********\nin file %s:\nattempting to import nonexistent file %s\nPlease consult %s for more information about this error.\n********\n", filepath.Join(pkgr.LibDir, fileName), importPath, errURL)
				panic(msg)
			}
			println("importing", importPath)
			pkgr.resolveDefinitions(filepath.Dir(importPath), filepath.Base(importPath))

		// otherwise it's not an import
		} else {
			println("resolving def for", f.Stub(pkgr.Package))
		}
	}

}