html() {
  # Registry only
  ##################
  
  # Remove iframe
  ##################
  $(".//iframe") {
    remove()
  }
  
  # JS Removal
  ##################
  
  # We host it
  # $(".//script[contains(@src,'addToBag.js')]") {
  #   remove()
  # }
  
  # Required for the Sort by to work
  # $(".//script[contains(@src,'bvr.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'cacheUtility.js')]") {
    remove()
  }
  $(".//script[contains(@src,'cmFunctions.js')]") {
    remove()
  }
  $(".//script[contains(@src,'cmIO-min.js')]") {
    remove()
  }
  $(".//script[contains(@src,'connection.js')]") {
    remove()
  }
  # Required for the sort by to work
  # $(".//script[contains(@src,'connection-min.js')]") {
  #   remove()
  # }
  # Required for the sort by to work
  # $(".//script[contains(@src,'container.js')]") {
  #   remove()
  # }
  # Can't remove because it screws up sign-in,out
  # $(".//script[contains(@src,'cookie-beta-min.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out
  # $(".//script[contains(@src,'cookie-min.js')]") {
  #   remove()
  # }

  # Can't remove -- this breaks signin redirection
  # $(".//script[contains(@src,'cookieJar.js')]") {
  #   remove()
  # }
  
  # Coremetrics Stuff
  
  # Yupu regexes this one
  # $(".//script[contains(@src,'coremetrics.cmdatatagutils.js')]") {
  #   remove()
  # }
  # Required for the save changes to work
  # $(".//script[contains(@src,'coremetrics.eluminate.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'coremetrics.io_v4.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'coremetrics.techprops.js')]") {
  #   remove()
  # }
  # Required for sort by to work
  # $(".//script[contains(@src,'dom.js')]") {
  #   remove()
  # }
  
  # Required for the find in store to work
  # $(".//script[contains(@src,'domUtility-min.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'encoder.js')]") {
    remove()
  }
  # Required for many ajax calls
  # $(".//script[contains(@src,'event.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'exception.js')]") {
    remove()
  }
  
  # Can't remove because it screws up sign-in,out
  # $(".//script[contains(@src,'globalCart.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'globalHeaderPool.js')]") {
    remove()
  }
  # Required because otherwise displays false negative error message on add to bag
  # $(".//script[contains(@src,'json-min.js')]") {
  #   remove()
  # }
  
  # Can't Remove because it screws up the cart item number
  # $(".//script[contains(@src,'macys.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'quickbag.js')]") {
    remove()
  }
  # Required for the remove item or change quantity features to work
  # $(".//script[contains(@src,'registry-min.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'rounded.js')]") {
    remove()
  }
  $(".//script[contains(@src,'rules_90067660.js')]") {
    remove()
  }
  # Coremetrics reqs it
  # $(".//script[contains(@src,'standard.js')]") {
  #   remove()
  # }
  
  # Required for the find in store to work
  # $(".//script[contains(@src,'store_avail_cm.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'storeavail.js')]") {
  #   remove()
  # }
  
  # Required because otherwise displays false negative error message on add to bag
  # $(".//script[contains(@src,'urlUtility.js')]") {
  #   remove()
  # }
  
  # coremetrics reqs it
  # $(".//script[contains(@src,'userObject.js')]") {
  #   remove()
  # }
  
  # Breaks multiple things starting with the sign-in and bag item number
  # $(".//script[contains(@src,'yahoo.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'yuiloader-beta.js')]") {
    remove()
  }
}
