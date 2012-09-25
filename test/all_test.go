package test

import "testing"


func TestBase(t *testing.T) {
	RunTestSuite("packages/base/test/examples/multi", t)
}

// func TestLibXML(t *testing.T) {
// 	RunTestSuite("packages/libxml", t)
// }

// func BenchmarkBase(b *testing.B) {
// 	RunBenchmarkSuite("packages/base", b)
// }

// func BenchmarkLibXML(b *testing.B) {
// 	RunBenchmarkSuite("packages/libxml", b)
// }
