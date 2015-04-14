package tritium

import (
	"time"

	"github.com/moovweb/tritium/protoface"
)

type Exhaust struct {
	Output     string
	Exports    [][]string
	Logs       []string
	HtmlParsed bool
}

type Engine interface {
	Run(transform protoface.Transform, rrules []protoface.RewriteRule, input interface{}, vars, constants map[string]string, deadline time.Time, customer, project, messagePath string, activeLayers []string, inDebug bool) *Exhaust
	GetCacheStats() (int, int)
	Free()
}
