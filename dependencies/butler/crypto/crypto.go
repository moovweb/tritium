package crypto 
// Temporary dummy encryption, we should probably get legit encryption going
// eventually.  This will be a nice wrapper for whatever we need to do.
func Encrypt(data []byte) []byte {
  for index, b := range data {
    data[index] = rot13(b)
  }
  return data
}