html() {
  $("//script[contains(text(), 'aQueryString')]") {
    text() {
      replace("iParam", "mParam")
    }
  }
}
