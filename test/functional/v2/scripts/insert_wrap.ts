# Test added because the Reference engine gave an 'add_previous_sibling' error
html() {
  $(".//div[@id='polar_bear']") {
    # The error does not occur when the test is written with insert() instead of inject()
    inject("<div id='polar_bear_baby'></div>") {
      wrap("div", id: 'polar_bear_womb')
    }
  }
}