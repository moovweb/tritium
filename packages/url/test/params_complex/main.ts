// ensure that we can get, set, and remove the params of url("xxx?foo=bar#hi")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url($test_url) {
  param("mw_touched") {
    set("true")
  }
  remove_param("baz")
}

match($new_url) {
  with(/mw\_touched\=true/) {
    match($new_url) {
      with(/baz/) {
        append("failure")
      }
      else() {
        append("success")
      }
    }
  }
  else() {
    append("failure")
  }
}
