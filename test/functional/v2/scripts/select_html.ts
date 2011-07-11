var("hi", "true")
match($hi, "true") {
  xhtml() {
    $("body") {
      $("p/html()") {
        append(" Leung")
      }
    }
  }
}
