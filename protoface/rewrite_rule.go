package protoface


type RewriteRule interface {
	ProtoBuff
	IGetProxy() string
	IGetUpstream() string
	IGetDirection() int32
	IGetCookieDomain() string
}