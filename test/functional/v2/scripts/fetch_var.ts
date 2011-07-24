xml() {
  $("body") {
    #var("toggler_id", fetch("@mw_title"))
    $("div") {
      var("toggler_id", fetch("@mw_title"))
      name("span")
      insert_before("div", class: "mw_acc_section") {
        attribute("data-ur-id", var("toggler_id"))
      }
    }
  }
}
