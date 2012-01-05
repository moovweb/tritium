
#Content::Raw::RegexReplaceCapture
#[["match", "QTY(\\:)"], ["replace", " "], ["multiline", ""]]



$("//script") {
  text() {
    replace(/(<img.+?callout_lpos.gif.+?>)/, "<div class='mw_lowest_text'>lowest price of the season</div>")
  }
}

# $("//div[contains(@class, \"pdp_atb_item_attrs\")]"){
#   $("./span[contains(@class, \"pdp_atb_item_spacing\")]"){
#     move_to("..", "before")
#   }
# }
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts



# ----- ParsedHTMLBlocks ----
  
  #
  #
  #this replace only removes the : from the QTY text
  #there must be a better way in v2
  #once this is fixed we can remove html and add
  #it to the pages fileand mappings.ts
  #
  #
  $("//div[contains(text(),'QTY:')]"){
    inner(){
      replace(/QTY(\:)/) {
        replace($1, " ")
      }
    }
  }
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#coach_headerContainer"], ["negate", ""]]
  $("(//*[@id = 'coach_headerContainer'])[1]") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_headerContainer"]]
    $("//*[@id = 'coach_headerContainer']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_topNavContainer"]]
    $("//*[@id = 'coach_topNavContainer']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_footer_logoContainer"]]
    $("//*[@id = 'coach_footer_logoContainer']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_pdp_description br"]]
    $("//*[@id = 'coach_pdp_description']//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCoachProduct"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCoachProduct")
          }
        }
      }
    }
    
    
    #coach title
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "span.coachnewproduct"], ["to_beginning_of_me", "span.coachnewproduct + h1"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//span[contains(concat(' ', @class, ' '), ' coachnewproduct ')]/following-sibling::*[1]/self::h1)[1]") {
        move_here("(//span[contains(concat(' ', @class, ' '), ' coachnewproduct ')])[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", "#coach_pdp_description h1"], ["before_me", ".coach_bl_pdp_left"], ["map_moves", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' coach_bl_pdp_left ')])[1]") {
        move_here("(//*[@id = 'coach_pdp_description']//h1)[1]", "before")
      }
      
      
    # end BasicGroup
    
    #coach selector items
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvProductSelectWrap\"></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".coach_bl_pdp_right"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' coach_bl_pdp_right ')])[1]") {
        inject_before("<div class=\"mvProductSelectWrap\"></div>")
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", "#productAttributeDropdown"], ["tag_name", "div"], ["class_name", ""], ["id", "mvSelectMenuWrap"], ["multiple", ""]]
      $("//*[@id = 'productAttributeDropdown']") {
        wrap("div") {
          attribute("id", "mvSelectMenuWrap")
        }
      }
      
      
      
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "#mvSelectMenuWrap"], ["to_beginning_of_me", ".mvProductSelectWrap"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvProductSelectWrap ')])[1]") {
        move_here("(//*[@id = 'mvSelectMenuWrap'])[1]", "top")
      }
      
      
      
      #Content::Formatting::MoveBefore
      #[["move_me", "#PriceDisplay"], ["before_me", "#mvSelectMenuWrap"], ["map_moves", ""]]
      $("(//*[@id = 'mvSelectMenuWrap'])[1]") {
        move_here("(//*[@id = 'PriceDisplay'])[1]", "before")
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".coach_pdp_swatches"], ["to_beginning_of_me", "#productAttributeDropdown"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'productAttributeDropdown'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' coach_pdp_swatches ')])[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#PriceDisplay"], ["after_me", "#coach_pdp_color_size"], ["map_multiple", ""]]
      $("(//*[@id = 'coach_pdp_color_size'])[1]") {
        move_here("(//*[@id = 'PriceDisplay'])[1]", "after")
      }
      
      
      #coach size drop down move
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvCoachContainsSizeMenu"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "//div[@id = \"coach_pdp_size\"]/select/.."], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//body") {
          match($done, "no") {
              var("conditional", "false")
                $("//div[@id = \"coach_pdp_size\"]/select/..") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvCoachContainsSizeMenu")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvContainsSizeMenu"], ["selector", "//div[@id = \"coach_pdp_size\"]/select/.."], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//div[@id = \"coach_pdp_size\"]/select/..") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvContainsSizeMenu")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", "#coach_pdp_qty"], ["after_me", ".mvContainsSizeMenu"], ["map_multiple", "true"]]
        var("counter", "a")
        $("//*[contains(concat(' ', @class, ' '), ' mvContainsSizeMenu ')]") {
          var("counter") {
            append("a")
          }
          attribute("id774", $counter)
        }
        var("counter", "a")
        $("//*[@id = 'coach_pdp_qty']") {
          var("counter") {
            append("a")
          }
          var("xpath") {
            set("//*[@id774 = '")
            append($counter)
            append("']")
          }
          move_to($xpath, "after")
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #coach description
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".coach_bl_pdp_right"], ["tag_name", "div"], ["class_name", "mvProductInfoWrap"], ["id", ""], ["multiple", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' coach_bl_pdp_right ')]") {
        wrap("div") {
          attribute("class", "mvProductInfoWrap")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "pdp_longDescription"], ["selector", "#coach_pdp_description"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'coach_pdp_description']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" pdp_longDescription")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "pdp_descriptionAndPrice"], ["selector", "#PriceDisplay"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'PriceDisplay']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("pdp_descriptionAndPrice")
            }
          }
        }
      }
    # end BasicGroup
    
  }
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".cmio_PDPZ1 script:last-of-type"]]
  $("//*[contains(concat(' ', @class, ' '), ' cmio_PDPZ1 ')]//script[position() = last()]") {
    remove()
  }
  
  #add class to the submit button
  $("//div[contains(@class, 'submit-btn')]"){
    add_class("mvButton mvButtonMargins")
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "li > a[href*=\"mattress-buying-guide.jsp\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//li/a[contains(@href, \"mattress-buying-guide.jsp\")]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvRemoveMe")
        }
      }
      }
    }
  }
  
  
  # #raitingImageJS
  # #Group::BasicGroup
  # #[]
  # # No need to wrap the contents at all
    
    
    # #
    # #Content::Javascript::AddInlineScriptTag
    # #[["script", "document.getElementById('BVSecondaryCustomerRatings').addEventListener('DOMSubtreeModified', mvAddRating);"], ["add_after", "#BVSecondaryCustomerRatings"], ["add_before", ""]]
    #   $("//body"){#(//*[@id = 'BVSecondaryCustomerRatings'])[1]") {
    #     insert_bottom("script") {
    #       attribute("language", "javascript")
    #       inner("if (document.getElementById('BVSecondaryCustomerRatings')) document.getElementById('BVSecondaryCustomerRatings').addEventListener('DOMSubtreeModified', mvAddRating); else mvAddRating();")
    #     }
    #   }
    
    
  # end BasicGroup
    
    
    # inject hearts container
    #Content::Formatting::MoveBefore
    #[["move_me", "h1"], ["before_me", ".bl_pdp_left"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_pdp_left ')])[1]") {
      move_here("(//h1)[1]", "before"){
        inject_after(concat("<div id='mvTitleRating'><img src='", asset("/images/waiting.gif"), "'></div>"))
      }
    }
    
    
  # end BasicGroup
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #Remove Stuff
  #  #Group::BasicGroup
  #  #[]
  #  # No need to wrap the contents at all
  #    #
  #    #Content::Formatting::RemoveElements
  #    #[["selector", ".recentlyViewed"]]
  #    $("//*[contains(concat(' ', @class, ' '), ' recentlyViewed ')]") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Formatting::RemoveElements
  #    #[["selector", ".pdp_policy_links"]]
  #    $("//*[contains(concat(' ', @class, ' '), ' pdp_policy_links ')]") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Formatting::RemoveElements
  #    #[["selector", ".pdp_email_wishlist_links"]]
  #    $("//*[contains(concat(' ', @class, ' '), ' pdp_email_wishlist_links ')]") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Formatting::RemoveElements
  #    #[["selector", "#tabcontent_preview"]]
  #    $("//*[@id = 'tabcontent_preview']") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Formatting::RemoveElements
  #    #[["selector", "#bl_pdp_left_image a"]]
  #    $("//*[@id = 'bl_pdp_left_image']//a") {
  #      remove()
  #    }
  #    
  #    
  #    #
  #    #Content::Formatting::RemoveElements
  #    #[["selector", "*[class*=\"bl_pdp_swatch_popup\"]"]]
  #    $("//*[contains(@class, \"bl_pdp_swatch_popup\")]") {
  #      remove()
  #    }
  #    
  #    
  #  # end BasicGroup
  #  
  
  
  #Remove Stuff
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveWhiteSpace
    #[["selector", "div"]]
    # NOTE: This will remove text elements that are whitespace only, but it will not remove
    # the preceding or following whitespace from elements that have some text
    $("//div/text()[normalize-space(.) = '']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".pdp_email_icon, .pdp_email_icon"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdp_email_icon ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' pdp_email_icon ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", "img"]]
    $("//img") {
      attribute("width") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".tabcontent_preview"]]
    $("//*[contains(concat(' ', @class, ' '), ' tabcontent_preview ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_zoom"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_zoom ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".pdp_member_zoom"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdp_member_zoom ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_swatch_popupMember"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatch_popupMember ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".recentlyViewed"]]
    $("//*[contains(concat(' ', @class, ' '), ' recentlyViewed ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_swatch_popup"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatch_popup ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".pdp_policy_links"], ["tag_name", "span"], ["class_name", "mvRemoveMe"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_policy_links ')])[1]") {
      wrap_text_children("span", class: 'mvRemoveMe')
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_altImages"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_altImages ')]") {
      remove()
    }
    
    
  # end BasicGroup
  
  #slideshow
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Javascript::AddScriptTag
    #[["javascript_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/imageSlideshow.js"], ["add_after", "body > script:last-of-type"]]
    # $("//body/script[position() = last()]") {
    #   insert_after("script") {
    #     at
    #     # attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/imageSlideshow.js")
    #     # attribute("language", "javascript")
    #   }
    # }
    $("/html/body") {
        # attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/imageSlideshow.js")
        # attribute("language", "javascript")
        insert_bottom("script", type: "text/javascript", src: asset("/javascript/js/imageSlideshow.js"))
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#bl_pdp_left_image"], ["class_name", ""], ["id", "moovImageHolder"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'bl_pdp_left_image'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("id", "moovImageHolder")
          move_here("//*[@id = 'bl_pdp_left_image'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#moovImageHolder"], ["class_name", ""], ["id", "mvImageOverflowWrap"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'moovImageHolder'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("id", "mvImageOverflowWrap")
          move_here("//*[@id = 'moovImageHolder'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", "#mainProductImage"]]
    $("//*[@id = 'mainProductImage']") {
      move_to("..", "before")
    }
    
    
  # end BasicGroup
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #slideshow UR
  #  #Group::BasicGroup
  #  #[]
  #  # No need to wrap the contents at all
  #    #
  #    #Content::Formatting::WrapElement
  #    #[["selector", "#bl_pdp_left_image"], ["class_name", ""], ["id", "mvImageWrap"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
  #    var("found", "false")
  #    match($found, "false") {
  #      $("(//*[@id = 'bl_pdp_left_image'])[1]") {
  #        var("found", "true")
  #        insert_before("div") {
  #          attribute("the_wrapper", "true")
  #          attribute("id", "mvImageWrap")
  #          move_here("//*[@id = 'bl_pdp_left_image'][not (@the_wrapper)]", "bottom")
  #          attribute("the_wrapper") {
  #            remove()
  #          }
  #        }
  #      }
  #    }
  #    
  #    
  #    #
  #    #Content::Formatting::AddAttribute
  #    #[["attribute", "data-ur-carousel-component"], ["value", "view_container"], ["selector", "#bl_pdp_left_image"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  #    var("done", "no")
  #    $("//*[@id = 'bl_pdp_left_image']") {
  #      match($done, "no") {
  #          var("done", "yes")
  #        attribute("data-ur-carousel-component") {
  #          value() {
  #              set("view_container")
  #          }
  #        }
  #      }
  #    }
  #    
  #    
  #    #
  #    #Content::Javascript::AddScriptTag
  #    #[["javascript_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/carousel.js"], ["add_after", "body > script:last-of-type"]]
  #    $("//body/script[position() = last()]") {
  #      insert_after("script") {
  #        attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/carousel.js")
  #        attribute("language", "javascript")
  #      }
  #    }
  #    
  #    
  #  # end BasicGroup
  #  
  #  #
  #  #Content::Formatting::MoveToBeginningOf
  #  #[["move_me", ".PDPImageDisplay"], ["to_beginning_of_me", "#bl_pdp_left_image"], ["map_multiple", ""], ["ancestor_selector", ""]]
  #  $("(//*[@id = 'bl_pdp_left_image'])[1]") {
  #    move_here("(//*[contains(concat(' ', @class, ' '), ' PDPImageDisplay ')])[1]", "top")
  #  }
  #  
  #  
  
  
  #
  #Content::Formatting::InnerRegexReplace
  #[["selector", ".swatches_available_msg"], ["regex", "AVAILABLE COLORS \\(rollover to enlarge\\):"], ["replacement", "AVAILABLE COLORS:"], ["multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' swatches_available_msg ')])[1]") {
    inner() {
      replace(/AVAILABLE COLORS \(rollover to enlarge\):/, "AVAILABLE COLORS:")
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvSwatchesContainer"], ["selector", ".pdp_longDescription_member >.bl_pdp_swatches_member"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' pdp_longDescription_member ')]/*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches_member ')]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            append(" mvSwatchesContainer")
        }
      }
      }
    }
  }
  
  
  #bonus offer
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBonusOffer"], ["selector", ".pdp_gwp_container a"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' pdp_gwp_container ')]//a") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvBonusOffer")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvBonusOffer"], ["html", " "], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvBonusOffer ')]") {
      inner(" ")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvBonusOffer"], ["before_me", "h1"], ["map_moves", ""]]
    $("(//h1)[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvBonusOffer ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".pdp_gwp_container"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdp_gwp_container ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "a.mvBonusOffer"], ["after_me", ".bl_pdp_depthpath"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_pdp_depthpath ')])[1]") {
      move_here("(//a[contains(concat(' ', @class, ' '), ' mvBonusOffer ')])[1]", "after")
    }
    
    
  # end BasicGroup
  
  #regular product page
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".pdp_pricetc_master"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//*[contains(concat(' ', @class, ' '), ' pdp_pricetc_master ')])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "productPage"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" productPage")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".pdp_sizecolor_section2"], ["before_me", ".pdp_sizecolor_section1"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section1 ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section2 ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".pdp_qty"], ["tag_name", "div"], ["class_name", "mvWrapOnlyQuantity"], ["id", ""], ["multiple", "true"]]
    #$("//body[not(contains(@class, ''))]"){
    $single_Product_Registry_item = "false"
    $("//body[contains(@class, 'productPage')]//input[@id='ADDTOREG_BUTTON']"){
      $single_Product_Registry_item = "true"
    }
     
    match($single_Product_Registry_item, "false"){
      log($single_Product_Registry_item)
      $("//*[contains(concat(' ', @class, ' '), ' pdp_qty ')]") {
        wrap("div") {
          attribute("class", "mvWrapOnlyQuantity")
        }
      }
    }

    match($single_Product_Registry_item, "true"){
      log($single_Product_Registry_item)
      $("//*[contains(concat(' ', @class, ' '), ' pdp_qty ')]") {
        add_class("mvWrapOnlyQuantity")
      }
    }
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".pdp_sizecolor_section1"], ["to_beginning_of_me", ".mvWrapOnlyQuantity"], ["map_multiple", "true"], ["ancestor_selector", ""]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvWrapOnlyQuantity ')]") {
      var("counter") {
        append("a")
      }
      attribute("id6613", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section1 ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id6613 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "top")
    }
    
    
  }
  
  
  #regular product page
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "select.pdp_dropdown_qty"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//select[contains(concat(' ', @class, ' '), ' pdp_dropdown_qty ')])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvNoQTY"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvNoQTY")
          }
        }
      }
    }
    
    
  }
  
  
  #product page with no size selector or color swatch
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "select.pdp_size_dropdown, .pdp_size_noColor"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//select[contains(concat(' ', @class, ' '), ' pdp_size_dropdown ')])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvNoSizeSelect"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvNoSizeSelect")
          }
        }
      }
    }
    
    
    #and no color selector
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".pdp_color_swatch"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_color_swatch ')])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvNoColorOrSizeSelect"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvNoColorOrSizeSelect")
            }
          }
        }
      }
      
      
    }
    
    
  }
  
  
  #product master
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".pdp_pricetc_master"], ["negate", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' pdp_pricetc_master ')])[1]") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "src"], ["value", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/js/addToRegistry.js"], ["selector", "script[src*=\"addToRegistry.js\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    $("//script[contains(@src, \"addToRegistry.js\")]/@src") {
      $asset = concat(asset("javascript/js/addToRegistry.js"), "")
      text(){
        set($asset)
      }
    }
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMasterProduct"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvMasterProduct")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".pdp_pricetc_master"], ["tag_name", "div"], ["class_name", "mvProductWrap"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdp_pricetc_master ')]") {
      wrap("div") {
        attribute("class", "mvProductWrap")
      }
    }
    
    
    #if its missing a size select
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "select.size"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//select[contains(concat(' ', @class, ' '), ' size ')])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".pdp_qty_masterRight, .pdp_qty_master"], ["tag_name", "div"], ["class_name", "mvWrapOnlyQuantity"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' pdp_qty_masterRight ')]") {
        wrap("div") {
          attribute("class", "mvWrapOnlyQuantity")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' pdp_qty_master ')]") {
        wrap("div") {
          attribute("class", "mvWrapOnlyQuantity")
        }
      }
      
      
    }
    
    
    #see all info block
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".pdp_longDescription_member_minimize"], ["to_beginning_of_me", ".pdp_longDescription_member_minimize + .pdp_member_description"], ["map_multiple", "true"], ["ancestor_selector", ""]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_longDescription_member_minimize ')]/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' pdp_member_description ')]") {
        var("counter") {
          append("a")
        }
        attribute("id9542", $counter)
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_longDescription_member_minimize ')]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id9542 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "top")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "[id*=\"seeAllInfoMember\"]"], ["after_me", ".pdp_sizecolor_section1"], ["map_multiple", "true"]]
      $("//*[contains(@id, 'seeAllInfoMember')]") {
        move_to("../div[contains(id, 'AvailMsgDisplay')]", "before")
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "[id*=\"seeAllInfoMember\"] a"], ["html", "<span>product detail page</span>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(@id, \"seeAllInfoMember\")]//a") {
        inner("<span>product detail page</span>")
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", "div[id*=\"seeAllInfoMember\"]"], ["before_me", ".pdp_avail_msg"], ["map_moves", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_avail_msg ')]") {
        var("counter") {
          append("a")
        }
        attribute("id1651", $counter)
      }
      var("counter", "a")
      $("//div[contains(@id, \"seeAllInfoMember\")]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id1651 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "before")
      }
      
      
    # end BasicGroup
    
    #moveSelectors Into Position
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", ".pdp_size_chart"], ["to_end_of_me", ".pdp_size_master"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_size_master ')]") {
        var("counter") {
          append("a")
        }
        attribute("id5179", $counter)
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_size_chart ')]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id5179 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "bottom")
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", ".pdp_sizecolor_section2_master"], ["before_me", ".pdp_sizecolor_section1"], ["map_moves", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section1 ')]") {
        var("counter") {
          append("a")
        }
        attribute("id9069", $counter)
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section2_master ')]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id9069 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "before")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".pdp_sizecolor_section1"], ["to_beginning_of_me", ".mvWrapOnlyQuantity"], ["map_multiple", "true"], ["ancestor_selector", ".pdp_pricetc_master"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdp_pricetc_master ')]") {
      $("(.//*[contains(concat(' ', @class, ' '), ' mvWrapOnlyQuantity ')])[1]") {
        move_here("(.//*[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section1 ')])[1]", "top")
      }
    }
    
    $("//div[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section2_master ')]") {
      $("..//div[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section1 ')]") {
        add_class("mw_size_replace")
        move_to("../div[@class='mvWrapOnlyQuantity']", "top")
      }
      #$("..//div[contains(concat(' ', @class, ' '), ' mvWrapOnlyQuantity ' )]") {
      #  #add_class("mw_no_border_img")
      #  #insert_top("div", class: "mw_size_color_opts") {
      #  #  move_here("../../div[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section2_master ')]", "top")
      #  #  move_here("../../div[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section1 ')]", "top")
      #  #}
      #}
    }
    
    
    #product headers
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".pdp_product_txt"], ["wrapper_class", "mvProductTitle"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' pdp_product_txt ')]") {
        var("moved", fetch("./@moved"))
        match($moved, not("true")) {
          wrap("div") {
            attribute("class", "mvProductTitle")
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
          }
        }
        attribute("moved") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvProductTitle"], ["tag_name", "div"], ["class_name", "mvBloomMenuHeader mvProductMasterHeaderWrap"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvProductTitle ')]") {
        wrap("div") {
          attribute("class", "mvBloomMenuHeader mvProductMasterHeaderWrap")
        }
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".pdp_member_img img"], ["to_beginning_of_me", ".mvProductTitle"], ["map_multiple", "true"], ["ancestor_selector", ".mvProductWrap"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvProductWrap ')]") {
        $("(.//*[contains(concat(' ', @class, ' '), ' mvProductTitle ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_member_img ')]//img)[1]", "top")
        }
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".mvProductMasterHeaderWrap"], ["to_beginning_of_me", ".mvProductWrap"], ["map_multiple", "true"], ["ancestor_selector", ""]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvProductWrap ')]") {
        var("counter") {
          append("a")
        }
        attribute("id4682", $counter)
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvProductMasterHeaderWrap ')]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id4682 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "top")
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvProductTitle > img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvProductTitle ')]/img") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvBloomMenuHeader"], ["content_selector", ".pdp_pricetc_master"], ["ancestor_selector", ".mvProductWrap"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvProductWrap ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' pdp_pricetc_master ')]") {
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
                append("47737")
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
        $(".//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]") {
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
                append("47737")
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
    
    #size selectors
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveWhiteSpace
      #[["selector", ".bl_pdp_item"]]
      # NOTE: This will remove text elements that are whitespace only, but it will not remove
      # the preceding or following whitespace from elements that have some text
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_item ')]/text()[normalize-space(.) = '']") {
        remove()
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".bl_pdp_item label"], ["tag_name", "div"], ["class_name", "mvSizeSelector"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_item ')]//label") {
        wrap("div") {
          attribute("class", "mvSizeSelector")
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", ".bl_pdp_item input"], ["duplicate_target", ".mvSizeSelector"], ["attribute", "onclick"], ["multiple", "true"], ["ancestor", ""]]
      var("counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_item ')]//input") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@onclick"))
      }
      var("counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvSizeSelector ')]") {
        var("counter") {
          append("a")
        }
        attribute("onclick", var($counter))
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".bl_pdp_item input"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_item ')]//input") {
        remove()
      }
      
      
    # end BasicGroup
    
    #swatches title
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "moovSwatchesContainer"], ["selector", ".bl_pdp_swatches_member"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches_member ')]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                append(" moovSwatchesContainer")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".moovSwatchesContainer"]]
      $("//*[contains(concat(' ', @class, ' '), ' moovSwatchesContainer ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvSwatchesTitle\">available colors</div>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".moovSwatchesContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' moovSwatchesContainer ')]") {
        inject_before("<div class=\"mvSwatchesTitle\">available colors</div>")
      }
      
      
    # end BasicGroup
    
  }
  
  
  #addToBagButton
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #add to brown bag
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#ADDTOBAG_BUTTON[name=\"ADDTOBAG_BUTTON\"]"], ["negate", ""]]
    $("(//*[@id = 'ADDTOBAG_BUTTON' and @name = \"ADDTOBAG_BUTTON\"])[1]") {
      $("//*[@id = 'ADDTOBAG_BUTTON']") {
          attribute("value", "Add To Brown Bag")
          add_class("mvButton mvAddToBrownBag")
      }
    }
    
    
    #update brown bag
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#ADDTOBAG_BUTTON[name=\"UPDATEBAG_BUTTON\"]"], ["negate", ""]]
    $("(//*[@id = 'ADDTOBAG_BUTTON' and @name = \"UPDATEBAG_BUTTON\"])[1]") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvUpdateBag"], ["selector", "#ADDTOBAG_BUTTON"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'ADDTOBAG_BUTTON']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvUpdateBag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "update my brown bag"], ["selector", "#ADDTOBAG_BUTTON"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'ADDTOBAG_BUTTON']") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("update my brown bag")
            }
          }
        }
      }
      
      
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvBloomBagImage\"></div><div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#ADDTOBAG_BUTTON"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'ADDTOBAG_BUTTON'])[1]") {
      inject_before("<div class=\"mvBloomBagImage\"></div><div></div>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "#ADDTOBAG_BUTTON"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'ADDTOBAG_BUTTON']") {
      match($done, "no") {
        var("done", "yes")
        $type = fetch("./@type")
        match($type) {
          with(not(/submit/)) {
            attribute("type") {
              value() {
                  set("button")
              }
            }            
          }
        }
      }
    }
    
    
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#ADDANOTHERTOBAG_BUTTON"], ["negate", ""]]
    $("(//*[@id = 'ADDANOTHERTOBAG_BUTTON'])[1]") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#ADDANOTHERTOBAG_BUTTON"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'ADDANOTHERTOBAG_BUTTON']") {
        match($done, "no") {
            var("done", "yes")
          attribute("type") {
            value() {
                set("submit")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvAddAnother"], ["selector", "#ADDANOTHERTOBAG_BUTTON"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'ADDANOTHERTOBAG_BUTTON']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvAddAnother")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "add another to brown bag"], ["selector", "#ADDANOTHERTOBAG_BUTTON"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'ADDANOTHERTOBAG_BUTTON']") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("add another to brown bag")
            }
          }
        }
      }
      
      
    }
    
    
  # end BasicGroup
  
  #add to registry button
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#ADDTOREG_BUTTON"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[@id = 'ADDTOREG_BUTTON'])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvNoRegistryPage"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvNoRegistryPage")
            }
          }
        }
      }
      
      
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRegisteryPage"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "#ADDTOREG_BUTTON"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("conditional", "false")
            $("//*[@id = 'ADDTOREG_BUTTON']") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvRegisteryPage")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "#ADDTOREG_BUTTON"], ["after_me", "#ADDTOBAG_BUTTON"], ["map_multiple", ""]]
    $("(//*[@id = 'ADDTOBAG_BUTTON'])[1]") {
      move_here("(//*[@id = 'ADDTOREG_BUTTON'])[1]", "after")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGreyButton mvRegistryButton"], ["selector", "#ADDTOREG_BUTTON"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'ADDTOREG_BUTTON']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvGreyButton mvRegistryButton")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "add to"], ["selector", "#ADDTOREG_BUTTON"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'ADDTOREG_BUTTON']") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("add to")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", "#ADDTOREG_BUTTON"], ["to_end_of_me", ".pdp_add_to_bag"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_add_to_bag ')])[1]") {
      move_here("(//*[@id = 'ADDTOREG_BUTTON'])[1]", "bottom")
    }
    
    
  # end BasicGroup
  
  #clickToCall Button
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #product master
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".pdp_phone_order_master"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_phone_order_master ')])[1]") {
    
      #clickToCall Ordering
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".pdp_phone_info"], ["after_me", ".mvPhoneOrder"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvPhoneOrder ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_phone_info ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::ReplaceTag
        #[["selector", ".pdp_member_img a"], ["new_tag_name", "div"], ["class_name", "mvProductMasterThumb"]]
        $("//*[contains(concat(' ', @class, ' '), ' pdp_member_img ')]//a") {
          name("div")
          attribute("class", "mvProductMasterThumb")
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".pdp_phone_order_master"], ["after_me", ".bl_pdp_right"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' bl_pdp_right ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_phone_order_master ')])[1]", "after")
        }
        
        
      # end BasicGroup
      
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "div.pdp_phone_order_master > img"], ["new_tag_name", "input"], ["class_name", "mvButton mvClickToCall"]]
    $("//div[contains(concat(' ', @class, ' '), ' pdp_phone_order_master ')]/img") {
      name("input")
      attribute("class", "mvButton mvClickToCall")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "click to call"], ["selector", ".mvClickToCall"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvClickToCall ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("click to call")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "button"], ["selector", ".mvClickToCall"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvClickToCall ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("type") {
          value() {
              set("button")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", ".pdp_phone_order img"], ["new_tag_name", "a"], ["class_name", "mvButton mvClickToCall"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdp_phone_order ')]//img") {
      name("a")
      attribute("class", "mvButton mvClickToCall")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvClickToCall"], ["html", "click to call"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvClickToCall ')]") {
      inner("click to call")
    }
    
    
  # end BasicGroup
  
  #reviews
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvReviewsHeader mvBloomMenuHeader\"><span>read &amp; write reviews</span><span id=\"mvRaiting\"><img src=\"http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/waiting.gif\"></span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#BVReviewsContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'BVReviewsContainer'])[1]") {
      $myAsset = concat("<div class=\"mvReviewsHeader mvBloomMenuHeader\"><span>read &amp; write reviews</span><span class=\"mw_float_heart\"><span id=\"mvRaiting\"><img src=\"", asset("/images/waiting.gif"), "\"></span><span id=\"mw_review_number\"></span></span></div>")
      inject_before($myAsset)
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#BVReviewsContainer"], ["class_name", ""], ["id", "mvBazaarWrap"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'BVReviewsContainer'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("id", "mvBazaarWrap")
          move_here("//*[@id = 'BVReviewsContainer'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".mvReviewsHeader"], ["content_selector", ".mvReviewsHeader + #mvBazaarWrap"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' mvReviewsHeader ')]/following-sibling::*[1]/self::*[@id = 'mvBazaarWrap']") {
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
            append("91075")
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
    $("//*[contains(concat(' ', @class, ' '), ' mvReviewsHeader ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("91075")
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
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvBazaarvoiceID"], ["selector", ".bizaar_ratingClickableImg"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bizaar_ratingClickableImg ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvBazaarvoiceID")
          }
        }
      }
    }
    
    # passes through bazaar voices redirect link
    $("//div[@id = 'BVContainerPageURL']"){
      text(){
        rewrite("link")
      }
    }
    
  # end BasicGroup
  
  #share Accordion
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapElement
    #[["selector", ".pdp_email_copy"], ["class_name", "mvShareWrap"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @id, ' '), ' bl_pdp_main ')])[1]/div[contains(@class,'pdp_container')]") {
        var("found", "true")
        insert_bottom("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvShareWrap")
          move_here("//*[contains(concat(' ', @class, ' '), ' pdp_email_copy ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".pdp_email_copy"], ["class_name", "mvShareAccordianContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mvShareWrap ')])[1]") {
        var("found", "true")
        insert_bottom("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvShareAccordianContent")
          move_here("//*[contains(concat(' ', @class, ' '), ' pdp_email_copy ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvShareWrap"], ["html", "<div class=\"mvShareHeader\"><span class=\"mvBloomMenuHeader \"><span>Share</span></span></div>"], ["prepend", "true"], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvShareWrap ')]") {
      inner() {
        prepend("<div class=\"mvShareHeader\"><span class=\"mvBloomMenuHeader \"><span>Share</span></span></div>")
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".mvShareWrap .mvBloomMenuHeader"], ["content_selector", ".mvShareAccordianContent"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' mvShareAccordianContent ')]") {
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
            append("29122")
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
    $("//*[contains(concat(' ', @class, ' '), ' mvShareWrap ')]//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("29122")
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
    
    
    # #
    # #Content::Inject::InjectHTML
    # #[["html", "<div id=\"mvFBShare\"><a><img src=\"http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/waiting.gif\"></a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvShareAccordianContent .pdp_email_copy"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    # $("(//*[contains(concat(' ', @class, ' '), ' mvShareAccordianContent ')]//*[contains(concat(' ', @class, ' '), ' pdp_email_copy ')])[1]") {
    #   inject_before("<div id=\"mvFBShare\"><div class=\"mw_loading_spinner\"><img src=\"http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/waiting.gif\"></div></div>")
    # }
    # 
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".pdp_email_wishlist_links"], ["after_me", ".bizaar_ratingNoClickableImg"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bizaar_ratingNoClickableImg ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_email_wishlist_links ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".pdp_emailLink_container"], ["after_me", ".bizaar_ratingClickableImg"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bizaar_ratingClickableImg ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_emailLink_container ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "//a[text()=\"ADD TO WISHLIST\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[text()=\"ADD TO WISHLIST\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvRemoveMe")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvShareAccordianContent  .pdp_service_link"], ["html", "<div></div><span>email a friend</span>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvShareAccordianContent ')]//*[contains(concat(' ', @class, ' '), ' pdp_service_link ')]") {
      inner("<div></div><span>email a friend<div class='to_be_sprited-rightArrow'></div></span>")
    }
    
    
  # end BasicGroup
  
  #move and fix price
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".bl_pdp_productInfo"], ["after_me", ".mvWrapOnlyQuantity"], ["map_multiple", "true"]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvWrapOnlyQuantity ')]") {
      var("counter") {
        append("a")
      }
      attribute("id4191", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_productInfo ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id4191 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "after")
      $("//body"){
        add_class("mw_single_product_registry")
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".pdp_member_area script:first-of-type"], ["after_me", ".pdp_descriptionAndPrice"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_descriptionAndPrice ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_member_area ')]//script[position() = 1])[1]", "after")
    }
    
    
  # end BasicGroup
  
  #move bed size indicator to top
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".pdp_master_description .invisible"], ["before_me", ".pdp_product_list_container"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_product_list_container ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_master_description ')]//*[contains(concat(' ', @class, ' '), ' invisible ')])[1]", "before")
    }
    
    
  # end BasicGroup
  
  #passthrough Email Link
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all# end BasicGroup
  
  #more details link
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all# end BasicGroup
  
  #no registry found overlay
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "#createRegistryButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'createRegistryButton']") {
      match($done, "no") {
          var("done", "yes")
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGreyButton mvAccessRegistry"], ["selector", "#createRegistryButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'createRegistryButton']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvGreyButton mvAccessRegistry")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "create registry"], ["selector", "#createRegistryButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'createRegistryButton']") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("create registry")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "#accessRegistryButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'accessRegistryButton']") {
      match($done, "no") {
          var("done", "yes")
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGreyButton mvAccessRegistry"], ["selector", "#accessRegistryButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'accessRegistryButton']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvGreyButton mvAccessRegistry")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #productDetails show/hide
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapWithNextSibling
    #[["selector", ".pdp_longDescription"], ["wrapper_class", "mvProductInfoWrap"], ["sibling_count", "1"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdp_longDescription ')]") {
      var("moved", fetch("./@moved"))
      match($moved, not("true")) {
        wrap("div") {
          attribute("class", "mvProductInfoWrap")
          move_here("(following-sibling::*)[1]", "bottom") {
            attribute("moved", "true")
          }
        }
      }
      attribute("moved") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".pdp_master_description"], ["before_me", ".bizaar_ratingNoClickableImg"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bizaar_ratingNoClickableImg ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' pdp_master_description ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvProductInfoWrap"], ["before_me", ".bizaar_ratingNoClickableImg"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bizaar_ratingNoClickableImg ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvProductInfoWrap ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvProductInfoWrap"], ["before_me", ".bizaar_ratingClickableImg"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bizaar_ratingClickableImg ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvProductInfoWrap ')])[1]", "before")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvBloomMenuProductInfo\">product details</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".pdp_longDescription"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_longDescription ')])[1]") {
      inject_before("<div class=\"mvBloomMenuProductInfo\">product details</div>")
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".mvProductInfoWrap .pdp_longDescription"], ["regex", "^(\\s)+"], ["replacement", " "], ["multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductInfoWrap ')]//*[contains(concat(' ', @class, ' '), ' pdp_longDescription ')])[1]") {
      inner() {
        replace(/^(\s)+/, " ")
      }
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".bl_pdp_productInfo .pdp_longDescription"], ["regex", "^(\\s+)"], ["replacement", ""], ["multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_pdp_productInfo ')]//*[contains(concat(' ', @class, ' '), ' pdp_longDescription ')])[1]") {
      inner() {
        replace(/^(\s+)/, "")
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvLongDescription"], ["selector", ".pdp_longDescription"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' pdp_longDescription ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvLongDescription")
          }
        }
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvToggleEvent\"><span class=\"mvMoreToggle\">More</span><span class=\"mvLessToggle\">Less</span></div>"], ["add_after", "#mvLongDescription"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'mvLongDescription'])[1][following-sibling::*]") {
      inject_after("<div class=\"mvToggleEvent\" data-ur-state=\"disabled\" data-ur-toggler-component=\"button\" data-ur-id=\"mv-discription-toggler\"><span class=\"mvMoreToggle\">More</span><span class=\"mvLessToggle\">Less</span></div>")
    }
    
    
    $("//div[@id='mvLongDescription']") {
      #rewrite product description to prevent running into br's or p tags
        $("./text()[1]") {
          insert_after("div")
          $("following-sibling::div"){
            add_class("mv_extraText")
            move_here("following-sibling::* | following-sibling::text()", "bottom")
          }
          wrap("div")
          $(".//br[1]/following-sibling::br[1]") {
            remove()
          }
        }
    }
    
    #add uranium toggler classes to the product info wrap, this fixes the toggle block
    $("//html/body/div[@id='bl_main_container']/div/div/div[contains(@class, 'bl_main')]/div/div/div[contains(@class, 'mvProductInfoWrap')]"){
      attribute('data-ur-toggler-component', 'content')
      attribute('data-ur-id', 'mv-discription-toggler')
      attribute('data-ur-state', 'disabled')
    }
    
    #
    #Content::Formatting::Dynamic::ToggleClassOnEvent
    #[["target", ".mvProductInfoWrap"], ["trigger", ".mvToggleEvent"], ["toggle_class", "mvDisplayMore"], ["trigger_event", "click"]]
    # --- not found ---
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", "#AvailMsgDisplay"], ["after_me", ".pdp_descriptionAndPrice"], ["map_multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' pdp_descriptionAndPrice ')])[1]") {
    move_here("(//*[@id = 'AvailMsgDisplay'])[1]", "after")
  }
  
  
  #bag overlay
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".pdp_atb_buttons img"], ["tag_name", "div"], ["class_name", "mvGreyButton mvContinuShopping"], ["id", ""], ["multiple", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' pdp_atb_buttons ')]//img") {
        wrap("div") {
          attribute("class", "mvGreyButton mvContinuShopping")
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", ".pdp_atb_buttons img"], ["duplicate_target", ".mvContinuShopping"], ["attribute", "onmousedown"], ["multiple", ""], ["ancestor", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' pdp_atb_buttons ')]//img)[1]") {
        var("duplicate_attribute", fetch("./@onmousedown"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvContinuShopping ')])[1]") {
          attribute("onmousedown", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvGreyButton"], ["html", "Continue Shopping"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvGreyButton ')]") {
        inner("Continue Shopping")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", ".pdp_atb_buttons a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' pdp_atb_buttons ')]//a") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".pdp_atb_buttons a"], ["html", "Checkout"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' pdp_atb_buttons ')]//a") {
        inner("Checkout")
      }
      
      
    # end BasicGroup
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Javascript::AddInlineScriptTag
    #  #[["script", "\t function mvScroll(){ \t var scrollElement = document.getElementById('atbOverlay_c'); \t  \t if(scrollElement === null ){ \t \t\treturn 1; \t }else{ \t \tscrollElement.style.webkitTransform = 'translate3d(0px, ' + document.body.scrollTop +'px, 0px)';   \t } }  window.addEventListener(\"scroll\", mvScroll, false); "], ["add_after", ""], ["add_before", ""]]
    #    $("html/body") {
    #      insert_bottom("script") {
    #        attribute("language", "javascript")
    #        inner("   function mvScroll(){    var scrollElement = document.getElementById('atbOverlay_c');        if(scrollElement === null ){       return 1;    }else{     scrollElement.style.webkitTransform = 'translate3d(0px, ' + document.body.scrollTop +'px, 0px)';     } }  window.addEventListener(\"scroll\", mvScroll, false); ")
    #      }
    #    }
    #  
    #  
    
    
  # end BasicGroup
  
  #registry overlay
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "#viewRegistry"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'viewRegistry']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvButton")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "#viewRegistry"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'viewRegistry']") {
      match($done, "no") {
          var("done", "yes")
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGreyButton"], ["selector", "#continueShopping"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'continueShopping']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvGreyButton")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "view registry"], ["selector", "#viewRegistry"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'viewRegistry']") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("view registry")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "button"], ["selector", "#continueShopping"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'continueShopping']") {
      match($done, "no") {
          var("done", "yes")
        attribute("type") {
          value() {
              set("button")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "continue shopping"], ["selector", "#continueShopping"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'continueShopping']") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("continue shopping")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvPhoneOrder"], ["selector", "//div/div[contains(@class, \"pdp_phone_order\")]/.."], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//div/div[contains(@class, \"pdp_phone_order\")]/..") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvPhoneOrder")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "a[href*=\"/video/\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//a[contains(@href, \"/video/\")]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            append(" mvRemoveMe")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "[href*=\"customerservice/denimfitguide\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(@href, \"customerservice/denimfitguide\")]") {
    match($done, "no") {
      $("..") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mvRemoveMe")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvPDPBR"], ["selector", "//span[@class = \"pdp_atb_item_spacing\"][text() = \"|\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//span[@class = \"pdp_atb_item_spacing\"][text() = \"|\"]") {
    match($done, "no") {
      attribute("class") {
        value() {
            set("mvPDPBR")
        }
      }
    }
  }
  
  
  #price text
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#coach_headerContainer"], ["negate", ""]]
    $("(//*[@id = 'coach_headerContainer'])[1]") {
    
      #price display
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvCoachPriceDisplay"], ["selector", ".coach_bl_pdp_container #PriceDisplay"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' coach_bl_pdp_container ')]//*[@id = 'PriceDisplay']") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvCoachPriceDisplay")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "#PriceDisplay"], ["html", "<span class=\"mvPriceTextWrap\">PRICE:</span>"], ["prepend", "true"], ["append", ""]]
        $("//*[@id = 'PriceDisplay']") {
          inner() {
            prepend("<span class=\"mvPriceTextWrap\">PRICE:</span>")
          }
        }
        
        
      # end BasicGroup
      
    }
    
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Inject::InjectHTML
    #  #[["html", "<span class=\"mvPriceTextWrap\">price: </span>"], ["add_after", ""], ["multiple", ""], ["add_before", ".pdp_descriptionAndPrice"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    #  $("(//*[contains(concat(' ', @class, ' '), ' pdp_descriptionAndPrice ')])[1]") {
    #    inject_before("<span class=\"mvPriceTextWrap\">price: </span>")
    #  }
    #  
    #  
    
    
  # end BasicGroup
  
  #swatches
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_swatches > .clearBoth"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches ')]/*[contains(concat(' ', @class, ' '), ' clearBoth ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_swatches_member > .clearBoth"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches_member ')]/*[contains(concat(' ', @class, ' '), ' clearBoth ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_swatches > script"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches ')]/script") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_pdp_swatches_member > script"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches_member ')]/script") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvContainsColorSelect"], ["selector", "/html/body[contains(@class, \"mvMasterProduct\")]//select[contains(@id, \"color\")]/../../../.."], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("/html/body[contains(@class, \"mvMasterProduct\")]//select[contains(@id, \"color\")]/../../../..") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvContainsColorSelect")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvContainsMultipleSwatches"], ["selector", "/html/body[contains(@class, \"mvMasterProduct\")]//div[contains(@class, \"bl_pdp_swatch_member\")][2]/../../../.."], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("/html/body[contains(@class, \"mvMasterProduct\")]//div[contains(@class, \"bl_pdp_swatch_member\")][2]/../../../..") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvContainsMultipleSwatches")
          }
        }
      }
    }
    
    
    #Carousel Wrapping
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".bl_pdp_swatches, .mvContainsColorSelect.mvContainsMultipleSwatches .bl_pdp_swatches_member"], ["tag_name", ""], ["class_name", "mvCarouselContainer"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches ')]") {
        wrap("div") {
          attribute("class", "mvCarouselContainer")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvContainsColorSelect ') and contains(concat(' ', @class, ' '), ' mvContainsMultipleSwatches ')]//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches_member ')]") {
        wrap("div") {
          attribute("class", "mvCarouselContainer")
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".bl_pdp_swatches div[class^=\"bl_pdp_swatch\"], .bl_pdp_swatch_member"], ["wrapper_class", "mvSwatchWrap"], ["sibling_count", "19"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches ')]//div[starts-with(@class, \"bl_pdp_swatch\")]") {
        var("moved", fetch("./@moved"))
        match($moved, not("true")) {
          wrap("div") {
            attribute("class", "mvSwatchWrap")
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
          }
        }
        attribute("moved") {
          remove()
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatch_member ')]") {
        var("moved", fetch("./@moved"))
        match($moved, not("true")) {
          wrap("div") {
            attribute("class", "mvSwatchWrap")
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
            move_here("(following-sibling::*)[1]", "bottom") {
              attribute("moved", "true")
            }
          }
        }
        attribute("moved") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvSwatchWrap"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvSwatchWrap ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvSwatchWrap"], ["selector", ".bl_pdp_swatches_member, .bl_pdp_swatches"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches_member ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvSwatchWrap")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_swatches ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvSwatchWrap")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvCarouselContainer"], ["tag_name", "div"], ["class_name", "mvProductCarousel"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvCarouselContainer ')]") {
        wrap("div") {
          attribute("class", "mvProductCarousel")
        }
      }
      
      
    # end BasicGroup
    
    #add Carousel Attributes
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-carousel-component"], ["value", "scroll_container"], ["selector", ".mvCarouselContainer"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvCarouselContainer ')]") {
        match($done, "no") {
          attribute("data-ur-carousel-component") {
            value() {
                set("scroll_container")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-carousel-component"], ["value", "item"], ["selector", ".mvSwatchWrap"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvSwatchWrap ')]") {
        match($done, "no") {
          attribute("data-ur-carousel-component") {
            value() {
                set("item")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-carousel-component"], ["value", "view_container"], ["selector", ".mvProductCarousel"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvProductCarousel ')]") {
        match($done, "no") {
          attribute("data-ur-carousel-component") {
            value() {
                set("view_container")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-touch"], ["value", "disabled"], ["selector", ".mvProductCarousel"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvProductCarousel ')]") {
        match($done, "no") {
          attribute("data-ur-touch") {
            value() {
                set("disabled")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-state"], ["value", "enabled"], ["selector", ".mvProductCarousel"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvProductCarousel ')]") {
        match($done, "no") {
          attribute("data-ur-state") {
            value() {
                set("enabled")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-set"], ["value", "carousel"], ["selector", ".mvProductCarousel"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvProductCarousel ')]") {
        match($done, "no") {
          attribute("data-ur-set") {
            value() {
                set("carousel")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".mvCarouselContainer"], ["tag_name", "div"], ["class_name", "mvCarouselWrap"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCarouselContainer ')]") {
      wrap("div") {
        attribute("class", "mvCarouselWrap")
      }
    }
    
    #removes empty divs in swatch carousel
     $("//div[contains(@class, 'mvCarouselContainer')]/div[not(node())]"){
       remove()
     }
    
    #add Carousel Buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div data-ur-carousel-component=\"button\" data-ur-carousel-button-type=\"prev\" data-ur-state=\"disabled\"></div>         <div data-ur-carousel-component=\"button\" data-ur-carousel-button-type=\"next\" data-ur-state=\"disabled\"></div>"], ["add_after", ""], ["multiple", "true"], ["add_before", "//div[@class= \"mvCarouselContainer\"]/div[2]/../.."], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//div[@class= 'mvCarouselContainer']/div[2]/../..") {
        inject_top("<div class='mw_next' id='next' data-mwSlide=\"button\"></div><div class='mw_prev' id='prev' data-mwSlide=\"button\"></div>")
      }
      
      
    # end BasicGroup
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", "#BVCustomerRatings"], ["to_beginning_of_me", "#mvBazaarWrap"], ["map_multiple", ""], ["ancestor_selector", ""]]
  $("(//*[@id = 'mvBazaarWrap'])[1]") {
    move_here("(//*[@id = 'BVCustomerRatings'])[1]", "top")
  }
  
  
  #
  #Content::Formatting::MoveUp
  #[["move_me", ".pdp_service_link"]]
  $("//*[contains(concat(' ', @class, ' '), ' pdp_service_link ')]") {
    move_to("..", "before")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvLinkHeader"], ["selector", "#mvBDBloomiesLink"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'mvBDBloomiesLink']") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvLinkHeader")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "li a[href*=\".pdf\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//li//a[contains(@href, \".pdf\")]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvRemoveMe")
        }
      }
      }
    }
  }
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class=\"mvClearBoth\"></div>"], ["add_after", ".mvMasterProduct .mvProductWrap .mvBloomMenuHeader > *:last-of-type"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvMasterProduct ')]//*[contains(concat(' ', @class, ' '), ' mvProductWrap ')]//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]/*[position() = last()]") {
    inject_after("<div class=\"mvClearBoth\"></div>")
  }
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", "#bl_pdp_left_image a"], ["new_tag_name", "div"], ["class_name", ""]]
  $("//*[@id = 'bl_pdp_left_image']//a") {
    name("div")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "a[href*=\"mattress-buying-guide.jsp\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//a[contains(@href, \"mattress-buying-guide.jsp\")]") {
    match($done, "no") {
      $("..") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvRemoveMe")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "li > a[href*=\"mens_denimfitguide.jsp\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//li/a[contains(@href, \"mens_denimfitguide.jsp\")]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            append(" mvRemoveMe")
        }
      }
      }
    }
  }
  
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#coach_headerContainer"], ["negate", ""]]
  $("(//*[@id = 'coach_headerContainer'])[1]") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#mvTitleRating"]]
    $("//*[@id = 'mvTitleRating']") {
      remove()
    }
    
    
  }
  
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#coach_pdp_size select"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//*[@id = 'coach_pdp_size']//select)[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvNoBorder"], ["selector", "#coach_pdp_color"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'coach_pdp_color']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvNoBorder")
          }
        }
      }
    }
    
    
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "style"], ["value", "overflow: hidden"], ["selector", ".mvCarouselContainer"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' mvCarouselContainer ')]") {
    match($done, "no") {
      attribute("style") {
        value() {
            set("overflow: hidden")
        }
      }
    }
  }
  
  
  #Ant Blocks
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "/*window.addEventListener(\"DOMNodeInserted\", function(e) { var node = e.target; console.log(node);  }, false);*/window.addEventListener(\"load\", function() { var d = document.getElementById(\"atbOverlay\"); if(d) { console.log(\"overlay: \" + d); d.getElementsByClassName(\"container-close\")[0].innerHTML = \"X\";} }, false);"], ["add_after", ""], ["add_before", ""]]
      # $("html/body") {
      #   insert_bottom("script") {
      #     #attribute("language", "javascript")
      #     #inner("/*window.addEventListener(\"DOMNodeInserted\", function(e) { var node = e.target; console.log(node);  }, false);*/window.addEventListener(\"load\", function() { var d = document.getElementById(\"atbOverlay\"); if(d) { console.log(\"overlay: \" + d); d.getElementsByClassName(\"container-close\")[0].innerHTML = \"X\";} }, false);")
      #   }
      # }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "mw_what"], ["value", "true"], ["selector", "script[src*=\"bazaarvoice.js\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//script[contains(@src, \"bazaarvoice.js\")]") {
      match($done, "no") {
          var("done", "yes")
        attribute("mw_what") {
          value() {
              set("true")
          }
        }
      }
    }
    
    
    # #
    # #Content::Passthrough::Attribute
    # #[["selector", "script[src*=\"bazaarvoice.js\"]"], ["attribute", "src"], ["regex_capture", ""]]
    # $("//script[contains(@src, \"bazaarvoice.js\")]") {
    #   attribute("src") {
    #     value() {
    #       rewrite("link")
    #     }
    #   }
    # }
    # 
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", ".mvPriceTextWrap"], ["to_beginning_of_me", ".pdp_descriptionAndPrice"], ["map_multiple", ""], ["ancestor_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' pdp_descriptionAndPrice ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mvPriceTextWrap ')])[1]", "top")
  }
  
  
  #when its a single product page that is also a click to call page, fix the color placement
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBothBorders"], ["selector", "body.mvNoSizeSelect .pdp_sizecolor_section2_bothBorders"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".productPage.mvNoQTY"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body[contains(concat(' ', @class, ' '), ' mvNoSizeSelect ')]//*[contains(concat(' ', @class, ' '), ' pdp_sizecolor_section2_bothBorders ')]") {
      match($done, "no") {
          var("conditional", "false")
            $("//*[contains(concat(' ', @class, ' '), ' productPage ') and contains(concat(' ', @class, ' '), ' mvNoQTY ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvBothBorders")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvBothBorders"], ["before_me", ".pdp_descriptionAndPrice"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdp_descriptionAndPrice ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvBothBorders ')])[1]", "before")
    }

    # #fix checkout confirmation register button text
    $("//html/body[contains(@class, 'productPage')]//div[contains(@class, 'finditinstore')]/img"){
      name('input')
      attribute("value"){
        value() {
          set("Find It In Store")
        }
      }
      attribute("type"){
        value() {
          set("button")
        }
      }
      add_class("mvGreyButton")
    }

    # remove price so that i can add it in consistantly.
    $("//script"){
      text(){
        replace(/PRICE:\s/, "")
      }
    }
    $("//div[@id ='PriceDisplay']"){
      inject_before("<span class='mw_price_text'>PRICE:</span>")
    }

  # end BasicGroup
  match($single_Product_Registry_item, "true"){
    $("//*[contains(concat(' ', @class, ' '), ' mvWrapOnlyQuantity ')]") {
      inject_before("<div class='mw_dots'></div>")
      inject_after("<div class='mw_dots'></div>")
    }
  }
  #add class to body so that the css can be added to main. css
  $("//html/body"){
   add_class("mvProductContainer") 
  }

  $("//div[@id='coach_pdp_color_size']"){
    insert_bottom("div", class: "mw_dotted_break")
  }
  $("//body[contains(@class, 'mvCoachProduct ')]//div[@id='AvailMsgDisplay']"){
    insert_before("div", class: "mw_dotted_break")
  }

