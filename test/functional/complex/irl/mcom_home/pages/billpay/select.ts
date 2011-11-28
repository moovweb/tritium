html() {
  $("/html/body") {
    $("./div[@id='doc3']/div[@id='bd']/div[@id='globalContentContainer']") {
      $("./div[@id='localNavigationContainer' or @id='depthpathContainer']") {
        remove()
      }
      $("./div[@id='localContentContainer']") {
        $("./div[@class='cardContainer']") {
          $("./div[@class='cardHeader']") {
            move_to("../div[@class='cardContent']/div[@class='accountsContent']", "top")
            $("./div[contains(@class, 'col0')]") {
              add_class("cardHeader")
              move_to("../..", "top")
            }
            remove()
          }
          $(".//div[@class='accountLeft']") {
            $("./img") {
              remove()
            }
          }
          $("./div[@class='cardContent']") {
            $("./div[@class='accountsContent']") {
              $("./div[@class='mAccountContainer']") {
                add_class("mvShadowBox")
                $("./div[@class='accountTypeInfo']/p/span/br") {
                  remove()
                }
                $("./div[@class='accountBalance']") {
                  $(".//p[contains(@class, 'col2')]") {
                    inject_top("<div class = 'hdrColumn col2'>Last Statement Balance</div>")
                  }
                  $(".//p[contains(@class, 'col3')]") {
                    inject_top("<div class = 'hdrColumn col3'>Current Balance</div>")
                  }
                  $(".//div[contains(@class, 'col4')]") {
                    inject_top("<div class = 'hdrColumn col4'>Minimum Payment</div>")
                  }
                }
              }
            }
          }
        }
        $("./div[@class='headingBar']") {
          add_class('mvWhiteGrayBar')
        }
      }
      $(".//input[contains(@class, 'closeIcon')]") {
        attribute("src") {
          remove()
        }
        name("div")
      }
      $(".//div[@id='bubblePointer']/img") {
        attribute("src", "")
      }
    }
  }
}
