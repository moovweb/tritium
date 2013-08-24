package protoface

type ScriptObject interface {
	ProtoBuff
	func GetName() string
	func GetRoot() *Instruction
	func GetFunctions() []*Function
	func GetScopeTypeId() int32
	func GetLinked() bool
	func GetModule() string
}