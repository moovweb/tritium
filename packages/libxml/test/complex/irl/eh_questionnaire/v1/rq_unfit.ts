
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts


#
#Config::IncludeBlockset
#[["blockset_name", "rq_base"]]
@import rq_base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class=\"mw_RQHeader\"> \t<div class=\"mw_RQHeaderLogo\"></div> <a href=\"/singles/servlet/user/logout\" class=\"mw_RQHeaderLogout\">Logout</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//body//*[position() = 1 and self::*])[1]") {
    inject_before("<div class=\"mw_RQHeader\"> 	<div class=\"mw_RQHeaderLogo\"></div> <a href=\"/singles/servlet/user/logout\" class=\"mw_RQHeaderLogout\">Logout</a></div>")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mw_RQUnfit"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//body)[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mw_RQUnfit")
        }
      }
    }
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class=\"mw_RQUnfitSegment\">Our system is unable to find you compatible matches at this time.</div> <div class=\"mw_RQUnfitSegment\">Please understand that this is the result of our matching process and in no way reflects on you as a person or your ability to be in a happy relationship.</div> <div class=\"mw_RQUnfitSegment\">We wish you all the best in your search for that special someone.</div> <div class=\"mw_RQUnfitSegment\"><a href=\"http://www.eharmony.moov1.com/singles/servlet/user/logout\" class=\"mw_RQUnfitLogout\">Logout</a></div>"], ["add_after", ".mw_RQHeader"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mw_RQHeader ')])[1]") {
    inject_after("<div class=\"mw_RQUnfitSegment\">Our system is unable to find you compatible matches at this time.</div> <div class=\"mw_RQUnfitSegment\">Please understand that this is the result of our matching process and in no way reflects on you as a person or your ability to be in a happy relationship.</div> <div class=\"mw_RQUnfitSegment\">We wish you all the best in your search for that special someone.</div> <div class=\"mw_RQUnfitSegment\"><a href=\"http://www.eharmony.moov1.com/singles/servlet/user/logout\" class=\"mw_RQUnfitLogout\">Logout</a></div>")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#header-wrapper"]]
  $("//*[@id = 'header-wrapper']") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#content-container"]]
  $("//*[@id = 'content-container']") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".eh-footer"]]
  $("//*[contains(concat(' ', @class, ' '), ' eh-footer ')]") {
    remove()
  }
  
  
  #
  #Content::Labeling::NumberElements
  #[["selector", ".mw_RQUnfitSegment"], ["prefix", "mw_RQUnfitSeg_"]]
  # Requires tritium >= 0.6.191
  $("//*[contains(concat(' ', @class, ' '), ' mw_RQUnfitSegment ')][not (@id)]") {
    $mw_temp = "mw_RQUnfitSeg_"
    $mw_temp {
      append(index())
    }
    attribute("id", $mw_temp)
  }
  
  
}