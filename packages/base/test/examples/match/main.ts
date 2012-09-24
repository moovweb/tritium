# Test added because the Reference engine gave an 'add_previous_sibling' error
html() {
  $name = fetch(".//div[@id='my_div']/@id")
  match($name){
    with(/your_div/) {
      log("We reached your div!")
    }
    with(/my_div/) {
      log("We reached my div!")
    }
    else() {
      log("Div not found.")
    }
  }
}