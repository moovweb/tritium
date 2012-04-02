package test

import "path/filepath"
import "tritium/src/tritium/whale"
import "testing"
import "log4go"
import "runtime"
import "runtime/debug"
import "fmt"
import "tritium/src/tritium/spec"

func RunTest(path string) (result *spec.Result) {
	result = spec.NewResult()

	logger := make(log4go.Logger)
	log4go.Global = logger

	logWriter := spec.NewTestLogWriter()
	logger["test"] = &log4go.Filter{log4go.WARNING, "test", logWriter}

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

	spec, err := spec.LoadSpec(path, pkg)

	if err != nil {
		result.Error(path, fmt.Sprintf("Error loading test spec:\n%v\n", err.Error()))
		return
	}

	eng := whale.NewEngine(logger)
	result.Merge(spec.Compare(eng.Run(spec.Script, spec.Input, spec.Vars)))

	return
}

func GatherTests(directory string) (tests []string) {
	_, err := filepath.Glob(filepath.Join(directory, "main.ts"))

	if err == nil {
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

	directory = filepath.Join(file, "../../../../", directoryFromRoot)

	println("Running tests in : " + directory)

	return
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
			fmt.Printf("\n==========\n%v :: %v \n\n Got \n----------\n%v\n\n Expected \n----------\n%v\n", error.Name, error.Message, error.Got, error.Expected)
		}
	}
	fmt.Printf("\n+++ Finished test suite(%v) +++\n\n", directoryFromRoot)

}
