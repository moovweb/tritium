doc("xml") {
  $("/move") {
    top() {
      insert_tag("wrap") {
        move_here("../div")
      }
    }
  }
}
