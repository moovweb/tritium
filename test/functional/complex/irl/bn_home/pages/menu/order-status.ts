$("./body") {
  # Add the script specific class
  attribute("class", "mw_order_status")
  $("./form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("./div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("./div[@class='bn_footer_width']") {
      remove()
    }
    # Use standard styling on the main div
    $("./div[@id='ctl00_mainContentContainer']") {
      add_class("mw_acc")
      $("./div[@id='contentContainer']") {
        move_here("table/tr/td/*", "bottom")
        move_here("table/tr/td/*", "bottom")
        $("./table | ./br | ./script") {
          remove()
        }
        $("./div[@id='ctl00_cphMainContent_OrdersPanel']") {
          $("./div/table") {
            name("div")
            attribute("style", "")
            add_class("mw_acc")
            $("./tr[1]") {
              $("th[1]") {
                remove()
              }
              $("th") {
                name("span")
              }
            }
            # For each order in the order history
            $("./tr[position() > 1]") {
              # Make it a 
              name("div")
              attribute("style", "")
              attribute("data-ur-set", "toggler")
              add_class("mw_acc_section")
              
              $("./td[1]") {
                name("div")
                attribute("style", "")
                attribute("data-ur-toggler-component", "button")
                attribute("data-ur-state", "disabled")
                add_class("mw_acc_header")
                # Add icons using sprites
                insert_bottom("div", class: "icons-accordion-closed")
                insert_bottom("div", class: "icons-accordion-open")
                $("./a") {
                  name("span")
                  var("order_href", fetch("@href"))
                }
              }
              
              insert_bottom("div", class: "mw_acc_items", href: $order_href) {
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "disabled")
                insert_bottom("a", class: "mw_acc_items_sub", href: $order_href)
              }
              copy_here("../tr[1]", "top")
              # Format fields
              $("td") {
                name("span")
                attribute("style", "")
                move_here("../tr[1]/span[1]", "top")
                
                move_to("../div/a")
              }
              
              # remove copied tr that is now empty
              $("tr") {
                remove()
              }
            }
            # remove the header row
            $("tr") {
              remove()
            }
          }
        }
      }
    }
  }
}
