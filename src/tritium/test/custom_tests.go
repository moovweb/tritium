package test

import (
	"testing"
	"regexp"
	"fmt"
)


func RunCustomSuite(path string) {
	test := func(t *testing.T) {
		RunTestSuite(path, t)
	}

	tests := []testing.InternalTest{testing.InternalTest{Name: "CustomTest",F: test,}}
	benches, examples := initialize()

	testing.Main(matchString, tests, benches, examples)
}


//func initialize() ([]testing.InternalTest, []testing.InternalBenchmark, []testing.InternalExample) {
func initialize() ([]testing.InternalBenchmark, []testing.InternalExample) {

//	tests := make([]testing.InternalTest, 0)
//	tests = append(tests, testing.InternalTest{Name: "MyThing", F: TestMyThing})

//	return testList(), make([]testing.InternalBenchmark,0), make([]testing.InternalExample,0)
	return make([]testing.InternalBenchmark,0), make([]testing.InternalExample,0)
}


var matchPat string
var matchRe *regexp.Regexp


// func myMatchString(pat, str string) (result bool, err os.Error) { // go60.3
func matchString(pat, str string) (result bool, err error) { //go1
	fmt.Printf("Pat : (%v), string: (%v)\n", pat, str)

	if matchRe == nil || matchPat != pat {
//		matchPat = pat
//		matchRe, err = regexp.Compile(matchPat)
		matchRe, err = regexp.Compile(".*")
		if err != nil {
			return
		}
	}
	result = matchRe.MatchString(str)
	fmt.Printf("Result: (%v)\n", result)

//	return result, nil
	return true, nil
}