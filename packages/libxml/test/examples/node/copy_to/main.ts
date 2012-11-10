html_fragment() {
  $("./span[@id='copy_me']") {
    copy_to("../div[@id='copy1']", position("bottom"))
    copy_to("../div[@id='copy2']", "bottom")
    copy_to("../div[@id='copy3']")
  }
}