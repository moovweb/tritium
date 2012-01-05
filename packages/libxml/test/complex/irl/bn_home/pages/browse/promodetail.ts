$("body") {
  add_class("mw_promodetail")
  # Remove body style which is overriding background
  attribute("style", "")
  attribute("bgcolor", "")
  # Open context for main content area
  $(".//div[@id='offerContainer']") {
    $("img") {
      wrap("div") {
        add_class("mw_image_container")
      }
    }
    $("div[@id='ctl00_cphMainContent_ExcludedBrandsPanel']") {
      $("a[@onclick]") {
        attribute("onclick") {
          value() {
            replace(/opener\./, "")
            replace(/window\.close\(\)/, "")
            rewrite("link")
          }
        }
      }
    }
    # Close button at bottom of page
    $("p[last()]") {
      add_class("mw_button_container")
      $("a") {
        # This will also remove the img for us :)
        add_class("mw_button")
        text("Close")
      }
    }
  }
}
