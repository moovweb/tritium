$("/html/body") {
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $("./div[@id='head']/ul[@id='main_nav']") {
      remove()
    }
    $("./div[@id='main']") {
      attribute("style", "padding:10px")
      $("./div[@id='content']") {
        $("./div[@id='bread_crumb']") {
            remove()
        }
      }
    }
    $("./div[@id='foot']") {
      $("./*[@class='contact' or @class='credit' or @class='nav']") {
        remove()
      }
    }
  }
}