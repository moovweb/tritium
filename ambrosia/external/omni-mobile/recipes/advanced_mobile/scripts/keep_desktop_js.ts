
# Keep Desktop Site Javascript
#
# By default we remove all the desktop site Javascript.  
# If you need to retain some of the desktop site JS set the
# the attribute `data-mw_keep` to `true` here.
#
# Example:

/*

$("html") {

  # cannot remove this JS because it is used for analytics
  $("./head//script[contains(@src, 'i-is-important-dont-remove-me')]") {  
    attribute("data-mw_keep", "true")
  }

  # cannot remove this JS because it is needed for site functionality
  $("./body//script[contains(@src, 'i-is-important-too-dont-remove-me')]") {  
    attribute("data-mw_keep", "true")
  }

}

*/
