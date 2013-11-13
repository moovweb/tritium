package checker

import (
	t "testing"
)

func TestCleanChecker(t *t.T) {
	result := CheckFile(".", ".", "scripts/clean.ts", make([]string, 0))
	if len(result.Warnings) > 0 {
		t.Error("Shouldn't of had any warnings")
	}
}

func TestSelectTextChecker(t *t.T) {
	result := CheckFile(".", ".", "scripts/select_text.ts", make([]string, 0))
	count := 18
	if len(result.Warnings) != count {
		t.Errorf("Should have thrown %v warnings only gave %d\n", count, len(result.Warnings))
		for _, warn := range result.Warnings {
			t.Error(warn.String())
		}
	}
	//println(result.Warnings[0].String())
}

func TestWithNot(t *t.T) {
	result := CheckFile(".", ".", "scripts/with_not.ts", make([]string, 0))
	if len(result.Warnings) != 2 {
		t.Error("Should have thrown two warnings")
	}
}
