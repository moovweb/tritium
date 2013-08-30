package protoface

type Type interface {
	ProtoBuff
	func IGetName() string
	func IGetImplements() int32
}

type Package interface {
	ProtoBuff
	func IGetName() string
	// func IGetFunctions() []*Function
	func IGetNthFunction(index int) Function
	func ISetNthFunction(index int, value Function)
	// func IGetTypes() []*Type
	func IGetNthType(index int) Type
	func ISetNthType(index int, value Type)
	func IGetDependencies() []string
	func IGetPath() string
}