package packager

import(
	tp "athena/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	"io/ioutil"
	"log"
	"path/filepath"
	"tritium/crypto"
)

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
	pkg.OutputFile = outputFilename

	pkg.Println(" -- output: " +  outputFilename)
}

func (pkg *Package) open(path string, name string) {	
	tpkg_path := filepath.Join(path, name + ".tpkg")
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