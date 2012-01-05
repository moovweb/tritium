var("mw_no_search_bar", "true")
$checkout = "true"

$("body") {
  attribute("class", "mw_payment_options")
  $("form/div[@id='mainContainer']/div[@class='checkoutContainer']") {

    $("div[@class='mainTitle' or @class='checkoutNavBtm']") {
      remove()
    }

    # Bread crumb thingie
    $("div[contains(@class, 'checkoutNav')]") {
      $("div[@class='clearHidden']") {
        remove()
      }
      # Insert spacers here -- looks better than css pseudo-elements
      $("div[position() > 1]") {
        insert_before("div", "|", class: "mw_checkout_nav_spacer")
      }
      # If there is an error message, put it below the navbar
      move_here("preceding-sibling::font", "after")
    }

    $("div[@class='reviewShipContainer']") {
      $("br") {
        remove()
      }

      # De-tablulate and partition the address info
      $("table[@class='checkoutAddressTable']") {
        # Get the header and spacers out of the way
        $("tr[position()=1 or position()=2 or position()=last()]") {
          remove()
        }
        $("tr") {
          # first fix bug where a .reviewShipTd2 should actually be a .reviewShipTd1
          $("td[@class='reviewShipTd2'][following-sibling::*[1][self::td[@class='reviewShipTd2']]]") {
            attribute("class", "reviewShipTd1")
          }
          $("td[@class='reviewShipTd1'][1]") {
            name("span")
            # remove whitespace
            text() {
              replace(/^[^\w]+$/m, "")
            }
            wrap("div", class: "mw_bill_to_row") {
              move_here("../td[@class='reviewShipTd2'][1]") {
                name("span")
              }
            }
          }
          $("td[@class='reviewShipTd1']") {
            name("span")
            # remove whitespace
            text() {
              replace(/^[^\w]+$/m, "")
            }
            wrap("div", class: "mw_ship_to_row") {
              move_here("../td[@class='reviewShipTd2']") {
                name("span")
              }
            }
          }
          move_here("div[@class='mw_bill_to_row' or @class='mw_ship_to_row']", "before")
          remove()
        }
        name("div")
        $("div[@class='mw_bill_to_row'][1]") {
          wrap("div", id: "mw_bill_to") {
            move_here("../div[@class='mw_bill_to_row']")
            insert_top("h2", "BILL TO:")
          }
        }
        $("div[@class='mw_ship_to_row'][1]") {
          wrap("div", id: "mw_ship_to") {
            move_here("../div[@class='mw_ship_to_row']")
            $("div[position()=last()]") {
              remove()
            }
            insert_top("h2", "SHIP TO:")
          }
        }
      }

      # Pull purchase items out of table
      $("table[1]/tr[@class='cartTrData']") {
        name("div")
        $("td") {
          name("span")
        }
        move_here("following-sibling::tr[1]/td") {
          name("span")
        }
      }
      $("table[1]") {
        name("div")
        attribute("id", "mw_purchase_items")
        $("tr") {
          remove()
        }
        $("div[@class='cartTrData']") {
          $("span[contains(@class, 'cartTdPrice')][1]") {
            add_class("mw_unit_price")
            $("preceding-sibling::span[1]") {
              attribute("class", "mw_quantity")
            }
          }
          $("span[contains(@class, 'cartTdPrice')][2]") {
            add_class("mw_total_price")
            $("following-sibling::span[1]") {
              attribute("class", "mw_serial_number")
            }
          }
          $("span[@class='cartTdStatus']/following-sibling::span") {
            remove()
          }
          $("span[@align]") {
            attribute("align") {
              remove()
            }
          }
          $("span[1]") {
            attribute("class", "mw_product_image")
            $("img") {
              attribute("width") {
                remove()
              }
              attribute("src") {
                value() {
                  replace(/\?.*/, "?size=100,100")
                }
              }
            }
            wrap("div", class: "mw_purchase_item_left") {
              move_here("../span[@class='mw_serial_number']")
            }
          }
          $("span[1]") {
            wrap("div", class: "mw_purchase_item_right") {
              move_here("../span[position() != last()]")
            }
          }
        }
        # Pull the title in here too
        move_here("preceding-sibling::b[1]", "top")
      }

      $("div[@class='cartTotalArea']/img") {
        remove()
      }

      $("div[@class='clearHidden']") {
        remove()
      }

      $("div[@class='paymentDeets']") {
        $("br | div[@class='verisignLogo']") {
          remove()
        }
        move_here("table/tr[position() = 1 or (position() mod 2 = 0)]") {
          name("div")
          $("td") {
            name("span")
          }
        }
        $("table") {
          remove()
        }
        $("div//*[@style or @width]") {
          attribute("style") {
            remove()
          }
          attribute("width") {
            remove()
          }
        }
        $("div/span/table") {
          name("div")
          add_class("mw_payment_details_form")
          $("tr[1]") {
            remove()
          }
          $("tr") {
            name("div")
            $("td") {
              name("span")
              # remove whitespace
              $("select[contains(@id, 'ExpireMonth_DDL')]/option[1]") {
                text() {
                  replace(/.*?(\w+)/, "\\1")
                }
              }
            }
          }
        }
        
        $("div/span[a[contains(@href, 'https://www.paypal.com')]] | div[span[a[contains(@href, 'billmelater.com')]]]") {
          remove()
        }
        $("div[.//img[@alt='Pay By PayPal']]") {
          # div layers cleanup
          move_here(".//input[contains(@name, 'PayMethod')]")
          move_here(".//img[@alt='Pay By PayPal']")
          $(".//span") {
            remove()
          }
        }
      }

      # Gift certificates and promo codes
      $("div[@class='paymentCerts']") {
        $(".//*[@style or @width]") {
          attribute("style", "")
          attribute("width", "")
        }
        # remove whitespace
        $("text()[normalize-space(.)]") {
          remove()
        }
        # Need to accordionize this section
        add_class("mw_acc")
        $("b[1]") {
          name("span")
          wrap("div", class: "mw_acc_header") {
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
            insert_bottom("div", class: "icons-accordion-closed")
            insert_bottom("div", class: "icons-accordion-open")
          }
        }
        $("table") {
          name("div")
          add_class("mw_acc_items")
          attribute("data-ur-toggler-component", "content")
          attribute("data-ur-state", "disabled")
          $("tr/td[@colspan='3']") {
            remove()
          }
          move_here("tr/td") {
            name("div")
          }
        }
        inner_wrap("div", class: "mw_acc_section") {
          attribute("data-ur-set", "toggler")
        }
      }

      $("div[contains(@id, 'PaymentBottomPanel')]/div[@class='checkoutBtn']") {
        $("div[@class='cartBtns']") {
          attribute("onclick", "document.getElementById('ctl00_cphMainContent_PaymentInfoBottomButton').click();")
          insert_bottom("span", "Place Order")
        }
        move_to("preceding-sibling::div[1]", "before")
      }
    }
  }
  $("form/div[@id='mainContainer']/div[@class='bn_footer_width']") {
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
