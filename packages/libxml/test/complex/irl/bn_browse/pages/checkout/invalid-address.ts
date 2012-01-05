var("mw_no_search_bar", "true")
$checkout = "true"

$("body") {
  attribute("class", "mw_shipping_address")


  $("form/div[@id='mainContainer']") {

    $("div[@class='checkoutContainer']") {
      $("div[@class='mainTitle' or @class='clearHidden' or @class='checkoutNavBtm' or contains(@id, 'CheckoutMessaging')]") {
        remove()
      }
      # Breadcrumb/navbar thingie
      $("div[@class='checkoutNav']") {
        $("div[@class='clearHidden']") {
          remove()
        }
        # Insert spacers here -- looks better than css pseudo-elements
        $("div[position() > 1]") {
          insert_before("div", "|", class: "mw_checkout_nav_spacer")
        }
      }
    }

    # Need to extract pairs of table rows and collate them.
    $("div[@class='reviewShipContainer']") {
      $("table") {
        wrap("div", id: "mw_address_fields")
      }
      $("div[@id='mw_address_fields']") {
        move_here("table/tr/td/h2")
        $("table/tr[position()=1 or position()=2]") {
          remove()
        }
        # Pull out the first two trs and un-tr them
        move_here("table/tr[position()=1 or position()=2]") {
          name("div")
          attribute("class", "mw_list")
          move_here("td/font/b")
          $("td") {
            remove()
          }
        }
        # Zip them together
        $("div[@class='mw_list'][1]") {
          $("b") {
            wrap("div", class: "mw_pair") {
              move_here("../../div[@class='mw_list'][2]/b[1]", "bottom")
            }
          }
        }
        $("div[@class='mw_list'][2]") {
          remove()
        }
        $("table/tr[1]") {
          remove()
        }
        # Do the same thing with the next two rows
        move_here("table/tr[position()=1 or position()=2]") {
          name("div")
          attribute("class", "mw_list")
          move_here("td/font/b")
          $("td") {
            remove()
          }
        }
        # Zip them together
        $("div[@class='mw_list'][2]") {
          $("b") {
            wrap("div", class: "mw_pair") {
              move_here("../../div[@class='mw_list'][3]/b[1]", "bottom")
            }
          }
        }
        # sometimes there are empty divs
        $("div[@class='mw_list'][not(*)]") {
          remove()
        }
        $("div[@class='mw_list'][3]") {
          remove()
        }
        # Make a button that clicks the orignal
        move_here("table/tr/td/input") {
          add_class("mw_original_button")
          var("alt", fetch("@alt"))
          wrap("div", class: "mw_secondary_button") {
            attribute("onclick", "this.childNodes[1].click();")
            insert_bottom("span", $alt)
          }
        }
        $("table") {
          remove()
        }
        move_here("h2[3]", "bottom")
      }
      # Make another button that clicks the original
      $("div[contains(@id, 'ShippingInfoValidationBottomPanel')]") {
        move_here("table/tr/td/input", "after") {
          wrap("div", id: "mw_keep_address") {
            attribute("onclick", "document.getElementById('ctl00_cphMainContent_ShippingInfoValidationBottomButton').click();")
            insert_bottom("span", "Continue Checkout")
          }
        }
        remove()
      }
    }
  }
  $("form/div[@class='bn_footer_width']") {
    remove()
  }
}
