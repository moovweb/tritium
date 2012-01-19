match(fetch(".")) {
  with("") {
    // fetch done on the root should return ""
    set("worked")
  }
  else() {
    set("failed")
  }
}