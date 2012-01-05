add_class("mw_bridal_reg_create_event_details")

$(".//div[@id='content']") {
  $("./div[@id='bridal_registry_event']") {
    $("./form[@id='form_bridal_registrant_info' or @name='form_bridal_registry_info_edit']") {
      $("./h3") {
        inner_wrap("div", class: "mw_nav_text")
        inject_before("<div class='mw_reg_form' data-ur-set='toggler'></div>")
        inject_bottom("<div class='icons-nav_arrow_dn'></div>")
        inject_bottom("<div class='icons-nav_arrow_up'></div>")
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
