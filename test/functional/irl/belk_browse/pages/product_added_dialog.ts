log("product added dialog")
$("form[@name='form_product_detail']") {
  attribute("action") {
    value() {
      rewrite("link")
    }
  }
  $(".//script") {
    attribute("src") {
      value() {
        replace(/^\/media\//, "//www.belk.com/media/")
      }
    }
  }
}
$("div[@class='ajaxContent']") {
  log("Found dialog ajax content!")

  # Rewrite links
  $(".//a") {
    attribute("href") {
      value() {
        rewrite("link")
      }
    }
  }
  
  $(".//div[@class='info']") {
    $("./p[@class='original_price' or @class='sale_price' or @class='price']") {
      #move_to("//div[@class='options']/ul","top") {
      #  name("li")
      #}
      move_to("../../div[@class='options']", "top")
    }
  }
  
  #$(".//div[@class='options']") {
  #  $("./ul/li[@id='edvOverlay']") {
  #    remove() # remove this because it makes another image request
  #  }
  #}
  
  $(".//div[@class='img']/img") {
    var("imgUrl", fetch("@src")) {
      replace(/P_MODAL/, "P_WISH")
    }
    attribute("src", $imgUrl)
    log("*****")
    log($imgUrl)
    log("*****")
    $("../.") {
      move_to("../div[@class='details']/div[@class='options']", "top")
    }
  }
  
  $(".//div[contains(@class, 'action_2l')]") {
    move_to("../.", "top")
  }
  
  $(".//div[contains(@class, 'action_1')]") {
    $("./div/a") {
      inject_bottom("<span>&rsaquo;</span>")
    }
  }
}
