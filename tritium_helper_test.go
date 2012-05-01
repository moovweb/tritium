package proto

import "testing"
import proto "code.google.com/p/goprotobuf/proto"

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

	if proto.GetString(test.Script) != "#test\n" {
		t.Fatal("Didn't get expected script back")
	}
}
