package spec
import(
	"tritium/packager"
	tp "tritium/proto"
	. "tritium"
	"tritium/engine"
)

func All(directory string) {
	eng := engine.NewEngine() 
	pkg := packager.BuildDefaultPackage()
	Run(directory, pkg, eng)
	Run(directory, pkg, eng)
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