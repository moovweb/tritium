$("body") {
  attribute("class", "mw_edit_account")
  $("form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("div[@class='bn_footer_width']") {
      remove()
    }
    
    $("div[@id='ctl00_mainContentContainer']") {
      add_class("mw_acc")
      move_here("table/tr/td/*")
      $("table[1]") {
        remove()
      }
      $("table") {
        move_here("tr/td/*", "before")
        remove()
      }
      # removing Sign In Information from table
      $("table[1]") {
        move_here("tr/th/* | tr/td/* | tr/div/td/*", "before") {
          # format required labels
          $("self::font[@class='labelsm']") {
            inner() {
              replace(/>(\w)/, "> \\1")
            }
            $("font[normalize-space(text())]") {
              inner() {
                set("&bull;")
              }
            }
          }
          
          $("self::input[contains(@id, '_EmailTextBox')]") {
            attribute("type", "email")
            attribute("autocapitalize", "off")
          }
        }
        remove()
      }
      
      # removing Personal from table
      $("div/table") {
        $("tr/td/table") {
          move_here("tr/td/*", "before")
          remove()
        }
        move_here("tr/td/*", "before")
        remove()
      }
      
      # removing Contact Information from table
      $("table[tr/td/table]") {
        move_here("tr/td/table/tr/td/*", "before")
        remove()
      }
      
      $("input[@type='image']") {
        wrap("div", class: "mw_button_hack")
          # clicking original button doesn't work if you change its type to button or submit
        insert_before("input", type: "button", value: "Submit", onclick: "javascript:this.nextSibling.click()")
      }
    }
  }
}
