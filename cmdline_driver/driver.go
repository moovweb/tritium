package main

import "path/filepath"
import "tritium/whale"
import "runtime"
// import "fmt"
import tp "tritium/proto"
import "tritium/packager/legacy"
import "golog"
import "time"
import "steno/dummy"
import "tritium/linker"
import "os"
import "io/ioutil"

func readFile(filename string) string {
  f, err := ioutil.ReadFile(filename)
  if err!= nil {
    panic(err)
  }
  return string(f)
}

func writeFile(input string) {
  byteinput := []byte(input)
  err := ioutil.WriteFile("output.html", byteinput, 0755)
  if err!= nil {
    panic(err)
  }
}

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
  pkg = tpkg.Package
}

func main() {
  initializePackage()
  // copied from spec.go
  script, _ := linker.RunWithPackage(".", ".", os.Args[1], pkg, make([]string, 0))

  logger := golog.NewLogger("tritium")
  logger.AddProcessor("info", golog.NewConsoleProcessor(golog.LOG_INFO, true))

  input := readFile(os.Args[2])

  debugger := &dummy.DummyDebugger{}
  eng := whale.NewEngine(debugger)
  d, _ := time.ParseDuration("10m")
  exh := eng.Run(script, nil, input, make(map[string]string, 0), time.Now().Add(d), "test", "test", "test", make([]string, 0), false)
  println(exh.Output)
  writeFile(exh.Output)
}