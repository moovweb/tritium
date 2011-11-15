
$("./div[@class='need_help' or @class='privacy_security_guarantee']") {
  var("accd_name", fetch("@class"))
  $("./h3|./span[@class='hover_modal_container']/a") {
    attribute("mw_accordion", $accd_name)
    attribute("class", " mw_accordion_button")
    attribute("href", "javascript:void(0)")
    attribute("data-ur-toggler-component", "button")
    inject_bottom("<div class='icons-nav_arrow_dn'></div>")
    inject_bottom("<div class='icons-nav_arrow_up'></div>")
    $("../.") {
      attribute("data-ur-set", "toggler")
    }
  }
  $("./ol|./ul|./span[@class='hover_modal_container']/div") {
    attribute("mw_accordion", $accd_name)
    attribute("class", "mw_accordion_content")
    attribute("data-ur-toggler-component", "content")
  }
  $("./ol|./ul") {
    $("./li") {
      $("./a") {
        inject_bottom("<div class='icons-subnav_arrow_right'></div>")
      }
    }
    $("./li[2]") {
      $("./a") {
        attribute("href", "/AST/Misc/Belk_Stores/Customer_Service/Shipping.jsp")
      }
    }
  }
}

#order summary
$("./div[@class='checkout_promo_message']") {
  move_to("../div[@class='summary_of_charges']/ol", "bottom")
  name("li")
  add_class("mw_checkout_promo")
}

$("./div[@class='summary_of_charges']") {
  #toggle-button
  #toggle-selector
  attribute("toggle-button", "h3")
  attribute("toggle-selector", "ol")
  $("./preceding-sibling::a") {
    add_class(" mw_back_to_bag")
    move_to("../../.", "top")
  }
  move_to("../../a[contains(@class,'mw_back_to_bag')]", "after")
}


# Need to neuter the privacy link so that their js doesnt set a target/onclick etc
# I would do this in the above scope, except for this issue (the boolean gotcha)
# https://sites.google.com/a/moovweb.com/home/wiki/moovweb-proxy/product-roadmap/v2-plan/tips-gotchas

$("./div[@class='privacy_security_guarantee']") {
  attribute("class") {
    remove()
  }
}
