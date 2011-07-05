doc("xml") {
  select(".//*[@id='a']") {
    html() {
      set("<div id='b'>hello, world!</div>")
      replace("div", "span")
    }
    select("./span") {
      html("goodbye, world!")
    }
  }
}
