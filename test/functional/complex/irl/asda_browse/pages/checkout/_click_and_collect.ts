$("./body") {
  # Since this is actually an AJAX request, the body gets removed via
  # their JS when its injected, so I'm adding a styling class to the 
  # next container element
  $(".//div[@id='bookslotpopup']") {
    add_class("mw_click_and_collect")
    # Remove some top and bottom imgs that are used for styling on the desktop page
    $("./div[@class='bstopbdr' or @class='bsbtmbdr']") {
      remove()
    }
    # Pull out any inline styles on all of the elements (table elements)
    $(".//*") {
      attribute("style") {
        remove()
      }
    }
    # Change the content to make it the way I want
    $("./div[@class='bscontent']") {
      $("./div/a/img/..") {
        text("X")
      }
      $("./table") {
        attribute("width") {
          remove()
        }
        name("div")
        add_class("mw_table")
        $(".//tr") {
          name("div")
          add_class("mw_tr")
          attribute("width") {
            remove()
          }
        }
        $(".//td") {
          name("span")
          add_class("mw_td")
          attribute("width") {
            remove()
          }
        }
      }
    }
    $("./div[@class='bscontent']") {
      $("./div[contains(@class, 'mw_table')]") {
        $count = "l"
        $("./div[contains(@class, 'mw_tr')]") {
          add_class($count)
          $count {
            append("l")
          }
        }
      }
    }
  }
}

match($path) {
  with(/storedetails\.jsp/) {
    $(".//div[@id='bookslotpopup']") {
       add_class("mw_cac_details")
       $("./div/p[not(node())]") {
         remove()
       }
    } 
  }
}