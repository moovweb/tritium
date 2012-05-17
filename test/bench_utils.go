package test

import "log4go"
import "tritium/whale"
import "testing"
import "fmt"
import "tritium/spec"

func RunBenchmarkSuite(directoryFromRoot string, b *testing.B) {
	b.StopTimer()
	directory, ok := relativeDirectory(directoryFromRoot)
	initializePackage()

	if !ok {
		panic("Couldn't resolve root directory")
	}

	testPaths := GatherTests(directory)

	for _, testPath := range testPaths {
		RunBenchmark(testPath, b)
		b.StopTimer()
	}
}

func RunBenchmark(path string, b *testing.B) {
	logger := make(log4go.Logger)
	log4go.Global = logger

	logWriter := spec.NewTestLogWriter()
	logger["test"] = &log4go.Filter{log4go.WARNING, "test", logWriter}

	spec, err := spec.LoadSpec(path, pkg)

	if err != nil {
		panic(fmt.Sprintf("Error loading test spec at (%v) :\n%v\n", path, err.Error()))
	}

	eng := whale.NewEngine(logger)

	b.StartTimer()
	
	for i := 0; i < b.N; i++ {
		eng.Run(spec.Script, spec.Input, spec.Vars)
	}
}
