$("body") {
  attribute("class", "mw_receipt")
  $("form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("div[@class='bn_footer_width']") {
      remove()
    }
    # Use standard styling on the main div
    $("div[@id='ctl00_mainContentContainer']") {
      add_class("mw_acc")
      
      $("div[@id='contentContainer']") {
        move_here("table/tr/td/*")
        $("table[1]") {
          remove()
        }
        
        # transpose table
        $("div/table") {
          name("div")
          add_class("mw_acc")
          attribute("border", "")
          attribute("width", "")
          attribute("style", "")
          $("tr[position() > 1]") {
            name("div")
            $("td") {
              add_class("td")
              attribute("align", "")
              name("div")
            }
            
            # add labels
            copy_here("../tr[1]")
            $("div") {
              move_here("following-sibling::tr/th[1]", "top") {
                name("span")
              }
            }
          }
          
          $("tr") {
            remove()
          }
        }
        
        # shipping info
        $("table[1]") {
          move_here("tr[1]/td/* | tr[4]/td/*", "before")
          remove()
        }
        # remove extra space in front of 'Via'
        $("font[@class='contentsm'][3]/b[1]") {
          inner() {
            replace(/^..(.)/, "\\1")
          }
        }
        # remove extra spaces
        $("table//table/tr/td[1]/font/b") {
          text() {
            replace(/(\w+).*:/m, "\\1:")
          }
        }
        
        $("table") {
          attribute("width", "")
        }
        
      }
    }
  }
}
