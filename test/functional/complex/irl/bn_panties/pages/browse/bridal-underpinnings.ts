$("body") {
  attribute("class", "mw_bridal_underpinnings")
  $("form/div[@id='mainContainer']") {
    # Remove left navigation pane
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom spacer
    $("div[@class='bn_footer_width']") {
      remove()
    }
    $(".//div[@id='contentContainer']") {
      move_here("div[@id='searchBar']", "before")
      insert_top("span", class: "mw_title") {
        text(fetch("./../div[1]/img[1]/@alt"))
      }
      # Remove the top image div
      $("div[1] | .//img") {
        remove()
      }
      # Convert all font and underline tags
      $(".//font | .//u") {
        name("span")
      }
      # Remove all style below here
      $(".//*") {
        attribute("style") {
          remove()
        }
      }
    }
  }
}
