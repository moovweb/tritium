$("body") {
  attribute("class", "mw_brands")

  $("form/div[@id='mainContainer']") {

    $("div[@id='leftNav']") {
      remove()
    }

    $("div[@class='mainContentContainer']/div[@id='contentContainer']") {

      $("div | br | h1") {
        remove()
      }
      $("../following-sibling::div[1]") {
        remove()
      }

      move_here("table//table") {
        $(".//tr[td/div[@class='hrDots']]") {
          remove()
        }
      }
      $("table[1]") {
        remove()
      }

      $("table") {
        name("div")
        move_here(".//font | .//a")
        $("tr") {
          remove()
        }
      }
      # Top level accordian
      add_class("mw_acc")
      # Womens Brands Accordion
      $("div[1]") {
        add_class("mw_acc_section")
          # Create the items section for the women's brands
        insert_top("div", class: "mw_acc_items") {
          attribute("data-ur-id", "womens-accordion")
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "disabled")
            # Create a new accordian block to break down women's brands by letter group
          insert_top("div", class: "mw_acc") {
                # Move all women's brands and heading into this new accordian
            move_here("../../a|../../font", "bottom")
          }
        }
          # Create the heading section for women's brands
        insert_top("div", class: "mw_acc_header") {
          attribute("data-ur-id", "womens-accordion")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
            # Add icons using sprites
          insert_bottom("div", class: "icons-accordion-closed")
          insert_bottom("div", class: "icons-accordion-open")
          insert_top("span", "women's brands")
        }
        # Begin structuring the women's brands sub accordian
        $("div[@class='mw_acc_items']/div[@class='mw_acc']") {
          # Each font tag represents the start of a flat list of links
          $("font") {
            name("span")
            var("toggler-id", fetch("text()"))
            attribute("style", "")
            # Create the header and content section for each letter group and setup the accordian attributes
            insert_before("div", class: "mw_acc_section") {
                  # Create the items section (This will actually show up below 
                  # the header due to the nature of the top() positional
                  # selector)
              insert_top("div", class: "mw_acc_items") {
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "disabled")
                attribute("data-ur-id", var("toggler-id"))
              }
                  # Create the header section
              insert_top("div", class: "mw_acc_header") {
                attribute("data-ur-toggler-component", "button")
                attribute("data-ur-state", "disabled")
                attribute("data-ur-id", var("toggler-id"))
                    # Add icons using sprites
                insert_bottom("div", class: "icons-accordion-closed")
                insert_bottom("div", class: "icons-accordion-open")
              }
            }
            # Move all heading labels to their respective accordian header
            move_to("preceding-sibling::div[1]/div[@class='mw_acc_header']", "bottom")
          }
          # Each anchor represents a women's brand
          $("a") {
            # Format them for the accordian style and like above move them to their respective accordian items list
            add_class("mw_acc_item")
            inner_wrap("span")
            move_to("preceding-sibling::div[1]/div[@class='mw_acc_items']", "bottom")
          }
        }
      }
      # Mens Brands Accordion
      $("div[2]") {
        add_class("mw_acc_section")
          # Create the items section of the accordian
        insert_top("div", class: "mw_acc_items") {
          attribute("data-ur-id", "mens-accordion")
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "disabled")
            # Move all brand links into the newly created items div and format them as accordian items
          move_here("../a", "bottom")
          $("a") {
            add_class("mw_acc_item")
            inner_wrap("span")
          }
        }
          # Create the heading section for men's brands and format it as the button portion of the accordian
        insert_top("div", class: "mw_acc_header") {
          attribute("data-ur-id", "mens-accordion")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
            # Add icons using sprites
          insert_bottom("div", class: "icons-accordion-closed")
          insert_bottom("div", class: "icons-accordion-open")
          insert_top("span", "men's brands") {
          }
        }
      }
    }
  }
}
