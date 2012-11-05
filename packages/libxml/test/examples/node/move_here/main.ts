html_fragment() {
  $("./div[@id='move1']") {
    move_here("../span[@id='move_me']", position("bottom"))
  }
  $("./div[@id='move2']") {
    move_here("../div/span[@id='move_me']", "bottom")
  }
  $("./div[@id='move3']") {
    move_here("../div/span[@id='move_me']")
  }
}