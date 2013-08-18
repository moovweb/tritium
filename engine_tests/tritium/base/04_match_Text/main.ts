$x = "foo" {
  match("foo") {
    set("bar")
  }
}
set($x)
