package packager

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	api "tritium/api"
	"strings"
	"path/filepath"
	"log4go"
	"os"
)

type Package struct { 
	loaded []*PackageInfo
	location string
	LoadPath string
	FallbackPath string
	OutputFile string
	Log log4go.Logger
	*tp.Package
	Options PackageOptions
}

type PackageInfo struct {
	Name string
	Dependencies []string
	Types []string
}

var DefaultPackagePath = "packages"

func LoadDefaultPackage(path *string) (*Package) {
	if path == nil {
		path = &DefaultPackagePath
	}

	return buildPackage(*path, nil)
}

func OutputDefaultPackage(path string) (pkg *Package, newFilePath string) {
	pkg = BuildDefaultPackage()
	
	_, err := os.Stat(path)
	
	if err != nil {
		creationErr := os.MkdirAll(path, uint32(0777) ) 
		if creationErr != nil {
			panic("Could not make path(" + path + "). Error:" + creationErr.String())
		}
	}
	
	_, name := filepath.Split(pkg.OutputFile)
	newOutputFile := filepath.Join(path, name)
	
	os.Rename(pkg.OutputFile, newOutputFile)
	
	return pkg, newOutputFile
}

func BuildDefaultPackage() (*Package) {
	options := BuildOptions()
	return buildPackage(DefaultPackagePath, options)
}

func buildPackage(path string, options PackageOptions) (*Package) {
	// Terrible directory handling here... has to be executed from Tritium root

	pkg := NewPackage(path, options)
	pkg.Load("libxml")

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

func NewPackage(loadPath string, options PackageOptions) (*Package){
	options = mergeOptions(options)	

	return &Package{
		Package: &tp.Package{
			Name: proto.String("combined"),
			Functions: make([]*tp.Function, 0),
			Types: make([]*tp.Type, 0),
		},
		loaded: make([]*PackageInfo, 0),
  	        Log: newLog(),
		LoadPath: loadPath,
	        Options: options,
	}
}

func (pkg *Package) BuildUserPackage(loadPath *string, fallbackPath *string) {
	userPackage := NewUserPackage(loadPath, fallbackPath)
	pkg.Merge(userPackage.Package)
}

func NewUserPackage(loadPath *string, fallbackPath *string) (*Package) {
	//TODO : Check for user-defined feature support
	
	userPackage := NewPackage(*loadPath, PackageOptions{"stdout" : false,"output_tpkg" : false,"use_tpkg" : false})
	
	userPackage.FallbackPath = *fallbackPath

	userPackages, _ := filepath.Glob(filepath.Join(userPackage.LoadPath, "*"))

	for _, path := range(userPackages) {
		components := strings.Split(path, "/")
		name := components[len(components)-1]
		userPackage.Load(name)
	}
	
	
	return userPackage
}

func newLog() (log4go.Logger) {
	pkgLog := make(log4go.Logger)
	os.Mkdir("tmp", uint32(0777) )

	pkgLog.AddFilter("file", log4go.FINE, log4go.NewFileLogWriter("tmp/packager.log", false))	
	return pkgLog
}

func (pkg *Package)Load(packageName string) {

	user := api.FetchSessionUser()
	approved := user.RequestFeature("package:" + packageName)
	
	if !approved {
		panic("Package " + packageName + " not approved for use.")
	}	

	err := pkg.loadFromPath(pkg.LoadPath, packageName)

	if err != nil && len(pkg.FallbackPath) != 0 {
		err = pkg.loadFromPath(pkg.FallbackPath, packageName)
	}

	if err != nil {
		panic(*err)
	}

}

func (pkg *Package)loadFromPath(path string, name string) (err *string) {
	pkg.Println(path + ":" + name)
	pkg.Log.Info("\n\n\n\nLoading:%v", path + ":" + name)

	if pkg.Options["use_tpkg"] {
		pkg.open(path, name)
		return nil
	}

	location := filepath.Join(path, name)

	old_location := pkg.location
	pkg.location = location
	info, err := readPackageInfoFile(location)
	
	if err != nil {
		return err
	}

	if len(info.Dependencies) > 0 {

		for _, dependency := range(info.Dependencies) {
			pkg.loadPackageDependency(dependency)
		}

	}

	for _, typeName := range(info.Types) {
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

	pkg.readHeaderFile(location)

	pkg.readPackageDefinitions(location)

	pkg.inheritFunctions()

	if pkg.Options["output_tpkg"] {
		pkg.write()
	}

	pkg.Println(" -- done")
	pkg.Log.Close()
	
	// TODO(SJ) : Kind of lame. Ideally I think we load other packages as whole packages and write a *.Merge method
	pkg.location = old_location

	return nil
}

