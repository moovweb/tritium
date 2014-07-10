package packager

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	// "sort"
	"strings"
)

import (
	fileutil "tritium/dependencies/butler/fileutil"
	"tritium/dependencies/butler/mixer"
	proto "code.google.com/p/goprotobuf/proto"
	"tritium/dependencies/golog"
	yaml "tritium/dependencies/goyaml"
	"tritium/packager/legacy"
	"tritium/parser"
	tp "tritium/proto"
	. "tritium/util"
	"tritium/whale"
)

type downloader func(string, string) (*tp.Mixer, error)

type NameAndVersion struct {
	Name    string
	Version string
}

type Packager struct {
	MixerDir                 string
	LibDir                   string
	IncludePaths             []string
	IsHttpTransformer        bool
	MayBuildHttpTransformers bool
	Dependencies             []NameAndVersion
	AlreadyLoaded            map[string]bool // to avoid redundant loading of dependencies
	NowVisiting              map[string]bool // to prevent circular dependencies
	TypeMap                  map[string]int
	SuperclassOf             map[string]string
	TypeList                 []string
	Logger                   *golog.Logger
	downloader               downloader
	*tp.Mixer
	Ranges                   []Range
	CachedDependencies       map[string]*Packager
}

const (
	PACKAGER_VERSION            = 1
	SCRIPTS_DIR                 = "scripts"
	ENTRY_FILE                  = "main.ts"
	DEPS_FILE                   = "dependencies.yml"
	TYPES_FILE                  = "types.yml"
	HTTP_TRANSFORMERS_SIGNATURE = ".http-transformers"
)

func New(relSrcDir, libDir string, mayBuildHttpTransformers bool, logger *golog.Logger, mixerDownloader downloader) *Packager {
	pkgr := new(Packager)

	wd, wdErr := os.Getwd()
	if wdErr != nil {
		panic("unable to determine current directory for mixer creation")
	}

	absSrcDir, absErr := filepath.Abs(relSrcDir)
	if absErr != nil {
		panic("unable to absolutize mixer source directory for mixer creation")
	}
	absSrcDir = filepath.Clean(absSrcDir)

	pkgr.MixerDir = absSrcDir
	pkgr.LibDir = libDir
	pkgr.IncludePaths = make([]string, 2) // support more in the future as a command-line option
	pkgr.IncludePaths[0] = wd
	pkgr.IncludePaths[1] = filepath.Dir(absSrcDir)

	pkgr.Mixer = tp.NewMixer(absSrcDir)
	pkgr.PackagerVersion = proto.Int32(PACKAGER_VERSION)
	pkgr.readDependenciesFile()
	pkgr.AlreadyLoaded = make(map[string]bool)
	pkgr.Logger = logger
	pkgr.downloader = mixerDownloader

	pkgr.Mixer.Package = new(tp.Package)
	pkgr.Mixer.Package.Functions = make([]*tp.Function, 0)

	pkgr.MayBuildHttpTransformers = mayBuildHttpTransformers
	tSigThere, _ := fileutil.Exists(filepath.Join(pkgr.MixerDir, HTTP_TRANSFORMERS_SIGNATURE))
	if tSigThere {
		pkgr.IsHttpTransformer = true
		if !pkgr.MayBuildHttpTransformers {
			panic("you are not authorized to build HTTP transformer mixers")
		}
	}

	pkgr.Ranges = make([]Range, 0)
	pkgr.CachedDependencies = make(map[string]*Packager)

	return pkgr
}

func NewFromCompiledMixer(mxr *tp.Mixer) *Packager {
	pkgr := new(Packager)
	pkgr.AlreadyLoaded = make(map[string]bool)
	pkgr.IsHttpTransformer = mxr.GetIsHttpTransformer()
	pkgr.Mixer = mxr

	// now reconstruct all the type information
	pkgr.TypeMap = make(map[string]int)
	pkgr.TypeList = make([]string, len(mxr.Package.Types))

	for i, t := range mxr.Package.Types {
		pkgr.TypeMap[t.GetName()] = i
		pkgr.TypeList[i] = t.GetName()
		if super := t.GetImplements(); super != 0 {
			if pkgr.SuperclassOf == nil {
				pkgr.SuperclassOf = make(map[string]string)
			}
			nameOfSuper := pkgr.TypeList[super]
			pkgr.SuperclassOf[t.GetName()] = nameOfSuper
		}
	}

	pkgr.Ranges = make([]Range, 1)
	numFunctions := len(pkgr.Package.Functions)
	numExports := int(pkgr.Package.GetNumExports())
	rangeStart := numFunctions - numExports
	if numExports == 0 {
		rangeStart = 0
	}
	newRange := Range{ Start: rangeStart, End: numFunctions }
	pkgr.Ranges[0] = newRange
	pkgr.CachedDependencies = make(map[string]*Packager)

	return pkgr
}

