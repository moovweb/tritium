add_class("mw_bridal_reg_create_options")
$(".//div[@id='content']") {
  $("./div[@id='bridal_registry_options']") {
    $("./form[@id='frm_bridal_registry_options']") {
      $(".//li[contains(@class, 'actions')]") {
        name("div")
        move_to("../../../.", "bottom")
      }
      $("./h3") {
        inner_wrap("div", class: "mw_nav_text")
        insert_bottom("div", class: "icons-nav_arrow_dn")
        insert_bottom("div", class: "icons-nav_arrow_up")
        inject_before("<div class='mw_reg_form' data-ur-set='toggler'></div>")
      }
      $("./h3") {
        attribute("data-ur-toggler-component", "button")
      }
      $("./fieldset") {
        attribute("data-ur-toggler-component", "content")
        $(".//ul[@class='event_headers']") {
          $("following-sibling::ol[1]") {
            attribute("mw_attr", "mw_rhs")
            $("./li") {
              $("./ul") {
                $("./li[@class='event_type']") {
                  inject_top("<div>Event Type</div>")
                }
                $("./li[@class='event_name']") {
                  inject_top("<div>Event Name</div>")
                }
                $("./li[@class='event_date']") {
                  inject_top("<div>Date</div>")
                }
                $("./li[@class='event_loc']") {
                  inject_top("<div>Location/City</div>")
                }
                $("./li[@class='event_state']") {
                  inject_top("<div>State</div>")
                }
              }
            }
          }
          remove()
        }
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
