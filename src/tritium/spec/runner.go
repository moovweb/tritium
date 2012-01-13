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
	pkg := packager.BuildDefaultPackage(PackagePath)

	globalResult := NewResult()
	globalResult.all(directory, pkg.Package, eng)

	// TODO : Walk over the results here and print errors. 

	for _, error := range(globalResult.Errors) {
		if error.Panic {
			Printf("Had panic in", error.Name, "\n", error.Message)
		} else {
			Printf("\n==========\n%v :: %v \n\n Got \n----------\n%v\n\n Expected \n----------\n%v\n", error.Name, error.Message, error.Got, error.Expected)
		}
		println("\n=========================================\n")
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
	this_result := NewResult()
	defer func() {
			//log.Println("done")  // Println executes normally even in there is a panic
			//if x := recover(); x != nil {
			//	this_result.Error(dir, Sprintf("run time panic: %v", x))
			//}
			print(this_result.CharStatus())
			result.Merge(this_result)
		}()
	spec := LoadSpec(dir, pkg)
	this_result.Merge(spec.Compare(eng.Run(spec.Script, spec.Input, spec.Vars)))
}