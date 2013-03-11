// ensure that we can get, set, and remove the params of url("xxx?foo=bar#hi")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$url1 = url($test_url) {
  param("mw_touched") {
    set("true")
  }
  remove_param("baz")
}

$url2 = url($test_url) {
  remove_param("foo")
  remove_param("baz")
  param("hello", "goodbye")
  remove_param("hello")
}

match($url1, /mw\_touched\=true/) {
  append("suc")
  match_not($url1, /baz/) {
    append("ce")
    match($url2, "http://www.google.com/query.aspx#frag") {
      append("ss")
    }
  }
}
