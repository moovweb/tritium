
# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRQFormSliderWrap"], ["selector", ".mRQFormQuestionsListItemAnswerSliderWrap"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' mRQFormQuestionsListItemAnswerSliderWrap ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mRQFormSliderWrap")
        }
      }
    }
  }
  
  
}