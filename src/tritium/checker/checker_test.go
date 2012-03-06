package checker

import(
	t "testing"
	. "fmt"
)

func TestCleanChecker(t *t.T) {
	result := CheckFile("scripts/clean.ts")
	if len(result.Warnings) > 0 {
		t.Error("Shouldn't of had any warnings")
	}
}

func TestSelectTextChecker(t *t.T) {
	result := CheckFile("scripts/select_text.ts")
	if len(result.Warnings) != 14 {
		t.Error("Should have thrown 14 warnings only gave " + Sprintf("%d", len(result.Warnings)))
		for _, warn := range(result.Warnings) {
			t.Error(warn.String())
		}
	}
	//println(result.Warnings[0].String())
}

func TestWithNot(t *t.T) {
	result := CheckFile("scripts/with_not.ts")
	if len(result.Warnings) != 2 {
		t.Error("Should have thrown two warnings")
	}
}