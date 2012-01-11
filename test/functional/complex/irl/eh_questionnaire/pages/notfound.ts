name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_notfound")
  # Add the top logo div
  insert_top("div", "<p>404 Page Not Found</p><br><p>We're sorry. The Web address you entered is not a functioning page on our site.<div class='mw_center'><a href='/home' class='mw_button'>Register</a> <a href='/login' class='mw_button'>Login</a></div></p>", class: "mw_content")
  insert_top("div", class: "mw_header") {
    insert_top("div", class: "icons-logo")
  }
}
