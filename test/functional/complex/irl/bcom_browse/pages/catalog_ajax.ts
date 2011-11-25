$(".//div[starts-with(@class, 'productThumbnail')]") {
  $("div[@id='productThumbnailLink']/a/img[position() > 1]") {
    remove()
  }
  wrap_together("div[not(@id) and not(@class='mw_prod_info')]", "div", class: "mw_prod_info")
}
