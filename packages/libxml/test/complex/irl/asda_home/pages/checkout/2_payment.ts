#URL: /checkout/checkoutpaymentcardcontainer.jsp
# Add a new payment option

$("body") {
  add_class("mw_checkout_payment")
  $(".//iframe[@name='maincontent']") {
    add_class("mw_checkout_iFrame")
  }
  match($path, /(checkoutpaymentcardframe|checkoutpaymentcardcontainer).jsp/) {
    $("//body/div") {
      $("./h1") {
        remove()
      }
      $("./div[@id='header']") {
        remove()
      }
      $("./div[@id='order']") {
        $("./form[@id='creditcardform']") {
          $("div[@id='sample']") {
            remove()
          }
          $("div[@id='payment']") {
            $("./fieldset") {
              # Remove the JS thats breaking the form experience (auto moving the cursor)
              $(".//input") {
                attribute("onkeyup") {
                  remove()
                }
              }
              # Add in a placeholder attribute for the card number field
              $("./input[@id='cardnumber']") {
                attribute("placeholder", "Number")
                attribute("type", "text")
                # This attribute added to make the keypad a number
                attribute("pattern", "[0-9]*")
              }
              # Add in a placeholder attribute for the card holder name
              $("./input[@id='cardholder']") {
                attribute("placeholder", "Name")
              }
              # Add in a placeholder attribute for the Expiry date.
              $("./input[@id='cardmonth']") {
                attribute("placeholder", "01")
                attribute("type", "text")
                attribute("pattern", "[0-9]*")
              }
              $("./input[@id='cardyearTemp']") {
                attribute("placeholder", "10")
                attribute("type", "text")
                attribute("pattern", "[0-9]*")
              }
              # Add in a placeholder attribute for the Issue number
              $("./div/input[@id='issuenumber']") {
                attribute("placeholder", "Number")
                attribute("type", "text")
                attribute("pattern", "[0-9]*")
              }
              # Add in a placeholder attribute for the Start Date
              $("./div/input[@id='cardstartmonth']") {
                attribute("placeholder", "01")
                attribute("type", "text")
                attribute("pattern", "[0-9]*")
              }
              $("./div/input[@id='cardstartyearTemp']") {
                attribute("placeholder", "10")
                attribute("type", "text")
                attribute("pattern", "[0-9]*")
              }
              # Add in a placeholder attribute for the Card Nickname
              $("./div/input[@id='cardnick']") {
                attribute("placeholder", "Nickname")
              }
              $("legend") {
                remove()
              }
              $("./select") {
                attribute("style") {
                  remove()
                }
                # Their HTML poorly formed
                # They have a ticket to fix it, but until then this hack will continue
                $("./option") {
                  $("../option[@value='Select']") {
                    text("Select")
                  }
                  $("../option[@value='19']") {
                    text("ASDA Credit")
                  }
                  $("../option[@value='0']") {
                    text("Visa")
                  }
                  $("../option[@value='1']") {
                    text("Mastercard")
                  }
                  $("../option[@value='16']") {
                    text("Maestro")
                  }
                  $("../option[@value='17']") {
                    text("Delta")
                  }
                  $("../option[@value='20']") {
                    text("ASDA Store")
                  }
                  $("../option[@value='21']") {
                    text("Visa Electron")
                  }
                  $("../option[@value='3']") {
                    text("AMEX")
                  }
                }
              }
              $("div[@id='secureCodeLogos']") {
                remove()
              }
              $("./div/div/div[@class='secureMsgImg']") {
                remove()
              }
              $("../fieldset[position()=1]") {
                attribute("id", "mw_card_billing_address")
              }
              $("../fieldset[position()=2]") {
                attribute("id", "mw_card_info")
                $("./p") {
                  remove()
                }
                $("./div[@class='CVCcode']") {
                  # Remove the extra text in the div area
                  # Doing so mostly for styling purposes
                  inner() {
                    replace(/(You.*card)/, "")
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
