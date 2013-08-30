package protoface

type Transform interface {
	ProtoBuff
	// func GetObjects() []*ScriptObject
	func IGetNthObject(n int) ScriptObject
	func ISetNthObject(n int, s ScriptObject)
	func GetPkg() *Package
}