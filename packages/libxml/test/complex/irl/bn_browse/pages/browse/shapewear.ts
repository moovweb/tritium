$("body") {
  attribute("class", "mw_shapewear")
  $("form/div[@id='mainContainer']") {
    # Remove the left bar
    @import _remove_left_nav.ts
    $("div[@id='ctl00_mainContentContainer']") {
      # Keep the titlebar!
      $("div[@class='s5'][1]/span/img") {
        wrap("span") {
          add_class("mw_titlebar")
          text("Shapewear Must-Haves")
          move_to("../../..", "before")
        }
      }
      move_here("div[@id='searchBar']", "before")
      # Move all area mapping links here and convert them to anchor tags using the alt attribute for text
      move_here("div[@class='s5' and position() < 3]/span/map/area", "bottom") {
        name("a")
        text(fetch("@alt"))
      }
      # Remove the first anchor which is not numbered
      $("a[1]") {
        remove()
      }
      # Wrap each anchor tag inside an ordered list inside a div
      insert_top("ol") {
        move_here("../a", "bottom") {
          wrap("li") {
            wrap("div")
          }
        }
      }
      # Remove the remaining divs since we've captured all of the links we need
      $("div") {
        remove()
      }
    }
    # Remove bottom footer junk
    $("//div[@id='ctl00_mainContentContainer']") {
      $("following-sibling::div[1]") {
        remove()
      }
    }
  }
}
