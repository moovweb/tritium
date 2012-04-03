package test

import (
	"testing"
	"regexp"
)


func RunCustomSuite(path string) {
	test := func(t *testing.T) {
		RunTestSuite(path, t)
	}

	tests := []testing.InternalTest{testing.InternalTest{Name: "CustomTest",F: test,}}
	_, benches, examples := initialize()

	testing.Main(matchString, tests, benches, examples)
}

func initialize() ([]testing.InternalTest, []testing.InternalBenchmark, []testing.InternalExample) {
	return make([]testing.InternalTest,0), make([]testing.InternalBenchmark,0), make([]testing.InternalExample,0)
}

var matchPat string
var matchRe *regexp.Regexp

func matchString(pat, str string) (result bool, err error) { //go1
	if matchRe == nil || matchPat != pat {
		matchRe, err = regexp.Compile(".*")
		if err != nil {
			return
		}
	}
	result = matchRe.MatchString(str)

	return true, nil
}