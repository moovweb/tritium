package proto

import(
	"slugtest/protoface"
	)

func (m *Instruction) IGetType() protoface.Instruction_InstructionType {
	return m.GetType()
}

func (m *Instruction) IGetValue() string {
	return m.GetValue()
}

func (m *Instruction) IGetObjectId() int32 {
	return m.GetObjectId()
}

func (m *Instruction) IGetChildren() []protoface.Instruction {
	return m.GetGhildren()
}

func (m *Instruction) IGetArguments() []protoface.Instruction {
	return m.GetArguments()
}

func (m *Instruction) IGetFunctinoId() int32 {
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