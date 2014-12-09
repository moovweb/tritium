package legacy

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

import (
	"tritium/dependencies/butler/null"
	proto "code.google.com/p/goprotobuf/proto"
	yaml "tritium/dependencies/goyaml"
	linker "tritium/linker"
	parser "tritium/parser"
	tp "tritium/proto"
	. "tritium/util"
	whale "tritium/whale"
	"tritium/constants"
)

func resolveDefinition(pkg *tp.Package, fun *tp.Function, path string, ranges ...Range) {
	linkingContext := linker.NewLinkingContext(pkg, ranges...)

	//	pkg.Log.Infof("\t -- Resolving --\n")
	//	pkg.Log.Infof("\t\t -- function: %v\n", fun)

	// Re-uses linker's logic to resolve function definitions
	if !fun.GetBuiltIn() {
		typeName := null.GetString(fun.ScopeType)

		// DON'T DO THE FOLLOWING HERE -- NEED TO RESOLVE INHERITANCE FIRST
		// // Make sure we're not replacing an existing function bacause it's (currently) a security risk
		// typeID := fun.GetScopeTypeId()
		// siblingFuncs := linkingContext.FunctionsIn(typeID)
		// // println("CHECKING FOR FRATRICIDE IN", typeName)
		// _, present := siblingFuncs[fun.Stub(pkg)]
		// if present {
		// 	msg := fmt.Sprintf("Redefining an existing function is not permitted: %s", fun.Stub(pkg))
		// 	panic(msg)
		// }
		// // for name, sib := range siblingFuncs {
		// // 	println("\t", name, sib)
		// // }
		// /////////////////////////////////////////////////////////////////////////////

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
				//println("Processing %", null.GetString(arg.Name))
				argTypeId = pkg.GetTypeId(null.GetString(arg.TypeString))
				arg.TypeString = nil
			} else {
				argTypeId = int(null.GetInt32(arg.TypeId))
			}

			localScope[null.GetString(arg.Name)] = argTypeId
		}

		//pkg.Log.Infof("Some insitruction: %v, %s", fun.Instruction, null.GetString(fun.Name) )
		scopeTypeId := int(null.GetInt32(fun.ScopeTypeId))
		//pkg.Log.Infof("\t\t -- opening scope type : %v\n", scopeTypeId)
		returnType := linkingContext.ProcessInstructionWithLocalScope(fun.Instruction, scopeTypeId, localScope, *fun.Name, path, false)

		if linkingContext.HasErrors() {
			message := ""
			for _, msg := range linkingContext.Errors {
				message = message + "\n" + msg
			}
			panic(message)
		}

		fun.ReturnTypeId = proto.Int32(int32(returnType))
		if fun.Instruction != nil {
			fun.Instruction.IterateAll(func(ins *tp.Instruction) {
				if *ins.Type == constants.Instruction_FUNCTION_CALL {
					if null.GetString(ins.Value) == "yield" {
						fun.OpensTypeId = ins.YieldTypeId
					}
				}
			})
		}

	}
	//pkg.Log.Infof("\t\t -- done --\n")
}

// export so it can be re-used by the new packager
func ResolveDefinition(pkg *tp.Package, fn *tp.Function, path string, ranges ...Range) {
	resolveDefinition(pkg, fn, path, ranges...)
}

func (pkg *Package) inheritFunctions() {
	pkg.Log.Infof("pkg types: %v", pkg.Types)
	for _, function := range pkg.Functions {
		pkg.resolveFunctionDescendants(function)
	}
}

// TODO(SJ) : Make this not suck. I think I could make this 50% shorter if I use reflection
// - Also, I'm assuming a single depth level of inheritance. I'd have to run this function n times for n levels
// - Well that should be fine as long as I run it at the end of every package load

