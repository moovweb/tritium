# If you need to modify the HTML/XML as raw text before its parsed... do it here!

# Search Engine crawlers
@import robots.ts

# Cachify takes **non-cacheable** pages and makes them cacheable
# Set $run_cachify to a value other than 'false' for cachify to run on that page
var("run_cachify", "false")

# Match logic here is:
#   1. Cachify ajax
#   2. Belk ajax
#   3. look at content type and process HTML
#   4. passthrough everything else
#
match($x_moov_api) {

  # STEP 1. Match the cachify ajax requests
  # Cachify AJAX request sets `X-Moov-API: true`
  with(/true/) {
    log("--> x_moov_api = true")
    var("run_cachify", "ajax from cachify")
  }

  else() {
    # Normal request (not a Cachify request) to process

    # STEP 2. Match all (non-cachify) ajax requests
    # inside ajax.ts we'll handle the specific cases
    # often-times we need to set content_type for the following step
    match($path, /(ajax_response|ajax\/getQuickEdit|\/shop\/ajax_shopping_bag|ajax_redirect|\/ajax\/getPromoQuickView)\.jsp/) {
      @import ajax.ts
    }
    
    # STEP 3. Look at content type and manipulate HTML
    match($content_type) {
      # for content_type html, we'll run our blocksets
      with(/html/) {
        html() {
          @import html.ts
        }

        # parsed html is replacing $ with %24, but this messes up belk's image optimization with scene7.
        # They have presets with scene7, so they pass query params like $COLOR_SWATCH$ to fetch the proper sized image
        # when the $ gets replaced, it returns a full size image.
        # replacing %24 back to $ after doc has parsed and transformations have been done.
        replace(/\%24/, "$")
      }

      # STEP 4. Passthrough everything else without any transformations
      
      else() {
        
      }
    }
  }
}

# Run cachify.ts on a cachified HTML page and on its corresponding AJAX response
# can do this purely via regex too: match($run_cachify, /^((?!false).)*$/) {
#match($run_cachify, not(/false/)) {
#  log("--> running cachify.ts on ...")
#  log($run_cachify)
#  
#  @import cachify.ts
#}
