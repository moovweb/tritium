package checker

import (
	tp "tritium/proto"
	"tritium/parser"
)

func CheckFile(path string) *CheckResult {
	objs := parser.ParseFileSet(path)
	return CheckBeforeLinking(objs)
}

func CheckBeforeLinking(scripts []*tp.ScriptObject) *CheckResult {
	result := &CheckResult{
		Warnings: make([]*Warning, 0),
	}
	for _, script := range scripts {
		print(".")
		result.CheckForSelectText(script)
		result.CheckForNotMisuse(script)
		result.CheckForLocationExport(script)
	}
	return result
}
