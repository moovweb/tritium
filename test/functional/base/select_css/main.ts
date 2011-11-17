var("hi", "true")
match($hi, "true") {
  html() {
    css("html>body>p") {
      inner() {
        append(" Bussdieker")
      }
    }
  }
}
