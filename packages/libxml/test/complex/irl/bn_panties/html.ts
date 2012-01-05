$("html") {
  # Strip out comments, meta, and links
  $(".//comment()|.//meta|.//link|.//style") {
    remove()
  }
  $("head") {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("main"))
    insert_bottom("meta", http-equiv: "Content-Type", content: "text/html")
    insert_bottom("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert_bottom("meta", request_id: $request_id)
    insert_bottom("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
    insert_bottom("link", rel: "apple-touch-icon", href: asset("images/favicon.ico"))
    insert_bottom("script", type: "text/javascript", src: asset("javascript/main.js"))
    insert_bottom("meta", name: "format-detection", content: "telephone=no")
    insert_top("meta", http-equiv: "X-UA-Compatible", content: "IE=edge")

    # Add the hidden div with parameters for the desktop_link.js script
    insert_bottom("meta", id: "mw_desktop_link_config") {
      attribute("matcher", $rewrite_incoming_matcher)
      attribute("replacement", $rewrite_incoming_replacement)
      attribute("cookie_hours", "1")
      attribute("cookie_domain", ".barenecessities.com")
      attribute("rewriter_json", $rewrite_incoming_json)
    }

    # Rewrite links for selected inline scripts
    $("./script[not (@src) and (contains(., 'AjaxService.aspx') or contains(., 'dosearch') or contains(., 'catalog.aspx'))]") {
      text() {
        rewrite("link")
      }
    }
    $("./script[not(@src) and contains(text(), 'document.cookie')]") {
      text() {
        replace(/if\(!document.cookie\)\{[^\{\}]+\}/m, "/* removed cookie-detecting code */")
      }
    }
  }
  @import mappings.ts
  $("body") {
    # Detect site maintenance and scale the maintenance image (Original is 759x795)
    $("center/img[@src='/maintimages/maint.gif']") {
      attribute("width", "320px")
      attribute("height", "335px")
    }
    # Rewrite links
    $(".//a") {
      # Disabled to cut down on spam in the debug window
      #log("found a link")
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }

    # Remove Email Sign up Lightbox. Could potentially appear on any page per client
    $(".//script[contains(text(),'email_signup')]"){
      remove()
    }
    $(".//div[@id='email_signup_lightbox']"){
      remove()
    }
    $(".//input[@id='EmailHidden']"){
      remove()
    }
    
    # Replace with header selector (Added new subclass to selector -JBB)
    $(".//div[@id='header']") {
      @import sections/header.ts
    }
    # Replace with content selector
    #$("./*[contains(@class, 'mainContentContainer')]") {
    #  match($path, "/") {
    #    @import pages/home.ts
    #  }
    #}
    # Replace with Footer selector
    $(".//div[@id='footer_top']") {
      wrap("div", id: "footer") {
        move_here("../div[@id='footer_bot']", "bottom")
        @import sections/footer.ts
      }
    }
    
    # 10/24/11 Site Changes (completely changed footer)
    # Create Template
    $(".//div[@id='mainContainer']") {
      inject_bottom("<div id='footer'><div id='footer_top'></div></div>")
    }
    
    # Move anchors to template
    $(".//div[@id='helpfull_links_conatiner']//a") { # spelling...?
      move_to("./../../../../..//div[@id='footer_top']","top")
    }
    
    # Wrap text and insert arrow
    $(".//div[@id='footer_top']/a") {
      # Remove Affiliate Program, Mailing List, Site Map, and Customer Service
      $("./../a[@title='Affiliate Program'] | ./../a[@title='Site Map'] | ./../a[@title='Join Our Mailing List'] | ./../a[@title='Customer Service']") {
        remove()
      }
      # Insert arrow
      wrap_text_children("span") {
        inject("<span class='icons-orange-link-arrow'></span>")
      }
    }
    
    # Grab bottom footer and place desktop link
    $(".//div[@id='footer']") {
      move_here("./..//div[@id='copyright']","bottom") {
        attribute("id","footer_bot")
        inject("<div><a id='mw_desktop_link' href='http://www.barenecessities.com'><div class='icons-desktop-link'></div></a></div>")
      }
    }
    
    # Remove Excess Content
    $(".//div[@id='footer_bottom_section'] | .//div[@id='footer_top_section'] | .//div[@id='payment_methods_container']") {
      remove()
    }
    # End of 10/24/11 Site Changes
    
    # removing -webkit-box-shadow for Android 2.1
    match($user_agent, "Android 2.1") {
      $("form") {
        # header and footer
        $("div/div[@id='header'] | .//div[@id='footer']/div[@id='footer_bot']") {
          add_class("mw_android_eclair")
        }
        # brand pages, special
        $("div[@id='mainContainer']/div[@id='mw_titlebar'] | div[@id='mainContainer']/span[contains(@class, 'mw_titlebar')]") {
          add_class("mw_android_eclair")
        }
        $("div[@id='mainContainer']/div[contains(@class, 'Container')]") {
          # search results, category style vendor
          $("div[@class='resultsHeader' or @class='categoryMainTitleTd']") {
            add_class("mw_android_eclair")
          }
          # pdp
          $("div/div[contains(@id, 'contentContainer')]/*[1][self::div]") {
            add_class("mw_android_eclair")
          }
          # shopping cart, feature pages
          $("div[contains(@id, 'contentContainer')]/*[1][self::div or self::span][not(@class='mw_acc')]") {
            add_class("mw_android_eclair")
          }
          # checkout
          $("div[@class='checkoutNav']") {
            add_class("mw_android_eclair")
          }
        }
      }
    }
    # Ajax call for global banner thingie + parameter passed through from original url
    $banner_url = "/util/GetDCMContent.aspx?PageType=mobile&PageSection=body&PageName="

    $acode_parameter = $path
    # Capture the ACODE parameter from the url
    $acode_parameter {
      replace(/^.+([&?]acode=([^?&=]*)).*$/i, "$2")
    }
    log("====================")
    log($acode_parameter)
    log($1)
    log($2)

    # and append it to the end of the banner url
    $banner_url {
      match($acode_parameter) {
        with("/") {
          append("topframe")
        }
        else() {
          append($acode_parameter)
        }
      }
    }
    log("MODIFIED BANNER URL **************************")
    log($banner_url)

    match($path) {
      with(/(^\/secure\/)|order_basket/) {
        log("on secure page")
        # for convenience since we know banners won't be shown
        $("form/div[@id='mainContainer']/div[@id='header']/div/div[@id='mw_search_container']") {
          add_class("mw_secure")
        }
      }
      else() {
        insert("script", type: "text/javascript") {
          text() {
            append("document.addEventListener('DOMContentLoaded', function() { x$ ('#header > .header_container').xhr('bottom', '")
            append($banner_url)
            append("'); });")
          }
        }
      }
    }
      # Analytics for mobile
    move_here("script[@id='mw_coremetrics_calls']", "bottom")
  }
}
