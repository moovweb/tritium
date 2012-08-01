package tritium

import (
	tp "tritium/proto"
	"time"
)

type Engine interface {
	Run(transform *tp.Transform, rrules []*tp.RewriteRule, input interface{}, vars map[string]string, deadline time.Time) (output string, exports [][]string, logs []string)
	Free()
}
