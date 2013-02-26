// ensure that we can get, set, and remove the userinfo of url("a:b@xxx.com:80")
$test_url = "http://sergey:brin@google.com/query.aspx?foo=bar&baz=true#frag"

$new_test_url = url($test_url) {
  $user_1 = username() # sergey
  $pw_1 = password() # brin
  userinfo("foo:bar")
  $user_2 = username() # foo
  $pw_2 = password() # bar
  username("testing")
  $info_2 = userinfo() # testing:bar
  password("")
  $info_3 = userinfo() # testing
  username("larry")
}

match($user_1, "sergey") {
  append("s")
  match($pw_1, "brin") {
    append("u")
    match($user_2, "foo") {
      append("c")
      match($pw_2, "bar") {
        append("c")
        match($info_2, "testing:bar") {
          append("e")
          match($info_3, "testing") {
            append("s")
            match($new_test_url, /larry\@google\.com/) {
              append("s")
            }
          }
        }
      }
    }
  }
}
