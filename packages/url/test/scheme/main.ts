// ensure that we can get and set the scheme of url("http://xxx#hi")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url($test_url) {
  $old_scheme = scheme()
  scheme("https")
}

append("su")
match($old_scheme) {
  with("http") {
    append("cc")
    match($new_url) {
      with(/https/) {
        append("ess")
      }
    }
  }
}
