# URL: http://mlocal.groceries-qa2.asda.com/asda-estore/register/signoutcontainer.jsp
# Page that asks for sign out confirmation

$("body") {
  add_class("mw_confirm_action")
  $(".//style") {
    remove()
  }
  $("./div[@id='mw_mainWrapper']") {

    # remove ASDA's style
    $("./link") {
      remove()
    }
    # Removing all the addtional content from the body
    $("./div[@id='footer' or @id='header'] | ./ul | ./a") {
      remove()
    }
    $("..//div[@class='dropbelow']") {
      remove()
    }
  }
  inner() {
    replace(/(checkoutPath=true)/, "\\1&accessible=true")
  }
}

match($path) {
  with(/signoutcontainer\.jsp/) {
    $("./body") {
      add_class("mw_sign_out_container")
    }
  }
}