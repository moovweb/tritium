$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[1]/a") {
  add_class("mw_subscription_complete")
}
$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[2]/a") {
  add_class("mw_subscription_active")
}

copy_here("//corpse//form[@name='ProcessSubscriptionForm']") {
  add_class("mw_process_form")
  
  text("")
  
  insert_bottom("div", "", class: "mw_process_subscription_info mw_process_info") {
    inject_bottom("<b class=\"title\">Subscription Information</b>")
    
    insert_bottom("div", "", class: "mw_process_subscription_info_content mw_process_info_content") {
      copy_here("//corpse//form//table//table//table[1]//tr[./td[@align='right']]")
    }
  }
  insert_bottom("div", "", class: "mw_process_billing_info mw_process_info") {
    inject_bottom("<b class=\"title\">Billing Information</b>")
    
    insert_bottom("div", "", class: "mw_process_billing_info_content mw_process_info_content") {
      copy_here("//corpse//form//table//table//table[2]//tr[./td[@align='right']]")
      
      $("./tr[1]") {
        remove()
      }
    }
  }
  insert_bottom("div", "", class: "mw_process_billing_address mw_process_info") {
    inject_bottom("<b class=\"title\">Billing Address</b>")
    
    insert_bottom("div", "", class: "mw_process_billing_address_content mw_process_info_content") {
      copy_here("//corpse//form//table//table//table[3]//tr[./td[@align='right']]")
      
      move_here(".//a", "before") {
        wrap("div") {
          attribute("class", "edit")
        }
      }
      
      $("./tr[1]") {
        remove()
      }
      
    }
  }
  insert_bottom("div", "", class: "mw_process_credit_card_info mw_process_info") {
    inject_bottom("<b class=\"title\">Credit Card Information</b>")

    insert_bottom("div", "", class: "mw_process_credit_card_info_content mw_process_info_content") {
      copy_here("//corpse//form//table//table//table[4]//tr[./td[@align='right']]")
      
      move_here(".//a", "before") {
        wrap("div") {
          attribute("class", "edit")
        }
      }
      
      $("./tr[1]") {
        remove()
      }
    }
    
  }
  
  $("./div/div/tr") {
    name("div")
    
    attribute("class") {
      remove()
    }

    $("./td[@align='right']") {
      name("label")

      attribute("align") {
        remove()
      }
      attribute("width") {
        remove()
      }
    }
    $("./td") {
      name("span")

      attribute("width") {
        remove()
      }
    }
  }
  
  insert_bottom("div", "") {
    move_here("//corpse//form//input[@type='hidden']")
  }
  
  move_here("//corpse//form//input[@type='image']") {
    attribute("src", asset("images/continue_text.png"))
  }
  
  move_here("//corpse//form//table//table//table//td[@align='left']/p") {
    name("div")
    
    attribute("class", "mw_process_footnote")
    
    inner() {
      replace(/^\s*\*/, "<span>Please Note:</span> ")
    }
  }
}
