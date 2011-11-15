# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
    add_class("mw_coach")
  }  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "style"], ["selector", "div, span"]]
  $("//div") {
    attribute("style") {
      remove()
    }
  }
  $("//span") {
    attribute("style") {
      remove()
    }
  }
  
  
  #Coach Nav
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #dump image to text
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", ".yuimenubaritem > a > img"], ["target_selector", ".yuimenubaritem > a"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a/img") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a") {
        var("counter") {
          append("a")
        }
        # TODO: change this to the latter so that it replaces the contents instead
        # of adding to it - i was getting an inexplicable error when I tried it before
        inject(var($counter))
        #inner {
        #  set(var($counter))
        #}
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".yuimenubaritem > a > img"]]
      $("//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a/img") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".coachfooter, .yuimenubaritem > a"], ["class_name", "mvCoachNav"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' coachfooter ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvCoachNav")
          move_here("//*[contains(concat(' ', @class, ' '), ' coachfooter ')][not (@the_wrapper)]", "bottom")
          move_here("//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a[not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a)[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvCoachNav")
          move_here("//*[contains(concat(' ', @class, ' '), ' coachfooter ')][not (@the_wrapper)]", "bottom")
          move_here("//*[contains(concat(' ', @class, ' '), ' yuimenubaritem ')]/a[not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvCoachNav"], ["before_me", ".coachtitlebar"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' coachtitlebar ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".TopBannerPool, .coachtitlebar, .clearboth"]]
    $("//*[contains(concat(' ', @class, ' '), ' TopBannerPool ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' coachtitlebar ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "align"], ["selector", ".coachfooter"]]
    $("//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
      attribute("align") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".mvCoachNav > a"], ["tag_name", "div"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]/a") {
      wrap("div") {
        attribute("class", "mvDarkGrayBar")
      }
    }
    
    
  # end BasicGroup
  
  #Title nav accordian for sub pages
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCoachAccordian"], ["selector", ".mvCoachNav"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".productThumbTable"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]") {
      match($done, "no") {
          var("conditional", "false")
            $("//*[contains(concat(' ', @class, ' '), ' productThumbTable ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvCoachAccordian")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvCoachAccordian .coachfooter"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCoachAccordian ')]//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
      inner() {
        append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".mvCoachAccordian > .mvDarkGrayBar"], ["class_name", "mvCoachNavContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mvCoachAccordian ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvCoachNavContent")
          move_here("//*[contains(concat(' ', @class, ' '), ' mvCoachAccordian ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::Dynamic::Accordian3
  #[["link_selector", ".mvCoachAccordian .coachfooter"], ["content_selector", ".mvCoachNavContent"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
  var("counter", "")
  var("content_id_string", "[")
  $("//*[contains(concat(' ', @class, ' '), ' mvCoachNavContent ')]") {
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
          append("64990")
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
  $("//*[contains(concat(' ', @class, ' '), ' mvCoachAccordian ')]//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
    var("counter") {
      append("a")
    }
    var("id", fetch("./@id"))
    match($id, /^$/) {
      attribute("id") {
        value() {
          set("acc_link")
          append($counter)
          append("64990")
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
  
  
  #sub categories title
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::DumpImgAltText
    #[["image_selector", ".coacheoltitleDiv img"], ["target_selector", ".coacheoltitleDiv"], ["map_multiple", "true"]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' coacheoltitleDiv ')]//img") {
      var("counter") {
        append("a")
      }
      var($counter, fetch("./@alt"))
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' coacheoltitleDiv ')]") {
      var("counter") {
        append("a")
      }
      # TODO: change this to the latter so that it replaces the contents instead
      # of adding to it - i was getting an inexplicable error when I tried it before
      inject(var($counter))
      #inner {
      #  set(var($counter))
      #}
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".coacheoltitleDiv img"]]
    $("//*[contains(concat(' ', @class, ' '), ' coacheoltitleDiv ')]//img") {
      remove()
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvGoTop"], ["selector", "a[href=\"#top\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//a[@href = \"#top\"]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvGoTop")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvTitle"], ["selector", ".coacheoltitleDiv"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' coacheoltitleDiv ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvTitle")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvCoachItemWrapper"], ["selector", ".productThumbHeroLeft, .productThumb, .productThumbHeroRight"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' productThumbHeroLeft ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvCoachItemWrapper")
        }
      }
    }
  }
  $("//*[contains(concat(' ', @class, ' '), ' productThumb ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvCoachItemWrapper")
        }
      }
    }
  }
  $("//*[contains(concat(' ', @class, ' '), ' productThumbHeroRight ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvCoachItemWrapper")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddQueryParameter
  #[["query_parameter_name", "wid"], ["query_parameter_value", "152"], ["selector", ".mvCoachItemWrapper img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvCoachItemWrapper ')]//img") {
    attribute("src") {
      value() {
        append("?wid=152")
        # change the last question mark into an ampersand for valid query parameters
        replace(/(\?.+)\?/, "\\1&")
      }
    }
  }
  
  
  #
  #Content::Formatting::AddQueryParameter
  #[["query_parameter_name", "hei"], ["query_parameter_value", "168"], ["selector", ".mvCoachItemWrapper img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvCoachItemWrapper ')]//img") {
    attribute("src") {
      value() {
        append("?hei=168")
        # change the last question mark into an ampersand for valid query parameters
        replace(/(\?.+)\?/, "\\1&")
      }
    }
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "width"], ["selector", "img, div, span"]]
  $("//img") {
    attribute("width") {
      remove()
    }
  }
  $("//div") {
    attribute("width") {
      remove()
    }
  }
  $("//span") {
    attribute("width") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mvCoachItemWrapper > img.mvHideElement"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' mvCoachItemWrapper ')]/img[contains(concat(' ', @class, ' '), ' mvHideElement ')]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvRemoveElement")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".productThumb.mvCoachItemWrapper > img[src*=\"space\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' mvCoachItemWrapper ')]/img[contains(@src, \"space\")]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvRemoveElement")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#menu_whats_new, .mvRemoveElement, .bg-dots, .productThumbnailTableGutter"]]
  $("//*[@id = 'menu_whats_new']") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' bg-dots ')]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' productThumbnailTableGutter ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::Table::Remove::PreserveLayout
  #[["selector", ""]]
  $("//table" ) {
    # first remove tbody if it exists
    $("tbody") {
      $("tr") {
        move_to("..", "before")
      }
      remove()
    }
    name("div")
    $("tr") {
      name("div")
      $("td") {
        name("span")
      }
      $("text()[normalize-space(.) = '']") {
        remove()
      }
    }
    $("text()[normalize-space(.) = '']") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::RemoveEmptyElements
  #[["selector", ".mvDarkGrayBar"]]
  $("//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')][not(descendant::*)]") {
    remove()
  }
  
  $("/html/body/div[@id='doc3']/div[@id='bd']//div[@class='mvDarkGrayBar']/a") {
    add_class("sprite_me-arrow_right_white")
  }
  
  # Implementing 'list' and 'grid' views in coach pages
  $("//div[contains(@class,'coachmaincontent')]") {
    # Creating template to match browse/search pages
    insert_top("div") {
      attribute("id", "filterSort")
      insert_bottom("div", id:"mvColumnViewBtn")
      insert_bottom("div", id:"mvlistViewBtn")
    }
    
    # Grid View event listener (onclick) - Adds mvColumnView to parent
    insert_bottom("script") {
      inner() {
        set("document.getElementById('mvColumnViewBtn').addEventListener('click', function(){add_class(document.getElementById('globalContentContainer'),'mvColumnView');},false);")
      }
    }
    
    # List View event listener (onclick) - Removes mvColumnView from parent
    insert_bottom("script") {
      inner() {
        set("document.getElementById('mvlistViewBtn').addEventListener('click', function(){remove_class(document.getElementById('globalContentContainer'),'mvColumnView');},false);")
      }
    }
  }
}
