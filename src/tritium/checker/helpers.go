package checker

import(
	tp "athena/src/athena/proto"
)

type CheckResult struct {
	Warnings []*Warning
}

func (r *CheckResult)AddWarning(obj *tp.ScriptObject, ins *tp.Instruction, message string) {
	r.Warnings = append(r.Warnings, NewWarning(obj, ins, message))
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
