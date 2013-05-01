package proto

import (
	"strings"
)

import (
	"butler/null"
	pb "code.google.com/p/goprotobuf/proto"
)

func (ins *Instruction) Iterate(itFunc func(*Instruction)) {
	itFunc(ins)
	if ins.Children == nil {
		return
	}
	for _, child := range ins.Children {
		child.Iterate(itFunc)
	}
}

func (ins *Instruction) IterateAll(itFunc func(*Instruction)) {
	if ins != nil {
		itFunc(ins)
		for _, child := range ins.Arguments {
			child.IterateAll(itFunc)
		}
		for _, child := range ins.Children {
			child.IterateAll(itFunc)
		}
	}
}

func ListInstructions(instrs ...*Instruction) []*Instruction {
	return append(make([]*Instruction, 0), instrs...)
}

func FoldLeft(funcName string, base *Instruction, seq []*Instruction) (acc *Instruction) {
	for acc = base; len(seq) > 0; seq = seq[1:] {
		acc = MakeFunctionCall(funcName, ListInstructions(acc, seq[0]), nil, *base.LineNumber)
	}
	return acc
}

func MakeText(text string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_TEXT.Enum(),
		Value:      pb.String(text),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakePosition(pos string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_POSITION.Enum(),
		Value:      pb.String(pos),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeComment(comment string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_COMMENT.Enum(),
		Value:      pb.String(comment),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeImport(path string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_IMPORT.Enum(),
		Value:      pb.String(path),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeLocalVar(name string, val *Instruction, block []*Instruction, lineNum int32) *Instruction {
	node := &Instruction{
		Type:       Instruction_LOCAL_VAR.Enum(),
		Value:      pb.String(name),
		Children:   block,
		LineNumber: pb.Int32(lineNum),
	}
	if val == nil {
		node.Arguments = nil
	} else {
		node.Arguments = ListInstructions(val)
	}
	return node
}

func MakeFunctionCall(name string, args []*Instruction, block []*Instruction, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_FUNCTION_CALL.Enum(),
		Value:      pb.String(name),
		Arguments:  args,
		Children:   block,
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeBlock(children []*Instruction, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_BLOCK.Enum(),
		Children:   children,
		LineNumber: pb.Int32(lineNum),
	}
}

func (ins *Instruction) GetFunction(pkg *Package) *Function {
	funId := null.GetInt32(ins.FunctionId)
	return pkg.Functions[int(funId)]
}

func (instr *Instruction) Append(more ...*Instruction) {
	if instr.Children == nil {
		instr.Children = more
	} else {
		instr.Children = append(instr.Children, more...)
	}
}

func (instr *Instruction) ConcatList(more []*Instruction) {
	instr.Append(more...)
}

func (instr *Instruction) ConcatBlock(more *Instruction) {
	instr.Append(more.Children...)
}

func (instr *Instruction) Namespaces() (nsList []string) {
	ns := instr.GetNamespace()
	if len(ns) == 0 {
		nsList = make([]string, 1)
		nsList[0] = "tritium"
	} else {
		nsList = strings.Split(ns, ",")
	}
	return
}