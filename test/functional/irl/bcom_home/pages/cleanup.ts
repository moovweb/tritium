$(".//*[contains(concat(' ', @class, ' '), ' mvRemoveMe ')]") {
  remove()
}
$(".//div[contains(concat(' ', @class, ' '), ' r_nav_top_bag_links ')]") {
  $("./script[contains(text(), 'document.write')]") {
    remove()
  }
}