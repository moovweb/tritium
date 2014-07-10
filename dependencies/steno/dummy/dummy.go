package dummy

import "tritium/dependencies/steno"
import "net/http"
import mhclient "tritium/dependencies/mirrorhttp/client"
import "tritium/dependencies/golog"
import tp "tritium/proto"
import "tritium/protoface"

type DummyDebugger struct {
	isProd bool
}

func NewDummyDebugger(prodFlag bool) *DummyDebugger {
	dd := &DummyDebugger{}
	dd.isProd = prodFlag
	return dd
}

func (d *DummyDebugger) GetNewMessagePath(_ map[string]string) string {
	return ""
}

func (d *DummyDebugger) LogIncomingRequest(messagePath string, request *http.Request, rawRequest []byte) {
}

func (d *DummyDebugger) LogOutgoingRequest(ctx map[string]string, customer, project, messagePath string, uHttpRequest *mhclient.UpstreamHttpRequest, env map[string]string) {
}
func (d *DummyDebugger) LogIncomingResponse(ctx map[string]string, customer, project, messagePath string, uHttpRequest *mhclient.UpstreamHttpRequest, uHttpResponse *mhclient.UpstreamHttpResponse) {
}

func (d *DummyDebugger) LogEnvironment(messagePath string, stage string, env map[string]string) {
}

func (d *DummyDebugger) LogOutgoingResponse(ctx map[string]string, customer, project, messagePath string, uHttpRequest *mhclient.UpstreamHttpRequest, uHttpResponse *mhclient.UpstreamHttpResponse, env map[string]string) {
}
func (d *DummyDebugger) LogStatusCheck(request *http.Request) {
}

func (d *DummyDebugger) LogStats(messagePath string, when steno.HandleStep, p string, uHttpRequest *mhclient.UpstreamHttpRequest, uHttpResponse *mhclient.UpstreamHttpResponse, env, ctx map[string]string, tstats *steno.TimeStats) {
}

func (d *DummyDebugger) LogRewriterLogs(ctx map[string]string, customer, project, messagePath string, logs []string) {
}

func (d *DummyDebugger) LogError(customer, project string, when steno.HandleStep, messagePath string, uHttpRequest *mhclient.UpstreamHttpRequest, uHttpResponse *mhclient.UpstreamHttpResponse, env map[string]string, err error) {
}

func (d *DummyDebugger) LogInfoMessage(messagePath, format string, args ...interface{}) {
}

func (d *DummyDebugger) LogErrorMessage(messagePath, format string, args ...interface{}) {
}

func (d *DummyDebugger) BrokenHTMLMessage(messagePath, format string, args ...interface{}) {
}

func (d *DummyDebugger) LogTritiumErrorMessage(customer, project string, env map[string]string, messagePath, msg string) {
}

func (d *DummyDebugger) LogTritiumWarnMessage(customer, project string, env map[string]string, messagePath, msg string) {
}

func (d *DummyDebugger) LogReplayInfoMessage(messagePath, format string, args ...interface{}) {
}

func (d *DummyDebugger) LogSnapshot(messagePath, name, fname string, lineNum int, obj interface{}) {
}

func (d *DummyDebugger) SetPriority(name string, p golog.Priority) {
}

func (d *DummyDebugger) SetLogger(logger *golog.Logger) {
}

func (d *DummyDebugger) GetDebugDir() string {
	return ""
}
func (d *DummyDebugger) GetProjectDir() string {
	return ""
}

func (d *DummyDebugger) TrapInstruction(string, string, map[string]string, protoface.Instruction, interface{}, int, interface{}) {
}
func (d *DummyDebugger) IsInDebug() bool                           { return false }
func (d *DummyDebugger) SetReplay(bool)                            {}
func (d *DummyDebugger) IsProd() bool                              { return d.isProd }
func (d *DummyDebugger) IsInReplay() bool                          { return false }
func (d *DummyDebugger) LogDone(string)                            {}
func (d *DummyDebugger) SlugChanged(*tp.Slug, int)                 {}
func (d *DummyDebugger) LogImport(string, string, string, int)     {}
func (d *DummyDebugger) LogImportDone(string, string, string, int) {}

func (d *DummyDebugger) GetRequestId(string) string  { return "" }
func (d *DummyDebugger) SetRequestId(string, string) {}
func (d *DummyDebugger) DeleteRequestId(string)      {}
func (d *DummyDebugger) SendWarning(string)          {}
