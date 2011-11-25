html() {
  $("html/body/div[@id='doc3']/div[@id='bd']/div") {
    $("./div[@id='macysGlobalBanner']") {
      remove()
    }
    $("./div[@id='macysGlobalLayout']/div") {
      attribute("id", "thisContentContainer")
      $("./div[@align='left']") {
        remove()
      }
      $("./div/img") {
        $("./..") {
          attribute("style", "")
        }
        remove()
      }
    }
  }
}
