html() {
  # Search only
  
  # JS Removal
  ##################
  $(".//script[contains(@src,'InstantInvite3.js')]") {
    remove()
  }
  $(".//script[contains(@src,'cacheUtility-min.js')]") {
    remove()
  }
  $(".//script[contains(@src,'cmFunctions.js')]") {
    remove()
  }
  $(".//script[contains(@src,'cmIO-min.js')]") {
    remove()
  }
  
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

  # $(".//script[contains(@src,'coremetrics.cmdatatagutils.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'coremetrics.eluminate.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'coremetrics.io_v4.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'coremetrics.techprops.js')]") {
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
  
  # Can't remove because it screws up sign-in,out
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
  $(".//script[contains(@src,'mbox.js')]") {
    remove()
  }
  $(".//script[contains(@src,'signintest2.js')]") {
    remove()
  }
  # Coremetrics reqs it
  # $(".//script[contains(@src,'standard.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'urlUtility-min.js')]") {
    remove()
  }
  # Coremetrics reqs it
  # $(".//script[contains(@src,'userObject.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out
  # $(".//script[contains(@src,'yahoo-dom-event.js')]") {
  #   remove()
  # }
}
