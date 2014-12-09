package checker

import (
	"tritium/dependencies/butler/null"
	tp "tritium/proto"
)

type CheckResult struct {
	Warnings []*Warning
}

func (r *CheckResult) AddScriptWarning(obj *tp.ScriptObject, ins *tp.Instruction, message string) {
	warning := NewWarning(WARNING_SCRIPT, null.GetString(obj.Name), int(null.GetInt32(ins.LineNumber)), message)
	print("F")
	r.Warnings = append(r.Warnings, warning)
}

func (r *CheckResult) AddXpathWarning(obj *tp.ScriptObject, ins *tp.Instruction, message string) {
	warning := NewWarning(WARNING_XPATH, null.GetString(obj.Name), int(null.GetInt32(ins.LineNumber)), message)
	print("F")
	r.Warnings = append(r.Warnings, warning)
}

func (r *CheckResult) AddRewriterWarning(rrtype string, position int, message string) {
	warning := NewWarning(WARNING_REWRITER, rrtype, position, message)
	print("F")
	r.Warnings = append(r.Warnings, warning)
}

func iterate(script *tp.ScriptObject, itFunc func(*tp.Instruction)) {
	iterateIns(script.Root, itFunc)
}

func iterateIns(ins *tp.Instruction, itFunc func(*tp.Instruction)) {
	itFunc(ins)
	if ins.Arguments != nil {
		for _, child := range ins.Arguments {
			iterateIns(child, itFunc)
		}
	}
	if ins.Children != nil {
		for _, child := range ins.Children {
			iterateIns(child, itFunc)
		}
	}
}
