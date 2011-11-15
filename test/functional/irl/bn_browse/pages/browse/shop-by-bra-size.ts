$("body") {
  attribute("class", "mw_shop_by_bra_size")
  $("form/div[@id='mainContainer']") {
    # Remove the left bar
    @import _remove_left_nav.ts
    $("div[@id='header']") {
      move_here("../div[@id='searchBar']", "after")
    }
    $("div/div[@id='contentContainer']") {
      # Add accordian class
      add_class("mw_acc")
      # Pull in the page title image and covert to text
      move_here("(.//img)[1]", "before") {
        name("h2")
        text(fetch("@alt"))
      }
      # Pull in all of the span elements below and remove the table they were in
      move_here(".//span", "bottom")
      $(".//table") {
        remove()
      }
      # Remove bottom footer junk
      $("//span[@class='clr']") {
        remove()
      }
      # Wrap any span without children to begin structuring the accordian layout
      $(".//span[not (child::*)]") {
        wrap("div", class: "mw_acc_section") {
          # Make this div a toggler
          attribute("data-ur-set", "toggler")
        }
      }
      # Select the anchor tags under each category (they are wrapped in spans)
      # and move them inside the previously created div
      $("span/a") {
        move_to("..//../preceding-sibling::div[1]")
      }
      # Remove the now empty spans
      $("span") {
        remove()
      }
      # Select each category item
      $("div[@class='mw_acc_section']") {
        $("span") {
          # Remove the style so it doesn't override our css code
          attribute("style") {
            remove()
          }
          # Create a new div tag after the category div to hold the category's anchor tags
          insert_after("div", class: "mw_acc_items") {
              # This is the content section of the toggler
            attribute("data-ur-toggler-component", "content")
              # All categories start out collapsed
            attribute("data-ur-state", "disabled")
              # Move all the anchor tags into this newly created div
            move_here("..//a", "bottom") {
              add_class("mw_acc_item")
              inner_wrap("span")
            }
          }
          # Wrap the category name in a span and make it the toggler button
          wrap("div") {
            add_class("mw_acc_header")
            # Add icons using sprites
            insert_bottom("div", class: "icons-accordion-closed")
            insert_bottom("div", class: "icons-accordion-open")
            # This is the button part of the toggler
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
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
}
