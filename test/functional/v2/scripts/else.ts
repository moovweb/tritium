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