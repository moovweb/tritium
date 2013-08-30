package proto

import(
	"tritium/protoface"
)

func (m *Instruction) IGetType() protoface.Instruction_InstructionType {
	if m != nil && m.Type != nil {
		return protoface.Instruction_InstructionType(*m.Type)
	}
	return 0
}

func (m *Instruction) IGetValue() string {
	if m != nil && m.Value != nil {
		return *m.Value
	}
	return ""
}

func (m *Instruction) IGetObjectId() int32 {
	if m != nil && m.ObjectId != nil {
		return *m.ObjectId
	}
	return 0
}

func (m *Instruction) IGetNthChild(index int) protoface.Instruction {
	return m.GetChildren()[index]
}

func (m *Instruction) ISetNthChild(index int, value protoface.Instruction) {
	m.GetChildren()[index] = value.(*Instruction)
}

func (m *Instruction) IGetNthArgument(index int) protoface.Instruction {
	return m.GetArguments()[index]
}

func (m *Instruction) ISetNthArgument(index int, value protoface.Instruction) {
	m.GetArguments()[index] = value.(*Instruction)
}

func (m *Instruction) IGetFunctionId() int32 {
	return m.GetFunctionId()
}

func (m *Instruction) IGetLineNumber() int32 {
	return m.GetLineNumber()
}

func (m *Instruction) IGetYieldTypeId() int32 {
	return m.GetYieldTypeId()
}

func (m *Instruction) IGetIsValid() bool {
	return m.GetIsValid()
}

func (m *Instruction) IGetNamespace() string {
	return m.GetNamespace()
}

func (m *Instruction) IGetTypeQualifier() string {
	return m.GetTypeQualifier()
}