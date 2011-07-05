doc("html_fragment") {
  html("<a href='hi'>Hello, World!</a>")
  $("a") {
    add_class(fetch("@href"))
  }
}