# customer gets taken to the home page after the following
# Click Wedding Registry-->Find Registry-->Enter last name "smith"-->Click first result-->Click Sign On-->Login
# But the url still maps to this page
# So js redirect if we see home_page class
$("/html/body[contains(@class, 'home_page')]") {
  inject_top("<script type='text/javascript'>window.location.href='/';</script>")
}
$("/html/body") {
  add_class("mw_bridal_reg")
  
  $(".//ul[@id='main_nav'] | .//div[@id='promo' or @id='promo_list'] | .//div[@id='hero']/img | .//div[@class='nav']/ul") {
    remove()
  }
  
  $(".//div[@id='hero']") {
    $("./div[contains(@class, 'gel')]") {
      $("/html/body//div[@id='content']") {
        insert_top("div", class: "mw_promo_links")
      }
      remove()
    }
    $("./map") {
      remove()
    }
  }
  
}
