package main

import "path/filepath"
import "tritium/whale"
// import "testing"

//import "log4go"
//import "runtime/debug"
import "runtime"
// import "fmt"
// import "tritium/spec"
import tp "tritium/proto"
import "tritium/packager/legacy"
import "golog"
import "time"
import "steno/dummy"
import "tritium/linker"
import "os"


// import "tritium/test"

func relativeDirectory(directoryFromRoot string) (directory string, ok bool) {
  _, file, _, ok := runtime.Caller(0)

  if !ok {
    return
  }

  directory = filepath.Join(file, "../../", directoryFromRoot)

  return
}

var pkg *tp.Package

func initializePackage() {
  packagesPath, ok := relativeDirectory("packages")

  if !ok {
    panic("Can't find root tritium directory to build default package")
  }

  tpkg := legacy.LoadDefaultPackage(&packagesPath)
  println("hi")
  pkg = tpkg.Package
}

func main() {
  println("hello")
  initializePackage()
  println("0")
  // copied from spec.go
  script, _ := linker.RunWithPackage(".", ".", os.Args[1], pkg, make([]string, 0))
  println("1")
  // path := "."

  // copied from test_utils.go (mostly)
  // result := spec.NewResult()
  println("2")
  logger := golog.NewLogger("tritium")
  logger.AddProcessor("info", golog.NewConsoleProcessor(golog.LOG_INFO, true))

  // spec, err := spec.LoadSpec(path, pkg)
  println("3")
  // if err != nil {
  //   result.Error(path, fmt.Sprintf("Error loading test spec:\n%v\n", err.Error()))
  //   return
  // }
  debugger := &dummy.DummyDebugger{}
  println("4")
  eng := whale.NewEngine(debugger)
  println("5")
  d, _ := time.ParseDuration("10m")
  exh := eng.Run(script, nil, "", make(map[string]string, 0), time.Now().Add(d), "test", "test", "test", make([]string, 0), false)

  println(exh.Output)
}