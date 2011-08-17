xml()  {
  select(".//*[@id='a']") {
    select(".//*[@id='line1']") {
      inner() {
        replace("lamb.", "baby antelope.")
        replace(".", "!")
      }
    }
    select(".//*[@id='line2']") {
      inner() {
        replace("white as ", "")
        replace("snow", "snowy")
      }
    }
    select(".//*[@id='line3']") {
      inner() {
        replace(/(Mary)/, "'$1'")
      }
    }
    select(".//*[@id='line4']") {
      inner() {
        replace(/([^\s\.]+)(\s)/, "\\1y$2")
      }
    }
  }
}
