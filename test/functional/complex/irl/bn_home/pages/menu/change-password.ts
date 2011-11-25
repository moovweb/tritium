$("./body") {
  # Add the script specific class
  attribute("class", "mw_change_password")
  $("./form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("./div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("./div[@class='bn_footer_width']") {
      remove()
    }
    # Work with main content
    $("./div[@id='ctl00_mainContentContainer']/div[@id='contentContainer']") {
      add_class("mw_acc")
      # Flatten first level of table
      move_here("./table/tr/td/*", "bottom")
      $("./table[1]") {
        remove()
      }
      # Work on main form area
      $(".//div[@id='ctl00_cphMainContent_Panel1']") {
        # Flatten second level of table
        move_here("./table/tr/td/*", "bottom")
        $("./table[1]") {
          remove()
        }
        # Flatten yet another table
        move_here("./table/tr/td", "bottom") {
          name("div")
          attribute("align", "")
          attribute("style", "")
        }
        $("./table[1]") {
          remove()
        }
        # Move error messages out to top of form
        insert_before("div", class: "mw_error_message") {
          move_here("(./../div/div[@colspan='2']/span)[1]", "bottom")
        }
        insert_before("div", class: "mw_error_message") {
          move_here("(./../div/div[@colspan='2']/span)[1]", "bottom")
        }
        # Add our own submit button after the main form area but before the continue shopping link
        insert_after("div") {
          add_class("mw_button_group")
            # Grab the submit button (this one will be hidden) and create a new button to click on the old one
            # (couldn't style the input type image)
          move_here("./..//input[@id='ctl00_cphMainContent_ChangePassword1_ChangePasswordContainerID_ChangePasswordImageButton']", "bottom") {
            insert_after("input", class: "mw_click_hack") {
              attribute("type", "button")
              attribute("value", "Submit")
              attribute("onclick", "ctl00_cphMainContent_ChangePassword1_ChangePasswordContainerID_ChangePasswordImageButton.click()")
            }
          }
        }
      }
    }
  }
}
