package debugger

type MoovXDebugger interface {
	IsInDebug() bool
	Trap(*StopPoint)
	Continue()
	Next() *Breakpoint
	End(string)

	IsInReplay() bool
	SetReplay(bool)
	GetRequestId(string) string
	SetRequestId(string, string)
	DeleteRequestId(string)
}

type StopPoint struct {
	MessagePath string
	Filename string
	Linenum  int
	Env map[string]string
	ScopeValue interface{}
	Doc interface{}
	ScopeIndex int
	Snapshot *Snapshot
	Signal chan bool
}

type Snapshot struct {
	CurrentScope string
	CurrentDoc string
}

func NewStopPoint(messagePath, filename string, linenum int, env map[string]string, scopeValue interface{}, scopeIndex int, doc interface{}) *StopPoint {
	sp := &StopPoint{
		MessagePath: messagePath,
		Filename: filename,
		Linenum: linenum,
		Env: env,
		ScopeValue: scopeValue,
		ScopeIndex: scopeIndex,
		Doc: doc,
	}
	return sp
}
