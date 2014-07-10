package logger

//message type
const (
	WsReqInfo = "request_info"
	WsProxyLog = "proxy_log"
	WsProxyError = "proxy_error"
	WsTritiumLog = "tritium_log"
	WsTritiumImport = "tritium_import"
	WsTritiumXPathNoMath = "tritium_xpath_nomatch"
	WsStats = "stats"
	WsReqMod = "request_mod"
	WsRespMod = "response_mod"
	WsSnapshotMsg = "snapshot"
	WsServerError = "server_error"
	WsTritiumError = "tritium_error"
	WsTritiumWarn = "tritium_warning"
	WsMoovX = "moovx"
	WsBrokenHTML = "html_issues"
	WsReplayMsg = "replay"
)

type RequestInfoPayload struct {
	ReqId string
	ReqHost string
	ReqPath string
}

type ProxyLogPayload struct {
	ReqId string
	Data string
}

type TritiumLogPayload ProxyLogPayload

type TritiumImportPayload struct {
	ReqId string
	FileName string
	ImporterName string
	ImporterLineNum int
	Time int
}

type StatsPayload struct {
	ReqId string
	Total int
	Upstream int
	Processing int
}

type HdrLine struct {
	Key string
	Value string
}

type ReqHdrPayload struct {
	ReqId string
	In []*HdrLine
	Out []*HdrLine
}

type RespModPayload struct {
	ReqId string
	In []*HdrLine
	Out []*HdrLine
}

type ProxyErrorPayload struct {
	ReqId string
	Error string
}

type BrokenHTMLPayload ProxyErrorPayload

type TritiumErrorPayload ProxyErrorPayload

type TritiumWarnPayload ProxyErrorPayload

type ReplayInfoPayload ProxyLogPayload

type ServerErrorPayload struct {
	Error string
}

type SnapshotPayload struct {
	ReqId string
	Name string
	Fname string
	LineNum int
	Snapshot string
}

type MoovXLogger interface {
	SendLogMsg(subtype string, msg interface{}) error
	Warn(string) error
}
