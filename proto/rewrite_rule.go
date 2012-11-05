package proto

const (
	RuleBidirection = "=>"
	RuleToProxy     = "<-"
	RuleToUpstream  = "->"
)

func ReadRewriteRules(rules []string) []*RewriteRule {
	if ruleNum := len(rules); ruleNum/4 > 0 {
		rrules := make([]*RewriteRule, 0, ruleNum/4)
		for i := 0; i < ruleNum/4; i++ {
			newRule := &RewriteRule{}
			newRule.Proxy = new(string)
			newRule.Upstream = new(string)
			newRule.CookieDomain = new(string)
			direction := rules[4*i]
			*(newRule.Proxy) = rules[4*i+1]
			*(newRule.Upstream) = rules[4*i+2]
			*(newRule.CookieDomain) = rules[4*i+3]
			if direction == RuleToProxy {
				newRule.Direction = RewriteRule_UPSTREAM_TO_PROXY.Enum()
			} else if direction == RuleToUpstream {
				newRule.Direction = RewriteRule_PROXY_TO_UPSTREAM.Enum()
			} else {
				newRule.Direction = RewriteRule_BIDIRECTIONAL.Enum()
			}
			rrules = append(rrules, newRule)
		}
		return rrules
	}
	return nil
}
