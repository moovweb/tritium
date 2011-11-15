html(){
  $("html/body") {

    attribute("id", "mvShippingFees")
    $("div[@id='shippingFeesContent']") {
      $(".//a[contains(@class,'seeMore')]") {
        remove()
      }
    }


    # checkout shipping fee popup
    match($fake_url, /(\/checkoutswf\/shippingFees)/){
      attribute("id", "mvShippingFees")
      $(".//div[@id='myShippingFeePopupContainer']") {
        $(".//table[@class='myShippingFeePopupCalculatedFees']"){
          $(".//tr/td[3]") {
            remove()
          }
          $(".//tr[@class='myShippingFeePopupCalculatedFeesTotalRow']/td[1]") {
            attribute("colspan", "")
          }
          attribute("style", "")
          $(".//*") {
            attribute("width", "")
            attribute("style", "")
          }
          $(".//a[contains(@class,'seeMore')]") {
            remove()
          }
          
        }            
      }
    }
  
  }
}