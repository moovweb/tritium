package spec
import(
	"tritium/packager"
	tp "tritium/proto"
	"tritium/engine"
)

func All(directory string) { 
	pkg := packager.BuildDefaultPackage()
	Run(directory, pkg)
	Run(directory, pkg)
}

func Run(dir string, pkg *tp.Package) bool {
	spec := LoadSpec(dir, pkg)
	eng := engine.NewEngine(spec.Script)
	//eng.Run(transform, input, vars)
	output, _, _ := eng.Run(spec.Input, spec.Vars)
	if output == spec.Output {
		print(".")
	} else {
		print("F")
	}
	return true
}