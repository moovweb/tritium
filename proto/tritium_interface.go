package proto

import(
	"slugtest/protoface"
	)

func (m *Transform) IGetObjects() [] protoface.ScriptObject {
	return m.GetObjects()
}

func (m *Transform) IGetPkg() protoface.Package {
	return m.GetPkg()
}