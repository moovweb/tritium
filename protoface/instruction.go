package protoface

type Instruction_InstructionType int32

type Instruction struct {
	ProtoBuff
	func IGetType() Instruction_InstructionType
	func IGetValue() string
	func IGetObjectId() int32
	// func IGetChildren() []*Instruction
	func IGetNthChild(index int) Instruction
	func ISetNthChild(index int, value Instruction)
	// func IGetArguments() []*Instruction
	func IGetNthArgument(index int) Instruction
	func ISetNthArgument(index int, value Instruction)
	func IGetFunctionId() int32
	func IGetLineNumber() int32
	func IGetYieldTypeId() int32
	func IGetIsValid() bool
	func IGetNameSpace() string
	func IGetTypeQualifier() string
}