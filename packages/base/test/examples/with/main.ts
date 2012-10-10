html_fragment() {
  $$("#my_div") {
    $var = "Match me."
    match($var) {
      with("Match me.") {
        log("The match was successful! :)")
      }
      with(/match/i) {
        log("This would work too.")
      }
      else() {
        log("The match was not successful :(")
      }
    }
  }
}