package checker

import (
	"tritium/parser"
	tp "tritium/proto"
)

func CheckFile(projectPath, scriptPath, fileName string, activeLayers []string) *CheckResult {
	objs := parser.ParseFileSet(projectPath, scriptPath, fileName, false, activeLayers)
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
		result.CheckXpath(script)
	}
	return result
}
