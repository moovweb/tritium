package test

import "testing"

func TestBase(t *testing.T) {
	RunTestSuite("packages/base", t) // legacy
	RunTestSuite("engine_tests/tritium/base", t)
}

func TestLibXML(t *testing.T) {
	RunTestSuite("packages/libxml", t) // legacy
	RunTestSuite("engine_tests/tritium/libxml", t)
}

func TestURL(t *testing.T) {
	RunTestSuite("packages/url", t) //legacy
	RunTestSuite("engine_tests/url", t)
}

func TestJsonLib(t *testing.T) {
	RunTestSuite("packages/json", t) // legacy
	RunTestSuite("engine_tests/json", t)
}

func BenchmarkBase(b *testing.B) {
	RunBenchmarkSuite("packages/base", b) // legacy
	RunBenchmarkSuite("engine_tests/tritium/base", b)
}

func BenchmarkLibXML(b *testing.B) {
	RunBenchmarkSuite("packages/libxml", b) // legacy
	RunBenchmarkSuite("engine_tests/tritium/libxml", b)
}

func BenchmarkURL(b *testing.B) {
	RunBenchmarkSuite("packages/url", b) //legacy
	RunBenchmarkSuite("engine_tests/url", b)
}

func BenchmarkJsonLib(b *testing.B) {
	RunBenchmarkSuite("packages/json", b) // legacy
	RunBenchmarkSuite("engine_tests/json", b)
}
