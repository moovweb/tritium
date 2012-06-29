package tritium

import (
	tp "tritium/proto"
	"time"
)

type Engine interface {
	Run(transform *tp.Transform, input interface{}, vars map[string]string, deadline time.Time) (output string, exports [][]string, logs []string)
	Free()
}
