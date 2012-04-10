# HTML Transformations go here

$("/html") {

  # Strip out comments and links
  # PASSTHROUGH: To passthrough comments and links, delete the 3 lines below
  remove(".//comment()|.//link|.//style")

  # Remove only existing meta tags for which we will add our own
  $(".//meta[@name='viewport']|.//meta[@name='format-detection']") {
    remove()
  }

  # Add our meta tags
  $("./head") {
    insert("meta", http-equiv: "Content-Type", content: "text/html")
    insert("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert("meta", name: "format-detection", content: "telephone=no")
    insert("script", data-mw_keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
  }

  # Add assets
  $("./head") {
    insert("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet))
    insert("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon.png"))
  }
  $rewriter_url = "false"
  $("./body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    $("/html/head/base") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
      $rewriter_url = fetch("./@href")
    }

    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }

    # Add AJAX rewrite config
    insert("div") {
      attribute("id", "mw_link_passthrough_config")
      attribute("rewrite_link_matcher", $rewrite_link_matcher_str)
      attribute("rewrite_link_replacement", $rewrite_link_replacement)
    }
  }

  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  # Find images and scripts that link to an external host
  $(".//img|.//script[@src]") {
    # GOTCHAS :: Watch out for captcha images, they most likely should
    # not be absolutized
    $src = fetch("./@src")
    match($rewriter_url) {
      not(/false/) {
        # Do nothing :: Use base tag value
      }
      else() {
        $rewriter_url = $source_host
      }
    }
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $rewriter_url))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $rewriter_url, $slash_path))
            }
          }
        }
      }
    }
  }


  @import keep_desktop_js.ts


  @import sections/header.ts
  @import sections/footer.ts

  @import mappings.ts
  
  $("./body") {
    inject_bottom(read("powered_ascii.html"))
  }


  # Remove desktop site javascript
  # PASSTHROUGH: To passthrough javascript, delete the 3 lines below  
  $("//script[@src and (not(@data-mw_keep) or @data-mw_keep='false')]") {
    remove()
  }


  # Include mw_analytics file to track the mobile site
  @import mw_analytics.ts


}
