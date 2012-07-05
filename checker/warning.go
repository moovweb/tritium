package checker

import (
	"butler/null"
	"fmt"
	. "strings"
	tp "tritium/proto"
)

type Warning struct {
	Message    string
	FilePath   string
	LineNumber string
}

func NewWarning(obj *tp.ScriptObject, ins *tp.Instruction, message string) (w *Warning) {
	w = &Warning{
		Message:    message,
		FilePath:   null.GetString(obj.Name),
		LineNumber: fmt.Sprintf("%d", null.GetInt32(ins.LineNumber)),
	}
	return
}

func (w *Warning) File() string {
	parts := Split(w.FilePath, "/")
	if len(parts) > 2 {
		return parts[len(parts)-2] + "/" + parts[len(parts)-1]
	}
	return w.FilePath
}

func (w *Warning) String() string {
	return w.File() + ":" + w.LineNumber + "– " + w.Message
}
