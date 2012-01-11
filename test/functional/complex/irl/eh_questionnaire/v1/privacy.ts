
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class='mw_closing_x'><a href=\"javascript:window.close()\"><img src=\"http://dl.dropbox.com/u/13351720/eHarmony/images/renewal_close.png\" border=\"0\" alt=\"common.button.close.window.alt\"></a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//body//*[position() = 1 and self::*])[1]") {
    inject_before("<div class='mw_closing_x'><a href=\"javascript:window.close()\"><img src=\"http://dl.dropbox.com/u/13351720/eHarmony/images/renewal_close.png\" border=\"0\" alt=\"common.button.close.window.alt\"></a></div>")
  }
  
  
  #
  #Content::CSS::AddCSS
  #[["css_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/terms_doug.css?moov_cache_name=eharmony-terms_doug.css&moov_cache_version=998689328529"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: asset("stylesheets/v1/terms.css"))
  }
  
  
  #
  #Content::Formatting::RemoveExcept
  #[["remove", "#containerSub"], ["keep", "#infoBox"]]
  # 1 move all the keep stuff just after the remove stuff
  $("//*[@id = 'containerSub']") {
    move_here(".//*[@id = 'infoBox']", "before")
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#infoBox > p:first-child"]]
  $("//*[@id = 'infoBox']/*[position() = 1 and self::p]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "body > br"]]
  $("//body/br") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#infoBox > br"]]
  $("//*[@id = 'infoBox']/br") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".footer"]]
  $("//*[contains(concat(' ', @class, ' '), ' footer ')]") {
    remove()
  }
  
  
}