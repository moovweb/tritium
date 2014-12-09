package icu4go

// #cgo CFLAGS: -I../../clibs/include
// #cgo LDFLAGS: -L../../clibs/lib
// #cgo linux LDFLAGS: -licui18n
// #cgo darwin LDFLAGS: -licui18n
// #cgo windows LDFLAGS: -licuin
// #include "helper.h"
import "C"
import (
	"errors"
	"unsafe"
)

type CharsetDetector struct {
	Ptr *C.UCharsetDetector
}

const EmptyEncoding = ""
const U_ZERO_ERROR = int32(0)

var ERR_CREATE_DETECTPR = errors.New("cannot create charset detector")

func NewCharsetDetector() (detector *CharsetDetector, err error) {
	detector = &CharsetDetector{}
	var status int32
	statusPtr := unsafe.Pointer(&status)
	detector.Ptr = C.ucsdet_open((*C.UErrorCode)(statusPtr))
	if status != U_ZERO_ERROR || detector.Ptr == nil {
		err = ERR_CREATE_DETECTPR
	}
	return
}

func (detector *CharsetDetector) GuessCharset(input []byte) (bestGuess string) {
	inputLen := len(input)
	if inputLen == 0 {
		return EmptyEncoding
	}
	inputPtr := unsafe.Pointer(&input[0])
	var status int32
	statusPtr := unsafe.Pointer(&status)
	detectorPtr := unsafe.Pointer(detector.Ptr)

	bestGuessPtr := C.detectCharset(detectorPtr, inputPtr, C.int(inputLen), (*C.int)(statusPtr))
	if status == U_ZERO_ERROR {
		bestGuess = C.GoString(bestGuessPtr)
	}
	return
}

func (detector *CharsetDetector) Free() {
	if detector.Ptr != nil {
		C.ucsdet_close(detector.Ptr)
	}
}
