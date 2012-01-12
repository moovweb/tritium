
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  
  #
  #Content::CSS::RemoveCSS
  #[["regex_exclusion", ""]]
  $("//style") {
    remove()
  }
  $("//link[@rel = 'stylesheet']") {
    remove()
  }
  
  
  #
  #Content::Passthrough::Attribute
  #[["selector", "script[src*=\"localization.js\"]"], ["attribute", "src"], ["regex_capture", ""]]
  $("//script[contains(@src, \"localization.js\")]") {
    attribute("src") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
}