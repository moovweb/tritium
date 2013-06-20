// ensure that we can get and remove the params of url("xxx?foo=bar#hi")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url_v1($test_url) {
  $old_foo = param_v1("foo")
  remove_param_v1("foo")
}

match($old_foo) {
  with("bar") {
    append("succ")
    match($new_url) {
      not(/foo/) {
        append("ess")
      }
    }
  }
}
