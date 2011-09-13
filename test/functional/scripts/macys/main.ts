# Disallow robots!
@import robots.ts


# Hardcore optimization is run if this variable is set to true
# At the moment it is used on the opt/browse.ts and pages/browse_ajax.ts
# There is also a FB Like removal that is commented out on the pages/product.ts
# Aditional optimization can be turned on or off using this variable
$optimize_the_shit_out_of_me = "true";

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
  # HACK Copied from V1: fixing a malformed HTML (bag.ts and bag blocks only)
  with(/((\/bag\/)|(catalog\/gift\/index\.ognc))/) {
    log("WARNING: Fixing malformed form html in", $path)
    replace(/<form[^>]*?name="shopping_bag_form"[^>]*?>.*?<input.*?name="Action".*?>/m, "")
    replace(/(<\!--.*?END INTERNATIONAL ITEMS.*?-->.*?)<\/form>/m, "$1")
    replace(/(id="shoppingBag".*?<!-- BEGIN XML TABLE -->.*?<table.*?<tr.*?<td.*?>)(.*?<!--.*?END INTERNATIONAL ITEMS.*?-->.*?)<\/td>/m, "$1 <form action=\"/bag/index.ognc\" method=\"POST\" id=\"\" name=\"shopping_bag_form\" onsubmit=\"javascript: return isValidSubmit(this.name);\"><div style=\"display:none;\"><input type=\"hidden\" name=\"Action\" value=\"\"></div> $2 </form> $3")
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
  log("Caching", $path)
  export("Cache-Time", "300")
}
