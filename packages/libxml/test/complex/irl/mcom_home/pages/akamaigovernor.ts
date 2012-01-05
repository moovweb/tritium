html() {
  $("html/body") {
    $("./div[@id='globalHeaderContainer']") {
      remove()
    }
    $("./div[@id='globalBodyContainer']/div") {
      $("./img") {
        remove()
      }
      $("./div/div[@id='content']") {
        inject_top("<div class='sprite_me-logo' style='height:32px'></div>")
        attribute("style", "")
      }
    }
  }
}
