package protoface

type ScriptObject interface {
	ProtoBuff
	IGetName() string
	IGetRoot() Instruction
	// IGetFunctions() []*Function
	IGetNthFunction(index int) Function
	ISetNthFunction(index int, value Function)
	IGetScopeTypeId() int32
	IGetLinked() bool
	IGetModule() string
}