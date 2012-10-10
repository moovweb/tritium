html_fragment() {
  $$(".one") {
    attribute("class") {
      value("newone")
    }
  }
  $$(".two") {
    attribute("class") {
      value() {
        set("newtwo")
      }
    }
  }
}