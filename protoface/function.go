package protoface

type Function interface {
	ProtoBuff
	func IGetName() string
	func IGetDescription() string
	func IGetFilename() string
	func IGetLineNumber() int32
	func IGetNamespace() string
	func IGetScopeTypeId() int32
	func IGetScopeType() string
	func IGetReturnTypeId() int32
	func IGetReturnType() string
	func IGetOpensTypeId() int32
	func IGetOpensType() string
	func IGetBuiltIn() bool
	//func IGetArgs() []*Function_Argument
	func IGetNthArg(index int) Function_Argument
	func ISetNthArg(index int, value Function_Argument)
	func IGetInstruction() Instruction
}

type Function_Argument interface {
	ProtoBuff
	func IGetTypeID() int32
	func IGetTypeString() string
	func IGetName() string
}

type Function_Array interface {
	ProtoBuff
	// func IGetFunctions() []*Function
	func IGetNthFunction(index int) Function
	func ISetNthFunction(index int, value Function)
}