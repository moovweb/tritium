package proto

import(
	"tritium/protoface"
)

func (m *Instruction) IGetType() int32 {
	if m != nil && m.Type != nil {
		return *m.Type
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

func (m *Instruction) INumChildren() int {
	return len(m.Children)
}

func (m *Instruction) IGetNthArgument(index int) protoface.Instruction {
	return m.GetArguments()[index]
}

func (m *Instruction) ISetNthArgument(index int, value protoface.Instruction) {
	m.GetArguments()[index] = value.(*Instruction)
}

func (m *Instruction) INumArgs() int {
	return len(m.Arguments)
}

func (m *Instruction) IGetFunctionId() int32 {
	return m.GetFunctionId()
}

func (m *Instruction) IGetLineNumber() int32 {
	return 0
}

func (m *Instruction) IGetYieldTypeId() int32 {
	return 0
}

func (m *Instruction) IGetIsValid() bool {
	return false
}

func (m *Instruction) IGetNamespace() string {
	return ""
}

func (m *Instruction) IGetTypeQualifier() string {
	return ""
}

func (m *Instruction) IGetIsUserCalled() bool {
	return false
}