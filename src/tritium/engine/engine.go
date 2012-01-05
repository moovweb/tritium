package engine

import(
	tp "tritium/proto"
)

type Engine struct {
	name string
}

func (eng *Engine) Run(transform *tp.Executable, input string, vars map[string]string) (data string, exports [][]string, logs []string) {
	input = data
	exports = make([][]string, 0)
	logs = make([]string, 0)
	return
}

