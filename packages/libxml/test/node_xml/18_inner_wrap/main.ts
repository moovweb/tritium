xml() {
  $("doc") {
    $("child") {
      %parent_node = this()
      insert_at(position("before"), "wrap") {
        move(%parent_node, this(), position("top"))
        inner_wrap("inner_wrap")
      }
      log(name())
      attributes(wrapped: "true")
    }
  }
}