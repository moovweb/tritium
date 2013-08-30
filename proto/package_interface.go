package proto

import(
	"tritium/protoface"
)

func (m *Type) IGetName() string {
	return m.GetName()
}

func (m *Type) IGetImplements() int32 {
	return m.GetImplements()
}

func (m *Package) IGetName() string {
	return m.GetName()
}

// func (m *Package) IGetFunctions() []protoface.Function {
// 	return m.GetFunctions()
// }

func (m *Package) IGetNthFunction(index int) protoface.Function {
	return m.GetFunctions()[index]
}

func (m *Package) ISetNthFunction(index int, value protoface.Function) {
	m.GetFunctions()[index] = value.(*Function)
}

// func (m *Package) IGetTypes() []protoface.Type {
// 	return m.GetTypes()
// }

func (m *Package) IGetNthType(index int) protoface.Type {
	return m.GetTypes()[index]
}

func (m *Package) ISetNthType(index int, value protoface.Type) {
	m.GetTypes()[index] = value.(*Type)
}

func (m *Package) IGetDependencies() []string {
	return m.GetDependencies()
}

func (m *Package) IGetPath() string {
	return m.GetPath()
}