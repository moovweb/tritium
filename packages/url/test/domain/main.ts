// ensure that we can get and set the host of url("xxx.com")
$test_url = "http://www.google.com:80/query.aspx?foo=bar&baz=true#frag"

$new_url = url($test_url) {
  $old_host = host()
  domain("m.google.com")
  domain() {
    append(".moovapp.com")
  }
  $new_host = host()
}

match($old_host) {
  with("www.google.com:80") {
    append("succ")
    match($new_host) {
      with(/m.google.com.moovapp.com:80/) {
        append("ess")
      }
    }
  }
}
