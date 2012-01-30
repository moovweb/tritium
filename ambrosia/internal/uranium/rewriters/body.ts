$use_gloabl_replace_vars = "true"
# Rewriters
$rewrite_link_host = "{{.Rewriter.Link.Host}}"
$rewrite_link_matcher = "{{.Rewriter.Link.Matcher}}"
$rewrite_link_replacement = "{{.Rewriter.Link.Replacement}}"

$rewrite_cookie_host = "{{.Rewriter.Cookie_Domain.Host}}"
$rewrite_cookie_matcher = "{{.Rewriter.Cookie_Domain.Matcher}}"
$rewrite_cookie_replacement = "{{.Rewriter.Cookie_Domain.Replacement}}"








$host {
  replace(regexp($rewrite_link_host))
}
$rewrite_link_matcher {
  {{range .Rewriter.Link.HostVars}}
	replace("${{.}}", ${{.}}){{end}}
}
$rewrite_link_replacement {
  {{range .Rewriter.Link.HostVars}}
	replace("${{.}}", ${{.}}){{end}}
}

$host {
  replace(regexp($rewrite_cookie_host))
}
$rewrite_cookie_matcher {
  {{range .Rewriter.Cookie_Domain.HostVars}}
	replace("${{.}}", ${{.}}){{end}}
}
$rewrite_cookie_replacement {
  {{range .Rewriter.Cookie_Domain.HostVars}}
	replace("${{.}}", ${{.}}){{end}}
}

# Script
@import main.ts

export("host", $host)

