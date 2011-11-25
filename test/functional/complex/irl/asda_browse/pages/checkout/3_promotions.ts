#URL: /evouchers/evoucherscontainer.jsp
# Promotions/eVouchers

$("body") {
  add_class("mw_checkout_promotions")
  $("./div[@id='mw_mainWrapper']") {
    $("./div/div[@id='header-min-width']") {
      remove()
    }
    $("./div[@class='noframes-content']/div[@id='vouchers']") {
    
      $("./div[@class='promotypeskeyinfobox']") {
        add_class("mw_handy_vouchers_guide")
      }
      
      $("./div/div") {
        $("./fieldset[@class='greenfade']") {
          $("./h3[@class='evoucherheader']") {
            add_class("mw_testing")
            remove()
          }
          $("./legend") {
            text() {
              set("Choose an eVoucher to add to Your Trolley")
            }
          }
        }
        $("./fieldset[contains(@class,'greenfade left')]/legend") {
          add_class("mw_bottom_legend")
         # remove()
        }
        $("./fieldset") {
          $("./a[@id='whycant']") {
            remove()
          }
          $(".//form") {
            $("./div[@class='silverpromo']") {
              insert_top("div", class: "icons-silver")
            }
            $("./div[@class='goldpromo']") {
              insert_top("div", class: "icons-gold")
            }
            $("./div[@class='bronzepromo']") {
              insert_top("div", class: "icons-bronze")
            }
            $(".//div/strong") {
              name("span")
              add_class("mw_strong")
              $("../br") {
                remove()
              }
              $("../a") {
                attribute("data-ur-toggler-component", "button")
                $("..") {
                  wrap("div", class: "mw_tc_toggler") {
                    attribute("data-ur-set", "toggler")
                  } 
                }
              }
              $("../div[@class='container_tc']") {
                attribute("data-ur-toggler-component", "content")
                move_to("../div[@id='mw_tc_toggler']", "bottom")
              }
            }
          }
        }
      }
    }
    $("div[@class='noframes-content']/div[@id='order']/div[contains(@class, 'full-content topmargin20')]/br") {
      name("span")
    }
  }
}
