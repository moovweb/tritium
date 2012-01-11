$("/html") {
  # Optimize the head
  # It seems like eHarmony is loading library js files from other domains
  # If that library fails to load, it has secondary script that falls back to and load
  # the library js files from its own CDN
  $("./head") {
    # swfobject can be safely removed; it's used for embeding flash
    $("./script[contains(@src, 'swfobject.js') or contains(text(), 'swfobject.js')]") {
      remove()
    }
    # remove jquery and related scripts
    $("./script[contains(@src, 'jquery') or contains(text(), 'jquery')]") {
      # it make sense to remove all script that depends on jquery
      # they're not going to function anyway if jquery is removed
      
      $("../script[contains(@src, 'property-populator.js')]") {
        remove()
      }
      $("../script[contains(@src, 'sitetour')]") {
        remove()
      }
      $("../script[contains(@src, 'tracking.js')]") {
        remove()
      }
      $("../script[contains(@src, 'eh-') and contains(@src, '.js')]") {
        remove()
      }
      $("../script[contains(@src, 'icebreaker.js')]") {
        remove()
      }
      $("../script[contains(@src, 'form-utilities.js')]") {
        remove()
      }
      # 
      # $("../script[contains(@src, 'my-matches.js')]") {
      #   remove()
      # }
      $("../script[contains(@src, 'my-matches-search.js')]") {
        remove()
      }
      
      remove()
    }
  }
  # Optimize the body
  $("./body") {
    $("./corpse") {
      remove()
    }
  }
}
