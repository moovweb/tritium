package protoface

type Function interface {
	ProtoBuff
	IGetName() string
	IGetDescription() string
	IGetFilename() string
	IGetLineNumber() int32
	IGetNamespace() string
	IGetScopeTypeId() int32
	IGetScopeType() string
	IGetReturnTypeId() int32
	IGetReturnType() string
	IGetOpensTypeId() int32
	IGetOpensType() string
	IGetBuiltIn() bool
	//IGetArgs() []*Function_Argument
	IGetNthArg(index int) Function_Argument
	ISetNthArg(index int, value Function_Argument)
	IGetInstruction() Instruction
}

type Function_Argument interface {
	ProtoBuff
	IGetTypeId() int32
	IGetTypeString() string
	IGetName() string
}

type Function_Array interface {
	ProtoBuff
	// IGetFunctions() []*Function
	IGetNthFunction(index int) Function
	ISetNthFunction(index int, value Function)
}