package versions

import (
	"bytes"
	"strings"
)

type trimmer struct {
	foundDot bool
	maxRune  rune
	minRune  rune
}

func newTrimmer() *trimmer {
	minRunes := bytes.Runes([]byte("0"))
	minRune := minRunes[0]

	maxRunes := bytes.Runes([]byte("9"))
	maxRune := maxRunes[0]

	return &trimmer{
		foundDot: false,
		minRune:  minRune,
		maxRune:  maxRune,
	}
}

func (t *trimmer) trimExtension(rune rune) bool {

	//fmt.Printf("Rune: %v : %v\n", rune, string(rune))

	if t.foundDot {
		return false
	}

	if string(rune) == "." {
		t.foundDot = true
		return true
	}

	//fmt.Printf("Min: %v  Max: %v\n", t.minRune, t.maxRune)

	if rune <= t.maxRune && rune >= t.minRune {
		return false
	}

	return true
}

func trimExtension(raw string) string {
	t := newTrimmer()
	return strings.TrimRightFunc(raw, func(rune rune) bool { return t.trimExtension(rune) })
}
