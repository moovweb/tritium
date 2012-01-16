package spec

import l4g "log4go"

type TestLogWriter struct {
	Logs []*l4g.LogRecord
}

func NewLogWriter() (*TestLogWriter) {
	return &TestLogWriter{}
}

func (w *TestLogWriter) LogWrite(rec *l4g.LogRecord) {
	
}

func (w *TestLogWriter) Close() {
	//close(w.rec)
}