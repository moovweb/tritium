# Remove the categories
$("/html/body") {
  add_class("mw_error")
  $("./div[@id='page_wrapper']/div[@id='page']") {
    $(".//ul[@id='main_nav']") {
      remove()
    }
    $("./div[@id='signup']") {
      remove()
    }
    $("./div[@id='foot']") {
      $("./*[not (@class='copyright')]") {
        remove()
      }
    }
  }
}

# TODO: finish styling the error page
