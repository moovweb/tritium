html_fragment() {
  $$("#my_div") {
    text() {
      capture(/(\w{8})/) {
        log("Hello ", %1)
      }
    }
  }
}