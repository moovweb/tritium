html_fragment() {
  $$(".sun") {
    attribute("class") {
      name("id")
    }
  }
  $$(".gobi") {
    attribute("class") {
      name() {
        set("href")
      }
    }
  }
}