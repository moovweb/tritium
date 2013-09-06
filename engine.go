package tritium

import (
	"time"
	// tp "tritium/proto"
	"tritium/protoface"
)

type Engine interface {
	Run(transform protoface.Transform, rrules []protoface.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, customer, project, messagePath string, inDebug bool) (output string, exports [][]string, logs []string)
	GetCacheStats() (int, int, int, int)
	Free()
}
