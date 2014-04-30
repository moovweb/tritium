package test

import "tritium/whale"
import "testing"
import "fmt"
import "tritium/spec"
import "golog"
import "time"
import "steno/dummy"

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
	logger := golog.NewLogger("tritium")
	logger.AddProcessor("info", golog.NewConsoleProcessor(golog.LOG_INFO, true))

	spec, err := spec.LoadSpec(path, pkg)

	if err != nil {
		panic(fmt.Sprintf("Error loading test spec at (%v) :\n%v\n", path, err.Error()))
	}
	debugger := &dummy.DummyDebugger{}
	eng := whale.NewEngine(debugger)

	b.StartTimer()
	d, _ := time.ParseDuration("1m")

	for i := 0; i < b.N; i++ {
		eng.Run(spec.Script, nil, spec.Input, spec.Vars, time.Now().Add(d), "test", "test", "test", make([]string, 0), false)
	}
}
