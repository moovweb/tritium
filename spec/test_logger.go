package spec

import l4g "log4go"

type TestLogWriter struct {
	Logs []*l4g.LogRecord
}

func NewTestLogWriter() *TestLogWriter {
	return &TestLogWriter{
		Logs: make([]*l4g.LogRecord, 0),
	}
}

func (w *TestLogWriter) LogWrite(rec *l4g.LogRecord) {
	w.Logs = append(w.Logs, rec)
}

func (w *TestLogWriter) Close() {
}
