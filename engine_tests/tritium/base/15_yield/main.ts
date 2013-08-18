# can't really test this function
match("foo") {
  with("foo") {
    yield()
    set("bar")
    yield()
  }
}
