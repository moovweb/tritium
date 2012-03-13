package whale

import (
	"gokogiri/xml"
	"fmt"
	tp "athena/src/athena/proto"
	proto "goprotobuf.googlecode.com/hg/proto"
)

func (ctx *Ctx) matchShouldContinue() (result bool) {
	if len(ctx.MatchShouldContinue) > 0 {
		result = ctx.MatchShouldContinue[len(ctx.MatchShouldContinue)-1]
	} else {
		result = false
	}
	return
}

func (ctx *Ctx) matchTarget() string {
	return ctx.MatchStack[len(ctx.MatchStack)-1]
}

func (ctx *Ctx) yieldBlock() *YieldBlock {
	return ctx.Yields[(len(ctx.Yields) - 1)]
}

func (ctx *Ctx) vars() map[string]interface{} {
	return ctx.yieldBlock().Vars
}

func (ctx *Ctx) fileAndLine(ins *tp.Instruction) string {
	lineNum := fmt.Sprintf("%d", proto.GetInt32(ins.LineNumber))
	return (ctx.filename + ":" + lineNum)
}

func MoveFunc(what, where xml.Node, position Position) {
	switch position {
	case BOTTOM:
		where.AddChild(what)
	case TOP:
		firstChild := where.FirstChild()
		if firstChild == nil {
			where.AddChild(what)
		} else {
			firstChild.InsertBefore(what)
		}
	case BEFORE:
		where.InsertBefore(what)
	case AFTER:
		where.InsertAfter(what)
	}
}

func (ctx *Ctx) UsePackage(pkg *tp.Package) {
	ctx.Types = make([]string, len(pkg.Types))
	for i, t := range pkg.Types {
		ctx.Types[i] = proto.GetString(t.Name)
	}

	ctx.Functions = make([]*Function, len(pkg.Functions))
	for i, f := range pkg.Functions {
		name := proto.GetString(f.Name)
		for _, a := range f.Args {
			typeString := ctx.Types[int(proto.GetInt32(a.TypeId))]
			name = name + "." + typeString
		}
		fun := &Function{
			Name:     name,
			Function: f,
		}
		ctx.Functions[i] = fun
	}
}
