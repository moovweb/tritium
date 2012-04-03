package test

import "testing"


func TestBase(t *testing.T) {
	RunTestSuite("packages/base", t)
}

func TestLibXML(t *testing.T) {
	RunTestSuite("packages/libxml", t)
}

func BenchmarkBase(t *testing.T) {
	RunTestSuite("packages/base", t)
}

func BenchmarkLibXML(t *testing.T) {
	RunTestSuite("packages/libxml", t)
}
