package protoface

type Slug interface {
	ProtoBuff
	func GetName() string
	func GetVersion() string
	func GetTransformers() []*Transform
	func GetRrules() []*RewriteRule
	func GetSslWhitelist() []string
	func GetCredentials() *Credentials
}