package proto

import(
	"tritium/protoface"
)

func (m *Function) IGetName() string {
	return m.GetName()
}

func (m *Function) IGetDescription() string {
	return m.GetDescription()
}

func (m *Function) IGetFilename() string {
	return m.GetFilename()
}

func (m *Function) IGetLineNumber() int32 {
	return m.GetLineNumber()
}


func (m *Function) IGetNamespace() string {
	return m.GetNamespace()
}

func (m *Function) IGetScopeTypeId() int32 {
	return m.GetScopeTypeId()
}

func (m *Function) IGetScopeType() string {
	return m.GetScopeType()
}

func (m *Function) IGetReturnTypeId() int32 {
	return m.GetReturnTypeId()
}

func (m *Function) IGetReturnType() string {
	return m.GetReturnType()
}

func (m *Function) IGetOpensTypeId() int32 {
	return m.GetOpensTypeId()
}

func (m *Function) IGetOpensType() string {
	return m.GetOpensType()
}

func (m *Function) IGetBuiltIn() bool {
	return m.GetBuiltIn()
}

func (m *Function) IGetNthArg(index int) protoface.Function_Argument {
	return m.GetArgs()[index]
}

func (m *Function) ISetNthArg(index int, value protoface.Function_Argument) {
	m.GetArgs()[index] = value.(*Function_Argument)
}

func (m *Function) INumArgs() int {
	return len(m.Args)
}

func (m *Function) IGetInstruction() protoface.Instruction {
	return m.GetInstruction()
}

func (m *Function_Argument) IGetTypeId() int32 {
	return m.GetTypeId()
}

func (m *Function_Argument) IGetTypeString() string {
	return m.GetTypeString()
}

func (m *Function_Argument) IGetName() string {
	return m.GetName()
}

func (m *FunctionArray) GetNthFunction(index int) protoface.Function{
	return m.GetFunctions()[index]
}

func (m *FunctionArray) SetNthFunction(index int, value protoface.Function) {
	m.GetFunctions()[index] = value.(*Function)
}