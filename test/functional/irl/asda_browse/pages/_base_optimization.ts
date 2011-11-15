# Global JavaScript optimization.

# Process all of the script tags in a single pass
$(".//script") {
  # If it's an external JS file, remove or absolutize it
  match(fetch("@src")) {

    with(/sifr\-addons\_noframes\.js/) {
      log("-- Removing sifr-addons_noframes.js")
      remove()
    }

    with(/sifr\.js/) {
      log("-- Removing sifr.js")
      remove()
    }

    with(/sifr\-addons\.js/) {
      log("-- Removing sifr-addons.js")
      remove()
    }

    with(/jquery/) {
      log("-- Removing jquery")
      remove()
    }

    with(/groceryhomepage\.js/) {
      log("-- Removing groceryhomepage.js")
      remove()
    }

    with(/brand\.banner\.min\.js/) {
      log("-- Removing brand.banner.min.js")
      remove()
    }

    with(/maxymiser/) {
      log("-- Removing maxymiser.js scripts")
      remove()
    }

    # Else it's an inline script; deal with it
    else() {
      match(fetch("text()")) {
        with(/view\.atdmt\.com\/jaction\//) {
          remove()
        }
      }
    }
  }
}



$(".//script[contains(@iframe, 'inspirations')]") {
  log("-- Removing the Ideas and Inspirations Iframe")
  remove()
}
$(".//script[contains(@src, 'premadelists')]") {
  log("-- Removing the premadelists.js")
  remove()
}


