package protoface

type Slug interface {
	ProtoBuff
	IGetName() string
	IGetVersion() string
	// IGetTransformers() []*Transform
	IGetNthTransformer(index int) Transform
	ISetNthTransformer(index int, value Transform)
	// IGetRrules() []*RewriteRule
	IGetNthRrule(index int) RewriteRule
	ISetNthRrule(index int, value RewriteRule)
	IGetSslWhitelist() []string
	IGetCredentials() *Credentials
}