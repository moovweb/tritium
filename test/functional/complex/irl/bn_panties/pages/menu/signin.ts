$("./body") {
  # Add the script specific class
  attribute("class", "mw_signin")
  $("./form/div[@id='mainContainer']") {
    # Remove left navigation links
    $("div[@id='leftNav']") {
      remove()
    }
    # Remove bottom footer decoration
    $("./div[@class='bn_footer_width']") {
      remove()
    }
    # Handle the main content area
    $("./div[@id='ctl00_mainContentContainer']/div[@id='contentContainer']") {
      add_class("mw_acc")
      # Grab the page title
      move_here("./table/tr/td/font[@class='pagehead']", "bottom") {
        name("div")
      }
      # Grab subtitle for page
      move_here("./table/tr/td/table/tr/td/font[@class='labelhead']", "bottom") {
        name("div")
      }
      # Grab the error message if there is one, make it an anchor
      move_here("(./table/tr/td/table/tr/td/table/div/tr/td/font[@class='errortext'])[1]", "bottom") {
        name("a")
        # Use the 'click here' link href for the whole paragraph (for mobile compatability)
        attribute("href", fetch("./a/@href"))
        # Change the old 'click here' link to a span for styling
        $("./a") {
          name("span")
        }
        # Remove the nested errortext class to avoid double styling when targeting errortext class
        $("./a/font[@class='errortext']") {
          attribute("class", "")
        }
      }
      # Grab both input boxes td's and make them divs
      move_here("./table/tr/td/table/tr/td/table/tr/td/font[@class='labelsm']/../../td", "bottom") {
        name("div")
        # Don't want element level alignment
        attribute("align") {
          remove()
        }
        $("input[@type='text']") {
          attribute("autocapitalize", "off")
          attribute("type", "email")
        }
      }
      # Grab the forgot password link and text
      move_here("./table/tr/td/table/tr/td/table/tr/td/font/a[@id='ctl00_cphMainContent_BN_Login1_LoginControl_ForgetPassword']/../../*", "bottom") {
        name("div")
      }
      # Create a centered button group at the bottom of the page
      insert_bottom("div") {
        add_class("mw_button_group")
          # Grab the login button (this one will be hidden) and create a new button to click on the old one
          # (couldn't style the input type image)
        insert_bottom("span", class: "mw_click_hack") {
          text("Login")
              # This is the part that will click the real button
          attribute("onclick", "if (checkLogin() == true) ctl00_cphMainContent_BN_Login1_LoginControl_Login.click();")
        }
          # Grab the sign up button and put it in the button group
        move_here("./../table/tr/td/font[@class='contentsm']/a[@class='bwulink']", "bottom") {
          add_class("mw_signup")
        }
      }
      # Remove whatever is left in the table (keeping the tags used by scripts)
      $("./table/tr/td/*[not (@id='ctl00_cphMainContent_BN_Login1_LoginControl')]") {
        remove()
      }
      # Remove the image from the button we are hiding
      $("//input[@src='https://ssl1.speedera.net/baressl/img/btn/btn_signin_orange.gif']") {
        attribute("src", "")
      }
    }
  }

}
