$x = "foobar"

match($x) {
  with(/foo/) {
    with(/bar/) {
      set("matched foobar")
    }
  }
}