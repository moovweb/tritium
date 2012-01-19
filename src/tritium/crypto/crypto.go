package crypto

func Encrypt(data []byte) []byte{
	for index, b := range(data) {
		data[index] = rot13(b)
	}
	return data
}

func Decrypt(data []byte) []byte{
	for index, b := range(data) {
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