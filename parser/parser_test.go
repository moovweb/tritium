package parser

import (
	. "testing"
  "os"
)

func TestParseRun(t *T) {
  wd, _ := os.Getwd()
	ParseFile(wd, "scripts", "two.ts", false, make([]string, 0))
}
