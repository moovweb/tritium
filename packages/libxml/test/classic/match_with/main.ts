xml()  {
  $("/main/student") {
    match(fetch("@name")) {
      with("Hampton") {
        attribute("awesome", "true")
      }
      with("Michael") {
        attribute("sexy", "true")
      }
      not(/r/) {
        attribute("has_no", "r")
      }
      not(fetch("@name")) {
        log("never happened")
      }
      else() {
        attribute("match", "false")
      }
    }
  }
}