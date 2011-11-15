##### Order Confirmation ######
$("/html/body") {
  add_class("mw_checkout_order_confirm")
  $("./div[@id='page_wrapper']/div[@id='page']/div[@id='main']") {
    $("./div[@id='content']") {
      $("./h1") {
        remove()
      }
      $("./div[@id='checkout_shipping']") {
        $("./ul[@id='order_details']") {
          $("./li[ul[@class='aProduct']]") {
            $("./ul[@class='aProduct']") {
              $("./li[@class='prodRow']/ul") {
                $("./li[@class='price']") {
                  inject_top("<span>Price:</span>")
                }
                $("./li[@class='qty']") {
                  inject_top("<span>Qty:</span>")
                }
                $("./li[@class='amt']") {
                  inject_bottom("<span>Total:</span>")
                  inject_bottom("<span class='mw_price_detail'></span>") {
                    move_here("../p[contains(@class, 'price')]", "bottom")
                  }
                  
                }
              }
            }
          }
        }
        $("./p[@class='print']") {
          remove()
        }
        $("./h2[@class='thankyou']") {
          move_to("../../../div[@class='summary_of_charges']", "before")
        }
        $("./h2[not (@class='thankyou')]") {
          inject_before("<div class='mw_order_conf_item'></div>") {
            log("")
              #attribute("data-ur-set", "toggler")
          }
        }
        $("./h2[not (@class='thankyou')]") {
          #attribute("data-ur-toggler-component", "button")
          #attribute("data-ur-state", "disabled")
          inner_wrap("div", class: "mw_nav_text")
          #bottom() {
          #  insert("<div class='icons-white_nav_arrow_dn'></div>")
          #  insert("<div class='icons-white_nav_arrow_up'></div>")
          #}
          move_to("(preceding-sibling::div[@class='mw_order_conf_item'])[last()]", "bottom")
        }
        $("./ul") {
          #attribute("data-ur-toggler-component", "content")
          #attribute("data-ur-state", "disabled")
          move_to("(preceding-sibling::div[@class='mw_order_conf_item'])[last()]", "bottom")
        }
        $("./div[@id='create_account']") {
          attribute("data-ur-set", "toggler")
          $("./h2") {
            #attribute("data-ur-toggler-component", "button")
            inner_wrap("div", class: "mw_nav_text")
            #bottom() {
            #  insert("<div class='icons-white_nav_arrow_dn'></div>")
            #  insert("<div class='icons-white_nav_arrow_up'></div>")
            #}
          }
          $("./form") {
            #attribute("data-ur-toggler-component", "content")
            $("./fieldset/ol") {
              $("./li[@class='actions']") {
                $("./button[@class='action_1']") {
                  log("")
                }
              }
            }
          }
        }
        $("./div[@class='actions']") {
          $("./div[contains(@class, 'action_2')]") {
            $("./div/a") {
              add_class("mw_back_to_bag")
            }
          }
        }
      }
    }
    $("./div[@class='summary_of_charges']") {
      attribute("class", "mw_summary_of_charges")
    }
    $("./div[@id='sd']") {
      $("./div[@class='cta']") {
        remove()
      }
    }
  }
}
