package test

import "testing"

func TestNewTritiumTestFromFolder(t *testing.T) {
	_, err := NewTritiumTestFromFolder("test")
	if err != nil {
		t.Fatal(err)
	}
}
