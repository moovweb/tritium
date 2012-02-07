package packager

import (
	ap "athena/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	yaml "launchpad.net/goyaml"
	"io/ioutil"
	"log"
	linker "tritium/linker"
	parser "tritium/parser"
	"path/filepath"
	"os"
)

func resolveDefinition(pkg *ap.Package, fun *ap.Function) {
	linkingContext := linker.NewLinkingContext(pkg)

	//	pkg.Log.Info("\t -- Resolving --\n")
	//	pkg.Log.Info("\t\t -- function: %v\n", fun)

	// Re-uses linker's logic to resolve function definitions
	if proto.GetBool(fun.BuiltIn) == false {
		typeName := proto.GetString(fun.ScopeType)

		if len(typeName) != 0 {
			// When I pass in functions from the inheritance resolver, they're typeId is already set
			fun.ScopeTypeId = pkg.GetProtoTypeId(fun.ScopeType)
			fun.ScopeType = nil
		}

		localScope := make(linker.LocalDef, len(fun.Args))

		//		fun.ReturnTypeId = pkg.GetProtoTypeId(fun.ReturnType)
		for _, arg := range fun.Args {
			argTypeName := arg.TypeString
			var argTypeId int

			if argTypeName != nil {
				// Similar deal. Input functions from inheritance resolution already have ids set

				arg.TypeId = pkg.GetProtoTypeId(arg.TypeString)
				//println("Processing %", proto.GetString(arg.Name))
				argTypeId = pkg.GetTypeId(proto.GetString(arg.TypeString))
				arg.TypeString = nil
			} else {
				argTypeId = int(proto.GetInt32(arg.TypeId))
			}

			localScope[proto.GetString(arg.Name)] = argTypeId
		}

		//pkg.Log.Info("Some insitruction: %v, %s", fun.Instruction, proto.GetString(fun.Name) )
		scopeTypeId := int(proto.GetInt32(fun.ScopeTypeId))
		//pkg.Log.Info("\t\t -- opening scope type : %v\n", scopeTypeId)
		returnType := linkingContext.ProcessInstructionWithLocalScope(fun.Instruction, scopeTypeId, localScope)
		fun.ReturnTypeId = proto.Int32(int32(returnType))
		if fun.Instruction != nil {
			fun.Instruction.Iterate(func(ins *ap.Instruction) {
				if *ins.Type == ap.Instruction_FUNCTION_CALL {
					if proto.GetString(ins.Value) == "yield" {
						fun.OpensTypeId = ins.YieldTypeId
					}
				}
			})
		}

	}
	//pkg.Log.Info("\t\t -- done --\n")
}

func (pkg *Package) inheritFunctions() {
	pkg.Log.Info("pkg types: %v", pkg.Types)
	for _, function := range pkg.Functions {
		pkg.resolveFunctionDescendants(function)
	}
}

// TODO(SJ) : Make this not suck. I think I could make this 50% shorter if I use reflection
// - Also, I'm assuming a single depth level of inheritance. I'd have to run this function n times for n levels
// - Well that should be fine as long as I run it at the end of every package load

func (pkg *Package) resolveFunctionDescendants(fun *ap.Function) {

	// Check if this function contains any types that have descendants
	name := fun.Stub(pkg.Package)
	pkg.Log.Info("Checking for inheritance on function: %v", name)

	newFun := &ap.Function{}
	inherit := false

	// Iterate over ScopeType, Arg types, return Type, opens Type

	// ScopeType

	thisTypeId := proto.GetInt32(fun.ScopeTypeId)
	newType := pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {
		if !inherit {
			pkg.Log.Info("\t -- ScopeType : Found ancestral type. Cloning function %v\n", proto.GetString(fun.Name))
			newFun = fun.Clone()
			// pkg.Log.Info("\t -- New fun: %v", newFun)
			inherit = true
		}
		pkg.Log.Info("\t -- Resetting scopeId")
		newFun.ScopeTypeId = proto.Int32(int32(newType))
	}

	// ReturnType

	thisTypeId = proto.GetInt32(fun.ReturnTypeId)
	newType = pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {
		if !inherit {
			pkg.Log.Info("\t -- ReturnType : Found ancestral type. Cloning function %v\n", proto.GetString(fun.Name))
			newFun = fun.Clone()
			// pkg.Log.Info("\t -- New fun: %v", newFun)
			inherit = true
		}
		pkg.Log.Info("\t -- Resetting returnId")
		newFun.ReturnTypeId = proto.Int32(int32(newType))
	}

	// OpensType

	thisTypeId = proto.GetInt32(fun.OpensTypeId)
	newType = pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {

		if !inherit {
			pkg.Log.Info("\t -- OpensType : Found ancestral type. Cloning function %v\n", proto.GetString(fun.Name))
			newFun = fun.Clone()
			// pkg.Log.Info("\t -- New fun: %v", newFun)
			inherit = true
		}
		pkg.Log.Info("\t -- Resetting openTypeId")
		newFun.OpensTypeId = proto.Int32(int32(newType))
	}

	// Arguments

	for index, arg := range fun.Args {
		thisTypeId = proto.GetInt32(arg.TypeId)
		newType = pkg.Package.FindDescendantType(thisTypeId)

		if newType != -1 {

			if !inherit {
				pkg.Log.Info("\t -- ArgType : Found ancestral type. Cloning function %v\n", proto.GetString(fun.Name))
				newFun = fun.Clone()
				// pkg.Log.Info("\t -- New fun: %v", newFun)
				inherit = true
			}
			pkg.Log.Info("\t -- Resetting argument")
			newFun.Args[index].TypeId = proto.Int32(int32(newType))
		}

	}

	pkg.Log.Info("\t -- Old function: %v\n\t -- New function: %v\n", fun, newFun)

	if inherit {
		resolveDefinition(pkg.Package, newFun)
		pkg.Package.Functions = append(pkg.Package.Functions, newFun)

	}

}

