package protoface

type Slug interface {
	ProtoBuff
	func IGetName() string
	func IGetVersion() string
	// func IGetTransformers() []*Transform
	func IGetNthTransformer(index int) Transform
	func ISetNthTransformer(index int, value Transform)
	// func IGetRrules() []*RewriteRule
	func IGetNthRrule(index int) RewriteRule
	func ISetNthRrule(index int, value RewriteRule)
	func IGetSslWhitelist() []string
	func IGetCredentials() *Credentials
}