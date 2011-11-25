###### Checkout Signin ######
$("/html/body") {
  add_class("mw_checkout_signin")
  
  $(".//div[@id='content']") {
    $("./div[@class='box_wrap']") {
      $("./h3") {
        remove()
      }
    }
  }
}
