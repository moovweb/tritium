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
	"time"
	"unsafe"

	"butler/arrays"
	pb "code.google.com/p/goprotobuf/proto"
	tp "tritium/proto"
)

type Cengine struct{}

func carray2gorray(carray **C.char, clen int) []string {
	results := make([]string, 0, clen)
	iter := uintptr(unsafe.Pointer(carray))
	for i := 0; i < clen; i++ {
		celem := (**C.char)(unsafe.Pointer(iter))
		golem := C.GoString(*celem)
		iter += unsafe.Sizeof(iter)

		results = append(results, golem)
	}

	return results
}

func (c *Cengine) Run(transform *tp.Transform, rrules []*tp.RewriteRule, input interface{}, vars map[string]string,
	deadline time.Time, customer, project, messagePath string, inDebug bool) (output string, exports [][]string, logs []string) {

	// For now, we have to marshall this to a byte array so that c-land can unmarshall it into its own structure.
	data, err := pb.Marshal(transform)
	if err != nil {
		panic("Could not marshal transform")
	}

	cin := C.CString(input.(string))
	defer C.free(unsafe.Pointer(cin))

	// Run the engine!
	result := C.cs_engine_run((*C.uint8_t)(unsafe.Pointer(&data[0])), C.uint32_t(len(data)), cin)
	if result == nil {
		panic("Unknown internal engine error")
	}
	defer C.cs_result_destroy(result)

	// out beautiful outputs
	raw_exports := carray2gorray(result.exports, int(result.exports_len))
	exports = arrays.Group(raw_exports, 2) // Because the exports are key/value pairs
	logs = carray2gorray(result.logs, int(result.logs_len))
	output = C.GoString(result.output)

	return
}

func (c *Cengine) GetCacheStats() (int, int, int, int) {
	println("Cache Stats Unsupported in Caesium")
	return 0, 0, 0, 0
}

func (c *Cengine) Free() {
	// Nothing to free here! So fresh and so clean clean!
}
