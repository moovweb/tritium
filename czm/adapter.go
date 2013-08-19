package czm

import (
	"time"
	tp "tritium/proto"
)

type Cengine struct {

}

func (c *Cengine) Run(transform *tp.Transform, rrules []*tp.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, customer, project, messagePath string, inDebug bool) (output string, exports [][]string, logs []string) {
	
	output = input.(string)
	exports = make([][]string, len(vars))
	logs = make([]string, 0)
	i := 0
	for k,v := range vars {
		exports[i] = make([]string, 2)
		exports[i][0] = k
		exports[i][1] = v
		i++
	}
	return
}

func (c *Cengine) GetCacheStats() (int, int, int, int) {
	println("STAT!")
	return 0, 0, 0, 0
}

func (c *Cengine) Free() {
	println("I'm free!")
}


