package checker

import (
	tp "tritium/proto"
	"golog"
)

type CheckResult struct {
	Warnings []*Warning
	Logger   *golog.Logger
}

func (r *CheckResult) AddWarning(obj *tp.ScriptObject, ins *tp.Instruction, message string) {
	warning := NewWarning(obj, ins, message)
	if r.Logger != nil {
		r.Logger.Warning(warning.String())
	}
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
