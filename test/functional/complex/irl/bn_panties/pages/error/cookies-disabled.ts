$("body") {
  add_class("mw_cookies_disabled")
  $("form/div[@id='mainContainer']") {
    $("div[@id='leftNav'] | div[@class='bn_footer_width']") {
      remove()
    }
  }
}
