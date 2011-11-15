$("/html/body") {
  add_class("mw_review")
  
  $(".//div[@id='promo']") {
    remove()
  }
  
  $(".//ul[@id='main_nav']") {
    remove()
  }
}
