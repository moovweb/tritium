package protoface

type Type interface {
	ProtoBuff
	func GetName() string
	func GetImplements() int32
}

type Package interface {
	ProtoBuff
	func GetName() string
	func GetFunctions() []*Function
	func GetTypes() []*Type
	func GetDependencies() []string
	func GetPath() string
}