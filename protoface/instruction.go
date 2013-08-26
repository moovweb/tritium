package protoface

type Instruction_InstructionType int32

type Instruction struct {
	ProtoBuff
	func GetType() Instruction_InstructionType
	func GetValue() string
	func GetObjectId() int32
	func GetChildren() []*Instruction
	func GetArguments() []*Instruction
	func GetFunctionId() int32
	func GetLineNumber() int32
	func GetYieldTypeId() int32
	func GetIsValid() bool
	func GetNameSpace() string
	func GetTypeQualifier() string
}