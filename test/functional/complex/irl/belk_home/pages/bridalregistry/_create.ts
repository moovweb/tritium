# observations:
# when the user chooses to create a new registry
# and signs in with an account that already has a registry,
# they are taken back to the registry page and the only option available is to find a registry

$(".//div[contains(@class, 'hover_modal_container')] | .//span[contains(@class, 'hover_modal_container')]") {
  attribute("data-ur-set", "toggler")
  attribute("class", "")
  $("./a[contains(@class, 'hover_modal_a')]") {
    attribute("class", "")
    attribute("href", "")
    attribute("data-ur-toggler-component", "button")
  }
  $("./div[contains(@class, 'hover_modal_div')]") {
    attribute("data-ur-toggler-component", "content")
  }
}

$(".//div[@id='content']") {
  $("./div[@id='guest_existing_container']") {
    $("./div[@id='guest']") {
      attribute("mw_placeholder", "mw_guest_reg")
    }
    $(".//button") {
      add_class("mwContinueNextStepBTN")
    }
  }
  
  $("./div[@id='bridal_registry_event']") {
    $("./form[@id='form_bridal_registrant_info']") {
      $("./h3") {
        inner() {
          prepend("<div>")
          append("</div>")
        }
        inject_before("<div class='mw_reg_form' data-ur-set='toggler'></div>")
      }
      $("./h3") {
        attribute("data-ur-toggler-component", "button")
      }
      $("./fieldset") {
        attribute("data-ur-toggler-component", "content")
      }
      $("./h3 | ./fieldset") {
        move_to("(preceding-sibling::div[@class='mw_reg_form'])[last()]", "bottom")
      }
  
      $("./div[@class='mw_reg_form' and position() > 1]") {
        $(".//fieldset") {
          attribute("data-ur-state", "disabled")
        }
      }
      
      $("./div[@class='mw_reg_form' and position() = 1]") {
        add_class("mw_first")
        $("./h3") {
          attribute("data-ur-state", "enabled")
        }
        $("./fieldset") {
          attribute("data-ur-state", "enabled")
        }
      }
    }
  }
}
