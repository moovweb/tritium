
# Simply start by parsing the document as 'html'
doc("html") {
  # Select the body
  $("/html/body") {
    # Append a class to the body tag
    add_class("monkey")
  }
}