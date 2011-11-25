# ----- ParsedHTMLBlocks ----
html() {
  
  # We nip the availabilityCheck requests in the bud by injecting a script
  # This script calls setAjaxResponse with availabilityCheck and true.
  # This is in plutonium and is added in bundles.yaml
  # What the script does is whenever it sees an ajax request for availabilityCheck,
  # it returns the value true before any request is made to macys.
  # The reason why it is used is that an availabilityCheck request is made 
  # for every single item on the browse page which we don't want.
  # The availability check is done when a user clicks on the item he/she wants
  # This tradeoff is quite reasonable

  $("//div[@id='localContentContainer']") {
    inject_bottom("<script type='text/javascript'>function setAvailability(){setAjaxResponse('availabilityCheck?','true')}; setAvailability();</script>")
  }

  # Can't remove this.
  # $(".//script[contains(@src,'catalog.script-min')]") {
  #   remove()
  # }
  
  #
  #Content::CSS::AddCSS
  #[["css_path", "http://dl.dropbox.com/u/6208053/macys_v2/macys_giftCard.css"], ["encode_image_threshold", ""]]
  $("/html/body") {
       add_class("mw_giftCard")
     }
 
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvTitle"], ["selector", ".currentCatHeader"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvTitle")
        }
      }
    }
  }
  
  
  #For all free e-gift cards only
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #Add Body ID to all gift card
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvAllEgiftCard"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "#1405"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("conditional", "false")
            $("//*[@id = '1405']") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvAllEgiftCard")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvAllEgiftCard .mvTitle"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvAllEgiftCard ')]//*[contains(concat(' ', @class, ' '), ' mvTitle ')]") {
      inner() {
        append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerText
    #[["selector", ".mvAllEgiftCard h1.currentCategory"], ["text", "Free e-Gift Cards"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' mvAllEgiftCard ')]//h1[contains(concat(' ', @class, ' '), ' currentCategory ')]") {
      inner() {
        set("Free e-Gift Cards")
      }
    }
    
    
   
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".mvAllEgiftCard .mvTitle"], ["content_selector", ".mvAllEgiftCard .subCatList"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' mvAllEgiftCard ')]//*[contains(concat(' ', @class, ' '), ' subCatList ')]") {
        $("div[contains(@class,'nav_cat_sub')]"){
          add_class("mvLightGrayBar")
        }
        attribute("class") {
          value() {
            append(" mw_accordian_hide")
          }
        }
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_con")
            append($counter)
            append("33378")
          }
        }
      }
      var("id", fetch("./@id"))
      var("content_id_string") {
        append("'")
        append($id)
        append("',")
      }
    }
    var("content_id_string") {
      replace(/,$/, "]")
    }
    var("counter", "")
    $("//*[contains(concat(' ', @class, ' '), ' mvAllEgiftCard ')]//*[contains(concat(' ', @class, ' '), ' mvTitle ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("33378")
          }
        }
      }
      var("id", fetch("./@id"))
      attribute("onclick") {
        value() {
          set("moovweb_toggle_accordian3('")
          append($id)
          append("', ")
          append($content_id_string)
          append(", 'mw_accordian_hide')")
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#macysGlobalBanner, #1405, .clearFloats, .clearboth"]]
  $("//*[@id = 'macysGlobalBanner']") {
    remove()
  }
  $("//*[@id = '1405']") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' clearFloats ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
    remove()
  }
  
  
  #thumbnails
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddQueryParameter
    #[["query_parameter_name", "hei"], ["query_parameter_value", "184"], ["selector", ".thumbnailImage"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      attribute("src") {
        value() {
          append("?hei=184")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    
    #
    #Content::Formatting::AddQueryParameter
    #[["query_parameter_name", "wid"], ["query_parameter_value", "150"], ["selector", ".thumbnailImage"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      attribute("src") {
        value() {
          append("?wid=150")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "width"], ["value", "150"], ["selector", ".thumbnailImage"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      match($done, "no") {
        attribute("width") {
          value() {
              set("150")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "height"], ["value", "184"], ["selector", ".thumbnailImage"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      match($done, "no") {
        attribute("height") {
          value() {
              set("184")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvProductThumbWrapper ')]") {
      move_to("..", "bottom")
    }
    
  # end BasicGroup
  
}
