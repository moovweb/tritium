$("body") {
  attribute("class", "mw_contact_us")
  $("form/div[@id='mainContainer']") {
    # Remove left navigation pane
    $("div[@id='leftNav']") {
      remove()
    }
    
    $("div[@id='ctl00_mainContentContainer']/div[@id='contentContainer']") {
      move_here("table[1]/tr/td/font/*")
      
      $("table[1]") {
        remove()
      }

      $("img[@id='ctl00_cphMainContent_BNImage2']") {
        insert_before("div", "Contact Us", class: "topmostHeader")
      
        remove()
      }
      
      $("p/img[@id='ctl00_cphMainContent_BNImage3']") {
        $("../br[1]") {
          remove()
        }
        insert_before("div", "By Email", class: "header")
        
        remove()
      }
      
      $("p/img[@id='ctl00_cphMainContent_BNImage4']") {
        $("../br[1]") {
          remove()
        }
        insert_before("div", "By Online Form", class: "header")
        
        remove()
      }
      
      $("p/img[@id='ctl00_cphMainContent_BNImage5']") {
        $("../br[1]") {
          remove()
        }
        insert_before("br")
        insert_before("div", "By Phone", class: "header")
        remove()
      }
    
      $("p/img[@id='ctl00_cphMainContent_BNImage6']") {
        $("../br[1]") {
          remove()
        }
        insert_before("div", "By Mail", class: "header")
        remove()
      }
    
      $("a/img[@id='ctl00_cphMainContent_BNImage8']") {
        $("../br[1]") {
          remove()
        }
        inject_before("EMPLOYMENT OPPORTUNITIES")
        remove()
      }
    }

    $("div[@class='bn_footer_width']") {
      remove()
    }
  }
}
