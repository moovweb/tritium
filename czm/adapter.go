package czm


/*
	// C Stuff
	#cgo CFLAGS: -I../../../clibs/include
	#cgo LDFLAGS: -L../../../clibs/lib -lcaesium

	#include <stdlib.h>
	#include <stdint.h>
	#include "engine.h"
*/
import "C"


import (
	"unsafe"
	"time"
	tp "tritium/proto"
	pb "code.google.com/p/goprotobuf/proto"
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

	data, err := pb.Marshal(transform)
	if err != nil {
		panic("Could not marshal transform")
	}
	cin := C.CString(input.(string))
	defer C.free(unsafe.Pointer(cin))

	C.cs_engine_run((*C.uint8_t)(unsafe.Pointer(&data[0])), C.uint32_t(len(data)), cin)

	return
}

func (c *Cengine) GetCacheStats() (int, int, int, int) {
	println("STAT!")
	return 0, 0, 0, 0
}

func (c *Cengine) Free() {
	println("I'm free!")
}


