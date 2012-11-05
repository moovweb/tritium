html_fragment() {
  $("./div/div[@class='one']") {
    %one = this()
    $("../div[@class='two']") {
      move_children_to(%one, position("top"))
    }
  }
}