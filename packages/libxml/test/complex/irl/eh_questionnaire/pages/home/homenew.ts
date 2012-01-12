# Backup original page
name("corpse")
wrap("body") {
  # Add page specific class
  add_class("mw_homenew")
  #######################################################
  # First grab each major section from the original page
  #######################################################
  $("./corpse/div[@id='content-container']") {
    # Get the main menu links
    $(".//ul[@id='match-types']") {
      move_to("/html/body")
    }
    # Get the search bar
    $(".//form[@name='search-name-location-auto']") {
      move_to("/html/body")
    }
    # Get the list of matches
    $(".//ul[@id='match-results-list']") {
      move_to("/html/body")
    }
    # Get the pagination links
    $(".//div[@id='match-list-pagination']") {
      move_to("/html/body")
    }
  }
  #######################################################
  # Trim unwanted content from newly built page
  # and personalize class structure
  #######################################################
  # Add the top logo div
  insert_top("div", class: "mw_header") {
    insert_top("div", class: "icons-logo")
    insert_top("a", "Logout", href: "/singles/servlet/user/logout", class: "mw_logout mw_back_button")
  }
}
