html() {
  $("/html/body") {
    $("./div") {
      attribute("count", index())
      $("./span") {
        attribute("count", index())
      }
    }
  }
}