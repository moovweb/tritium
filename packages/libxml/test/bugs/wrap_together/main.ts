html() {
  $("/html/body") {
    wrap_together("div[not(@id) or @id != 'mw-footer-buttons']", "div", id: "mw-footer-buttons")
  }
}