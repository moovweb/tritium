# URL: /asda-estore/register/signincontainer.jsp
# Sign in page that appears when your session timeouts

$("./body") {
  add_class("mw_sign_in mw_trolley_amount_enabled")
  
  # takes the focus off the Email address field, see ticket #233
  inject_bottom("<script type='text/javascript'>window.onload = document.signinform.EmailID.blur();</script>")
  
  $("./div[@id='mw_mainWrapper']") {
	  # Moving any script tags, title tags, meta tags, link tags into the head 
    $("./link") {
      remove()
    }
    $("./title | ./meta") {
      move_to("/html/head", "top")
    }
    $("./style") {
      remove()
    }
    # insert a tag and pull the main content inside and get rid of the rest
    insert_top("div", class: "mw_emptyTrolley") {
      move_here("../div[@class='noframes-content']")
    }
    $("./div/div/div[@id='order']") {
      $("./h2") {
        move_to("../div/div[@class='leftColumn']/form/fieldset", "before")
      }
      $("..//div[@class='dropbelow']") {
        remove()
      }
      $("./div[contains(@class, 'full-content-across')]") {
        # change "i'm not xxx" to "sign in as a different user"
        # TODO: might need to be changed back, if we get the button specific (below)
        $("./div[@class='errors']/p[@class='alert']") {
          inner() {
            replace(/I'm not [A-z0-9]*/,"Sign in as a different user")
          }
        }
        # remove'If you see an asterisk (*) the field is mandatory' msg
        $("./div[@class='asterisk2']") {
          remove()
        }
      }
      $("./div[contains(@class, 'signIn')]") {
        $("./div[@class='leftColumn']") {
          $("./form/fieldset") {
            # TODO: remove focus from the first input by adding another text input and hiding it
            $("./a") {
              text("Forgot password?")
            }
            $("./fieldset") {
              # move 'sign in' button so it lineup with 'email address' input box
              $("./button") {
                move_to("./../../input[@value=' ']", "after")
              }
              remove()
            }
            $("./a") {
              add_class("mw_forget_password_link")
            }
            # remove Sign-in details" "Your sign-in details" "email address" and "password" msg
            $("./legend | ./h3 | ./label") {
              remove()
            }
            # insert placeholder with text "Email Address"
            $("./input[@id='EmailID']") {
              attribute("placeholder", "Email Address")
              attribute("autocorrect", "off")
              attribute("autocapitalize", "off")
              attribute("type", "email")
              # if there is an email entered, sign in with a diff user
              $remembered_user = fetch("./@value")
            }
            # insert placeholder with text "Password / PIN"
            $("./input[@id='PasswordPin']") {
              attribute("placeholder", "Password / PIN")
            }
            # if remembered_user, sign in with a diff user
            # TODO: might need to be changed to 'I'm not xxx', if we are provided the name
            match($remembered_user) {
              with(/@/) {
                $("./..") {
                  inject_top("<a href='/asda-estore/favourites/favouritelayout.jsp' id='diff_user'>Sign in as a different user</a>")
                }
              }
            }
          }
        }
        $("./div[@class='rightColumn' and not (normalize-space(.) !='')]") {
          attribute("style", "display :none")
        }
        $("./div[@class='rightColumn']") {
          $("./form") {
            # Adding the attribute to set up the toggler
            # Only appears when register now is present (first time visiting)
            
#             Removing the toggler
#             attribute("data-ur-set", "toggler")
#             attribute("data-ur-id", "registerNow_toggler")
            
            # remove legend selector
            $("./fieldset") {
              # Adding attributes to the content of the toggler
              attribute("id", "mw_regContent")
#               attribute("data-ur-toggler-component", "content") 
#               attribute("data-ur-state", "disabled")
#               attribute("data-ur-id", "registerNow_toggler")
              $("./legend") {
                remove()
              }
              # move up the 'Check Postcode' botton and remove "Continue signing in" msg
              $("./fieldset") {
                $("./button") {
                  move_to("./../../input[@value=' ']", "after")
                }
                $("./legend") {
                  remove()
                }
              }
              # modify the text so it says "Enter your postcode"
              $("./label") {
                text("Enter your postcode")
                wrap("p", class: "postcodecopy")
              }
              # remove the extra "Not registered yet?" msg
              $("./h3") {
                remove()
              }
              # insert a button for "register now"
              inject_before("<div id='mw_notRegWrap'> <span>Not registered yet?</span> </div>")
                # <a id='mw_RegNowBtn' href='#' data-ur-toggler-component='button' data-ur-id='registerNow_toggler' >Register Now</a>
              $("./input[@id='pcode']") {
                attribute("placeholder", "eg. TW16 5JL")
              }
            }
          }
        }
      }
    }
    # Removing all the addtional content from the body
    $("./div[@id='footer' or @id='header'] | ./ul | ./a") {
      remove()
    }
  }
}