$("//div[@id='srch-frm']") {
  move_here("div[@class='ovr-infrmb']")
}
# add back size label ex. 0.3 oz.
$("//div[@class='pdp_qty mvWrapOnlyQuantity']") {
  inner_wrap("div", class: "pdp_qty")
  move_here("div/div[@class='pdp_sizecolor_section1']", "top")
}

# fix error display on pdp (was being added to color but not size)
$("//div[@class='pdp_size']/label[@for='size']") {
  wrap("div", class: "pdp_section_copy")
}

# add div to mvShareAccordianContent if there isnt one
$("//div[contains(@class,'mvShareAccordianContent')][not(node)]"){
  $myAsset = concat("<div id=\"mvFBShare\"><div class=\"mw_loading_spinner\"><img src=\"", asset("images/waiting.gif"), "\"></div></div>")
  inject_top($myAsset)
  #inject_top("<div id=\"mvFBShare\"><div class=\"mw_loading_spinner\"><img src=\"http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/waiting.gif\"></div></div>")
}

$("./body[contains(concat(' ', @class, ' '), ' productPage ') and contains(concat(' ', @class, ' '), ' mvNoQTY ') and contains(concat(' ', @class, ' '), ' mvNoSizeSelect ') and contains(concat(' ', @class, ' '), ' mvNoColorOrSizeSelect ') and contains(concat(' ', @class, ' '), ' mvNoRegistryPage ') and contains(concat(' ', @class, ' '), ' mvProductContainer ')]") {
  add_class("mw_sample_gift_card")
  $("./div[@class='moovweb_footer']") {
    remove()
  }
  $("./div[@class='bl_pop_body']") {
    $(".//table") {
      name("div")
      add_class("mw_table")
      $(".//tr") {
        name("div")
        add_class("mw_tr")
        $(".//td") {
          name("div")
          add_class("mw_td")
        }
      }
    }
    $("./div[contains(@class,'bodytext')]") {
      $("./div[contains(@class, 'mw_tr')]") {
        $("./div[contains(@class, 'mw_td')][1]") {
          add_class("mw_picture_container") 
        }
        $("./div[contains(@class, 'mw_td')]/div[contains(@class, 'mw_table')]") {
          add_class("mw_popup_text_container")
        }
        # $(".//div[@class='bl_pdp_gwp_popUpHeader']") {
        # }
      }
    }
  }
  # add empty write review container
}

