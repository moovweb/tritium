$hi = "hello"
html() {
  $("/*") {
    add_class($hi) {
      concat("h", "e", "l", "o", " is ", $hi)
      replace("h", "H")
    }
  }
}
