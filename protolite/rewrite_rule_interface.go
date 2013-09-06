package proto

func (m *RewriteRule) IGetProxy() string {
	return m.GetProxy()
}

func (m *RewriteRule) IGetUpstream() string {
	return m.GetUpstream()
}

func (m *RewriteRule) IGetDirection() int32 {
	return m.GetDirection()
}

func (m *RewriteRule) IGetCookieDomain() string {
	return m.GetCookieDomain()
}