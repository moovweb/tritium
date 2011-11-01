# ----- ParsedHTMLBlocks ----
html() {
  #default group
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Default block
    #Content::Passthrough::Link
    #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", "Facebook|Myspace|Twitter"], ["force_this_blockset", ""]]
      # WARNING: regex_exclusion is not supported
    # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
    # we tend to do in v2
    $("//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    
    $("//script") {
      inner() {
        #rewrite("link")
        var("rurl", $host)
        var("rurl") {
          replace(/\..*/, "")
          prepend("://")
        }
        replace(/\:\/\/www/, $rurl)
      }
    }
    
    #
    #Default block
    #Content::Passthrough::Form
    #[["regex_exclusion", ""]]
    # NOTE: AF: Very loose implementation. Just rewriting all the forms as
    # we tend to do in v2
    $("//form") { 
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
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
    #Content::Formatting::AddViewport
    #[["scalable", ""]]
    $("html/head") {
      insert_top("meta") {
        attribute("name", "viewport")
        attribute("content", "width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;")
      }
    }
    
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
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", ".BVRRValue.BVRRUserNickname > a"], ["new_tag_name", "span"], ["class_name", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' BVRRValue ') and contains(concat(' ', @class, ' '), ' BVRRUserNickname ')]/a") {
    name("span")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".BVRRHidden, .BVDI_PS.BVDI_PSPopin, .BVRRUserNicknameReadReviewsContainer, .BVRRRatingSummaryLinks, .BVRRUserNicknameContainer > .BVRRUserLocationContainer, .BVDI_PSSpacer, #BVRRDisplayContentTitleID , .BVRRSocialBookmarkingSharingLinkMySpace"]]
  $("//*[contains(concat(' ', @class, ' '), ' BVRRHidden ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' BVDI_PS ') and contains(concat(' ', @class, ' '), ' BVDI_PSPopin ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' BVRRUserNicknameReadReviewsContainer ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' BVRRRatingSummaryLinks ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' BVRRUserNicknameContainer ')]/*[contains(concat(' ', @class, ' '), ' BVRRUserLocationContainer ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' BVDI_PSSpacer ')]") {
    remove()
  }
  $("//*[@id = 'BVRRDisplayContentTitleID']") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' BVRRSocialBookmarkingSharingLinkMySpace ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".BVDI_PSInside"]]
  $("//*[contains(concat(' ', @class, ' '), ' BVDI_PSInside ')]") {
    remove()
  }
  
  
  #Photon Integration
  #Group::QueryParameterMatcherGroup
  #[["parameter_name", "appreview_page"], ["negate", ""], ["parameter_value", "true"]]
    var("param_matched", "false")
    match($path) {
      with(/["appreview_page"]\=true/) {
        var("param_matched", "true")
      }
    }
      match($param_matched, "true") {
  
    #
    #Content::Link::AddQueryParameter
    #[["selector", ".BVRRPageLink > a"], ["parameter_name", "appreview_page"], ["parameter_value", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' BVRRPageLink ')]/a") {
      attribute("href") {
        value() {
          append("?appreview_page=true")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    
    #
    #Content::CSS::AddCSS
    #[["css_path", "http://dl.dropbox.com/u/6208053/macys/macys_appreview.css"]]
    $('//html/head') {
      insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("pages/macys_appreview"))
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".BVRRReviewSocialLinksContainer"]]
    $("//*[contains(concat(' ', @class, ' '), ' BVRRReviewSocialLinksContainer ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "target"], ["selector", ".BVRRPageLink > a"]]
    $("//*[contains(concat(' ', @class, ' '), ' BVRRPageLink ')]/a") {
      attribute("target") {
        remove()
      }
    }
    
    
  }
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "href"], ["selector", ".BVRRAvatar .BVRRLink"]]
  $("//*[contains(concat(' ', @class, ' '), ' BVRRAvatar ')]//*[contains(concat(' ', @class, ' '), ' BVRRLink ')]") {
    attribute("href") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".BVRRReviewDisplayStyle3Summary .BVRRReviewDetailsContainer"], ["before_me", ".BVRRReviewDisplayStyle3Summary .BVRRReviewRatingsContainer"], ["map_moves", "true"]]
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' BVRRReviewDisplayStyle3Summary ')]//*[contains(concat(' ', @class, ' '), ' BVRRReviewRatingsContainer ')]") {
    var("counter") {
      append("a")
    }
    attribute("id4757", $counter)
  }
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' BVRRReviewDisplayStyle3Summary ')]//*[contains(concat(' ', @class, ' '), ' BVRRReviewDetailsContainer ')]") {
    var("counter") {
      append("a")
    }
    var("xpath") {
      set("//*[@id4757 = '")
      append($counter)
      append("']")
    }
    move_to($xpath, "before")
  }
}
