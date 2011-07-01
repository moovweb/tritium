doc("xml") {
  select(".//*[@id='a']") {
    select(".//*[@id='line1']") {
      html() {
        replace("lamb.", "baby antelope.")
      }
    }
    select(".//*[@id='line2']") {
      html() {
        replace("white as ", "")
        replace("snow", "snowy")
      }
    }
    select(".//*[@id='line3']") {
      html() {
        replace(/(Mary)/, "'\\1'")
      }
    }
    select(".//*[@id='line4']") {
      html() {
        replace(/([^\s\.]+)(\s)/, "\\1y\\2")
      }
    }
  }
}
