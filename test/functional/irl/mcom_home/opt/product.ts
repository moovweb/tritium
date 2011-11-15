html() {
  # Product only
  ##################
  
  # Hardcore optimization mode
  
  # This is to remove the Bazaarvoice bar right below the header. 
  # It brings in the Facebook Like, a duplicate of the reviews stars and the facebook and twitter links
  # of which all three can be copied from the bottom. So we can gain 5 requests and 200KB.
  # At the moment, the client doesn't want the facebook like to be removed.
  
  # match($, "true") {
  #   $(".//div[@id='BVCustomerRatings']") {
  #     inject_before("<div id = mw_social_links></div>")
  #     remove()
  #   }
  #   $(".//div[@id='mw_social_links']") {
  #     attribute("style", "width: 80%;clear: both; height: 30px; margin-right: 10%; margin-bottom: 10px;")
  #     copy_here("//div[@id='globalMastheadSocialLinks']", "bottom")
  #   }
  # }
  # # We would also want to add the review stars here if the optimization is to used
  # # End Hardcore optimization mode
  
  # JS Removal
  ##################
  # Can't remove because removing the iframe disables the reviews
  # $(".//iframe") {
  #   remove()
  # }
  
  # Coremetrics crap 
  # Coremetrics requires it
  # $(".//script[contains(@src,'coremetrics.cmdatatagutils.js')]") {
  #   remove()
  # }
  # Can't remove beceause it breaks the add to registry
  # $(".//script[contains(@src,'coremetrics.eluminate.js')]") {
  #     remove()
  #   }
  # $(".//script[contains(@src,'coremetrics.techprops.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'coremetrics.io_v4.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'io_config.js')]") {
    remove()
  }
  # Can't remove beceause it breaks the add to registry
  # $(".//script[contains(@src,'json-min.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'display.pkg.js')]") {
    remove()
  }
  # Can't remove beceause it breaks the Color selector
  # $(".//script[contains(@src,'pdp_hero_widgets.js')]") {
  #   remove()
  # }
  
  # Can't remove beceause it breaks the add to registry
  # $(".//script[contains(@src,'pdp-min.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'quickpick.js')]") {
    remove()
  }
  $(".//script[contains(@src,'rtd-min.js')]") {
    remove()
  }
  
  # The script below is brought in with javascript themeselves
  # need to deal with them
  
  # $(".//script[contains(.,'_io_json')]") {
  #   remove()
  # }
  $(".//script[contains(.,'CavalryLogger')]") {
    remove()
  }
  $(".//script[contains(@src,'AC_RunActiveContent.js')]") {
    remove()
  }
  # Remove brightcove JS files
  $(".//script[contains(@src,'APIModules_all.js')]") {
    remove()
  }
  $(".//script[contains(@src,'BrightcoveExperiences.js')]") {
    remove()
  }
  # Remove FB all.js
  $(".//script[contains(@src,'all.js')]") {
    remove()
  }
  # Being imported elsewhere
  # $(".//script[contains(.,'bazaarvoice.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'css_browser_selector.js')]") {
    remove()
  }
  
  # Can't remove because it screws up the find in store popup
  # $(".//script[contains(@src,'domUtility-min.js')]") {
  #   remove()
  # }    
  # Can't remove because it screws up the sub item color updates on master PDP pages
  # $(".//script[contains(@src,'dynamic_dropdowns.js')]") {
  #     remove()
  #   }
  $(".//script[contains(@src,'element-beta-min.js')]") {
    remove()
  }
  $(".//script[contains(@src,'flashUtility-min.js')]") {
    remove()
  }  
  $(".//script[contains(@src,'get-min.js')]") {
    remove()
  }
  $(".//script[contains(@src,'tabview-min.js')]") {
    remove()
  }
  # Can't remove because it screws up sign-in,out and cart item number
  # $(".//script[contains(@src,'yahoo-dom-event.js')]") {
  #   remove()
  # } 
  # Coremetrics requires it to be able to create the add to bag pageview tag
  # $(".//script[contains(@src,'cmFunctions.js')]") {
  #   remove()
  # }
  # Can't remove because it breaks the "see more stores" link on find in store
  # Edit: we can remove one of the two scripts -- the difference in the paths is that
  #       one points to script/macys/util, the other is script//macys/util
  $(".//script[contains(@src,'//macys/util/cacheUtility-min.js')]") {
    remove()
  }
  $(".//script[contains(@src,'cmIO-min.js')]") {
    remove()
  }
  # Can't remove beceause it breaks the add to registry
  # $(".//script[contains(@src,'connection-min.js')]") {
  #   remove()
  # }
  # Can't remove because it screws up the reviews section
  # $(".//script[contains(@src,'container-min.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out and cart item number
  # $(".//script[contains(@src,'cookie-beta-min.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out
  # $(".//script[contains(@src,'cookie-min.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up the reviews section
  # Can't remove -- this breaks signin redirection
  # $(".//script[contains(@src,'cookieJar.js')]") {
  #   remove()
  # }
  
  $(".//script[contains(@src,'exception-min.js')]") {
     remove()
   }
   $(".//script[contains(@src,'flashUtils.js')]") {
     remove()
   }
   
   $(".//script[contains(@src,'formValidation.js')]") {
     remove()
   }
     
  # Can't remove because it screws up sign-in,out and cart item number
  # $(".//script[contains(@src,'globalCart-min.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'globalHeaderPool.js')]") {
    remove()
  }
  # Can't Remove because it screws up the cart item number
  # $(".//script[contains(@src,'macys-min.js')]") {
  #   remove()
  # }
  
  $(".//script[contains(@src,'quickbag-min.js')]") {
    remove()
  }
  # Can't remove beceause it breaks the add to registry
  # $(".//script[contains(@src,'standard.js')]") {
  #   remove()
  # }
  #$(".//script[contains(@src,'urlUtility-min.js')]") {
  #  remove()
  #}
  # Can't remove because it screws up the reviews section and coremetrics
  # $(".//script[contains(@src,'userObject.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up the find in store popup
  # $(".//script[contains(@src,'store_avail_cm.js')]") {
  #   remove()
  # }
  
  # Some pages have extra coremetrics and mapquest scripts
  $(".//script[contains(@src,'mqcommon-min.js')]") {
       remove()
     }
     $(".//script[contains(@src,'mqutils-min.js')]") {
       remove()
     }
     $(".//script[contains(@src,'mqobjects-min.js')]") {
       remove()
     }
     $(".//script[contains(@src,'mqexec-min.js')]") {
       remove()
     }
     $(".//script[contains(@src,'transaction')]") {
       remove()
     }
}
