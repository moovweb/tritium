$("/html/body") {
  attribute("class", "category_frame")
  # Remove everything inside the page
  $("./*") {
    remove()
  }
  $("./*[contains(@class, 'hideoffscreen')]") {
    remove()
  }
  $(".//div[@id = 'header']") {
    # hide the login nav area... we can rip this back out via JS in the container
    $("./ul[@id='lognav']") {
      attribute("style", "display: none")
    }
    $("./div[@id='header-min-width']") {
      remove()
    }
    $("./div[@id = 'subnav']") {
      $("ul") {
        attribute("id", "subnav")
        move_to("../../div[@id = 'mainnav']/ul/li/a[@class='on']/..", "bottom")
      }
      # Remove the old wrapping div. We don't need no stink'n wrapping divs where we are going!
      remove()
    }
  }
}
