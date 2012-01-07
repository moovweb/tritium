package linker

import(
	tp "tritium/proto"
	parser "tritium/parser"
	packager "tritium/packager"
	//. "io/ioutil"
	//. "path"
	"log"
	proto "goprotobuf.googlecode.com/hg/proto"
)

func Run(file string) (*tp.Executable) {
	return RunWithPackage(file, packager.BuildDefaultPackage())
}

func RunWithPackage(file string, pkg *tp.Package) (*tp.Executable) {
	objs := parser.ParseFileSet(file)
	ctx := NewObjectLinkingContext(pkg, objs)
	ctx.Link()
	
	return ctx.Executable
}

func LinkerToBytes(file string) {
	exec := Run(file)
	
	// Now, return the Execution object.
	output, err := proto.Marshal(exec)
	if err != nil {
		log.Fatal(err)
	}
	println("output", len(output), "bytes")
}