package packager

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	yaml "launchpad.net/goyaml"
	"io/ioutil"
	"log"
	"strings"
	"fmt"
	linker "tritium/linker"
	parser "tritium/parser"
	"path/filepath"
	"log4go"
	"os"
)

type Package struct { 
	loaded []*PackageInfo
	location string
	LoadPath string
	Log log4go.Logger
	*tp.Package
}

type PackageInfo struct {
	Name string
	Dependencies []string
	Types []string
}

func BuildDefaultPackage(dir string) (*Package) {
	// Terrible directory handling here... has to be executed from Tritium root
	pkg := NewPackage(dir)

	//pkg.Load("base")
	//pkg.Load("node")
	pkg.Load("libxml")
	//println("Packages all loaded")

	return pkg
}

func NewPackage(loadPath string) (*Package){
	return &Package{
		Package: &tp.Package{
			Name: proto.String("combined"),
			Functions: make([]*tp.Function, 0),
			Types: make([]*tp.Type, 0),
		},
		loaded: make([]*PackageInfo, 0),
  	        Log: newLog(),
		LoadPath: loadPath,
	}
}

func newLog() (log4go.Logger) {
	// TODO : Make a log directory and put the output there
	pkgLog := log4go.NewLogger()
	os.Mkdir("log", uint32(0777) )

	pkgLog.AddFilter("file", log4go.FINE, log4go.NewFileLogWriter("log/debug.log", false))	
	return pkgLog
}

func (pkg *Package)Load(packageName string) {
	
	location := filepath.Join(pkg.LoadPath, packageName)
	pkg.location = location

	println(location)
	pkg.Log.Info("\n\n\n\nLoading:%v", location)

	info := readPackageInfoFile(location)
	
	if len(info.Dependencies) > 0 {

		//println("==========\nLoading dependencies:")

		for _, dependency := range(info.Dependencies) {
			pkg.loadPackageDependency(dependency)
		}

		//println("done.\n==========")

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

	println(" -- done")
	pkg.Log.Close()
}

func (pkg *Package)resolveFunction(fun *tp.Function) {
	linkingContext := linker.NewLinkingContext(pkg.Package)

//	pkg.resolveFunctionDescendants(fun)

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
	}
	pkg.Package.Functions = append(pkg.Package.Functions, fun)
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
		pkg.resolveFunction(newFun)
	}

}



func (pkg *Package)readPackageDefinitions(location string) {
	
	println(" -- reading definitions")

	// Execute the ts2func-ruby script

//	package_name := strings.Split(location,"/")[1]
	input_file := filepath.Join(location, "functions.ts")
//	output_file := filepath.Join(location, package_name + ".tf")

	definitions := parser.ParseFile(input_file)

	fmt.Printf("Got definitions: %v", definitions)

	//println("Function count before ", len(pkg.Package.Functions))
	for _, function := range(definitions.Functions) {
		pkg.Log.Info("\t -- function: %v", function)
		pkg.resolveFunction(function)
	}
	//println("Function count after ", len(pkg.Package.Functions))

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

	// Try and load the dependency
	// TODO : remove passing location around since I added it to the Package struct	

	// TODO : Check for a pre-built package (pre-req is outputting a .tpkg file upon completion of a package load)

	newPath := filepath.Join(pkg.LoadPath, name)
	_, err := ioutil.ReadDir(newPath)

	if err == nil {
		// Directory exists
		pkg.Load(name)
	} else {
		println("Cannot find package at:", newPath)
		log.Panic(err)
	}

}

// Not fully functional. Dang it.
func readPackageInfoFile(location string) (*PackageInfo){
	packageInfo := &PackageInfo{}
	infoFile, err := ioutil.ReadFile(location + "/package.yml");
	if err != nil {
		log.Panic("No package info file found at " + location + "/package.yml")
	}
	yaml.Unmarshal([]byte(infoFile), &packageInfo)
	//fmt.Printf("--- m:\n%v\n\n", packageInfo)
	return packageInfo
}

