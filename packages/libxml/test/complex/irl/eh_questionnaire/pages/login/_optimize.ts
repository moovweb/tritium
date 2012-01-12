# These optimizations will be applied to all 3 different
# login screen layouts. Currently no scripts are used and
# the entire desktop site content can safely be removed.
$("/html") {
  # Optimize the head
  $("./head") {
    # Remove everything except the script that is added
    # after a successful post to redirect to logindispatcher
    $("./script[not (contains(., '/singles/servlet/logindispatcher'))]") {
      remove()
    }
  }
  # Optimize the body
  $("./body") {
    # Remove the desktop site content which is never needed
    # on the 3 different login pages
    $("./corpse") {
      remove()
    }
  }
}
