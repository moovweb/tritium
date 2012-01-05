$("/html/body") {
  attribute("id", "mw_contact")
  
  $(".//*[@id='main_nav' or @id='promo' or @id='subnav' or @id='bread_crumb']") {
    remove()
  }
  
  $(".//div[@id='content']") {
    move_here(".//div[contains(@class, 'h4') and contains(text(), 'Phone')]/..") {
      attribute("section", "phone")
      attribute("style") {
        remove()
      }
      
      $("./div[@id='prodSep']") {
        remove()
      }
      $("./div[not(contains(@class, 'h4'))]") {
        attribute("style") {
          remove()
        }
        inner() {
          # Pro regex fu!
          replace(/(pm).+?\(/im, "$1 (")
          replace(/^\s*([a-zA-Z ]+(?=:))/, "<title>$1</title>")
          replace(/([\d-]{7,})/, "<phone>$1</phone>")
          replace(/^\s*(.+day.+?)(?=<.+>)/, "<time>$1</time>")
        }
        $("text() | ./br") {
          remove()
        }
        insert_top("div") {
          add_class("mw_contact_group")
          
          move_here("../title[last()]/following-sibling::time", "bottom") {
            name("div")
            
            add_class("mw_contact_time")
          }
          move_here("../phone[last()]", "top") {
            name("div")
            
            add_class("mw_contact_phone")
          }
          move_here("../title[last()]", "top") {
            name("div")
            
            add_class("mw_contact_title")
          }
        }
        insert_top("div") {
          add_class("mw_contact_group")
          
          move_here("../title[last()]/following-sibling::time", "bottom") {
            name("div")
            
            add_class("mw_contact_time")
          }
          move_here("../phone[last()]", "top") {
            name("div")
            
            add_class("mw_contact_phone")
          }
          move_here("../title[last()]", "top") {
            name("div")
            
            add_class("mw_contact_title")
          }
        }
      }
    }
    
    $("./*[not(@section)]") {
      remove()
    }
  }
}
