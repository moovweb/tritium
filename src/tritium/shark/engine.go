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
	LocalVar map[string]interface{}
	MatchStack []string
	MatchShouldContinue []bool
	*Shark
	*tp.Transform
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
		LocalVar: make(map[string]interface{}, 0),
		MatchStack: make([]string, 0),
		MatchShouldContinue: make([]bool, 0),
	}
	ctx.UsePackage(transform.Pkg)
	scope := &Scope{Value:input}
	ctx.runInstruction(scope, transform.Objects[0].Root, nil)
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

func (ctx *Ctx) runInstruction(scope *Scope, ins *tp.Instruction, yieldBlock *tp.Instruction) (returnValue interface{}) {
	returnValue = ""
	switch *ins.Type {
	case tp.Instruction_BLOCK:
		returnValue = ctx.runChildren(scope, ins, yieldBlock)
	case tp.Instruction_TEXT:
		returnValue = proto.GetString(ins.Value)
	case tp.Instruction_LOCAL_VAR:
		name := proto.GetString(ins.Value)
		if len(ins.Arguments) > 0 {
			ctx.LocalVar[name] = ctx.runInstruction(scope, ins.Arguments[0], yieldBlock)
			//println("Setting ", name, "to", ctx.LocalVar[name])
		}
		if len(ins.Children) > 0 {
			ts := &Scope{Value: ctx.LocalVar[name]}
			ctx.runChildren(ts, ins, yieldBlock)
			ctx.LocalVar[name] = ts.Value.(string)
		}
		//println("Getting ", name, "as", ctx.LocalVar[name])
		returnValue = ctx.LocalVar[name]
	case tp.Instruction_IMPORT:
		ctx.runChildren(scope, ctx.Objects[int(proto.GetInt32(ins.ObjectId))].Root, nil)
	case tp.Instruction_FUNCTION_CALL:
		//println(ins.String())
		fun := ctx.Functions[int(proto.GetInt32(ins.FunctionId))]
		args := make([]interface{}, len(ins.Arguments))
		for i, argIns := range(ins.Arguments) {
			args[i] = ctx.runInstruction(scope, argIns, yieldBlock)
		}
		if proto.GetBool(fun.BuiltIn) {
			returnValue = ctx.runBuiltIn(fun, scope, ins, yieldBlock, args)
		} else { // We are using a user-defined function
			// Store the current frame
			//localVar := ctx.LocalVar
			
			//println("Resetting localvar")
			// Setup the new local var
			//ctx.LocalVar = make(map[string]interface{}, len(args))
			for i, arg := range(fun.Args) {
				ctx.LocalVar[proto.GetString(arg.Name)] = args[i]
			}
			
			yieldIns := &tp.Instruction{
				Type: tp.NewInstruction_InstructionType(tp.Instruction_BLOCK),
				Children: ins.Children,
			}
			returnValue = ctx.runChildren(scope, fun.Instruction, yieldIns)
			
			// Put the local var scope back!
			//ctx.LocalVar = localVar
		}
	}
	return
}

func (ctx *Ctx) runChildren(scope *Scope, ins *tp.Instruction, yieldBlock *tp.Instruction) (returnValue interface{}) {
	for _, child := range(ins.Children) {
		returnValue = ctx.runInstruction(scope, child, yieldBlock)
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

