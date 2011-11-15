##### Review ######
$("/html/body") {
  add_class(" mw_checkout_reviews")
  $(".//div[@id='sd']") {
    $("./div[@class='cta']") {
      remove()
    }
    $("./div[@class='promo']") {
      move_to("../../div[@class='summary_of_charges']")
    }
  }
  $(".//div[@id='content']") {
    $("./h1") {
      remove()
    }
    $("./form[@name='form_checkout_verify_order']") {
      attribute("id", "mw_place_order_form")
      #attribute("action") {
      #  value() {
      #    append("?source=mobile")
      #  }
      #}
      #inject_bottom("<input type='hidden' name='source' id='source' value='mobile'/>")
      $(".//div[@id='checkout_shipping']") {
        log("")
        $("./h2") {
          inject_before("<div class='mw_checkout_content'></div>")
        }
        $("./ul[@id='order_details']") {
          $("./li[1]") {
            remove()
          }
          $("./li") {
            $("./ul[@class='aProduct']") {
              $("./li[@class='prodRow']") {
                $("./ul") {
                  $("./li[@class='price']") {
                    inject_top("<b>Price:</b>")
                  }
                  $("./li[@class='qty']") {
                    inject_top("<b>Qty:</b>")
                  }
                  $("./li[@class='amt']") {
                    inject_top("<b>Total:</b>")
                  }
                }
              }
            }
          }
        }
        $("./ul[@class='details']") {
          $("./li/ul/li[strong]") {
            add_class("mw_checkout_order_review_heading")
          }
        }
        $("./h2 | ./ul") {
          move_to("(preceding-sibling::div[@class='mw_checkout_content'])[last()]")
        }
        $("./div[@class='actions']") {
          $("./button[@class='action_1']") {
            $("./div") {
              name("span")
            }
            inject_bottom("<span>&rsaquo;</span>")
          }
        }
      }
    }
  }
}
