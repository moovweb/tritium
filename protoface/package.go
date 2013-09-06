package protoface

type Type interface {
	ProtoBuff
	IGetName() string
	IGetImplements() int32
}

type Package interface {
	ProtoBuff
	IGetName() string
	IGetNthFunction(index int) Function
	ISetNthFunction(index int, value Function)
	IGetFunctions() []Function
	IGetNthType(index int) Type
	ISetNthType(index int, value Type)
	IGetTypes() []Type
	IGetDependencies() []string
	IGetPath() string

	GetTypeId(string) int
	GetTypeName(int32) string
	GetProtoTypeId(*string) *int32
	FindDescendantType(int32) int
	AncestorOf(int32, int32) bool
}