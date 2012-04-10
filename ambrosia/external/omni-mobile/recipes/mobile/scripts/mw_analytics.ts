#  This file adds in the divs that provide information to the moovweb specific
#  Google Analytics solution
#
#  The logic works as such. The variable $mw_analytics is added in the mappings file
#  to any scripts that need to have the analytics embedded. The variable is set to the
#  name of the corresponding tritium script. This helps to ensure no duplicates.
#  Then the value of the variable is matched below and the correct div with the page
#  name is included.
#

# replace page_name_home with the appropriate variable name
$("/html/body") {
  match($mw_analytics) {
    with(/page_name_home/) {
      insert_bottom("div") {
        attribute("id", "mw_ga_config")
        attribute("page_name", "page_name_home")
      }
    }
  }
}