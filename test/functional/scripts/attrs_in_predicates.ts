html() {
  $("/html/body") {
    $("a[@href=preceding-sibling::a/@href]") {
      remove()
    }
  }
}