package proto

import "testing"
import "butler/null"

func TestNewTritiumTestFromFolder(t *testing.T) {
	_, err := NewTritiumTestFromFolder("test")
	if err != nil {
		t.Fatal(err)
	}
}

func TestWriteFile(t *testing.T) {
	test, err := NewTritiumTestFromFolder("test")
	if err != nil {
		t.Fatal(err)
	}

	err = test.WriteFile("test/tritium.test")
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewTritiumTestFromFile(t *testing.T) {
	test, err := NewTritiumTestFromFile("test/tritium.test")
	if err != nil {
		t.Fatal(err)
	}

	if null.GetString(test.Script) != "#test\n" {
		t.Fatal("Didn't get expected script back")
	}
}
