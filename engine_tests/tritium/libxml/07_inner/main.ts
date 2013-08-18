xml()  {
  select(".//*[@id='a']") {
    inner() {
      set("<div id='b'>hello, world!</div>")
      replace("div", "span")
    }
    select("./span") {
      inner("goodbye, world!")
    }
  }
}
