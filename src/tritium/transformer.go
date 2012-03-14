package tritium

import (
	tp "athena/src/athena/proto"
)

type Engine interface {
	Run(transform *tp.Transform, input interface{}, vars map[string]string) (output []byte, exports [][]string, logs []string)
}
