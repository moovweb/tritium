html_fragment() {
  $("./span[@id='move_me']") {
    move_to("../div[@id='move1']", position("bottom")) 
  }
  $("./div/span[@id='move_me']") {
    move_to("../../div[@id='move2']", "bottom")
  }
  $("./div/span[@id='move_me']") {
    move_to("../../div[@id='move3']")
  } 
}