$("./body") {
  add_class("mw_not_200_error")
  $("./div[@id='mw_header'] | ./div[@id='mw_spinner2'] | ./div[@id='mw_footer'] | ./div[@id='mw_desktop_link_config']") {
    add_class("mw_keepit")
  }
  $("./div[@id='mw_mainWrapper']") {
    $("./*[not(contains(@class, 'mw_keepit'))]") {
      remove() 
    }
    insert_top("div") {
      attribute("class", "mw_sorry")
      inner("We apologise for the inconvenience, but it appears that we can't find the page you are looking for. Please return to the <a href='/asda-estore/home/homecontainer.jsp'>home page</a> or visit our desktop site to access this page.<br><br>Thank you.")
    }
  }
}
