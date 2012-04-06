package proto

import "testing"

func testNewSlug(t *testing.T, name string, version string, stages int) {
	s := NewSlug(name, version, stages)
	if s == nil {
		t.Fatal("Slug is nil")
	}
	if len(s.Transformers) != stages {
		t.Fatal("Invalid number of segments")
	}
	if *s.Name != name || *s.Version != version {
		t.Error("Expected slug named", name, "and version", version)
		t.Error("Got slug named", *s.Name, "and version", *s.Version)
		t.Fail()
	}
}

func TestNewSlug(t *testing.T) {
	testNewSlug(t, "null", "0.0.0", 0)
}

func TestNewSlugFourTransforms(t *testing.T) {
	testNewSlug(t, "steepandcheap", "1.0.1", 4)
}
