package packager

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	yaml "launchpad.net/goyaml"
	"io/ioutil"
	api "tritium/api"
	"log"
	"strings"
	linker "tritium/linker"
	parser "tritium/parser"
	"path/filepath"
	"log4go"
	"os"
	"tritium/crypto"
)

type Package struct { 
	loaded []*PackageInfo
	location string
	LoadPath string
	FallbackPath string
	Log log4go.Logger
	*tp.Package
	Options PackageOptions
}

type PackageInfo struct {
	Name string
	Dependencies []string
	Types []string
}

type PackageOptions map[string]bool

var defaultOptions PackageOptions
var buildOptions PackageOptions

func BuildOptions() PackageOptions {
	if buildOptions == nil {
		buildOptions =  PackageOptions{
			"stdout" : true,
			"output_tpkg" : true,
			"use_tpkg" : false,
		}
	}
	return buildOptions
}

func fetchDefaultOptions() PackageOptions{
	if defaultOptions == nil {
		defaultOptions = PackageOptions{
			"stdout":false,
			"output_tpkg":false,
			"use_tpkg":true,
		}
	}
	return defaultOptions
}

var DefaultPackagePath = "packages"

func LoadDefaultPackage(path *string) (*Package) {
	if path == nil {
		path = &DefaultPackagePath
	}

	return buildPackage(*path, nil)
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

func (pkg *Package)LoadUserPackage(loadPath *string, fallbackPath *string) {
	userPackage := NewUserPackage(loadPath, fallbackPath)
	pkg.Merge(userPackage.Package)
}

func NewUserPackage(loadPath *string, fallbackPath *string) (*Package) {
	//TODO : Check for user-defined feature support
	
	userPackage := NewPackage(*loadPath, PackageOptions{"stdout" : true,"output_tpkg" : false,"use_tpkg" : false})
	
	userPackage.FallbackPath = *loadPath
	
	userPackages, _ := filepath.Glob(filepath.Join(userPackage.FallbackPath, "*"))

	for _, name := range(userPackages) {
		userPackage.Load(name)
	}
	
	
	return userPackage
}

func newLog() (log4go.Logger) {
	pkgLog := make(log4go.Logger)
	os.Mkdir("log", uint32(0777) )

	pkgLog.AddFilter("file", log4go.FINE, log4go.NewFileLogWriter("log/debug.log", false))	
	return pkgLog
}

func (pkg *Package)Load(packageName string) {

	user := api.FetchSessionUser()
	approved := user.RequestFeature("package:" + packageName)
	
	if !approved {
		panic("Package " + packageName + " not approved for use.")
	}	

	location := filepath.Join(pkg.LoadPath, packageName)
	err := pkg.loadFromPath(location)

	if err != nil && len(pkg.FallbackPath) != 0 {
		location = filepath.Join(pkg.FallbackPath, packageName)
		err = pkg.loadFromPath(location)
	}

	if err != nil {
		panic(*err)
	}

}

func (pkg *Package)loadFromPath(location string) (err *string) {
	pkg.Println(location)
	pkg.Log.Info("\n\n\n\nLoading:%v", location)

	if pkg.Options["use_tpkg"] {
		println("USING TPKG")
		pkg.open(location)
		return nil
	}

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


func (pkg *Package)resolveDefinition(fun *tp.Function) {
	linkingContext := linker.NewLinkingContext(pkg.Package)

	pkg.Log.Info("\t -- Resolving --\n")
	pkg.Log.Info("\t\t -- function: %v\n", fun)

	// Re-uses linker's logic to resolve function definitions
	if ( proto.GetBool( fun.BuiltIn ) == false) {
		typeName := proto.GetString(fun.ScopeType)

		if len(typeName) != 0 {
			// When I pass in functions from the inheritance resolver, they're typeId is already set
			fun.ScopeTypeId = pkg.GetProtoTypeId(fun.ScopeType)
			fun.ScopeType = nil
		}

		localScope := make(linker.LocalDef, len(fun.Args))

		//		fun.ReturnTypeId = pkg.GetProtoTypeId(fun.ReturnType)
		for _, arg := range(fun.Args) {
			argTypeName := arg.TypeString
			var argTypeId int

			if argTypeName != nil {
				// Similar deal. Input functions from inheritance resolution already have ids set

				arg.TypeId = pkg.GetProtoTypeId(arg.TypeString)
				//println("Processing %", proto.GetString(arg.Name))
				argTypeId = pkg.GetTypeId(proto.GetString(arg.TypeString))
				arg.TypeString = nil
			} else {
				argTypeId = int( proto.GetInt32(arg.TypeId) )
			}

			localScope[proto.GetString(arg.Name)] = argTypeId
		}

		//pkg.Log.Info("Some insitruction: %v, %s", fun.Instruction, proto.GetString(fun.Name) )
		scopeTypeId := int(proto.GetInt32(fun.ScopeTypeId))
		pkg.Log.Info("\t\t -- opening scope type : %v\n", scopeTypeId)
		returnType := linkingContext.ProcessInstructionWithLocalScope(fun.Instruction, scopeTypeId, localScope)
		fun.ReturnTypeId = proto.Int32(int32(returnType))
		if fun.Instruction != nil {
			fun.Instruction.Iterate(func (ins *tp.Instruction) {
				if *ins.Type == tp.Instruction_FUNCTION_CALL {
					if proto.GetString(ins.Value) == "yield" {
						fun.OpensTypeId = ins.YieldTypeId
					}
				}
			})
		}
		
	}
	pkg.Log.Info("\t\t -- done --\n")
}

func (pkg *Package)inheritFunctions() {
	pkg.Log.Info("pkg types: %v", pkg.Types)
	for _, function := range(pkg.Functions) {
		pkg.resolveFunctionDescendants(function)
	}
}

// TODO(SJ) : Make this not suck. I think I could make this 50% shorter if I use reflection
// - Also, I'm assuming a single depth level of inheritance. I'd have to run this function n times for n levels
// - Well that should be fine as long as I run it at the end of every package load

func (pkg *Package)resolveFunctionDescendants(fun *tp.Function) {

	// Check if this function contains any types that have descendants
	name := fun.Stub(pkg.Package)
	pkg.Log.Info("Checking for inheritance on function: %v", name )

	newFun := &tp.Function{}
	inherit := false

	// Iterate over ScopeType, Arg types, return Type, opens Type


	// ScopeType

	thisTypeId := proto.GetInt32(fun.ScopeTypeId)
	newType := pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {
		if !inherit {
			pkg.Log.Info("\t -- ScopeType : Found ancestral type. Cloning function %v\n", proto.GetString( fun.Name ) )
			newFun = fun.Clone()
			// pkg.Log.Info("\t -- New fun: %v", newFun)
			inherit = true
		}
		pkg.Log.Info("\t -- Resetting scopeId")		
		newFun.ScopeTypeId = proto.Int32( int32( newType ) )
	}

	// ReturnType

	thisTypeId = proto.GetInt32(fun.ReturnTypeId)
	newType = pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {
		if !inherit {
			pkg.Log.Info("\t -- ReturnType : Found ancestral type. Cloning function %v\n", proto.GetString( fun.Name ) )
			newFun = fun.Clone()
			// pkg.Log.Info("\t -- New fun: %v", newFun)
			inherit = true
		}
		pkg.Log.Info("\t -- Resetting returnId")
		newFun.ReturnTypeId = proto.Int32( int32( newType ) )
	}

	// OpensType

	thisTypeId = proto.GetInt32(fun.OpensTypeId)
	newType = pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {

		if !inherit {
			pkg.Log.Info("\t -- OpensType : Found ancestral type. Cloning function %v\n", proto.GetString( fun.Name ) )
			newFun = fun.Clone()
			// pkg.Log.Info("\t -- New fun: %v", newFun)
			inherit = true
		}
		pkg.Log.Info("\t -- Resetting openTypeId")
		newFun.OpensTypeId = proto.Int32( int32( newType ) )
	}

	// Arguments

	for index, arg := range( fun.Args) {
		thisTypeId = proto.GetInt32(arg.TypeId)
		newType = pkg.Package.FindDescendantType(thisTypeId)

		if newType != -1 {

			if !inherit {
				pkg.Log.Info("\t -- ArgType : Found ancestral type. Cloning function %v\n", proto.GetString( fun.Name ) )
				newFun = fun.Clone()
				// pkg.Log.Info("\t -- New fun: %v", newFun)
				inherit = true
			}
			pkg.Log.Info("\t -- Resetting argument")
			newFun.Args[index].TypeId = proto.Int32( int32( newType ) )
		}
		
		
	}

	pkg.Log.Info("\t -- Old function: %v\n\t -- New function: %v\n", fun, newFun)

	if inherit {
		pkg.resolveDefinition(newFun)
		pkg.Package.Functions = append(pkg.Package.Functions, newFun)

	}

}



func (pkg *Package)readPackageDefinitions(location string) {
	
	pkg.Println(" -- reading definitions")

	input_file := filepath.Join(location, "functions.ts")

	definitions := parser.ParseFile(input_file)

	for _, function := range(definitions.Functions) {
		pkg.Log.Info("\t -- function: %v", function)
		pkg.resolveDefinition(function)
		pkg.Package.Functions = append(pkg.Package.Functions, function)
	}
}


func (pkg *Package)Marshal() []byte {
	bytes, err := proto.Marshal(pkg.Package)
	if err != nil {
		log.Panic(err)
	}
	return bytes
}

func (pkg *Package)findTypeIndex(name string) int {
	for index, typeObj := range(pkg.Types) {
		if name == proto.GetString(typeObj.Name) {
			return index
		}
	}
	
	log.Panic("Bad type load order, type", name, "unknown")
	return -1
}

func (pkg *Package)loadPackageDependency(name string) {

	newPath := filepath.Join(pkg.LoadPath, name)
	_, err := ioutil.ReadDir(newPath)

	if err != nil {
		if len(pkg.FallbackPath) != 0 {
			newPath = filepath.Join(pkg.FallbackPath, name)
			_, err = ioutil.ReadDir(newPath)
		} 

		if err != nil {
			println("Cannot find package at:", newPath)
			log.Panic(err)
		}

	}

	if err == nil {
		// Directory exists
		pkg.Load(name)
	} 
}

// Not fully functional. Dang it.
func readPackageInfoFile(location string) (info *PackageInfo, error *string){
	packageInfo := &PackageInfo{}
	infoFile, err := ioutil.ReadFile(location + "/package.yml");
	if err != nil {
		message := "No package info file found at " + location + "/package.yml"
		return nil, &message
	}
	yaml.Unmarshal([]byte(infoFile), &packageInfo)
	//fmt.Printf("--- m:\n%v\n\n", packageInfo)
	return packageInfo, nil
}

func (pkg *Package)readHeaderFile(location string) {
	// TODO : plug in new go parser to do this
	input_file := location + "/headers.tf"

	stubs := parser.ParseFile(input_file)

	for _, function := range(stubs.Functions) {
		pkg.resolveHeader(function)

		function.BuiltIn = proto.Bool( true )

		pkg.Package.Functions = append(pkg.Package.Functions, function)
	}
	
}

func (pkg *Package)resolveHeader(function *tp.Function) {

	returnType := proto.GetString( function.ReturnType )
	if len(returnType) > 0 {
		function.ReturnTypeId = proto.Int32( int32( pkg.findTypeIndex( returnType ) ) )
		function.ReturnType = nil
	}

	scopeType := proto.GetString( function.ScopeType )
	if len(scopeType) > 0{
		function.ScopeTypeId = proto.Int32( int32( pkg.findTypeIndex( scopeType ) ) )
		function.ScopeType = nil
	}
	
	opensType := proto.GetString( function.OpensType )
	if len(opensType) > 0 {
		function.OpensTypeId = proto.Int32( int32( pkg.findTypeIndex( opensType ) ) )
		function.OpensType = nil
	}


	for _, arg := range(function.Args) {
		typeName := proto.GetString( arg.TypeString )
		if len(typeName) > 0 {
			arg.TypeId = proto.Int32( int32( pkg.findTypeIndex( typeName ) ) )
			arg.TypeString = nil
		}			
	}	
}


func (pkg *Package)SerializedOutput() {

	bytes, err := proto.Marshal(pkg.Package)
	if err != nil {
		log.Panic(err)
	}
	println(string(bytes))
}

func (pkg *Package) DebugInfo() (string) {
	result := ""
	for _, fun := range(pkg.Package.Functions) {
		result = result + fun.DebugInfo(pkg.Package) + "\n"
	}
	return result
}


func (pkg *Package) write() {
	path, name := filepath.Split(pkg.location)
	outputFilename := filepath.Join(path, name, name + ".tpkg")

	bytes, err := proto.Marshal(pkg.Package)
	
	if err != nil {
		println("Could not marshal package:", name)
		log.Panic(err)
	}


	bytes = crypto.Encrypt(bytes)

	ioutil.WriteFile(outputFilename, bytes, uint32(0666) )

	pkg.Println(" -- output: " +  outputFilename)
}

func (pkg *Package) open(location string) {
	pathComponents := strings.Split(location, "/")
	name := pathComponents[len(pathComponents)-1]
	
	tpkg_path := filepath.Join(location, name + ".tpkg")

	data, err := ioutil.ReadFile(tpkg_path)

	if err != nil {
		panic("Could not find tpkg file:" + tpkg_path)
	}

	data = crypto.Decrypt(data)

	thisPackage := &tp.Package{}
	err = proto.Unmarshal(data, thisPackage)

	if err != nil {
		panic("Error unmarshalling package at:" + tpkg_path)
	}

	// Now load all the functions and resolve them

	pkg.Merge(thisPackage)

	pkg.Println("\t -- Using tpkg at:" + tpkg_path)


}

func (pkg *Package)Merge(otherPackage *tp.Package) {

	if otherPackage == nil {
		return
	}

	//// Reflection would make this code cleaner:

	pkg.Name = otherPackage.Name

	var existingTypeId int

	for _, someType := range(otherPackage.Types) {
		existingTypeId = pkg.GetTypeId( proto.GetString( someType.Name ) )
		if existingTypeId == -1 {
			pkg.Types = append( pkg.Types, someType)
		}
	}	

	for _, function := range(otherPackage.Functions) {

 		if proto.GetBool( function.BuiltIn ) {
			pkg.resolveHeader(function)
		} else {
			pkg.resolveDefinition(function)
		}
		pkg.Package.Functions = append(pkg.Package.Functions, function)
	}	

}

func (pkg *Package)Println(message string) {
	if pkg.Options["stdout"] {
		println(message)
	}
}
