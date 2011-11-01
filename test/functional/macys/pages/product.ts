
# ----- RawHTMLBlocks ----
#
#Content::Raw::RegexReplace
#[["match", "wid=50"], ["replace", "wid=290"], ["multiline", ""]]
replace(/wid=50/, "wid=290")

# ----- ParsedHTMLBlocks ----
html() {
  # for write review pass through
$("html/head"){
  insert("meta") {
    attribute("id", "mw_link_rewriter_config")
    attribute("matcher", $rewrite_link_matcher_str)
    attribute("replacement", $rewrite_link_replacement)
  }
}
 
   # Add page specific class
     $("//html/body") {
          attribute("id","mw_product")
        }
  
   #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onclick"], ["selector", ".pdpTab"]]
    $("//div[@id='productDetailSection']//div[@class='pdpTab']") {
      attribute("onclick") {
        remove()
      }
    }
  #
  #Content::Inject::InjectHTML
  #[["html", "<div onClick=\"history.go(-1)\">back</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".breadCrumbs"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' breadCrumbs ')])[1]") {
    inject_before("<div onClick=\"history.go(-1)\">back</div>")
  }
  
  
  #product not available
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#pna"], ["negate", ""]]
  $("(//*[@id = 'pna'])[1]") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvNoProductContent"], ["selector", ".productDetailShort"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' productDetailShort ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvNoProductContent")
          }
        }
      }
    }
    
    
    #product not available
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvNoProduct"], ["selector", "#macysGlobalLayout"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "#pna"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'macysGlobalLayout']") {
      match($done, "no") {
          var("conditional", "false")
            $("//*[@id = 'pna']") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvNoProduct")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".productImageSection"]]
    $("//*[contains(concat(' ', @class, ' '), ' productImageSection ')]") {
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
    
    
  }
  
  
  #Bag popup
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvErrorText"], ["selector", ".errorText"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' errorText ')]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvErrorText")
          }
        }
        }
      }
    }
    
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", ".divCart_wrapper > div"]]
    $("//*[contains(concat(' ', @class, ' '), ' divCart_wrapper ')]/div") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", ".outer, .topshadow *"]]
    $("//*[contains(concat(' ', @class, ' '), ' outer ')]") {
      attribute("style") {
        remove()
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' topshadow ')]//*") {
      attribute("style") {
        remove()
      }
    }
    
    
    #you may also like
    #Content::Formatting::RemoveElements
    #[["selector", ".divCart_prodReqs"]]
    $("//*[contains(concat(' ', @class, ' '), ' divCart_prodReqs ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", ".divCart_button"], ["to_end_of_me", ".inner_cont"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' inner_cont ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' divCart_button ')])[1]", "bottom")
    }
    
    
  # end BasicGroup
  
  #Top product Info
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".productDetailShort > span, .productDetailShort br, .productDetailShort a"]]
    $("//*[contains(concat(' ', @class, ' '), ' productDetailShort ')]/span") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' productDetailShort ')]//br") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' productDetailShort ')]//a") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "span.productDetailShort,#productDetailSection > .standard_prod_pricing_group"], ["class_name", "mvTopProductInfo"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//span[contains(concat(' ', @class, ' '), ' productDetailShort ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvTopProductInfo")
          move_here("//span[contains(concat(' ', @class, ' '), ' productDetailShort ')][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'productDetailSection']/*[contains(concat(' ', @class, ' '), ' standard_prod_pricing_group ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    match($found, "false") {
      $("(//*[@id = 'productDetailSection']/*[contains(concat(' ', @class, ' '), ' standard_prod_pricing_group ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvTopProductInfo")
          move_here("//span[contains(concat(' ', @class, ' '), ' productDetailShort ')][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'productDetailSection']/*[contains(concat(' ', @class, ' '), ' standard_prod_pricing_group ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvTopProductInfo"], ["before_me", "#localContentContainer"], ["map_moves", ""]]
    $("(//*[@id = 'localContentContainer'])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvTopProductInfo ')])[1]", "before")
    }
    
    
    #Keep final price only
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvTopProductInfo .standard_prod_pricing_group br"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvTopProductInfo ')]//*[contains(concat(' ', @class, ' '), ' standard_prod_pricing_group ')]//br") {
        remove()
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#surchargeMsg"], ["after_me", ".mvTopProductInfo .standard_prod_pricing_group"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvTopProductInfo ')]//*[contains(concat(' ', @class, ' '), ' standard_prod_pricing_group ')])[1]") {
        move_here("(//*[@id = 'surchargeMsg'])[1]", "after")
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".mvTopProductInfo .standard_prod_pricing_group > :last-child"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvTopProductInfo ')]//*[contains(concat(' ', @class, ' '), ' standard_prod_pricing_group ')]/*[position() = last() and self::*]") {
        name("div")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvTopProductInfo .standard_prod_pricing_group > span"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvTopProductInfo ')]//*[contains(concat(' ', @class, ' '), ' standard_prod_pricing_group ')]/span") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "#BVCustomerRatings"], ["after_me", ".mvTopProductInfo"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvTopProductInfo ')])[1]") {
      move_here("(//*[@id = 'BVCustomerRatings'])[1]", "after")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "ul.prodInfoList + script"], ["before_me", "#BVCustomerRatings"], ["map_moves", ""]]
    $("(//*[@id = 'BVCustomerRatings'])[1]") {
      move_here("(//ul[contains(concat(' ', @class, ' '), ' prodInfoList ')]/following-sibling::*[1]/self::script)[1]", "before")
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", ".tabsPanel"], ["after_me", "#bd"], ["map_multiple", ""]]
  $("(//*[@id = 'bd'])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' tabsPanel ')])[1]", "after")
  }
  
  
  #Review
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvReviewBar\">Reviews<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bizaar_rating"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bizaar_rating'])[1]") {
      inject_before("<div class=\"mvReviewBar\">Reviews<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".mvReviewBar"], ["content_selector", "#bizaar_rating"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[@id = 'bizaar_rating']") {
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
            append("61370")
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
    $("//*[contains(concat(' ', @class, ' '), ' mvReviewBar ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("61370")
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
    #Content::Passthrough::IFrame
    #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
    $("//iframe") {
      attribute("src") {
        value() {
          rewrite("link")
        }
      }
    }

  # end BasicGroup
  
  #no image gallery
  #need to before removeElements
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#moreViews"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//*[@id = 'moreViews'])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::CSS::RemoveStyles
    #[["selector", "#productFlash > img"]]
    $("//*[@id = 'productFlash']/img") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", "#productFlash > img"], ["to_beginning_of_me", ".productImageSection"], ["map_multiple", ""], ["ancestor_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' productImageSection ')])[1]") {
      move_here("(//*[@id = 'productFlash']/img)[1]", "top")
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", ".productImageSection > img"]]
    $("//*[contains(concat(' ', @class, ' '), ' productImageSection ')]/img") {
      attribute("width") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddQueryParameter
    #[["query_parameter_name", "wid"], ["query_parameter_value", "290"], ["selector", ".productImageSection > img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' productImageSection ')]/img") {
      attribute("src") {
        value() {
          append("?wid=290")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    
    #
    #Content::Formatting::AddQueryParameter
    #[["query_parameter_name", "hei"], ["query_parameter_value", "355"], ["selector", ".productImageSection > img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' productImageSection ')]/img") {
      attribute("src") {
        value() {
          append("?hei=355")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
  }
  
  
  #product page except coach
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".coachfooter"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//*[contains(concat(' ', @class, ' '), ' coachfooter ')])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #remove wish list
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "input[value=\"ADDTOWISHLIST_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@value = \"ADDTOWISHLIST_BUTTON\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvRemoveElement")
          }
        }
        }
      }
    }
    
    
    #remove compare to best sellers
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".prod_alt_control_link:contains(\"Compare To Best Sellers\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' prod_alt_control_link ') and contains(., \"Compare To Best Sellers\")]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
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
    #[["selector", "img[alt=\"Everyday Value\"], #esdCenterContent,  #cmIO_PDPZ1, .tabCorner, img[title=\"Error\"], .nonRegErrorIcon, #productFlash, .imageControls, .imageControlSpacer, .moreView > img, .swatchClickable > img, .swatch > img, .swatchDescription, .clearboth,.breadCrumbs > h1, .breadCrumbs > span:last-of-type,.mvRemoveElement, .productCenterSection > br, #BVdefaultURL, .bagbtn_or"]]
    $("//img[@alt = \"Everyday Value\"]") {
      remove()
    }
    $("//*[@id = 'esdCenterContent']") {
      remove()
    }
    $("//*[@id = 'cmIO_PDPZ1']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' tabCorner ')]") {
      remove()
    }
    $("//img[@title = \"Error\"]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' nonRegErrorIcon ')]") {
      remove()
    }
    $("//*[@id = 'productFlash']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' imageControls ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' imageControlSpacer ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' moreView ')]/img") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' swatchClickable ')]/img") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' swatch ')]/img") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' swatchDescription ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' breadCrumbs ')]/h1") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' breadCrumbs ')]/span[position() = last()]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' productCenterSection ')]/br") {
      remove()
    }
    $("//*[@id = 'BVdefaultURL']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' bagbtn_or ')]") {
      remove()
    }
    
    
    #remove video
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".videoPlayer, #productImageVideoTab"]]
      $("//*[contains(concat(' ', @class, ' '), ' videoPlayer ')]") {
        remove()
      }
      $("//*[@id = 'productImageVideoTab']") {
        remove()
      }
      
      
    # end BasicGroup
    
  }
  
  
  #pages have Image gallery
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#moreViews"], ["negate", ""]]
  $("(//*[@id = 'moreViews'])[1]") {
  
    #html layout of gallery images
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Remove main video image and icon
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".playIconHolder"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' playIconHolder ')]") {
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
        #[["selector", ".mvRemoveElement"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
          remove()
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".swatchClickable > input"], ["tag_name", "div"], ["class_name", "moreView"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' swatchClickable ')]/input") {
        wrap("div") {
          attribute("class", "moreView")
        }
      }
      
      
      #
      #Content::Formatting::RenameAttribute
      #[["attribute", "value"], ["new_attribute_name", "src"], ["selector", ".moreView > input"], ["copy", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' moreView ')]/input[@value]") {
        var("attribute", fetch("./@value"))
        attribute("src", $attribute)
        attribute("value") {
          remove()
        }
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", ".moreView > input"]]
      $("//*[contains(concat(' ', @class, ' '), ' moreView ')]/input") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".moreView > input"], ["new_tag_name", "img"], ["class_name", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' moreView ')]/input") {
        name("img")
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "wid"], ["query_parameter_value", "290"], ["selector", ".moreView > img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' moreView ')]/img") {
        attribute("src") {
          value() {
            append("?wid=290")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "hei"], ["query_parameter_value", "355"], ["selector", ".moreView > img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' moreView ')]/img") {
        attribute("src") {
          value() {
            append("?hei=355")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".moreView"], ["class_name", "mvProductImgWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' moreView ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvProductImgWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' moreView ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".moreView img"]]
      $("//*[contains(concat(' ', @class, ' '), ' moreView ')]//img") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvProductImgWrapper > .moreView"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvProductImgWrapper ')]/*[contains(concat(' ', @class, ' '), ' moreView ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
  }
  
  
  
      #
      #Content::Javascript::AddScriptTag
      #[["javascript_path", "http://dl.dropbox.com/u/3940085/moovweb/clients/macys-contract/js/pdp_hero_widgets.js"], ["add_after", ""]]
      $("//html/head") {
        insert_bottom("script") {
          attribute("src", asset('/javascript/pdp_hero_widgets.js'))
          attribute("language", "javascript")
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "data-ur-set"], ["value", "carousel"], ["selector", "#moreViews"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'moreViews']") {
      match($done, "no") {
          var("done", "yes")
        attribute("data-ur-set") {
          value() {
              set("carousel")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "data-ur-id"], ["value", "HeroCarousel"], ["selector", "#moreViews"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'moreViews']") {
      match($done, "no") {
          var("done", "yes")
        attribute("data-ur-id") {
          value() {
              set("HeroCarousel")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "data-ur-carousel-component"], ["value", "view_container"], ["selector", "#moreViews > div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'moreViews']/div") {
      match($done, "no") {
          var("done", "yes")
        attribute("data-ur-carousel-component") {
          value() {
              set("view_container")
          }
        }
      }
    }
    
    
    #construct buttons' html
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvGalleryBtns\"><a class=\"mvGalleryPrevBtn\"></a><a class=\"mvGalleryNextBtn\"></a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "*[data-ur-carousel-component='view_container']"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@data-ur-carousel-component = 'view_container'])[1]") {
        inject_before("<div class=\"mvGalleryBtns\"><a class=\"mvGalleryPrevBtn\"></a><a class=\"mvGalleryNextBtn\"></a></div>")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "data-ur-carousel-component"], ["value", "scroll_container"], ["selector", ".mvProductImgWrapper"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProductImgWrapper ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("data-ur-carousel-component") {
          value() {
              set("scroll_container")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".mvProductImgWrapper > *"], ["tag_name", "div"], ["class_name", ""], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvProductImgWrapper ')]/*") {
      wrap("div") {
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "data-ur-carousel-component"], ["value", "item"], ["selector", ".mvProductImgWrapper > *"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProductImgWrapper ')]/*") {
      match($done, "no") {
        attribute("data-ur-carousel-component") {
          value() {
              set("item")
          }
        }
      }
    }
    
    
    #Buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-carousel-component"], ["value", "button"], ["selector", ".mvGalleryBtns > a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvGalleryBtns ')]/a") {
        match($done, "no") {
          attribute("data-ur-carousel-component") {
            value() {
                set("button")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-carousel-button-type"], ["value", "prev"], ["selector", ".mvGalleryPrevBtn"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvGalleryPrevBtn ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("data-ur-carousel-button-type") {
            value() {
                set("prev")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-state"], ["value", "disabled"], ["selector", ".mvGalleryPrevBtn"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvGalleryPrevBtn ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("data-ur-state") {
            value() {
                set("disabled")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "data-ur-carousel-button-type"], ["value", "next"], ["selector", ".mvGalleryNextBtn"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvGalleryNextBtn ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("data-ur-carousel-button-type") {
            value() {
                set("next")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  # end BasicGroup
  
  #Product description
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".productDetailSection .productDetailLong"], ["after_me", "#productAttributeDropdown"], ["map_multiple", ""]]
    $("(//*[@id = 'productAttributeDropdown'])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' productDetailSection ')]//*[contains(concat(' ', @class, ' '), ' productDetailLong ')])[1]", "after")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<strong class=\"mvProductDetailsTitle\">Product Details: </strong>"], ["add_after", ""], ["multiple", ""], ["add_before", ".productCenterSection > .productDetailLong"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' productCenterSection ')]/*[contains(concat(' ', @class, ' '), ' productDetailLong ')])[1]") {
      inject_before("<strong class=\"mvProductDetailsTitle\">Product Details: </strong>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<strong class=\"mvProductDetailsTitle\">Product Details: </strong>"], ["add_after", ""], ["multiple", ""], ["add_before", ".productDetailSection > .productDetailLong"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' productDetailSection ')]/*[contains(concat(' ', @class, ' '), ' productDetailLong ')])[1]") {
      inject_before("<strong class=\"mvProductDetailsTitle\">Product Details: </strong>")
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".mvProductDetailsTitle + div.productDetailLong"], ["tag_name", "span"], ["class_name", "mvProductDetailLongText"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')])[1]") {
      wrap_text_children("span", class: 'mvProductDetailLongText')
    }
    
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", "#pdpInfoTab1_content .prodInfoList"], ["to_end_of_me", ".mvProductDetailsTitle + div.productDetailLong"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')])[1]") {
      move_here("(//*[@id = 'pdpInfoTab1_content']//*[contains(concat(' ', @class, ' '), ' prodInfoList ')])[1]", "bottom")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#pdpInfoTab1_holder, #pdpInfoTab1_content"]]
    $("//*[@id = 'pdpInfoTab1_holder']") {
      remove()
    }
    $("//*[@id = 'pdpInfoTab1_content']") {
      remove()
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".productDetailLong > span"], ["html", "<span class=\"mvPlus\">more</span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' productDetailLong ')]/span") {
      inner() {
        append("<span class=\"mvPlus\">more</span>")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvProductDetailsTitle + div.productDetailLong > ul.prodInfoList > li:last-of-type"], ["html", "<span class=\"mvMinus\">close </span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')]/ul[contains(concat(' ', @class, ' '), ' prodInfoList ')]/li[position() = last()]") {
      inner() {
        append("<span class=\"mvMinus\">close </span>")
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::RemoveClassOnEvent
    #[["target", ".mvProductDetailLongText"], ["trigger", ".mvProMoreInfo .mvPlus"], ["old_class", "mvProductDetailLongText"], ["trigger_event", "click"]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductDetailLongText ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstarget49541")
          }
        }
      }
      var("target_id", fetch("./@id"))
    }
    $("(//*[contains(concat(' ', @class, ' '), ' mvProMoreInfo ')]//*[contains(concat(' ', @class, ' '), ' mvPlus ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstrigger49541")
          }
        }
      }
      var("trigger_id", fetch("./@id"))
    }
    match($trigger_id, not(/^$/)) {
      match($target_id, not(/^$/)) {
        $("//html/body") {
          insert_bottom("script") {
            inner() {
              set("document.getElementById('")
              append($trigger_id)
              append("').addEventListener('click', function(){remove_class(document.getElementById('")
              append($target_id)
              append("'),'mvProductDetailLongText');},false);")
            }
          }
        }
      }
    }
    
    #
    #Content::Formatting::Dynamic::AddClassOnEvent
    #[["target", ".mvProductDetailsTitle + div.productDetailLong > :first-child"], ["trigger", ".mvProMoreInfo .mvMinus"], ["new_class", "mvProductDetailLongText"], ["trigger_event", "click"]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')]/*[position() = 1 and self::*])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstarget28423")
          }
        }
      }
      var("target_id", fetch("./@id"))
    }
    $("(//*[contains(concat(' ', @class, ' '), ' mvProMoreInfo ')]//*[contains(concat(' ', @class, ' '), ' mvMinus ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstrigger28423")
          }
        }
      }
      var("trigger_id", fetch("./@id"))
    }
    match($trigger_id, not(/^$/)) {
      match($target_id, not(/^$/)) {
        $("//html/body") {
          insert_bottom("script") {
            inner() {
              set("document.getElementById('")
              append($trigger_id)
              append("').addEventListener('click', function(){add_class(document.getElementById('")
              append($target_id)
              append("'),'mvProductDetailLongText');},false);")
            }
          }
        }
      }
    }
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".mvProductDetailsTitle + div.productDetailLong > span > .mvPlus"], ["content_selector", ".mvProductDetailsTitle + div.productDetailLong > ul.prodInfoList"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')]/ul[contains(concat(' ', @class, ' '), ' prodInfoList ')]") {
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
            append("89296")
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
    $("//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')]/span/*[contains(concat(' ', @class, ' '), ' mvPlus ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("89296")
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
    #Content::Formatting::AddEventTrigger
    #[["target", ".mvProductDetailsTitle + div.productDetailLong > span > .mvPlus"], ["target_event", "click"], ["trigger", ".mvProductDetailsTitle + div.productDetailLong > ul.prodInfoList .mvMinus"], ["trigger_event", ""], ["multiple", ""], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
    var("trigger_id", "")
    var("target_id", "")
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')]/span/*[contains(concat(' ', @class, ' '), ' mvPlus ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("etarget")
              append("15557")
            }
          }
        }
        var("target_id", fetch("./@id"))
    }
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')]/ul[contains(concat(' ', @class, ' '), ' prodInfoList ')]//*[contains(concat(' ', @class, ' '), ' mvMinus ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("etrigger")
              append("15557")
            }
          }
        }
        var("trigger_id", fetch("./@id"))
    }
    match($trigger_id, not(/^$/)) {
      match($target_id, not(/^$/)) {
        $("//html/body") {
          insert_bottom("script") {
            inner() {
             set("document.getElementById('")
             append($trigger_id)
             append("').addEventListener('click', function(){moovweb_trigger('click', '")
             append($target_id)
             append("')},false);")
            }
          }
        }
      }
    }
    
    
    #vendor Content Widget
    #http://www1.macys.com/catalog/product/index.ognc?ID=330634&PseudoCat=se-xx-xx-xx.esn_results
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvVendorContentWidget"], ["selector", "#vendorContentWidget"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'vendorContentWidget']") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvVendorContentWidget")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvVendorContentWidget > p > img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvVendorContentWidget ')]/p/img") {
        remove()
      }
      
      
      #Remove Style Property
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::CSS::RemoveStyleProperty
        #[["property_name", "font-size"], ["selector", ".mvVendorContentWidget *"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvVendorContentWidget ')]//*[@style]") {
          attribute("style") {
            value() {
              replace(/font-size[^;]+(;|$)/, "")
            }
          }
        }
        
        
        #
        #Content::CSS::RemoveStyleProperty
        #[["property_name", "margin-left"], ["selector", ".mvVendorContentWidget *"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvVendorContentWidget ')]//*[@style]") {
          attribute("style") {
            value() {
              replace(/margin-left[^;]+(;|$)/, "")
            }
          }
        }
        
        
        #
        #Content::CSS::RemoveStyleProperty
        #[["property_name", "margin"], ["selector", ".mvVendorContentWidget *"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvVendorContentWidget ')]//*[@style]") {
          attribute("style") {
            value() {
              replace(/margin[^;]+(;|$)/, "")
            }
          }
        }
        
        
        #
        #Content::CSS::RemoveStyleProperty
        #[["property_name", "display"], ["selector", ".mvVendorContentWidget *"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvVendorContentWidget ')]//*[@style]") {
          attribute("style") {
            value() {
              replace(/display[^;]+(;|$)/, "")
            }
          }
        }
        
        
        #
        #Content::CSS::RemoveStyleProperty
        #[["property_name", "padding"], ["selector", ".mvVendorContentWidget p"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvVendorContentWidget ')]//p[@style]") {
          attribute("style") {
            value() {
              replace(/padding[^;]+(;|$)/, "")
            }
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".mvVendorContentWidget"], ["after_me", ".mvProductDetailsTitle + div.productDetailLong > ul.prodInfoList"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvProductDetailsTitle ')]/following-sibling::*[1]/self::div[contains(concat(' ', @class, ' '), ' productDetailLong ')]/ul[contains(concat(' ', @class, ' '), ' prodInfoList ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvVendorContentWidget ')])[1]", "after")
      }
      
      
    # end BasicGroup
    
  # end BasicGroup
  
  #Product info accordians
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", "#masterTable, .tabContent table"]]
    $("//*[@id = 'masterTable']" ) {
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
    $("//*[contains(concat(' ', @class, ' '), ' tabContent ')]//table" ) {
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
    #Content::Formatting::WrapElement
    #[["selector", "#pdpInfoTab2_holder, #pdpInfoTab2_content"], ["class_name", "mvProductDetailWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'pdpInfoTab2_holder'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvProductDetailWrapper")
          move_here("//*[@id = 'pdpInfoTab2_holder'][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'pdpInfoTab2_content'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    match($found, "false") {
      $("(//*[@id = 'pdpInfoTab2_content'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvProductDetailWrapper")
          move_here("//*[@id = 'pdpInfoTab2_holder'][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'pdpInfoTab2_content'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#pdpInfoTab3_holder, #pdpInfoTab3_content"], ["class_name", "mvProductDetailWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'pdpInfoTab3_holder'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvProductDetailWrapper")
          move_here("//*[@id = 'pdpInfoTab3_holder'][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'pdpInfoTab3_content'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    match($found, "false") {
      $("(//*[@id = 'pdpInfoTab3_content'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvProductDetailWrapper")
          move_here("//*[@id = 'pdpInfoTab3_holder'][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'pdpInfoTab3_content'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#pdpInfoTab4_holder, #pdpInfoTab4_content"], ["class_name", "mvProductDetailWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'pdpInfoTab4_holder'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvProductDetailWrapper")
          move_here("//*[@id = 'pdpInfoTab4_holder'][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'pdpInfoTab4_content'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    match($found, "false") {
      $("(//*[@id = 'pdpInfoTab4_content'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvProductDetailWrapper")
          move_here("//*[@id = 'pdpInfoTab4_holder'][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'pdpInfoTab4_content'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".mvProductDetailWrapper *"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvProductDetailWrapper ')]//*") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", "div, span, p"]]
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
    $("//p") {
      attribute("width") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".pdpTabLabel"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' pdpTabLabel ')]") {
      inner() {
        append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian4
    #[["link_selector", ".tabHolder"], ["content_selector", ".tabContent"], ["ancestor_selector", ".mvProductDetailWrapper"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("anc_counter", "")
    $("//*[contains(concat(' ', @class, ' '), ' mvProductDetailWrapper ')]") {
      var("anc_counter") {
        append("b")
      }
      var("counter", "")
      var("content_id_string", "[")
      $(".//*[contains(concat(' ', @class, ' '), ' tabContent ')]") {
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
              append("195")
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
      $(".//*[contains(concat(' ', @class, ' '), ' tabHolder ')]") {
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
              append("195")
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
  
  #special or bonus offers
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvOfferAccordian"], ["selector", ".mvProductDetailWrapper"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".pdpTabLabel > span:contains(\"offers\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProductDetailWrapper ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' pdpTabLabel ')]/span[contains(., \"offers\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvOfferAccordian")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mvOfferAccordian .tabContent > div > div > span[bgcolor=\"#FFFFFF\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferAccordian ')]//*[contains(concat(' ', @class, ' '), ' tabContent ')]/div/div/span[@bgcolor = \"#FFFFFF\"]") {
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
    #[["selector", ".mvRemoveElement"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvOfferItemsWrapper"], ["selector", ".mvOfferAccordian .tabContent > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferAccordian ')]//*[contains(concat(' ', @class, ' '), ' tabContent ')]/div/div") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvOfferItemsWrapper")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".mvOfferItemsWrapper .productThumb.productThumbBorder"], ["to_beginning_of_me", ".mvOfferItemsWrapper"], ["map_multiple", "true"], ["ancestor_selector", ""]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]") {
      var("counter") {
        append("a")
      }
      attribute("id4391", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' productThumbBorder ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id4391 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "top")
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".mvOfferItemsWrapper a.productThumbBonusDesc"], ["after_me", ".mvOfferItemsWrapper .productThumb.productThumbBorder"], ["map_multiple", "true"]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' productThumbBorder ')]") {
      var("counter") {
        append("a")
      }
      attribute("id6584", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]//a[contains(concat(' ', @class, ' '), ' productThumbBonusDesc ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id6584 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "after")
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".mvOfferItemsWrapper a.standard"], ["after_me", ".mvOfferItemsWrapper a.productThumbBonusDesc"], ["map_multiple", "true"]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]//a[contains(concat(' ', @class, ' '), ' productThumbBonusDesc ')]") {
      var("counter") {
        append("a")
      }
      attribute("id1298", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]//a[contains(concat(' ', @class, ' '), ' standard ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id1298 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "after")
    }
    
    
    #
    #Content::Formatting::WrapWithNextSibling
    #[["selector", ".mvOfferItemsWrapper a.productThumbBonusDesc"], ["wrapper_class", "mvOfferDesc"], ["sibling_count", "1"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]//a[contains(concat(' ', @class, ' '), ' productThumbBonusDesc ')]") {
      wrap("div") {
        attribute("class", "mvOfferDesc")
        move_here("(following-sibling::*)[1]", "bottom")
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "align"], ["selector", ".mvOfferItemsWrapper *"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvOfferItemsWrapper ')]//*") {
      attribute("align") {
        remove()
      }
    }
    
    
  # end BasicGroup
  
  #Not Master pages
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#masterTableContainer"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//*[@id = 'masterTableContainer'])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #Product options layout
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "style"], ["selector", "#masterTable *"]]
      $("//*[@id = 'masterTable']//*") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvProOptionWrap"], ["selector", "#masterTable > .colHeader + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'masterTable']/*[contains(concat(' ', @class, ' '), ' colHeader ')]/following-sibling::*[1]/self::div") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvProOptionWrap")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvProOptionWrap a"], ["class_name", "mvProOptionLinks"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]//a)[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvProOptionLinks")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]//a[not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", ".mvProOptionLinks"], ["to_end_of_me", ".mvProOptionWrap"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvProOptionLinks ')])[1]", "bottom")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#masterTable > div.colHeader"]]
      $("//*[@id = 'masterTable']/div[contains(concat(' ', @class, ' '), ' colHeader ')]") {
        remove()
      }
      
   
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".tabContentContainer"]]
    $("//*[contains(concat(' ', @class, ' '), ' tabContentContainer ')]") {
      remove()
    }
    
    
  }
  
  
  #Master pages
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#masterTableContainer"], ["negate", ""]]
  $("(//*[@id = 'masterTableContainer'])[1]") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".divider"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' divider ')]") {
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
    #Content::Formatting::RemoveAttribute
    #[["attribute", "class"], ["selector", "#masterTable .swatchBoxContainer > .largeSwatch + img.mvHideElement"]]
    $("//*[@id = 'masterTable']//*[contains(concat(' ', @class, ' '), ' swatchBoxContainer ')]/*[contains(concat(' ', @class, ' '), ' largeSwatch ')]/following-sibling::*[1]/self::img[contains(concat(' ', @class, ' '), ' mvHideElement ')]") {
      attribute("class") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::WrapWithNextSibling
    #[["selector", "div[id$=\"container\"]"], ["wrapper_class", "mvMasterItemWrapper"], ["sibling_count", "3"]]
    $("//div[substring(@id, string-length(@id) - string-length(\"container\") + 1, string-length(\"container\")) = \"container\"]") {
      wrap("div") {
        attribute("class", "mvMasterItemWrapper")
        move_here("(following-sibling::*)[1]", "bottom")
        move_here("(following-sibling::*)[1]", "bottom")
        move_here("(following-sibling::*)[1]", "bottom")
      }
    }
    
    
    #product options
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvProOptionWrap"], ["selector", "#masterTable div[id$=\"container\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'masterTable']//div[substring(@id, string-length(@id) - string-length(\"container\") + 1, string-length(\"container\")) = \"container\"]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvProOptionWrap")
          }
        }
      }
    }
    
    
    #Master Grouping Header Template
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".pdpMasterGroupingHeader"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' pdpMasterGroupingHeader ')])[1]") {
    
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".pdpMasterGroupingHeader"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' pdpMasterGroupingHeader ')]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
          }
        }
      }
      
   
      #
      #Content::Formatting::ChunkChildren
      #[["selector", "#masterTable"], ["split_tag", ""], ["chunk_tag", "div"], ["split_class", ""], ["keep_split_elements", ""], ["keep_trailing_elements", "true"]]
      $("//*[@id = 'masterTable']") {
        $("div[@class='mvRemoveElement']") {
          remove()
        }
        $("div[contains(@class, 'mvDarkGrayBar')]") {
          wrap("div", class: "mvMasterProductWrapper")
        }
        $("div[contains(@class, 'mvMasterItemWrapper')]") {
          move_to("preceding-sibling::div[@class='mvMasterProductWrapper'][1]", "bottom")
        }
       
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".pdpMasterGroupingHeader"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' pdpMasterGroupingHeader ')]") {
        inject_before("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvDarkGrayBar"], ["content_selector", ".mvMasterItemWrapper"], ["ancestor_selector", "#masterTable > div"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[@id = 'masterTable']/div") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' mvMasterItemWrapper ')]") {
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
                append("75285")
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
                append("75285")
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
      
      
    }
    
    
    #Master Tabs Template
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#masterTableContainer .tabHolder"], ["negate", ""]]
    $("(//*[@id = 'masterTableContainer']//*[contains(concat(' ', @class, ' '), ' tabHolder ')])[1]") {
          # $("div"){
          #   attribute("onclick", "var e = document.querySelector('.activeTabContent'); members_tab_group.changeSelection(this.id,1); add_class(e, 'mvMasterDefault') ;")
          # }
      #
      #Content::Formatting::MoveBefore
      #[["move_me", ".masterTableContainer .tabHolder"], ["before_me", ".masterTableContainer #masterTable"], ["map_moves", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' masterTableContainer ')]//*[@id = 'masterTable']") {
        var("counter") {
          append("a")
        }
        attribute("id8710", $counter)
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' masterTableContainer ')]//*[contains(concat(' ', @class, ' '), ' tabHolder ')]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id8710 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".masterTableContainer .tabHolder"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' masterTableContainer ')]//*[contains(concat(' ', @class, ' '), ' pdpTab ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' masterTableContainer ')]//*[contains(concat(' ', @class, ' '), ' activeTabContent ')]") {
        match($done, "no") {
          attribute("class", "tabContent inactiveTabContent") {
           
          }
        }
      }
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "style"], ["selector", ".tabContent *"]]
      $("//*[contains(concat(' ', @class, ' '), ' tabContent ')]//*") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", "#masterTable"], ["tag_name", "div"], ["class_name", "mvMasterTable"], ["id", ""], ["multiple", "true"]]
      $("//*[@id = 'masterTable']") {
        wrap("div") {
          attribute("class", "mvMasterTable")
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".tabHolder"], ["content_selector", ".mvMasterTable"], ["ancestor_selector", ".masterTableContainer .tabContent"], ["open_on_load", ""], ["hide_with_zero_height", ""]]

      
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#masterTable .colHeader, .quickPickContainer"]]
    $("//*[@id = 'masterTable']//*[contains(concat(' ', @class, ' '), ' colHeader ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' quickPickContainer ')]") {
      remove()
    }
    
    
    #each item accordian
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvMasterItemWrapper  .viewLargerLink"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemWrapper ')]//*[contains(concat(' ', @class, ' '), ' viewLargerLink ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvItemName"], ["selector", ".mvMasterItemWrapper > div[id$=\"container\"] > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".productThumbDesc"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemWrapper ')]/div[substring(@id, string-length(@id) - string-length(\"container\") + 1, string-length(\"container\")) = \"container\"]/span") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' productThumbDesc ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                set("mvItemName")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".masterPdpMemberPrice"], ["after_me", ".mvItemName"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvItemName ')]") {
        var("counter") {
          append("a")
        }
        attribute("id2630", $counter)
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' masterPdpMemberPrice ')]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id2630 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "after")
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".mvMasterItemWrapper > div[id$=\"container\"] > span:first-of-type"], ["wrapper_class", "mvMasterItemSelector"], ["sibling_count", "3"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemWrapper ')]/div[substring(@id, string-length(@id) - string-length(\"container\") + 1, string-length(\"container\")) = \"container\"]/span[position() = 1]") {
        wrap("div") {
          attribute("class", "mvMasterItemSelector")
          move_here("(following-sibling::*)[1]", "bottom")
          move_here("(following-sibling::*)[1]", "bottom")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvMasterItemSelector"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemSelector ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".mvItemName"], ["wrapper_class", "mvMasterNamePrice"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvItemName ')]") {
        wrap("div") {
          attribute("class", "mvMasterNamePrice")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMasterItemWrapper #bag_buttons"], ["tag_name", "div"], ["class_name", "mvMasterBagBtns"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemWrapper ')]//*[@id = 'bag_buttons']") {
        wrap("div") {
          attribute("class", "mvMasterBagBtns")
        }
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".mvMasterItemWrapper .mvMasterItemSelector > span:first-of-type"], ["new_tag_name", "div"], ["class_name", "mvMasterItemImg"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvMasterItemSelector ')]/span[position() = 1]") {
        name("div")
        attribute("class", "mvMasterItemImg")
      }
      
      
      #more information
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMasterMoreInfo\">More Information</div>"], ["add_after", ""], ["multiple", "true"], ["add_before", "div[id*=\"container_tr\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//div[contains(@id, \"container_tr\")]") {
          inject_before("<div class=\"mvMasterMoreInfo\">More Information</div>")
        }
        
        
        #
        #Content::Formatting::WrapIndividualElements
        #[["selector", "div[id*=\"container_tr\"]"], ["tag_name", "div"], ["class_name", "mvMasterMoreInfoContent"], ["id", ""], ["multiple", "true"]]
        $("//div[contains(@id, \"container_tr\")]") {
          wrap("div") {
            attribute("class", "mvMasterMoreInfoContent")
          }
        }
        
        
        #
        #Content::Formatting::WrapWithNextSibling
        #[["selector", ".mvMasterMoreInfo"], ["wrapper_class", "mvMasterMoreInfoWrapper"], ["sibling_count", "1"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterMoreInfo ')]") {
          wrap("div") {
            attribute("class", "mvMasterMoreInfoWrapper")
            move_here("(following-sibling::*)[1]", "bottom")
          }
        }
        
        
        #
        #Content::Formatting::Dynamic::Accordian4
        #[["link_selector", ".mvMasterMoreInfo"], ["content_selector", ".mvMasterMoreInfoContent"], ["ancestor_selector", ".mvMasterMoreInfoWrapper"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
        var("anc_counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterMoreInfoWrapper ')]") {
          var("anc_counter") {
            append("b")
          }
          var("counter", "")
          var("content_id_string", "[")
          $(".//*[contains(concat(' ', @class, ' '), ' mvMasterMoreInfoContent ')]") {
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
                  append("6089")
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
          $(".//*[contains(concat(' ', @class, ' '), ' mvMasterMoreInfo ')]") {
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
                  append("6089")
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
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMasterCloseInfo"], ["selector", ".mmCollapsed > div:last-of-type"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mmCollapsed ')]/div[position() = last()]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mvMasterCloseInfo")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".mvMasterMoreInfoWrapper"], ["after_me", ".mvMasterItemSelector"], ["map_multiple", "true"]]
        var("counter", "a")
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemSelector ')]") {
          var("counter") {
            append("a")
          }
          attribute("id8423", $counter)
        }
        var("counter", "a")
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterMoreInfoWrapper ')]") {
          var("counter") {
            append("a")
          }
          var("xpath") {
            set("//*[@id8423 = '")
            append($counter)
            append("']")
          }
          move_to($xpath, "after")
        }
        
        
        #
        #Content::Formatting::RemoveAttribute
        #[["attribute", "href"], ["selector", ".mvMasterCloseInfo a"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterCloseInfo ')]//a") {
          attribute("href") {
            remove()
          }
        }
        
        
        #
        #Content::Formatting::RemoveAttribute
        #[["attribute", "onclick"], ["selector", ".mvMasterCloseInfo a"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterCloseInfo ')]//a") {
          attribute("onclick") {
            remove()
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvMasterMoreInfo"], ["target_event", "click"], ["trigger", ".mvMasterCloseInfo"], ["trigger_event", ""], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterMoreInfo ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
               append("87354")
               append($targets)
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvMasterCloseInfo ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
               append("87354")
               append($counter)
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("/html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('click', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},false);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "a:contains(\"more information\")"], ["text", "go to product page"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//a[contains(., \"more information\")]") {
          inner() {
            set("go to product page")
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvMasterItemSelector"], ["content_selector", ".mvMasterItemSelector ~ div"], ["ancestor_selector", ".mvMasterItemWrapper"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemWrapper ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' mvMasterItemSelector ')]/following-sibling::div") {
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
                append("71535")
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
        $(".//*[contains(concat(' ', @class, ' '), ' mvMasterItemSelector ')]") {
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
                append("71535")
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
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvItemAccordianBtn\"><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["add_after", ".mvMasterNamePrice"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterNamePrice ')]") {
        inject_after("<span class=\"mvItemAccordianBtn\"><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkBtn"], ["selector", ".findItInStore a"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' findItInStore ')]//a") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkBtn")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".findItInStore a"], ["text", "find in store"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' findItInStore ')]//a") {
        inner() {
          set("find in store")
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveWhiteSpace
    #[["selector", ".mvProOptionWrap *"]]
    # NOTE: This will remove text elements that are whitespace only, but it will not remove
    # the preceding or following whitespace from elements that have some text
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]//*/text()[normalize-space(.) = '']") {
      remove()
    }
    
    
    #Each item images
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "width"], ["selector", ".mvMasterItemImg img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemImg ')]//img") {
        attribute("width") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "height"], ["selector", ".mvMasterItemImg img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemImg ')]//img") {
        attribute("height") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/noColorSelected.gif"], ["selector", ".mvMasterItemSelector .largeSwatch + img[src*=\"spacer.gif\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemSelector ')]//*[contains(concat(' ', @class, ' '), ' largeSwatch ')]/following-sibling::*[1]/self::img[contains(@src, \"spacer.gif\")]") {
        # attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/noColorSelected.gif")
        attribute('src', asset('images/other/noColorSelected.gif'))
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "wid"], ["query_parameter_value", "290"], ["selector", ".mvMasterItemImg .swatchBoxContainer img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemImg ')]//*[contains(concat(' ', @class, ' '), ' swatchBoxContainer ')]//img") {
        attribute("src") {
          value() {
            append("?wid=290")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "hei"], ["query_parameter_value", "290"], ["selector", ".mvMasterItemImg .swatchBoxContainer img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemImg ')]//*[contains(concat(' ', @class, ' '), ' swatchBoxContainer ')]//img") {
        attribute("src") {
          value() {
            append("?hei=290")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "wid"], ["query_parameter_value", "290"], ["selector", ".mvMasterItemImg a[id^=\"zoomHrefButton\"] img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMasterItemImg ')]//a[starts-with(@id, \"zoomHrefButton\")]//img") {
        attribute("src") {
          value() {
            append("?wid=290")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "#alt_controls"], ["after_me", ".master_bag_buttons"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' master_bag_buttons ')])[1]") {
      move_here("(//*[@id = 'alt_controls'])[1]", "after")
    }
    
    
  }
  
  
  #Add product option labels when they have content
  #don't wrap select or span under .mvProOptionWrap. It breaks add to registry
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #When only have one selection, there is no dropdown menu and text only.
    #Content::Formatting::WrapTextChildren
    #[["selector", ".mvProOptionWrap > span"], ["tag_name", "div"], ["class_name", ""], ["multiple", "true"], ["split_delimiter", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      wrap_text_children("div")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvColorContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "select[name*=\"color\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//select[contains(@name, \"color\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvColorContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvQuantityContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "select[name*=\"Quantity\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//select[contains(@name, \"Quantity\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvQuantityContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSizeContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "select[name*=\"size\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//select[contains(@name, \"size\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvSizeContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvQuantityContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "input[name*=\"Quantity\"][value]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//input[contains(@name, \"Quantity\") and @value]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvQuantityContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTypeContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "select[name*=\"type\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//select[contains(@name, \"type\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvTypeContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSizeContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "input[name*=\"size\"][value]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//input[contains(@name, \"size\") and @value]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvSizeContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvColorContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "input[name*=\"color\"][value]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//input[contains(@name, \"color\") and @value]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvColorContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTypeContainer"], ["selector", ".mvProOptionWrap > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "input[name*=\"type\"][value]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]/span") {
      match($done, "no") {
          var("conditional", "false")
            $(".//input[contains(@name, \"type\") and @value]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvTypeContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvQuantityContainer"], ["html", "<div class=\"mvProOptionLabel\">Quantity: </div>"], ["prepend", "true"], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvQuantityContainer ')]") {
      inner() {
        prepend("<div class=\"mvProOptionLabel\">Quantity: </div>")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvSizeContainer"], ["html", "<div class=\"mvProOptionLabel\">Size: </div>"], ["prepend", "true"], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvSizeContainer ')]") {
      inner() {
        prepend("<div class=\"mvProOptionLabel\">Size: </div>")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvColorContainer"], ["html", "<div class=\"mvProOptionLabel\">Color: </div>"], ["prepend", "true"], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvColorContainer ')]") {
      inner() {
        prepend("<div class=\"mvProOptionLabel\">Color: </div>")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvTypeContainer"], ["html", "<div class=\"mvProOptionLabel\">Type: </div>"], ["prepend", "true"], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvTypeContainer ')]") {
      inner() {
        prepend("<div class=\"mvProOptionLabel\">Type: </div>")
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvProOptionWrap br"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".mvProOptionWrap select"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvProOptionWrap ')]//select") {
      attribute("style") {
        remove()
      }
    }
    
    
    #Hide label when it is no options
    #Furniture page is no qty.
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvHideElement"], ["selector", ".mvQuantityContainer"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".mvProOptionLabel + div[style=\"display:none;\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvQuantityContainer ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' mvProOptionLabel ')]/following-sibling::*[1]/self::div[@style = \"display:none;\"]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvHideElement")
          }
        }
          }
      }
    }
  
  #swatch
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onmouseout"], ["selector", ".swatches > div"]]
    $("//*[contains(concat(' ', @class, ' '), ' swatches ')]/div") {
      attribute("onmouseout") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onmouseover"], ["selector", ".swatches > div"]]
    $("//*[contains(concat(' ', @class, ' '), ' swatches ')]/div") {
      attribute("onmouseover") {
        remove()
      }
    }
    
    
    #html layout of swatches
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapElement
      #[["selector", ".swatches"], ["class_name", "mvSwatchesWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' swatches ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvSwatchesWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' swatches ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
    # end BasicGroup
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".mvSwatchesWrapper"], ["class_name", ""], ["id", "mvSwatchCarousel"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mvSwatchesWrapper ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("id", "mvSwatchCarousel")
          move_here("//*[contains(concat(' ', @class, ' '), ' mvSwatchesWrapper ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #If there are more than 5 swatches
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".swatches > div:nth-of-type(7)"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' swatches ')]/div[position() = 7])[1]") {
    
      #Swatch Carousel
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #I'll need to add a cond sel negation group here to make sure I don't add it twice
        #Content::Javascript::AddScriptTag
        #[["javascript_path", "http://dl.dropbox.com/u/6208053/macys_v2/uranium-pretty.js"], ["add_after", ""]]
        $("//html/head") {
          insert_bottom("script") {
            attribute("src", asset('/javascript/uranium-pretty'))
            attribute("language", "javascript")
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "data-ur-set"], ["value", "carousel"], ["selector", "#mvSwatchCarousel"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'mvSwatchCarousel']") {
          match($done, "no") {
              var("done", "yes")
            attribute("data-ur-set") {
              value() {
                  set("carousel")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "data-ur-type"], ["value", "multi"], ["selector", ".mvSwatchesWrapper"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvSwatchesWrapper ')]") {
          match($done, "no") {
            attribute("data-ur-type") {
              value() {
                  set("multi")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "data-ur-carousel-component"], ["value", "view_container"], ["selector", ".mvSwatchesWrapper"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvSwatchesWrapper ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("data-ur-carousel-component") {
              value() {
                  set("view_container")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "data-ur-carousel-component"], ["value", "scroll_container"], ["selector", ".swatches"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' swatches ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("data-ur-carousel-component") {
              value() {
                  set("scroll_container")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "data-ur-carousel-component"], ["value", "item"], ["selector", ".swatches > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' swatches ')]/div") {
          match($done, "no") {
            attribute("data-ur-carousel-component") {
              value() {
                  set("item")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvColorControl\"> <div data-ur-carousel-component='count'></div>   <div class=\"mvSwatchesBtns\"> <a class=\"mvSwatchesPrevBtn mvDarkBtn\" data-ur-carousel-component='button' data-ur-carousel-button-type='prev'>&lt; back</a> <a class=\"mvSwatchesNextBtn mvDarkBtn\" data-ur-carousel-component='button' data-ur-carousel-button-type='next'>more &gt;</a> </div></div>"], ["add_after", ".mvSwatchesWrapper"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvSwatchesWrapper ')])[1]") {
        inject_after("<div class=\"mvColorControl\"> <div data-ur-carousel-component='count'></div>   <div class=\"mvSwatchesBtns\"> <a class=\"mvSwatchesPrevBtn mvDarkBtn\" data-ur-carousel-component='button' data-ur-carousel-button-type='prev'>&lt; back</a> <a class=\"mvSwatchesNextBtn mvDarkBtn\" data-ur-carousel-component='button' data-ur-carousel-button-type='next'>more &gt;</a> </div></div>")
      }
      
      
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div id=\"mvColorText\"> Color: <span> None Selected</span></div>"], ["add_after", ".mvSwatchesWrapper"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvSwatchesWrapper ')])[1]") {
      inject_after("<div id=\"mvColorText\"> Color: <span> None Selected</span></div>")
    }
    
    
    #
    #Content::Javascript::AddScriptTag
    #[["javascript_path", "http://dl.dropbox.com/u/6208053/macys_v2/swatchtest.js"], ["add_after", "#mvColorText"]]
    $("//*[@id = 'mvColorText']") {
      insert_after("script") {
        attribute("src", asset('/javascript/swatchtest.js'))
        attribute("language", "javascript")
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onchange"], ["selector", "#color0"]]
    $("//*[@id = 'color0']") {
      attribute("onchange") {
        remove()
      }
    }
    
    
  # end BasicGroup
  
  #turn off swipe
  #Content::Formatting::AddAttribute
  #[["attribute", "data-ur-touch"], ["value", "disabled"], ["selector", "div[data-ur-carousel-component=\"view_container\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//div[@data-ur-carousel-component = \"view_container\"]") {
    match($done, "no") {
      attribute("data-ur-touch") {
        value() {
            set("disabled")
        }
      }
    }
  }
  
  
  #btn group
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", "#ADDTOREGISTRY_BUTTON"], ["to_end_of_me", "#bag_buttons"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//*[@id = 'bag_buttons'])[1]") {
      move_here("(//*[@id = 'ADDTOREGISTRY_BUTTON'])[1]", "bottom")
      $("div[id='priceFooter']"){
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addToBagBtn.png"], ["selector", "input[value=\"ADDTOBAG_BUTTON\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@value = \"ADDTOBAG_BUTTON\"]") {
      # attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addToBagBtn.png")
      attribute('src', asset('images/buttons/addToBag.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addToRegistryBtn.png"], ["selector", "input[id=\"ADDTOREGISTRY_BUTTON\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@id = \"ADDTOREGISTRY_BUTTON\"]") {
      # attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addToRegistryBtn.png")
      attribute('src', asset('images/buttons/addToRegistry.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/findInStoreBtn.png"], ["selector", ".sa-main > img"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' sa-main ')]/img") {
      # attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/findInStoreBtn.png")
      attribute('src', asset('images/buttons/findInStore.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/updateBagBtn.png"], ["selector", "input[value=\"UPDATEBAG_BUTTON\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@value = \"UPDATEBAG_BUTTON\"]") {
      # attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/updateBagBtn.png")
       attribute('src', asset('images/buttons/updateBag.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addAnotherToShoppingBagBtn.png"], ["selector", "input[value=\"ADDANOTHERTOBAG_BUTTON\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@value = \"ADDANOTHERTOBAG_BUTTON\"]") {
      # attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addAnotherToShoppingBagBtn.png")
      attribute('src', asset('images/buttons/addAnotherToShoppingBag.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueShoppingBtn.png"], ["selector", ".divCart_button #contineShopping > img"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' divCart_button ')]//*[@id = 'contineShopping']/img") {
      # attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueShoppingBtn.png")
      attribute('src', asset('images/buttons/continueShopping.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/checkoutBtn.png"], ["selector", ".divCart_button a > img[alt=\"CHECKOUT\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' divCart_button ')]//a/img[@alt = \"CHECKOUT\"]") {
      # attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/checkoutBtn.png")
      attribute('src', asset('images/buttons/checkout.png'))
    }
    
    
    #click to call
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvCallBtnWrapper"], ["selector", "img[alt=\"click to call\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@alt = \"click to call\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvCallBtnWrapper")
            }
          }
          }
        }
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", ".mvCallBtnWrapper"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvCallBtnWrapper ')]") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/clickToCallBtn.png"], ["selector", "img[alt=\"click to call\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[@alt = \"click to call\"]") {
        # attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/clickToCallBtn.png")
        attribute('src', asset('images/buttons/clickToCall.png'))
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", "#priceFooter"], ["to_end_of_me", "#bag_buttons"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//*[@id = 'bag_buttons'])[1]") {
      move_here("(//*[@id = 'priceFooter'])[1]", "bottom")
    }
    
    
  # end BasicGroup
  
  #GiftCard
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#myPdpGiftMessage"], ["negate", ""]]
  $("(//*[@id = 'myPdpGiftMessage'])[1]") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGiftCardForm"], ["selector", "#productAttributeDropdown"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'productAttributeDropdown']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvGiftCardForm")
          }
        }
      }
    }
    
    
  }
  
  
  #coach
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".coachfooter"], ["negate", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' coachfooter ')])[1]") {
  
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "div, span, p"]]
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
    $("//p") {
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
      #[["move_me", ".mvCoachNav"], ["before_me", "#globalContentContainer"], ["map_moves", ""]]
      $("(//*[@id = 'globalContentContainer'])[1]") {
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
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvCoachNav > a"], ["tag_name", "div"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]/a") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "align"], ["selector", ".coachfooter"]]
      $("//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
        attribute("align") {
          remove()
        }
      }
      
      
    # end BasicGroup
    
    #Title nav accordian for sub pages
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvCoachNav > .mvDarkGrayBar"], ["class_name", "mvCoachNavContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvCoachNavContent")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".coachfooter"], ["content_selector", ".mvCoachNavContent"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
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
              append("22202")
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
      $("//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("22202")
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
      #Content::Formatting::SetInnerHTML
      #[["selector", ".coachfooter"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' coachfooter ')]") {
        inner() {
          append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
        }
      }
      
      
    # end BasicGroup
    
    #coach product image
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "href"], ["selector", "#zoomHrefImage"]]
      $("//*[@id = 'zoomHrefImage']") {
        attribute("href") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "wid"], ["query_parameter_value", "290"], ["selector", "#zoomHrefImage > img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//*[@id = 'zoomHrefImage']/img") {
        attribute("src") {
          value() {
            append("?wid=290")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "hei"], ["query_parameter_value", "355"], ["selector", "#zoomHrefImage > img"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//*[@id = 'zoomHrefImage']/img") {
        attribute("src") {
          value() {
            append("?hei=355")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "width"], ["value", "290"], ["selector", "#zoomHrefImage > img"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'zoomHrefImage']/img") {
        match($done, "no") {
            var("done", "yes")
          attribute("width") {
            value() {
                set("290")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "br, #menu_whats_new"]]
    $("//br") {
      remove()
    }
    $("//*[@id = 'menu_whats_new']") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".coachproductname"], ["after_me", ".mvCoachNav"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvCoachNav ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' coachproductname ')])[1]", "after")
    }
    
    
    #coach info
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvCoachPrice"], ["selector", ".productDetailPrice"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' productDetailPrice ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvCoachPrice")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".coachproductprice, .coachproductdescription"], ["class_name", "mvCoachInfo"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' coachproductprice ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvCoachInfo")
            move_here("//*[contains(concat(' ', @class, ' '), ' coachproductprice ')][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' coachproductdescription ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' coachproductdescription ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvCoachInfo")
            move_here("//*[contains(concat(' ', @class, ' '), ' coachproductprice ')][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' coachproductdescription ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", ".mvCoachInfo"], ["to_end_of_me", "form#productAttributeDropdown"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//form[@id = 'productAttributeDropdown'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvCoachInfo ')])[1]", "bottom")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvErrorText img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvErrorText ')]//img") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveEmptyElements
    #[["selector", ".mvDarkGrayBar"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')][not(descendant::*)]") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".productAttribute"], ["class_name", "mvProductAttribute"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' productAttribute ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvProductAttribute")
          move_here("//*[contains(concat(' ', @class, ' '), ' productAttribute ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
  }
  
  
  #add to registry pop
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRedBtn"], ["selector", "#viewRegistry"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'viewRegistry']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvRedBtn")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvDarkBtn"], ["selector", "#continueShopping"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'continueShopping']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvDarkBtn")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "view my registry"], ["selector", "#viewRegistry"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'viewRegistry']") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("view my registry")
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
  
  #find in store
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/mymacys_csa.gif"], ["selector", "img[src*=\"mymacys_csa.gif\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//img[contains(@src, \"mymacys_csa.gif\")]") {
      # attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/mymacys_csa.gif")
      attribute('src', asset('images/other/mymacys_csa.gif'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/furnitureSample.gif"], ["selector", "img[src*=\"mymacys_sa.gif\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//img[contains(@src, \"mymacys_sa.gif\")]") {
      # attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/furnitureSample.gif")
      attribute('src', asset('images/other/furnitureSample.gif'))
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "width"], ["value", "236"], ["selector", "img[alt=\"my macys\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"my macys\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("width") {
          value() {
              set("236")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "height"], ["value", "23"], ["selector", "img[alt=\"my macys\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"my macys\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("height") {
          value() {
              set("23")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#storeav-oy .ovr-infrmc"], ["before_me", "#storeav-oy .ovr-infrmb"], ["map_moves", ""]]
    $("(//*[@id = 'storeav-oy']//*[contains(concat(' ', @class, ' '), ' ovr-infrmb ')])[1]") {
      move_here("(//*[@id = 'storeav-oy']//*[contains(concat(' ', @class, ' '), ' ovr-infrmc ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRedBtn"], ["selector", "#storeav-oy .submit-btn.button"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'storeav-oy']//*[contains(concat(' ', @class, ' '), ' submit-btn ') and contains(concat(' ', @class, ' '), ' button ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvRedBtn")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "#storeav-oy .submit-btn.button"], ["after_me", "#saData"], ["map_multiple", ""]]
    $("(//*[@id = 'saData'])[1]") {
      move_here("(//*[@id = 'storeav-oy']//*[contains(concat(' ', @class, ' '), ' submit-btn ') and contains(concat(' ', @class, ' '), ' button ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".ul-inline.d-hdr.cfx"]]
    $("//*[contains(concat(' ', @class, ' '), ' ul-inline ') and contains(concat(' ', @class, ' '), ' d-hdr ') and contains(concat(' ', @class, ' '), ' cfx ')]") {
      remove()
    }
    
    
  # end BasicGroup
  
  #
  #Content::Javascript::ReplaceMatchingScriptTag
  #[["src_match", "addToRegistry-min.js"], ["new_src", "http://dl.dropbox.com/u/9451381/moovweb/clients/macys/addToRegistry.js"]]
  $("(//script[contains(@src, 'addToRegistry-min.js')])[1]") {
    attribute("src", asset('/javascript/addToRegistry.js'))
  }
  
  #
  #Content::Javascript::ReplaceMatchingScriptTag
  #[["src_match", "dynamic_dropdowns-min.js"], ["new_src", "http://dl.dropbox.com/u/9451381/moovweb/clients/macys/dynamic_dropdowns.js"]]
  $("(//script[contains(@src, 'dynamic_dropdowns-min.js')])[1]") {
    attribute("src", asset('/javascript/dynamic_dropdowns.js'))
  }
  
  #
  #Content::Javascript::ReplaceMatchingScriptTag
  #[["src_match", "storeavail.js"], ["new_src", "http://dl.dropbox.com/u/9451381/moovweb/clients/macys/storeavail.js"]]
  $("(//script[contains(@src, 'storeavail.js')])[1]") {
    attribute("src", asset('/javascript/storeavail.js'))
  }
  
  #Warranties
  #Group::URLMatcherGroup
  #[["url_matcher", "warranty\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /warranty\.jsp/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvWarrantyBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
   
    $("//body") {
    add_class("mvWarrantyBody")
          }

    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".popupBanner.popupBannerIni"], ["html", "<div class=\"mvPopupTitle\">Warranty</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' popupBanner ') and contains(concat(' ', @class, ' '), ' popupBannerIni ')]") {
      inner("<div class=\"mvPopupTitle\">Warranty</div>")
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
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img[alt=\"Warranties\"], td > br"]]
    $("//img[@alt = \"Warranties\"]") {
      remove()
    }
    $("//td/br") {
      remove()
    }
    
    
  }
  
  #Chanel redirect
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".chanel"], ["negate", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' chanel ')])[1]") {
  
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvNomobile\" style=\"text-align:center; font-size:15px; padding-top:80px; height:140px; line-height:200%;\"><div>This feature is not supported.</div></dv>"], ["add_after", "#doc3"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'doc3'])[1]") {
      inject_after("<div class=\"mvNomobile\" style=\"text-align:center; font-size:15px; padding-top:80px; height:140px; line-height:200%;\"><div>This feature is not supported.</div></dv>")
    }
    
    
    #
    #Content::Inject::InjectDesktopSiteLink
    #[["add_after", ".mvNomobile > div"]]
    # --- not found ---
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".tabsPanel, #bd"]]
    $("//*[contains(concat(' ', @class, ' '), ' tabsPanel ')]") {
      remove()
    }
    $("//*[@id = 'bd']") {
      remove()
    }
    
    
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".backToRegistryBtn.greyBtn.registryBtn"]]
  $("//*[contains(concat(' ', @class, ' '), ' backToRegistryBtn ') and contains(concat(' ', @class, ' '), ' greyBtn ') and contains(concat(' ', @class, ' '), ' registryBtn ')]") {
    remove()
  }
  
  
  #click to call
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "img[alt=\"click to call\"]"], ["negate", ""]]
  $("(//img[@alt = \"click to call\"])[1]") {
  
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onclick"], ["selector", ".mvCallBtnWrapper img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCallBtnWrapper ')]//img") {
      attribute("onclick") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", ".mvCallBtnWrapper"], ["new_tag_name", "a"], ["class_name", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCallBtnWrapper ')]") {
      name("a")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "href"], ["value", "tel:18002896229"], ["selector", ".mvCallBtnWrapper"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvCallBtnWrapper ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("href") {
          value() {
              set("tel:18002896229")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvCallBtnWrapper + div"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCallBtnWrapper ')]/following-sibling::*[1]/self::div") {
      remove()
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvCallTime\"><p>Mon-Sat 8am-12am ET</p><p>Sun 8am-10pm ET</p></div>"], ["add_after", ".mvCallBtnWrapper"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvCallBtnWrapper ')])[1]") {
      inject_after("<div class=\"mvCallTime\"><p>Mon-Sat 8am-12am ET</p><p>Sun 8am-10pm ET</p></div>")
    }
    
    
  }
  
  
  #gift card example popup
  #http://www1.moov1.macys.com/catalog/product/vgcemailpreview.ognc?productID=275730
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/vgcemailpreview\\.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/vgcemailpreview\.ognc/) {
  
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
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "span, div"]]
    $("//span") {
      attribute("style") {
        remove()
      }
    }
    $("//div") {
      attribute("style") {
        remove()
      }
    }
    
    
  }
  
  #Bonus and special offer color swatch pages
  #http://www1.moov1.macys.com/catalog/product/index.ognc?ID=560563&EXTRA_PARAMETER=SWATCH
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".popupTable"], ["negate", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' popupTable ')])[1]") {
  
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
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "span, div"]]
    $("//span") {
      attribute("style") {
        remove()
      }
    }
    $("//div") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvOfferSwatch"], ["selector", "div[id^=\"swatch\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//div[starts-with(@id, \"swatch\")]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvOfferSwatch")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "align"], ["selector", "div"]]
    $("//div") {
      attribute("align") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".popupBanner.popupBannerIni"], ["to_beginning_of_me", ".popupContent.popupContentIni"], ["map_multiple", ""], ["ancestor_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' popupContent ') and contains(concat(' ', @class, ' '), ' popupContentIni ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' popupBanner ') and contains(concat(' ', @class, ' '), ' popupBannerIni ')])[1]", "top")
    }
    
    
  }
  
  
  
  
  #APP remove back btn
  #Group::CookieMatcherGroup
  #[["cookie_name", "ishop_app"], ["cookie_value_regex", ""], ["no_cookie_counts", ""], ["any", ""]]
  var("run_group", "false")
      # match if the cookie is found
      match($cookie, /ishop_app/) {
        var("run_group", "true")
      }
  match($run_group, "true") {
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".depthpathContainer"]]
    $("//*[contains(concat(' ', @class, ' '), ' depthpathContainer ')]") {
      remove()
    }
    
    
  }
  $("//div[@id = 'masterTableContainer']//div[contains(@class, 'tabHolder')]") {
    $("./div"){
      attribute("onclick", "var e = document.querySelector('.activeTabContent'); members_tab_group.changeSelection(this.id,1); add_class(e, 'mvMasterDefault') ; remove_class(e, 'activeTabContent'); add_class(e, 'inactiveTabContent') ; ")
    }
  }
 
  
}
