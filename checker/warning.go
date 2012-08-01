package checker

import (
	"fmt"
	. "strings"
)

type Warning struct {
	Type       int
	Message    string
	FilePath   string
	LineNumber string
}

const (
	WARNING_SCRIPT = iota
	WARNING_REWRITER
	WARNING_XPATH
)

func NewWarning(warning_type int, filepath string, line_number int, message string) (w *Warning) {
	w = &Warning{
		Type:       warning_type,
		Message:    message,
		FilePath:   filepath,
		LineNumber: fmt.Sprintf("%d", line_number),
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

func (w *Warning) String() (result string) {
	if w.Type == WARNING_SCRIPT {
		result = "Syntax warning in " + w.File() + " line " + w.LineNumber + " – " + w.Message
	} else if w.Type == WARNING_REWRITER {
		result = w.File() + " Rewrite Test #" + w.LineNumber + " Failed: " + w.Message
	} else if w.Type == WARNING_XPATH {
		result = "Xpath error in " + w.File() + " line " + w.LineNumber + " – " + w.Message
	}
	return
}
