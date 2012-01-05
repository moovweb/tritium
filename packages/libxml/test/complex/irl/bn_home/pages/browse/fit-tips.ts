$("./body") {
  attribute("class", "mw_fit_tips")
  $("./form/div[@id='mainContainer']") {
    # Remove left navigation pane
    $("./div[@id='leftNav']") {
      remove()
    }
    # Remove bottom spacer
    $("./div[@class='bn_footer_width']") {
      remove()
    }
    $("./div/div[@id='contentContainer2']") {
      # Remove all but the necessary elements
      $("./*[not (@id='ctl00_cphMainContent_Container4Panel')]") {
        remove()
      }
      # Open the content area we will need to reform
      $("./div/div/*[@id='ctl00_cphMainContent_container4Label']") {
        # Make the container a div
        name("div")
        # Add the accordian container class
        add_class("mw_acc")
        # Remove all but the elements we want
        $("./*[not (self::map)]") {
          remove()
        }
        # Move all the area tags out and convert to hyperlinks
        move_here(".//area[position()>=4 and position()<8]", "bottom") {
          name("a")
          text(fetch("@alt"))
          inner_wrap("span")
        }
        # Remove the map now that we've taken it's links out
        $("./map") {
          remove()
        }
      }
    }
  }
}
