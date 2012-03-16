package lamprey

import (
	tp "athena/src/athena/proto"
	l4g "log4go"
	proto "goprotobuf.googlecode.com/hg/proto"
	"tritium/src/tritium/whale"
	"os"
	"fmt"
)

type Lamprey struct {
	*whale.Whale
}

type Ctx struct {
	*whale.WhaleContext
	*Lamprey
	level int
}

func NewEngine(logger l4g.Logger) *Lamprey {
	e := &Lamprey{}
	e.Whale = whale.NewEngine(logger)
	return e
}

func (eng *Lamprey) Run(transform *tp.Transform, input interface{}, vars map[string]string) (output string, exports [][]string, logs []string) {
	ctx := &Ctx{Lamprey: eng}
	ctx.WhaleContext = whale.NewEngineCtx(eng.Whale, vars, transform)

	ctx.Yields = append(ctx.Yields, &whale.YieldBlock{Vars: make(map[string]interface{})})
	ctx.UsePackage(transform.Pkg)
	scope := &whale.Scope{Value: input.(string)}
	obj := transform.Objects[0]
	ctx.Filename = proto.GetString(obj.Name)
	ctx.level = 0
	ctx.RunInstruction(scope, obj.Root)
	output = scope.Value.(string)
	exports = ctx.Exports
	logs = ctx.Logs
	return
}

func (ctx *Ctx) RunChildren(scope *whale.Scope, ins *tp.Instruction) (returnValue interface{}) {
	for _, child := range ins.Children {
		returnValue = ctx.RunInstruction(scope, child)
	}
	return
}

func (ctx *Ctx) RunInstruction(scope *whale.Scope, ins *tp.Instruction) (returnValue interface{}) {
	defer func() {
		if x := recover(); x != nil {
			err, ok := x.(os.Error)
			errString := ""
			if ok {
				errString = err.String()
			} else {
				errString = x.(string)
			}
			if ctx.HadError == false {
				ctx.HadError = true
				errString = errString + "\n" + ins.Type.String() + " " + proto.GetString(ins.Value) + "\n\n\nTritium Stack\n=========\n\n"
			}
			errString = errString + ctx.FileAndLine(ins) + "\n"
			panic(errString)
		}
	}()

	// If our object is invalid, then skip it
	if proto.GetBool(ins.IsValid) == false {
		panic("Invalid instruction. Should have stopped before linking!")
	}
	indent := ""
	for i := 0; i < ctx.level; i++ {
		indent += "\t"
	}

	ctx.level++

	returnValue = ""
	switch *ins.Type {
	case tp.Instruction_BLOCK:
		fmt.Printf("%s Instruction block\n", indent)
		returnValue = ctx.RunChildren(scope, ins)
		fmt.Printf("%s Instruction block returns: %v\n", indent, returnValue)
	case tp.Instruction_TEXT:
		fmt.Printf("%s Instruction text\n", indent)
		returnValue = proto.GetString(ins.Value)
		fmt.Printf("%s Instruction text returns: %v\n", indent, returnValue)
	case tp.Instruction_LOCAL_VAR:
		fmt.Printf("%s Eval local var\n", indent)
		name := proto.GetString(ins.Value)
		vars := ctx.Vars()
		if len(ins.Arguments) > 0 {
			vars[name] = ctx.RunInstruction(scope, ins.Arguments[0])
		}
		fmt.Printf("%s %%%s: %v\n", indent, name, vars[name])
		if len(ins.Children) > 0 {
			ts := &whale.Scope{Value: ctx.Vars()[name]}
			ctx.RunChildren(ts, ins)
			vars[name] = ts.Value
		}
		fmt.Printf("%s return: %v\n", indent, vars[name])
		returnValue = vars[name]
	case tp.Instruction_IMPORT:
		obj := ctx.Objects[int(proto.GetInt32(ins.ObjectId))]
		curFile := ctx.Filename
		ctx.Filename = proto.GetString(obj.Name)
		ctx.RunChildren(scope, obj.Root)
		ctx.Filename = curFile
		fmt.Printf("%s Import: %q\n", indent, ctx.Filename)
	case tp.Instruction_FUNCTION_CALL:
		fun := ctx.Functions[int(proto.GetInt32(ins.FunctionId))]
		args := make([]interface{}, len(ins.Arguments))
		for i, argIns := range ins.Arguments {
			args[i] = ctx.RunInstruction(scope, argIns)
		}
		debugInfo := fmt.Sprintf("%s(", fun.Name)

		for index, v := range args {
			debugInfo += fmt.Sprintf("%q", v)
			if index < len(args)-1 {
				debugInfo += ", "
			}
		}
		debugInfo += ")\n"
		fmt.Printf("%s %s", indent, debugInfo)

		if proto.GetBool(fun.BuiltIn) {
			if f := whale.LookupBuiltIn(fun.Name); f != nil {
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
			yieldBlock := &whale.YieldBlock{
				Ins:  ins,
				Vars: vars,
			}
			// PUSH!
			ctx.PushYieldBlock(yieldBlock)
			fmt.Printf("%s run children\n", indent)
			returnValue = ctx.RunChildren(scope, fun.Instruction)
			// POP!
			ctx.PopYieldBlock()
		}

		fmt.Printf("%s ctx.Value: %v\n", indent, scope.Value)
		fmt.Printf("%s returns: %v\n", indent, returnValue)
		fmt.Printf("%s %s done\n\n", indent, fun.Name)
	}
	ctx.level--

	return
}
