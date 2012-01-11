# Backup original page
name("corpse")
wrap("body") {
  add_class("mw_errorpage")
  insert_top("div", class: "mw_top_container") {
    move_here("//p[@class='error']/following-sibling::p[2]")
    move_here("//p[@class='error']/strong/font", "top") {
      name("p")
    }
    move_here("//a[contains(.,'Proceed to My Matches')]") {
      add_class("mw_button")
    }
  }
  # Add the top header and cancel button
  insert_top("div", class: "mw_header") {
    insert_top("div", "Send a Message", class: "mw_page_title")
  }
}
