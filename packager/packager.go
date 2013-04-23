package packager

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"sort"
)

import (
	"butler/mixer"
	fileutil "butler/fileutil"
	"tritium/parser"
	"tritium/whale"
	"tritium/packager/legacy"
	proto "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
	yaml "goyaml"
	"golog"
)

type downloader func (string, string) (*tp.Mixer, error)

type Packager struct {
	MixerDir          string
	LibDir            string
	IncludePaths      []string
	IsHttpTransformer bool
	Dependencies      map[string]string
	AlreadyLoaded     map[string]bool           // to avoid redundant loading of dependencies
	NowVisiting       map[string]bool           // to prevent circular dependencies
	TypeMap           map[string]int
	SuperclassOf      map[string]string
	// SubclassesOf      map[string][]string       // might not need this
	// Extensions        []string                  // type extensions in *this* mixer, not dependencies
	// FunctionsWith     map[string][]*tp.Function // for each type, maintain a list of functions that use it
	TypeList          []string
	Logger            *golog.Logger
	downloader        downloader
	*tp.Mixer
}

const (
	PACKAGER_VERSION            = 1
	SCRIPTS_DIR                 = "scripts"
	ENTRY_FILE                  = "main.ts"
	DEPS_FILE                   = "dependencies.yml"
	TYPES_FILE                  = "types.yml"
	HTTP_TRANSFORMERS_SIGNATURE = ".http-transformers"
)

func New(relSrcDir, libDir string, logger *golog.Logger, mixerDownloader downloader) *Packager {
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
	pkgr.PackagerVersion = proto.Int32(PACKAGER_VERSION)
	pkgr.readDependenciesFile()
	pkgr.AlreadyLoaded   = make(map[string]bool)
	pkgr.Logger          = logger
	pkgr.downloader      = mixerDownloader

	pkgr.Mixer.Package           = new(tp.Package)
	pkgr.Mixer.Package.Functions = make([]*tp.Function, 0)

	// TODO: need a real way to sign our special sauce
	tSigThere, _ := fileutil.Exists(filepath.Join(pkgr.MixerDir, HTTP_TRANSFORMERS_SIGNATURE))
	if tSigThere {
		pkgr.IsHttpTransformer = true
	}

	return pkgr
}

func NewFromCompiledMixer(mxr *tp.Mixer) *Packager {
	pkgr := new(Packager)
	pkgr.AlreadyLoaded     = make(map[string]bool)
	pkgr.IsHttpTransformer = mxr.GetIsHttpTransformer()
	pkgr.Mixer             = mxr

	// now reconstruct all the type information
	pkgr.TypeMap  = make(map[string]int)
	pkgr.TypeList = make([]string, len(mxr.Package.Types))

	for i, t := range mxr.Package.Types {
		pkgr.TypeMap[t.GetName()] = i
		pkgr.TypeList[i]          = t.GetName()
		if super := t.GetImplements(); super != 0 {
			if pkgr.SuperclassOf == nil {
				pkgr.SuperclassOf = make(map[string]string)
			}
			nameOfSuper := pkgr.TypeList[super]
			pkgr.SuperclassOf[t.GetName()] = nameOfSuper
			// pkgr.Extensions = append(pkgr.Extensions, fmt.Sprintf("%s < %s", t.GetName(), nameOfSuper))
		}
	}

	// Set up the submixer tables for relocation in legacy mixers -- not enough
	// metadata in legacy mixers, so the whole thing will be one submixer, and
	// we won't try to eliminate redundant submixers.
	// if pkgr.GetPackagerVersion() == 0 {
	// 	pkgr.Mixer.Submixers    = make([]*tp.SubmixerInfo, 1)
	// 	pkgr.Mixer.Submixers[0] = &tp.SubmixerInfo{
	// 		Name:    proto.String(pkgr.GetName()),
	// 		Version: proto.String(pkgr.GetVersion()),
	// 		Offset:  proto.Int32(int32(0)),
	// 		Length:  proto.Int32(int32(len(pkgr.Mixer.Package.Functions))),
	// 	}
	// }

	return pkgr
}

func NewDependencyOf(relSrcDir, libDir string, pkgr *Packager) *Packager {
	// dependency resolution is cumulative, so their stuff should be appended to
	// whatever has already been resolved
	dep := New(relSrcDir, libDir, pkgr.Logger, pkgr.downloader)
	dep.AlreadyLoaded           = pkgr.AlreadyLoaded
	dep.TypeMap                 = pkgr.TypeMap
	dep.SuperclassOf            = pkgr.SuperclassOf
	// dep.SubclassesOf            = pkgr.SubclassesOf
	// dep.Extensions              = pkgr.Extensions
	// dep.FunctionsWith           = pkgr.FunctionsWith
	// dep.Mixer.Submixers         = pkgr.Mixer.Submixers
	dep.Mixer.Package.Functions = pkgr.Mixer.Package.Functions
	return dep
}

