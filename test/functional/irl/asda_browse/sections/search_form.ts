$("./body/div[@id='mw_mainWrapper']") {
  log("in search form")
  insert_before("div", class: "mw_search_form") {
    inject(read("search.html"))
  }
}