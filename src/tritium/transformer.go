package tritium

import(
	tp "tritium/proto"
)

type Transformer interface {
	Run(transform *tp.Executable, input string, vars map[string]string) (data string, exports [][]string, logs []string)
}