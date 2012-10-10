# Test added because the Reference engine gave an 'add_previous_sibling' error
html() {
  $name = fetch(".//div[@id='my_div']/@id")
  match($name, regexp("MY_DIV", "i")) {
      log("We reached my div!")
  }
}