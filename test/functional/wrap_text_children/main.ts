html() {
  $("/html/body") {
    $("div[1]") {
      wrap_text_children("p") {
        wrap("span")
      }
    }

    $("div[2]") {
      wrap_text_children("span", class: "separator") {
        text(" | ")
      }
    }

    $("div[3]") {
      wrap_text_children("span")
    }
  }
}