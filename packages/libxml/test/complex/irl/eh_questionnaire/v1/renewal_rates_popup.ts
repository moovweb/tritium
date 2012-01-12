
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts



# ----- ParsedHTMLBlocks ----
html() {
  #
  #Content::CSS::AddCSS
  #[["css_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/subscription_global.css?moov_cache_name=eharmony-subscription_global.css&moov_cache_version=998689328529"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("v1/subscription_global"))
  }
  
  
  #Head
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", "table:first-of-type td:first-of-type"]]
    $("//table[position() = 1]//td[position() = 1]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mRenewHead"], ["selector", "table:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//table[position() = 1])[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mRenewHead")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", ".mRenewHead, .mRenewHead tbody, .mRenewHead tr, .mRenewHead td"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mRenewHead ')]") {
      name("div")
    }
    $("//*[contains(concat(' ', @class, ' '), ' mRenewHead ')]//tbody") {
      name("div")
    }
    $("//*[contains(concat(' ', @class, ' '), ' mRenewHead ')]//tr") {
      name("div")
    }
    $("//*[contains(concat(' ', @class, ' '), ' mRenewHead ')]//td") {
      name("div")
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".mRenewHead"]]
    $("//*[contains(concat(' ', @class, ' '), ' mRenewHead ')]") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "body > *"], ["class_name", "mRenew"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//body/*)[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mRenew")
          move_here("//body/*[not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRenewTitle"], ["selector", ".mRenew strong"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//*[contains(concat(' ', @class, ' '), ' mRenew ')]//strong)[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRenewTitle")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", ".mRenewTitle"], ["after_me", ".mRenewHead a"], ["map_multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mRenewHead ')]//a)[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mRenewTitle ')])[1]", "after")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mRenewHeadClose"], ["selector", ".mRenewHead a"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("(//*[contains(concat(' ', @class, ' '), ' mRenewHead ')]//a)[1]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mRenewHeadClose")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", ".mRenew > p:first-of-type"], ["new_tag_name", "div"], ["class_name", "mRenewSubHead"]]
  $("//*[contains(concat(' ', @class, ' '), ' mRenew ')]/p[position() = 1]") {
    name("div")
    attribute("class", "mRenewSubHead")
  }
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", ".mRenew > p:first-of-type"], ["new_tag_name", "div"], ["class_name", "mRenewIntro"]]
  $("//*[contains(concat(' ', @class, ' '), ' mRenew ')]/p[position() = 1]") {
    name("div")
    attribute("class", "mRenewIntro")
  }
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", ".mRenew > p:first-of-type"], ["new_tag_name", "div"], ["class_name", "mRenewTableHead"]]
  $("//*[contains(concat(' ', @class, ' '), ' mRenew ')]/p[position() = 1]") {
    name("div")
    attribute("class", "mRenewTableHead")
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "width"], ["selector", "table"]]
  $("//table") {
    attribute("width") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "bgcolor"], ["selector", "td"]]
  $("//td") {
    attribute("bgcolor") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/renewal_close.png?moov_cache_name=eharmony-renewal_close.png&moov_cache_version=998689328529"], ["selector", ".mRenewHeadClose img"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//*[contains(concat(' ', @class, ' '), ' mRenewHeadClose ')]//img") {
    attribute("src", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/renewal_close.png?moov_cache_name=eharmony-renewal_close.png&moov_cache_version=998689328529")
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "width"], ["selector", ".mRenewHeadClose img"]]
  $("//*[contains(concat(' ', @class, ' '), ' mRenewHeadClose ')]//img") {
    attribute("width") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "height"], ["selector", ".mRenewHeadClose img"]]
  $("//*[contains(concat(' ', @class, ' '), ' mRenewHeadClose ')]//img") {
    attribute("height") {
      remove()
    }
  }
  
  
}