package tritium

import (
	tp "tritium/proto"
)

type Engine interface {
	Run(transform *tp.Transform, input interface{}, vars map[string]string) (output string, exports [][]string, logs []string)
	Free()
}
