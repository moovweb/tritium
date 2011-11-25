$("body") {
  attribute("class", "mw_about_us")
  $("form/div[@id='mainContainer']") {
    
    # Remove left navigation pane
    $("div[@id='leftNav']") {
      remove()
    }
    
    $("div[@id='ctl00_mainContentContainer']/div[@id='contentContainer']") {
      move_here("table[1]/tr/td/*")
      $("table[1]") {
        remove()
      }
      
      # format headers into accordion
      $("div[@class='header'] | div[@class='topmostHeader']") {
        add_class("mw_acc_section")
        attribute("data-ur-set", "toggler")
        inner_wrap("span")
        # Add icons using sprites
        insert_bottom("div", class: "icons-accordion-closed")
        insert_bottom("div", class: "icons-accordion-open")
        inner_wrap("div", class: "mw_acc_header") {
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "disabled")
        }

        insert_bottom("div", class: "mw_acc_items") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "disabled")
          inner_wrap("div", class: "mw_acc_item")
        }
      }
      
      # move main content into corresponding mw_acc_item div
      $("p") {
        move_to("preceding-sibling::div[1]/div[2]/div")
        $("a[@href]") {
          attribute("style", "")
        }
      }
      
      $("br[position() > last() - 2]") {
        remove()
      }
      
      inner_wrap("div", class: "mw_acc")
    }
    
    $("div[@class='bn_footer_width']") {
      remove()
    }
  }

}

