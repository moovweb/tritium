package spec
import(
	"tritium/packager"
	tp "tritium/proto"
	. "tritium"
	. "path/filepath"
	"tritium/shark"
)

func All(directory string) {
	eng := shark.NewEngine() 
	pkg := packager.BuildDefaultPackage()
	all(directory, pkg.Package, eng)
}

func all(directory string, pkg *tp.Package, eng Engine) {
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

func Run(dir string, pkg *tp.Package, eng Engine) bool {
	spec := LoadSpec(dir, pkg)
	result := spec.Compare(eng.Run(spec.Script, spec.Input, spec.Vars))
	if result.Passed() {
		print(".")
	} else {
		print("F")
	}
	return true
}