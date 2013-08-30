package protoface

type Credentials interface {
	ProtoBuff
	IGetUser() string
	IGetPassword() string
	IGetBase64() string
}