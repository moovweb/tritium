var("mw_optimize_using_jquery", "true")
var("mw_no_search_bar", "true")
$checkout = "true"

$("body") {
  attribute("class", "mw_shipping_options")
  $("form/div[@id='mainContainer']") {
    $("table") {
      move_here("tr/td[1]/div", "before")
      remove()
    }

    $("div[@class='checkoutContainer']") {
      $("div[@class='mainTitle' or @class='checkoutNavBtm' or contains(@id, 'CheckoutMessaging')]") {
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

    $("div[@class='reviewShipContainer']") {
      $("div[@class='shippingChoices']") {
        $("br | p") {
          remove()
        }
        # TRIPLY-NESTED TABLE! WHY?!
        $("table") {
          move_here("tr/td/*", "before")
          remove()
        }
        $("table") {
          move_here("tr[@class='shippingChoicesBodyRow']", "before") {
            name("div")
            $("td") {
              name("div")
            }
          }
          remove()
        }
        $("div[@class='shippingChoicesBodyRow']/div/table") {
          move_here("tr", "before") {
            name("span")
            $("td") {
              name("span")
              $("input") {
                attribute("style") {
                  remove()
                }
              }
            }
          }
          remove()
        }
      }
      $("div[contains(@id, 'ShippingMethodBottomPanel')]/div[@class='shippingBtn']") {
        $("div[@style]") {
          attribute("style") {
            remove()
          }
        }
        $("div[input]") {
          attribute("id", "mw_continue_checkout_button")
          attribute("onclick", "document.getElementById('ctl00_cphMainContent_ShippingMethodBottomButton').click();")
          insert_bottom("span", "Continue Checkout")
        }
      }
    }
    $("div[@class='bn_footer_width']") {
      remove()
    }
    $(".//div[@id='footer_bottom_section_checkout']") {
      $(".//img") {
        attribute("src") {
          value() {
            replace(/dcm\/footer\/60day.jpg.*/, "dcm\/footer\/60day.jpg")                
          }
        }
      }
    }
  }
}
