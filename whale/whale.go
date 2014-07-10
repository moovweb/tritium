package whale

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

import (
	"tritium/dependencies/go-cache"
	"tritium/dependencies/go-cache/arc"
	"tritium/dependencies/gokogiri/xpath"
	"tritium/dependencies/rubex"
	"tritium/dependencies/steno"
	"tritium"
	"tritium/constants"
	"tritium/protoface"
)

type Whale struct {
	Debugger    steno.Debugger
	RegexpCache cache.Cache
	XPathCache  cache.Cache
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
	protoface.Transform
	Rrules []protoface.RewriteRule

	InnerReplacer     *rubex.Regexp
	HeaderContentType *rubex.Regexp

	// Debug info
	Filename    string
	HadError    bool
	Deadline    time.Time
	Mobjects    []MemoryObject
	MessagePath string
	Customer    string
	Project     string
	InDebug     bool
	CurrentDoc  interface{}
	Warnings    int
	Prod        bool
	HtmlParsed  bool

	ActiveLayers map[string]bool
	ActiveLayersString string
}

const OutputBufferSize = 500 * 1024 //500KB
const defaultMobjects = 4
const TimeoutError = "EngineTimeout"

var TritiumLogRewritersAsImports = false

func NewEngine(debugger steno.Debugger) *Whale {
	e := &Whale{
		Debugger:    debugger,
		RegexpCache: arc.NewARCache(1000),
		XPathCache:  arc.NewARCache(1000),
	}
	e.RegexpCache.SetCleanFunc(CleanRegexpObject)
	e.XPathCache.SetCleanFunc(CleanXpathExpObject)
	return e
}

func NewEngineCtx(eng *Whale, vars map[string]string, transform protoface.Transform, rrules []protoface.RewriteRule, deadline time.Time, messagePath, customer, project string, activeLayers []string, inDebug bool) (ctx *EngineContext) {
	ctx = &EngineContext{
		Whale:                    eng,
		Exports:                  make([][]string, 0),
		Logs:                     make([]string, 0),
		Env:                      vars,
		Transform:                transform,
		Rrules:                   rrules,
		MatchStack:               make([]string, 0),
		MatchShouldContinueStack: make([]bool, 0),
		Yields:     make([]*YieldBlock, 0),
		HadError:   false,

		Deadline:    deadline,
		Mobjects:    make([]MemoryObject, 0, defaultMobjects),
		MessagePath: messagePath,
		Customer:    customer,
		Project:     project,
		InDebug:     inDebug,
	}
	ctx.ActiveLayers = make(map[string]bool)
	for _, name := range activeLayers {
		ctx.ActiveLayers[name] = true
	}
	ctx.ActiveLayersString = strings.Join(activeLayers, ",")
	return
}

func (eng *Whale) Free() {
	eng.RegexpCache.Reset()
	eng.XPathCache.Reset()
}

func (eng *Whale) Run(transform protoface.Transform, rrules []protoface.RewriteRule, input interface{}, vars map[string]string, deadline time.Time, customer, project, messagePath string, activeLayers []string, inDebug bool) (exhaust *tritium.Exhaust) {
	ctx := NewEngineCtx(eng, vars, transform, rrules, deadline, messagePath, customer, project, activeLayers, inDebug)
	exhaust = &tritium.Exhaust{}
	defer ctx.Free()
	ctx.Yields = append(ctx.Yields, &YieldBlock{Vars: make(map[string]interface{})})
	ctx.UsePackage(transform.IGetPkg())
	scope := &Scope{Value: input.(string)}
	obj := transform.IGetNthObject(0)
	ctx.Filename = obj.IGetName()
	if TritiumLogRewritersAsImports {
		ctx.Whale.Debugger.LogImport(ctx.MessagePath, ctx.Filename, ctx.Filename, int(obj.IGetRoot().IGetLineNumber()))
	}
	ctx.RunInstruction(scope, obj.IGetRoot())
	exhaust.Output = scope.Value.(string)
	exhaust.Exports = ctx.Exports
	exhaust.Logs = ctx.Logs
	exhaust.HtmlParsed = ctx.HtmlParsed
	return
}

