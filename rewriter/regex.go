package rewriter

import "rubex"
import "errors"
import "strings"
import "fmt"
import "sync"

type RegexRewriter struct {
	original  []string
	rewritten []string
	regex     *rubex.Regexp
	mu        sync.Mutex
}

func NewRegexRewriter() *RegexRewriter {
	sr := &RegexRewriter{}
	sr.original = make([]string, 0, initSize)
	sr.rewritten = make([]string, 0, initSize)
	return sr
}

func (sr *RegexRewriter) AddRewriteRule(original string, rewritten string) error {
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

func (sr *RegexRewriter) Done() error {
	patterns := make([]string, 0, initSize)
	for _, cand := range sr.original {
		patterns = append(patterns, fmt.Sprintf("(%s)", cand))
	}
	sr.regex = rubex.MustCompile(strings.Join(patterns, "|"))
	return nil
}

func (sr *RegexRewriter) RewriteUrl(url string) (rewritten string, err error) {
	//sr.mu.Lock()
	//defer sr.mu.Unlock()

	_ = sr.regex.FindStringSubmatchIndex(url)
	return sr.rewritten[0], nil
	/*
		submatch := match[2:]
		for index := 0; index < len(submatch) - 1; index += 2 {
			if submatch[index] == 0 && submatch[index + 1] > 0 {
				return sr.rewritten[index/2], nil
			}
		}
		return "", errors.New("no matching url rewriting rule")
	*/
}

func (sr *RegexRewriter) RevertRewriteUrl(rewritten string) (url string, err error) {
	return "", errors.New("no matching url rewriting rule for reverse-rewriting")
}
