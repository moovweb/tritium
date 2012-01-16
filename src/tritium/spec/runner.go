package spec
import(
	"tritium/packager"
	tp "tritium/proto"
	. "tritium"
	. "path/filepath"
	"tritium/shark"
	. "fmt"
	l4g "log4go"
)

func All(directory string) {
	logger := make(l4g.Logger)
	logger.AddFilter("stdout", l4g.ERROR, l4g.NewConsoleLogWriter())
	logger.AddFilter("test", l4g.ERROR, l4g.NewConsoleLogWriter())
	l4g.Global = logger
	eng := shark.NewEngine(logger) 
	pkg := packager.BuildDefaultPackage(PackagePath)

	globalResult := NewResult()
	globalResult.all(directory, pkg.Package, eng, logger)

	// TODO : Walk over the results here and print errors. 

	for _, error := range(globalResult.Errors) {
		println("\n=========================================", error.Location, "\n")
		if error.Panic {
			Printf(error.Message)
		} else {
			Printf("\n==========\n%v :: %v \n\n Got \n----------\n%v\n\n Expected \n----------\n%v\n", error.Name, error.Message, error.Got, error.Expected)
		}
	}
}

func (result *Result)all(directory string, pkg *tp.Package, eng Engine, logger l4g.Logger) {
	_, err := Glob(Join(directory, "main.ts"))
	//println("checking in", directory)

	if err == nil {
		//println("running")
		newResult := RunSpec(directory, pkg, eng, logger)
		result.Merge(newResult)
	}
	subdirs, _ := Glob(Join(directory, "*"))
	for _, subdir := range(subdirs) {
		result.all(subdir, pkg, eng, logger)
	}
}

func RunSpec(dir string, pkg *tp.Package, eng Engine, logger l4g.Logger) (result *Result) {
	result = NewResult()
	logWriter := NewTestLogWriter()
	logger["test"] = &l4g.Filter{l4g.DEBUG, logWriter}

	defer func() {
			//log.Println("done")  // Println executes normally even in there is a panic
			recover()
			if x := recover(); x != nil {
				result.Error(dir, Sprintf("run time panic: %v", x))
			}
			for _, rec := range(logWriter.Logs) {
				println("HAZ LOGS")
				error := l4g.FormatLogRecord("[%D %T] [%L] (%S) %M", rec)
				result.Error(dir, error)
			}
			print(result.CharStatus())
		}()
	spec := LoadSpec(dir, pkg)
	result.Merge(spec.Compare(eng.Run(spec.Script, spec.Input, spec.Vars)))
	return
}