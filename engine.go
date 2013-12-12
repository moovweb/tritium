package tritium

import (
	"time"

	"tritium/protoface"
)

type Exhaust struct {
	Output  string
	Exports [][]string
	Logs    []string
}

type Engine interface {
	Run(transform protoface.Transform, rrules []protoface.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, customer, project, messagePath string, inDebug bool) *Exhaust
	GetCacheStats() (int, int, int, int)
	Free()
}
