package legacy

import (
	proto "code.google.com/p/goprotobuf/proto"
	// "fmt"
	"tritium/dependencies/golog"
	"os"
	"path/filepath"
	"strings"
	// "time"
	tp "tritium/proto"
)

type Error struct {
	Code    int
	Message string
}

const (
	NOT_FOUND = iota
	BUILD_ERROR
)

type Package struct {
	loaded       []*PackageInfo
	LoadPath     string
	FallbackPath string
	OutputFile   string
	Log          *golog.Logger
	*tp.Package
	Options PackageOptions
}

type PackageInfo struct {
	Name         string
	Dependencies []string
	Types        []string
}

var DefaultPackagePath = "packages"

func LoadDefaultPackage(path *string) *Package {
	if path == nil {
		path = &DefaultPackagePath
	}

	return buildPackage(*path, nil)
}

func OutputPackage(pkgPath, outPath string) (pkg *Package, newFilePath string) {
	pkg = BuildPackage(pkgPath)

	_, err := os.Stat(outPath)
	if err != nil {
		creationErr := os.MkdirAll(outPath, os.FileMode(0777))
		if creationErr != nil {
			panic("Could not make path(" + outPath + "). Error: " + creationErr.Error())
		}
	}

	_, name := filepath.Split(pkg.OutputFile)
	newOutputFile := filepath.Join(outPath, name)
	os.Rename(pkg.OutputFile, newOutputFile)

	return pkg, newOutputFile
}

func OutputDefaultPackage(path string) (pkg *Package, newFilePath string) {
	return OutputPackage(DefaultPackagePath, path)
}

func BuildPackage(path string) *Package {
	options := BuildOptions()
	return buildPackage(path, options)
}

func BuildDefaultPackage() *Package {
	// println("BUILD DEFAULT PACKAGE")
	return BuildPackage(DefaultPackagePath)
}

func buildPackage(path string, options PackageOptions) *Package {
	// Terrible directory handling here... has to be executed from Tritium root

	pkg := NewPackage(path, options)
	rootName := "tritium"

	pkg.Name = proto.String(rootName)
	pkg.Load(rootName)
	return pkg
}

func mergeOptions(options PackageOptions) PackageOptions {
	defaults := fetchDefaultOptions()

	if options == nil {
		return defaults
	}

	for k, _ := range defaults {
		_, ok := options[k]

		if !ok {
			options[k] = defaults[k]
		}
	}

	return options
}

func NewPackage(loadPath string, options PackageOptions) *Package {
	options = mergeOptions(options)

	return &Package{
		Package: &tp.Package{
			Name:         proto.String("combined"),
			Functions:    make([]*tp.Function, 0),
			Types:        make([]*tp.Type, 0),
			Dependencies: make([]string, 0),
			Path:         proto.String(loadPath),
		},
		loaded:   make([]*PackageInfo, 0),
		Log:      newLog(),
		LoadPath: loadPath,
		Options:  options,
	}
}

func (pkg *Package) BuildUserPackage(loadPath *string, fallbackPath *string) {
	userPackage := NewUserPackage(loadPath, fallbackPath)
	pkg.Merge(userPackage.Package)
}

func NewUserPackage(loadPath *string, fallbackPath *string) *Package {
	//TODO : Check for user-defined feature support

	userPackage := NewPackage(*loadPath, PackageOptions{"stdout": false, "output_tpkg": false, "use_tpkg": false})

	userPackage.FallbackPath = *fallbackPath

	userPackages, _ := filepath.Glob(filepath.Join(userPackage.LoadPath, "*"))

	for _, path := range userPackages {
		// println("\tUSER PACKAGE", path)
		components := strings.Split(path, "/")
		name := components[len(components)-1]
		userPackage.Load(name)
	}

	return userPackage
}

func newLog() *golog.Logger {
	consoleProcessor := golog.NewConsoleProcessor(golog.LOG_ERR, true)
	pkgLog := golog.NewLogger("tritium")
	pkgLog.AddProcessor("console", consoleProcessor)
	return pkgLog
}

func (pkg *Package) Load(packageName string) {
	err := pkg.LoadFromPath(filepath.Join(pkg.LoadPath, packageName), packageName)

	if err != nil && len(pkg.FallbackPath) != 0 {
		err = pkg.LoadFromPath(filepath.Join(pkg.FallbackPath, packageName), packageName)
	}

	if err != nil {
		panic(err.Message)
	}


}

