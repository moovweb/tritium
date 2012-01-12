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
	"path/filepath"
	parser "tritium/parser"
)

type Package struct {
	loaded []*PackageInfo
	location *string
	*tp.Package
}

type PackageInfo struct {
	Name string
	Dependencies []string
	Types []string
}

func BuildDefaultPackage() (*Package) {
	// Terrible directory handling here... has to be executed from Tritium root
	pkg := NewPackage()

	pkg.Load("packages/base")
	//pkg.Load("packages/node")
	//pkg.Load("packages/libxml")
	println("Packages all loaded")

	return pkg
}

func NewPackage() (*Package){
	return &Package{
		Package: &tp.Package{
			Name: proto.String("combined"),
			Functions: make([]*tp.Function, 0),
			Types: make([]*tp.Type, 0),
		},
		loaded: make([]*PackageInfo, 0),
	}
}

func (pkg *Package)Load(location string) {
	
	pkg.location = &location

	info := readPackageInfoFile(location)
	
	if len(info.Dependencies) > 0 {

		println("==========\nLoading dependencies:")

		for _, dependency := range(info.Dependencies) {
			pkg.loadPackageDependency(dependency)
		}

		println("done.\n==========")

	}

	fmt.Printf("%v\n", location)

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

	// Now read the function declarations


	pkg.readPackageDefinitions(location)

	println(" -- done\n")
}

func (pkg *Package)resolveFunction(fun *tp.Function) {
	linkingContext := linker.NewLinkingContext(pkg.Package)

	pkg.resolveFunctionDescendants(fun)

	// Re-uses linker's logic to resolve function definitions
	if ( proto.GetBool( fun.BuiltIn ) == false) {
		fun.ScopeTypeId = pkg.GetProtoTypeId(fun.ScopeType)
		fun.ScopeType = nil
		localScope := make(linker.LocalDef, len(fun.Args))

		//		fun.ReturnTypeId = pkg.GetProtoTypeId(fun.ReturnType)
		for _, arg := range(fun.Args) {
			arg.TypeId = pkg.GetProtoTypeId(arg.TypeString)
			//println("Processing %", proto.GetString(arg.Name))
			localScope[proto.GetString(arg.Name)] = pkg.GetTypeId(proto.GetString(arg.TypeString))
			arg.TypeString = nil
		}

		//fmt.Printf("Some insitruction: %v, %s", fun.Instruction, proto.GetString(fun.Name) )
		scopeTypeId := int(proto.GetInt32(fun.ScopeTypeId))
		
		returnType := linkingContext.ProcessInstructionWithLocalScope(fun.Instruction, scopeTypeId, localScope)
		fun.ReturnTypeId = proto.Int32(int32(returnType))
	}
}

func (pkg *Package)resolveFunctionDescendants(fun *tp.Function) {

	// Check if this function contains any types that have descendants

	//println("Function:", proto.GetString(fun.Name) )

	// Todo: Iterate over ScopeType, Arg types, return Type, opens Type
	this_type_name := proto.GetString(fun.ScopeType)
	
	if len(this_type_name) > 0 {

		//println("this type name:", this_type_name,  )

		this_type_index := pkg.findTypeIndex(this_type_name)
		//println("this type index:", this_type_index)

		this_type := pkg.Types[this_type_index]
		//fmt.Printf("this type: %v\n", this_type)

		implements := proto.GetInt32(this_type.Implements)

//		if ( implements != 0 ) {
		println("ScopeType (", this_type,") implements", implements, ":", proto.GetString(pkg.Types[implements].Name) )
//		}

	}

}



func (pkg *Package)readPackageDefinitions(location string) {
	fmt.Printf("Package types : %v\n\n\n", pkg.Types)
	println(" -- reading definitions")

	input_file := location + "/functions.ts"

	definitions := parser.ParseFile(input_file)

	fmt.Printf("Got definitions: %v", definitions)

	//println("Function count before ", len(pkg.Package.Functions))
	for _, function := range(definitions.Functions) {
		//fmt.Printf("\n\t -- functions[%v]:\n %v", index, function)
		pkg.resolveFunction(function)
		pkg.Package.Functions = append(pkg.Package.Functions, function)
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
	
	cleaned_path := filepath.Clean(*pkg.location)
	path_segments := strings.Split(cleaned_path, "/")
	
	new_path := strings.Join(append( path_segments[0:len(path_segments)-1], name) , "/")

	// TODO : Check for a pre-built package (pre-req is outputting a .tpkg file upon completion of a package load)

	_, err := ioutil.ReadDir(new_path)

	if err == nil {
		// Directory exists
		pkg.Load(new_path)
	} else {
		println("Cannot find package at:", new_path)
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
		fmt.Printf("\nthis stub: %v \n", function.Stub())

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