func NewDependencyOf(relSrcDir, libDir string, pkgr *Packager) *Packager {
	// dependency resolution is cumulative, so their stuff should be appended to
	// whatever has already been resolved
	dep := New(relSrcDir, libDir, pkgr.MayBuildHttpTransformers, pkgr.Logger, pkgr.downloader)
	dep.AlreadyLoaded = pkgr.AlreadyLoaded
	dep.TypeMap = pkgr.TypeMap
	dep.SuperclassOf = pkgr.SuperclassOf
	dep.Mixer.Package.Functions = pkgr.Mixer.Package.Functions
	dep.CachedDependencies = pkgr.CachedDependencies
	return dep
}

func (pkgr *Packager) mergeWith(dep *Packager) {
	// Dependency loading is cumulative; tables are passed down and populated on
	// the way back up, then passed down again. The tables that percolate up
	// are the most up-to-date versions; just use those.
	pkgr.AlreadyLoaded = dep.AlreadyLoaded
	pkgr.NowVisiting = dep.NowVisiting
	pkgr.TypeMap = dep.TypeMap
	pkgr.SuperclassOf = dep.SuperclassOf
	pkgr.Mixer.Package.Functions = dep.Mixer.Package.Functions
	pkgr.CachedDependencies = dep.CachedDependencies
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
	// Don't use yaml.Unmarshal here -- we don't want to store the dependencies
	// as a hash table because it removes the original ordering. We need to load
	// dependencies in the order specified in `dependencies.yml` to avoid
	// unintuitive behavior in case the dependencies override each other's
	// functions.
	depStr := strings.TrimSpace(string(data))
	depLines := strings.Split(depStr, "\n")
	pkgr.Dependencies = make([]NameAndVersion, len(depLines))
	for i, line := range depLines {
		fields := strings.Split(line, ":")
		if len(fields) != 2 {
			panic(fmt.Sprintf("error parsing dependencies file for `%s` -- each dependency must take the form of `name: version`", pkgr.GetName()))
		}
		pkgr.Dependencies[i] = NameAndVersion{
			Name: strings.TrimSpace(fields[0]),
			Version: strings.TrimSpace(fields[1]),
		}
	}
}

func (pkgr *Packager) Build() {
	pkgr.resolveDependencies()

	lenDeps := len(pkgr.Package.Functions)

	pkgr.resolveTypeDeclarations()
	pkgr.populateTypeList()
	pkgr.buildLib()

	if pkgr.IsHttpTransformer {
		pkgr.Mixer.IsHttpTransformer = proto.Bool(true)
		pkgr.Mixer.Rewriters = tp.CollectFiles(filepath.Join(pkgr.MixerDir, SCRIPTS_DIR))
		if pkgr.Mixer.Package.Dependencies == nil {
			pkgr.Mixer.Package.Dependencies = make([]string, len(pkgr.Dependencies))
		}
		for i, nameAndVersion := range pkgr.Dependencies {
			name, version := nameAndVersion.Name, nameAndVersion.Version
			pkgr.Mixer.Package.Dependencies[i] = fmt.Sprintf("%s:%s", name, version)
		}
	}

	// Let NumExports potentially be zero -- it's up to the user to check and set
	// the export range to the whole package if it is actually zero.
	pkgr.Package.NumExports = proto.Int32(int32(len(pkgr.Package.Functions) - lenDeps))
}

func (pkgr *Packager) resolveDependencies() {
	for _, nameAndVersion := range pkgr.Dependencies {
		name, version := nameAndVersion.Name, nameAndVersion.Version
		if !pkgr.AlreadyLoaded[name] {
			pkgr.loadDependency(name, version)
			pkgr.AlreadyLoaded[name] = true
		} else {
			// if this dependency has already been loaded, we still need to grab its export range
			needed := pkgr.CachedDependencies[name]
			newRange := needed.Ranges[len(needed.Ranges)-1]
			// if the mixer doesn't export anything, make it export EVERYTHING
			if newRange.End - newRange.Start == 0 {
				newRange.Start = newRange.End - len(needed.Package.Functions)
			}
			pkgr.Ranges = append(pkgr.Ranges, newRange)
		}
	}
}

