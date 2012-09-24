# Test added because the Reference engine gave an 'add_previous_sibling' error
html() {
  $name = fetch(".//div[@id='my_div']/@id")
  match_not($name, /my_div/){
      log("We reached my div!")
  }
  log("It should not say \"We reached my div!\" above this log.")
}