$("./body/div[@id='mw_mainWrapper']") {
  $("./div[@id='header'] | ./div[@id='footer']") {
    remove()
  }
  $("./div[@class='noframes-content']") {
    attribute("style","padding: 10px; font-size: 12px;")
    $(".//h2") {
      attribute("style","padding: 10px 0; color: red; font-size: 14px;")  
    }
  }
}