func (pkgr *Packager) loadDependency(name, specifiedVersion string) {
	foundMixerSrc := false
	foundCompiledMixer := false
	var needed *Packager
	// loop through the include paths and build the first dependency that we
	// find, then merge that dependency into the current mixer
	for _, incPath := range pkgr.IncludePaths {
		depPath := filepath.Join(incPath, name)
		there, err := fileutil.Exists(depPath)
		if !there || err != nil {
			continue
		}
		foundMixerSrc = true
		needed = NewDependencyOf(depPath, "lib", pkgr)

		if needed.GetVersion() != specifiedVersion {
			continue
		}
		// circular dependency check
		if pkgr.NowVisiting == nil {
			pkgr.NowVisiting = make(map[string]bool)
			pkgr.NowVisiting[pkgr.GetName()] = true
		}
		if pkgr.NowVisiting[needed.GetName()] {
			panic(fmt.Sprintf("circular dependency on `%s`", needed.GetName()))
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
		pkgr.Logger.Infof("  - built dependency `%s` (%s) from source", name, specifiedVersion)
		break
	}

	var mxr *tp.Mixer
	var mxErr error
	// if a mixer src dir isn't found, try to grab a compiled version locally
	if !foundMixerSrc {
		mxr, mxErr = mixer.GetMixer(name, specifiedVersion)
		if mxErr == nil {
			foundCompiledMixer = true
			needed = NewFromCompiledMixer(mxr)
			pkgr.MergeCompiled(needed)
			pkgr.Logger.Infof("  - loaded dependency `%s` (%s) from local compiled mixer", name, specifiedVersion)
		}
	}

	// otherwise, try to download a compiled version from apollo
	if !foundMixerSrc && !foundCompiledMixer {
		mxr, mxErr = pkgr.downloader(name, specifiedVersion)
		if mxErr == nil {
			foundCompiledMixer = true
			needed = NewFromCompiledMixer(mxr)
			pkgr.MergeCompiled(needed)
			pkgr.Logger.Infof("  - loaded dependency `%s` (%s) from downloaded mixer", name, specifiedVersion)
		}
	}

	// for all cases, if there's no error, add the export range of this dependency
	// to the current mixer and return
	if mxErr == nil {
		newRange := Range{}
		newRange.End = len(pkgr.Package.Functions)
		newRange.Start = newRange.End - int(needed.Package.GetNumExports())
		// if the mixer doesn't export anything, make it export EVERYTHING
		if newRange.End - newRange.Start == 0 {
			newRange.Start = newRange.End - len(needed.Package.Functions)
		}
		pkgr.Ranges = append(pkgr.Ranges, newRange)
		// store this in case we need to grab some metadata from an already-loaded mixer
		pkgr.CachedDependencies[needed.GetName()] = needed
		return
	}

	// if we get to this point, there is an error
	if foundMixerSrc || foundCompiledMixer {
		panic(fmt.Sprintf("version %s needed for dependency `%s` of `%s`",
			specifiedVersion, name, pkgr.GetName()))
	}
	panic(fmt.Sprintf("unable to find dependency `%s` of `%s`", name, pkgr.GetName()))
}

func (pkgr *Packager) resolveTypeDeclarations() {
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
	typeDecs := make([]string, 0)
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
			// parse the subtype and supertype
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
			Name:       proto.String(name),
			Implements: proto.Int32(int32(pkgr.TypeMap[pkgr.SuperclassOf[name]])),
		}
	}
}

func (pkgr *Packager) buildLib() {
	// Push another export range onto the list of export ranges -- we need to do
	// this to ensure that any given function can reference other functions that
	// are defined before it in the current mixer. Also, this needs to be outside
	// resolveFunctions because the latter is recursive, and we don't want to
	// push more than one export range for the current mixer. Also also, we need
	// to do this even if there are no implementation files -- that way we push
	// an empty range that tells the downstream functions that this package
	// should export everything.
	pkgr.Ranges = append(pkgr.Ranges, Range{Start: len(pkgr.Package.Functions), End: len(pkgr.Package.Functions)})

	// tritium libraries are optional -- compile them if they're there, otherwise do nothing
	libPath := filepath.Join(pkgr.MixerDir, pkgr.LibDir, ENTRY_FILE)
	there, _ := fileutil.Exists(libPath)
	if !there {
		return
	}

	pkgr.resolveFunctions(pkgr.LibDir, ENTRY_FILE)
}

