package rewriter

import "testing"
import "fmt"

func TestMany(t *testing.T) {
	sr := NewStringRewriter()
	for index := 1; index <= 100; index++ {
		sr.AddRewriteRule(fmt.Sprintf("//www%d.macys.com", index), fmt.Sprintf("http://m%d.macys.com", index))
	}
	sr.Done()
	rewritten, err := sr.RewriteUrl("http://www50.macys.com")
	if err != nil {
		t.Errorf("err: %s", err.Error())
		return
	}
	if rewritten != "http://m50.macys.com" {
		t.Errorf("unxpected result: %s", rewritten)
	}
}

func TestManyRegexp(t *testing.T) {
	sr := NewRegexRewriter()
	for index := 1; index <= 100; index++ {
		sr.AddRewriteRule(fmt.Sprintf("//www%d.macys.com", index), fmt.Sprintf("http://m%d.macys.com", index))
	}
	sr.Done()
	rewritten, err := sr.RewriteUrl("http://www50.macys.com")
	if err != nil {
		t.Errorf("err: %s", err.Error())
		return
	}
	if rewritten != "http://m1.macys.com" {
		t.Errorf("unxpected result: %s", rewritten)
	}
}

func BenchmarkSome(b *testing.B) {
	sr := NewStringRewriter()
	sr.AddRewriteRule("//www.macys.com", "http://m.macys.com")
	sr.AddRewriteRule("//www1.macys.com", "http://m.macys.com")
	sr.AddRewriteRule("//www2.macys.com", "http://m.macys.com")
	sr.Done()
	for i := 0; i < b.N; i++ {
		sr.RewriteUrl("www1.macys.com")
	}
}

func BenchmarkMany(b *testing.B) {
	sr := NewStringRewriter()
	sr.AddRewriteRule("//www.macys.com", "http://m.macys.com")
	for index := 1; index <= 100; index++ {
		sr.AddRewriteRule(fmt.Sprintf("//www%d.macys.com", index), "http://m.macys.com")
	}
	sr.Done()
	for i := 0; i < b.N; i++ {
		sr.RewriteUrl("http://www50.macys.com")
	}
}

func BenchmarkManyRegexp(b *testing.B) {
	sr := NewRegexRewriter()
	sr.AddRewriteRule("//www.macys.com", "http://m.macys.com")
	for index := 1; index <= 100; index++ {
		sr.AddRewriteRule(fmt.Sprintf("//www%d.macys.com", index), "http://m.macys.com")
	}
	sr.Done()
	for i := 0; i < b.N; i++ {
		sr.RewriteUrl("http://www50.macys.com")
	}
}
