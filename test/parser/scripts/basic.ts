$hello = "hi"

html() {
  $('"redirect_\'url":"([^"]*)"') {
    attribute("yo()){}") {
      set($hello);
      insert("</div>")
      insert(";")
      replace(5, "4");
    }
  }
  $("div[@class='something']") {
    inner(read("paragraph.html"))
  }
}