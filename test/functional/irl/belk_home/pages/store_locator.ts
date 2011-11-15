$("/html/body") {
  add_class("mw_store_locator")
  
  $(".//ul[@id='main_nav']") {
    remove()
  }
  
  $(".//div[@id='promo']") {
    remove()
  }
  
  $(".//div[@id='subnav']") {
    remove()
  }
  
  $(".//div[@id='aside']") {
    remove()
  }
  
  # this file is shared with the geolocation store locator
  # remove maps for anything that is not geocode related
  $("/html/body[not (contains(@class, 'mw_geocode_locator'))]") {
    $(".//div[@id='stores_gmap']") {
      remove()
    }
    $(".//script[contains(@src, 'maps.google.com')]") {
      attribute("mw_map_js")
      remove()
    }
  }
  
  $("/html/body[contains(@class, 'mw_geocode_locator')]") {
    $(".//script[contains(@src, 'maps.google.com')]") {
      attribute("mw_maps_js")
      # different keys are required for different environments
      # these keys were generated from http://code.google.com/apis/maps/signup.html
      # mlocal: ABQIAAAA3Ps30hAY8gftTJAGhpARNRTSSMOQKfKr9epJfocNVC_NOOBWMRTcfvcwDlvN7LCUSMnNR1yT86ishA
      # mstage: ABQIAAAA3Ps30hAY8gftTJAGhpARNRSFrqpGL5RsBuGAVeO97lEpENbRmRRjv5BB8I8mpCkVABFudoHGWYdiEA
      # m: ABQIAAAA3Ps30hAY8gftTJAGhpARNRTy3rr436iOCrlWZJp9oNj8PRRRaBQeUeaK1zkjiQQrtnBigNEBf4zPog
      var("gmap_key_dev", "ABQIAAAA3Ps30hAY8gftTJAGhpARNRTSSMOQKfKr9epJfocNVC_NOOBWMRTcfvcwDlvN7LCUSMnNR1yT86ishA")
      var("gmap_key_stage", "ABQIAAAA3Ps30hAY8gftTJAGhpARNRSFrqpGL5RsBuGAVeO97lEpENbRmRRjv5BB8I8mpCkVABFudoHGWYdiEA")
      var("gmap_key_prod", "ABQIAAAA3Ps30hAY8gftTJAGhpARNRTy3rr436iOCrlWZJp9oNj8PRRRaBQeUeaK1zkjiQQrtnBigNEBf4zPog")
      var("gmap_src", "http://maps.google.com/maps?file=api&v=2&sensor=true&key=")
      match($host) {
        with(/mlocal\.belk\.com/) {
          log("dev")
          var("gmap_src") {
            append($gmap_key_dev)
            log("---------------dev---------------")
          }
          log($gmap_src)
        }
        with(/mstage\.belk\.com/) {
          var("gmap_src") {
            append($gmap_key_stage)
            log("---------------stage---------------")
          }
          log($gmap_src)
        }
        with(/m\.belk\.com/) {
          var("gmap_src") {
            append($gmap_key_prod)
            log("---------------prod---------------")
          }
          log($gmap_src)
        }
        else() {
          log("no match on host")
        }
      }
      attribute("src", $gmap_src)
    }
  }

  
  $(".//div[@id='content']") {
    $("./div[@class='storeEvents']") {
      remove()
    }
    $("./div") {
      $("./div[@class='findStore']") {
        $("./form[@id='formsearchNew']") {
          $("./div[@class='inputWrap']") {
            $("./div[@id='findStoreInputOverlay']") {
              remove()
            }
            $("./input[@id='findStoreInput']") {
              attribute("placeholder", "Enter a Zip Code")
            }
          }
          $("./span") {
            text("Within")
          }
          wrap("div", id: "mw_find_store_wrapper")
        }
        $("./a[contains(text(), 'By State')]") {
          inject_bottom("<div class='icons-subnav_arrow_right'></div>")
        }
        $("./a[@id='findStoreLink']") {
          move_to("../div[@id='mw_find_store_wrapper']")
        }
        inject_bottom("<div id='mw_current_location'><a href='javascript:void(0)' id='mw_find_current_location'><div class='mw_nav_text'>Find a Store Near Your Current Location</div><div class='icons-subnav_arrow_right'></div></a></div>")
      }
    }
    
    
    $("./div[@id='results']") {
      $("./div[@class='paging']") {
        attribute("mw_paging")
      }
      $("./div[@id='stores']") {
        $("./ul") {
          attribute("mw_store_list")
          $("./li") {
            $("./ul") {
              $("./li[@class='l1']") {
                move_to("../.", "before")
                name("div")
              }
            }
          }
        }
      }
      move_to("../div[@id='hero']/form[@name='form_store_locator']", "bottom")
    }
    
    $("./div[@id='results']") {
      move_to("..//div[@class='findStore']")
    }
  }
}
