html_fragment() {
  $("./div/div[@class='one']") {
    %one = this()
    $("../div[@class='two']") {
      move(this(), %one, position("top"))
    }
  }
}