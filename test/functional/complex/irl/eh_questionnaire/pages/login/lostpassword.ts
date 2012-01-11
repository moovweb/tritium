# Backup original page
name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_login")
  # Add the top logo and page title
  insert_top("div", class: "mw_header") {
    insert_top("div", "Lost Password", class: "mw_page_title")
    insert_top("a", "BACK") {
      attribute("href", "/")
      add_class("mw_back_button")
    }
  }
  #######################################################
  # First grab each major section from the original page
  #######################################################
  $("./corpse//form[@name='lostPasswordForm']") {
    move_to("/html/body")
  }
  # removed empty error div
  $("//div[contains(@class, 'error') and count(*) = 0]") {
    remove()
  }
  match($region, /cp/) {
    $("//div[@class='mw_header']") {
      insert_after("div", class: "text_12blk") {
        move_here("//corpse//div[@id='subHead']") {
          $("./h1") {
            remove()
          }
        }
      }
    }
  }
  $("./form") {
    insert_top("div", class: "text_12blk") {
      # Grab all the elements we want
      move_here("./../table/tr/td/table/tr/td/div[@class='errorMsg'] | //div[@class='error'] | //div[@id='error']") {
        # Style this like the other error messages
        add_class("mw_error")
        # Remove the error icon
        $("./img") {
          remove()
        }
      }
      
      match($region) {
        with(/cp/) {
          log("with cp")
          move_here("//div[@id='subHead']") {
            log("move subhead")
            name("p")
            attribute("id") {
              remove()
            }
            $("./h1") {
              remove()
            }
            text() {
              replace("^\s*|\s*$", "")
            }
          }
          insert_bottom("strong", "Your Email Address:")
          move_here("..//input[@type!='hidden']")
          $("../div[@class='formLeft'] | ../div[@class='formRight'] | ../br") {
            remove()
          }
          $("./input[@type='submit']") {
            attribute("class") {
              remove()
            }
            add_class("mw_button")
          }
        }
        else() {
          # Says (Forgot Password?) probably don't need this since the label
          # is in the title
          move_here("./../table/tr/td/table/tr/td/p") {
            $("b") {
              remove()
            }
          }
          move_here("./../table/tr/td/table/tr/td/table/tr/td/*")
        }
      }
    }
    # Remove the table now that we've grabbed everything we need from it
    $("./table") {
      remove()
    }
    $("./div/input[@type='image']") {
      # Convert image button to submit button and button style class
      attribute("src", "")
      attribute("type", "submit")
      attribute("value", "Submit")
      add_class("mw_button")
    }
    # Convert input element to email type
    $("./div/input[@type='text']") {
      attribute("type", "email")
    }
  }
}
