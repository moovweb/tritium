log("Branching into v2 subscription flow")

# The subscription flow is controlled completely by a server session
# The URL does not quite describe what the page is loading
# Therefore, it is important to determine which page is loaded by its actual content
name("corpse")
wrap("body") {
  @import _breadcrumb.ts
  
  $("//form[@name='PHOptionalBillingInfoForm']") {
    $state = "billing"
  }
  $("//form[@name='SelectSubscriptionForm']") {
    $state = 'select'
    
    $(".//input[@type='radio']") {
      $state = 'radio'
    }
  }
  $("//form[@name='ProcessSubscriptionForm']") {
    $state = 'process'
  }
  $("//form[@name='ConfirmationForm']") {
    $state = 'confirm'
  }
  $("//form[@name='subContinueButtonForm']") {
    $state = 'upsell'
  }

  copy_here("//corpse//table[contains(@class, 'errorMessageBox')]") {
    name("div")
    
    text("")
    
    copy_here("//corpse//table[contains(@class, 'errorMessageBox')]//img")
    copy_here("//corpse//table[contains(@class, 'errorMessageBox')]//strong[text()]")
    
  }

  match($state) {
    with(/billing/) {
      log("--> v2 subscription -> billing.ts")
      @import billing.ts
    }
    with(/select/) {
      log("--> v2 subscription -> select.ts")
      @import select.ts
    }
    with(/radio/) {
      log("--> v2 subscription -> select_radio.ts")
      @import select_radio.ts
    }
    with(/process/) {
      log("--> v2 subscription -> process.ts")
      @import process.ts
    }
    with(/confirm/) {
      log("--> v2 subscription -> confirm.ts")
      @import confirm.ts
    }
    with(/upsell/) {
      log("--> v2 subscription -> upsell.ts")
      @import upsell.ts
    }
  }
  
  insert_bottom("div") {
    move_here("//corpse//script | //corpse//noscript")
  }
  
  $("./corpse") {
    remove()
  }
}
