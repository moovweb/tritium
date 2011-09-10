xml() {
  debug() {
    $("//a") {
      inner("Ran")
      wrap("span") {
        attribute("iam", "aspan")
      }
    }
  }
}
