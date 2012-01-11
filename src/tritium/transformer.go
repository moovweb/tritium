package tritium

import(
	tp "tritium/proto"
)

type Engine interface {
	Run(transform *tp.Transform, input string, vars map[string]string) (data string, exports [][]string, logs []string)
}