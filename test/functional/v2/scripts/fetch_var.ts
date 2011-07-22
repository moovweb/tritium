xml() {
  $("div") {
    name("span")
    var("toggler-id", fetch("text()"))
    insert_before("div", class: "mw_acc_section") {
      attribute("data-ur-id", var("toggler-id"))
    }
  }
}
