html() {

  $(".//a") {

    inner("<div></div>") # This is ok
    inner("<div></div><div></div>") # So is this

    inner("<div class='1'></div><div class='2 evaluated as html'></div>")

    $("./div[@class='1']"){
      add_class("first scoped")
      text() {
        # This should be escaped but isn't
        set("<div></div>should be evaluated as text")
      }
    }
  }
}
