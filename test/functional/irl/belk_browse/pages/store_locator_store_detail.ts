$("/html/body") {
  add_class("mw_store_locator_store_detail")
  
  $(".//ul[@id='main_nav']") {
    remove()
  }
  
  $(".//div[@id='promo']") {
    remove()
  }
  
  $(".//div[@id='subnav']") {
    remove()
  }
  
  $(".//div[@id='aside']") {
    remove()
  }
  
  # remove maps for now, may not be necessary as we'll be implementing
  # find stores near me geolocation feature
  $(".//div[@id='stores_gmap']") {
    remove()
  }
  $(".//script[contains(@src, 'maps.google.com')]") {
    attribute("mw_map_js")
    remove()
  }
  
  $(".//div[@id='store']") {
    $("./ul") {
      $("./li") {
        $("./ul[@class='inpage_NAV']") {
          $("./li") {
            $("./a") {
              inject_bottom("<div class='icons-subnav_arrow_right'></div>")
            }
          }
        }
      }
    }
  }
}
