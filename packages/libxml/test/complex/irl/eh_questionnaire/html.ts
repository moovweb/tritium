$("html") {
  # Strip out links
  $(".//meta[not(@http-equiv='refresh' or @content)] | .//link | .//style") {
    attribute("mw-mark", "delete")
  }
  
  $("body") {
  
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }

    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }

    # Rewrite meta refresh
    $("//meta[@http-equiv='refresh' and @content]") {
     attribute("content") {
       value() {
         rewrite("link")
       }
     }
    }

    @import mappings.ts
    
  }
  
  match($mw_pass_through) {
    with("true") {
      # do nothing
    }
    else() {
      # Strip out comments and links
      $(".//meta[not(@http-equiv='refresh' or @content)] | .//link | .//style") {
        match(fetch("@mw-mark"), "delete") {
          remove()
        }
      }
      $(".//comment()") {
        remove()
      }
      $("head") {
        insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet))
        insert_bottom("meta", http-equiv: "Content-Type", content: "text/html")
        insert_bottom("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
        insert_bottom("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
        insert_bottom("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon.png"))
        insert_bottom("script", type: "text/javascript", src: asset("javascript/main.js"))
      }

    }
  }
}