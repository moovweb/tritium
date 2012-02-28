package checker

import(
	tp "athena/proto"
	//log "log4go"
	"tritium/parser"
)

func CheckFile(path string) (*CheckResult) {
	objs := parser.ParseFileSet(path)
	return CheckBeforeLinking(objs)
}

func CheckBeforeLinking(scripts []*tp.ScriptObject) (*CheckResult) {
	result := &CheckResult{
		Warnings: make([]*Warning, 0),
	}
	for _, script := range(scripts) {
		result.CheckForSelectText(script)
		result.CheckForNotMisuse(script)
	}
	return result
}