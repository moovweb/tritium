$("body") {
  attribute("class", "mw_disclaimer")
  $("form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("div[@class='bn_footer_width']") {
      remove()
    }
    # Use standard styling on the main div
    $("div[@id='ctl00_mainContentContainer']") {
      add_class("mw_acc")
      $("div[@id='contentContainer']/table") {
        # Remove BRs from title area only
        $("tr[1]/td/br") {
          remove()
        }
        move_here("tr/td/*", "before")
        remove()
      }
    }
  }
}
