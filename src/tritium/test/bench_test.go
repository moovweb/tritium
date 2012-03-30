package test

import "path/filepath"
import tp "athena/src/athena/proto"
import "tritium/src/tritium/whale"
import "testing"
import "log4go"
import "runtime"
import "runtime/debug"
import "fmt"
import "hermes/src/hermes"
import "hermes/src/hermes/api"
import "tritium/src/tritium/spec"
import "os"

func RunBenchmark(b *testing.B) {
	b.StopTimer()

	result = spec.NewResult()
	
	dataPath, err := hermes.GetDataPath()

	if err != nil {
		result.Error(path, fmt.Sprintf("Couldn't find data path: %v\n", err.String()))
		return
	}

	session := api.NewDefaultSession(dataPath, "", logger)
	mixer, _, err := session.LoadMixerByFullName("omni-mobile", "")
	
	if err != nil {
		result.Error(path, fmt.Sprintf("Couldn't load mixer: %v\n", err.String()))
		return
	}
	
	var pkg *tp.Package	
	pkg = mixer.Package

	spec, err := spec.LoadSpec(path, pkg)
	
	if err != nil {
		result.Error(path, fmt.Sprintf("Error loading test spec:\n%v\n", err.String()))
		return
	}

	eng := whale.NewEngine(logger)

	b.StartTimer()

	eng.Run(spec.Script, spec.Input, spec.Vars)

	return
}