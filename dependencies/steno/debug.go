package steno

import (
	"net/http"
	"time"

	"tritium/dependencies/golog"
	mhclient "tritium/dependencies/mirrorhttp/client"
	tp "tritium/proto"
	"tritium/protoface"
)

type TimeStats struct {
	Customer       string  `json:"customer"`
	Project        string  `json:"project"`
	EndpointId     string  `json:"endpoint_id"`
	SiteId         string  `json:"site_id"`
	Total          float32 `json:"total_time_mean"`
	Processing     float32 `json:"body_processing_time_mean"`
	HtmlProcessing float32 `json:"html_body_processing_time_mean"`
	ProcessingRest float32 `json:"other_processing_time_mean"`
	Upstream       float32 `json:"upstream_request_time_mean"`
	Req            float32 `json:"req_time_mean"`
	FindProject    float32 `json:"find_project"`
	RespPre        float32 `json:"resp_pre_time_mean"`
	RespPost       float32 `json:"resp_post_time_mean"`
	ReqQueueWait   float32 `json:"req_queue_waiting"`
	ResQueueWait   float32 `json:"resp_queue_waiting"`
	//the next two look awkward, should be moved somewhere else in refactor
	ReqQueueLen int `json:"req_queue_len"`
	ResQueueLen int `json:"resp_queue_len"`
}

type HandleStep int

const MessagePathCtxKey = "MessagePath"

const (
	StepFindProject HandleStep = iota
	StepRewriteRequest
	StepIssueUpstreamRequest
	StepRewriteHeaderPre
	StepRewriteBody
	StepRewriteHeaderPost
	StepDone
)

var StepStrings = []string{
	"findProject",
	"xRequest",
	"issueRequest",
	"xResponsePre",
	"xBody",
	"xResponsePost",
}

func (step HandleStep) String() string {
	if step >= StepRewriteRequest && step <= StepRewriteHeaderPost {
		return StepStrings[step]
	}
	return "unknown"
}

type Debugger interface {
	GetNewMessagePath(ctx map[string]string) string
	GetDebugDir() string
	GetProjectDir() string
	LogIncomingRequest(string, *http.Request, []byte)
	LogOutgoingRequest(map[string]string, string, string, string, *mhclient.UpstreamHttpRequest, map[string]string)
	LogIncomingResponse(map[string]string, string, string, string, *mhclient.UpstreamHttpRequest, *mhclient.UpstreamHttpResponse)

	LogEnvironment(string, string, map[string]string)

	LogOutgoingResponse(map[string]string, string, string, string, *mhclient.UpstreamHttpRequest, *mhclient.UpstreamHttpResponse, map[string]string)
	LogStats(string, HandleStep, string, *mhclient.UpstreamHttpRequest, *mhclient.UpstreamHttpResponse, map[string]string, map[string]string, *TimeStats)
	LogRewriterLogs(map[string]string, string, string, string, []string)
	LogStatusCheck(*http.Request)
	LogError(string, string, HandleStep, string, *mhclient.UpstreamHttpRequest, *mhclient.UpstreamHttpResponse, map[string]string, error)
	LogInfoMessage(string, string, ...interface{})
	LogErrorMessage(string, string, ...interface{})
	BrokenHTMLMessage(string, string, ...interface{})
	LogTritiumErrorMessage(string, string, map[string]string, string, string)
	LogTritiumWarnMessage(string, string, map[string]string, string, string)
	LogReplayInfoMessage(string, string, ...interface{})
	LogImport(string, string, string, int)
	LogImportDone(string, string, string, int)
	LogDone(string)
	SetPriority(string, golog.Priority)

	SendWarning(string)

	TrapInstruction(string, string, map[string]string, protoface.Instruction, interface{}, int, interface{})
	IsInDebug() bool
	IsProd() bool

	IsInReplay() bool
	SetReplay(bool)

	SlugChanged(*tp.Slug, int)

	GetRequestId(string) string
	SetRequestId(string, string)
	DeleteRequestId(string)
}

type StepStats struct {
	step          HandleStep
	stepStart     time.Time
	IsHtmlRequest bool // is this an html request that we would transform?

	Project  time.Duration
	Request  time.Duration
	Upstream time.Duration
	RespPre  time.Duration
	Body     time.Duration
	RespPost time.Duration
}

func (ss *StepStats) SetStep(step HandleStep, stepStart time.Time) {
	ss.step = step
	ss.stepStart = stepStart
}

func (ss *StepStats) GetStep() HandleStep {
	return ss.step
}

func (ss *StepStats) Update() {
	switch ss.step {
	case StepFindProject:
		ss.Project = time.Since(ss.stepStart)
	case StepRewriteRequest:
		ss.Request = time.Since(ss.stepStart)
	case StepIssueUpstreamRequest:
		ss.Upstream = time.Since(ss.stepStart)
	case StepRewriteHeaderPre:
		ss.RespPre = time.Since(ss.stepStart)
	case StepRewriteBody:
		ss.Body = time.Since(ss.stepStart)
	case StepRewriteHeaderPost:
		ss.RespPost = time.Since(ss.stepStart)
	case StepDone:
		// Nothing to do here.
	}
}

func NewTimeStats(customer, project, siteid, endpointid string, ss *StepStats, reqStart time.Time, reqQueueWait time.Duration, resQueueWait time.Duration, reqQueueLen, resQueueLen int) *TimeStats {
	tstats := &TimeStats{}
	tstats.Customer = customer
	tstats.Project = project
	tstats.SiteId = siteid
	tstats.EndpointId = endpointid
	tstats.FindProject = float32(float64(ss.Project.Nanoseconds()) / 1000000000.0)
	tstats.Req = float32(float64(ss.Request.Nanoseconds()) / 1000000000.0)
	tstats.Upstream = float32(float64(ss.Upstream.Nanoseconds()) / 1000000000.0)
	tstats.RespPre = float32(float64(ss.RespPre.Nanoseconds()) / 1000000000.0)
	tstats.Processing = float32(float64(ss.Body.Nanoseconds()) / 1000000000.0)
	if ss.IsHtmlRequest {
		tstats.HtmlProcessing = tstats.Processing
	}
	tstats.RespPost = float32(float64(ss.RespPost.Nanoseconds()) / 1000000000.0)

	procRest := time.Since(reqStart) - ss.Body - ss.Upstream - ss.Project
	tstats.ProcessingRest = float32(float64(procRest.Nanoseconds()) / 1000000000.0)

	procTotal := ss.Request + ss.Upstream + ss.RespPre + ss.Body + ss.RespPost
	tstats.Total = float32(float64(procTotal.Nanoseconds()) / 1000000000.0)

	tstats.ReqQueueWait = float32(float64(reqQueueWait.Nanoseconds()) / 1000000000.0)
	tstats.ResQueueWait = float32(float64(resQueueWait.Nanoseconds()) / 1000000000.0)
	tstats.ReqQueueLen = reqQueueLen
	tstats.ResQueueLen = resQueueLen
	return tstats
}
