// ensure that we can get and set the params of url("xxx?foo=bar#hi")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url($test_url) {
  $old_foo = param("foo")
  param("foo", "new_bar")
}

match($old_foo) {
  with("bar") {
    match($new_url) {
      with(/new\_bar/) {
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
