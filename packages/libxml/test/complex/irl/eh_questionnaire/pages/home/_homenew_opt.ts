$("/html/head") {
  $("./script[contains(@src,'sitetour-1.0.js?ver=')]") {
    remove()
  }
  # Used ALOT!
  # $("./script[@src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js']") {
  #   remove()
  # }
  $("./script[@src='http://static.eharmony.com:80/static/scripts/third-party/jquery/jquery.plugins.js']") {
    remove()
  }
  $("./script[@src='http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js']") {
    remove()
  }
  $("./script[@src='http://static.eharmony.com:80/static/scripts/tracking.js?ver=1115']") {
    remove()
  }
  # Used for getCookie and _EH object
  # $("./script[@src='http://static.eharmony.com:80/static/genesis/scripts/common/eh/eh-1.0.js?ver=1115']") {
  #   remove()
  # }
  $("./script[@src='http://static.eharmony.com:80/static/scripts/property-populator.js?ver=1115']") {
    remove()
  }
}

$("/html/body") {
  insert_bottom("div", id: "mw_script_holder", class: "mw_hidden")
}
$("/html/body") {
  insert_bottom("div", id: "mw_unused_holder", class: "mw_hidden")
}

$("/html/body/corpse//script") {
  move_to("/html/body/div[@id='mw_script_holder']", "bottom") {
    # Google Analytics
    $("./script[contains(.,'google-analytics')]") {
      remove()
    }
    # Banner
    $("./script[contains(.,'a.collective-media.net')]") {
      remove()
    }
    $("./script[contains(., 'ad.doubleclick.net')]") {
      remove()
    }
    # Facebook
    $("./script[contains(@src, 'facebook')]") {
      remove()
    }
    # ???
    $("./script[@src='http://edge.quantserve.com/quant.js']") {
      remove()
    }
    # ???
    $("./script[contains(.,'.scorecardresearch.com/beacon.js')]") {
      remove()
    }
    $("./script[contains(.,'//t.eharmony.com/EH/view?page=')]") {
      remove()
    }

    $("./script[@src='http://static.eharmony.com:80/static/scripts/tracking.js?ver=1115']") {
      remove()
    }
    $("./script[@src='http://static.eharmony.com:80/static/scripts/plugins/eh.roundit.js']") {
      remove()
    }
    $("./script[@src='http://static.eharmony.com:80/static/scripts/common/json2.js?ver=1115']") {
      remove()
    }
    # Enabled the top search bar
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.Search.js?ver=1115']") {
    #   remove()
    # }
    $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.QuickView.js?ver=1115']") {
      remove()
    }
    # Used for matches per page widget (Which is not currently used)
    $("./script[@src='http://static.eharmony.com:80/static/genesis/scripts/third-party/jquery/jquery.AutoEllipsis.js?ver=1115']") {
      remove()
    }
    # Used for isEmpty
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.Util.js?ver=1115']") {
    #   remove()
    # }
    # Used for pagination
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/common/jquery.pagination.js?ver=1115']") {
    #   remove()
    # }
    # If removed makes it so you have no matches
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.State.js?ver=1115']") {
    #   remove()
    # }
    # Handles AJAX calls for matches
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/common/EHARMONY.Ajax.js?ver=1115']") {
    #   remove()
    # }
    # Initiates request for AJAX
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.Setup.js?ver=1115']") {
    #   remove()
    # }
    # Used by MyMaches.View and MyMatches.Setup
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.ListManager.js?ver=1115']") {
    #   remove()
    # }
    # Used by MyMatches.State and MyMatches.Setup
    # $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.View.js?ver=1115']") {
    #   remove()
    # }
    $("./script[@src='http://static.eharmony.com:80/static/scripts/match-results/EHARMONY.MyMatches.Tracking.js?ver=1115']") {
      remove()
    }
    $("./script[@src='http://static.eharmony.com:80/static/scripts/analytics/track-1.0.js']") {
      remove()
    }
    $("./script[@src='http://static.eharmony.com:80/static/genesis/scripts/common/eh/eh-dev-1.1.js']") {
      remove()
    }
  }
}
$("/html/body/corpse/div/div[@id='mymatches-content']") {
  move_to("/html/body/div[@id='mw_unused_holder']", "bottom")
}

$("/html/body/corpse") {
  remove()
}

