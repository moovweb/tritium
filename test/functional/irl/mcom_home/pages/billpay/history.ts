html(){
  $("/html/body/div[@id='doc3']/div[@id='bd']/div") {
    $("./div[@id='localNavigationContainer']") {
      remove()
    }
    $("./div[@id='depthpathContainer']") {
      remove()
    }
  }
}