func (pkgr *Packager) resolveFunctions(dirName, fileName string) {
	// the existence of `fileName` should be verified by the caller
	relPath := filepath.Join(dirName, fileName)
	defs := parser.ParseFile(pkgr.MixerDir, dirName, fileName, true, make([]string, 0))

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
		// now extend the last export range so that it includes the newly-resolved function
		lastRange := pkgr.Ranges[len(pkgr.Ranges)-1]
		pkgr.Ranges[len(pkgr.Ranges)-1] = Range{Start: lastRange.Start, End: lastRange.End+1}
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
	legacy.ResolveDefinition(pkgr.Package, f, path, pkgr.Ranges...)
}

func (pkgr *Packager) mergeAndRelocateTypes(dep *Packager) {
	typeRelocations := make(map[int]int)
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
			pkgr.TypeMap[name] = newId
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

func GetPkgdMixers(mixers []*tp.Mixer, transformerRequired bool) (httpTransformer, combinedMixer *tp.Mixer, exportRanges []Range, successMsg string, err error) {
	// convert mixers to packagers, fish out the http transformers so we can
	// compile them separately, and guard agains multiple transformers
	packagersFromMixers := make([]*Packager, len(mixers))
	for i, mxr := range mixers {
		packagersFromMixers[i] = NewFromCompiledMixer(mxr)
	}
	foundTransformer := false
	foundLegacyMixer := false
	var legacyMixerName string
	var first *Packager
	var rest []*Packager
	for i, pkgr := range packagersFromMixers {
		if pkgr.GetPackagerVersion() == 0 {
			legacyMixerName = fmt.Sprintf("`%s` (%s)", pkgr.GetName(), pkgr.GetVersion())
			foundLegacyMixer = true
		}
		if pkgr.IsHttpTransformer {
			if foundTransformer {
				err = errors.New("Conflicting HTTP transformer mixers specified in project.")
				return
			}
			first = pkgr
			rest = append(packagersFromMixers[:i], packagersFromMixers[i+1:]...)
			foundTransformer = true
		}
	}
	if foundLegacyMixer {
		if len(mixers) > 1 {
			err = errors.New(fmt.Sprintf("Legacy mixer %s may not be used with other mixers.", legacyMixerName))
			return
		}
		first = packagersFromMixers[0]
	} else if !foundTransformer && transformerRequired {
		err = errors.New("Your project must specify an HTTP transformer mixer in the Mixer.lock file.\n" +
			"       Visit https://console.moovweb.com/learn/docs/local/mixers#The+Core+Mixer for more info.")
		return
	}

	exportRanges = make([]Range, len(packagersFromMixers))
	// stash a copy of the mixer that has the transformers
	if transformerRequired {
		httpTransformer = first.Mixer.Clone()
		successMsg = fmt.Sprintf("Mixer %s (%s) successfully loaded.", first.GetName(), first.GetVersion())
	}
	if len(rest) == 0 && first == nil && !transformerRequired {
		first = packagersFromMixers[0]
		if len(packagersFromMixers) > 1 {
			rest = packagersFromMixers[1:]
		}
	}

	numExports := int(first.Package.GetNumExports())
	numFunctions := len(first.Package.Functions)
	if numExports == 0 {
		numExports = numFunctions
	}
	exportRanges[0] = Range{ numFunctions-numExports, numFunctions }

	// now merge the rest of the mixers into the transformer mixer!
	for i, pkgr := range rest {
		first.MergeCompiled(pkgr)
		successMsg += fmt.Sprintf("\nMixer %s (%s) successfully loaded.", pkgr.GetName(), pkgr.GetVersion())
		numFunctions := len(first.Package.Functions)
		numExports := int(pkgr.Package.GetNumExports())
		newRange := Range{ numFunctions-numExports, numFunctions }
		if numExports == 0 {
			newRange.Start = numFunctions - len(pkgr.Package.Functions)
		}
		exportRanges[i+1] = newRange
	}
	combinedMixer = first.Mixer
	return
}


