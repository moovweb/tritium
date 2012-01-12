$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[1]") {
  add_class("mw_breadcrumb_active")
}

copy_here("//corpse//form") {
  text("")
  add_class("mw_select_radio_form")
  
  move_here("//corpse//form//input[@type='hidden']")

  move_here("//corpse//form//input[@type='image']") {
    attribute("src", asset("images/continue_text.png"))
  }

  $(".//br") {
    remove()
  }
}

# $("./form") {
#   copy_here("//corpse//form/table//td/h1[contains(@class, 'headerbox')]")
#   copy_here("//corpse//form/table//td/div[contains(@class, 'selectbox')]") {
#     text("")
#     
#     copy_here("//corpse//form/table//td/div[contains(@class, 'selectbox')]/div[contains(@class, 'plan')]")
#   }
# }