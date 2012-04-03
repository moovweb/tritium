package test

import "log4go"
import "tritium/src/tritium/whale"
import "testing"
import "fmt"
import "tritium/src/tritium/spec"

func RunBenchmark(b *testing.B) {
	b.StopTimer()

	path := "packages/" // Hardcode for now

	logger := make(log4go.Logger)
	log4go.Global = logger

	logWriter := spec.NewTestLogWriter()
	logger["test"] = &log4go.Filter{log4go.WARNING, "test", logWriter}


	// pkg is initialized when tests/benchmark suites are run
	spec, err := spec.LoadSpec(path, pkg)
	
	if err != nil {
		panic(fmt.Sprintf("(%v) Error loading test spec:\n%v\n", path, err))
	}

	eng := whale.NewEngine(logger)

	b.StartTimer()

	eng.Run(spec.Script, spec.Input, spec.Vars)

	return
}