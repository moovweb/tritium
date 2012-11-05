package test

import (
	"flag"
	"testing"
)

func TestCustomSuite(path string) {
	test := func(t *testing.T) {
		RunTestSuite(path, t)
	}

	tests := []testing.InternalTest{testing.InternalTest{Name: "CustomTest(" + path + ")", F: test}}
	_, benches, examples := initialize()

	testing.Main(matchString, tests, benches, examples)
}

func BenchmarkCustomSuite(path string) {
	benchmark := func(b *testing.B) {
		RunBenchmarkSuite(path, b)
	}

	benches := []testing.InternalBenchmark{testing.InternalBenchmark{Name: "CustomBenchmark(" + path + ")", F: benchmark}}

	test := func(t *testing.T) {
		RunTestSuite(path, t)
	}

	tests := []testing.InternalTest{testing.InternalTest{Name: "CustomTest(" + path + ")", F: test}}

	_, _, examples := initialize()

	flag.Set("test.bench", ".*") // IMPORTANT : The testing internals check that this flag is set

	testing.Main(matchString, tests, benches, examples)
}

func initialize() ([]testing.InternalTest, []testing.InternalBenchmark, []testing.InternalExample) {
	return make([]testing.InternalTest, 0), make([]testing.InternalBenchmark, 0), make([]testing.InternalExample, 0)
}

func matchString(pat, str string) (result bool, err error) { //go1
	return true, nil
}
