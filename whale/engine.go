package whale

import "time"

import (
	"gokogiri/xpath"
	"golog"
	"rubex"
	tp "tritium/proto"
	"steno"
)

type Position int

const (
	TOP = iota
	BOTTOM
	BEFORE
	AFTER
)

var Positions = map[string]Position{
	"top":    TOP,
	"bottom": BOTTOM,
	"before": BEFORE,
	"after":  AFTER,
	"above":  BEFORE,
	"below":  AFTER,
}

type YieldBlock struct {
	Ins  *tp.Instruction
	Vars map[string]interface{}
}

type Function struct {
	Name string
	*tp.Function
}

type Scope struct {
	Value interface{}
	Index int
}

type EngineContext interface {
	RunInstruction(scope *Scope, ins *tp.Instruction) (returnValue interface{})
	ShouldContinue() bool
	MatchTarget() string
	PushYieldBlock(*YieldBlock)
	PopYieldBlock() *YieldBlock
	HasYieldBlock() bool
	TopYieldBlock() *YieldBlock

	FileAndLine(*tp.Instruction) string
	UsePackage(*tp.Package)
	Logger() *golog.Logger
	Debugger() steno.Debugger
	GetMessagePath() string

	PushMatchStack(string)
	PopMatchStack() string
	PushShouldContinueStack(bool)
	PopShouldContinueStack() bool
	SetShouldContinue(bool)
	GetRegexp(string, string) *rubex.Regexp
	GetXpathExpr(string) *xpath.Expression
	AddExport([]string)
	AddLog(string) int
	SetEnv(string, string)
	GetEnv(string) string

	SetVar(string, interface{})
	GetVar(string) interface{}
	GetInnerReplacer() *rubex.Regexp
	GetHeaderContentTypeRegex() *rubex.Regexp
	//	GetOutputBuffer() []byte
	GetRewriteRules() []*tp.RewriteRule
	GetDeadline() *time.Time
	AddMemoryObject(MemoryObject)
}
