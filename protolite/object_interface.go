package proto

import(
	"tritium/protoface"
)

func (m *ScriptObject) IGetName() string {
	return ""
}

func (m *ScriptObject) IGetRoot() protoface.Instruction {
	return m.GetRoot()
}

func (m *ScriptObject) IGetNthFunction(index int) protoface.Function {
	return nil
}

func (m *ScriptObject) ISetNthFunction(index int, value protoface.Function) {
	return
}

func (m *ScriptObject) IGetScopeTypeId() int32 {
	return 0
}

func (m *ScriptObject) IGetLinked() bool {
	return false
}

func (m *ScriptObject) IGetModule() string {
	return m.GetModule()
}

func (m *ScriptObject) IGetLayer() string {
	return m.GetModule()
}