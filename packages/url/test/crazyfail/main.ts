// ensure that we can get and set the host of url("xxx.com")
# var required for absolutize() (always in body.ts)
$host = "mlocal.moovweb.com"

$test_url = "/query.aspx"

$url1 = url($test_url) {
  scheme("http")
}
$url2 = url($test_url) {
  scheme("http")
  scheme("")
}
$url3 = url($test_url) {
  port("8080")
}
$url4 = url($test_url) {
  pat("")
}
$url5 = url($test_url) {
  pat("")
  param("foo", "bar")
}
$url6 = url($test_url) {
  pat("")
  param("foo", "bar")
  port("80")
}
$url7 = url($test_url) {
  pat("")
  scheme("ftp")
  param("hello", "goodbye")
}

match($url1, "http:/query.aspx") {
  append("s")
  match($url2, "/query.aspx") {
    append("u")
    match($url3, "//:8080/query.aspx") {
      append("c")
      match($url4, "") {
        append("c")
        match($url5, "?foo=bar") {
          append("e")
          match($url6, "//:80?foo=bar") {
            append("s")
            match($url7, "ftp:?hello=goodbye") {
              append("s")
            }
          }
        }
      }
    }
  }
}
