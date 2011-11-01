
# ----- RawHTMLBlocks ----
#Skava page redirect
#Content::Raw::RegexReplaceCapture
#[["match", "(href=\".*?\\/campaign\\/social)"], ["replace", "href=\"http://social.macys.com/mc/main.jsp"], ["multiline", ""]]
replace(/(href=\".*?\/campaign\/social)/) {
  replace($1, "href=\"http://social.macys.com/mc/main.jsp")
}



# ----- ConfigBlocks ----
#
#Config::RedirectPassthrough
#[["regex", "(fds|macys)\\.com"]]
# NOT IMPLEMENTING this is not necessary because in v2 only the locations which match the rewriter rules will be rewritten


# ----- ParsedHTMLBlocks ----
html() {
  #default blocks
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Default block
    #Content::Passthrough::Form
    #[]
    # NOTE: AF: Very loose implementation. Just rewriting all the forms as
    # we tend to do in v2
    $("//form") { 
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }
        
    $("//body") {
      insert_javascript("document.cookie='SL=F'")
    }

    #
    #Default block
    #Content::Passthrough::Link
    #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", "(\\/service\\/shipping\\/index\\.jsp)|(\\/service\\/contact\\/index\\.ognc)|(twitter\\.com)|(facebook\\.com)|(ups\\.com)|(\\/store\\/catalog\\/)|(instoresales\\.ognc)|(\\/store\\/service\\/)|(\\/store\\/corporate\\/)|(campaign_id)|(\\/dyn_img\\/pdf\\/09F461_C2_Transaction_Dispute_Form\\.pdf)"], ["force_this_blockset", ""]]
      # WARNING: regex_exclusion is not supported
    # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
    # we tend to do in v2
    $("//a") {
      match(fetch("@href")) {
        # V1 exclusion regex
        with (/(\/service\/contactus\/index\.jsp)|(\/service\/credit\/applynow\/creditapp\.ognc)|(\/service\/shipping\/index\.jsp)|(\/service\/contact\/index\.ognc)|(twitter\.com)|(facebook\.com)|(ups\.com)|(\/store\/catalog\/)|(instoresales\.ognc)|(\/store\/service\/)|(\/store\/corporate\/)|(campaign_id)|(\/dyn_img\/pdf\/09F461_C2_Transaction_Dispute_Form\.pdf)/) {
          #log("skipping")
        }
        else() {
          attribute("href") {
            value() {
              rewrite("link")
            }
          }
        }
      }
    }
    
    
    #
    #Default block
    #Content::Inject::InjectSubtleMoovwebFooter
    #[]
    $("/html/body") {
      inject_bottom("<div class='moovweb_footer'>Mobile site by <a href='http://moovweb.com'><b>Moovweb</b></a></div>")
    }
    
    #
    #Default block
    #Content::Development::KillBrowserCache
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Default block
    #Content::Development::SubdomainFix
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Default block
    #Content::Absolutize::AbsolutizeImages
    #[]
    $("//img[@src]") {
      var("src", fetch("./@src"))
      attribute("src") {
        value() {
          # if the src starts with a slash (/) but not a double slash (//) then add the host
          match($src, /^\/[^\/]/) {
            prepend($source_host)
            prepend("//")
          }
          # TODO: handle the case where the image URL is page-relative (doesn't start with http
          # or a slash)
        }
      }
    }
    
    
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/size\\.jsp"], ["negate", "true"]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, not(/\/size\.jsp/)) {
    
      #
      #Default block
      #Content::Formatting::AddViewport
      #[["scalable", ""]]
      $("html/head") {
        insert_top("meta") {
          attribute("name", "viewport")
          attribute("content", "width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;")
        }
      }
      
    }
    
    #
    #Default block
    #Content::CSS::RemoveCSS
    #[["regex_exclusion", ""]]
    $("//style") {
      remove()
    }
    $("//link[@rel = 'stylesheet']") {
      remove()
    }
    
    
    #
    #Content::Formatting::Dynamic::AutoScrollToTop
    #[]
    # --- not found ---
    
    #
    #Default block
    #Content::Absolutize::AbsolutizeFavicon
    #[]
    $("html/head") {
      var("icon_exists", "false")
      # Find the shortcut icons and give them the source host if they don't have a host
      $(".//link[@rel = 'shortcut icon' or @rel = 'icon']") {
        var("icon_exists", "true")
        var("href", fetch("./@href"))
        attribute("href") {
          value() {
            # if the URL begins with a slash put the source host in front
            # TODO: handle the case when the favicon doesn't begin with http or a slash
            match($href, /^\//) {
              prepend($source_host)
              prepend("//")
            }
          }
        }
      }
      # If there are no shortcut icons, add one
      match($icon_exists, "false") {
        insert_bottom("link") {
          attribute("rel", "shortcut icon")
          attribute("href") {
            value() {
              set($source_host)
              prepend("//")
              append("/favicon.ico")
            }
          }
        }
      }
    }
    
    
    #
    #Content::Head::AddWebClipIcon
    #[["icon_url", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/webClip_icon.gif"]]
    $("html/head") {
      insert_bottom("link") {
        attribute("rel", "apple-touch-icon")
        #attribute("href", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/webClip_icon.gif")
        attribute('href', asset('images/icons/webClip_icon.gif'))
      }
    }
    
    
  # end BasicGroup
  
  #Global Remove Element
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#globalMastheadPool"]]
    $("//*[@id = 'globalMastheadPool']") {
      remove()
    }
    
    
    #Remove Skip to main content
    #Content::Formatting::RemoveElements
    #[["selector", ".skip"]]
    $("//*[contains(concat(' ', @class, ' '), ' skip ')]") {
      remove()
    }
    
    
    #Remove Google Ad
    #Content::Formatting::RemoveElements
    #[["selector", "#googleAdsense"]]
    $("//*[@id = 'googleAdsense']") {
      remove()
    }
    
    
  # end BasicGroup
  
  #
  #Content::CSS::AddCSS
  #[["css_path", "http://dl.dropbox.com/u/6208053/macys_v2/macys_base.css"], ["encode_image_threshold", ""]]
  # $('//html/head') {
  #    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass('pages/macys_base.css'))
  #  }
  #  
  
  #popup close btn
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCloseBtn"], ["selector", ".popupContainer  a:contains(\"close\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' popupContainer ')]//a[contains(., \"close\")]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCloseBtn")
          }
        }
        }
      }
    }
    
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", ".mvCloseBtn a"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCloseBtn ')]//a") {
      attribute("style") {
        remove()
      }
    }
    
    
  # end BasicGroup
  
  #Add Signin Redirect Cookie
  #This needs to happen on all pages. This regex rewrites an inline JS to write the cookie appropriately. Some pages don't need it because mcom's original js is: "            YAHOO.util.Event.onDOMReady(function(){MACYS.util.Cookie.set("FORWARDPAGE_KEY", encodeURI(location.href));});"
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #We no longer need to do this because of how we're rewriting the urls. Now we want the domain to be .macys.com
    #  #Type I -- inline call
    #  #Group::BasicGroup
    #  #[]
    #  # No need to wrap the contents at all# end BasicGroup
    #  
    #  #Type II -- inline call
    #  #This sort of sucks -- because we need to add our link rewriting to all the pages.For pages like this:http://www1.macys.com/registry/wedding/registryhome?cm_sp=global_nav_reg-
    #  #Group::BasicGroup
    #  #[]
    #  # No need to wrap the contents at all# end BasicGroup
    #  
    
    
  # end BasicGroup
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<meta name=\"format-detection\" content=\"telephone=no\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//head/*[position() = 1 and self::*])[1]") {
    inject_after("<meta name=\"format-detection\" content=\"telephone=no\">")
  }
  
  
  #Remove Shipping internationally
  #Content::Formatting::RemoveElements
  #[["selector", "a:contains(\"Shipping internationally?\")"]]
  $("//a[contains(., \"Shipping internationally?\")]") {
    remove()
  }
  
  
  #popup logo
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", "img[src*=\"myDynamicPopupLogo.gif\"]"]]
    $("//img[contains(@src, \"myDynamicPopupLogo.gif\")]") {
      attribute("width") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "height"], ["selector", "img[src*=\"myDynamicPopupLogo.gif\"]"]]
    $("//img[contains(@src, \"myDynamicPopupLogo.gif\")]") {
      attribute("height") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/mvDynamicPopupLogo.gif"], ["selector", "img[src*=\"myDynamicPopupLogo.gif\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//img[contains(@src, \"myDynamicPopupLogo.gif\")]") {
      #attribute("src","http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/mvDynamicPopupLogo.gif")
      attribute('src', asset('images/icons/mvDynamicPopupLogo.gif'))
    }
    
    
  # end BasicGroup
  
  #coremetrics
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "src"], ["value", "/javascript/coremetrics.cmdatatagutils.js"], ["selector", "script[src=\"http://assets.macys.com/navapp/javascript/coremetrics.cmdatatagutils.js\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    #var("done", "no")
    #$("//script[@src = \"http://assets.macys.com/navapp/javascript/coremetrics.cmdatatagutils.js\"]") {
    #  match($done, "no") {
    #      var("done", "yes")
    #    attribute("src") {
    #      value() {
    #          set("/javascript/coremetrics.cmdatatagutils.js")
    #      }
    #    }
    #  }
    #}
    
    
  # end BasicGroup

  # Signin Redirection Hack - Part I - They should really just add our subdomains to their whitelist

  $("//head/script[1]"){
    inject_before("<script> function get_original_url(){ var subdomain = location.href.split(\"//\")[1].split(\".\")[0]; return location.href.replace(subdomain + \".\", \"\");}</script>")
  }

  
}


# Signin Redirection Hack - Part II

replace(/forwardPageURL\s*?=\s*?location\.href;/) {
  set("forwardPageURL = get_original_url();")
}
