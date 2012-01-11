package shark

import(
	tp "tritium/proto"
	"libxml/xpath"
	"rubex"
	proto "goprotobuf.googlecode.com/hg/proto"
)

type Shark struct {
	RegexpCache map[string]*rubex.Regexp
	XPathCache map[string]*xpath.Expression
}

type Ctx struct {
	Functions []*Function
	Types []string
	Exports [][]string
	Logs []string
	Env map[string]string
	LocalVar map[string]interface{}
	*Shark
	*tp.Transform
}

type Function struct {
	Name string
	*tp.Function
}

type Scope struct {
	Value interface{}
}

func NewEngine() (*Shark) {
	e := &Shark{
		RegexpCache: make(map[string]*rubex.Regexp),
		XPathCache: make(map[string]*xpath.Expression),
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
		Env: make(map[string]string),
		Transform: transform,
		LocalVar: make(map[string]interface{}, 0),
	}
	ctx.UsePackage(transform.Pkg)
	scope := &Scope{Value:input}
	ctx.runInstruction(scope, transform.Objects[0].Root)
	data = scope.Value.(string)
	return
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
		if len(ins.Arguments) > 0 {
			ctx.LocalVar[name] = ctx.runInstruction(scope, ins.Arguments[0])
		}
		returnValue = ctx.LocalVar[name]
	case tp.Instruction_FUNCTION_CALL:
		fun := ctx.Functions[int(proto.GetInt32(ins.FunctionId))]
		args := make([]interface{}, len(ins.Arguments))
		for i, argIns := range(ins.Arguments) {
			args[i] = ctx.runInstruction(scope, argIns)
		}
		if proto.GetBool(fun.BuiltIn) {
			switch fun.Name {
			case "concat.Text.Text":
				returnValue = args[0].(string) + args[1].(string)
			case "var.Text":
				ts := &Scope{Value: ctx.Env[args[0].(string)]}
				ctx.runChildren(ts, ins)
				returnValue = ts.Value
				ctx.Env[args[0].(string)] = returnValue.(string)
			case "export.Text":
				val := make([]string, 2)
				val[0] = args[0].(string)
				ts := &Scope{Value:""}
				ctx.runChildren(ts, ins)
				val[1] = ts.Value.(string)
				ctx.Exports = append(ctx.Exports, val)
			case "set.Text":
				scope.Value = args[0]
			case "log.Text":
				ctx.Logs = append(ctx.Logs, args[0].(string))
			default:
				println("Must implement", fun.Name)
			}
		} else {
			localVar := ctx.LocalVar
			ctx.LocalVar = make(map[string]interface{}, len(args))
			
			//for i, arg := range(fun.Arguments) {
				//ctx.LocalVar[i]
			//}
			
			ctx.LocalVar = localVar
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
