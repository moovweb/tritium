# ----- ParsedHTMLBlocks ----
html() {
    
    # Add page specific class
     $("//html/body") {
          add_class("mw_registryCate")
        }
  #page title
  #Content::Formatting::ReplaceTag
  #[["selector", "#nav_title a"], ["new_tag_name", "div"], ["class_name", "mvTitle"]]
  $("//*[@id = 'nav_title']//a") {
    name("div")
    attribute("class", "mvTitle")
  }
  
  
  #Page Title accordian
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#registrySplashPools"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//*[@id = 'registrySplashPools'])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvTitle"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvTitle ')]") {
      inner() {
        append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", "#nav_title"], ["content_selector", ".nav_cat_sub_2"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' nav_cat_sub_2 ')]") {
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
            append("96624")
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
    $("//*[@id = 'nav_title']") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("96624")
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
    
    
  }
  
  
  #Remove Unneeded Elements
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#macysGlobalBanner, #registrySplashPools, .mvRemoveElement, .clearboth"]]
    $("//*[@id = 'macysGlobalBanner']") {
      remove()
    }
    $("//*[@id = 'registrySplashPools']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
      remove()
    }
    
    
  # end BasicGroup
  
  #Sub Nav
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".nav_cat_item_bold > span"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]/span") {
      inner() {
        append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", ".nav_cat_item_bold > span"], ["new_tag_name", "div"], ["class_name", "mvDarkGrayBar"]]
    $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]/span") {
      name("div")
      attribute("class", "mvDarkGrayBar")
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".nav_cat_sub_3  li a"], ["tag_name", "div"], ["class_name", "mvWhiteGrayBar"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' nav_cat_sub_3 ')]//li//a") {
      wrap("div") {
        attribute("class", "mvWhiteGrayBar")
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian4
    #[["link_selector", ".mvDarkGrayBar"], ["content_selector", ".nav_cat_sub_3"], ["ancestor_selector", ".nav_cat_item_bold"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("anc_counter", "")
    $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
      var("anc_counter") {
        append("b")
      }
      var("counter", "")
      var("content_id_string", "[")
      $(".//*[contains(concat(' ', @class, ' '), ' nav_cat_sub_3 ')]") {
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
              append($anc_counter)
              append("71159")
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
      $(".//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append($anc_counter)
              append("71159")
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
    }
    
    
  # end BasicGroup
  
  #Thumbnails
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #Remove Alternate Image Thumbnails
    #Content::Formatting::RemoveElements
    #[["selector", ".altCrossfadeImage"]]
    $("//*[contains(concat(' ', @class, ' '), ' altCrossfadeImage ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddQueryParameter
    #[["query_parameter_name", "wid"], ["query_parameter_value", "82"], ["selector", ".thumbnailImage"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      attribute("src") {
        value() {
          append("?wid=82")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    #
    #was 100px
    #Content::Formatting::AddAttribute
    #[["attribute", "width"], ["value", "82px"], ["selector", ".thumbnailImage"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      match($done, "no") {
        attribute("width") {
          value() {
              set("82px")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "height"], ["value", "100px"], ["selector", ".thumbnailImage"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
      match($done, "no") {
        attribute("height") {
          value() {
              set("100px")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #Products
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapElement
    #[["selector", ".productThumbnail"], ["class_name", "mvProductThumbWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", "div"], ["only_include_direct_children", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
      $("(.//div)[1]") {
        # call it a divvv at first to make sure that the move_here
        # selector doesn't capture it and try to move it inside itself
        # - then later rename it to a div
        insert_before("div") {
          attribute("class", "mvProductThumbWrapper")
        attribute("the_wrapper", "true")
          move_here("../div[not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMoreColorContainer"], ["selector", ".mvProductThumbWrapper"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".moreColors"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProductThumbWrapper ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' moreColors ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvMoreColorContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", ".prices > span"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' prices ')]/span") {
      name("div")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".prices br"]]
    $("//*[contains(concat(' ', @class, ' '), ' prices ')]//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::AnchorParentTrigger
    #[["selector", ".productThumbnail > a"], ["alternate_target_element", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]/a[@href]") {
      var("href", fetch("./@href"))
      $("..") {
        attribute("onclick") {
          value() {
            set($href)
            prepend("window.location='")
            append("'")
          }
        }
      }
    }
    
    
    #Remove quick view icon
    #Content::Formatting::RemoveElements
    #[["selector", "img[src*=\"qv-button\"]"]]
    $("//img[contains(@src, \"qv-button\")]") {
      remove()
    }
    
    
  # end BasicGroup
  
}
