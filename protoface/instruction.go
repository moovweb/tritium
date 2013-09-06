package protoface

type Instruction interface {
	ProtoBuff
	IGetType() int32
	IGetValue() string
	IGetObjectId() int32
	IGetNthChild(index int) Instruction
	ISetNthChild(index int, value Instruction)
	INumChildren() int
	IGetNthArgument(index int) Instruction
	ISetNthArgument(index int, value Instruction)
	INumArgs() int
	IGetFunctionId() int32
	IGetLineNumber() int32
	IGetYieldTypeId() int32
	IGetIsValid() bool
	IGetNamespace() string
	IGetTypeQualifier() string
	IGetIsUserCalled() bool

	// Iterate(f func(Instruction))
	// IterateAll(f func(Instruction))
	GetFunction(pkg Package) Function
	Namespaces() []string
}