# URL: /asda-estore/register/forgotpwdcontainer.jsp
# The page that comes up when you forgot your password

$("body") {
  add_class("mw_forgot_password")
  $(".//style") {
    remove()
  }
  $("./div[@id='mw_mainWrapper']") {
    # move script tags, link tags, meta tags, and title tags to head to create structure that is easier to read
    $("./title | ./script | ./meta") {
      move_to("/html/head", "top")
    }
    # remove ASDA's style
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
    $("./div/div[@id='order']") {
      $("./form") {
        $("./fieldset") {
          $("./h3") {
            add_class("sifr")
          }
          # Add a placeholder attribute in the email address field
          $("./input[@id='Email']") {
            attribute("placeholder", "Email Address")
          }
        }
        # move 'get password' button so it lines up with 'Email' input box
        $("./div/button") {
          move_to("../../fieldset/input[@value=' ']", "after")
        }
      }
    }
  }
}
