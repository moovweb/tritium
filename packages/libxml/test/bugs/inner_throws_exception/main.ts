html() {

  $(".//a") {

    inner("<div></div>") # This is ok
    inner("<div></div><div></div>") # So is this
    inner("<div class='1'></div><div class='2 evaluated as html'></div>")

    # But this is no good:
    $("./div[@class='1']"){
      add_class("first scoped")
      text("<div></div>should be evaluated as text")
    }
  }
}
