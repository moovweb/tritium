package shark

import(
	tp "tritium/proto"
	"rubex"
	"libxml/xpath"
	xml "libxml/tree"
	l4g "log4go"
	proto "goprotobuf.googlecode.com/hg/proto"
)

type Position int;
const (
	TOP = iota;
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

type Shark struct {
	RegexpCache map[string]*rubex.Regexp
	XPathCache map[string]*xpath.Expression
	Log l4g.Logger
}

type Ctx struct {
	Functions []*Function
	Types []string
	Exports [][]string
	Logs []string
	Env map[string]string
	MatchStack []string
	MatchShouldContinue []bool
	Yields []*YieldBlock
	*Shark
	*tp.Transform
}

type YieldBlock struct {
	Ins *tp.Instruction
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

func NewEngine(logger l4g.Logger) (*Shark) {
	e := &Shark{
		RegexpCache: make(map[string]*rubex.Regexp),
		XPathCache: make(map[string]*xpath.Expression),
		Log: logger,
	}
	return e
}

func (ctx *Ctx) UsePackage(pkg *tp.Package) {
	ctx.Types = make([]string, len(pkg.Types))
	for i, t := range(pkg.Types) {
		ctx.Types[i] = proto.GetString(t.Name)
	}
	
	ctx.Functions = make([]*Function, len(pkg.Functions))
	for i, f := range(pkg.Functions) {
		name := proto.GetString(f.Name)
		for _, a := range(f.Args) {
			typeString := ctx.Types[int(proto.GetInt32(a.TypeId))]
			name = name + "." + typeString
		}
		fun := &Function{
			Name: name,
			Function: f,
		}
		ctx.Functions[i] = fun
	}
}

func (eng *Shark) Run(transform *tp.Transform, input string, vars map[string]string) (data string, exports [][]string, logs []string) {
	ctx := &Ctx{
		Shark: eng,
		Exports: make([][]string, 0),
		Logs: make([]string, 0),
		Env: vars,
		Transform: transform,
		MatchStack: make([]string, 0),
		MatchShouldContinue: make([]bool, 0),
		Yields: make([]*YieldBlock, 0),
	}
	ctx.Yields = append(ctx.Yields, &YieldBlock{Vars:make(map[string]interface{})})
	ctx.UsePackage(transform.Pkg)
	scope := &Scope{Value:input}
	ctx.runInstruction(scope, transform.Objects[0].Root, )
	data = scope.Value.(string)
	exports = ctx.Exports
	logs = ctx.Logs
	return
}

func (ctx *Ctx) matchShouldContinue() (bool) {
	return ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1]
}
func (ctx *Ctx) matchTarget() (string) {
	return ctx.MatchStack[len(ctx.MatchStack)-1]
}
func (ctx *Ctx) yieldBlock() (*YieldBlock) {
	return ctx.Yields[(len(ctx.Yields)-1)]
}
func (ctx *Ctx) vars() (map[string]interface{}) {
	return ctx.yieldBlock().Vars
}

func (ctx *Ctx) runInstruction(scope *Scope, ins *tp.Instruction) (returnValue interface{}) {
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
			//println("Setting ", name, "to", ctx.LocalVar[name])
		}
		if len(ins.Children) > 0 {
			ts := &Scope{Value: ctx.vars()[name]}
			ctx.runChildren(ts, ins)
			vars[name] = ts.Value.(string)
		}
		//println("Getting ", name, "as", ctx.LocalVar[name])
		returnValue = vars[name]
	case tp.Instruction_IMPORT:
		ctx.runChildren(scope, ctx.Objects[int(proto.GetInt32(ins.ObjectId))].Root)
	case tp.Instruction_FUNCTION_CALL:
		//println(ins.String())
		fun := ctx.Functions[int(proto.GetInt32(ins.FunctionId))]
		args := make([]interface{}, len(ins.Arguments))
		for i, argIns := range(ins.Arguments) {
			args[i] = ctx.runInstruction(scope, argIns)
		}
		if proto.GetBool(fun.BuiltIn) {
			returnValue = ctx.runBuiltIn(fun, scope, ins, args)
		} else { // We are using a user-defined function
			//println("Resetting localvar")
			// Setup the new local var
			vars := make(map[string]interface{}, len(args))
			for i, arg := range(fun.Args) {
				vars[proto.GetString(arg.Name)] = args[i]
			}
			
			yieldBlock := &YieldBlock{
				Ins: ins,
				Vars: vars,
			}
			// PUSH!
			ctx.Yields = append(ctx.Yields, yieldBlock)
			returnValue = ctx.runChildren(scope, fun.Instruction)
			// POP!
			ctx.Yields = ctx.Yields[:(len(ctx.Yields)-1)]
		}
	}
	return
}

func (ctx *Ctx) runChildren(scope *Scope, ins *tp.Instruction) (returnValue interface{}) {
	for _, child := range(ins.Children) {
		returnValue = ctx.runInstruction(scope, child)
	}
	return
}

func MoveFunc(what, where xml.Node, position Position) {
	//what.Remove()
	switch position {
	case BOTTOM:
		where.AppendChildNode(what)
	case TOP:
		where.PrependChildNode(what)
	case BEFORE:
		where.AddNodeBefore(what)
	case AFTER:
		where.AddNodeAfter(what)
	}
}

