package engine

import(
	tp "tritium/proto"
	"libxml/xpath"
	"rubex"
)

type Engine struct {
	RegexpCache map[string]*rubex.Regexp
	XPathCache map[string]*xpath.Expression
	Transform *tp.Executable
}

func NewEngine(transform *tp.Executable) (*Engine) {
	e := &Engine{
		RegexpCache: make(map[string]*rubex.Regexp),
		XPathCache: make(map[string]*xpath.Expression),
		Transform: transform,
	}
	return e
}

func (eng *Engine) Run(input string, vars map[string]string) (data string, exports [][]string, logs []string) {
	data = ""
	exports = make([][]string, 0)
	logs = make([]string, 0)
	return
}