$("//div[@id='mvBazaarWrap']"){
  inject_after('<div id="mw_write_review_link"></div>')
}

$("//div[@class='mvCarouselContainer']") {
  
  $("//head") {
    insert_bottom("script", type: "text/javascript", src: asset("/javascript/js/slideshow.js"))
    inject_bottom("<script>window.addEventListener('DOMContentLoaded', function(){PSInit();});</script>")
  }
  
  $("./div[1]"){
    attribute("active", "true")
  }
  attribute("parascroll"){
    value(){
      set("slider")
    }
  }
  wrap("div") {
    attribute("parascroll", "container")

    attribute("class","mwSwatchHolder")
  }
  $("//div[@parascroll='container']"){
    attribute("parascrollname"){
      value(){
      set("mw_swatches")
        append(index())
        log(index())
      }
    }
  }
}

# Move color selects into proper places
$(".//div[@class='pdp_color_box']/..") {
  add_class("mw_color_box")
}
#$("//input[@id='price']") {
#  move_here("//div[contains(@class, 'mw_color_box')][1]", "after")
#}

$("//div[@data-ur-carousel-component]/@data-ur-carousel-component"){
  remove()
}

$(".//div[@class='mvWrapOnlyQuantity']/div[contains(@class, 'pdp_size')]") {
  wrap_text_children("span", class: "mw_wrap")
  $("./span[@class='mw_wrap']") {
    inner("")
    move_here("../../preceding-sibling::div[1]", "top")
    $("./div") {
      attribute("class", "mw_moved")
      
      #this hides the color swatch next to color drop down commented it out, it needs to be there.
      # $("./div[not(normalize-space(text())='')]") {
      #   add_class("mw_hide")
      # } 
    }
  }
}

