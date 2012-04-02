package packager

import (
	proto "code.google.com/p/goprotobuf/proto"
	"log"
)

func (pkg *Package) SerializedOutput() {

	bytes, err := proto.Marshal(pkg.Package)
	if err != nil {
		log.Panic(err)
	}
	println(string(bytes))
}

func (pkg *Package) DebugInfo() string {
	result := ""
	for _, fun := range pkg.Package.Functions {
		result = result + fun.DebugInfo(pkg.Package) + "\n"
	}
	return result
}

func (pkg *Package) Println(message string) {
	if pkg.Options["stdout"] {
		println(message)
	}
}
