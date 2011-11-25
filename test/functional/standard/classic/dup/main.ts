xml() {
  $("/root") {
    $("./one") {
      dup() {
        attribute("copy", "true")
      }
    }
  }
}