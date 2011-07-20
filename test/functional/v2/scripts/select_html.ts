var("hi", "true")
match($hi, "true") {
  xhtml() {
    $("body") {
      $("p") {
        inner() {
          append(" Leung")
        }
      }
    }
  }
}
