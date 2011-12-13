# If you need to modify the HTML/XML as raw text before its parsed... do it here!
@import robots.ts

var("run_cachify", "false")

match($x_moov_api) {

  with(/true/) {
    log("\n\n--> x_moov_api = true")
    var("run_cachify", "ajax from cachify")
  }

  else() {
    match($path) {
      with(/zipship\.aspx/) {
        var("content_type", "text/javascript")
      }
      # Save AJAX responses from nokogiri by modifying content type
      # from text/html to text/ajax
      with(/AjaxService\.aspx/) {
        var("content_type", "text/ajax")
      }
      # Bypass some unnecessary deep searches in html.ts by changing the content
      # type. This is the content BN will serve use for mobile banners etc.
      with(/GetDCMConent\.aspx/) {
        var("content_type", "text/dynamic")
      }
    }

    match($content_type) {
      with(/html/) {
        # remove extra </body> tag on pdp that's out of stock
        match($path, /product/) {
         # replace(/<\/body><\/span>/, "</span>")
          replace(/<\/body>/, "")
          replace(/<\/html>/, "</body></html>")
        }

        html() {
           @import html.ts
        }
      }

      with(/js/) {
        @import js.ts
      }
    }
  }
}
# 
# match($run_cachify, not(/false/)) {
#   log("\n\n--> running cachify.ts on: ")
#   log($run_cachify)
#   @import cachify.ts
# }
