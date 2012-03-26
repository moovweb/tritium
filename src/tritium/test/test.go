package test

import "path/filepath"
import "io/ioutil"
import "log"
import tp "athena/src/athena/proto"
import "tritium/src/tritium/whale"
import "testing"
import "tritium/src/tritium/packager"
import "tritium/src/tritium/linker"
import "tritium/src/tritium"
import yaml "goyaml"
import "log4go"
import "os"

func LoadMixer(path string) (pkg *tp.Package) {
	if len(path) > 0 {
		// Used when testing in ambrosia
		mixer := tp.OpenMixer(path)
		pkg = mixer.Package
	} else {
		bigPackage := packager.BuildDefaultPackage()
		pkg = bigPackage.Package
	}
	return
}

func LoadUserFunctions(path string, pkg *tp.Package) (newPkg *tp.Package) {
	if len(path) > 0 {
		newPkg = tritium.MakeProjectPackage(path, pkg)
	}
	return
}

func LoadFile(dir, filename string) (data []byte, err os.Error) {
	list, err := filepath.Glob(filepath.Join(dir, filename))
	if err != nil {
		return
	}
	if len(list) == 0 {
		return
	}
	data, err = ioutil.ReadFile(list[0])
	return
}

func LoadVars(path string) (vars map[string]string) {
	data, err := LoadFile(path, "vars.yml")
	if err == nil {
		vars = make(map[string]string, 0)
		err = yaml.Unmarshal(data, &vars)
	}
	if err != nil {
		log.Fatal(err)
	}
	return
}

func RunTest(path string, t *testing.T) {
	mixerPaths, err := filepath.Glob("$HOME/.manhattan/mixer/*.mxr")
	mixerPath := ""
	if err == nil && len(mixerPaths) > 0 {
		mixerPath = mixerPaths[0]
	}
	pkg := LoadMixer(mixerPath)

	funcPaths, err := filepath.Glob(filepath.Join(path, "functions.ts"))
	if err == nil && len(funcPaths) > 0 {
		pkg = LoadUserFunctions(funcPaths[0], pkg)
	}

	scriptPaths, err := filepath.Glob(filepath.Join(path, "main.ts"))

	var script *tp.Transform
	if err == nil && len(scriptPaths) > 0 {
		script, err = linker.RunWithPackage(filepath.Join(path, "main.ts"), pkg)
	}
	if err != nil {
		log.Fatal("cannot load main.ts: %v", err)
	}

	
	input, err := LoadFile(path, "input.*")
	vars := LoadVars(path)
	
	logger := log4go.NewDefaultLogger(log4go.INFO)
	eng := whale.NewEngine(logger)
	eng.Run(script, input, vars)
}

func Test1(t *testing.T) {
	all, _ := filepath.Glob("main.ts")
	println(len(all))
}



/*
func RunBench(b *testing.B) {

}
*/