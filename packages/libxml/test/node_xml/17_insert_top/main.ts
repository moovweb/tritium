set("<div>hi</div>")

xml() {
  $("//div") {
    insert_top("a", id: "top")
  }
}