$("/html/body") {

  attribute("id", "mw_shipping")
  
  $(".//*[@id='main_nav' or @id='promo' or @id='subnav' or @id='bread_crumb']") {
    remove()
  }
  
  $(".//div[@id='content']") {
  
    ## Remove idiosyncrasies and errors from the tables
    $("table[1]") {
      $("tr[1] | tr[last()]") {
        remove()
      }
    }
    $("table[2]/tr[last()]") {
      remove()
    }
    $("table") {
      $("tr[1]") {
        $("td") {
          name("th")
        }
        $("th/strong") {
          wrap("div")
        }
      }
    }
  
    ## Transform tables into nested divs
    $("table") {
      name("div")
      attribute("mw", "table")
      $("tr") {
        name("div")
        attribute("mw", "row")
        $("td | th") {
          name("div")
          attribute("mw", "cell")
        }
      }
    }
  
    $("div[@mw='table']") {
      ## Copy the headers into each row and collate them with their corresponding cells:
      $("div[@mw='row' and position() > 1]") {
        copy_here("../div[@mw='row' and position()=1]", "bottom")
        $("div[@mw='row']/div[1]") {
          remove()
        }
        $("div[@mw='cell' and position() > 1]") {
          wrap("div", mw: "pair") {
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "enabled")
            move_here("../div[@mw='row']/div[1]", "top")
            add_class("closed")
          }
        }
      }
  
      ## Give more descriptive attribute values and remove leftover junk
      $("div[@mw='row' and position()=1]") {
        $("div[@mw='cell' and position() > 1]") {
          remove()
        }
        attribute("mw", "accordion-button")
        attribute("data-ur-toggler-component", "button")
        attribute("data-ur-state", "enabled")
        add_class("mw_accordion_button")
        $("./div") {
          add_class("mw_nav_text")
        }
        insert_bottom("div", class: "icons-nav_arrow_dn")
        insert_bottom("div", class: "icons-nav_arrow_up")
      }
      $("div[@mw='row']") {
        attribute("mw", "sub-accordion")
        # add_class("closed")
        $("div[@mw='row']") {
          remove()
        }
        $("div[@mw='cell']") {
          attribute("mw", "sub-accordion-button")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "enabled")
          add_class("mw_accordion_button_l2")
          inner() {
            prepend("<span>")
            append("</span>")
          }
          $("./span") {
            insert_bottom("div", class: "icons-subnav_arrow_dn")
            insert_bottom("div", class: "icons-subnav_arrow_up") 
          }
        }
      }
  
      ## Wrap the sub-accordions to make some styling easier
      $("div[@mw='sub-accordion' and position()=2]") {
        wrap("div", mw: "sub-accordion-wrapper") {
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "enabled")
          move_here("../div[@mw='sub-accordion']", "bottom")
          add_class("mw_accordion_content")
        }
      }
  
      ## Add the accordion functionality
      attribute("data-ur-set", "toggler")
      $("div[@mw='sub-accordion-wrapper']/div[@mw='sub-accordion']") {
        attribute("data-ur-set", "toggler")
      }
      
      $("./div[@mw='accordion-button']") {
        $("./div[@mw='cell']") {
          $(".//strong[contains(., 'Purchase Amount')]") {
            $("../../../../.") {
              add_class("mw_purchase_amount")
            }
          }
        }
      }
    }
  }
}
