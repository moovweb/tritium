html() {
  $("/html/body") {
    $("./div[@id='doc3']/div[@id='bd']/div[@id='globalContentContainer']") {
      $("./div[@id='localNavigationContainer']") {
        remove()
      }
      $("./div[@id='depthpathContainer']") {
        remove()
      }
      $("./div[@id='localContentContainer']") {
        $("./a[@class='printLink']") {
          remove()
        }
        $("./form[@id='onetimeSetupForm']") {
          $("./div[@class='adobe']") {
            remove()
          }
        }
      }
    }
  }
}
