# The main file executed by Tritium. The start of all other files.

# If you need to modify the HTML/XML as raw text before its parsed... do it here!

@import robots.ts

@import device_detection.ts

match($content_type) {
  with(/html/) {
    html() {
      
      
      set("Coming Soon")
      
      # This file is meant to be used while the site is being built 
      # and the project might be in the production environment. This will help to 
      # ensure that the project can live on a prod environment, but not
      # be world accessible.

      # Coming Soon...
      # Comment out the line below once you begin working
      @import coming_soon.ts
      
      # Uncomment out the line below once you begin working
      
      
      # @import html.ts
    }
  }
  
  with(/javascript/) {
    @import ajax.ts
  }
  
  else() {
    log(concat("Passing through ", $content_type, " unmodified"))
  }
}

