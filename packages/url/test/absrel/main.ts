// ensure that we can absolutize and relativize the url
# var required for absolutize() (always in body.ts)
$host = "mlocal.moovweb.com"

$test_url = "/query.aspx"

$url1 = url($test_url) {
  absolutize()
}
$url2 = url($test_url) {
  absolutize()
  scheme("https")
}
$url3 = url($test_url) {
  absolutize()
  relativize() 
}

match($url1, "//mlocal.moovweb.com/query.aspx") {
  append("suc")
  match($url2, "https://mlocal.moovweb.com/query.aspx") {
    append("ce")
    match($url3, $test_url) {
      append("ss")
    }
  }
}
