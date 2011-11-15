html_fragment() {
  inner("<a href='hi'>Hello, World!</a>")
  $("a") {
    add_class(fetch("@href"))
  }
}