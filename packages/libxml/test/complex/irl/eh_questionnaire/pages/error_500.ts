name("corpse")
wrap("body") {
  add_class("mw_errorpage")
  
  # Add the top logo div
  insert_top("div", class: "mw_header") {
    insert_top("div", "500 Error", class: "mw_page_title")
  }
  
  move_here("//corpse//div[./a[@href='/']]") {
    add_class("mw_top_container")
    
    attribute("style") {
      remove()
    }
    
    $("./a") {
      add_class("mw_button")
      
      text("Back to eHarmony")
    }
  }
}