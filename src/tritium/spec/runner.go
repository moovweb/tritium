package spec
import(
	"tritium/packager"
	tp "tritium/proto"
	. "tritium"
	. "path/filepath"
	"tritium/shark"
	. "fmt"
	"log4go"
)

func All(directory string) {
	logger := log4go.NewDefaultLogger(log4go.FINEST)
	eng := shark.NewEngine(logger) 
	pkg := packager.BuildDefaultPackage(TritiumPath)

	globalResult := newResult()
	globalResult.all(directory, pkg.Package, eng)

	// TODO : Walk over the results here and print errors. 

	for _, error := range(globalResult.Errors) {
		Printf("\n==========\n%v :: %v \n\n Got \n----------\n%v\n\n Expected \n----------\n%v\n", error.Name, error.Message, error.Got, error.Expected)
	}

}

func (result *Result)all(directory string, pkg *tp.Package, eng Engine) {
	_, err := Glob(Join(directory, "main.ts"))
	//println("checking in", directory)

	if err == nil {
		//println("running")
		result.Run(directory, pkg, eng)
	}
	subdirs, _ := Glob(Join(directory, "*"))
	for _, subdir := range(subdirs) {
		result.all(subdir, pkg, eng)
	}
}

func (result *Result)Run(dir string, pkg *tp.Package, eng Engine) {
	spec := LoadSpec(dir, pkg)
	this_result := spec.Compare(eng.Run(spec.Script, spec.Input, spec.Vars))
	if this_result.Passed() {
		print(".")
		this_result = spec.Compare(eng.Run(spec.Script, spec.Input, spec.Vars))
		if this_result.Passed() {
			print(".")
		} else {
			print("R")
		}
	} else {
		result.Merge(this_result)
		print("F")
	}
}