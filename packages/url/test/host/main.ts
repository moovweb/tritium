// ensure that we can get and set the host of url("xxx.com")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url($test_url) {
  $old_host = host()
  host("m.google.com")
  host() {
    append(".moovapp.com")
  }
}

match($old_host) {
  with("www.google.com") {
    match($new_url) {
      with(/m\.google\.com\.moovapp\.com/) {
        append("success")
      }
      else() {
        append("failure")
      }
    }
  }
  else() {
    append("failure")
  }
}
