# Handle collapsible items on master pages

attribute("data-ur-set", "toggler")
$("self::*[not(div[@class='productImage'])]") {
  insert_top("div", class: "productImage")
}
$("div[@class='productImage']") {
  attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
  insert_top("span", class: "mvItemAccordianBtn") {
    insert("span", "+", class: "mvPlus")
    insert("span", "&minus;", class: "mvMinus")
  }
  # EXPLICIT: a[@class='memberUrlUpdate']
  $("a") {
    # prevent clicking, href is added by their js
    attributes(class: "mw_memberUrlUpdate", href: "")
  }
  move_here("../div[starts-with(@class, 'memberUPCDetails')]/div[@class='memberShortDesc']") {
    # EXPLICIT: a[@class='memberUrlUpdate']
    $("a") {
      var("pdp_url", fetch("@href"))
      name("span")
      attributes(class: "mw_memberUrlUpdate2", href: "")
    }
  }
  move_here("../div[@class='productPriceSection']")
  wrap_together("div[@class='memberShortDesc' or @class='productPriceSection']", "div", class: "mw_acc_item_wrapper")
}
$("div[starts-with(@class, 'memberUPCDetails')]") {
  @import _product-selections.ts
  $("div[starts-with(@class, 'pdpShipDays')]") {
    move_here("../../div[@class='memberProdButtons']/div[@id='memberProdQty']", "before")
  }
}
$("div[@class='memberProdButtons']") {
  # EXPLICIT: div[@class='memberOrderByPhone']/img[@id='orderByPhoneImage']
  $("div[@class='memberOrderByPhone']/img") {
    attributes(id: "", src: asset("buttons/clickToCall.png", "image"))
    wrap("a", href: "tel:800-289-6229")
  }
  $("img[@class='addToBagButton']") {
    attribute("src", asset("buttons/addToBag.png", "image"))
  }
  $("img[@class='addtoregistryClass']") {
    attribute("src", asset("buttons/addToRegistry.png", "image"))
  }
  $("img[starts-with(@id, 'finditinstore')]") {
    attribute("src", asset("buttons/findInStore.png", "image"))
  }
  # make buttons look clickable
  $("img") {
    attribute("onclick", "void(0)")
  }
  wrap_together("img", "div", class: "mw_bag_buttons")
  $("div[@class='mw_bag_buttons']") {
    move_here("../div[@class='memberOrderByPhone']", "top")
    move_here("../div[@class='onlineExclusiveText']")
    move_here("../../div[@class='productImage']/div[@class='mw_acc_item_wrapper']/div[@class='productPriceSection']/div[@class='memberPriceSaleEndText']")
  }
}
wrap_together("div[starts-with(@class, 'memberUPCDetails') or @class='memberProdButtons']", "div", data-ur-toggler-component: "content", data-ur-state: "disabled") {
  insert_top("a", "More Information", class: "mw_more_info", href: $pdp_url)
}