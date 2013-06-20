// ensure that url("xxx") returns that url string
$test_url = "http://www.google.com/query.aspx?foo=bar&baz=true#frag"

$new_url = url_v1($test_url)

match($test_url, $new_url) {
  append("success")
}
