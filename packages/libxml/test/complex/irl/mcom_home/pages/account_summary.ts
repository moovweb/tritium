html() {
  $("/html/body") {
    $("./div[@id='doc3']/div[@id='bd']/div[@id='globalContentContainer']") {
      $("./div[@id='localNavigationContainer' or @id='depthpathContainer']") {
        remove()
      }
      $("./div[@id='localContentContainer']") {
        $("h6") {
          remove()
        }
        $("ul[@id='privacyLinks']/li/span") {
          remove()
        }
        $("./div[@class='cardContainer']") {
          $("./div[@class='cardHeader']") {
            $("./div[contains(@class, 'col0')]") {
              add_class("cardHeader")
              move_to("../..", "top")
            }
            remove()
          }
          $("./div[@class='cardContent']") {
            $("./div[@class='accountsContent']") {
              $("./div[@class='mAccountContainer']") {
                add_class("mvShadowBox")
                $("./div[@class='accountTypeInfo']/p/span/br") {
                  remove()
                }
                $("./div[@class='accountBalance']") {
                    $(".//div[contains(@class, 'col2')]") {
                      remove()
                    }
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
                $("./div[@class='recentActivityExpand']") {
                  $("./img") {
                   attribute("src", "") 
                  }
                  $("./div[@class='recentActivityDiv']") {
                    add_class("mvShadowBox")
                  }
                }
              }
            }
          }
        }
        $("./div[@class='headingBar']") {
          add_class('mvWhiteGrayBar')
        }
        $("./a") {
          add_class("mv_req_agreement")
        }
        $("./h4") {
          add_class("mvTitle")
          inject_bottom("<a class='mvBackBtn' href='/myinfo/index.ognc'>Account</a>")
        }
        $("./p[@class='accountySummary']") {
          add_class("mvSubTitle")
        }
        $("./h6") {
          move_to("../p[@class='accountySummary']", "after")
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
