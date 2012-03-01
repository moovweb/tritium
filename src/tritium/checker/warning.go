package checker

import(
	tp "athena/src/athena/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
	"fmt"
	. "strings"
)

type Warning struct {
	Message string
	FilePath string
	LineNumber string
}

func NewWarning(obj *tp.ScriptObject, ins *tp.Instruction, message string) (w *Warning) {
	w = &Warning{
		Message: message,
		FilePath: proto.GetString(obj.Name),
		LineNumber: fmt.Sprintf("%d", proto.GetInt32(ins.LineNumber)),
	}
	return
}

func (w *Warning) File() string {
	parts := Split(w.FilePath, "/")
	if len(parts) > 2 {
		return parts[len(parts) - 2] + "/" + parts[len(parts) - 1]
	}
	return w.FilePath
}

func (w *Warning) String() string {
	return w.File() + ":" + w.LineNumber + "– " + w.Message
}
