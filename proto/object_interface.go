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

func (m *ScriptObject) IGetFunctions() []protoface.Function {
	return m.GetFunctions()
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