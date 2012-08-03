package proto

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
	itFunc(ins)
	if ins.Arguments != nil {
		for _, child := range ins.Arguments {
			child.Iterate(itFunc)
		}
	}
	if ins.Children != nil {
		for _, child := range ins.Children {
			child.Iterate(itFunc)
		}
	}
}

func ListInstructions(instrs ...*Instruction) []*Instruction {
	return append(make([]*Instruction, 0), instrs...)
}

func FoldLeft(funcName string, base *Instruction, seq []*Instruction) (acc *Instruction) {
	for acc = base; len(seq) > 0; seq = seq[1:] {
		acc = MakeFunctionCall(funcName, ListInstructions(acc, seq[0]), nil, *base.FileName, *base.LineNumber)
	}
	return acc
}

func MakeText(text string, fileName string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_TEXT.Enum(),
		Value:      pb.String(text),
		FileName:   pb.String(fileName),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakePosition(pos string, fileName string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_POSITION.Enum(),
		Value:      pb.String(pos),
		FileName:   pb.String(fileName),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeComment(comment string, fileName string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_COMMENT.Enum(),
		Value:      pb.String(comment),
		FileName:   pb.String(fileName),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeImport(path string, fileName string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_IMPORT.Enum(),
		Value:      pb.String(path),
		FileName:   pb.String(fileName),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeLocalVar(name string, val *Instruction, block []*Instruction, fileName string, lineNum int32) *Instruction {
	node := &Instruction{
		Type:       Instruction_LOCAL_VAR.Enum(),
		Value:      pb.String(name),
		Children:   block,
		FileName:   pb.String(fileName),
		LineNumber: pb.Int32(lineNum),
	}
	if val == nil {
		node.Arguments = nil
	} else {
		node.Arguments = ListInstructions(val)
	}
	return node
}

func MakeFunctionCall(name string, args []*Instruction, block []*Instruction, fileName string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_FUNCTION_CALL.Enum(),
		Value:      pb.String(name),
		Arguments:  args,
		Children:   block,
		FileName:   pb.String(fileName),
		LineNumber: pb.Int32(lineNum),
	}
}

func MakeBlock(children []*Instruction, fileName string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       Instruction_BLOCK.Enum(),
		Children:   children,
		FileName:   pb.String(fileName),
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
