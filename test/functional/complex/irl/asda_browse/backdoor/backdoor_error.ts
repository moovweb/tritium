# Backdoor Error Page
# displayed when backdoor cookie not present.

log("backdoor cookie error")
$("./head") {
  remove()
}

$("./body") {
  add_class("mw_not_backdoor_error")
  $("./*") {
   remove() 
  }
  insert_top("div") {
    attribute("class", "mw_sorry")
    inner("<h1></h1>Please return to the <a href='http://groceries.asda.com/asda-estore/home/homecontainer.jsp'>desktop site</a>.<br><br>Thank you.")
  }
}
