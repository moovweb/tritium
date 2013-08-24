package protoface

type RewriteRule_RuleDirection int32

type RewriteRule interface {
	ProtoBuff
	func GetProxy() string
	func GetUpstream() string
	func GetDirection() RewriteRule_RuleDirection
	func GetCookieDomain() string
}