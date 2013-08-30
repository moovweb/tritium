package protoface

type ScriptObject interface {
	ProtoBuff
	func IGetName() string
	func IGetRoot() *Instruction
	// func IGetFunctions() []*Function
	func IGetNthFunctions(index int) Function
	func ISetNthFunctions(index int, value Function)
	func IGetScopeTypeId() int32
	func IGetLinked() bool
	func IGetModule() string
}