func (pkg *Package) resolveFunctionDescendants(fun *tp.Function) {

	// Check if this function contains any types that have descendants
	// name := fun.Stub(pkg.Package)
	// pkg.Log.Infof("Checking for inheritance on function: %v", name)

	newFun := &tp.Function{}
	inherit := false

	// Iterate over ScopeType, Arg types, return Type, opens Type

	// ScopeType

	thisTypeId := null.GetInt32(fun.ScopeTypeId)
	newType := pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {
		if !inherit {
			// pkg.Log.Infof("\t -- ScopeType : Found ancestral type. Cloning function %v\n", null.GetString(fun.Name))
			newFun = fun.Clone().(*tp.Function)
			// pkg.Log.Infof("\t -- New fun: %v", newFun)
			inherit = true
		}
		// pkg.Log.Infof("\t -- Resetting scopeId")
		newFun.ScopeTypeId = proto.Int32(int32(newType))
	}

	// ReturnType

	thisTypeId = null.GetInt32(fun.ReturnTypeId)
	newType = pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {
		if !inherit {
			// pkg.Log.Infof("\t -- ReturnType : Found ancestral type. Cloning function %v\n", null.GetString(fun.Name))
			newFun = fun.Clone().(*tp.Function)
			// pkg.Log.Infof("\t -- New fun: %v", newFun)
			inherit = true
		}
		// pkg.Log.Infof("\t -- Resetting returnId")
		newFun.ReturnTypeId = proto.Int32(int32(newType))
	}

	// OpensType

	thisTypeId = null.GetInt32(fun.OpensTypeId)
	newType = pkg.Package.FindDescendantType(thisTypeId)

	if newType != -1 {

		if !inherit {
			// pkg.Log.Infof("\t -- OpensType : Found ancestral type. Cloning function %v\n", null.GetString(fun.Name))
			newFun = fun.Clone().(*tp.Function)
			// pkg.Log.Infof("\t -- New fun: %v", newFun)
			inherit = true
		}
		// pkg.Log.Infof("\t -- Resetting openTypeId")
		newFun.OpensTypeId = proto.Int32(int32(newType))
	}

	// Arguments

	for index, arg := range fun.Args {
		thisTypeId = null.GetInt32(arg.TypeId)
		newType = pkg.Package.FindDescendantType(thisTypeId)

		if newType != -1 {

			if !inherit {
				// pkg.Log.Infof("\t -- ArgType : Found ancestral type. Cloning function %v\n", null.GetString(fun.Name))
				newFun = fun.Clone().(*tp.Function)
				// pkg.Log.Infof("\t -- New fun: %v", newFun)
				inherit = true
			}
			// pkg.Log.Infof("\t -- Resetting argument")
			newFun.Args[index].TypeId = proto.Int32(int32(newType))
		}

	}

	// pkg.Log.Infof("\t -- Old function: %v\n\t -- New function: %v\n", fun, newFun)

	if inherit {
		resolveDefinition(pkg.Package, newFun, "")
		pkg.Package.Functions = append(pkg.Package.Functions, newFun)
		// println("replicated", pkg.Package.GetTypeName(newFun.GetScopeTypeId()), newFun.Stub(pkg.Package))
	}

}

// oy, gotta export this one too
func (pkg *Package) ResolveFunctionDescendants(fn *tp.Function) {
	pkg.resolveFunctionDescendants(fn)
}

func ReadPackageDefinitions(pkg *tp.Package, projectPath, scriptPath, fileName string, ranges ...Range) []Range {
	//pkg.Println(" -- reading definitions")
	_, err := ioutil.ReadFile(filepath.Join(projectPath, scriptPath, fileName))
	//()("READING DEFINITIONS:", location)

	if err != nil {
		//pkg.Log.Infof("\t -- no user defined functions found")
		// msg := fmt.Sprintf("unable to open function definition file: %s", location)
		// println(msg)
		// panic(msg)
		return ranges
	}
	definitions := parser.ParseFile(projectPath, scriptPath, fileName, false, make([]string, 0))

	// Create a map of pre-packaged function signatures
	prepackaged := make(map[string]bool)
	for _, f := range pkg.Functions {
		var sig string
		baseSig := f.Stub(pkg)
		if baseSig == "name,Text" ||
			baseSig == "text" {
			sig = fmt.Sprintf("%s.%s", f.ScopeTypeString(pkg), f.Stub(pkg))
		} else {
			sig = baseSig
		}
		prepackaged[sig] = true
	}
	// println("*****************")
	// println("*****************")
	// println()
	// println()

	for _, function := range definitions.Functions {
		if function.GetName() == "@import" { // check if it's an import stub first ...
			importPath := function.GetDescription()
			// Verify the existence of the imported file from here, so that we can
			// report the name of the file that contains the import statement.
			importExists, existsErr := exists(filepath.Join(projectPath, importPath))
			if !importExists || (existsErr != nil) {
				errURL := "http://help.moovweb.com/entries/22335641-importing-non-existent-files-in-functions-main-ts"
				msg := fmt.Sprintf("\n********\nin file %s:\nattempting to import nonexistent file %s\nPlease consult %s for more information about this error.\n********\n", filepath.Join(scriptPath, fileName), importPath, errURL)
				panic(msg)
			}
			ranges = ReadPackageDefinitions(pkg, projectPath, filepath.Dir(importPath), filepath.Base(importPath), ranges...)
		} else { // otherwise if it's not an import stub ...
			//pkg.Log.Infof("\t -- function: %v", function)
			resolveDefinition(pkg, function, filepath.Join(scriptPath, fileName), ranges...)

			// After resolving a user-defined function, see if its fully resolved signature
			// is the same as the signature of a prepackaged function. If so, throw an error.
			// var newSig string
			// newBaseSig := function.Stub(pkg)
			// if newBaseSig == "name,Text" ||
			// 	newBaseSig == "text" {
			// 	newSig = fmt.Sprintf("%s.%s", function.ScopeTypeString(pkg), function.Stub(pkg))
			// } else {
			// 	newSig = newBaseSig
			// }
			// // present := false
			// _, present := prepackaged[newSig]
			// if present {
			// 	msg := fmt.Sprintf("Attempt to redefine prepackaged function: %s", strings.Replace(newSig, ",", "(", 1)+")")
			// 	println(msg)
			// 	panic(msg)
			// }

			pkg.Functions = append(pkg.Functions, function)
			if len(ranges) > 0 {
				ranges[len(ranges) - 1].End += 1
			}
		}
	}

	return ranges
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
		if name == null.GetString(typeObj.Name) {
			return index
		}
	}

	log.Panic("Bad type load order, type ", name, " unknown")
	return -1
}

