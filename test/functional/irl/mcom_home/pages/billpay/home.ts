html() {
  $("/html/body") {
    add_class("mw_billpay")

    $("./div[@id='doc3']/div[@id='bd']/div[@id='globalContentContainer']") {
      $("./div[@id='localNavigationContainer' or @id='depthpathContainer']") {
        remove()
      }
      $("./div[@id='localContentContainer']") {
        $("./div[@class='fullwidthCoulumn']") {
          $("./h3[@class='online']") {
            add_class('mvTitle')
            insert_bottom("a", class: "mvBackBtn", href: "/myinfo/index.ognc", "Account")
            move_to("..","top")
          }
        }
        $("./div[@class='headingBar']") {
          add_class('mvWhiteGrayBar')
        }
        $("./ul[@id='privacyLinks']/li/span") {
          remove()
        }
      }
    }
  }
}
