$("./body") {
  add_class("mw_GetInTouchContainer mw_ts_getintouchcontainer")
  log("Get In Touch")
  $("./div[@id='mw_mainWrapper']") {

   $("./div[@id='header'] | .//div[@id='footer'] | ./link | ./ul[contains(@class, 'hideoffscreen')]") {
     remove()
   }
        
   $("./div/div[@id='quickshop-nav-wrapper']") {
      $("..") {
        remove()
      }
    }

    $(".//div[contains(@class,'itemimage')]") {
      attribute("style") { 
        name("data-style") 
      }
    }

    $("./div[@class='noframes-content']") {
      $("./div[@id='breadcrumb']") {
        remove()
      }

      $("./h2[@class='sifr']") {
        wrap("div",class: "mw_topHeaderWrap")
      }

      /*      $(".//fieldset/label | .//fieldset/label/following-sibling::input[not(@type='hidden')] | .//fieldset/label/following-sibling::select[not(@type='hidden')]") {
        wrap("div",class: "mwFields")
      }*/
      $(".//input[not(@type='hidden') and not(@type='radio')] | .//fieldset/select") {
        wrap("div",class: "mwFields")
      }
      
      $(".//input[@id='email']") {
        attribute("type", "email")
      }

      $(".//input[@id='phone']") {
        attribute("type", "tel")
      }
  
      $(".//label[@for='FirstName']") {
        insert_before("div","",class: "mwYourMessage")
      }

      $(".//div[@class='mwYourMessage']/following-sibling::*") {
        move_to("//div[@class='mwYourMessage']")
      }

      $(".//div[contains(@class,'buttonNav')]/button") {
        add_class("mwSendButton")
      }
    }
  }
}

