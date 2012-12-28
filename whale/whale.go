package whale

import (
	"fmt"
	"strings"
	"time"
	"strconv"
)

import (
	"butler/null"
	"gokogiri/xpath"
	"golog"
	"rubex"
	tp "tritium/proto"
	mhclient "mirrorhttp/client"
	"steno"
)

type Whale struct {
	//RegexpCache       map[string]*rubex.Regexp
	//XPathCache        map[string]*xpath.Expression
	Log *golog.Logger
	//OutputBuffer      []byte
	//InnerReplacer     *rubex.Regexp
	//HeaderContentType *rubex.Regexp
	Debugger steno.Debugger
}

type EngineContext struct {
	Functions                []*Function
	Types                    []string
	Exports                  [][]string
	Logs                     []string
	ImportedFiles            []string
	Env                      map[string]string
	MatchStack               []string
	MatchShouldContinueStack []bool
	Yields                   []*YieldBlock
	*Whale
	*tp.Transform
	Rrules []*tp.RewriteRule

	// Debug info
	Filename          string
	HadError          bool
	RegexpCache       map[string]*rubex.Regexp
	XPathCache        map[string]*xpath.Expression
	InnerReplacer     *rubex.Regexp
	HeaderContentType *rubex.Regexp

	Deadline time.Time
	Mobjects []MemoryObject
	MessagePath string
}

const OutputBufferSize = 500 * 1024 //500KB
const defaultMobjects = 4
const TimeoutError = "EngineTimeout"

func NewEngine(logger *golog.Logger, debugger steno.Debugger) *Whale {
	e := &Whale{
		//RegexpCache:       make(map[string]*rubex.Regexp),
		//XPathCache:        make(map[string]*xpath.Expression),
		Log: logger,
		Debugger: debugger,
		//OutputBuffer:      make([]byte, OutputBufferSize),
		//InnerReplacer:     rubex.MustCompile(`[\\$](\d)`),
		//HeaderContentType: rubex.MustCompileWithOption(`<meta\s+http-equiv="content-type"\s+content="(.*?)"`, rubex.ONIG_OPTION_IGNORECASE),
	}
	return e
}

func NewEngineCtx(eng *Whale, vars map[string]string, transform *tp.Transform, rrules []*tp.RewriteRule, deadline time.Time, messagePath string) (ctx *EngineContext) {
	ctx = &EngineContext{
		Whale:                    eng,
		Exports:                  make([][]string, 0),
		Logs:                     make([]string, 0),
		Env:                      vars,
		Transform:                transform,
		Rrules:                   rrules,
		MatchStack:               make([]string, 0),
		MatchShouldContinueStack: make([]bool, 0),
		Yields:                   make([]*YieldBlock, 0),
		HadError:                 false,
		RegexpCache:              make(map[string]*rubex.Regexp),
		XPathCache:               make(map[string]*xpath.Expression),
		InnerReplacer:            rubex.MustCompile(`[\\$](\d)`),
		HeaderContentType:        rubex.MustCompileWithOption(`<meta\s+http-equiv="content-type"\s+content="(.*?)"`, rubex.ONIG_OPTION_IGNORECASE),
		Deadline:                 deadline,
		Mobjects:                 make([]MemoryObject, 0, defaultMobjects),
		MessagePath:              messagePath,
	}
	ctx.AddMemoryObject(ctx.InnerReplacer)
	ctx.AddMemoryObject(ctx.HeaderContentType)
	return
}

func (eng *Whale) Free() {
	/*
		if eng.InnerReplacer != nil {
			eng.InnerReplacer.Free()
			eng.InnerReplacer = nil
		}
		if eng.HeaderContentType != nil {
			eng.HeaderContentType.Free()
			eng.HeaderContentType = nil
		}
		if eng.RegexpCache != nil {
			for _, reg := range eng.RegexpCache {
				reg.Free()
			}
			eng.RegexpCache = nil
		}
		if eng.XPathCache != nil {
			for _, xpath := range eng.XPathCache {
				xpath.Free()
			}
			eng.XPathCache = nil
		}
	*/
}

