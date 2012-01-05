# Cookie checking page is at http://groceries.asda.com/asdaNS/cookiesDetecting.html?uri=/
# We need to replace links in an inline JS call on that page

#function reloadPage(){
#  //alert(getURLParam("url"));
#  window.location.href="http://groceries.asda.com"+getURLParam("uri");
#}

$("//script[contains(text(), 'reloadPage')]/text()") {
  log("Rewrote reload_page link!")
  rewrite("link")
}
