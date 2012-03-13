html() {

  $(".//a") {

    inner("<div></div>") # This is ok
    inner("<div></div><div></div>") # So is this

    # But as soon as there are attributes, no good:
    inner("<div class='1'></div><div class='2 evaluated as html'></div>")


    $("./div[@class='1']"){
      add_class("first scoped")
      text(set("<div></div>should be evaluated as text"))
    }
  }
}