func ReadPackageDefinitions(pkg *ap.Package, location string) {

	//pkg.Println(" -- reading definitions")
	definitions := parser.ParseFile(location)

	for _, function := range definitions.Functions {
		//pkg.Log.Info("\t -- function: %v", function)
		resolveDefinition(pkg, function)
		pkg.Functions = append(pkg.Functions, function)
	}
}

func (pkg *Package) Marshal() []byte {
	bytes, err := proto.Marshal(pkg.Package)
	if err != nil {
		log.Panic(err)
	}
	return bytes
}

func (pkg *Package) findTypeIndex(name string) int {
	for index, typeObj := range pkg.Types {
		if name == proto.GetString(typeObj.Name) {
			return index
		}
	}

	log.Panic("Bad type load order, type", name, "unknown")
	return -1
}

func (pkg *Package) loadPackageDependency(name string) {

	loaded := pkg.loadedDependency(name)
	if loaded {
		return
	}

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
		pkg.Log.Info("Added dependency (" + name + ") to " + proto.GetString(pkg.Name) + "'s loaded dependencies")
		pkg.Dependencies = append(pkg.Dependencies, name)
	}
}

func (pkg *Package) loadedDependency(name string) bool {
	for _, dependency := range pkg.Dependencies {
		if name == dependency {
			pkg.Log.Info("Already loaded dependency:" + name)
			return true
		}
	}
	return false
}

// Not fully functional. Dang it.
func ReadPackageInfoFile(location string) (info *PackageInfo, error *string) {
	packageInfo := &PackageInfo{}
	infoFile, err := ioutil.ReadFile(location + "/package.yml")
	if err != nil {
		message := "No package info file found at " + location + "/package.yml"
		return nil, &message
	}
	yaml.Unmarshal([]byte(infoFile), &packageInfo)
	//fmt.Printf("--- m:\n%v\n\n", packageInfo)
	return packageInfo, nil
}

func (pkg *Package) readHeaderFile(location string) {
	// TODO : plug in new go parser to do this
	input_file := location + "/headers.tf"

	_, err := os.Open(input_file)

	if err != nil {
		pkg.Log.Info("Warning -- found no headers.tf")
		return
	}

	stubs := parser.ParseFile(input_file)

	for _, function := range stubs.Functions {
		pkg.resolveHeader(function)

		function.BuiltIn = proto.Bool(true)

		pkg.Package.Functions = append(pkg.Package.Functions, function)
	}

}

func (pkg *Package) resolveHeader(function *ap.Function) {

	returnType := proto.GetString(function.ReturnType)
	if len(returnType) > 0 {
		function.ReturnTypeId = proto.Int32(int32(pkg.findTypeIndex(returnType)))
		function.ReturnType = nil
	}

	scopeType := proto.GetString(function.ScopeType)
	if len(scopeType) > 0 {
		function.ScopeTypeId = proto.Int32(int32(pkg.findTypeIndex(scopeType)))
		function.ScopeType = nil
	}

	opensType := proto.GetString(function.OpensType)
	if len(opensType) > 0 {
		function.OpensTypeId = proto.Int32(int32(pkg.findTypeIndex(opensType)))
		function.OpensType = nil
	}

	for _, arg := range function.Args {
		typeName := proto.GetString(arg.TypeString)
		if len(typeName) > 0 {
			arg.TypeId = proto.Int32(int32(pkg.findTypeIndex(typeName)))
			arg.TypeString = nil
		}
	}
}
