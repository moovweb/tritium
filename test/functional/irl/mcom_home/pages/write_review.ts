# There is something like this in some JS on this page: 
# parent.location.href = 'http://www.macys.com/product/re ...
# Obviously that link needs to get rewritten
rewrite('link')

# ----- ParsedHTMLBlocks ----
html() {
    # Add page specific class
    $("//html/body") {
      add_class("mw_writeReview")
      $("//table"){
        name("div")
        $(".//tr"){
          name("div")
          $(".//td"){
            name("div")
          }
        }
        
      }
    }

  #
  #Content::Passthrough::IFrame
  #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
  $("//iframe") {
    attribute("src") {
      value() {
        rewrite("link")
      }
    }
  }
}
