add_class("mw_bridal_reg_review")

$(".//div[@id='content']") {
  $("./div[@id='bridal_registry_review']") {
    #$("./form[@name='form_create_review']") {
      $(".//li[contains(@class, 'actions')]") {
        name("div")
        move_to("../../.", "bottom")
      }
      $(".//h3") {
        attribute("mw_wtf")
        inner_wrap("div", class: "mw_nav_text")
        insert_bottom("div", class: "icons-nav_arrow_up")
        insert_bottom("div", class: "icons-nav_arrow_dn")
        inject_before("<div class='mw_reg_form' data-ur-set='toggler'></div>")
      }
      $(".//h3") {
        attribute("data-ur-toggler-component", "button")
      }
      $(".//ul") {
        attribute("data-ur-toggler-component", "content")
        $("./li") {
          $("./p[contains(@class, 'edit_link')]") {
            move_to("../.", "top")
          }
        }
      }
      $(".//h3 | .//ul") {
        move_to("(preceding-sibling::div[@class='mw_reg_form'])[last()]", "bottom")
      }
  
      $(".//div[@class='mw_reg_form' and position() > 1]") {
        $(".//ul") {
          attribute("data-ur-state", "disabled")
        }
      }
      
      $(".//div[@class='mw_reg_form' and position() = 1]") {
        add_class("mw_first")
        $("./h3") {
          attribute("data-ur-state", "enabled")
        }
        $("./ul") {
          attribute("data-ur-state", "enabled")
        }
      }
      
      $(".//div[@class='mw_reg_form' and h3/div[contains(text(), 'Terms')]]") {
        add_class("mw_last")
        $("./h3 | ./ul") {
          attribute("data-ur-state", "enabled")
        }
      }
    #}
  }
}
