package proto

import (
	"strings"
)

import (
	pb "code.google.com/p/goprotobuf/proto"
	"tritium/protoface"
	"tritium/constants"
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
	for _, child := range ins.Arguments {
		child.IterateAll(itFunc)
	}
	for _, child := range ins.Children {
		child.IterateAll(itFunc)
	}
}

func ListInstructions(instrs ...*Instruction) []*Instruction {
	return append(make([]*Instruction, 0), instrs...)
}

func FoldLeft(funcName string, base *Instruction, seq []*Instruction) (acc *Instruction) {
	// for acc = base; len(seq) > 0; seq = seq[1:] {
	// 	acc = MakeFunctionCall(funcName, ListInstructions(acc, seq[0]), nil, *base.LineNumber)
	// }
	// return acc
	return nil
}

func MakeText(text string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       pb.Int32(constants.Instruction_TEXT),
		Value:      pb.String(text),
		// LineNumber: pb.Int32(lineNum),
	}
}

func MakePosition(pos string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       pb.Int32(constants.Instruction_POSITION),
		Value:      pb.String(pos),
		// LineNumber: pb.Int32(lineNum),
	}
}

func MakeComment(comment string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       pb.Int32(constants.Instruction_COMMENT),
		Value:      pb.String(comment),
		// LineNumber: pb.Int32(lineNum),
	}
}

func MakeImport(path string, lineNum int32) *Instruction {
	return &Instruction{
		Type:       pb.Int32(constants.Instruction_IMPORT),
		Value:      pb.String(path),
		// LineNumber: pb.Int32(lineNum),
	}
}

func MakeLocalVar(name string, val *Instruction, block []*Instruction, lineNum int32) *Instruction {
	node := &Instruction{
		Type:       pb.Int32(constants.Instruction_LOCAL_VAR),
		Value:      pb.String(name),
		Children:   block,
		// LineNumber: pb.Int32(lineNum),
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
		Type:       pb.Int32(constants.Instruction_FUNCTION_CALL),
		Value:      pb.String(name),
		Arguments:  args,
		Children:   block,
		// LineNumber: pb.Int32(lineNum),
	}
}

func MakeBlock(children []*Instruction, lineNum int32) *Instruction {
	return &Instruction{
		Type:       pb.Int32(constants.Instruction_BLOCK),
		Children:   children,
		// LineNumber: pb.Int32(lineNum),
	}
}

func (ins *Instruction) GetFunction(pkg2 protoface.Package) protoface.Function {
	pkg := pkg2.(*Package)
	funId := ins.GetFunctionId()
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
	ns := instr.IGetNamespace()
	if len(ns) == 0 {
		nsList = make([]string, 1)
		nsList[0] = "tritium"
	} else {
		nsList = strings.Split(ns, ",")
	}
	return
}