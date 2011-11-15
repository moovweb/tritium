# Make sure optimization is turned on globally AND for this particular page
match($mw_optimize_global, "true") {
  log("Applying global optimization")

    # Remove the reference to their spacer (p.gif)
  $("//img[@src='https://ssl1.speedera.net/baressl/img/nav/p.gif']") {
    remove()
  }

    # Now bundling this (local copy) in with main.js
  $("/html/head/script[contains (@src, 'global.js')]") {
    remove()
  }

    # Remove quick view script and widgets
  $("//script[contains (@src, 'quick_view.js')]") {
    remove()
    $("//script[contains (., 'quick_view')]") {
      remove()
    }
  }
  $("/html/body/div/div[@id='quick_view']") {
    remove()
  }

    # Used for AJAX call to get already present item count
    # * Performance Cost: 3.5s
  $("//script[contains (., 'AjaxService')]") {
    remove()
      # Calls to this function depend on the AjaxService
    $("//script[contains (., 'callServer')]") {
      remove()
    }
  }

    # Used by @id=searchBar and @id=emailModule for onkeypress
    # from what I can tell this is not necessary
    # * Performance Cost: 2.0s
  $("//script[contains (@src, 'WebResource.axd')]") {
    remove()
      # Calls to WebForm_ onkeypress depend on WebResource.axd
    $("//div[contains (@onkeypress, 'WebForm_')]") {
      attribute("onkeypress") {
        remove()
      }
    }
  }

    # This gem of a script is used to update and scroll the desktop site banner
  $("//script[contains (@src, 'BannerScroll.js')]") {
    remove()
      # Calls to this function depend on pausescroller which is defined in BannerScroll.js
    $("//script[contains (., 'pausescroller')]") {
      remove()
        # BannerContent is defined in a function that uses pausescroller
      $("//script[contains (., 'BannerContent')]") {
        remove()
      }
    }
  }

    # Used by inline script for cmSetProduction to record page view in Core Metrics
  $(".//script[contains (@src, 'cmdatatagutils_prod.js')]") {
    remove()
      # Remove inline scripts that reference cmSetProduction which is defined in cmdatatagutils_prod.js
      
      # Actually, let's not remove this -- it might be breaking their analytics
      # Just tag it so it can be moved later
    $("//script[contains (., 'cmSetProduction')]") {
      attribute("id", "mw_coremetrics_calls")
    }
  }

    # Used by inline script for storeSREDID
  $(".//script[contains (@src, 'edutl.js')]") {
    remove()
      # Remove inline scripts that reference storeSREDID which is defined in edutl.js
    $("//script[contains (., 'storeSREDID')]") {
      remove()
    }
  }

    # This script is used to clear the text of the search bar when it receives focus
    # KEEP for now
    # $("/html/head/script[contains (@src, 'global.js')]") {
    #   remove()
    #   # Remove inline scripts that reference callServer which is defined in global.js
    #   $("//script[contains (., 'callServer')]") {
    #     remove()
    #   }
    # }

  $(".//script[contains (@src, 'BN-Context.js')]") {
    remove()
  }
  $(".//script[contains (@src, 'BN-Core.js')]") {
    remove()
  }
  $(".//script[contains (@src, 'BN-CoreMetrics.js')]") {
    remove()
  }
  $(".//script[contains (@src, 'BN-ShopRunner.js')]") {
    remove()
  }
  $("/html/head/script[contains (@src, 'BN-GoogleAnalytics.js')]") {
    remove()
  }
  $(".//script[contains (@src, 'BN-Runtime.js')]") {
    remove()
  }
  $(".//script[contains (@src, 'BN-TellApartAttributes.js')]") {
    remove()
  }
  $(".//script[contains (@src, 'BN-TellApartCore.js')]") {
    remove()
  }
  # Need to put this back to make Coremetrics work.
  $(".//script[contains (@src, 'eluminate.js')]") {
    # Need to make sure that this script gets run before eluminate
    insert_before("script", type: "text/javascript", src: asset("javascript/cmdatatagutils_prod_mobile.js"))
  }
  $(".//script[contains (@src, 'shoprunner_init.js')]") {
    remove()
  }
  $("/html/head/script[contains (@src, 'plusone.js')]") {
    remove()
  }
  $("/html/head/script[contains (@src, 'swfobject.js')]") {
    remove()
  }
  $("/html/head/script[contains (@src, 'window.js')]") {
    remove()
  }

  # Used to save jquery on select pages
  match($mw_optimize_using_jquery) {
    with("true") {
    }
    else() {
      $("/html/head/script[contains (@src, 'jquery-1.4.2.min.js')]") {
        remove()
      }
      $("/html/head/script[contains (@src, 'jquery.query.js')]") {
        remove()
      }
    }
  }
}
