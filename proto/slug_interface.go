package proto

import(
	"slugtest/protoface"
	)

func (m *Slug) IGetName() string {
	return m.GetName()
}

func (m *Slug) IGetVersion() string {
	return m.GetVersion()
}

func (m *Slug) IGetTransformers() []protoface.Transform {
	return m.GetTransformers()
}

func (m *Slug) IGetRrules() []protoface.RewriteRule {
	return m.GetRrules()
}

func (m *Slug) IGetSslWhitelist() []string {
	return m.GetSslWhitelist()
}

func (m *Slug) IGetCredentials() protoface.Credentials {
	return m.GetCredentials()
}