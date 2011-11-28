$("body") {
  attribute("class", "mw_feedback")
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
      
      $("font/table/tr/td") {
        $("input[@type='image']") {
          attribute("type", "button")
          attribute("style") {
            remove()
          }
        }
        
        $("input[@id='ctl00_cphMainContent_btnSubmit']") {
          attribute("value", "Submit")
        }
        
        $("input[@id='ctl00_cphMainContent_ClearButton']") {
          attribute("value", "Clear Form")
        }
        
      }
            
    }
  }
}
