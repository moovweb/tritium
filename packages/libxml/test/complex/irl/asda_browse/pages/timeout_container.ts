# URL: /register/register/timeoutcontainer.jsp
# Page appears when your session times out and you are forced to reenter your login info

$("body") {
  add_class("mw_timeout_container")
  $(".//style") {
    remove()
  }
  $("./div[@id='mw_mainWrapper']") {
    # Remove ASDA's style link
    $("./link") {
      remove()
    }
    # remove all the additional context from body
    $("./div[@id='header' or @id='footer'] | ./ul") {
      remove()
    }
    # remove class 'dropbelow', this class seems to be used as space creater by ASDA
    $("..//div[@class='dropbelow']") {
      remove()
    }
    $("./div/div[@id='order']/div") {
      $("./div[@class='leftColumn']") {
        $("./form/fieldset") {
          # modify 'your sign in information' msg so it says 'please sign in'
          $("./h3") {
            text("Please sign in")
          }
          # move 'sign in' button so it lineup with 'email address' input box
          $("./fieldset") {
            $("./button") {
              move_to("../../input[@id='EmailID']", "after")
            }
            remove()
          }
          # Shortening the text to fit on the screen
          $("./a") {
            text("Forgot password?")
          }
        }
      }
      # If the registration container is empty, hide it
      $("./div[@class='rightColumn']") {
        #attribute("style", "display :none")
        remove()
      }
      # the code below should do nothing, since it doesn't make sense to register after a timeout
      $("./div[@class='rightColumn']") {
        $("./form") {
          # Adding the attribute to set up the toggler
          # Only appears when register now is present (first time visiting)
          attribute("data-ur-set", "toggler")
          attribute("data-ur-id", "registerNow_toggler")
          $("./fieldset") {
            # insert a button for "register now", this button will be the toggler button
            inject_before("<div id='mw_notRegWrap'> <span>Not registered yet?</span> <a id='mw_RegNowBtn' href='#' data-ur-toggler-component='button' data-ur-id='registerNow_toggler' >Register Now</a></div>")
            # Adding attributes to the content of the toggler
            attribute("id", "mw_regContent")
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            attribute("data-ur-id", "registerNow_toggler")
            # remove extra 'Not register' msg
            $("./h3") {
              remove()
            }
            $("./div[@class='reg_label']") {
              name("p")
            }
            # add postcode example into 'pcode' input box
            $("./input[@id='pcode']") {
              attribute("placeholder", "eg. TW16 5JL")
            }
            # move 'check postcode' button from fieldset so it lineup with 'postcode' input box
            $("./fieldset/button") {
              move_to("../../input[@value=' ']", "after")
            }
          }
        }
      }
    }
  }
}