func (eng *Whale) Run(transform *tp.Transform, rrules []*tp.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, messagePath string) (output string, exports [][]string, logs []string) {
	ctx := NewEngineCtx(eng, vars, transform, rrules, deadline, messagePath)
	defer ctx.Free()
	ctx.Yields = append(ctx.Yields, &YieldBlock{Vars: make(map[string]interface{})})
	ctx.UsePackage(transform.Pkg)
	scope := &Scope{Value: input.(string)}
	obj := transform.Objects[0]
	ctx.Filename = null.GetString(obj.Name)
	ctx.RunInstruction(scope, obj.Root)
	output = scope.Value.(string)
	exports = ctx.Exports
	logs = ctx.Logs
	return
}

func (eng *Whale) TransformRequest(transforms []*tp.Transform, rrules []*tp.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, messagePath string) (output string, exports [][]string, logs []string) {
	uHttpRequest := input.(*mhclient.UpstreamHttpRequest)
	newRequestHeader, export, logs := eng.Run(transforms[0], rrules, string(uHttpRequest.RawHeader), vars, deadline, messagePath)
	UpdateEnv(vars, export)
	uHttpRequest.RawHeader = []byte(newRequestHeader)
	uHttpRequest.Ssl = (vars["secure"] == "true")
	uHttpRequest.Request.Host = vars["source_host"]
	return
}

func (eng *Whale) TransformResponse(transforms []*tp.Transform, rrules []*tp.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, messagePath string) (output string, exports [][]string, logs []string) {
	uHttpResponse := input.(*mhclient.UpstreamHttpResponse)
	httpHeader := string(uHttpResponse.RawHeader)
	newHeader, export, logs := eng.Run(transforms[1], rrules, httpHeader, vars, deadline, messagePath)
	UpdateEnv(vars, export)
	uHttpResponse.RawHeader = []byte(newHeader)
	vars["device_stylesheet"] = "main"
	httpBody := string(uHttpResponse.Body)
	newHttpBody, export, logs := eng.Run(transforms[2], rrules, httpBody, vars, deadline, messagePath)
	UpdateEnv(vars, export)
	uHttpResponse.Body = []byte(newHttpBody)
	vars["body_length"] = fmt.Sprintf("%d", len(newHttpBody))
	vars["body"] = "true"
	httpHeader = string(uHttpResponse.RawHeader)
	newHeader, export, logs = eng.Run(transforms[3], rrules, httpHeader, vars, deadline, messagePath)
	UpdateEnv(vars, export)
	uHttpResponse.RawHeader = []byte(newHeader)
	return
}

func (ctx *EngineContext) Free() {
    for _, o := range ctx.Mobjects {
		if o != nil {
			o.Free()
		}
	}
}

