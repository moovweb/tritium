
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::Formatting::RemoveElements
  #[["selector", "iframe[src*=\"facebook\"]"]]
  $("//iframe[contains(@src, \"facebook\")]") {
    remove()
  }
  
  
  #Optimization
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".fb-login-button"]]
    $("//*[contains(concat(' ', @class, ' '), ' fb-login-button ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".connect_widget_interactive_area"]]
    $("//*[contains(concat(' ', @class, ' '), ' connect_widget_interactive_area ')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagContains
    #[["match", "fb_like.js"]]
    $("//script[contains(text(),'fb_like.js')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "fb_like.js"]]
    $("//script[contains(@src, 'fb_like.js')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagSrcContains
    #[["src_phrase", "facebook"]]
    $("//script[contains(@src, 'facebook')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagContains
    #[["match", "facebook"]]
    $("//script[contains(text(),'facebook')]") {
      remove()
    }
    
    
    #
    #Content::Javascript::RemoveScriptTagContains
    #[["match", "ak"]]
    $("//script[contains(text(),'ak')]") {
      remove()
    }
    
    
  # end BasicGroup
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #
  #  #Content::Javascript::RemoveScriptTagSrcContains
  #  #[["src_phrase", "js"]]
  #  $("//script[contains(@src, 'js')]") {
  #    remove()
  #  }
  #  
  #  
  #  #
  #  #Content::Javascript::RemoveScriptTagContains
  #  #[["match", "js"]]
  #  $("//script[contains(text(),'js')]") {
  #    remove()
  #  }
  #  
  #  
  
  
}