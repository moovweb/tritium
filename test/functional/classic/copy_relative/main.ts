xml() {
  select("//a") {
    copy_to("./following-sibling::div")
  }
}
