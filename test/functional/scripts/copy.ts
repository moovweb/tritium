xml() {
  $("//person[1]") {
    copy_to("/people", "bottom") {
      attribute("copy", "true")
    }

    $(".//address") {
      copy_here("../name", "top")
      copy_here("./number", "after")
      copy_here("./nonexistent")
      copy_here("./../email")
    }
  }
}
