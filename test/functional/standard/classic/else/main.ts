// Nothing is actually passed in. The variables are all blank. But, that's ok because its an else() that we are really testing
match($x_moov_api) {
  with(/true/) {
    append("failed")
  }
  else() {
    match($path) {
      with("me") {
        append("failed")
      }
      else() {
        match("sushi", /ush/) {
          append("worked")
        }
      }
    }
  }
}