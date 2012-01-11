
# ----- RawHTMLBlocks ----
#
#Content::Raw::RegexReplaceCapture
#[["match", "form.action.*?=.*?(actionUrl);"], ["replace", "moov_passthrough_link(actionUrl)"], ["multiline", ""]]
# --- not found ---


# ----- ConfigBlocks ----
#
#Config::ForcePassthroughType
#[["keyword", "moov_raw"]]
# This block does not make sense in v2 and is usually not required


# ----- ParsedHTMLBlocks ----
html() {
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  
}