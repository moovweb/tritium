package lamprey

import (
	"fmt"
	"time"
)

import (
	"butler/null"
	"golog"
	tp "tritium/proto"
	"tritium/whale"
)

type Lamprey struct {
	*whale.Whale
}

type Ctx struct {
	*whale.WhaleContext
	*Lamprey
	level int
}

func NewEngine(logger *golog.Logger) *Lamprey {
	e := &Lamprey{}
	e.Whale = whale.NewEngine(logger)
	return e
}

func (eng *Lamprey) Run(transform *tp.Transform, input interface{}, vars map[string]string, deadline time.Time) (output string, exports [][]string, logs []string) {
	ctx := &Ctx{Lamprey: eng}
	ctx.WhaleContext = whale.NewEngineCtx(eng.Whale, vars, transform, deadline)

	ctx.Yields = append(ctx.Yields, &whale.YieldBlock{Vars: make(map[string]interface{})})
	ctx.UsePackage(transform.Pkg)
	scope := &whale.Scope{Value: input.(string)}
	obj := transform.Objects[0]
	ctx.Filename = null.GetString(obj.Name)
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
			err, ok := x.(error)
			errString := ""
			if ok {
				errString = err.Error()
			} else {
				errString = x.(string)
			}
			if ctx.HadError == false {
				ctx.HadError = true
				errString = errString + "\n" + ins.Type.String() + " " + null.GetString(ins.Value) + "\n\n\nTritium Stack\n=========\n\n"
			}
			errString = errString + ctx.FileAndLine(ins) + "\n"
			panic(errString)
		}
	}()

	// If our object is invalid, then skip it
	if null.GetBool(ins.IsValid) == false {
		panic("Invalid instruction. Should have stopped before linking!")
	}
	indent := ""
	for i := 0; i < ctx.level; i++ {
		indent += ".."
	}

	ctx.level++

	returnValue = ""
	switch *ins.Type {
	case tp.Instruction_BLOCK:
		fmt.Printf("%sInstruction block; scope value:\n%v\n", indent, scope.Value)
		returnValue = ctx.RunChildren(scope, ins)
		fmt.Printf("%sInstruction block returns: %v\n", indent, returnValue)
	case tp.Instruction_TEXT:
		fmt.Printf("%sInstruction text\n", indent)
		returnValue = null.GetString(ins.Value)
		fmt.Printf("%sInstruction text returns: %v\n", indent, returnValue)
	case tp.Instruction_LOCAL_VAR:
		fmt.Printf("%sEval local var\n", indent)
		name := null.GetString(ins.Value)
		vars := ctx.Vars()
		if len(ins.Arguments) > 0 {
			vars[name] = ctx.RunInstruction(scope, ins.Arguments[0])
		}
		fmt.Printf("%s%%%s: %v\n", indent, name, vars[name])
		if len(ins.Children) > 0 {
			ts := &whale.Scope{Value: ctx.Vars()[name]}
			ctx.RunChildren(ts, ins)
			vars[name] = ts.Value
		}
		fmt.Printf("%sreturn: %v\n", indent, vars[name])
		returnValue = vars[name]
	case tp.Instruction_IMPORT:
		obj := ctx.Objects[int(null.GetInt32(ins.ObjectId))]
		curFile := ctx.Filename
		ctx.Filename = null.GetString(obj.Name)
		ctx.RunChildren(scope, obj.Root)
		ctx.Filename = curFile
		fmt.Printf("%sImport: %q\n", indent, ctx.Filename)
	case tp.Instruction_FUNCTION_CALL:
		fun := ctx.Functions[int(null.GetInt32(ins.FunctionId))]
		fmt.Printf("%s%s\n", indent, fun.Name)
		fmt.Printf("%sscope.Value berfore loading vars:\n%v\n", indent, scope.Value)
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
		fmt.Printf("%s%s", indent, debugInfo)
		fmt.Printf("%sscope.Value before calling:\n%v\n", indent, scope.Value)

		if null.GetBool(fun.BuiltIn) {
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
				vars[null.GetString(arg.Name)] = args[i]
			}
			yieldBlock := &whale.YieldBlock{
				Ins:  ins,
				Vars: vars,
			}
			// PUSH!
			ctx.PushYieldBlock(yieldBlock)
			fmt.Printf("%srun children\n", indent)
			returnValue = ctx.RunChildren(scope, fun.Instruction)
			// POP!
			ctx.PopYieldBlock()
		}

		fmt.Printf("%sscope.Value:\n%v\n", indent, scope.Value)
		fmt.Printf("%sreturnValue:\n%v\n", indent, returnValue)
		fmt.Printf("%s%s done\n\n", indent, fun.Name)
	}
	ctx.level--

	return
}
