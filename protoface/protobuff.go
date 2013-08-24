package protoface

type ProtoBuff interface {
	func Reset()
	func String()
	func ProtoMessage()
}