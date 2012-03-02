package proto

import (
  pb "goprotobuf.googlecode.com/hg/proto"
)

func (ins *Instruction) Iterate(itFunc func(*Instruction)) {
	itFunc(ins)
	if ins.Children == nil {
		return
	}
	for _, child := range(ins.Children) {
		child.Iterate(itFunc)
	}
}

func (ins *Instruction) IterateAll(itFunc func(*Instruction)) {
	itFunc(ins)
	if ins.Arguments != nil {
		for _, child := range(ins.Arguments) {
			child.Iterate(itFunc)
		}
	}
	if ins.Children != nil {
		for _, child := range(ins.Children) {
			child.Iterate(itFunc)
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
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_TEXT),
    Value: pb.String(text),
    LineNumber: pb.Int32(lineNum),
  }
}

func MakePosition(pos string, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_POSITION),
    Value: pb.String(pos),
    LineNumber: pb.Int32(lineNum),
  }
}

func MakeComment(comment string, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_COMMENT),
    Value: pb.String(comment),
    LineNumber: pb.Int32(lineNum),
  }
}

func MakeImport(path string, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_IMPORT),
    Value: pb.String(path),
    LineNumber: pb.Int32(lineNum),
  }
}

func MakeLocalVar(name string, val *Instruction, block []*Instruction, lineNum int32) *Instruction {
  node := &Instruction {
    Type: NewInstruction_InstructionType(Instruction_LOCAL_VAR),
    Value: pb.String(name),
    Children: block,
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
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_FUNCTION_CALL),
    Value: pb.String(name),
    Arguments: args,
    Children: block,
    LineNumber: pb.Int32(lineNum),
  }
}

func MakeBlock(children []*Instruction, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_BLOCK),
    Children: children,
    LineNumber: pb.Int32(lineNum),
  }
}

func (ins *Instruction) GetFunction(pkg *Package) (*Function) {
	funId := pb.GetInt32(ins.FunctionId)
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

func (instr *Instruction) ConcatBlock (more *Instruction) {
  instr.Append(more.Children...)
}