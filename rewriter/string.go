package rewriter

import "strings"
import "errors"

type StringRewriter struct {
	original  []string
	rewritten []string
}

const initSize = 4

func NewStringRewriter() *StringRewriter {
	sr := &StringRewriter{}
	sr.original = make([]string, 0, initSize)
	sr.rewritten = make([]string, 0, initSize)
	return sr
}

func (sr *StringRewriter) AddRewriteRule(original string, rewritten string) error {
	if strings.HasPrefix(original, "//") {
		sr.AddRewriteRule("http:"+original, rewritten)
		sr.AddRewriteRule("https:"+original, rewritten)
	} else if strings.HasPrefix(original, "http:") || strings.HasPrefix(original, "https:") {
		sr.original = append(sr.original, original)
		sr.rewritten = append(sr.rewritten, rewritten)
	} else {
		return errors.New("invalid url patten: " + original)
	}
	return nil
}

func (sr *StringRewriter) Done() error {
	return nil
}

func (sr *StringRewriter) RewriteUrl(url string) (rewritten string, err error) {
	for index, cand := range sr.original {
		if strings.HasPrefix(url, cand) {
			prefixLen := len(cand)
			return sr.rewritten[index] + url[prefixLen:], nil
		}
	}
	return "", errors.New("no matching url rewriting rule")
}

func (sr *StringRewriter) RevertRewriteUrl(rewritten string) (url string, err error) {
	for index, cand := range sr.rewritten {
		if strings.HasPrefix(rewritten, cand) {
			prefixLen := len(cand)
			return sr.original[index] + rewritten[prefixLen:], nil
		}
	}
	return "", errors.New("no matching url rewriting rule for reverse-rewriting")
}
