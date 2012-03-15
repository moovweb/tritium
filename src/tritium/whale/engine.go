package whale

import (
	tp "athena/src/athena/proto"
	"rubex/lib"
	"gokogiri/xpath"
	//"gokogiri/html"
	l4g "log4go"
	proto "goprotobuf.googlecode.com/hg/proto"
	"os"
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
	"below":  BOTTOM,
}

type Whale struct {
	RegexpCache   map[string]*rubex.Regexp
	XPathCache    map[string]*xpath.Expression
	Log           l4g.Logger
	OutputBuffer  []byte
	InnerReplacer *rubex.Regexp
}

type Ctx struct {
	Functions           []*Function
	Types               []string
	Exports             [][]string
	Logs                []string
	Env                 map[string]string
	MatchStack          []string
	MatchShouldContinue []bool
	Yields              []*YieldBlock
	*Whale
	*tp.Transform

	// Debug info
	filename string
	hadError bool
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

const OutputBufferSize = 500 * 1024 //500KB

func NewEngine(logger l4g.Logger) *Whale {
	e := &Whale{
		RegexpCache:   make(map[string]*rubex.Regexp),
		XPathCache:    make(map[string]*xpath.Expression),
		Log:           logger,
		OutputBuffer:  make([]byte, OutputBufferSize),
		InnerReplacer: rubex.MustCompile(`[\\$](\d)`),
	}
	return e
}

func (eng *Whale) Run(transform *tp.Transform, input interface{}, vars map[string]string) (output string, exports [][]string, logs []string) {
	ctx := &Ctx{
		Whale:               eng,
		Exports:             make([][]string, 0),
		Logs:                make([]string, 0),
		Env:                 vars,
		Transform:           transform,
		MatchStack:          make([]string, 0),
		MatchShouldContinue: make([]bool, 0),
		Yields:              make([]*YieldBlock, 0),
		hadError:            false,
	}
	ctx.Yields = append(ctx.Yields, &YieldBlock{Vars: make(map[string]interface{})})
	ctx.UsePackage(transform.Pkg)
	scope := &Scope{Value: input.(string)}
	obj := transform.Objects[0]
	ctx.filename = proto.GetString(obj.Name)
	ctx.runInstruction(scope, obj.Root)
	output = scope.Value.(string)
	exports = ctx.Exports
	logs = ctx.Logs
	return
}

func (ctx *Ctx) runChildren(scope *Scope, ins *tp.Instruction) (returnValue interface{}) {
	for _, child := range ins.Children {
		returnValue = ctx.runInstruction(scope, child)
	}
	return
}

func (ctx *Ctx) runInstruction(scope *Scope, ins *tp.Instruction) (returnValue interface{}) {
	defer func() {
		if x := recover(); x != nil {
			err, ok := x.(os.Error)
			errString := ""
			if ok {
				errString = err.String()
			} else {
				errString = x.(string)
			}
			if ctx.hadError == false {
				ctx.hadError = true
				errString = errString + "\n" + ins.Type.String() + " " + proto.GetString(ins.Value) + "\n\n\nTritium Stack\n=========\n\n"
			}
			errString = errString + ctx.fileAndLine(ins) + "\n"
			panic(errString)
		}
	}()

	// If our object is invalid, then skip it
	if proto.GetBool(ins.IsValid) == false {
		panic("Invalid instruction. Should have stopped before linking!")
	}
	returnValue = ""
	switch *ins.Type {
	case tp.Instruction_BLOCK:
		returnValue = ctx.runChildren(scope, ins)
	case tp.Instruction_TEXT:
		returnValue = proto.GetString(ins.Value)
	case tp.Instruction_LOCAL_VAR:
		name := proto.GetString(ins.Value)
		vars := ctx.vars()
		if len(ins.Arguments) > 0 {
			vars[name] = ctx.runInstruction(scope, ins.Arguments[0])
		}
		if len(ins.Children) > 0 {
			ts := &Scope{Value: ctx.vars()[name]}
			ctx.runChildren(ts, ins)
			vars[name] = ts.Value
		}
		returnValue = vars[name]
	case tp.Instruction_IMPORT:
		obj := ctx.Objects[int(proto.GetInt32(ins.ObjectId))]
		curFile := ctx.filename
		ctx.filename = proto.GetString(obj.Name)
		ctx.runChildren(scope, obj.Root)
		ctx.filename = curFile
	case tp.Instruction_FUNCTION_CALL:
		fun := ctx.Functions[int(proto.GetInt32(ins.FunctionId))]
		args := make([]interface{}, len(ins.Arguments))
		for i, argIns := range ins.Arguments {
			args[i] = ctx.runInstruction(scope, argIns)
		}
		if proto.GetBool(fun.BuiltIn) {
			if f := builtInFunctions[fun.Name]; f != nil {
				returnValue = f(ctx, scope, ins, args)
			} else {
				panic("missing function: " + fun.Name)
			}
		} else {
			// We are using a user-defined function
			//println("Resetting localvar")
			// Setup the new local var
			vars := make(map[string]interface{}, len(args))
			for i, arg := range fun.Args {
				vars[proto.GetString(arg.Name)] = args[i]
			}
			yieldBlock := &YieldBlock{
				Ins:  ins,
				Vars: vars,
			}
			// PUSH!
			ctx.pushYieldBlock(yieldBlock)
			returnValue = ctx.runChildren(scope, fun.Instruction)
			// POP!
			ctx.popYieldBlock()
		}
	}

	return
}
