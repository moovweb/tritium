$("./div[@class='privacy_security_guarantee']") {
  var("accd_name", fetch("@class"))
  $("../.") {
    attribute("data-ur-set", "toggler")
  }
  $("./h3|./span[@class='hover_modal_container']/a") {
    attribute("href", "javascript:void(0)")
    attribute("mw_accordion", $accd_name)
    attribute("class", " mw_accordion_button closed")
    attribute("data-ur-toggler-component", "button")
    inject_bottom("<div class='icons-nav_arrow_dn'></div>")
    inject_bottom("<div class='icons-nav_arrow_up'></div>")
  }
  $("./ol|./ul|./span[@class='hover_modal_container']/div") {
    attribute("mw_accordion", $accd_name)
    attribute("class", "mw_accordion_content closed")
    attribute("data-ur-toggler-component", "content")
  }
}
$("./div[@class='privacy_security_guarantee']") {
  attribute("class") {
    remove()
  }
}
