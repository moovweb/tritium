# Test added because the Reference engine gave an 'add_previous_sibling' error
doc("html") {
  $(".//div[@id='polar_bear']") {
    bottom() {
      # The error does not occur when the test is written with insert_tag() instead of insert()
      insert("<div id='polar_bear_baby'></div>") {
        wrap("div", id: 'polar_bear_womb')
      }
    }
  }
}