$("/html/body") {
  $("./*") {
    remove()
  }
  inject("<div id='back_button_error'>Back button brought you here in error. Taking you back one more page.</div>")
}

$("/html/head") {
  insert_bottom("meta") {
    attribute("http-equiv","refresh")
    attribute("content","0; url=javascript:history.back();")
  }
}