func (pkg *Package)readHeaderFile(location string) {
	// TODO : plug in new go parser to do this
	input_file := location + "/headers.tf"

	stubs := parser.ParseFile(input_file)

	fmt.Printf("Got stubs: %v", stubs)

	for _, function := range(stubs.Functions) {
		//fmt.Printf("\n\t -- functions[%v]:\n %v", index, function)

		returnType := proto.GetString( function.ReturnType )
		if len(returnType) > 0 {
			function.ReturnTypeId = proto.Int32( int32( pkg.findTypeIndex( returnType ) ) )
		}

		scopeType := proto.GetString( function.ScopeType )
		if len(scopeType) > 0{
			function.ScopeTypeId = proto.Int32( int32( pkg.findTypeIndex( scopeType ) ) )
		}
		
		opensType := proto.GetString( function.OpensType )
		if len(opensType) > 0 {
			function.OpensTypeId = proto.Int32( int32( pkg.findTypeIndex( opensType ) ) )
		}

		fmt.Printf("\nthis function: %v \n", function )
		fmt.Printf("\nthis stub: %v \n", function.Stub(pkg.Package))

		pkg.Package.Functions = append(pkg.Package.Functions, function)
	}
	
}


// Not fully functional. Dang it.
func (pkg *Package)oldReadHeaderFile(location string) {
	headerFile, err := ioutil.ReadFile(location + "/headers.tf");
	if err != nil {
		log.Panic("No header file found at " + location + "/headers.tf")
	}
	headerLines := strings.Split(string(headerFile), "\n")
	for _, line := range(headerLines) {
		if (len(line) > 2) && (line[:2] != "//") {
			function := &tp.Function{Args: make([]*tp.Function_Argument, 0)}
			line = line[6:]
			methodName := strings.Split(line, "(")[0]
			typeId := 0
			back := line[len(methodName)+1:]
			methodizer := strings.Split(methodName, ".")
			if len(methodizer) > 1 {
				typeStr := methodizer[0]
				typeId = pkg.GetTypeId(typeStr)
				methodName = methodizer[1]
			}
			function.Name = proto.String(methodName)
			function.ScopeTypeId = proto.Int32(int32(typeId))

			splat := strings.Split(back, ")")
			argString := splat[0]
			// Process the arguments
			if len(argString) > 0 {
				argList := strings.Split(argString, ",")
				for _, argLine := range(argList) {
					arg := &tp.Function_Argument{}
					typeStr := strings.Split(strings.Trim(argLine, " \t"), " ")[0]
					typeId = pkg.findTypeIndex(typeStr)
					arg.TypeId = proto.Int32(int32(typeId))
					function.Args = append(function.Args, arg)
				}
			}
			
			back = splat[1]
			
			hintStrs := strings.Split(back, "//")
			if len(hintStrs) == 2 {
				hints := strings.Split(hintStrs[1], ",")
				if len(hints) >= 1 {
					 function.ReturnTypeId = proto.Int32(int32(pkg.findTypeIndex(hints[0])))
				}
				if len(hints) >= 2 {
					 function.OpensTypeId = proto.Int32(int32(pkg.findTypeIndex(hints[1])))
				}
			}
			function.BuiltIn = proto.Bool(true)

			pkg.Functions = append(pkg.Functions, function)
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
/*
func (pkg *Package)getStub(function *tp.Function) string {
//	println("type:", proto.GetString(function.ScopeType), " id:", proto.GetInt32(function.ScopeTypeId) )

//	stub := string( pkg.findTypeIndex( proto.GetString(function.ScopeType) ) )
	stub := string( proto.GetInt32(function.ScopeTypeId) )
	stub += proto.GetString(function.Name)
	if function.Args != nil {
		for _, arg := range(function.Args) {
			stub = stub + "," + fmt.Sprintf("%d", pkg.findTypeIndex(proto.GetString(arg.TypeString) ) )
		}
	}
	return stub
}*/