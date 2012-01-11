package shark

import(
	tp "tritium/proto"
	"libxml/xpath"
	"rubex"
)

type Shark struct {
	RegexpCache map[string]*rubex.Regexp
	XPathCache map[string]*xpath.Expression
}

func NewEngine() (*Shark) {
	e := &Shark{
		RegexpCache: make(map[string]*rubex.Regexp),
		XPathCache: make(map[string]*xpath.Expression),
	}
	return e
}

func (eng *Shark) Run(transform *tp.Transform, input string, vars map[string]string) (data string, exports [][]string, logs []string) {
	data = input
	exports = make([][]string, 0)
	logs = make([]string, 0)
	return
}

