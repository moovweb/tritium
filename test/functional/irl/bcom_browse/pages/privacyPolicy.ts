
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts



# ----- ParsedHTMLBlocks ----
#html() {
  #
  #Content::CSS::AddCSS
  $('/html/body') {
    add_class("mw_privacyPolicy")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".bl_header_pg_img"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_header_pg_img ')]") {
    remove()
  }
  
  
  #remove flash order search
  #Content::Formatting::RemoveElements
  #[["selector", "#trackingContainer"]]
  $("//*[@id = 'trackingContainer']") {
    remove()
  }
  
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "contact\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /contact\/index/) {
  
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", ""]]
    $("//table" ) {
      # first remove tbody if it exists
      $("tbody") {
        $("tr") {
          move_to("..", "before")
        }
        remove()
      }
      name("div")
      $("tr") {
        name("div")
        $("td") {
          name("span")
        }
        $("text()[normalize-space(.) = '']") {
          remove()
        }
      }
      $("text()[normalize-space(.) = '']") {
        remove()
      }
    }
    
    
  }
  
#}