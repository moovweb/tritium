html() {
  $("html") {
    $("body") {
      $("./div[@id='search_results']"){
        $("./br"){
          remove()
        }
      }

      $("./div[@id='search_results']"){
        inner() {
          prepend("<div>")
          append("</div>")
        }
      }
    }
  }
}

