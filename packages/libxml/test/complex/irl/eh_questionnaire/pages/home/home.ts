# Backup original page
name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_home")
  #######################################################
  # First grab each major section from the original page
  #######################################################
  # Grab subscription banner
  $("//*[@id='subscriptionBanner']/a") {
    move_to("/html/body")
    text("")
    insert_top("img", src: asset("images/banner.png"))
    add_class("mw_subscribe_banner")
  }
  $("./corpse/div[@id='content-container']") {
    # Get the main menu links
    $("./div[@id='mymatches-tabs']") {
      move_to("/html/body")
    }
    # Get the search bar and form
    $("./div[@id='myMatchesSearch']") {
      move_to("/html/body")
    }
    # Get the list of matches
    $("./table[@id='myMatchesTable']") {
      move_to("/html/body")
    }
  }
  #######################################################
  # Trim unwanted content from newly built page
  # and personalize class structure
  #######################################################
  # Add the top logo div
  insert_top("div", class: "mw_header") {
    insert_top("div", class: "icons-logo")
    insert_top("a", "Logout", href: "/singles/servlet/user/logout", class: "mw_logout mw_back_button")
  }
  # This is the main menu navigation area
  $("./div[@id='mymatches-tabs']") {
    # Remove extra styling div
    $("./div[@id='mm-nav-bottom-line']") {
      remove()
    }
  }
  # This is the search result listing
  $("./table[@id='myMatchesTable']/tbody") {
    # Remove the header rows
    $("./tr[not (@class='odd' or @class='even')]") {
      remove()
    }
    # Remove unused profile info
    $("./tr/td[@class='nextSteps']") {
      remove()
    }
    $("./tr/td[@class='matchName']/div[@class='matchdate-row']") {
      remove()
    }
    # Convert rows/columns to divs/spans
    $("./tr") {
      $("./td") {
        name("span")
      }
      # Grab hyperlink
      name("a")
      attribute("href", fetch("./span[@class='matchName']/div[@class='name-row']/span/a/@href"))
      add_class("mw_matches_item")
      # Add right arrow icon
      insert_bottom("div", class: "icons-match-right")
      # Clean all links out
      $(".//a") {
        name("span")
      }
      $("./span[@class='commStage']/span['image-message']/img") {
        remove()
      }
    }
    # Make table into div container
    name("div")
    add_class("mw_matches_container")
    move_to("/html/body", "bottom")
  }
  # This is the search bar area
  $("./div[@id='myMatchesSearch']") {
    $("./form[1]") {
      # Remove sorting widgets
      $("./div[@class='sort']") {
        remove()
      }
      # Remove pagination widgets
      $("./div[@class='pagination']") {
        move_to("/html/body", "bottom")
        $mw_activate_pagination = "false";
        # Get the previous page button
        $("./ul/li/button[contains(@class, 'prevpage')]") {
          move_to("/html/body/div[@class='pagination']", "bottom")
          name("span")
          text("\u00AB Previous")
          $mw_activate_pagination = "true";
        }
        # Get the next page button
        $("./ul/li/button[contains(@class, 'nextpage')]") {
          move_to("/html/body/div[@class='pagination']", "bottom")
          name("span")
          text("Next \u00BB")
          $mw_activate_pagination = "true";
        }
        $("./ul") {
          remove()
        }
        # Mark the class so it displays if one of the above items exists
        match($mw_activate_pagination) {
          with("true") {
            add_class("active")
          }
        }
      }
      # Remove unused ul tag
      $("./ul") {
        remove()
      }
      # This is the search box and button container
      $("./div[@class='searchbox']") {
        # Remove all form labels and anchors (This should just leave the 2 inputs and a button)
        $("./label | ./a") {
          remove()
        }
      }
    }
  }
  # Remove search result listing table
  $("./table") {
    remove()
  }
}
