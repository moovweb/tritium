package crypto

// Temporary dummy encryption, we should probably get legit encryption going
// eventually.  This will be a nice wrapper for whatever we need to do.
func Encrypt(data []byte) []byte {
	for index, b := range data {
		data[index] = rot13(b)
	}
	return data
}

func Decrypt(data []byte) []byte {
	for index, b := range data {
		data[index] = rot13(b)
	}
	return data
}

func rot13(b byte) byte {
	if 'a' <= b && b <= 'z' {
		b = 'a' + ((b-'a')+13)%26
	}
	if 'A' <= b && b <= 'Z' {
		b = 'A' + ((b-'A')+13)%26
	}
	return b
}
