
# ----- RawHTMLBlocks ----
#
#Content::Raw::PassthroughURLFromCapture
#[["regex", "onload.*?=.*?\"javascript:window\\.location\\.replace\\('(.*?)'\\)\""], ["multiline", ""]]
replace(/onload.*?=.*?\"javascript:window\.location\.replace\('(.*?)'\)\"/) {
  rewrite("link")
}
