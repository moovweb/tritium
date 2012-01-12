
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
  #[["attribute", "class"], ["value", "mw_RQPhotoUpload"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//body)[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mw_RQPhotoUpload")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".sectionHeader"]]
  $("//*[contains(concat(' ', @class, ' '), ' sectionHeader ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::WrapTextChildren
  #[["selector", "#rq-photo-upload-header"], ["tag_name", "span"], ["class_name", "mw_PhotoUploadHeaderText"], ["multiple", ""], ["split_delimiter", ""]]
  $("(//*[@id = 'rq-photo-upload-header'])[1]") {
    wrap_text_children("span", class: 'mw_PhotoUploadHeaderText')
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class=\"mw_PhotoUploadHeaderAvatar\"></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mw_PhotoUploadHeaderText"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mw_PhotoUploadHeaderText ')])[1]") {
    inject_before("<div class=\"mw_PhotoUploadHeaderAvatar\"></div>")
  }
  
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".no-thanks"], ["before_me", ".mw_RQHeader"], ["map_moves", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mw_RQHeader ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' no-thanks ')])[1]", "before")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#skip-photo-upload-prompt button, #skip-photo-upload-prompt .no-thanks"]]
  $("//*[@id = 'skip-photo-upload-prompt']//button") {
    remove()
  }
  $("//*[@id = 'skip-photo-upload-prompt']//*[contains(concat(' ', @class, ' '), ' no-thanks ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".skip-photo-header, .are-you-sure"]]
  $("//*[contains(concat(' ', @class, ' '), ' skip-photo-header ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' are-you-sure ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", "#skip-photo-upload-prompt .comm"], ["text", "We didn't think so. You need to upload a photo to be successful on eHarmony."], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[@id = 'skip-photo-upload-prompt']//*[contains(concat(' ', @class, ' '), ' comm ')]") {
    inner() {
      set("We didn't think so. You need to upload a photo to be successful on eHarmony.")
    }
  }
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", "#rq-photo-upload-container #regularUpload"], ["new_tag_name", "p"], ["class_name", ""]]
  $("//*[@id = 'rq-photo-upload-container']//*[@id = 'regularUpload']") {
    name("p")
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", "#rq-photo-upload-container #regularUpload"], ["html", "We're sorry, but photo uploads are not currently supported for mobile devices. Please visit eHarmony.com from a non-mobile device to upload your photo."], ["prepend", ""], ["append", ""]]
  $("//*[@id = 'rq-photo-upload-container']//*[@id = 'regularUpload']") {
    inner("We're sorry, but photo uploads are not currently supported for mobile devices. Please visit eHarmony.com from a non-mobile device to upload your photo.")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".fb-overlay"]]
  $("//*[contains(concat(' ', @class, ' '), ' fb-overlay ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#photo_upload_module, #photo-upload-info, #rq-photo-upload-skip"]]
  $("//*[@id = 'photo_upload_module']") {
    remove()
  }
  $("//*[@id = 'photo-upload-info']") {
    remove()
  }
  $("//*[@id = 'rq-photo-upload-skip']") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#rq-rt-column"]]
  $("//*[@id = 'rq-rt-column']") {
    remove()
  }
  
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", ".no-thanks"], ["after_me", "#rq-photo-upload-privacy"], ["map_multiple", ""]]
  $("(//*[@id = 'rq-photo-upload-privacy'])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' no-thanks ')])[1]", "after")
  }
  
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".no-thanks"], ["text", "Skip this step"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[contains(concat(' ', @class, ' '), ' no-thanks ')]") {
    inner() {
      set("Skip this step")
    }
  }
  
  
}