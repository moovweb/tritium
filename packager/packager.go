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
	"tritium/whale"
	"tritium/packager/legacy"
	proto "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
	yaml "goyaml"
)

type Packager struct {
	MixerDir          string
	LibDir            string
	IncludePaths      []string
	IsHttpTransformer bool
	IsStandardLibrary bool
	Dependencies      map[string]string
	AlreadyLoaded     map[string]bool           // to avoid redundant loading of dependencies
	NowVisiting       map[string]bool           // to prevent circular dependencies
	TypeMap           map[string]int
	SuperclassOf      map[string]string
	SubclassesOf      map[string][]string       // might not need this
	Extensions        []string                  // type extensions in *this* mixer, not dependencies
	FunctionsWith     map[string][]*tp.Function // for each type, maintain a list of functions that use it
	TypeList          []string
	*tp.Mixer
}

const (
	PACKAGER_VERSION            = 1
	SCRIPTS_DIR                 = "scripts"
	ENTRY_FILE                  = "main.ts"
	DEPS_FILE                   = "dependencies.yml"
	TYPES_FILE                  = "types.yml"
	HTTP_TRANSFORMERS_SIGNATURE = ".http-transformers"
	STANDARD_LIBRARY_SIGNATURE  = ".standard-library"
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
	pkgr.AlreadyLoaded   = make(map[string]bool)

	pkgr.Mixer.Package      = new(tp.Package)
	pkgr.Mixer.Package.Name = proto.String(pkgr.Mixer.GetName())
	pkgr.Mixer.Package.Path = proto.String(pkgr.MixerDir)

	// TODO: need a real way to sign our special sauce
	tSigThere, _ := fileutil.Exists(filepath.Join(pkgr.MixerDir, HTTP_TRANSFORMERS_SIGNATURE))
	if tSigThere {
		pkgr.IsHttpTransformer = true
	}
	sSigThere, _ := fileutil.Exists(filepath.Join(pkgr.MixerDir, STANDARD_LIBRARY_SIGNATURE))
	if sSigThere {
		pkgr.IsStandardLibrary = true
	}

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
	pkgr.resolveTypeDeclarations()
	pkgr.populateTypeList()
	pkgr.buildLib()
	if pkgr.IsHttpTransformer {
		pkgr.Mixer.Rewriters = tp.CollectFiles(filepath.Join(pkgr.MixerDir, SCRIPTS_DIR))
	}
	if pkgr.IsStandardLibrary {
		pkgr.Mixer.Package.StandardLibraryCutoff = proto.Int32(int32(len(pkgr.Mixer.Package.Functions)))
	}
}

