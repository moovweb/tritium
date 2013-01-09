package parser

import (
	. "testing"
  "os"
  "path/filepath"
)

func TestParseRun(t *T) {
  wd, _ := os.Getwd()
	ParseFile(filepath.Join(wd, "scripts", "two.ts"))
}
