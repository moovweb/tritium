doc("html") {
  $("html") {
    $("body") {
      $("./div[@id='search_results']"){
        $("./br"){
          remove()
        }
      }

      $("./div[@id='search_results']/html()"){
        prepend("<div>")
        append("</div>")
      }
    }
  }
}

