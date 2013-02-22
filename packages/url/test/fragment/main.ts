// ensure that we can get and set the fragment of url("xxx#hi")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url($test_url) {
  $old_frag = fragment()
  fragment("frag_2")
}

match($old_frag) {
  with("frag") {
    match($new_url) {
      with(/frag_2/) {
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
