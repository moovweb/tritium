$use_global_replace_vars = "true"
replace(/"redirect_url":"([^"]*)"/) {
  $1 {
    rewrite('link')
  }
  set('"redirect_url":"\\1"')
}