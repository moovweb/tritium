package tritium

import (
  "goprotobuf.googlecode.com/hg/proto"
  t "tritium/tokenizer"
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

func MakeText(text *t.Token) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_TEXT),
    Value: proto.String(text.Value),
    LineNumber: proto.Int32(text.LineNum),
  }
}

func MakePosition(pos *t.Token) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_POSITION),
    Value: proto.String(pos.Value),
    LineNumber: proto.Int32(pos.LineNum),
  }
}

func MakeImport(path *t.Token) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_IMPORT),
    Value: proto.String(path.Value),
    LineNumber: proto.Int32(path.LineNum),
  }
}

func MakeLocalVar(name *t.Token, val *Instruction, children []*Instruction) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_LOCAL_VAR),
    Value: proto.String(name.Value),
    Arguments: List(val),
    Children: children,
    LineNumber: proto.Int32(name.LineNum),
  }
}

func MakeFunctionCall(name *t.Token, args []*Instruction, body []*Instruction) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_FUNCTION_CALL),
    Value: proto.String(name.Value),
    Arguments: args,
    Children: body,
    LineNumber: proto.Int32(name.LineNum),
  }
}

func MakeBlock(children []*Instruction) *Instruction {
  return &Instruction {
    Type: NewInstruction_InstructionType(Instruction_BLOCK),
    Children: children,
    LineNumber: children[0].LineNumber,
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