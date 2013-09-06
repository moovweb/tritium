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
	IGetNthArg(index int) Function_Argument
	ISetNthArg(index int, value Function_Argument)
	INumArgs() int
	IGetInstruction() Instruction

	Stub(pkg Package) string
	FullSignature(pkg Package) string
	BaseSignature(pkg Package) string
	Clone() Function
	NameString() string
	ReturnTypeString(pkg Package) string
	ScopeTypeString(pkg Package) string
	OpensTypeString(pkg Package) string
	DebugInfo(pkg Package) string
	RelocateCallsBy(offset int)
	RelocateTypes(relocations map[int]int)
}

type Function_Argument interface {
	ProtoBuff
	IGetTypeId() int32
	IGetTypeString() string
	IGetName() string
}

type Function_Array interface {
	ProtoBuff
	IGetNthFunction(index int) Function
	ISetNthFunction(index int, value Function)
}