func (pkgr *Packager) mergeWith(dep *Packager) {
	// Dependency loading is cumulative; tables are passed down and populated on
	// the way back up, then passed down again. So the tables that percolate up
	// are the most populated versions; just use those.
	pkgr.AlreadyLoaded           = dep.AlreadyLoaded
	pkgr.NowVisiting             = dep.NowVisiting
	pkgr.TypeMap                 = dep.TypeMap
	pkgr.SuperclassOf            = dep.SuperclassOf
	// pkgr.SubclassesOf            = dep.SubclassesOf
	// pkgr.Extensions              = dep.Extensions
	// pkgr.FunctionsWith           = dep.FunctionsWith
	// pkgr.Mixer.Submixers         = dep.Mixer.Submixers
	pkgr.Mixer.Package.Functions = dep.Mixer.Package.Functions
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

	// add the submixer boundary info
	// thisOffset := int32(len(pkgr.Mixer.Package.Functions))
	// info := &tp.SubmixerInfo{
	// 	Name: proto.String(pkgr.GetName()),
	// 	Version: proto.String(pkgr.GetVersion()),
	// 	Offset: proto.Int32(thisOffset),
	// 	// set the length below
	// }
	pkgr.resolveTypeDeclarations()
	pkgr.populateTypeList()
	pkgr.buildLib()
	// length of Functions array has changed; recompute it and subtract the last offset to get the length of this component
	// info.Length = proto.Int32(int32(len(pkgr.Mixer.Package.Functions))-thisOffset)
	// pkgr.Mixer.Submixers = append(pkgr.Mixer.Submixers, info)

	if pkgr.IsHttpTransformer {
		pkgr.Mixer.IsHttpTransformer = proto.Bool(true)
		pkgr.Mixer.Rewriters = tp.CollectFiles(filepath.Join(pkgr.MixerDir, SCRIPTS_DIR))
		if pkgr.Mixer.Package.Dependencies == nil {
			pkgr.Mixer.Package.Dependencies = make([]string, 0)
		}
		for name, version := range pkgr.Dependencies {
			pkgr.Mixer.Package.Dependencies = append(pkgr.Mixer.Package.Dependencies, fmt.Sprintf("%s:%s", name, version))
		}
	}
}

func (pkgr *Packager) resolveDependencies() {
	// sort the dependencies by name to guarantee a deterministic resolution order
	depList, i := make([]string, len(pkgr.Dependencies)), 0
	for name, _ := range pkgr.Dependencies {
		depList[i] = name
		i++
	}
	sort.Strings(depList)
	for _, name := range depList {
		if !pkgr.AlreadyLoaded[name] {
			pkgr.loadDependency(name, pkgr.Dependencies[name])
			pkgr.AlreadyLoaded[name] = true
		}
	}
}

func (pkgr *Packager) loadDependency(name, specifiedVersion string) {
	foundMixerSrc := false
	foundCompiledMixer := false
	// loop through the include paths and build the first dependency that we
	// find, then merge that dependency into the current mixer
	for _, incPath := range pkgr.IncludePaths {
		depPath := filepath.Join(incPath, name)
		there, err := fileutil.Exists(depPath)
		if !there || err != nil {
			continue
		}
		foundMixerSrc = true
		needed := NewDependencyOf(depPath, "lib", pkgr)

		if needed.GetVersion() != specifiedVersion {
			continue
		}
		// circular dependency check
		if pkgr.NowVisiting == nil {
			pkgr.NowVisiting = make(map[string]bool)
			pkgr.NowVisiting[pkgr.GetName()] = true
		}
		if pkgr.NowVisiting[needed.GetName()] {
			panic(fmt.Sprintf("circular dependency on %s", needed.GetName()))
		}
		// pass the dependency stack downwards ...
		needed.NowVisiting = pkgr.NowVisiting
		// ... and push the current mixer onto it
		needed.NowVisiting[needed.GetName()] = true

		needed.Build()
		pkgr.mergeWith(needed)

		// pop the dependency stack
		needed.NowVisiting[needed.GetName()] = false
		// don't need to pass it back up because maps are shared, and extending
		// them doesn't invalidate references to them (unlike slices)
		pkgr.Logger.Infof("  - built dependency `%s (%s)` from source", name, specifiedVersion)
		return
	}

	// if a mixer src dir isn't found, try to grab a compiled version locally
	mxr, mxErr := mixer.GetMixer(name, specifiedVersion)
	if mxErr == nil {
		foundCompiledMixer = true
		needed := NewFromCompiledMixer(mxr)
		pkgr.MergeCompiled(needed)
		pkgr.Logger.Infof("  - loaded dependency `%s (%s)` from local compiled mixer", name, specifiedVersion)
		return
	}

	// otherwise, try to download a compiled version from apollo
	mxr, mxErr = pkgr.downloader(name, specifiedVersion)
	if mxErr == nil {
		foundCompiledMixer = true
		needed := NewFromCompiledMixer(mxr)
		pkgr.MergeCompiled(needed)
		pkgr.Logger.Infof("  - loaded dependency `%s (%s)` from downloaded mixer", name, specifiedVersion)
		return
	}

	if foundMixerSrc || foundCompiledMixer {
		panic(fmt.Sprintf("version %s needed for dependency `%s` of `%s`",
		      specifiedVersion, name, pkgr.GetName()))
	}
	panic(fmt.Sprintf("unable to find dependency `%s` of `%s`", name, pkgr.GetName()))
}

