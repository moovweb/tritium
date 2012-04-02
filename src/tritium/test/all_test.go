package test

import "testing"
import "regexp"
import "os"

func TestBase(t *testing.T) {
	RunTestSuite("packages/base", t)
}

func TestLibXML(t *testing.T) {
	RunTestSuite("packages/libxml", t)
}


/*
func testList() (tests []*testing.InternalTest) {
	tests = make([]*testing.InternalTest, 0)
	tests = append(tests, &testing.InternalTest{Name: "Base", F: TestBase})
	tests = append(tests, &testing.InternalTest{Name: "LibXML", F: TestLibXML})
	return
}
*/

//func FindTest(pattern string, str string) (bool, os.Error) {}
/*
var matchPat string
var matchRe *regexp.Regexp

func matchString(pat, str string) (result bool, err os.Error) {
	if matchRe == nil || matchPat != pat {
		matchPat = pat
		matchRe, err = regexp.Compile(matchPat)
		if err != nil {
			return
		}
	}
	return matchRe.MatchString(str), nil
}

func RunCustomZ(path string) {
	testing.RunTest(matchString, tests)
}

func RunCustom(path string) {
	t := *testing.T
	RunTestSuite(path, t)
}*/