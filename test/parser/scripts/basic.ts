$hello = "hi"

doc("html") {
  $('"redirect_url":"([^"]*)"') {
    attribute("yo()){}") {
      set($hello);
      insert("<div class='criminal'>;(</div>")
      replace(5, index: 4);
    }
  }
}