func (pkgr *Packager) resolveTypeDeclarations() {
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
	if pkgr.SuperclassOf == nil {
		pkgr.SuperclassOf = make(map[string]string)
	}

	// now resolve the type declarations
	for _, typeDec := range typeDecs {
		// TODO: this logic is more complicated than it needs to be. Should really
		// just disallow any duplicate declarations. Anyway....

		// if the type doesn't extend anything ...
		if !strings.Contains(typeDec, "<") {
			_, isThere := pkgr.TypeMap[typeDec]
			if !isThere {
				pkgr.TypeMap[typeDec] = len(pkgr.TypeMap)
				pkgr.SuperclassOf[typeDec] = ""
				// if the type has already been declared, check for a semantic conflict
			} else if extendee := pkgr.SuperclassOf[typeDec]; extendee != "" {
				panic(fmt.Sprintf("type declaration `%s` conflicts with previous declaration `%s < %s`", typeDec, typeDec, extendee))
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
			extendee, subHasAlreadyExtended := pkgr.SuperclassOf[sub]				
			if subHasAlreadyExtended /* && extendee != super */ {
				var previousDec string
				if extendee == "" {
					previousDec = fmt.Sprintf("`%s` (extends nothing)", sub)
				} else if extendee == super {
					previousDec = fmt.Sprintf("`%s < %s` (duplicates not allowed)", sub, extendee)
				} else {
					previousDec = fmt.Sprintf("`%s < %s`", sub, extendee)
				}
				panic(fmt.Sprintf("type declaration `%s` conflicts with previous declaration %s", typeDec, previousDec))
			}
			// if we get this far, we can proceed with the type extension
			pkgr.TypeMap[sub] = len(pkgr.TypeMap)
			pkgr.SuperclassOf[sub] = super
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
			Implements: proto.Int32(int32(pkgr.TypeMap[pkgr.SuperclassOf[name]])),
		}
	}
}

func (pkgr *Packager) buildLib() {
	// tritium libraries are optional -- compile them if they're there, otherwise do nothing
	libPath := filepath.Join(pkgr.MixerDir, pkgr.LibDir, ENTRY_FILE)
	there, _ := fileutil.Exists(libPath)
	if !there {
		return
	}

	pkgr.resolveFunctions(pkgr.LibDir, ENTRY_FILE)

	// legacyPackage := &legacy.Package{}
	// legacyPackage.Package = pkgr.Package
	// for _, f := range pkgr.Package.Functions {
	// 	legacyPackage.ResolveFunctionDescendants(f)
	// }
}

func (pkgr *Packager) resolveFunctions(dirName, fileName string) {
	// the existence of `fileName` should be verified by the caller
	relPath := filepath.Join(dirName, fileName)
	defs := parser.ParseFile(pkgr.MixerDir, dirName, fileName)

	for _, f := range defs.Functions {
		// if it's an import stub ...
		if f.GetName() == "@import" {
			importPath := f.GetDescription()
			importExists, _ := fileutil.Exists(filepath.Join(pkgr.MixerDir, importPath))
			if !importExists {
				errURL := "http://help.moovweb.com/entries/22335641-importing-non-existent-files-in-functions-main-ts"
				msg := fmt.Sprintf("\n********\nin file %s:\nattempting to import nonexistent file %s\nPlease consult %s for more information about this error.\n********\n", relPath, importPath, errURL)
				panic(msg)
			}
			pkgr.resolveFunctions(filepath.Dir(importPath), filepath.Base(importPath))
			continue // to forgo appending it to the comprehensive list of functions

		// otherwise it's a proper function definition -- see if it's native
		} else if f.GetBuiltIn() {
			pkgr.resolveNativeDeclaration(f, relPath)

		// otherwise it's a user-defined function
		} else {
			pkgr.resolveUserDefinition(f, relPath)
		}

		pkgr.Package.Functions = append(pkgr.Package.Functions, f)
	}
}

// can't re-use the legacy native function resolver because it's a method of a
// type that provides its own helpers and contextual data, all of which would
// be too hard to reproduce
func (pkgr *Packager) resolveNativeDeclaration(f *tp.Function, path string) {
	// first we should check that the signature refers to something that actually exists
	sigStr := strings.Replace(f.Stub(pkgr.Package), ",", ".", -1)
	if whale.LookupBuiltIn(sigStr) == nil {
		panic(fmt.Sprintf("attempt to provide signature for nonexistent native function `%s` in `%s`", sigStr, path))
	}

	// now turn the type names into the appropriate numeric ids
	if returnType := f.GetReturnType(); len(returnType) > 0 {
		f.ReturnTypeId = proto.Int32(int32(pkgr.TypeMap[returnType]))
		f.ReturnType = nil
	}
	if scopeType := f.GetScopeType(); len(scopeType) > 0 {
		f.ScopeTypeId = proto.Int32(int32(pkgr.TypeMap[scopeType]))
		f.ScopeType = nil
	}
	if opensType := f.GetOpensType(); len(opensType) > 0 {
		f.OpensTypeId = proto.Int32(int32(pkgr.TypeMap[opensType]))
		f.OpensType = nil
	}
	for _, arg := range f.Args {
		if typeName := arg.GetTypeString(); len(typeName) > 0 {
			arg.TypeId = proto.Int32(int32(pkgr.TypeMap[typeName]))
			arg.TypeString = nil
		}
	}
}

func (pkgr *Packager) resolveUserDefinition(f *tp.Function, path string) {
	legacy.ResolveDefinition(pkgr.Package, f, path)
}

func (pkgr *Packager) MergeCompiled(dep *Packager) {
	errMsg := "may not combine legacy mixer %s (%s) with other mixers"
	if pkgr.GetPackagerVersion() == 0 {
		panic(fmt.Sprintf(errMsg, pkgr.GetName(), pkgr.GetVersion()))
	} else if dep.GetPackagerVersion() == 0 {
		panic(fmt.Sprintf(errMsg, dep.GetName(), dep.GetVersion()))
	}
	pkgr.mergeAndRelocateTypes(dep)
	pkgr.mergeAndRelocateCalls(dep)
}

func (pkgr *Packager) mergeAndRelocateTypes(dep *Packager) {
	typeRelocations   := make(map[int]int)
	typeRelocations[-1] = -1

	for id, name := range dep.TypeList {
		existingId, there := pkgr.TypeMap[name]
		if there {
			depSuper, depExtended := dep.SuperclassOf[name]
			pkgrSuper, pkgrExtended := pkgr.SuperclassOf[name]
			if depExtended && pkgrExtended && depSuper == pkgrSuper {
				typeRelocations[id] = existingId
			} else if !depExtended && !pkgrExtended {
				typeRelocations[id] = existingId
			} else {
				panic(fmt.Sprintf("redeclaration of %s in compiled mixer %s", name, dep.GetName()))
			}
		} else {
			if pkgr.TypeMap == nil {
				pkgr.TypeMap = make(map[string]int)
			}
			newId := len(pkgr.TypeMap)
			pkgr.TypeMap[name]  = newId
			typeRelocations[id] = newId
			super, isExtended := dep.SuperclassOf[name]
			if isExtended {
				if pkgr.SuperclassOf == nil {
					pkgr.SuperclassOf = make(map[string]string)
				}
				pkgr.SuperclassOf[name] = super
			}
		}
	}
	pkgr.populateTypeList()
	for _, f := range dep.Mixer.Package.Functions {
		f.RelocateTypes(typeRelocations)
	}
}

func (pkgr *Packager) mergeAndRelocateCalls(dep *Packager) {
	offset := len(pkgr.Mixer.Package.Functions)
	for _, f := range dep.Mixer.Package.Functions {
		f.RelocateCallsBy(offset)
	}
	pkgr.Mixer.Package.Functions = append(pkgr.Mixer.Package.Functions, dep.Mixer.Package.Functions...)
}