func (pkg *Package) LoadFromPath(loadPath string, name string) *Error {
	// LoadPath is the full path to the mixer
	// Since the path won't always end w the name (e.g. user defined function / mixer packages), specify the name as well
	// println("LOAD FROM PATH", loadPath)
	fullName := loadPath + ":" + name
	pkg.Println(fullName)
	pkg.Log.Infof("\n\n\n\nLoading:%v", fullName)

	loaded := pkg.loadedDependency(name)
	if loaded {
		return nil
	}

	if pkg.Options["use_tpkg"] {
		err := pkg.LoadFromFile(loadPath)
		if err == nil {
			return nil
		} else if err != nil && err.Code != NOT_FOUND {
			return err
		}
	}

	// s := time.Now()
	info, err := ReadPackageInfoFile(loadPath)
	// f := time.Now()
	// d := float64(f.Sub(s)) / 1000.0 / 1000.0 / 1000.0
	// fmt.Printf("Time to read package info: %0.6fs\n", d)

	if err != nil {
		return &Error{
			Code:    NOT_FOUND,
			Message: "Can't find package at: " + loadPath + " -- missing package info file.",
		}
	}

	// s = time.Now()
	if len(info.Dependencies) > 0 {
		for _, dependency := range info.Dependencies {
			pkg.loadPackageDependency(dependency)
		}
	}

	// f = time.Now()
	// d = float64(f.Sub(s)) / 1000.0 / 1000.0 / 1000.0
	// fmt.Printf("Time to load dependencies: %0.6fs\n", d)

	// s = time.Now()
	for _, typeName := range info.Types {
		split := strings.Split(typeName, " < ")
		typeObj := &tp.Type{}
		if len(split) == 2 {
			typeName = split[0]
			index := pkg.findTypeIndex(split[1])

			typeObj.Implements = proto.Int32(int32(index))
		}
		typeObj.Name = proto.String(typeName)
		pkg.Types = append(pkg.Types, typeObj)
	}
	// f = time.Now()
	// d = float64(f.Sub(s)) / 1000.0 / 1000.0 / 1000.0
	// fmt.Printf("Time to resolve types: %0.6fs\n", d)

	// s = time.Now()
	pkg.readHeaderFile(loadPath)
	// f = time.Now()
	// d = float64(f.Sub(s)) / 1000.0 / 1000.0 / 1000.0
	// fmt.Printf("Time to load header: %0.6fs\n", d)

	// s = time.Now()
	entryPoint := filepath.Join(loadPath, "functions.ts")
	pkg.Path = proto.String(entryPoint)

	// println("func ReadPackageDefinitions")
	// println("loadpath:", loadPath)
	// println()
	projPath, scriptPath := filepath.Split(loadPath)
	ReadPackageDefinitions(pkg.Package, projPath, scriptPath, "functions.ts")

	if pkg.Options["generate_docs"] {
		println("*** GENERATING DOCS ***")
		pkg.CollectFunctionDocs()
	}

	// f = time.Now()
	// d = float64(f.Sub(s)) / 1000.0 / 1000.0 / 1000.0
	// fmt.Printf("Time to load definitions: %0.6fs\n", d)

	// s = time.Now()
	pkg.inheritFunctions()
	// f = time.Now()
	// d = float64(f.Sub(s)) / 1000.0 / 1000.0 / 1000.0
	// fmt.Printf("Time to resolve inheritances: %0.6fs\n", d)

	if pkg.Options["output_tpkg"] {
		pkg.write()
	}

	pkg.Println(" -- done")
	pkg.Log.Close()

	return nil
}

// Assumes access to raw packages
// This will only be true on dev / build boxes

func NewRootPackage(rootPackagePath string, name string, dataPath string) *Package {
	// println("NEW ROOT PACKAGE", dataPath)
	rootPackage := NewPackage(rootPackagePath, PackageOptions{"stdout": false, "output_tpkg": false, "use_tpkg": true})

	rootPackage.FallbackPath = filepath.Join(dataPath, "packages")
	// This works out ok since the packager loadDependency() code path will check fallbacks for .tpkg's
	return rootPackage
}

func BuildRootPackage(rootPackage *Package, rootPackagePath string, name string) (loadError *Error) {
	// println("func BuildRootPackage")
	// println("root package path and name:", rootPackagePath, name)
	// println()
	error := rootPackage.LoadFromPath(rootPackagePath, name)

	if error != nil {
		return error
	}

	info, err := ReadPackageInfoFile(rootPackagePath)

	if err != nil {
		return &Error{
			Code:    BUILD_ERROR,
			Message: *err,
		}
	}

	rootPackage.Name = proto.String(info.Name)

	return nil
}
