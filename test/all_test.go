package test

import "testing"

func TestBase(t *testing.T) {
	RunTestSuite("packages/base", t)
}

func TestLibXML(t *testing.T) {
	RunTestSuite("packages/libxml", t)
}

func TestURL(t *testing.T) {
	RunTestSuite("packages/url", t)
}

func TestJsonLib(t *testing.T) {
	RunTestSuite("packages/jsonlib", t)
}

func BenchmarkBase(b *testing.B) {
	RunBenchmarkSuite("packages/base", b)
}

func BenchmarkLibXML(b *testing.B) {
	RunBenchmarkSuite("packages/libxml", b)
}

func BenchmarkURL(b *testing.B) {
	RunBenchmarkSuite("packages/url", b)
}

func BenchmarkJsonLib(b *testing.B) {
	RunBenchmarkSuite("packages/jsonlib", b)
}
