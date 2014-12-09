package legacy

import (
	"io/ioutil"
	"os"
	"path/filepath"
)

import (
	"tritium/dependencies/butler/crypto"
	"tritium/dependencies/butler/null"
	proto "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
)

func (pkg *Package) write() {
	//	path, name := filepath.Split(pkg.location)
	//	path, name := filepath.Split(pkg.LoadPath)
	//	outputFilename := filepath.Join(path, name, name+".tpkg")
	name := null.GetString(pkg.Name)
	outputFilename := filepath.Join(pkg.LoadPath, name+".tpkg")

	bytes, err := proto.Marshal(pkg.Package)

	if err != nil {
		panic("Could not marshal package: " + name + " (" + err.Error() + ")")
	}

	bytes = crypto.Encrypt(bytes)

	ioutil.WriteFile(outputFilename, bytes, os.FileMode(0666))
	pkg.OutputFile = outputFilename

	pkg.Println(" -- output: " + outputFilename)
}

func (pkg *Package) LoadFromFile(path string) (thisError *Error) {
	tpkg_path := path + ".tpkg"
	data, err := ioutil.ReadFile(tpkg_path)

	if err != nil {
		return &Error{
			Code:    NOT_FOUND,
			Message: "Could not find tpkg file:" + tpkg_path,
		}
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

	return nil
}

func (pkg *Package) Merge(otherPackage *tp.Package) {

	if otherPackage == nil {
		return
	}

	//// Reflection would make this code cleaner:

	var existingTypeId int

	for _, someType := range otherPackage.Types {
		existingTypeId = pkg.GetTypeId(null.GetString(someType.Name))
		if existingTypeId == -1 {
			pkg.Types = append(pkg.Types, someType)
		}
	}

	for _, function := range otherPackage.Functions {

		if null.GetBool(function.BuiltIn) {
			pkg.resolveHeader(function)
		} else {
			resolveDefinition(pkg.Package, function, "")
		}
		pkg.Package.Functions = append(pkg.Package.Functions, function)
	}

	for _, dependency := range otherPackage.Dependencies {
		pkg.Dependencies = append(pkg.Dependencies, dependency)
	}

	otherName := null.GetString(otherPackage.Name)
	pkg.Dependencies = append(pkg.Dependencies, otherName)
	pkg.Log.Infof("Added dependency (" + otherName + ") to " + null.GetString(pkg.Name) + "'s loaded dependencies")
}
