html() {
  $("/html") {
    insert_javascript(read("../fragments/insert_javascript.js"))
    #insert_at("bottom", "script", type: "text/javascript") {
    #  inject_at("bottom", read("../fragments/insert_javascript.js"))
    #}
  }
}