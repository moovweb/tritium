package tritium

import (
	"time"
	tp "tritium/proto"
)

type Engine interface {
	Run(transform *tp.Transform, rrules []*tp.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, messagePath string) (output string, exports [][]string, logs []string)
	Free()
}
