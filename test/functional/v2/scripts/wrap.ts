xml()  {
  $(".//person") {
    $("./name") {
      name("first")
      wrap("name", false: 'false') {
        attribute('true', 'true')
      }
    }
    $("./lname") {
      move_to("../name", "bottom")
    }
  }
}
