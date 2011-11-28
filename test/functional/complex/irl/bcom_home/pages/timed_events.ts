#http://timedevents.bloomingdales.com/store/m

$("/html/body"){
  attribute("onload", "document.location.replace('http://timedevents.bloomingdales.com/store/mobile')")
  $("./*"){
    remove();
  }
}