# $("/html/body") {
#   insert_javascript_bottom("x$(document).on('DOMContentLoaded', function() {var e = x$('#atbOverlay_c').getStyle('visibility'); if (e.length > 0) {e.scrollIntoView(true);}});")
# }

#move registry master page 
$("//div[contains(@class, 'pdp_pricetc_master')]"){
  $(".//div[contains(@class, 'pdp_sizecolor_section1')]"){
    move_to("./../div[contains(@class, 'mvWrapOnlyQuantity')]", "top")
  }
  
}

// Logs the onmousedown attribute of the Continue Shopping button
$("//div[contains(@class, 'mvContinuShopping')]"){
  attribute("id", "pdp_atb_cont_shopping")
  $dup_att = fetch("./@onmousedown")
  attribute("onclick", $dup_att)
  // name("onclick")
  // log(dump())
}
$("//body") {
  insert_javascript("function hideAtbOverlay(){itemsAddedFlag(false);pdpOverlay.destroy();resetInputElements();}", class:"mw_jeff_js")
}

#fixing uat_139, they change a div to a span which causes css rules to get misapplied, and also some other nodes are inside the span that shouldn't be
$("//input[@name='Nickname']/..") {
  $(".//strong[1]") {
    name("div")
    add_class("bl_pdp_item_header2")
  }
}
$("//span[@class='errorText']") {
  $("./div[contains(@class,'bl_pdp_item_header2')]") {
    add_class("error")
  }
  $("./*") {
    move_to("//span[@class='errorText']/..")
  }
  remove()
}

$("//div[contains(@class, 'mvShareWrap')]"){
  remove()
}

$("/html/body//div[contains(@class, 'mvProductSelectWrap')]"){
  attribute("id", "bl_pdp_productInfo")
  attribute("class", "bl_pdp_productInfo")
}
