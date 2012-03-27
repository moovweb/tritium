package test

import "path/filepath"
// import "io/ioutil"
// import "log"
import tp "athena/src/athena/proto"
import "tritium/src/tritium/whale"
import "testing"
// import "tritium/src/tritium/packager"
//import "tritium/src/tritium/linker"
//import "tritium/src/tritium"
// import yaml "goyaml"
import "log4go"
// import "os"
import "runtime"
import "fmt"
import "hermes/src/hermes"
import "hermes/src/hermes/api"
import "tritium/src/tritium/spec"


func RunTest(path string, t *testing.T) {
	println("Running ... " + path)
	logger := log4go.NewDefaultLogger(log4go.INFO)
	dataPath, err := hermes.GetDataPath()

	if err != nil {
		t.Errorf("Couldn't find data path: %v\n", err.String())
		t.FailNow()
	}

	session := api.NewDefaultSession(dataPath, "", logger)
	mixer, _, err := session.LoadMixerByFullName("omni-mobile", "")
	
	if err != nil {
		t.Errorf("Couldn't load mixer: %v\n", err.String())
		t.FailNow()
	}
	
	var pkg *tp.Package	
	pkg = mixer.Package

	fmt.Printf("Loaded mixer")

	spec, err := spec.LoadSpec(path, pkg)
	
	if err != nil {
		t.Errorf("Error loading test spec:\n%v\n", err.String())
	}


	eng := whale.NewEngine(logger)
	output, exports, logs := eng.Run(spec.Script, spec.Input, spec.Vars)

	fmt.Printf("RESULT: %v :: %v :: %v\n", output, exports, logs)
}

func Test1(t *testing.T) {
	all, _ := filepath.Glob("main.ts")
	println(len(all))
}

func GatherTests(directory string) (tests []string) {
	_, err := filepath.Glob(filepath.Join(directory, "main.ts"))

	if err == nil {
		tests = append(tests, directory)
	}

	subdirs, _ := filepath.Glob(filepath.Join(directory, "*"))

	for _, subdir := range subdirs {
		tests = append(tests, GatherTests(subdir)...)
		//result.all(subdir, pkg, eng, logger)
	}

	return
}

func relativeDirectory(directoryFromRoot string) (directory string, ok bool){
	_, file, _, ok := runtime.Caller(0)

	if !ok {
		return
	}

	directory = filepath.Join(file, "../../../../", directoryFromRoot)

	println("Directory:" + directory)

	return
}

func RunTestSuite(directoryFromRoot string, t *testing.T) {
	directory, ok := relativeDirectory(directoryFromRoot)

	if !ok {
		t.Error("Couldn't resolve root directory")
		t.FailNow()
	}

	testPaths := GatherTests(directory)

	for _, testPath := range(testPaths) {
		RunTest(testPath, t)
	}
}