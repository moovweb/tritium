
$("//div[contains(@class, 'pdp_member_zoom')]"){
  remove()
}
$("//div[contains(@class, 'pdp_memberProductContainer')]"){
  $product_toggle_id = concat("product_toggle_", index())
  attribute("data-ur-id", $product_toggle_id)
  attribute("data-ur-state", "disabled")
  attribute("data-ur-toggler-component", "content")
  # make the master product header
  inject_top("<div></div>"){
    add_class("mw_master_prod_header")
    attribute("data-ur-id", $product_toggle_id)
    attribute("data-ur-state", "disabled")
    attribute("data-ur-toggler-component", "button")
    inject_top("<div></div>"){
      add_class("mw_master_prod_description")
      move_here("./../..//div[contains(@class, 'pdp_member_description')]/div[contains(@class, 'pdp_price')]", "top")
      copy_here("./../..//div[contains(@class, 'pdp_member_description')]/div[contains(@class, 'pdp_product_txt')]", "top")
    }
    move_here("./..//div[contains(@class, 'pdp_member_img')]//a[@id='zoomImage']/img", "top"){
      # strip the id to prevent zoom overlay.
      attribute("id", "")
    }
    inject_bottom("<div class='mw_clear_both'></div>")
  }
}
$("//div[contains(@class, 'pdp_pricetc_master')]/div[contains(@class, 'pdp_sizecolor_section1')]/div/.."){
  move_here("./../div[contains(@class, 'pdp_sizecolor_section2')]", "after")
  inject_before("<div class='mw_clear_both mw_top_dots'></div>")
}
$("//div[@class='pdp_member_description']") {
  move_here("../../div[starts-with(@class, 'pdp_memberProductHeader')]", "before") {
    move_here("../div[@class='pdp_member_description']")
  }
}

# add a special class type for each radio button in the bedding size select.
$("//form[@name='bedSizeForm']//label"){
  $innerText = fetch("./text()")
  $id = fetch("./@for")
  $location = concat("//input[@type='radio'][@id='", $id, "']")
  $($location){
    add_class(concat("mw_", $innerText))
  }
  $("../text()"){
    remove()
  }
  remove()
}# end bedding special class.
