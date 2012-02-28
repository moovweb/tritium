# Taken from cancer.org
xml() {
  $("div[@class='news-article']") {
    # Font-resizer widget
    $("div[@id='font-resize']") {
      $("p") {
        name("span")
        $("span") {
          attribute("style") {
            remove()
          }
        }
        $("a") {
          attribute("href") {
            remove()
          }
        }
        wrap_together("a", "wrap", class: "mw-plus-minus")
      }
      move_to("..", "before")
    }
  }
}