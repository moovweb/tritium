package rewriter

type UrlRewriter interface {
	AddRewriteRule(string, string) error
	Done() error
	RewriteUrl(string) (string, error)        //rewrite original urls to m-urls
	ReverseRewritUrle(string) (string, error) //rewrite m-urls to original urls
}
