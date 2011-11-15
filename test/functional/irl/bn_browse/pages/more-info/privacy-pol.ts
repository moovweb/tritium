$("body") {
  attribute("class", "mw_privacy_pol")
  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav'] | div[@class='bn_footer_width']") {
      remove()
    }
    $("div[@class='mainContentContainer']/div[@id='contentContainer']") {
      move_here("table[1]/tr/td/*")
      $("table[1]") {
        remove()
      }
      
      # remove inline style
      $("div[1]") {
        attribute("style", "")
      }
      
      # for style convenience
      $("p[*[last() = 1]][b]") {
        add_class("mw_subheader")
      }
    }
  }
}
