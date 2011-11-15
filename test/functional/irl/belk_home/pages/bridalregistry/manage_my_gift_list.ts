$("/html/body") {
  add_class("bridal_registry_manage_my_gift_list")
  
  $(".//div[@id='content']") {
    $(".//div[@id='sd']") {
      remove()
    }
    $(".//div[@id='my_gift_list']") {
      $("./div[@class='sort']") {
        attribute("data-ur-set", "toggler")
        $("./h4") {
          attribute("data-ur-toggler-component", "button")
          insert_bottom("div", class: "icons-white_nav_arrow_dn")
          insert_bottom("div", class: "icons-white_nav_arrow_up")
        }
        $("./ul") {
          attribute("data-ur-toggler-component", "content")
        }
      }
      $("./div[contains(@class, 'outer_container')]") {
        attribute("data-ur-set", "toggler")
        $("./h3") {
          add_class("mw_accordion_button")
          attribute("data-ur-toggler-component", "button")
          attribute("data-ur-state", "enabled")
          insert_bottom("div", class: "icons-nav_arrow_dn")
          insert_bottom("div", class: "icons-nav_arrow_up")
          $("./span[@class='message']") {
            name("li")
            move_to("../../ul[@class='collapsible_region']", "top")
          }
        }
        $("./ul") {
          add_class("mw_accordion_content")
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "enabled")
          $("./li[contains(@class, 'header')]") {
            remove()
          }
        }
        $(".//div[@class='inner_container']") {
          $("./ul") {
            $("./li[@class='requested']") {
              inner() {
                prepend("<b>Requested:</b>")
              }
            }
            $("./li[@class='needed']") {
              inner() {
                prepend("<b>Still Needed:</b><span>")
                append("</span>")
              }
              inject_after("<li class='mw_price'><b>Price:</b><div class='mw_price_info'></div></li>")
            }
            $("./li[@class='availability']") {
              move_to("../li[@class='item']", "after")
              inner() {
                prepend("<b>Availability:</b><span>")
                append("</span>")
              }
            }
            $("./li[@class='remove']") {
              move_to("../.", "bottom")
              $("input[@type='checkbox']") {
                wrap("div") {
                  attribute("class", "mw_item_remove_container")
                  inject_bottom("<a href='javascript:void(0)' class='mw_reg_remove'><div>Remove</div></a>")
                }
              }
            }
            $("./li[@class='item']") {
              $("./p[contains(., 'UPC #')]") {
                move_to("../.", "after")
                name("li")
                inner() {
                  replace(/UPC/, "<b>UPC:</b><span>")
                  append("</span>")
                }
              }
            }
            $("./li[@class='SaleClearance']") {
              move_to("../li[@class='OriginalPrice']", "before")
              $("./span[@class='USave']") {
                move_to("../.", "after")
                name("li")
              }
            }
            $("./li[@class='SaleClearance' or @class='USave' or @class='OriginalPrice']") {
              name("div")
              move_to("../li[@class='mw_price']/div[@class='mw_price_info']", "bottom")
            }
          }
        }
      }
    }
  }
}
