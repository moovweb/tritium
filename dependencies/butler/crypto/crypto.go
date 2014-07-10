package crypto

import (
  "bytes"
  "crypto/hmac"
  "crypto/md5"
  "crypto/sha1"
  "encoding/base64"
  )

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

func GetMD5HashBase64(stuff []byte) string {
  return base64.StdEncoding.EncodeToString(GetMD5Hash(stuff))
}

func GetMD5Hash(stuff []byte) []byte {
  md5Hash := md5.New()
  md5Hash.Write(stuff)
  return md5Hash.Sum(nil)
}

func GetSHA1HmacBase64(secretKey, stringToSign string) string {
  return base64.StdEncoding.EncodeToString(GetSHA1Hmac(secretKey, stringToSign))
}

func GetSHA1Hmac(secretKey, stringToSign string) []byte {
  mac := hmac.New(sha1.New, bytes.NewBufferString(secretKey).Bytes())
  bytesToSign := bytes.NewBufferString(stringToSign).Bytes()
  mac.Write(bytesToSign)
  return mac.Sum(nil)
}