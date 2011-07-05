xml()  {
  $(".//*[@id='b']") {
    $("..") {
      attribute("parent", "true")
      $("/") {
        log("root")
      }
    }
  }
}
