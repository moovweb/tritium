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
        replace(/(?<mary>Mary)/, concat("'", $mary, "'"))
      }
    }
    select(".//*[@id='line4']") {
      inner() {
        replace(/(?<word>[^\s\.]+)(?<white_space>\s)/, concat($word, "y", $white_space))
      }
    }
  }
}
