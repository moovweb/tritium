$hello = "hi"

html() {
  $('"redirect_\'url":"([^"]*)"') {
    attribute("yo()){}") {
      set($hello);
      insert("</div>")
      insert(";")
      replace(5, index: 4);
    }
  }
  $("div[@class='something']") {
    html(read("paragraph.html"))
  }
}