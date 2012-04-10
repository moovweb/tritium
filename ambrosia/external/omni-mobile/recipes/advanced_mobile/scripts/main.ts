# The main file executed by Tritium. The start of all other files.

# If you need to modify the HTML/XML as raw text before its parsed... do it here!


  # Rewrite the xmlns facebook nodes before Nokogiri clobbers them
  replace(/fb:/, "fbn_")



@import robots.ts


@import device_detection.ts


match($content_type) {
  with(/html/) {
    html() {
      
      
      
      # This file is meant to be used while the site is being built 
      # and the project might be in the production environment. This will help to 
      # ensure that the project can live on a prod environment, but not
      # be world accessible.

      # Coming Soon...
      # Comment out the line below once you begin working
      @import coming_soon.ts
      
      
      @import html.ts
    }
  }
  
  with(/javascript/) {
    @import ajax.ts
  }
  
  else() {
    log(concat("Passing through ", $content_type, " unmodified"))
  }
}


  # Rewrite the xmlns facebook nodes to restore them
  replace(/fbn_/, "fb:") 



