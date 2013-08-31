package protoface

type Slug interface {
	ProtoBuff
	IGetName() string
	IGetVersion() string
	IGetNthTransformer(index int) Transform
	ISetNthTransformer(index int, value Transform)
	IGetNthRrule(index int) RewriteRule
	ISetNthRrule(index int, value RewriteRule)
	IGetSslWhitelist() []string
	IGetCredentials() *Credentials

	WriteFile(string) error
	FindInstruction(string, int) int
}