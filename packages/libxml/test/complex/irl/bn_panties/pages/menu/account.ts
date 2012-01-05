$("./body") {
  # Add the script specific class
  attribute("class", "mw_account")
  $("./form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("./div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("./div[@class='bn_footer_width']") {
      remove()
    }
    # Format main content area
    $("./div[@id='ctl00_mainContentContainer']/div[@id='contentContainer']") {
      add_class("mw_acc")
      # Collapse first level of table
      move_here("./table[1]/tr[1]/td[1]/*", "bottom")
      $("./table[1]") {
        remove()
      }
      # Remove width for better styling
      $("./table") {
        attribute("width", "")
      }
    }
  }
}
