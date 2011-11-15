$("/html/body") {
  add_class("mw_my_account_billing_payment")
  $(".//div[@id='content']") {
    $(".//img") {
      remove()
    }
    # saved payment info
    $("./div[@id='account_details']") {
      $("./form") {
        $("./ul[contains(@class, 'profile_bill_info')]") {
          $("./li[1]") {
            remove()
          }
          $("./li[last()]") {
            move_to("../.", "after")
            name("div")
          }
          $("./li") {
            $("./ul") {
              $("li[@class='cardType']") {
                inner_wrap("span")
                insert_top("span", "Card Type:")
              }
              $("li[@class='cardDigits']") {
                inner_wrap("span")
                insert_top("span", "Last 4 Digits:")
              }
              $("li[@class='cardExpire']") {
                inner_wrap("span")
                insert_top("span", "Expiration Date:")
              }
              $("li[@class='cardHolder']") {
                inner_wrap("span")
                insert_top("span", "Cardholder Name:")
              }
            }
          }
        }
      }
    }
    # add a new card
    $("./div[@id='checkout_shipping']") {
      $("./p | ./br") {
        remove();
      }
      $("./h1") {
        move_to("../../div[@id='aside']", "before")
      }
    }
  }
}