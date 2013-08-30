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

// func (m *Slug) IGetTransformers() []protoface.Transform {
// 	return m.GetTransformers()
// }

func (m *Slug) IGetNthTransformer(index int) protoface.Transform {
	return m.GetTransformers()[index]
}

func (m *Slug) ISetNthTransformer(index int, value protoface.Transform) {
	m.GetTransformers()[index] = value
}

// func (m *Slug) IGetRrules() []protoface.RewriteRule {
// 	return m.GetRrules()
// }

func (m *Slug) IGetNthRrule(index int) protoface.RewriteRule {
	return m.GetRrules()[index]
}

func (m *Slug) IGetNthRrule(index int, value protoface.RewriteRule) {
	m.GetRrules()[index] = value
}

func (m *Slug) IGetSslWhitelist() []string {
	return m.GetSslWhitelist()
}

func (m *Slug) IGetCredentials() protoface.Credentials {
	return m.GetCredentials()
}