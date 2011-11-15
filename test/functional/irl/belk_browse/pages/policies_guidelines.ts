$("/html/body") {
  add_class("mw_policies_guidelines")
  
  $("./div[@id='page_wrapper']") {
    $("./div[@id='page']") {
      $("./div[@id='head']") {
        # remove main navigation and promo for this page
        $("./ul[@id='main_nav']") {
          remove()
        }
        $("./div[@id='promo']") {
          remove()
        }
      }
      $("./div[@id='main']") {
        $("./div[@id='subnav']") {
          move_to("../div[@id='content']", "after")
          $("./ul") {
            $("./li") {
              attribute("toggle-button", "h3")
              attribute("toggle-selector", "ul")
              $("./h3") {
                $("./a") {
                  # removing the href here because it seems redundant - each link is directly accessible here, without having to go to my account
                  attribute("href", "")
                }
              }
              $("./ul") {
                add_class("closed")
              }
            }
          }
        }
        $("./div[@id='content']") {
          $("./div[@class='policies_info']") {
            attribute("toggle-button", "h3")
            attribute("toggle-selector", "div.mw_accordion_content")
            attribute("data-ur-set", "toggler")
            $("./h3") {
              attribute("data-ur-toggler-component", "button")
              insert_bottom("div", class: "icons-nav_arrow_dn")
              insert_bottom("div", class: "icons-nav_arrow_up")
            }
            # no wrapping multiple elements, have to move 'em
            inject_bottom("<div class='mw_accordion_content closed' data-ur-toggler-component='content'></div>")
            $("./*[position()>1 and position() != last()]") {
              move_to("../div[contains(@class,'mw_accordion_content')]", "bottom")
            }
          }
        }
      }
    }
  }
}
