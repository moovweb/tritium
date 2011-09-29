var("hi", "true")
match($hi, "true") {
  html() {
    $("/html/body") {
      $("p") {
        inner() {
          append(" Leung")
        }
      }
    }
  }
}
