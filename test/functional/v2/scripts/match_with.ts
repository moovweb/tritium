xml()  {
  $("/main/student") {
    match(fetch("@name")) {
      with("Hampton") {
        attribute("awesome", "true")
      }
      with("Michael") {
        attribute("sexy", "true")
      }
      with(not(/r/)) {
        attribute("has_no", "r")
      }
      else() {
        attribute("match", "false")
      }
    }
  }
}