func (pkg *Package) loadPackageDependency(name string) *Error {

	loaded := pkg.loadedDependency(name)

	if loaded {
		return nil
	}
	//	println("LOADING PKG DEPENDENCY", name)
	pkg.Load(name)

	return nil
}

func (pkg *Package) loadedDependency(name string) bool {
	for _, dependency := range pkg.Dependencies {
		if name == dependency {
			pkg.Log.Infof("Already loaded dependency:" + name)
			return true
		}
	}
	return false
}

// Not fully functional. Dang it.
func ReadPackageInfoFile(location string) (info *PackageInfo, error *string) {
	//	println("READING PACKAGE INFO FILE", location + "/package.yml")
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
	//	println("READING FUNCTION HEADER FILE")
	// TODO : plug in new go parser to do this
	input_file := filepath.Join(location, "headers.tf")

	if _, err := os.Open(input_file); err != nil {
		pkg.Log.Infof("Warning -- found no headers.tf")
		return
	}

	stubs := parser.ParseFile(location, ".", "headers.tf", false, make([]string, 0))
	for _, function := range stubs.Functions {
		// Verify that signatures for primitives refer to things that actually exist
		// println("HEY, LINKING BUILTIN:", function.Stub(pkg.Package))
		stubStr := strings.Replace(function.Stub(pkg.Package), ",", ".", -1)
		if whale.LookupBuiltIn(stubStr) == nil {
			// TODO: figure out why the panic string is suppressed so that we can remove the println
			// println("in " + input_file + " -- attempt to provide signature for nonexistent built-in " + stubStr)
			panic("in " + input_file + " -- attempt to provide signature for nonexistent built-in " + stubStr)
		}

		pkg.resolveHeader(function)

		function.BuiltIn = proto.Bool(true)

		pkg.Package.Functions = append(pkg.Package.Functions, function)
	}

}

func (pkg *Package) resolveHeader(function *tp.Function) {
	returnType := null.GetString(function.ReturnType)
	if len(returnType) > 0 {
		function.ReturnTypeId = proto.Int32(int32(pkg.findTypeIndex(returnType)))
		function.ReturnType = nil
	}

	scopeType := null.GetString(function.ScopeType)
	if len(scopeType) > 0 {
		function.ScopeTypeId = proto.Int32(int32(pkg.findTypeIndex(scopeType)))
		function.ScopeType = nil
	}

	opensType := null.GetString(function.OpensType)
	if len(opensType) > 0 {
		function.OpensTypeId = proto.Int32(int32(pkg.findTypeIndex(opensType)))
		function.OpensType = nil
	}

	for _, arg := range function.Args {
		typeName := null.GetString(arg.TypeString)
		if len(typeName) > 0 {
			arg.TypeId = proto.Int32(int32(pkg.findTypeIndex(typeName)))
			arg.TypeString = nil
		}
	}
}

func (pkg *Package) CollectFunctionDocs() {
	for _, function := range pkg.Package.Functions {
		if function.Instruction == nil {
			continue
		}

		for _, instruction := range function.Instruction.Children {
			if *instruction.Type == constants.Instruction_TEXT {
				function.Description = instruction.Value
			}
		}
	}
}

// exists returns whether the given file or directory exists or not
// (grabbed off of Stack Overflow)
func exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
