package proto

import(
	"tritium/protoface"
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

func (m *ScriptObject) IGetNthFunction(index int) protoface.Function {
	return m.GetFunctions()[index]
}

func (m *ScriptObject) ISetNthFunction(index int, value protoface.Function) {
	m.GetFunctions()[index] = value.(*Function)
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

func (m *ScriptObject) IGetLayer() string {
	return m.GetModule()
}