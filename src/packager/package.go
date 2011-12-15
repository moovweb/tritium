package main

import(
	tp "tritium/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	yaml "launchpad.net/goyaml"
	"io/ioutil"
	"log"
	"strings"
)

type Package struct {
	loaded []*PackageInfo
	*tp.Package
}

type PackageInfo struct {
	Name string
	Dependencies []string
	Types []string
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
}

func (pkg *Package)findTypeIndex(name string) int {
	for index, typeObj := range(pkg.Types) {
		if name == proto.GetString(typeObj.Name) {
			return index
		}
	}
	log.Fatal("Bad type load order, type", name, "uknown")
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

