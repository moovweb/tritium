@func XMLNode.add_desktop_link(Text %common_domain) {
	insert("div") {
	       attribute("id", "mw_desktop_link_config")
	       attribute("matcher", $rewrite_incoming_matcher)
	       attribute("replacement", $rewrite_incoming_replacement)
	       attribute("cookie_hours", "0")
	       attribute("cookie_domain", %common_domain)
	       attribute("rewriter_json", $rewrite_incoming_json)
	     }	
}