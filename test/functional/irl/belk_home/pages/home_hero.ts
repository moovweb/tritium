$("/html/body") {
  $("../head//*") {
    remove()
  }
  $(".//div[@id='hero']") { # mark all it's children as keepers
    attribute("mw_keep", "true")
    $(".//*") {
      attribute("mw_keep", "true")
    }
    $(".//img") {
      attribute("width", "")
      attribute("height", "")
    }
    move_to("/html/body", "top")
  }
  $(".//*[not(@mw_keep)]") {
    remove()
  }
  #insert_bottom("div", id: "hero") {
  #  insert_bottom("div", id: "promoContainer") {
  #    insert_bottom("img", src: "http://s7d4.scene7.com/is/image/Belk/mobile_hero_073011?&$P_CONTENT$")
  #    insert_bottom("a", href: "/AST/Featured/Promo_Details/wk27_Free_Shipping_99_or_more.jsp", class: "hero")
  #    insert_bottom("a", href: "/AST/Misc/Belk_Stores/Shipping_Offers.jsp", class: "promo2")
  #    insert_bottom("a", href: "/AST/Featured/coupons/belkcoupons.jsp", class: "promo3")  
  #  }
  #}
}