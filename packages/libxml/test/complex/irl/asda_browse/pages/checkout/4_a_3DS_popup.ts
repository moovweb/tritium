# 3DS Popup page
# URL: /checkout/mpiscreencontainer.jsp

$("body") {
  add_class("mw_3DS")
  log("********* 3DS *********")
  $("./div[@id='mw_mainWrapper']") {
    $("./div[@id='content']") {
      $(".//div[@id='order']") {
        $("./div") {
          attribute("style") {
            remove()
          }
        }
        $("./div[@id='MpiLoad']") {
          remove()
        }
        $(".//div[@id='mpiSecureLogo']|.//div[@id='MpiLoad']") {
          remove()
        }
        $(".//div[@id='mpiSecureContent']") {
          $("./p[position()>1]") {
            remove()
          }
        }
        
      }
    }
    $(".//div[@id='header-min-width']") {
      remove()
    }
    $("./div[@id='backgroundDisable'] | .//div[@id='contentDiv']") {
      remove()
    }
    $("./div[@id='loadedScreen']") {
      $("./div[position()=1]") {
        attribute("style") {
          remove()
        }
      }
    }
  }
}
