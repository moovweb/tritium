$("/html/body") {
  ##### Shipping ######
  add_class(" mw_checkout_shipping")
  ##Checking out As Guest and Sign up uses the same flow with slight variations
  #$(".//div[@id='checkout_shipping']"){
  #  $(".//div[@class='registration']"){
  #    $("../../."){
  #      attribute("class","mwCheckoutRegistration")
  #    }
  #  }
  #  $("./form") {
  #    $("./fieldset") {
  #      $("./ol[@class='address_form']") {
  #        $("./li") {
  #          $("./label[@class='error']") {
  #            attribute("style", "display:none;") # for some reason, adding a display:none for the .error class
  #                                                # in the css wasn't working, so doing it here inline
  #                                                # really not my first choice
  #          }
  #        }
  #      }
  #    }
  #  }
  #}
  #$("//div[@class='mwCheckoutRegistration']"){
  #  log("empty selector")
  #}
  #
  #
  #$("//div[@class='actions']/button"){
  #  attribute("class","mwContinueNextStepBTN")
  #}
  ##If the user is already logged in and navigates to the checkout flow he/she will see this
  #$("//div[@id='checkout_shipping' and @class='existing']") {
  #  $(".//button[contains(@class,'action_3')]"){
  #    attribute("class"){
  #      value{
  #        append("  mw_back_to_bag")
  #      }
  #    }
  #  }
  #  $(".//button[contains(@class,'action_2')]"){
  #    attribute("class"){
  #      value{
  #        append("  mw_back_to_bag")
  #      }
  #    }
  #  }
  #
  #}
  $(".//div[contains(@id, 'main')]") {
    add_class("mw_main_shopping")
  }
  $(".//div[@id='content']") {
    $("./h1") {
      remove()
    }
    $("./div[@id='checkout_shipping']") {
      $("./form") {
        $("./h2") {
          inject_before("<div class='mw_shipping_addy_contain'></div>")
        }
        $(".//fieldset") {
          # Split the Shipping location options into two li's
          $("./ol[@id='where_to_ship']") {
            var("ship_to_another_address", fetch("./li/label[2]"))
            $("./li/label[2]") {
              remove()
            }
            insert("li", $ship_to_another_address, class: "ship_to")
            
            # Enable 'tabbing' functionality for the shipping options
            # First the radio buttons...
            $("./li/label[1]/input[@type='radio']") {
              attribute("data-ur-id", "1")
              attribute("data-ur-tab-component", "button")
            }
            $("./li/label[2]/input[@type='radio']") {
              attribute("data-ur-id", "2")
              attribute("data-ur-tab-component", "button")
            }
            
            # Second, show or hide the divs according to which button is selected
            $("./../div[@id='ship_to_bride']") {
              attribute("data-ur-id", "1")
              attribute("data-ur-tab-component", "content")
            }
            $("./../div[@id='ship_to_me']") {
              attribute("data-ur-id", "2")
              attribute("data-ur-tab-component", "content")
              attribute("style", "display: none") #This should be hidden at first
            }
          }
          
          $("./ol[@class='address_form' or @class='existing']") {
            #move_to("../.", "bottom") # very odd.  appears that moving certain fields and then submitting the form will give an error page with the message "Security Exception"
            $("./li[label[@for='txt_area_code']]") {
              add_class("mw_phone_fields")
            }
          }
          $(".//a[@id='po_boxes_lnk']") {
            var("po_box_acc", fetch("@id"))
            attribute("id", "")
            attribute("data-ur-id", $po_box_acc)
            attribute("data-ur-toggler-component", "button")
          }
          $(".//div[@id='po_boxes_div']") {
            attribute("id", "")
            attribute("data-ur-id", $po_box_acc)
            attribute("data-ur-toggler-component", "content")
          }
          $(".//a[@id='apo_fpo_lnk']") {
            var("apo_fpo_acc", fetch("@id"))
            attribute("id", "")
            attribute("data-ur-id", $apo_fpo_acc)
            attribute("data-ur-toggler-component", "button")
          }
          $(".//div[@id='apo_fpo_div']") {
            attribute("id", "")
            attribute("data-ur-id", $apo_fpo_acc)
            attribute("data-ur-toggler-component", "content")
          }
        }
        $("./h2 | ./fieldset | ./ol | ./input") {
          move_to("(preceding-sibling::div[@class='mw_shipping_addy_contain'])[last()]")
        }
        $(".//div[@class='actions']") {
          move_to("../.", "bottom")
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
