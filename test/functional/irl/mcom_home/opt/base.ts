# Sitewide JS removal

# Start Coremetrics
# We are adding our own cmdatagutils and bundling it with the other three below
# $(".//script[contains(@src,'coremetrics.cmdatatagutils.js')]") {
#   remove()
# }
$(".//script[contains(@src,'coremetrics.eluminate.js')]") {
  remove()
}
$(".//script[contains(@src,'coremetrics.io_v4.js')]") {
  remove()
}
# $(".//script[contains(@src,'coremetrics.techprops.js')]") {
#   remove()
# }
# Not removing this will bring in another copy of the coremetrics files.
# This overrides the cmdatautils that we edit and bring in.
# This file was aded after 11E
# The version number changes according to waht page we are on.
# Thats why I'm removing it this way
# $(".//script[contains(@src,'global.tiles.base_analytics')]") {
#   remove()
# }




#
# Check to see if 'cmdatatagutils.js' is used. If so this is legacy cm
# So we add our legacy bundle
#

log("!!!! in base.ts !!!!!")
$(".//script[contains(@src,'cmdatatagutils.js')]") {
  log("!!!! found cmdatatagutils.js !!!!!")
   # Tevfik
   # I would have liked to add the coremetrics file to the bottom of the body, 
   # it needs to be in the head because there is inline JS that 
   # calls functions on it and the coremetrics functionality will break unless the 
   # file is included before the inline scripts. 
   #
   # I match the cookie to see if this is an app request or a mew request and add the js file accordingly
   $("/html/head/script[1]") {
     match($cookie) {
       with (/ishop_app/) {
         log("!!!! mapped cookie !!!!")
         log("Adding cm_legacy_bundle_app.js")
         insert_after("script", type: "text/javascript", src: asset("cm_legacy_bundle_app.js", "js"))
       }
       else () {
         log("!!!! didn't map to cookie !!!!")
         log("Adding cm_legacy_bundle_mw.js")
         insert_after("script", type: "text/javascript", src: asset("cm_legacy_bundle_mw.js", "js"))
       }
     }    
   }
   remove()
 }
 
 #
 # Check to see if 'global.tiles.base_analytics(-version number-min).js' is used. If so this is the cm
 # Added with 11F. So we add our 11F bundle
 #
 $(".//script[contains(@src,'global.tiles.base_analytics')]") {
   # Tevfik
   # I would have liked to add the coremetrics file to the bottom of the body, 
   # it needs to be in the head because there is inline JS that 
   # calls functions on it and the coremetrics functionality will break unless the 
   # file is included before the inline scripts. 
   #
   # I match the cookie to see if this is an app request or a mew request and add the js file accordingly
   $("/html/head/script[1]") {
     match($cookie) {
       with (/ishop_app/) {
         log("Adding cm11f_bundle_app.js")
         insert_after("script", type: "text/javascript", src: asset("cm11f_bundle_app.js", "js"))
       }
       else () {
         log("Adding cm11f_bundle_mw.js")
         insert_after("script", type: "text/javascript", src: asset("cm11f_bundle_mw.js", "js"))
       }
     }
   }
   remove()
 }






# End Coremetrics
$(".//script[contains(@src,'animation.js')]") {
  attribute("src") {
    value() {
      replace(/animation\.js/, "animation-min.js")
    }
  }
}
# Start Flash
$(".//script[contains(@src,'flashUtils.js')]") {
  remove()
}
$(".//script[contains(@src,'flashUtility-min.js')]") {
  remove()
}
# End Flash

# Can't remove on version 11F because there is a new dependency
# on the homepage that screws up the coremetrics
# $(".//script[contains(@src,'mbox.js')]") {
#   remove()
# }
# Start Brightcove
# a few different brightcove js files are removed with this 
$(".//script[contains(@src,'BrightcoveExperiences')]") {
  remove()
}
$(".//script[contains(@src,'APIModules_all.js')]") {
  remove()
}
# End Brightcove