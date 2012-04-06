package proto

import "testing"

func checkSlug(t *testing.T, testslug *Slug, name string, version string, stages int) {
	if testslug == nil {
		t.Fatal("Slug is nil")
	}
	if len(testslug.Transformers) != stages {
		t.Fatal("Invalid number of segments")
	}
	if *testslug.Name != name || *testslug.Version != version {
		t.Error("Expected slug named", name, "and version", version)
		t.Error("Got slug named", *testslug.Name, "and version", *testslug.Version)
		t.Fail()
	}
}

func TestNewSlug(t *testing.T) {
	name := "test"
	version := "0.0.0"
	stages := 4

	s, err := NewSlug(name, version, stages)
	if err != nil {
		t.Fatal("Error creating slug")
	}
	checkSlug(t, s, name, version, stages)
}

func TestWriteSlug(t *testing.T) {
	name := "test"
	version := "0.0.0"
	stages := 0

	s, err := NewSlug(name, version, stages)
	if err != nil {
		t.Fatal("Error creating slug")
	}
	checkSlug(t, s, name, version, stages)

	err = s.WriteFile("test.slug")
	if err != nil {
		t.Fatal("Error writing slug")
	}

	s, err = NewSlugFromFile("test.slug")
	if err != nil {
		t.Fatal("Error loading slug from file")
	}
}
