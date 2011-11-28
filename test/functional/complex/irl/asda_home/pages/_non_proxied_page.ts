$("./body") {
  add_class("mw_non_proxied")
  $("./div[@id='mw_header'] | ./div[@id='mw_spinner'] | ./div[@id='mw_footer'] | ./div[@id='mw_desktop_link_config']") {
    add_class("mw_keepit")
  }
  $("./div[@id='mw_mainWrapper']") {
    $("./*[not(contains(@class, 'mw_keepit'))]") {
      remove() 
    }
    insert_top("div") {
      attribute("class", "mw_sorry")
      # inner("We apologise for the inconvenience, but you have reached a non-mobilized page. Please return to the <a href='/asda-estore/home/homecontainer.jsp'>home page</a> or visit our desktop site to access this page.<br><br>Thank you.")
      inner("Sorry, this page is currently unavailable on the ASDA mobile site, please view it using our <a href='www.groceries.asda.com'>desktop site</a>, or return to the <a href='/asda-estore/home/homecontainer.jsp'>mobile site</a>")
    }
  }
}
