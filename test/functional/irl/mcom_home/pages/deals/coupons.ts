# Coupon Page

html() {
  $("/html/body") {
    add_class("mw_coupons")
    inner() {
      replace(/&amp;/, "&")
    }
  } 
}