package protoface

type Transform interface {
	ProtoBuff
	// GetObjects() []*ScriptObject
	IGetNthObject(n int) ScriptObject
	ISetNthObject(n int, s ScriptObject)
	IGetPkg() Package
	IGetLayers() string
}
