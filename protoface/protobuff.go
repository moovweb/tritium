package protoface

type ProtoBuff interface {
	Reset()
	String() string
	ProtoMessage()
}