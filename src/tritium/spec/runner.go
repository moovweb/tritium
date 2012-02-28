package spec

import (
	"tritium/packager"
	tp "athena/src/athena/proto"
	. "tritium"
	. "path/filepath"
	"tritium/shark"
	. "fmt"
	l4g "log4go"
	"os"
	"runtime/debug"
)

func All(directory string) {
	logger := make(l4g.Logger)
	logger.AddFilter("test", l4g.ERROR, l4g.NewConsoleLogWriter())
	l4g.Global = logger
	eng := shark.NewEngine(logger)
	pkg := packager.BuildDefaultPackage()

	globalResult := NewResult()
	globalResult.all(directory, pkg.Package, eng, logger)

	logger.AddFilter("stdout", l4g.ERROR, l4g.NewConsoleLogWriter())

	// TODO : Walk over the results here and print errors. 

	for _, error := range globalResult.Errors {
		println("\n=========================================", error.Location, "\n")
		if error.Panic {
			Printf(error.Message)
		} else {
			Printf("\n==========\n%v :: %v \n\n Got \n----------\n%v\n\n Expected \n----------\n%v\n", error.Name, error.Message, error.Got, error.Expected)
		}
	}
	println("\n\n")
	println("+++TEST COMPLETE+++\n\n")
}

func (result *Result) all(directory string, pkg *tp.Package, eng Engine, logger l4g.Logger) {
	_, err := Glob(Join(directory, "main.ts"))

	if err == nil {
		newResult := RunSpec(directory, pkg, eng, logger)
		result.Merge(newResult)
	}
	subdirs, _ := Glob(Join(directory, "*"))
	for _, subdir := range subdirs {
		result.all(subdir, pkg, eng, logger)
	}
}

func RunSpec(dir string, pkg *tp.Package, eng Engine, logger l4g.Logger) (result *Result) {
	result = NewResult()
	logWriter := NewTestLogWriter()
	logger["test"] = &l4g.Filter{l4g.WARNING, "test", logWriter}

	defer func() {
		//log.Println("done")  // Println executes normally even in there is a panic
		if x := recover(); x != nil {
			err, ok := x.(os.Error)
			if ok {
				logger.Error(dir + " === " + err.String() + "\n\n" + string(debug.Stack()))
			} else {
				logger.Error(dir + " === " + x.(string) + "\n\n" + string(debug.Stack()))
			}

		}
		for _, rec := range logWriter.Logs {
			//println("HAZ LOGS")
			error := l4g.FormatLogRecord("[%D %T] [%L] (%S) %M", rec)
			result.Error(dir, error)
		}
		print(result.CharStatus())
	}()
	spec, err := LoadSpec(dir, pkg)
	if err != nil {
		result.Error(dir, err.String())
	} else {
		result.Merge(spec.Compare(eng.Run(spec.Script, spec.Input, spec.Vars)))
	}
	return
}
