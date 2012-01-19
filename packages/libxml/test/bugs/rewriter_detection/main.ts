$use_global_replace_vars = "true"
replace(/^(location\:\s*)([^\r\n]*)/i) {
  $2 {
    replace(regexp($rewrite_link_matcher), $rewrite_link_replacement)
  }
  set("\\1\\2")
}