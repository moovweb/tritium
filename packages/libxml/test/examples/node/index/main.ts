html_fragment() {
  $$(".index") {
    $content = fetch("./span/text()")
    log("Hello! I'm ", $content, " in iteration: ", index())
  }
}