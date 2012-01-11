
# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Javascript::RemoveScriptTagContains
  #[["match", "mbox"]]
  $("//script[contains(text(),'mbox')]") {
    remove()
  }
  
  
  #
  #Content::Javascript::RemoveScriptTagSrcContains
  #[["src_phrase", "mbox"]]
  $("//script[contains(@src, 'mbox')]") {
    remove()
  }
  
  
}