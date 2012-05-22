package checker

import (
	tp "athena"
	"golog"
	"tritium/parser"
)

func CheckFile(path string, logger *golog.Logger) *CheckResult {
	objs := parser.ParseFileSet(path)
	return CheckBeforeLinking(objs, logger)
}

func CheckBeforeLinking(scripts []*tp.ScriptObject, logger *golog.Logger) *CheckResult {
	result := &CheckResult{
		Warnings: make([]*Warning, 0),
		Logger:   logger,
	}
	for _, script := range scripts {
		result.CheckForSelectText(script)
		result.CheckForNotMisuse(script)
	}
	return result
}
