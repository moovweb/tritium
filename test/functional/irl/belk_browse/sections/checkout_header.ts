#attribute("style","background-color: #2299AA")
$(".//div[@id='mw_account']") {
  remove()
}
$("//div[@id='step']/ul") {
  $("./li[position() = 1]") {
    text() {
      set("SignIn")
    }
  }
  $("./li[position() = 2]") {
    text() {
      set("Shipping")
    }
  }
  $("./li[position() = 3]") {
    text() {
      set("Payment")
    }
  }
  $("./li[position() = 4]") {
    text() {
      set("Review")
    }
  }
  $("./li[position() < last()]") {
    inject_after("<li class='mw_indicator'>&gt;</li>")
  }
  
  #$("./li[@class='focus']"){
  #  after(){
  #    insert("<li class='mw_arrow'></li><li class='mw_arrow_next'></li>")
  #  }
  #}
}
