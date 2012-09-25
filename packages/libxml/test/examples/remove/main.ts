html_fragment() {
  $$(".two") {
    remove()
  }
  remove(".//div[@class='four']")
}