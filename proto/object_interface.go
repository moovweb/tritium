package proto

import(
	"slugtest/protoface"
	)

func (m *ScriptObject) IGetName() string {
	return m.GetName()
}

func (m *ScriptObject) IGetRoot() protoface.Instruction {
	return m.GetRoot()
}

// func (m *ScriptObject) IGetFunctions() []protoface.Function {
// 	return m.GetFunctions()
// }

func (m *ScriptObject) IGetNthFunctions(index int) protoface.Function {
	return m.GetFunctions()[index]
}

func (m *ScriptObject) IGetNthFunctions(index int, value protoface.Function) {
	m.GetFunctions()[index] = value
}

func (m *ScriptObject) IGetScopeTypeId() int32 {
	return m.GetScopeTypeId()
}

func (m *ScriptObject) IGetLinked() bool {
	return m.GetLinked()
}

func (m *ScriptObject) IGetModule() string {
	return m.GetModule()
}