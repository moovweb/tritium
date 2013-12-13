package proto

import (
	"tritium/protoface"
)

func (m *Transform) IGetNthObject(n int) protoface.ScriptObject {
	return m.GetObjects()[n]
}

func (m *Transform) ISetNthObject(n int, s protoface.ScriptObject) {
	m.GetObjects()[n] = s.(*ScriptObject)
}

func (m *Transform) IGetPkg() protoface.Package {
	return m.GetPkg()
}

func (m *Transform) IGetLayers() string {
	return m.GetLayers()
}
