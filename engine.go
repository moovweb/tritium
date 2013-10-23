package tritium

import (
	"time"

	"tritium/protoface"
)

type Engine interface {
	Run(transform protoface.Transform, rrules []protoface.RewriteRule, stringTable []string, input interface{}, vars map[string]string, deadline time.Time, customer, project, messagePath string, inDebug bool) (output string, exports [][]string, logs []string)
	GetCacheStats() (int, int, int, int)
	Free()
}
