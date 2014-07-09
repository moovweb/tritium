package test

import (
	"fmt"
	"golog"
	"io/ioutil"
	"path/filepath"
	"testing"
	"time"

	// TODO: remove this and replace with something else when whale no longer needs to use steno loggers
	"tritium/dependencies/butler/mixer"
	"steno/dummy"
	tf "tritium/transform"
	tp "tritium/proto"
	"tritium/packager"
	"tritium/whale"
)

var baseDir string

const (
	ENTRY_FILE                  = "main.ts"
	INPUT_FILE					= "input.html"
	OUTPUT_FILE					= "output.html"
)

func TestExports(t *testing.T) {
	var ok bool
	baseDir, ok = relativeDirectory(filepath.Join("engine_tests", "tritium", "exports"))
	if !ok {
		t.Fatalf("Can't find the files to test.")
	}
	mixerNames, _, err := mixer.ParseMultiMixerLock(baseDir)
	if err != nil {
		t.Fatalf(err.Error())
	}


	logger := golog.NewLogger("")
	mixers := make([]*tp.Mixer, 0)
	for _, name := range mixerNames {
		pkgr := packager.New(filepath.Join(baseDir, "mixers", name), "lib", true, logger, placeholder)
		pkgr.Build()
		mixers = append(mixers, pkgr.Mixer)
	}

	// combine mixers...
	_, mixer, exportRanges, _, err := packager.GetPkgdMixers(mixers, false)
	if err != nil {
		t.Fatalf(err.Error())
	}

	transform, err := tf.CompileString(getFileString(ENTRY_FILE, t), "", "", "", mixer.Package, make([]string, 0), exportRanges...)
	if err != nil {
		t.Fatalf("Building the transform failed.")
	}

	env := make(map[string]string)

	debugger := &dummy.DummyDebugger{}
	eng := whale.NewEngine(debugger)
	d, _ := time.ParseDuration("1m")

	exhaust := eng.Run(transform, nil, getFileString(INPUT_FILE, t), env, time.Now().Add(d), "", "", "", make([]string, 0), false)

	if exhaust.Output != getFileString(OUTPUT_FILE, t) {
		t.Errorf("Got Unexpected output:\n" + exhaust.Output)
	}

	print(".")
}

func getFileString(filename string, t *testing.T) string {
	output, err := ioutil.ReadFile(filepath.Join(baseDir, filename))
	if err != nil {
		t.Fatalf(err.Error())
	}
	return string(output)
}

// shouldn't download or attempt to get a precompiled mixer for this test
func placeholder(name, version string) (mxr *tp.Mixer, err error) {
	return nil, fmt.Errorf("Error.")
}

