# handle 3rd party pages here, so mappings isn't used (mappings.ts imports header/footer)
match($path) {
  with(/(mFooter=true)/) {
    log("Chose 'blockset' FooterSkava")
    @import pages/FooterSkava.ts
  }
  with(/(mHeader=true)/) {
    log("Chose 'blockset' HeaderSkava")
    @import pages/HeaderSkava.ts
  }
  with (/(mw_header_only=true)/) {
    log("Chose 'blockset' photon_menu")
    @import pages/photon_menu.ts
  }
  with (/\/skava\/add_to_cart/) {
    log("Chose 'blockset' skava_add_to_bag")
    @import pages/skava_add_to_bag.ts
  }
  with (/\/photon\/add_to_cart/) {
    log("Chose 'blockset' photon_add_to_bag")
    @import pages/photon_add_to_bag.ts
  }
  else() {
    @import mappings.ts
  }
}

# Inject main js/css
# this needs to happen AFTER the mappings because the v1 converted blocks would remove all links otherwise
# Josh's old comment: HACK: adding in the main.js because I use xui in some of the conversions
html() {
  $(".//script[contains(@src,'coremetrics.cmdatatagutils.js')]") {
    remove()
  }
  $(".//script[contains(@src,'coremetrics.eluminate.js')]") {
    remove()
  }
  $(".//script[contains(@src,'coremetrics.io_v4.js')]") {
    remove()
  }
  $(".//script[contains(@src,'global.tiles.base_analytics')]") {
    remove()
  }
  $("html") {
    $("head") {
      insert_bottom("script", type: "text/javascript", src: asset(concat($js_asset_location, "main.js")))
      insert_bottom("link", rel: "stylesheet", href: sass("main"))
      insert_bottom("script", type: "text/javascript", src: asset(concat($js_asset_location, "node_added_rewriter.js")))
      
      # I would have liked to add the coremetrics bundles to the bottom of the body, 
      # however they are required to be in the head because there is inline JS that 
      # calls these files and the coremetrics functionality will break unless the 
      # bundle is included before the inline scripts. 
      match($cookie) {
        with (/ishop_app/) {
          log("Adding cm_app.js")
          insert_bottom("script", type: "text/javascript", src: asset(concat($js_asset_location, "cm_app.js")))
        }                                                                                                   
        else () {                                                                                           
          log("Adding cm_mw.js")                                                                            
          insert_bottom("script", type: "text/javascript", src: asset(concat($js_asset_location, "cm_mw.js")))
        }
      }
    }
    $("body") {
      
    }
  }
}


