$("body") {
  attribute("class", "mw_forgot_password")
  $("form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("div[@class='bn_footer_width']") {
      remove()
    }
    # Handle the main content area
    $("div[@id='ctl00_mainContentContainer']/div[@id='contentContainer']") {
      add_class("mw_acc")
      # Flatten first table then remove it
      move_here("table/tr/td/*", "bottom")
      $("table") {
        remove()
      }
      # Remove brs and spacers
      $(".//br | div[@id='subTitle'] | div[@class='Dots']") {
        remove()
      }
      $("div[table]") {
        add_class("mw_form_section")
        move_here("table/tr/td/*", "bottom") {
          wrap("div")
        }
        $(".//input") {
          attribute("style", "")
        }
        $("div/input[@type='text']") {
          attribute("type", "email")
          attribute("autocapitalize", "off")
        }
        $("table") {
          remove()
        }
      }
      # remove styles
      $("div") {
        attribute("style", "")
        $("span") {
          attribute("style", "")
        }
      }
      # Create a centered button group at the bottom of the page
      insert_bottom("div") {
        add_class("mw_button_group")
          # Grab the login button (this one will be hidden) and create a new button to click on the old one
          # (couldn't style the input type image)
        move_here("./..//input[@id='ctl00_cphMainContent_SubmitImageButton']", "bottom") {
          insert_after("span", class: "mw_click_hack") {
            text("Submit")
            attribute("onclick", "ctl00_cphMainContent_SubmitImageButton.click()")
          }
        }
          # Grab the sign up button and put it in the button group
        move_here("./../div[@class='fpText']/p/a", "bottom") {
          add_class("mw_signup")
        }
        $("./../div[@class='fpText']/p") {
          remove()
        }
      }
    
    }
  }
}
