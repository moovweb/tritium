package protoface

type ScriptObject interface {
	ProtoBuff
	IGetName() string
	IGetRoot() Instruction
	IGetNthFunction(index int) Function
	ISetNthFunction(index int, value Function)
	IGetScopeTypeId() int32
	IGetLinked() bool
	IGetModule() string
	IGetLayer() string

	Imports() []string
}