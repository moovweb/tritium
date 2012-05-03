package checker

import(
	tp "athena"
	. "log4go"
	"tritium/parser"
)

func CheckFile(path string, logger Logger) (*CheckResult) {
	objs := parser.ParseFileSet(path)
	return CheckBeforeLinking(objs, logger)
}

func CheckBeforeLinking(scripts []*tp.ScriptObject, logger Logger) (*CheckResult) {
	result := &CheckResult{
		Warnings: make([]*Warning, 0),
		Logger: logger,
	}
	for _, script := range(scripts) {
		result.CheckForSelectText(script)
		result.CheckForNotMisuse(script)
	}
	return result
}
