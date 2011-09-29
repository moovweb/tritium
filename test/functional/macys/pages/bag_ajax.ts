
# ----- ConfigBlocks ----
#
#Config::DocumentFragment
#[]
# --- not found ---


# ----- ParsedHTMLBlocks ----
html() {
  #
  #Default block
  #Content::Passthrough::Link
  #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
  # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
  # we tend to do in v2
  $("//a") {
    attribute("href") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #
  #Default block
  #Content::Passthrough::Form
  #[["regex_exclusion", ""]]
  # NOTE: AF: Very loose implementation. Just rewriting all the forms as
  # we tend to do in v2
  $("//form") { 
    attribute("action") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #
  #Default block
  #Content::Absolutize::AbsolutizeImages
  #[]
  $("//img[@src]") {
    var("src", fetch("./@src"))
    attribute("src") {
      value() {
        # if the src starts with a slash (/) but not a double slash (//) then add the host
        match($src, /^\/[^\/]/) {
          prepend($source_host)
          prepend("//")
        }
        # TODO: handle the case where the image URL is page-relative (doesn't start with http
        # or a slash)
      }
    }
  }
  
  
  #
  #Default block
  #Content::Development::SubdomainFix
  #[]
  # NOT IMPLEMENTING - development blocks are unnecessary
  
  
}
