# handle 3rd party pages here, so mappings isn't used (mappings.ts imports header/footer)
match($path) {
  with(/(mFooter=true)/) {
    log("Chose 'blockset' FooterSkava")
    @import pages/FooterSkava.ts
    @import opt/home.ts
    @import opt/_move_js.ts
  }
  with(/(mHeader=true)/) {
    log("Chose 'blockset' HeaderSkava")
    @import pages/HeaderSkava.ts
    @import opt/home.ts
    @import opt/_move_js.ts
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
  @import opt/base.ts
  $("html") {
    $("head") {
      insert_top("script", type: "text/javascript", src: asset("main.js", "js"))
      insert_bottom("link", rel: "stylesheet", href: asset("main.css", "stylesheet"))
      
      
      
       
       
       
       
      # # I would have liked to add the coremetrics bundles to the bottom of the body, 
      # # however they are required to be in the head because the coremetrics functionality 
      # # will break unless the bundle is included before the inline scripts. 
      # match($cookie) {
      #   with (/ishop_app/) {
      #     log("Adding cm_app.js")
      #     insert_bottom("script", type: "text/javascript", src: asset("cm_app.js", "js"))
      #   }
      #   else () {
      #     log("Adding cm_mw.js")
      #     insert_bottom("script", type: "text/javascript", src: asset("cm_mw.js", "js"))
      #   }
      # }
      # var("cookie") {
      #   replace(/PPP\=24\;/, "")
      # }
      
      
      
      
      
      
      
    }
  
  }

  # Hari:
  # I found a page which sends an XHR to a url constructed in js, but it grabs the
  # host name from an input element's value, so i'm rewriting that value. I figure it
  # may as well happen in html.ts, since it could be used again and we will always
  # want it rewritten.
  $(".//input[@id='MACYS_secureHostName']") {
    attribute('value') {
      value() {
        rewrite("link")
      }
    }
  }
  
  # Hari:
  # Turns out we want to "proxy" all ext js files on www1.macys.com (e.g. homepage)
  # since akamai would redirect them to us anyway. I haven't found any cases in which
  # js files are at www.macys.com, and xpath doesn't accept regexes.
  $(".//script[contains(@src,'://www1.macys.com')]") {
    attribute("src") {
      value() {
        replace(/\:\/\/www1\.macys\.com/, '://macys.com')
        rewrite('link')
      }
    }
  }
}

