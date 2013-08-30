package protoface

type RewriteRule_RuleDirection int32

type RewriteRule interface {
	ProtoBuff
	IGetProxy() string
	IGetUpstream() string
	IGetDirection() RewriteRule_RuleDirection
	IGetCookieDomain() string
}