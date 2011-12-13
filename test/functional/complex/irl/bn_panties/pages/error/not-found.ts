$("./body") {
  # Add page specific class
  add_class("mw_problem_reported")
  # Open main content area and clean up a bit
  $("./form") {
    $("./div[@id='mainContainer']") {
      $("./div[@id='leftNav'] | ./div[@class='bn_footer_width']") {
        remove()
      }
    }
  }
}
