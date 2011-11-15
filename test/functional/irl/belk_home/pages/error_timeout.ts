$("/html/body") {
  add_class("mw_error mw_timeout")
  
  $(".//ul[@id='main_nav']") {
    remove()
  }
  
  $(".//div[@id='promo']") {
    remove()
  }
}