func (eng *Whale) GetCacheStats() (int, int, int, int) {
	return eng.RegexpCache.GetHitRate(), eng.RegexpCache.GetUsageRate(), eng.XPathCache.GetHitRate(), eng.XPathCache.GetUsageRate()
}

func (ctx *EngineContext) Free() {
	for _, o := range ctx.Mobjects {
		if o != nil {
			o.Free()
		}
	}
}

func (ctx *EngineContext) RunInstruction(scope *Scope, ins protoface.Instruction) (returnValue interface{}) {
	thisFile := ctx.Filename
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
					errString = errString + "\n" + constants.Instruction_InstructionType_name[ins.IGetType()] + " " + ins.IGetValue() + "\n\n\nTritium Stack\n=========\n\n"
				}
				// errString = errString + ctx.FileAndLine(ins) + "\n"
				if len(thisFile) > 0 && thisFile != "__rewriter__" {
					switch ins.IGetType() {
					case constants.Instruction_IMPORT:
						errString = errString + fmt.Sprintf("%s:%d", thisFile, ins.IGetLineNumber())
						errString = errString + fmt.Sprintf(":\t@import %s\n", ctx.Transform.IGetNthObject(int(ins.IGetObjectId())).IGetName())
					case constants.Instruction_FUNCTION_CALL:
						errString = errString + fmt.Sprintf("%s:%d", thisFile, ins.IGetLineNumber())
						if callee := ins.IGetValue(); len(callee) > 0 {
							errString = errString + fmt.Sprintf(":\t%s\n", callee)
						}
					default:
						// do nothing
					}
				}
			}
			panic(errString)
		}
	}()
	ctx.Whale.Debugger.TrapInstruction(ctx.MessagePath, ctx.Filename, ctx.Env, ins, scope.Value, scope.Index, ctx.CurrentDoc)
	if time.Now().After(ctx.Deadline) && !ctx.InDebug {
		panic(TimeoutError)
	}

	indent := ""
	for i := 0; i < len(ctx.Yields); i++ {
		indent += "\t"
	}

	returnValue = ""
	switch ins.IGetType() {
	case constants.Instruction_BLOCK:
		for i := 0; i < ins.INumChildren(); i++ {
			child := ins.IGetNthChild(i)
			returnValue = ctx.RunInstruction(scope, child)
		}
	case constants.Instruction_TEXT:
		returnValue = ins.IGetValue()
	case constants.Instruction_LOCAL_VAR:
		name := ins.IGetValue()
		vars := ctx.Vars()
		if ins.INumArgs() > 0 {
			vars[name] = ctx.RunInstruction(scope, ins.IGetNthArgument(0))
		}
		if ins.INumChildren() > 0 {
			ts := &Scope{Value: ctx.Vars()[name]}
			for i := 0; i < ins.INumChildren(); i++ {
				child := ins.IGetNthChild(i)
				ctx.RunInstruction(ts, child)
			}
			vars[name] = ts.Value
		}
		returnValue = vars[name]
	case constants.Instruction_IMPORT:
		obj := ctx.IGetNthObject(int(ins.IGetObjectId()))
		curFile := ctx.Filename
		ctx.Filename = obj.IGetName()
		ctx.Whale.Debugger.LogImport(ctx.MessagePath, ctx.Filename, curFile, int(ins.IGetLineNumber()))
		root := obj.IGetRoot()

		for i := 0; i < root.INumChildren(); i++ {
			child := root.IGetNthChild(i)
			ctx.RunInstruction(scope, child)
		}

		ctx.Whale.Debugger.LogImportDone(ctx.MessagePath, ctx.Filename, curFile, int(ins.IGetLineNumber()))
		ctx.Filename = curFile
	case constants.Instruction_FUNCTION_CALL:
		fun := ctx.Functions[int(ins.IGetFunctionId())]
		args := make([]interface{}, ins.INumArgs())
		for i := 0; i < len(args); i++ {
			argIns := ins.IGetNthArgument(i)
			args[i] = ctx.RunInstruction(scope, argIns)
		}

		if fun.IGetBuiltIn() {
			curFile := ctx.Filename
			if f := builtInFunctions[fun.Name]; f != nil {
				returnValue = f(ctx, scope, ins, args)
				if returnValue == nil {
					returnValue = ""
				}
			} else {
				panic("missing function: " + fun.IGetName())
			}
			ctx.Filename = curFile
		} else {
			// We are using a user-defined function
			//println("Resetting localvar")
			// Setup the new local var
			vars := make(map[string]interface{}, len(args))
			for i := 0; i < fun.INumArgs(); i++ {
				arg := fun.IGetNthArg(i)
				vars[arg.IGetName()] = args[i]
			}
			yieldBlock := &YieldBlock{
				Ins:      ins,
				Vars:     vars,
				Filename: ctx.Filename,
			}
			// PUSH!
			ctx.PushYieldBlock(yieldBlock)
			curFile := ctx.Filename
			ctx.Filename = fun.IGetFilename()
			// if it's a user-called function, save the curfile:linenumber
			// Are we going to need a stack here? --A.L.
			if !ctx.Debugger.IsProd() && ins.IGetIsUserCalled() == true {
				ctx.Env[isUserCalledEnvKey] = fmt.Sprintf("%s:%d", curFile, ins.IGetLineNumber())
			}
			for i := 0; i < fun.IGetInstruction().INumChildren(); i++ {
				child := fun.IGetInstruction().IGetNthChild(i)
				returnValue = ctx.RunInstruction(scope, child)
			}
			if ins.IGetIsUserCalled() == true {
				delete(ctx.Env, isUserCalledEnvKey)
			}
			ctx.Filename = curFile
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

func (ctx *EngineContext) FileAndLine(ins protoface.Instruction) string {
	lineNum := strconv.Itoa(int(ins.IGetLineNumber()))
	return (ctx.Filename + ":" + lineNum)
}

func (ctx *EngineContext) UsePackage(pkg protoface.Package) {
	pkgTypes := pkg.IGetTypes()
	ctx.Types = make([]string, len(pkgTypes))
	for i, t := range pkgTypes {
		ctx.Types[i] = t.IGetName()
	}

	pkgFunctions := pkg.IGetFunctions()
	ctx.Functions = make([]*Function, len(pkgFunctions))
	for i, f := range pkgFunctions {
		ns := f.IGetNamespace()
		if len(ns) == 0 {
			ns = "tritium"
		}
		name := ns + "." + f.IGetName()
		// for _, a := range f.Args {
		// 	typeString := ctx.Types[int(null.GetInt32(a.TypeId))]
		// 	name = name + "." + typeString
		// }
		for i := 0; i < f.INumArgs(); i++ {
			a := f.IGetNthArg(i)
			typeString := ctx.Types[int(a.IGetTypeId())]
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
	object, err := ctx.RegexpCache.Get(sig)
	if err != nil {
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
			//ctx.AddMemoryObject(r)
			ctx.RegexpCache.Set(sig, &RegexpObject{Regexp: r})
		} else {
			panic(fmt.Sprintf("%s: /%s/%s", err.Error(), pattern, options))
		}
		return r
	}
	return object.(*RegexpObject).Regexp
}

func (ctx *EngineContext) GetXpathExpr(p string) (e *xpath.Expression) {
	object, err := ctx.XPathCache.Get(p)
	if err != nil {
		e = xpath.Compile(p)
		if e != nil {
			//ctx.AddMemoryObject(e)
			ctx.XPathCache.Set(p, &XpathExpObject{Expression: e})
		} else {
			ctx.Debugger.LogTritiumErrorMessage(ctx.Customer, ctx.Project, ctx.Env, ctx.MessagePath, "Invalid XPath used: "+p)
		}
		return e
	}
	return object.(*XpathExpObject).Expression
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
	return ctx.GetRegexp(`[\\$](\d)`, "i")
}

func (ctx *EngineContext) GetHeaderContentTypeRegex() (r *rubex.Regexp) {
	return ctx.GetRegexp(`<meta\s+http-equiv="content-type"\s+content="(.*?)"`, "i")
}

func (ctx *EngineContext) GetOutputBuffer() (b []byte) {
	//b = ctx.OutputBuffer
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
