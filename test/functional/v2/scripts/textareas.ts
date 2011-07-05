replace(/<textarea([^>]*)>(.*)<\/textarea>/im) {
  $2 {
    replace(/</, "&lt;")
    replace(/>/, "&gt;")
  }
  set("<textarea\\1>\\2</textarea>")
}

html_fragment() {
  select("./textarea") {
    attribute("found", "true")
  }
  select("html") {
    # This block shouldn't execute
    remove()
  }
}