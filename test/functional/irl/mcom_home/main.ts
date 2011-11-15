# Disallow robots!
@import robots.ts
# export("Set-Cookie", "SL=F; path=/;")

# Hardcore optimization is run if this variable is set to true
# At the moment it is used on the opt/browse.ts and pages/browse_ajax.ts
# There is also a FB Like removal that is commented out on the pages/product.ts
# Aditional optimization can be turned on or off using this variable
$optimize_me = "true";

# Determines whether we move the JS to the bottom of the body.
# This way it paints the body then loads the JS. 
# The user thus sees the page faster. 
# It shouldn't break anything since it is loaded in the same order, 
# so dependencies shouldn't cause any issues. 
# The one exception may be if some JS is called before it is 
# loaded as may be the case when invoked at DOM readiness instead of window.onload
$late_load_js = "true";

# Varnish caching will be determined via this variable
$cache_me = "false";

# Support for blackberrys with "special needs; set a var here to check for in various scripts
$blackberry = "false"
# Use the X-Mob-Type to determine if this is a new BlackBerry or not
match($x_mob_type, "2") {
  log("BlackBerry OS4.6+ or OS5.x detected")
  $blackberry = "true"
}

# Fix content_type and malformed_HTML here
#   - for JSON responses, opening an html() scope on these data will corrupt it
#   - for malformed HTML we need to fixed the string before parsing it w html()
match($path) {
  # The json uses for removing item from bag is not properly typed
  with (/\/bag\/remove/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
  }
  # The json uses for updating item amount to bag is not properly typed
  with (/\/bag\/update/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
  }
   # The json used for add to registry is not properly typed
  with (/\/registry\/wedding\/addtoregistry$/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
  }
  # The json used for the update registry popup is not properly typed
  with (/\/store\/storeavailability\/index\.ognc|registry\/wedding\/updateregistry/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
  }
  # The json used for the update registry popup is not properly typed
  with (/(availabilityCheck|facetedmeta)/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
  }
  # The json used for the 'add to bag' is not properly typed
  with(/^\/bag\/(add|recommendation|registryadd)/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
  }
  # The json used for the universal bag is not properly typed
  with(/^\/bag\/view/) {
    log("WARNING: ", $content_type, " being changed to application/json")
    $content_type = "application/json"
  }
  # # bag js
  #  with(/\/combo\/bag\.script/) {
  #     log("WARNING: ", $content_type, " being changed to text/javascript")
  #     $content_type = "text/javascript"
  #      @import js.ts
  #   }
   
  # Fix malformed html on ezpay
  with(/\/service\/credit\/ezpay\/select\.ognc/) {
    replace(/<textarea\s*name=\"Disclosure\".*\/>/, "<textarea name=\"Disclosure\" readonly=\"readonly\" wrap=\"virtual\" style=\"width: 100%;\">")
  }

  # Fix malformed html on pdp
  with (/^\/shop\/(product|registry\/wedding\/product)/) {
    replace(/<div class="(member|masterSwatch|masterMultiSwatch)ProductSeparator"\/><\/div>/, "<div class=\"\\1ProductSeparator\"></div>")
  }
}
 

# we handle js redirects and perfect proxy here, so that they don't get into html.ts/mappings.ts
match($path) {
  with(/redirect\.jsp/) {
    log("Chose 'blockset' signin_redirect")
    @import pages/_signin_redirect.ts
  }
  with(/\/checkoutswf\/redirect/) {
    log("Chose 'blockset' bag_redirect")
    @import pages/_bag_redirect.ts
  }
  with(/perfectProxy\=true/) {
    log("perfect proxy")
  }
  else() {

    # a normal page we want proxied will come here
    match($content_type, /html/) {
      @import html.ts
    }
  }
}


match($cache_me, "true") {
 log("Caching ", $path)
 export("Cache-Time", "300")
}
