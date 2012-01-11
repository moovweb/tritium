$("//ul[contains(@class, 'mw_subscription_breadcrumbs')]/li[1]") {
  add_class("mw_breadcrumb_active")
}

move_here("//corpse//form[@name='subContinueButtonForm']") {
  insert_bottom("div") {
    move_here("..//input[@type='hidden']")
  }
}