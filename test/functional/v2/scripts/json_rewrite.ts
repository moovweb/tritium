replace(/"redirect_url":"([^"]*)"/) {
  $1 {
    rewrite('link')
  }
  set('"redirect_url":"\\1"')
}