package test

import "path/filepath"
import "tritium/whale"
import "testing"

//import "log4go"
//import "runtime/debug"
import "runtime"
import "fmt"
import "tritium/spec"
import tp "tritium/proto"
import "tritium/packager/legacy"
import "golog"
import "time"
import "steno/dummy"

func RunTest(path string) (result *spec.Result) {
	result = spec.NewResult()

	logger := golog.NewLogger("tritium")
	logger.AddProcessor("info", golog.NewConsoleProcessor(golog.LOG_INFO, true))

	/*** TODO(SJ) : Reintegrate w new log system. We need to catch errors when running tests
	defer func() {
		if x := recover(); x != nil {
			err, ok := x.(error)
			if ok {
				logger.Error(path + " === " + err.Error() + "\n\n" + string(debug.Stack()))
			} else {
				logger.Error(path + " === " + x.(string) + "\n\n" + string(debug.Stack()))
			}
		}
		for _, rec := range logWriter.Logs {
			error := log4go.FormatLogRecord("[%D %T] [%L] (%S) %M", rec)
			result.Error(path, error)
		}
	}()
	*/

	spec, err := spec.LoadSpec(path, pkg)

	if err != nil {
		result.Error(path, fmt.Sprintf("Error loading test spec:\n%v\n", err.Error()))
		return
	}
	debugger := &dummy.DummyDebugger{}
	eng := whale.NewEngine(debugger)
	d, _ := time.ParseDuration("1m")
	result.Merge(spec.Compare(eng.Run(spec.Script, nil, spec.Input, spec.Vars, time.Now().Add(d), "test", "test", "test", make([]string, 0), false)))

	return
}

func GatherTests(directory string) (tests []string) {
	matches, err := filepath.Glob(filepath.Join(directory, "main.ts"))

	if err == nil && matches != nil {
		tests = append(tests, directory)
	}

	subdirs, _ := filepath.Glob(filepath.Join(directory, "*"))

	for _, subdir := range subdirs {
		tests = append(tests, GatherTests(subdir)...)
	}

	return
}

func relativeDirectory(directoryFromRoot string) (directory string, ok bool) {
	_, file, _, ok := runtime.Caller(0)

	if !ok {
		return
	}

	directory = filepath.Join(file, "../../", directoryFromRoot)

	return
}

var pkg *tp.Package

func initializePackage() {
	packagesPath, ok := relativeDirectory("packages")

	if !ok {
		panic("Can't find root tritium directory to build default package")
	}

	tpkg := legacy.LoadDefaultPackage(&packagesPath)
	pkg = tpkg.Package
}

func RunTestSuite(directoryFromRoot string, t *testing.T) {
	directory, ok := relativeDirectory(directoryFromRoot)
	globalResult := spec.NewResult()
	initializePackage()

	if !ok {
		t.Error("Couldn't resolve root directory")
		t.FailNow()
	}

	testPaths := GatherTests(directory)

	for _, testPath := range testPaths {
		testResult := RunTest(testPath)
		print(testResult.CharStatus())
		globalResult.Merge(testResult)
	}

	for _, error := range globalResult.Errors {
		t.Fail()
		println("\n=========================================", error.Location, "\n")
		if error.Panic {
			fmt.Printf(error.Message)
		} else {
			println(fmt.Sprintf("\n==========\n%v :: %v \n\n Got \n----------\n[%v]\n\n Expected \n----------\n[%v]\n", error.Name, error.Message, error.Got, error.Expected))
		}
	}
	fmt.Printf("\n+++ Finished test suite(%v) +++\n\n", directoryFromRoot)

}
