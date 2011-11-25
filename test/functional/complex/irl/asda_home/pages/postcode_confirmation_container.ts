# URL: /asda-estore/register/postcodeconfirmationcontainer.jsp
# confirmation page that shows up when tying to confirm a postcode
# NOTE: There is a bug on the sign in page that makes it impossible to confirm a postcode
#       this makes it hard to hit this page without it being broken

$("./body") {
  add_class("mw_postcode_confirmation_container")
  $(".//style") {
    remove()
  }
  $("./div[@id='mw_mainWrapper']") {
    # move script tags, link tags, meta tags, and title tags to head to create structure that is easier to read
    $("./title | ./script | ./meta") {
      move_to("/html/head", "top")
    }
    # Remove ASDA's style
    $("./link") {
      remove()
    }
    # remove all the additional context from body, since half of the page is self-generated, footer and ur node has to be .//
    $("./div[@id='header'] | .//div[@id='footer'] | .//ul") {
      remove()
    }
    # modify the button so it says "Register with Asda" instead of "Register With Asda Groceries".
    $(".//button/span/span/span/span/span/span") {
      text("Register with Asda")
    }
  }
}
