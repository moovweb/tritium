package checker

import(
	tp "athena/src/athena/proto"
	. "log4go"
)

type CheckResult struct {
	Warnings []*Warning
	Logger Logger
}

func (r *CheckResult)AddWarning(obj *tp.ScriptObject, ins *tp.Instruction, message string) {
	warning := NewWarning(obj, ins, message)
	if r.Logger != nil {
		r.Logger.Warn(warning.String())
	}
	r.Warnings = append(r.Warnings, warning)
}

func iterate(script *tp.ScriptObject, itFunc func(*tp.Instruction)) {
	iterateIns(script.Root, itFunc)
}

func iterateIns(ins *tp.Instruction, itFunc func(*tp.Instruction)) {
	itFunc(ins)
	if ins.Arguments != nil {
		for _, child := range(ins.Arguments) {
			iterateIns(child, itFunc)
		}
	}
	if ins.Children != nil {
		for _, child := range(ins.Children) {
			iterateIns(child, itFunc)
		}
	}
}
