package main

import(
	tp "tritium/proto"
	yaml "launchpad.net/goyaml"
	"io/ioutil"
	"log"
)

type Package struct {
	loaded []string
	*tp.Package
}

func NewPackage() (*Package){
	return &Package{
		Package: &tp.Package{},
		loaded: make([]string, 0),
	}
}

func (pkg *Package)Load(location string) {
	info := make(map[string]interface{})
	infoFile, err := ioutil.ReadFile(location + "/package.yml");
	if err != nil {
		log.Fatal("No package info file found at " + location + "/package.yml")
	}
	yaml.Unmarshal([]byte(infoFile), &info)
	println(string(info))
}

