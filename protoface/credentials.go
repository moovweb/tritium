package protoface

type Credentials interface {
	ProtoBuff
	func GetUser() string
	func GetPassword() string
	func GetBase64() string
}