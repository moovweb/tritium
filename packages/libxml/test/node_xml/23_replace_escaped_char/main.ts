html("utf-8") {
  $("//body") {
    inner() {
	  replace("©", "blah")
	}
  }
}