func (ctx *EngineContext) RunInstruction(scope *Scope, ins *tp.Instruction) (returnValue interface{}) {
	defer func() {
		//TODO Stack traces seem to get truncated on syslog...
		if x := recover(); x != nil {
			err, ok := x.(error)
			errString := ""
			if ok {
				errString = err.Error()
			} else {
				errString = x.(string)
			}
			if errString != TimeoutError {
				if ctx.HadError == false {
					ctx.HadError = true
					errString = errString + "\n" + ins.Type.String() + " " + null.GetString(ins.Value) + "\n\n\nTritium Stack\n=========\n\n"
				}
				errString = errString + ctx.FileAndLine(ins) + "\n"
			}
			panic(errString)
		}
	}()

	if time.Now().After(ctx.Deadline) {
		panic(TimeoutError)
	}

	// If our object is invalid, then skip it
	if null.GetBool(ins.IsValid) == false {
		panic("Invalid instruction. Should have stopped before linking!")
	}
	indent := ""
	for i := 0; i < len(ctx.Yields); i++ {
		indent += "\t"
	}

	returnValue = ""
	switch *ins.Type {
	case tp.Instruction_BLOCK:
		for _, child := range ins.Children {
			returnValue = ctx.RunInstruction(scope, child)
		}
	case tp.Instruction_TEXT:
		returnValue = null.GetString(ins.Value)
	case tp.Instruction_LOCAL_VAR:
		name := null.GetString(ins.Value)
		vars := ctx.Vars()
		if len(ins.Arguments) > 0 {
			vars[name] = ctx.RunInstruction(scope, ins.Arguments[0])
		}
		if len(ins.Children) > 0 {
			ts := &Scope{Value: ctx.Vars()[name]}
			for _, child := range ins.Children {
				ctx.RunInstruction(ts, child)
			}
			vars[name] = ts.Value
		}
		returnValue = vars[name]
	case tp.Instruction_IMPORT:
		obj := ctx.Objects[int(null.GetInt32(ins.ObjectId))]
		curFile := ctx.Filename
		ctx.Filename = null.GetString(obj.Name)
		start := time.Now()
		index := ctx.AddLog("__IMPORT__FILE__:" + ctx.Filename)
		for _, child := range obj.Root.Children {
			ctx.RunInstruction(scope, child)
		}
		timeSpent := time.Since(start).Seconds()
		ctx.UpdateLog(index, "__IMPORT__FILE__:" + strconv.Itoa(int(timeSpent*1000)) + ":" + ctx.Filename)
		ctx.Filename = curFile
	case tp.Instruction_FUNCTION_CALL:
		fun := ctx.Functions[int(null.GetInt32(ins.FunctionId))]
		args := make([]interface{}, len(ins.Arguments))
		for i, argIns := range ins.Arguments {
			args[i] = ctx.RunInstruction(scope, argIns)
		}

		if null.GetBool(fun.BuiltIn) {
			if f := builtInFunctions[fun.Name]; f != nil {
				returnValue = f(ctx, scope, ins, args)
				if returnValue == nil {
					returnValue = ""
				}
			} else {
				panic("missing function: " + fun.Name)
			}
		} else {
			// We are using a user-defined function
			//println("Resetting localvar")
			// Setup the new local var
			vars := make(map[string]interface{}, len(args))
			for i, arg := range fun.Args {
				vars[null.GetString(arg.Name)] = args[i]
			}
			yieldBlock := &YieldBlock{
				Ins:  ins,
				Vars: vars,
			}
			// PUSH!
			ctx.PushYieldBlock(yieldBlock)
			for _, child := range fun.Instruction.Children {
				returnValue = ctx.RunInstruction(scope, child)
			}
			// POP!
			ctx.PopYieldBlock()
		}
	}

	return
}

func (ctx *EngineContext) ShouldContinue() (result bool) {
	if len(ctx.MatchShouldContinueStack) > 0 {
		result = ctx.MatchShouldContinueStack[len(ctx.MatchShouldContinueStack)-1]
	} else {
		result = false
	}
	return
}

func (ctx *EngineContext) MatchTarget() string {
	return ctx.MatchStack[len(ctx.MatchStack)-1]
}

func (ctx *EngineContext) PushYieldBlock(b *YieldBlock) {
	ctx.Yields = append(ctx.Yields, b)
}

func (ctx *EngineContext) PopYieldBlock() (b *YieldBlock) {
	num := len(ctx.Yields)
	if num > 0 {
		b = ctx.Yields[num-1]
		ctx.Yields = ctx.Yields[:num-1]
	}
	return
}

func (ctx *EngineContext) HasYieldBlock() bool {
	return len(ctx.Yields) > 0
}

func (ctx *EngineContext) TopYieldBlock() (b *YieldBlock) {
	num := len(ctx.Yields)
	if num > 0 {
		b = ctx.Yields[num-1]
	}
	return
}

func (ctx *EngineContext) Vars() map[string]interface{} {
	b := ctx.TopYieldBlock()
	if b != nil {
		return b.Vars
	}
	return nil
}

func (ctx *EngineContext) FileAndLine(ins *tp.Instruction) string {
	lineNum := fmt.Sprintf("%d", null.GetInt32(ins.LineNumber))
	return (ctx.Filename + ":" + lineNum)
}

func (ctx *EngineContext) UsePackage(pkg *tp.Package) {
	ctx.Types = make([]string, len(pkg.Types))
	for i, t := range pkg.Types {
		ctx.Types[i] = null.GetString(t.Name)
	}

	ctx.Functions = make([]*Function, len(pkg.Functions))
	for i, f := range pkg.Functions {
		name := null.GetString(f.Name)
		for _, a := range f.Args {
			typeString := ctx.Types[int(null.GetInt32(a.TypeId))]
			name = name + "." + typeString
		}
		fun := &Function{
			Name:     name,
			Function: f,
		}
		ctx.Functions[i] = fun
	}
}

