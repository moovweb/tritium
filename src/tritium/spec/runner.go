package spec
import(
	"tritium/packager"
	tp "tritium/proto"
)

func All(directory string) { 
	pkg := packager.BuildDefaultPackage()
	Run(directory, pkg)
	Run(directory, pkg)
}

func Run(dir string, pkg *tp.Package) bool {
	//eng.Run(transform, input, vars)
	println("TESTING")
	LoadSpec(dir, pkg)
	return true
}