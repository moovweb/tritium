package protoface

type Function interface {
	ProtoBuff
	func GetName() string
	func GetDescription() string
	func GetFilename() string
	func GetLineNumber() int32
	func GetNamespace() string
	func GetScopeTypeId() int32
	func GetScopeType() string
	func GetReturnTypeId() int32
	func GetReturnType() string
	func GetOpensTypeId() int32
	func GetOpensType() string
	func GetBuiltIn() bool
	func GetArgs() []*Function_Argument
	func GetInstruction() *Instruction
}

type Function_Argument interface {
	ProtoBuff
	func GetTypeID() int32
	func GetTypeString() string
	func GetName() string
}

type Function_Array interface {
	ProtoBuff
	func GetFunctions() []*Function
}