// ensure that we can get, set, and remove the port of url("xxx.com:80")
$test_url = "http://www.google.com:80/query.aspx?foo=bar&baz=true#frag"

url($test_url) {
  #$old_host = host() # www.google.com:80
  $port_1 = port() # 80
  port("808")
  $port_2 = port() # 808
  port() {
    append("0")
  }
  $port_3 = port() # 8080
  port("")
  $new_host = host() # www.google.com
}

append("s")
match($port_1, "80") {
  append("u")
  match($port_2, "808") {
    append("cc")
    match($port_3, "8080") {
      append("e")
      match($new_host, /^((?!\:).)*$/) { # make sure a colon isn't present
        append("ss")
      }
    }
  }
}
