# This page should immediately send the user to the desktop version.
$("//meta[@id = 'mw_desktop_link_config']") {
  attribute("immediate", "true")
  attribute("this_page_only", "true")
}
