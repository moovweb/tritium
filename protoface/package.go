package protoface

type Type interface {
	ProtoBuff
	IGetName() string
	IGetImplements() int32
}

type Package interface {
	ProtoBuff
	IGetName() string
	// IGetFunctions() []*Function
	IGetNthFunction(index int) Function
	ISetNthFunction(index int, value Function)
	// IGetTypes() []*Type
	IGetNthType(index int) Type
	ISetNthType(index int, value Type)
	IGetDependencies() []string
	IGetPath() string
}