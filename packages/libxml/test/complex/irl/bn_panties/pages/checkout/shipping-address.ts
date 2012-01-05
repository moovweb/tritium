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
      move_here("div[@class='GeneralCheckoutMessage']", "bottom")
    }
    # Express checkout section
    $("./div[@class='expressCheckoutContainer']") {
      insert_top("div", "", class: "mw_acc_content") {
        move_here("../*[position() > 1]")
        attribute("data-ur-toggler-component", "content")
        attribute("data-ur-state", "disabled")
        attribute("data-ur-id", "expressCheckout")
      }
      insert_top("div", "", class: "mw_acc_header") {
        move_here("../div[@class='mw_acc_content']/b | ../div[@class='mw_acc_content']/span[@class='fontNote']")
        attribute("data-ur-toggler-component", "button")
        attribute("data-ur-state", "disabled")
        attribute("data-ur-id", "expressCheckout")
        insert_bottom("div", class: "icons-accordion-closed")
        insert_bottom("div", class: "icons-accordion-open")
      }
      $("./div[@class='mw_acc_content']") {
        $("./div[@class='clear'] | ./br") {
          remove()
        }
        move_here(".//div[@class='expressCheckCopy']") {
          attribute("style") {
            remove()
          }
          
          wrap_text_children("p")
          
          $("./p[2] | ./br") {
            remove()
          }
          
          insert_bottom("div", "") {
            move_here("../b[1] | ../p[1]")
            move_here("./p/text()")
            
            $("./b") {
              name("span")
            }
            $("./p") {
              remove()
            }
          }
          insert_bottom("div", "") {
            move_here("../b[1] | ../p[1]")
            move_here("./p/text()")
            
            $("./b") {
              name("span")
            }
            $("./p") {
              remove()
            }
          }
        }
        move_here(".//input[@class='btst_LoginBtn' and @type='text']") {
          attribute("style") {
            remove()
          }
          insert_before("span", "Email Address", class: "")
        }
        move_here(".//input[@class='btst_LoginBtn' and @type='password']") {
          attribute("style") {
            remove()
          }
          insert_before("span", "Password")
        }
        move_here(".//a[@class='fontNote']")
        move_here(".//input[@type='image']") {
          attribute("style", "display: none")
        }
        # The "button clicking a button" trick
        insert_bottom("div", "Sign In") {
          attribute("id", "mw_express_checkout_button")
          attribute("onclick", "document.getElementById('ctl00_cphMainContent_CheckoutLoginControl_LoginControl_LoginButton').click();")
        }
        
        $("./div[@class='expressCheckoutLoginContainer'] | ./div[@class='expressCheckoutPayPalContainer']") {
          remove()
        }
      } # end mw_acc_content
    }

    # Billing and shipping address sections
    $("div[@class='reviewShipContainer'][last()]") {
      $("div[@class='clearHidden']") {
        remove()
      }
      $("div[@class='expressBilling' or @class='expressShipping']") {
        $("br") {
          remove()
        }
        move_here("table/tr") {
          name("div")
          $("td") {
            name("span")
            # privacy policy link
            $("table/tr/td/span/a[@onclick][not(@href)]") {
              attribute("onclick") {
                value() {
                  replace(/.+?\(/, "window.open(")
                  rewrite("link")
                }
              }
            }
            # NOTE: cannot also change input[contains(@id, 'phoneNumberTextBox')]/@type to tel
            # since "Check if same" checkbox JS only allows input[@type='text']
            $("input[contains(@id, 'email_to_notify')]") {
              attribute("type", "email")
              attribute("autocapitalize", "off")
            }
            # remove empty spans
            $("self::span[not(* or normalize-space(.))]") {
              add_class("empty")
              remove()
            }
          }
        }
        $("table") {
          remove()
        }
      }
      # De-tabulate the e-mail opt-in/out message
      $("div[@class='expressBilling']/div[last()]") {
        move_here("span/table/tr") {
          name("span")
          move_here("td/input | td/span") {
            attribute("style") {
              remove()
            }
            $("font | a") {
              attribute("style") {
                remove()
              }
            }
          }
          $("td") {
            remove()
          }
        }
        $("span[table]") {
          remove()
        }
        # separate privacy policy popup
        move_here("span/span[last()]")
      }
      $("div[contains(@id,'ShippingInfoBottom')]") {
        $("div[@class='checkoutBtn']/div[@class='cartBtns']") {
          insert_bottom("div", "Continue Checkout") {
            attribute("id", "mw_checkout_button")
            attribute("onclick", "document.getElementById('ctl00_cphMainContent_ShippingInfoBottomButton').click();")
          }
        }
      }
    }
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
  $("form/div[@class='bn_footer_width']") {
    remove()
  }
}
