package spec
import(
	"tritium/packager"
	tp "tritium/proto"
	. "tritium"
	. "path/filepath"
	"tritium/engine"
)

func All(directory string) {
	eng := engine.NewEngine() 
	pkg := packager.BuildDefaultPackage()
	all(directory, pkg.Package, eng)
}

func all(directory string, pkg *tp.Package, eng Transformer) {
	_, err := Glob(Join(directory, "main.ts"))
	//println("checking in", directory)
	if err == nil {
		//println("running")
		Run(directory, pkg, eng)
	}
	subdirs, _ := Glob(Join(directory, "*"))
	for _, subdir := range(subdirs) {
		all(subdir, pkg, eng)
	}
}

func Run(dir string, pkg *tp.Package, eng Transformer) bool {
	spec := LoadSpec(dir, pkg)
	output, _, _ := eng.Run(spec.Script, spec.Input, spec.Vars)
	if output == spec.Output {
		print(".")
	} else {
		print("F")
	}
	return true
}