# The main file executed by Tritium. The start of all other files.

# If you need to modify the HTML/XML as raw text before its parsed... do it here!

@import robots.ts


@import device_detection.ts

match($content_type) {
  with(/html/) {
    html() {
      
      
      
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

