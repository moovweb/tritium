xml() {
  select("//a") {
    move_to("./following-sibling::div")
  }
}
