html() {
  # Remove iframe
  ##################
  $(".//iframe") {
    remove()
  }
  # JS Removal
  ##################
  
  # Removing this breaks the Coremetrics
  # $(".//script[contains(@src,'catalog.script-min-2.js')]") {
  #   remove()
  # }
  # Can't remove because it breaks the shop/kids pagination
  #$(".//script[contains(@src,'catalog.script-min.js')]") {
  #  remove()
  #}
  # Removing this break the All Brands popup
  # $(".//script[contains(@src,'catalog.splash.script-min.js')]") {
  #   remove()
  # }
  
  # coremetrics requires it
  # $(".//script[contains(@src,'coremetrics.cmdatatagutils.js')]") {
  #   remove()
  # }
  
  # $(".//script[contains(@src,'eluminate.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'techprops.js')]") {
  #   remove()
  # }
  
  # Can't remove because it screws up sign-in,out and cart item number
  # $(".//script[contains(@src,'global.tiles.base_script-min-3.js')]") {
  #   remove()
  # }
  # Can't remove because it breaks the shop/kids pagination
  #$(".//script[contains(@src,'global.tiles.base_script-min-5.js')]") {
  #  remove()
  #}
  
  # Can't remove because it screws up sign-in,out and cart item number
  # $(".//script[contains(@src,'global.tiles.base_script-min-6.js')]") {
  #   remove()
  # }
  # $(".//script[contains(@src,'global.tiles.base_script-min.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'signintest2.js')]") {
    remove()
  }
  $(".//script[contains(@src,'mbox/standard')]") {
    remove()
  }
  $(".//script[contains(.,'1@x96')]") {
    remove()
  }
  
  # The scripts below were added after 11E. I believe they are going
  # to use them in 11F. We may need to add some of them if we are to 
  # support reviews on the browse and category pages in the future.
  # JOSH: I think this was there before. Commenting out (See comment above for
  #  the same filename).
  #$(".//script[contains(@src,'catalog.splash.script-min')]") {
  #  remove()
  #}
  $(".//script[contains(@src,'BrightcoveExperiences_all.js')]") {
    remove()
  }
  $(".//script[contains(@src,'bazaarvoice.js')]") {
    remove()
  }
  # Removed in opt/base.ts
  # $(".//script[contains(@src,'global.tiles.base_analytics-min.js')]") {
  #   remove()
  # }
  $(".//script[contains(@src,'InitiateCall2.php')]") {
    remove()
  }
}
