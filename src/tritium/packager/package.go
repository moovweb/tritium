package packager

import (
	tp "athena/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	api "tritium/api"
	"strings"
	"path/filepath"
	"log4go"
	"os"
	"time"
	"fmt"
)

type Error struct {
  Code int
  Message string
}

const (
	NOT_FOUND = iota
	BUILD_ERROR
)

type Package struct {
	loaded       []*PackageInfo
//	location     string
	LoadPath     string
	FallbackPath string
	OutputFile   string
	Log          log4go.Logger
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

func OutputDefaultPackage(path string) (pkg *Package, newFilePath string) {
	pkg = BuildDefaultPackage()

	_, err := os.Stat(path)

	if err != nil {
		creationErr := os.MkdirAll(path, uint32(0777))
		if creationErr != nil {
			panic("Could not make path(" + path + "). Error:" + creationErr.String())
		}
	}

	_, name := filepath.Split(pkg.OutputFile)
	newOutputFile := filepath.Join(path, name)

	os.Rename(pkg.OutputFile, newOutputFile)

	return pkg, newOutputFile
}

func BuildDefaultPackage() *Package {
	options := BuildOptions()
	return buildPackage(DefaultPackagePath, options)
}

func buildPackage(path string, options PackageOptions) *Package {
	// Terrible directory handling here... has to be executed from Tritium root

	pkg := NewPackage(path, options)
	rootName := "libxml"

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
		components := strings.Split(path, "/")
		name := components[len(components)-1]
		userPackage.Load(name)
	}

	return userPackage
}

func newLog() log4go.Logger {
	pkgLog := make(log4go.Logger)
	os.Mkdir("tmp", uint32(0777))

	pkgLog.AddFilter("file", log4go.DEBUG, log4go.NewFileLogWriter("tmp/packager.log", false))
	return pkgLog
}

func (pkg *Package) Load(packageName string) {

	user := api.FetchSessionUser()
	approved := user.RequestFeature("package:" + packageName)

	if !approved {
		panic("Package " + packageName + " not approved for use.")
	}

	err := pkg.LoadFromPath( filepath.Join(pkg.LoadPath, packageName), packageName )

	if err != nil && len(pkg.FallbackPath) != 0 {
		err = pkg.LoadFromPath( filepath.Join(pkg.FallbackPath, packageName), packageName )
	}

	if err != nil {
		panic(err.Message)
	}

}

func (pkg *Package) LoadFromPath(loadPath string, name string) (*Error) {
	// LoadPath is the full path to the mixer
	// Since the path won't always end w the name (e.g. user defined function / mixer packages), specify the name as well
	println("Loading from path: " + name + " : "+ loadPath)
	
	pkg.Println(loadPath + ":" + name)
	pkg.Log.Info("\n\n\n\nLoading:%v", loadPath+":"+name)

	loaded := pkg.loadedDependency(name)
	if loaded {
	  println("Already loaded:" + name)
		return nil
	}

	if pkg.Options["use_tpkg"] {
		err := pkg.LoadFromFile(loadPath)
    if err == nil {
      println("Loaded " + name + " from tpkg file")
      return nil
    } else if err != nil && err.Code != NOT_FOUND {
      println("Error loading from file:" + loadPath)
      return err
    }
	}

//  println("\n\n LoadPath 0: " + pkg.location)

//	old_location := pkg.location
//	pkg.location = loadPath
	
//  println("\n\n LoadPath 1: " + pkg.location)	

	s := time.Nanoseconds()
//	info, err := ReadPackageInfoFile(pkg.location)
	info, err := ReadPackageInfoFile(loadPath)
	f := time.Nanoseconds()
	d := float64(f-s) / 1000.0 / 1000.0 / 1000.0
	fmt.Printf("Time to read package info: %0.6fs\n", d)

	if err != nil {
		return &Error{
		  Code: NOT_FOUND,
		  Message: "Can't find package at: " + loadPath + " -- missing package info file.",
		}
	}

	s = time.Nanoseconds()

//  println("\n\n LoadPath 2: " + pkg.location)

	fmt.Printf("Prior function count: %v\n", len(pkg.Functions) )

	if len(info.Dependencies) > 0 {
		for _, dependency := range info.Dependencies {
			pkg.loadPackageDependency(dependency)
		}
	}	

	// TODO(SJ) : Kind of lame. Ideally I think we load other packages as whole packages and write a *.Merge method
//	pkg.location = old_location

	fmt.Printf("Post deps function count: %v\n", len(pkg.Functions) )

//  println("\n\n LoadPath 3: " + pkg.location)

	f = time.Nanoseconds()
	d = float64(f-s) / 1000.0 / 1000.0 / 1000.0
	fmt.Printf("Time to load dependencies: %0.6fs\n", d)

	s = time.Nanoseconds()
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
	f = time.Nanoseconds()
	d = float64(f-s) / 1000.0 / 1000.0 / 1000.0
	fmt.Printf("Time to resolve types: %0.6fs\n", d)

//  println("\n\n LoadPath 4: " + pkg.location)

	s = time.Nanoseconds()
//	pkg.readHeaderFile(pkg.location)
	pkg.readHeaderFile(loadPath)
	f = time.Nanoseconds()
	d = float64(f-s) / 1000.0 / 1000.0 / 1000.0
	fmt.Printf("Time to load header: %0.6fs\n", d)

//  println("\n\n LoadPath 5: " + pkg.location)

	s = time.Nanoseconds()
//	entryPoint := filepath.Join(pkg.location, "functions.ts")
  entryPoint := filepath.Join(loadPath, "functions.ts")
	fmt.Printf("Reading root definitions from: %v\n", entryPoint)
	ReadPackageDefinitions(pkg.Package, entryPoint)
	f = time.Nanoseconds()
	d = float64(f-s) / 1000.0 / 1000.0 / 1000.0
	fmt.Printf("Time to load definitions: %0.6fs\n", d)

//  println("\n\n LoadPath 6: " + pkg.location)

	fmt.Printf("Post root definitions - function count: %v\n", len(pkg.Functions) )

	s = time.Nanoseconds()
	pkg.inheritFunctions()
	f = time.Nanoseconds()
	d = float64(f-s) / 1000.0 / 1000.0 / 1000.0
	fmt.Printf("Time to resolve inheritances: %0.6fs\n", d)

	if pkg.Options["output_tpkg"] {
		pkg.write()
	}

	pkg.Println(" -- done")
	pkg.Log.Close()

	return nil
}
