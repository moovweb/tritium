html_fragment() {
  $$("#my_div") {
    $var = "Match me."
    match($var) {
      with("No match.") {
        log("The match was successful! :)")
      }
      with(/Nope/) {
        log("This would work too.")
      }
      else() {
        log("The match was not successful :(")
      }
    }
  }
}