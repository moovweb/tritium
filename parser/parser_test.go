package parser

import (
	"os"
	. "testing"
)

func TestParseRun(t *T) {
	wd, _ := os.Getwd()
	ParseFile(wd, "scripts", "two.ts", false, make([]string, 0))
}
