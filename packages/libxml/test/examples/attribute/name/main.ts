html_fragment() {
  $$(".one") {
    attribute("class") {
      name("id")
    }
  }
  $$(".two") {
    attribute("class") {
      name() {
        set("href")
      }
    }
  }
}