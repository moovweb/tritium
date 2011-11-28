$("body") {
  attribute("class", "mw_plus_size_catalog")
  $("form/div[@id='mainContainer']") {
    # Remove the left bar
    @import _remove_left_nav.ts
    $("div[@class='contentContainer2']") {
      # Remove empty divs at bottom of page to avoid styling side effects
      $("div[@id='contentMain2']") {
        $("div[position()>2]") {
          remove()
        }
        $("div[contains(@class,'categoryFilter')]") {
          move_here("table/tr", "bottom") {
            name("div")
          }
          # remove whitespace
          $("div/td/text()[normalize-space(.)]") {
            text() {
              replace(/^[^\w\(]+/m, "")
            }
          }
          # special case on sale page
          $("div[td[last()=1]]") {
            move_here("following-sibling::div[1]/td[@class='filterText']")
          }
          $("table") {
            remove()
          }
          $("div[position() = last()]") {
            move_here(".//select", "bottom")
          }
        }
      }
      # DIRTY: for some reason the .// is required. Not sure why
      $(".//div[@id='deptMainTitle']/..") {
        move_here("div[@id='deptMainTitle']/table/tr/td", "before") {
          name("div")
          $("img") {
            wrap("span") {
              text(fetch("img/@alt"))
            }
          }
        }
        remove()
      }
      # Remove the size help link from the size filter drop down
      $(".//td[@class='filterDropdown']/a[1]") {
        remove()
      }
      # Open the main list context
      $(".//div[@class='contentIndent']") {
        # Add accordian class
        add_class("mw_acc")
        # Each category header is an image so convert them to
        # h2 tags and set their text to the value used for the alt attribute
        $(".//img") {
          name("span")
          text(fetch("@alt"))
          # Remove the src attribute
          attribute("src") {
            remove()
          }
        }
        move_here(".//span | .//a")
        # Wrap the h2 tags in a div to begin structuring the accordian layout
        $("span") {
          wrap("div", class: "mw_acc_section") {
            # Make this div a toggler
            attribute("data-ur-set", "toggler")
          }
        }
        # Select the anchor tags under each category and move them inside the previously created div
        $("a") {
          add_class("mw_acc_item")
          move_to("..//a/preceding-sibling::div[1]")
        }
        # Select each category item (TODO: May be possible to optimize this into fewer lines of code)
        $("div[@class='mw_acc_section']") {
          $("span") {
            # Create a new div tag after the category div to hold the category's anchor tags
            insert_after("div", class: "mw_acc_items") {
                # This is the content section of the toggler
              attribute("data-ur-toggler-component", "content")
                # All categories start out collapsed
              attribute("data-ur-state", "disabled")
                # Move all the anchor tags into this newly created div
              move_here("../a", "bottom")
              $("a") {
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
        # For some reason the first category sub header is a table and the remaining ones are divs
        # target and remove the first category sub header (TODO: Try to save these)
        $("table[1]") {
          remove()
        }
      }
      # Remove the category sub headers that list the item quantity (TODO: Try to save these)
      $(".//div[@class='categorySubHdr']") {
        remove()
      }
      # Remove the right side navigation junk
      $("div[@id='rightNav']") {
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
