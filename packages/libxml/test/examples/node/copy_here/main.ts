html_fragment() {
  $("./div[@id='copy1']") {
    copy_here("../span[@id='copy_me']", position("bottom"))
  }
  $("./div[@id='copy2']") {
    copy_here("../span[@id='copy_me']", "bottom")
  }
  $("./div[@id='copy3']") {
    copy_here("../span[@id='copy_me']")
  }
}