$("/html") {
  # Strip out comments, meta, and links
  $("./body[contains(@class, 'mobile')]") {
    $(".//div[@id='hero']") {
      $(".//style") {
        attribute("mw_keep", "true")
      }
    }
  }
  
  #$(".//link[contains(@href, 'levis')]") {
  #  attribute("mw_keep", "true")
  #}
  
  # belk has script tags that create coremetrics tags
  # they can be inside elements that are removed during transformation
  # move them all out now to avoid removal
  $(".//script[contains(text(), 'coremetrics')]") {
    move_to("/html/body", "bottom")
  }

  $(".//comment()|.//meta|.//style[not(@mw_keep)]|.//link[not(@mw_keep)]") {
    remove()
  }
  
  # Removing these js and hosting ourselves for analytics purposes ###
  $(".//script[contains(@src,'cmdatatagutils_new.js')]") {
    remove()
  }
  $(".//script[contains(@src,'eluminate.js')]") {
    remove()
  }
  $(".//script[contains(@src,'io_v4.js')]") {
    remove()
  }

  # for webqaa.belkinc.com
  # this won't work for the checkout pages
  #$("./body//div[@class='loggedOut' or @class='loggedIn'] | ./body//div[@class='footerNav']") {
  #  $("/html/body") {
  #    $("/html//script[not (@mw_keep)]|.//img") {
  #      attribute("src") {
  #        value {
  #          replace(/^\/media\//, "http://webqaa.belkinc.com/media/")
  #        }
  #      }
  #    }
  #  }
  #}

  # Absolutize scripts
  $(".//script[not (@mw_keep)]|.//img") {
    attribute("src") {
      value() {
        replace(/^\/media\//, "//www.belk.com/media/")
      }
    }
  }

  # this file is empty when running normally; in effect when driven by the optimization tool
  @import optimization_setup.ts

  $("./head") {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("main"))
    insert_bottom("meta", http-equiv: "Content-Type", content: "text/html")
    insert_bottom("meta", request_id: $request_id)
    insert_bottom("meta", name: "viewport", content: "width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;")
    insert_bottom("link", rel: "shortcut icon", href: asset("image/favicon.ico"))
    insert_bottom("link", rel: "apple-touch-icon", href: asset("image/favicon.ico"))
    insert_bottom("script", type: "text/javascript", src: asset("javascript/main.js"))
    # insert_bottom("script", type: "text/javascript", src: asset("loading.js", "js"))

    insert_bottom("meta") {
      attribute("id", "mw_desktop_link_config")
      attribute("rewriter_json", $rewrite_incoming_json)
      attribute("cookie_hours", "1")
    }
      
    # ripping these js files from the desktop site and hosting it ourselves
    # needed to add a mobile suite id for tracking
    # doing this is better than passingthrough and regex'ing.
    
    log("HOST ------> ")
    log($host)
    match($host) {
      with(/mstage|mlocal/) {
        # Staging:
        # Mobile metrics id = 60380040
        insert_bottom("script", type: "text/javascript", src: asset("javascript/eluminate.js"))
        insert_bottom("script", type: "text/javascript", src: asset("javascript/io_v4.js"))
        insert_bottom("script", type: "text/javascript", src: asset("javascript/cmdatatagutils_new_stage.js"))
      }
      else() {
        # Production:
        # Mobile metrics id = 90380040
        insert_bottom("script", type: "text/javascript", src: asset("javascript/eluminate.js"))
        insert_bottom("script", type: "text/javascript", src: asset("javascript/io_v4.js"))
        insert_bottom("script", type: "text/javascript", src: asset("javascript/cmdatatagutils_new.js"))
      }
    }
  }

  $("./body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
          replace(/;jsessionid=[^\?]*(\??)/, "\\1")
        }
      }
    }

    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite("link")
          replace(/;jsessionid=[^\?]*(\??)/, "\\1")
        }
      }
    }
    
    ######## SECTIONS ########
    @import sections/header.ts
    @import sections/footer.ts
  }

  ######## PAGES MAPPINGS ########
  @import mappings.ts

}
