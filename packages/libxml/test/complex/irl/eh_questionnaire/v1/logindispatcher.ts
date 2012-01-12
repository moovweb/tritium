
# ----- RawHTMLBlocks ----
#
#Content::Raw::PassthroughURLFromCapture
#[["regex", "(http\\:\\/\\/(www\\.eharmony\\.com|r7\\.eharmony\\.com))"], ["multiline", "true"]]
replace(/(http\:\/\/(www\.eharmony\.com|r7\.eharmony\.com))/m) {
  rewrite("link")
}


