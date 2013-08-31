package protoface

type Instruction_InstructionType int32

type Instruction interface {
	ProtoBuff
	IGetType() Instruction_InstructionType
	IGetValue() string
	IGetObjectId() int32
	IGetNthChild(index int) Instruction
	ISetNthChild(index int, value Instruction)
	IGetNthArgument(index int) Instruction
	ISetNthArgument(index int, value Instruction)
	IGetFunctionId() int32
	IGetLineNumber() int32
	IGetYieldTypeId() int32
	IGetIsValid() bool
	IGetNamespace() string
	IGetTypeQualifier() string

	Iterate(f func(Instruction))
	IterateAll(f func(Instruction))
	GetFunction(pkg Package) Function
	Namespaces() []string
}