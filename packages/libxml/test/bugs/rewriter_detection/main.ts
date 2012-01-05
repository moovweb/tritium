replace(/^(location\:\s*)([^\r\n]*)/i) {
  $a = $1
  $2 {
    replace(regexp($rewrite_link_matcher), $rewrite_link_replacement)
  }
  set($a)
  append("$2")
}