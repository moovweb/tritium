$("body") {
  attribute("class", "mw_shopconfidence")
  $("form") {
    insert_top("div", "close", class: "mw_close", onclick: "window.close();")
    insert_bottom("div", "close", class: "mw_close", onclick: "window.close();")
    $("div[table][1]") {
      $("table") {
        move_here("tr/td/*", "before")
        remove()
      }
      move_here("*", "before")
      remove()
    }
    
    # fix nbsp problem
    $("div[@id='ctl00_cphMainContent_returnFAQsPanel_CA']/table[1]/tr[position() > 1]/td") {
      inner() {
        replace(/&amp;nbsp/, "&nbsp;")
      }
    }
  }
}