func (ctx *EngineContext) GetRegexp(pattern, options string) (r *rubex.Regexp) {
	sig := pattern + "/" + options
	r = ctx.RegexpCache[sig]
	if r == nil {
		mode := rubex.ONIG_OPTION_DEFAULT
		if strings.Index(options, "i") >= 0 {
			mode = rubex.ONIG_OPTION_IGNORECASE
		}
		if strings.Index(options, "m") >= 0 {
			mode = rubex.ONIG_OPTION_MULTILINE
		}
		var err error
		r, err = rubex.NewRegexp(pattern, mode)
		if err == nil {
			ctx.AddMemoryObject(r)
			ctx.RegexpCache[sig] = r
		}
	}
	return
}

func (ctx *EngineContext) GetXpathExpr(p string) (e *xpath.Expression) {
	e = ctx.XPathCache[p]
	if e == nil {
		e = xpath.Compile(p)
		if e != nil {
			ctx.AddMemoryObject(e)
			ctx.XPathCache[p] = e
		} else {
			ctx.AddLog("Invalid XPath used: " + p)
		}
	}
	return
}

func (ctx *EngineContext) AddExport(exports []string) {
	ctx.Exports = append(ctx.Exports, exports)
}

func (ctx *EngineContext) AddLog(log string) int {
	//ctx.Log.Info("TRITIUM: " + log)
	index := len(ctx.Logs)
	ctx.Logs = append(ctx.Logs, log)
	return index
}

func (ctx *EngineContext) UpdateLog(index int, log string) {
	//ctx.Log.Info("TRITIUM: " + log)
	if index >= 0 && index < len(ctx.Logs) {
		ctx.Logs[index] = log
	}
}

func (ctx *EngineContext) SetEnv(key, val string) {
	ctx.Env[key] = val
}

func (ctx *EngineContext) GetEnv(key string) (val string) {
	val = ctx.Env[key]
	return
}

func (ctx *EngineContext) SetVar(key string, val interface{}) {
	b := ctx.TopYieldBlock()
	if b != nil {
		b.Vars[key] = val
	}
}

func (ctx *EngineContext) GetVar(key string) (val interface{}) {
	b := ctx.TopYieldBlock()
	if b != nil {
		val = b.Vars[key]
	}
	return
}

func (ctx *EngineContext) GetInnerReplacer() (r *rubex.Regexp) {
	r = ctx.InnerReplacer
	//r = rubex.MustCompile(`[\\$](\d)`)
	return
}

func (ctx *EngineContext) GetHeaderContentTypeRegex() (r *rubex.Regexp) {
	r = ctx.HeaderContentType
	//r = rubex.MustCompileWithOption(`<meta\s+http-equiv="content-type"\s+content="(.*?)"`, rubex.ONIG_OPTION_IGNORECASE)
	return
}

func (ctx *EngineContext) GetOutputBuffer() (b []byte) {
	//b = ctx.OutputBuffer
	return
}

func (ctx *EngineContext) Logger() (logger *golog.Logger) {
	logger = ctx.Log
	return
}

func (ctx *EngineContext) PushMatchStack(match string) {
	ctx.MatchStack = append(ctx.MatchStack, match)
}

func (ctx *EngineContext) PopMatchStack() (match string) {
	if num := len(ctx.MatchStack); num > 0 {
		match = ctx.MatchStack[num-1]
		ctx.MatchStack = ctx.MatchStack[:num-1]
	}
	return
}

func (ctx *EngineContext) PushShouldContinueStack(cont bool) {
	ctx.MatchShouldContinueStack = append(ctx.MatchShouldContinueStack, cont)
}

func (ctx *EngineContext) PopShouldContinueStack() (cont bool) {
	if num := len(ctx.MatchShouldContinueStack); num > 0 {
		cont = ctx.MatchShouldContinueStack[num-1]
		ctx.MatchShouldContinueStack = ctx.MatchShouldContinueStack[:num-1]
	}
	return
}

func (ctx *EngineContext) SetShouldContinue(cont bool) {
	if num := len(ctx.MatchShouldContinueStack); num > 0 {
		ctx.MatchShouldContinueStack[num-1] = cont
	}
}

func (ctx *EngineContext) AddMemoryObject(o MemoryObject) {
	ctx.Mobjects = append(ctx.Mobjects, o)
}
