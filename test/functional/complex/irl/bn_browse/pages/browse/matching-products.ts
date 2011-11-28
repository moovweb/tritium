$("head") {
  $(".//script") {
    remove()
  }
  insert_bottom("meta") {
    attribute("http-equiv", "refresh")
    attribute("content", "0; url=/order_basket.aspx")
  }
}
$("body") {
  attribute("class", "mw_matching_products")
  $("*") {
    remove()
  }
}
