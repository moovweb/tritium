$("/html/body") {
  add_class("mw_bridal_registry_checklist")
  
  $(".//div[@class='checklist']") {
    $("./h3") {
      inject_after("<div class='mw_level_2' data-ur-toggler-component='content'></div>") {
        attribute("data-ur-state", "enabled")
      }
    }
    $("./h4 | ul") {
      move_to("(preceding-sibling::div[@class='mw_level_2'])[last()]", "bottom")
    }
    
    $("./h3") {
      attribute("data-ur-toggler-component", "button")
      attribute("data-ur-state", "enabled")
      add_class("mw_accordion_button")
      inject_before("<div class='mw_level_1' data-ur-set='toggler'></div>")
    }
    
    $(".//div[@class='mw_level_2'] | ./h3") {
      move_to("(preceding-sibling::div[@class='mw_level_1'])[last()]", "bottom")
    }
    
    $(".//div[@class='mw_level_2']") {
      $("./h4") {
        attribute("data-ur-toggler-component", "button")
        attribute("data-ur-state", "enabled")
        add_class("mw_accordion_button_l2")
        inner() {
          prepend("<span>")
          append("</span>")
        }
        inject_before("<div class='mw_level_3' data-ur-set='toggler'></div>")
      }
      $("./ul") {
        attribute("data-ur-toggler-component", "content")
        attribute("data-ur-state", "enabled")
      }
      $("./h4 | ul") {
        move_to("(preceding-sibling::div[@class='mw_level_3'])[last()]", "bottom")
      }
    }
  }
}
