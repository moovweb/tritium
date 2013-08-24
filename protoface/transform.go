package protoface

type Transform interface {
	ProtoBuff
	func GetObjects() []*ScriptObject
	func GetPkg() *Package
}