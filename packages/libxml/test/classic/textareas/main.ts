$use_global_replace_vars = "true"

replace(/<textarea([^>]*)>(.*)<\/textarea>/m) {
  $2 {
    replace(/</, "&lt;")
    replace(/>/, "&gt;")
  }
  set("<textarea$1>$2</textarea>")
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