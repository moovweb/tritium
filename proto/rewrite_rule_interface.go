package proto

import(
	"slugtest/protoface"
	)

func (m *RewriteRule) IGetProxy() string {
	return m.GetProxy()
}

func (m *RewriteRule) IGetUpstream() string {
	return m.GetUpStream()
}

func (m *RewriteRule) IGetDirection() protoface.RewriteRule_RuleDirection {
	return m.GetDirection()
}

func (m *RewriteRule) IGetCookieDomain() string {
	return m.GetCookieDomain()
}