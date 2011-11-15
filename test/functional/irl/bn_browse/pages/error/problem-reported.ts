$("body") {
  add_class("mw_problem_reported")
  
  $("form") {
    $("div[@id='mainContainer']") {
      $("div[@id='leftNav'] | div[@class='bn_footer_width']") {
        remove()
      }
    }
  }
}
