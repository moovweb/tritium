package spec

import (
	"fmt"
	"os"
	"path/filepath"
)

import (
	"runtime/debug"
	"time"

	mixers "github.com/moovweb/butler/mixer"
	xmlhelp "github.com/moovweb/gokogiri_internal/help"
	"github.com/moovweb/golog"
	"github.com/moovweb/steno/dummy"
	"github.com/moovweb/tritium"
	"github.com/moovweb/tritium/packager/legacy"
	tp "github.com/moovweb/tritium/proto"
	"github.com/moovweb/tritium/whale"
)

func All(command string, directory string, options ...string) {

	var mixerPath string
	if len(options) == 1 {
		//TODO: Instead of the mixer path, we should pass in just the name
		//and the version.
		mixerPath = filepath.Base(options[0])
	}

	logger := golog.NewLogger("tritium")
	debugger := &dummy.DummyDebugger{}

	logger.AddProcessor("info", golog.NewConsoleProcessor(golog.LOG_INFO, true))
	var eng tritium.Engine
	if command == "test" {
		eng = whale.NewEngine(debugger)
	}

	var pkg *tp.Package

	if len(mixerPath) > 0 {
		// Used when testing in ambrosia
		mixer, err := mixers.GetMixerFromFile(mixerPath)
		if err != nil {
			panic("Error, could not load mixer: " + mixerPath)
		}

		pkg = mixer.Package
	} else {
		bigPackage := legacy.BuildDefaultPackage()
		pkg = bigPackage.Package
	}

	globalResult := NewResult()
	globalResult.all(directory, pkg, eng, logger)

	// TODO : Walk over the results here and print errors.

	var foundError = false

	for _, err := range globalResult.Errors {
		foundError = true
		println("\n=========================================", err.Location, "\n")
		if err.Panic {
			fmt.Printf(err.Message)
		} else {
			fmt.Printf("\n==========\n%v :: %v \n\n Got \n----------\n%v\n\n Expected \n----------\n%v\n", err.Name, err.Message, err.Got, err.Expected)
		}
	}
	println("\n\n")
	println("+++TEST COMPLETE+++\n\n")

	if foundError {
		os.Exit(1)
	}
	eng.Free()
	xmlhelp.LibxmlCleanUpParser()
	if xmlhelp.LibxmlGetMemoryAllocation() != 0 {
		fmt.Printf("Memeory leaks %d!!!", xmlhelp.LibxmlGetMemoryAllocation())
		xmlhelp.LibxmlReportMemoryLeak()
	}
}

func (result *Result) all(directory string, pkg *tp.Package, eng tritium.Engine, logger *golog.Logger) {
	paths, err := filepath.Glob(filepath.Join(directory, "main.ts"))
	if err == nil && len(paths) == 1 {
		newResult := RunSpec(directory, pkg, eng, logger)
		result.Merge(newResult)
	}

	subdirs, _ := filepath.Glob(filepath.Join(directory, "*"))
	for _, subdir := range subdirs {
		fi, err := os.Stat(subdir)
		if err != nil {
			continue
		}
		if !fi.IsDir() {
			continue
		}
		result.all(subdir, pkg, eng, logger)
	}

}

func RunSpec(dir string, pkg *tp.Package, eng tritium.Engine, logger *golog.Logger) (result *Result) {
	result = NewResult()

	defer func() {
		//log.Println("done")  // Println executes normally even in there is a panic
		if x := recover(); x != nil {
			err, ok := x.(error)
			if ok {
				logger.Errorf(dir + " === " + err.Error() + "\n\n" + string(debug.Stack()))
			} else {
				logger.Errorf(dir + " === " + x.(string) + "\n\n" + string(debug.Stack()))
			}
		}
		print(result.CharStatus())
	}()

	spec, err := LoadSpec(dir, pkg)
	if err != nil {
		result.Error(dir, err.Error())
	} else {
		d, _ := time.ParseDuration("1m")
		result.Merge(spec.Compare(eng.Run(spec.Script, nil, spec.Input, spec.Vars, map[string]string{}, time.Now().Add(d), "test", "test", "test", make([]string, 0), false)))
	}
	return
}
