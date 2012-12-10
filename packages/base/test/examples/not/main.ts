html_fragment() {
  $$("#my_div") {
    $var = "Don't match me!"
    match($var) {
      not("Don't match me!") {
        log("We won't reach this log...")
      }
      not(/match/) {
        log("We won't reach this log...")
      }
    }
  }
}