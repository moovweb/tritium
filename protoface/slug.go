package protoface

import (
	"time"
)

type Slug interface {
	ProtoBuff
	IGetName() string
	IGetVersion() string
	IGetNthTransformer(index int) Transform
	ISetNthTransformer(index int, value Transform)
	IGetNthRrule(index int) RewriteRule
	ISetNthRrule(index int, value RewriteRule)
	IGetRrules() []RewriteRule
	IGetSslWhitelist() []string
	IGetCredentials() Credentials
	IGetActiveLayers() []string

	WriteFile(string) error
	FindInstruction(string, int) int
}

type SlugInfo interface {
	Reset()
	IGetSlug() Slug
	IGetSize() int
	Size() int
	IGetTimestamp() time.Time
	IGetCustomer() string
	IGetProject() string
	IGetPath() string
}
