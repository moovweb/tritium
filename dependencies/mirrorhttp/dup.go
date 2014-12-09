// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/*
 * Copyright 2011 Moovweb Corp (zhigang.chen@moovweb.com). All rights reserved.
 */

//mirrorhttp keeps a copy of the raw bytes a http server/client reads off the network

package mirrorhttp

import (
	"bufio"
	"bytes"
	"io"
)

type DupReader struct {
	io.Reader
	*bytes.Buffer
}

const InitialBufferLength = 16 * 1024 //16KB

func (r *DupReader) Enable() {
	if r.Buffer == nil {
		buffer := make([]byte, 0, InitialBufferLength)
		r.Buffer = bytes.NewBuffer(buffer)
	}
}

func (r *DupReader) Disable() {
	r.Buffer = nil
}

func (r *DupReader) Read(data []byte) (n int, err error) {
	n, err = r.Reader.Read(data) //calling the underlying socket's Read
	if err == nil && n > 0 && r.Buffer != nil {
		wn, werr := r.Buffer.Write(data[:n])
		if werr != nil {
			r.Buffer.Reset()
		}
		if wn != n {
			r.Buffer.Reset()
		}
	}
	return n, err
}

func (r *DupReader) Reset() {
	if r.Buffer != nil {
		r.Buffer.Reset()
	}
}

func (r *DupReader) Bytes() []byte {
	if r.Buffer != nil {
		return r.Buffer.Bytes()
	}
	return nil
}

func Write(bw *bufio.Writer, data []byte) (n int, err error) {
	n, err = bw.Write(data)
	if err != nil {
		return
	}
	err = bw.Flush()
	return
}

func WriteString(bw *bufio.Writer, data string) (n int, err error) {
	b := []byte(data)
	return Write(bw, b)
}
