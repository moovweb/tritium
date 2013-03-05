// ensure that we can get and set the fragment of url("xxx#hi")
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url($test_url) {
  $old_path = path()
  path() {
    append("new_query.aspx")
  }
}

append("su")
match($old_path) {
  with("/query.aspx") {
    append("cc")
    match($new_url) {
      with(/new\_query\.aspx/) {
        append("ess")
      }
    }
  }
}
