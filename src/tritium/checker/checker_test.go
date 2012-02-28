package checker

import(
	t "testing"
)

func TestCleanChecker(t *t.T) {
	result := CheckFile("scripts/clean.ts")
	if len(result.Warnings) > 0 {
		t.Error("Shouldn't of had any warnings")
	}
}

func TestSelectTextChecker(t *t.T) {
	result := CheckFile("scripts/select_text.ts")
	if len(result.Warnings) != 2 {
		t.Error("Should have thrown two warnings")
	}
	//println(result.Warnings[0].String())
}

func TestWithNot(t *t.T) {
	result := CheckFile("scripts/with_not.ts")
	if len(result.Warnings) != 2 {
		t.Error("Should have thrown two warnings")
	}
}