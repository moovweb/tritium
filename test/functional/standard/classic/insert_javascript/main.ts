html() {
  $("/html") {
    insert_javascript(read("my.js"), id: "hi")
    #insert_at("bottom", "script", type: "text/javascript") {
    #  inject_at("bottom", read("../fragments/insert_javascript.js"))
    #}
    insert_javascript_before("alert('boo')", id: "above")
  }
}