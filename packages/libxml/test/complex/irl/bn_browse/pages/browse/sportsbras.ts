$("body") {
  attribute("class", "mw_sportsbras")
  $("form/div[@id='mainContainer']") {
    # Remove the left bar
    @import _remove_left_nav.ts
    $("div[@id='ctl00_mainContentContainer']") {
      # Move all area mapping links here and convert them to anchor tags using the alt attribute for text
      move_here("div[@id='middle']/div/a", "bottom") {
        text(fetch("@alt"))
      }
      $("a[contains(.,'See More')]") {
        remove()
      }
      # Keep the titlebar!
      $("div[@id='s1-1']") {
        add_class("mw_titlebar")
        name("span")
        text(fetch("img/@alt"))
        move_to("..", "before")
      }
      move_here("../div[@id='searchBar']", "before")
      $("div") {
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
    }
    # Remove bottom footer junk
    $("//div[@id='ctl00_mainContentContainer']") {
      $("following-sibling::div[1]") {
        remove()
      }
    }
  }
}
