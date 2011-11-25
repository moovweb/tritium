$("./body") {
  # Add in a speciic class to make it easier to target this page
  add_class("mw_products_not_available")
  # Remove inline styles on certain elements
  $(".//div[@class='itemcontent']") {
    $("./div") {
      attribute("style", "")
    }
  }
}
