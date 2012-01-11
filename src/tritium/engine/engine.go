package engine

import(
	tp "tritium/proto"
	"libxml/xpath"
	"rubex"
)

type Engine struct {
	RegexpCache map[string]*rubex.Regexp
	XPathCache map[string]*xpath.Expression
}

func NewEngine() (*Engine) {
	e := &Engine{
		RegexpCache: make(map[string]*rubex.Regexp),
		XPathCache: make(map[string]*xpath.Expression),
	}
	return e
}

func (eng *Engine) Run(transform *tp.Transform, input string, vars map[string]string) (data string, exports [][]string, logs []string) {
	data = input
	exports = make([][]string, 0)
	logs = make([]string, 0)
	return
}

