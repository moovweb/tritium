xml() {
  debug("me") {
    $("//a") {
      inner("Ran")
      wrap("span") {
        attribute("iam", "aspan")
      }
    }
  }
}
