html() {
  # Category browse page only
  ##################
  
  # We nip the availabilityCheck requests in the bud by injecting a script
  # This script calls setAjaxResponse with availabilityCheck and true.
  # This is in plutonium and is added in bundles.yaml
  # What the script does is whenever it sees an ajax request for availabilityCheck,
  # it returns the value true before any request is made to macys.
  # The reason why it is used is that an availabilityCheck request is made 
  # for every single item on the browse page which we don't want.
  # The availability check is done when a user clicks on the item he/she wants
  # This tradeoff is quite reasonable
    # 
  $("//div[@id='localContentContainer']") {
    inject_bottom("<script type='text/javascript'>function setAvailability(){setAjaxResponse('availabilityCheck?','true')}; setAvailability();</script>")
  }
  # Remove iframe
  ##################
  $(".//iframe") {
    remove()
  }
  
  # JS Removal
  ##################
  # Removing this screws up coremetrics
  # $(".//script[contains(@src,'catalog.script-min-2.js')]") {
  #   remove()
  # }
  # Need to keep because removing screws up populating the Narrow By dropdown
  # $(".//script[contains(@src,'catalog.script-min.js')]") {
  #   remove()
  # }
  
  # This will break the popup menu for All Brands in category list
  #$(".//script[contains(@src,'catalog.splash.script-min.js')]") {
  #  remove()
  #}
  
  # # Not removing this will bring in another copy of the coremetrics files.
  # # This overrides the cmdatautils that we edit and bring in.
  # # This file was aded after 11E
  # Removed in opt/base.ts
  # $(".//script[contains(@src,'global.tiles.base_analytics-min.js')]") {
  #   remove()
  # }
  
  # Need to keep because removing screws up the Narrow By update 
  # $(".//script[contains(@src,'coremetrics.eluminate.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'coremetrics.techprops.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out and cart item number
  #$(".//script[contains(@src,'global.tiles.base_script-min-3.js')]") {
  #   remove()
  #}
  
  # Need to keep because removing screws up populating the Narrow By dropdown
  # $(".//script[contains(@src,'global.tiles.base_script-min-5.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out and cart item number
  # $(".//script[contains(@src,'global.tiles.base_script-min-6.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out and cart item number as well as the Narrow By dropdown
  # $(".//script[contains(@src,'global.tiles.base_script-min.js')]") {
  #   remove()
  # }
  
  # $(".//script[contains(@src,'signintest2.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'mbox/standard')]") {
    remove()
  }
  # $(".//script[contains(.,'1@x96')]") {
  #   remove()
  # }
  
  # Gets called in by bazaarvoice.js
  # $(".//script[contains(@src,'jquery.min.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'display.pkg.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'bazaarvoice.js')]") {
    remove()
  }
  # Removing this removes the Promos
  # $(".//script[contains(@src,'catalog.browse.script-min-2.js')]") {
  #   remove()
  # }
  
  # Need to keep because removing screws up populating the Narrow By dropdown
  # $(".//script[contains(@src,'catalog.browse.script-min.js')]") {
  #   remove()
  # }
  
  # End JS Removal
  
  # Start unused item removal
  
  # Get rid of crap images that were being pulled in
  $(".//div[@class='thumbnails']") {
    # Remove from weRecommendThumbnails
    $(".//div[@class='productThumbnail']") {
      $(".//ul[@class='morecolors']") {
        $("./li") {
          $("./img") {
            remove()
          }
        }
      }
    }
  }
  
  # Hardcore optimization mode
  ############################
  
  # The below operations are repeated in browse_ajax
  # Removing the color swatches and adding a descriptor instead
  # Edit the thumbnail images class so that it is optimized and
  # the same as the ajax requests
  # Remove other unnecessary stuff
  
  match($optimize_me, "true") {
    # Removing crap from the product thumbnail
    $(".//div[@class='thumbnails']") {
      # Remove from weRecommendThumbnails
      $(".//div[@class='productThumbnail']") {
        $("./div[@class='overlayImgBox']") {
          remove()
        }
        $(".//ul[@class='morecolors']/li") {
          $("./span") {
            remove()
          }
          $("./input") {
            remove()
          }
          $("./img") {
            remove()
          }
        }
      }
      # Remove the color swatches
      # $("./div/div/div") {
      #                    $("./div[2]/ul") {
      #                      $("../..") {
      #                        inject_bottom("<div class='mvMoreColor'>more colors available</div>")
      #                      }
      #                      remove()
      #                    }
      #                    $("./div[@class='prices']/div/span/img") {
      #                      remove()
      #                    }
      #                  }
    }
  }
  # Change size and quality to be the same as the ajax so we bring in only one image that is optimized
  $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
    attribute("src") {
      value() {
        #append("?wid=82")
        replace(/wid=[0-9]*/, "wid=152")
        replace(/qlt\=[0-9(\,)]*/, "qlt=75,0")
        replace(/hei=[0-9]*/, "hei=186")
        replace(/jpeg&.*/, "jpeg")
        # change the last question mark into an ampersand for valid query parameters
        replace(/(\?.+)\?/, "\\1&")
      }
    }
  }
  $("//*[@class='moreView']") {
    remove()
  }

  $("//script[contains(@src,'estara')]") {
    remove()
  }
  # End Hardcore optimization mode
}
