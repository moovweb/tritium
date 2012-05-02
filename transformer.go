package tritium

import (
	tp "athena"
)

type Engine interface {
	Run(transform *tp.Transform, input interface{}, vars map[string]string) (output string, exports [][]string, logs []string)
	Free()
}
