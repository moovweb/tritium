html(){
  $("/html/body") {
    add_class('mw_billpay')

    $("div[@id='doc3']/div[@id='bd']/div[@id='globalContentContainer']//div[@id='localContentContainer']"){
      $("h4") {
        inner("pay bill online")
        add_class("mvTitle")
        inject_bottom("<a class='mvBackBtn' href='/myinfo/index.ognc'>Account</a>")
      }
      $("span[@class='divider']") {
        remove()
      }
      $("h5") {
        add_class("mvSubTitle")
        inject_bottom("<span class='mvPageMenu2' data-ur-toggler-component='button' data-ur-id='mvPaybillSubmenu' data-ur-state='disabled'></span>")
        inject_after("<div class='mvPaybillSubmenu' data-ur-toggler-component='content' data-ur-id='mvPaybillSubmenu' data-ur-state='disabled'><div class='mvWhiteBar'><a href='/credit/payment/onetimeselect'>One-time Payment</a></div><div class='mvWhiteBar'><a href='/credit/payment/recurringselect'>Automatic Payments</a></div><div class='mvWhiteBar'><a href='/credit/paymenthistory/history'>Payment History</a></div></div>")
      }
  
      # move the breadcrumbs here
      $("./ul[@id='paymentSteps']") {
        $("./img") {
          wrap("li", id: "mv_arrow")
          remove()
        }
        $("./li[@id='mv_arrow']") {
          text() {
            set(" > ")
          }
        }
      }
      $("./p[@class='payment']") {
        move_to("../ul[@id='paymentSteps']","after") 
      }
      $("./ul[@id='privacyLinks']/li/span") {
        remove()
      }
    }
  }
}
