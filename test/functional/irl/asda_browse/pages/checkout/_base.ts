# Elements that are common across the checkout flow
# Control from within one file

$("body") {
  add_class("mw_checkout")
  $(".//link | .//style") {
    remove()
  }
  # Remove page logos
  $(".//h1[@id='asdalogo']") {
    remove()
  }
  # Removing the Search Bar in the Header
  $("./div[@id='mw_header']") {
    attribute("style","height: 60px;")
    
    $("./div[@id='mw_global_search']") {
      remove()
    }
  }
  
  
  #TODO: Create the headers for each page
  $("./div[@id='mw_mainWrapper']") {
    # Breadcrumbs
    $(".//div[@id='ordernav']") {
      move_to("../h2[@class='sifr']", "before")
      $("./ul") {
        $("./li") {
          inner_wrap("div", class: "mw_orderNav_li")
          inner() {
            replace(/(\d)\.\s/, "<span class='mw_li_num'>\\1 </span>")
            replace(/Slot booking/, "Delivery")
            replace(/Promotions\/(eVouchers)/, "\\1")
          }
          $("./div/span") {
            move_to("..", "before")
          }
        }
      }
      $("./div") {
        remove()
      }
    }
    $(".//div[@id='options']") {
      #remove()
      add_class("mw_testing")
    }
    $("./ul") {
      remove()
    }
    $(".//ul[@id='lognav'] | .//form/br") {
      remove()
    }
  }
  # Remove the Promos
  $(".//div[@class='promoPanel']") {
    remove()
  }
  # Remove the clearing divs
  # $(".//div[contains(@class,'dropbelow')]") {
  #    # remove()
  #  }
  $(".//div[@id='footer']") {
    remove()
  }
}