func (pkgr *Packager) resolveDependencies() {
	for name, version := range pkgr.Dependencies {
		if !pkgr.AlreadyLoaded[name] {
			pkgr.loadDependency(name, version)
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
		needed := New(depPath, "lib")
		if needed.GetVersion() != specifiedVersion {
			continue
		}
		// circular dependency check
		depName := needed.Mixer.GetName()
		if pkgr.NowVisiting == nil {
			pkgr.NowVisiting = make(map[string]bool)
			pkgr.NowVisiting[pkgr.Mixer.GetName()] = true
		}
		if pkgr.NowVisiting[depName] {
			panic(fmt.Sprintf("circular dependency on %s", depName))
		} else {
			needed.NowVisiting = pkgr.NowVisiting
			needed.NowVisiting[depName] = true
		}

		needed.Build()
		pkgr.mergeWith(needed)
		// now pop the dependency stack
		needed.NowVisiting[depName] = false
		return
	}

	// TODO: check if the dependency is among the compiled mixers

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

		// if the type doesn't extend anything ...
		if !strings.Contains(typeDec, "<") {
			_, isThere := pkgr.TypeMap[typeDec]
			if !isThere {
				pkgr.TypeMap[typeDec] = len(pkgr.TypeMap)
				pkgr.SuperclassOf[typeDec] = ""
				// if the type has already been declared, check for a semantic conflict
			} else if extendee := pkgr.SuperclassOf[typeDec]; extendee != "" {
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
			extendee, subHasAlreadyExtended := pkgr.SuperclassOf[sub]				
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
			pkgr.SuperclassOf[sub] = super
		}
	}

	// println()
	// println("TYPES:")
	// for name, id := range pkgr.TypeMap {
	// 	println(name, id)
	// }
	// println()
	// println("EXTENSIONS:")
	// for sub, super := range pkgr.SuperclassOf {
	// 	if super != "" {
	// 		println(sub, "<", super)
	// 	} else {
	// 		println(sub)
	// 	}
	// }
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
	// println()
	// println("TYPES IN ORDER:")
	// for _, typeObj := range pkgr.Package.Types {
	// 	println(typeObj.GetName())
	// }
}

func (pkgr *Packager) buildLib() {
	// println("***")
	// println("***")
	// tritium libraries are optional -- compile them if they're there, otherwise do nothing
	libPath := filepath.Join(pkgr.MixerDir, pkgr.LibDir, ENTRY_FILE)
	there, _ := fileutil.Exists(libPath)
	if !there {
		return
	}

	pkgr.resolveFunctions(pkgr.LibDir, ENTRY_FILE)

	legacyPackage := &legacy.Package{}
	legacyPackage.Package = pkgr.Package
	for _, f := range pkgr.Package.Functions {
		// println()
		// println("considering", pkgr.Package.GetTypeName(f.GetScopeTypeId()), f.Stub(pkgr.Package), "for replication")
		legacyPackage.ResolveFunctionDescendants(f)
	}
}

func (pkgr *Packager) mergeWith(dep *Packager) {
	// should be safe to share maps -- dependencies won't be used after they're resolved

	if len(pkgr.AlreadyLoaded) == 0 {
		pkgr.AlreadyLoaded = dep.AlreadyLoaded
	} else {
		for name, isLoaded := range dep.AlreadyLoaded {
			pkgr.AlreadyLoaded[name] = isLoaded
		}
	}

	if len(pkgr.TypeMap) == 0 {
		pkgr.TypeMap = dep.TypeMap
	} else {
		for name, _ := range dep.TypeMap {
			_, alreadyDeclared := pkgr.TypeMap[name]
			if alreadyDeclared {
				panic(fmt.Sprintf("redeclaration of type `%s` in different packages", name))
			} else {
				// should be safe to append because inheritance requires supertypes to
				// be declared either in the same mixer or in a dependency, thereby
				// maintaining the invariant that subtypes come after their supertypes
				pkgr.TypeMap[name] = len(pkgr.TypeMap)
			}
		}
	}

	if len(pkgr.SuperclassOf) == 0 {
		pkgr.SuperclassOf = dep.SuperclassOf
	} else {
		// the previous step ensured that there are no conflicts, so just add the maps
		for sub, super := range dep.SuperclassOf {
			pkgr.SuperclassOf[sub] = super
		}
	}

	// Don't forget to merge the function lists too!
	if len(pkgr.Mixer.Package.Functions) == 0 {
		pkgr.Mixer.Package.Functions = dep.Mixer.Package.Functions
	} else {
		for _, f := range dep.Mixer.Package.Functions {
			pkgr.Mixer.Package.Functions = append(pkgr.Mixer.Package.Functions, f)
		}
	}
	if dep.IsStandardLibrary {
		pkgr.Mixer.Package.StandardLibraryCutoff = proto.Int32(int32(len(pkgr.Mixer.Package.Functions)))
	}

	// Don't need to merge the protobuf type lists because those get rebuilt from the Packager type maps.
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
			// println("importing", importPath)
			pkgr.resolveFunctions(filepath.Dir(importPath), filepath.Base(importPath))
			continue // to forgo appending it to the comprehensive list of functions

		// otherwise it's a proper function definition -- see if it's native
		} else if f.GetBuiltIn() {
			// println("resolving declaration for native function", pkgr.Package.GetTypeName(f.GetScopeTypeId()), f.Stub(pkgr.Package))
			pkgr.resolveNativeDeclaration(f, relPath)

		// otherwise it's a user-defined function
		} else {
			// println("resolving user-defined function", pkgr.Package.GetTypeName(f.GetScopeTypeId()), f.Stub(pkgr.Package))
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