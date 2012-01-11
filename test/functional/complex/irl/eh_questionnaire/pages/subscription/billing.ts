$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[1]/a") {
  add_class("mw_subscription_complete")
}
$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[2]/a") {
  add_class("mw_subscription_active")
}

copy_here("//corpse//form[@name='PHOptionalBillingInfoForm']") {
  add_class("mw_billing_form")
  
  text("")
  
  $("//corpse//form//input[@type='text']") {
    $("../preceding-sibling::td | ../preceding-sibling::label") {
      text() {
        replace(/[:*]/, "")
        replace(/^\s*|\s*$/, "")
      }
      
      name("label")
    }
    
    attribute("placeholder", fetch("../preceding-sibling::label/text()"))
  }

  # copy_here("//corpse//form/table//table//table//table", "top") {
  #   move_here(".//font[@color='red']")
  # }
  
  insert_bottom("div", "", class: "mw_billing_info") {
    move_here("//corpse//form/table//table//table//strong[contains(text(), 'Billing Info')]") {
      name("h3")
      
      text() {
        replace(/[:*]/, "")
        replace(/^\s*|\s*$/, "")
      }
    }
    
    move_here("//corpse//form/table//table//table//input[@name='billingFirstName']")
    move_here("//corpse//form/table//table//table//input[@name='billingLastName']")
    move_here("//corpse//form/table//table//table//input[@name='billingStreetAddress1']")
    move_here("//corpse//form/table//table//table//input[@name='billingStreetAddress2']")
    move_here("//corpse//form/table//table//table//input[@name='billingCity']")
    move_here("//corpse//form/table//table//table//input[@name='billingPostalCode']")
    move_here("//corpse//form/table//table//table//select[@name='billingCountryId']")
    move_here("//corpse//form/table//table//table//input[@name='phoneNumber']")
    
    insert_bottom("div", "", class: "mw_email_field") {
      move_here("//corpse//form/table//table//table//input[@name='emailAddress']/following-sibling::strong")
      move_here("//corpse//form/table//table//table//input[@name='emailAddress']")
    }
  }
  
  insert_bottom("div", "", class: "mw_payment_info") {
    move_here("//corpse//form/table//table//table//strong[contains(text(), 'Payment Info')]") {
      name("h3")
      
      text() {
        replace(/[:*]/, "")
        replace(/^\s*|\s*$/, "")
      }
    }

    move_here("//corpse//form/table//table//table//label[contains(@class, 'payment-type')]") {
      # remove paypal
      $("self::label[./img[contains(@src, 'paypal')]]") {
        remove()
      }
      $("self::label[./img[contains(@src, 'visa')]]") {
        insert_bottom("span", "Visa")
      }
      $("self::label[./img[contains(@src, 'mastercard')]]") {
        insert_bottom("span", "MasterCard")
      }
      $("self::label[./img[contains(@src, 'maestro-solo')]]") {
        insert_bottom("span", "Maestro Solo")
      }
      $("self::label[./img[contains(@src, 'amexpress')]]") {
        insert_bottom("span", "American Express")
      }
      $("self::label[./img[contains(@src, 'discover')]]") {
        insert_bottom("span", "Discover")
      }
    }
    move_here("//corpse//form/table//table//table/tr[.//input[@name='creditCardNumber']]") {
      $mw_cvv_id = fetch("@id")
      $mw_cvv_style = fetch("@style")
      
      move_here(".//input", "after") {
        attribute("id", $mw_cvv_id)
        attribute("style", $mw_cvv_style)
      }
      
      remove()
    }
    move_here("//corpse//form/table//table//table/tr[contains(@id, 'cvv')]") {
      $mw_cvv_id = fetch("@id")
      $mw_cvv_style = fetch("@style")
      
      move_here(".//input[@type='text']", "after") {
        attribute("id", $mw_cvv_id)
        attribute("style", $mw_cvv_style)
      }
      
      remove()
    }
    move_here("//corpse//form/table//table//table/tr[@id='cc-expiration']") {
      $mw_cvv_id = fetch("@id")
      $mw_cvv_style = fetch("@style")
      
      move_here(".//select[@name='expirationMonth']")
      move_here(".//select[@name='expirationYear']")
      
      name("div")
      add_class("mw_expiration_block")
      
      $("./td") {
        remove()
      }
    }
    
    move_here("//corpse//form/table//table//table/tr[@id='maestro-month-year']") {
      name("div")
      add_class("mw_maestro_block")
      
      move_here(".//select")
      
      $("./td") {
        remove()
      }
    }
    move_here("//corpse//form/table//table//table/tr[@id='maestro-issue-number']") {
      $mw_cvv_id = fetch("@id")
      $mw_cvv_style = fetch("@style")
      
      move_here(".//input", "after") {
        attribute("id", $mw_cvv_id)
        attribute("style", $mw_cvv_style)
      }
      
      remove()
    }
    
  }
  
  insert_bottom("div", "", class: "asterisktxt") {
    move_here("//corpse//form/table//table//table//table//font[@color='red']") {
      name("div")
      attribute("color") {
        remove()
      }
    }
  }
  
  move_here("//corpse//form//input[@type='hidden']")

  move_here("//corpse//form//input[@type='image']") {
    attribute("src", asset("images/continue_text.png"))
  }
  
}