$("body") {
  attribute("class", "mw_love_at_first_fit")
  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav']") {
      remove()
    }
    $("div[@class='contentContainer2']") {
      # Keep the titlebar!
      $("div[@id='s1-1']") {
        add_class("mw_titlebar")
        name("span")
        text(fetch("img/@alt"))
        move_to("..", "before")
      }
      move_here("div[@id='searchBar']", "before")

      # Move all the anchor tags (which represent the top 10 list) to here
      move_here(".//a", "bottom") {
      # Remove the links image...
        $("img") {
          remove()
        }
      # and set its text to the tooltip attribute
        text(fetch("@tooltip"))
      }
      # Remove duplicate links
      #(TODO: Switch xpath to following comment when bug is fixed with manhattan)
      #a[(@href=preceding-sibling::a/@href)]
      $("a[text() = preceding-sibling::a/text()]") {
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
      # For some reason there is an empty li at the end ... chuck it
      $("ol/div[last()]") {
        remove()
      }
      # Remove the remaining divs since we have captured all of the links we need
      $("div") {
        remove()
      }
      # Remove the div immediatly following the main content div (this is a padding div)
      $("following-sibling::div[1]") {
        remove()
      }
      
      move_here("div[@id='searchBar']", "before")
    }
  }
}
