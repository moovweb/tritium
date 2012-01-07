package packager

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	yaml "launchpad.net/goyaml"
	"io/ioutil"
	"log"
	"strings"
	"fmt"
	"exec"
)

//	"runtime"
//	fpath "path/filepath"

type Package struct {
	loaded []*PackageInfo
	*tp.Package
}

type PackageInfo struct {
	Name string
	Dependencies []string
	Types []string
}

func BuildDefaultPackage() (*tp.Package) {
	// Terrible directory handling here... has to be executed from Tritium root
	pkg := NewPackage()
	pkg.Load("packages/base")
	pkg.Load("packages/node")
	pkg.Load("packages/libxml")
	return pkg.Package
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
	
	info := readPackageInfoFile(location)

	fmt.Printf("--- info: %v\n", info)

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

	fmt.Printf("--- Package types: %v\n", pkg.Types)

	pkg.readHeaderFile(location)

	// Now read the function declarations

	pkg.readPackageDefinitions(location)

	pkg.resolveDefinitions()

}

func (pkg *Package)resolveDefinitions() {
	// Re-uses linker's logic to resolve function definitions
}

func (pkg *Package)readPackageDefinitions(location string) {
	
	// fmt.Printf("Location: %s\n", location)

	// Execute the ts2func-ruby script

	package_name := strings.Split(location,"/")[1]
	input_file := location + "/functions.ts"
	output_file := location + "/" + package_name + ".tf"

	// Assume that tritium/bin is in $PATH (it will be when you install the gem)
	// -- if you're developing, add $REPOS/tritium/bin to $PATH

/*
	script_path, err := exec.LookPath("ts2func-ruby")
	
	if err != nil {
		log.Fatal(err)
	}
*/
	command := exec.Command("ts2func-ruby", "-s", input_file, output_file)

	fmt.Printf("\n\nExecuting command: \n %v\n", command)

	output, err := command.CombinedOutput()

	if err != nil {
		fmt.Printf("\tFunction conversion output:\n\t %s", output)
		log.Fatal(err)
	}

	// Load the output
	
	/*functionArrayBinary, err := ioutil.ReadFile(output_file);
	if err != nil {
		log.Fatal(err)
	}*/

	functionArrayBinary := output
	functions := &tp.FunctionArray{}


//	fmt.Printf("functions pre unmarshal: (%v)", functions)
	fmt.Printf("functions pre unmarshal: (%s)", functionArrayBinary)
	
	err = proto.Unmarshal(functionArrayBinary, functions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("functions : %v", functions)

/*	for index, obj := range(functions.functions) {
		fmt.Printf("functions[%s]: %v", index, obj)
	}
*/
	
	 
}


func (pkg *Package)Marshal() []byte {
	bytes, err := proto.Marshal(pkg.Package)
	if err != nil {
		log.Fatal(err)
	}
	return bytes
}

func (pkg *Package)findTypeIndex(name string) int {
	for index, typeObj := range(pkg.Types) {
		if name == proto.GetString(typeObj.Name) {
			return index
		}
	}
	log.Fatal("Bad type load order, type", name, "unknown")
	return -1
}

// Not fully functional. Dang it.
func readPackageInfoFile(location string) (*PackageInfo){
	packageInfo := &PackageInfo{}
	infoFile, err := ioutil.ReadFile(location + "/package.yml");
	if err != nil {
		log.Fatal("No package info file found at " + location + "/package.yml")
	}
	yaml.Unmarshal([]byte(infoFile), &packageInfo)
	//fmt.Printf("--- m:\n%v\n\n", packageInfo)
	return packageInfo
}


// Not fully functional. Dang it.
func (pkg *Package)readHeaderFile(location string) {
	headerFile, err := ioutil.ReadFile(location + "/headers.tf");
	if err != nil {
		log.Fatal("No header file found at " + location + "/headers.tf")
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
			pkg.Functions = append(pkg.Functions, function)
		}
	}
}
