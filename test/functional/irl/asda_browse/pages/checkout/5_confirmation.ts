# Order Confirmation Page 
# URL: /asda-estore/checkout/orderconfirmationcontainer.jsp
# log($cookie)
# var($cookie) {
#   replace(/(mw_trolley_total)\=\d+\.\d+/, "//1\=0.00")
# }

$("body") {
  add_class("mw_checkout_confirmation")
  $("./div[@id='mw_mainWrapper']") {
    $("./div[@class='noframes-content']") {
      $("./div/div/div[@id='order']") {
        # Dump the three tables on the page, hence the use of .// although it is targeted
        # sorry hampton, don't cry
        $(".//table") {
          add_class("mw_table")
          name("div")
        }
        $(".//tbody") {
          add_class("mw_tbody")
          name("div")
        }
        $(".//tr") {
          add_class("mw_tr")
          name("div")
        }
        $(".//td") {
          add_class("mw_td")
          name("span")
        }
        $(".//th | .//thead") {
          add_class("mw_th")
          name("span")
        }
        $(".//form/div/fieldset") {
          add_class("mw_details")
          # If the phone number isn't present, get rid of that shit
          # Seriously, who built this site?!?!?
          $(".//div[contains(@class, 'mw_tr') and not (node())]") {
            remove()
          }
        }
        # Deal with the Trolley Details
        $("./fieldset/div[@id='sbasket']") {
          $("./div[contains(@class, 'guidanceNote')]/span/br") {
            name("span")
            add_class("mw_br")
          }
          # Deal with the item layout
          $("./div[@id='listitems']") {
            $("./div[contains(@class,'mw_table')]") {
              $("./span/div[contains(@class, 'mw_tr')]") {
                add_class("mw_subs_wrapper")
                inner() {
                  set("<span id='mw_subs'>Allow substitutes?</span>")
                }
              }
              # Reformat the item layout table
              $("./div[contains(@class,'mw_tbody')]") {
                $(".//span[@class='osum-validtxt']") {
                  remove()
                }
                $(".//span[contains(@class, 'li-quantity')]") {
                  wrap("div", id: "mw_li_quantity_wrapper")
                }
                $(".//span[contains(@class, 'li-substitutes')]") {
                  move_to("../.", "top")
                }
                $("./div[contains(@class, 'listitem')]/span[position()=4]") {
                  remove()
                }
              }
            }
          }
        }
        $("./div[@class='navRow']") {
          remove()
        }
        # Change the redirection so the user will return to /asda-estore instead of asda.com
        $("./div[contains(@class, 'buttonNav')]/form[position()='2']") {
          attribute("action") {
            value("/asda-estore/index.jsp")
          }
        }
      }
    }
  }
}
