package proto

func (m *Credentials) IGetUser() string {
	return m.GetUser()
}

func (m *Credentials) IGetPassword() string {
	return m.GetPassword()
}

func (m *Credentials) IGetBase64() string {
	return m.GetBase64()
}