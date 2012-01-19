package tritium

import (
  "goprotobuf.googlecode.com/hg/proto"
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



func List(instrs ...*Instruction) []*Instruction {
  return append(make([]*Instruction, 0), instrs...)
}

func FoldLeft(funcName string, base *Instruction, seq []*Instruction) (acc *Instruction) {
  for acc = base; len(seq) > 0; seq = seq[1:] {
    acc = MakeFunctionCall(funcName, List(acc, seq[0]), nil, *base.LineNumber)
  }
  return acc
}

func MakeText(text string, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_TEXT),
    Value: proto.String(text),
    LineNumber: proto.Int32(lineNum),
  }
}

func MakePosition(pos string, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_POSITION),
    Value: proto.String(pos),
    LineNumber: proto.Int32(lineNum),
  }
}

func MakeImport(path string, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_IMPORT),
    Value: proto.String(path),
    LineNumber: proto.Int32(lineNum),
  }
}

func MakeLocalVar(name string, val *Instruction, block []*Instruction, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_LOCAL_VAR),
    Value: proto.String(name),
    Arguments: List(val),
    Children: block,
    LineNumber: proto.Int32(lineNum),
  }
}

func MakeFunctionCall(name string, args []*Instruction, block []*Instruction, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_FUNCTION_CALL),
    Value: proto.String(name),
    Arguments: args,
    Children: block,
    LineNumber: proto.Int32(lineNum),
  }
}

func MakeBlock(children []*Instruction, lineNum int32) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_BLOCK),
    Children: children,
    LineNumber: proto.Int32(lineNum),
  }
}

func (ins *Instruction) GetFunction(pkg *Package) (*Function) {
	funId := proto.GetInt32(ins.FunctionId)
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