package proto

import(
	"tritium/protoface"
)

func (m *RewriteRule) IGetProxy() string {
	return m.GetProxy()
}

func (m *RewriteRule) IGetUpstream() string {
	return m.GetUpstream()
}

func (m *RewriteRule) IGetDirection() protoface.RewriteRule_RuleDirection {
	return protoface.RewriteRule_RuleDirection(m.GetDirection())
}

func (m *RewriteRule) IGetCookieDomain() string {
	return m.GetCookieDomain()
}