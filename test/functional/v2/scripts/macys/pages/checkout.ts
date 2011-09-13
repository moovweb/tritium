# ----- ParsedHTMLBlocks ----
html() {
 
  #checkout pages except receipt page
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "input[name=\"KEYWORD_GO_BUTTON\"]"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//input[@name = \"KEYWORD_GO_BUTTON\"])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  

    # Add page specific class
    $("//html/body") {
      add_class("mw_checkout")
    }
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".globalMiniCartItems"]]
    $("//*[contains(concat(' ', @class, ' '), ' globalMiniCartItems ')]") {
      move_to("..", "before")
    }
    
    
    #page title
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "#shippingAddress > div > h1"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//*[@id = 'shippingAddress']/div/h1)[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "#shippingAddress > form:first-of-type > div:nth-of-type(2) h1"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//*[@id = 'shippingAddress']/form[position() = 1]/div[position() = 2]//h1)[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "form > div > h1.withSubText"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//form/div/h1[contains(concat(' ', @class, ' '), ' withSubText ')])[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "#billingAddress h1"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//*[@id = 'billingAddress']//h1)[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "#checkoutSummary > h1"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//*[@id = 'checkoutSummary']/h1)[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "#shippingAddress h1.withSubText"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//*[@id = 'shippingAddress']//h1[contains(concat(' ', @class, ' '), ' withSubText ')])[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", "form[name=\"shipmentReview\"] > h1"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//form[@name = \"shipmentReview\"]/h1)[1]", "top")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvTitle"], ["selector", "#macysGlobalLayout > h1"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']/h1") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvTitle")
            }
          }
        }
      }
      
      
      #
      #This is for add 2px bold line on the bottom of title
      #Content::Formatting::WrapElement
      #[["selector", ".mvTitle"], ["class_name", "mvTitleWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvTitleWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvTitle ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #shipping address
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#shippingAddress"], ["negate", ""]]
    $("(//*[@id = 'shippingAddress'])[1]") {
    
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".shippingDetails_separator_container, clear, .shippingDetails_addressoption_Header ~ br, #mcyCheckoutMainContent .spacer"]]
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_separator_container ')]") {
        remove()
      }
      $("//clear") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_addressoption_Header ')]/following-sibling::br") {
        remove()
      }
      $("//*[@id = 'mcyCheckoutMainContent']//*[contains(concat(' ', @class, ' '), ' spacer ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".shippingDetails_wishlistContact_right , .shippingDetails_wishlistContact_left, .shippingDetails_registrantAddress, #divshipToMultipleAddr"], ["tag_name", "div"], ["class_name", "mvLightGrayBox"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_wishlistContact_right ')]") {
        wrap("div") {
          attribute("class", "mvLightGrayBox")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_wishlistContact_left ')]") {
        wrap("div") {
          attribute("class", "mvLightGrayBox")
        }
      }
      # $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_registrantAddress ')]") {
      #        wrap("div") {
      #          attribute("class", "mvLightGrayBox")
      #        }
      #      }
      $("//*[@id = 'divshipToMultipleAddr']") {
        wrap("div") {
          attribute("class", "mvLightGrayBox")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".shippingDetails_addressoption_Header"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_addressoption_Header ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapTextChildren
      #[["selector", ".shippingDetails_content"], ["tag_name", "div"], ["class_name", ""], ["multiple", "true"], ["split_delimiter", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content ')]") {
        wrap_text_children("div")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvBreakLine\">&nbsp;</div>"], ["add_after", ""], ["multiple", "true"], ["add_before", "a:contains(\"edit\")"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//a[contains(., \"edit\")]") {
        inject_before("<div class=\"mvBreakLine\">&nbsp;</div>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvHideElement"], ["selector", "br"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//br") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvHideElement")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".shippingDetails_content br, .shippingDetails_content a + div"]]
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content ')]//br") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content ')]//a/following-sibling::*[1]/self::div") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "class"], ["selector", ".shippingDetails_content br, .generalError br"]]
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content ')]//br") {
        attribute("class") {
          remove()
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' generalError ')]//br") {
        attribute("class") {
          remove()
        }
      }
      
      
      #add new shipping address
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::MoveToEndOf
        #[["move_me", "#shippingNoAddressForm"], ["to_end_of_me", ".shippingDetails_newAddressContainer"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' shippingDetails_newAddressContainer ')])[1]") {
          move_here("(//*[@id = 'shippingNoAddressForm'])[1]", "bottom")
        }
        
        
        #
        #Content::Formatting::WrapWithNextSibling
        #[["selector", "#shippingNoAddressForm .shippingDetails_formText"], ["wrapper_class", "mvNewAddressRow"], ["sibling_count", "1"]]
        $("//*[@id = 'shippingNoAddressForm']//*[contains(concat(' ', @class, ' '), ' shippingDetails_formText ')]") {
          wrap("div") {
            attribute("class", "mvNewAddressRow")
            move_here("(following-sibling::*)[1]", "bottom")
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", ".shippingDetails_newAddressContainer"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_newAddressContainer ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvShadowBottom")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #choose item for shipment
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "#mcyCheckoutMainContent .checkoutContainer .itemSelection"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'mcyCheckoutMainContent']//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]//*[contains(concat(' ', @class, ' '), ' itemSelection ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mvShadowBox")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::WrapWithNextSibling
        #[["selector", ".itemSelection_price"], ["wrapper_class", "mvItemPriceContainer"], ["sibling_count", "2"]]
        $("//*[contains(concat(' ', @class, ' '), ' itemSelection_price ')]") {
          wrap("div") {
            attribute("class", "mvItemPriceContainer")
            move_here("(following-sibling::*)[1]", "bottom")
            move_here("(following-sibling::*)[1]", "bottom")
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", ".itemSelection_price"], ["text", "Price: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[contains(concat(' ', @class, ' '), ' itemSelection_price ')]") {
          inner() {
            prepend("Price: ")
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", ".itemSelection_total"], ["text", "Total: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[contains(concat(' ', @class, ' '), ' itemSelection_total ')]") {
          inner() {
            prepend("Total: ")
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", ".itemSelection_qty"], ["text", "Qty.  "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[contains(concat(' ', @class, ' '), ' itemSelection_qty ')]") {
          inner() {
            prepend("Qty.  ")
          }
        }
        
        
      # end BasicGroup
      
      #Registry shipping address
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRegistryItemStart"], ["selector", ".itemSelection > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".shippingDetails_registrantAddress_giftIcon"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' itemSelection ')]/div") {
          match($done, "no") {
              var("conditional", "false")
                $(".//*[contains(concat(' ', @class, ' '), ' shippingDetails_registrantAddress_giftIcon ')]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
            attribute("class") {
              value() {
                  set("mvRegistryItemStart")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Formatting::MoveUp
        #[["move_me", ".mvRegistryItemStart"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvRegistryItemStart ')]") {
          move_to("..", "before")
        }
        
        
      # end BasicGroup
      
    }
    
    
    #price table
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPriceColumn"], ["selector", "#orderSummaryRightSidebar tr"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'orderSummaryRightSidebar']//tr") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvPriceColumn")
            }
          }
        }
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
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".mvPriceColumn > span:nth-of-type(2)"], ["wrapper_class", "mvPriceDetails"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvPriceColumn ')]/span[position() = 2]") {
        wrap("div") {
          attribute("class", "mvPriceDetails")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
    # end BasicGroup
    
    #Choose Items for shipment
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "form[name=\"multipleShipping\"]"], ["negate", ""]]
    $("(//form[@name = \"multipleShipping\"])[1]") {
    
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#mcyCheckoutMainContent > .checkoutContainer > div:first-of-type"]]
      $("//*[@id = 'mcyCheckoutMainContent']/*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/div[position() = 1]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveEmptyElements
      #[["selector", ".checkoutContainer > *"]]
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/*[not(descendant::*)]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", ".checkoutContainer + div:contains(\"Additional Address\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/following-sibling::*[1]/self::div[contains(., \"Additional Address\")]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPadding0510")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".itemSelection_content > span:last-child"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' itemSelection_content ')]/*[position() = last() and self::span]") {
        name("div")
      }
      
      
    }
    
    
    #ShippingOption, shippingMethod
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".ShippingOption_shippingMethod"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' ShippingOption_shippingMethod ')])[1]") {
    
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#mcyCheckoutMainContent > .checkoutContainer > div:first-of-type, .ShippingOption_delivery"]]
      $("//*[@id = 'mcyCheckoutMainContent']/*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/div[position() = 1]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' ShippingOption_delivery ')]") {
        remove()
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvShippingMethodTitle mvDarkGrayBar\">Shipping Method</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".ShippingOption_shippingMethod"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' ShippingOption_shippingMethod ')])[1]") {
        inject_before("<div class=\"mvShippingMethodTitle mvDarkGrayBar\">Shipping Method</div>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".ShippingOption_content2"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' ShippingOption_content2 ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".ShippingOption_content2 > .h2"], ["text", "Is this order a gift"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' ShippingOption_content2 ')]/*[contains(concat(' ', @class, ' '), ' h2 ')]") {
        inner() {
          set("Is this order a gift")
        }
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", ".ShippingOption_content2"], ["before_me", ".ShippingOption_giftOptions"], ["map_moves", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' ShippingOption_giftOptions ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' ShippingOption_content2 ')])[1]", "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGoGreenGift"], ["selector", ".itemSelection_content2 > div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "img[src*=\"go_green_hr\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' itemSelection_content2 ')]/div") {
        match($done, "no") {
            var("conditional", "false")
              $(".//img[contains(@src, \"go_green_hr\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvGoGreenGift")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", ".ShippingOption_shippingMethod, .addMessage"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' ShippingOption_shippingMethod ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBottom")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' addMessage ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBottom")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "href"], ["value", "https://customerservice.macys.com/app/answers/detail/a_id/260/theme/popup"], ["selector", ".ShippingOption_link > a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' ShippingOption_link ')]/a") {
        match($done, "no") {
            var("done", "yes")
          attribute("href") {
            value() {
                set("https://customerservice.macys.com/app/answers/detail/a_id/260/theme/popup")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "target"], ["value", "blank"], ["selector", ".ShippingOption_link > a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' ShippingOption_link ')]/a") {
        match($done, "no") {
            var("done", "yes")
          attribute("target") {
            value() {
                set("blank")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding10"], ["selector", ".submast"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' submast ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPadding10")
            }
          }
          }
        }
      }
      
      
    }
    
    
    #payment information
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#billingAddress"], ["negate", ""]]
    $("(//*[@id = 'billingAddress'])[1]") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".BillingRegister_creditCard, .BillingRegister_billing_Address, .Shopping_Bag_giftCard_title, .h2:contains(\"enter contact information\")"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' BillingRegister_creditCard ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvDarkGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' BillingRegister_billing_Address ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvDarkGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' Shopping_Bag_giftCard_title ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvDarkGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' h2 ') and contains(., \"enter contact information\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvDarkGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPromoCodeWrapper"], ["selector", ".checkoutContainer > div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".Shopping_Bag_promoCode"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/div") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' Shopping_Bag_promoCode ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPromoCodeWrapper")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".BillingRegister_creditCard_formContent"], ["wrapper_class", "mvBillRow"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' BillingRegister_creditCard_formContent ')]") {
        wrap("div") {
          attribute("class", "mvBillRow")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", "#billingAddress > div > div"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "img[alt=\"icon_ad_pool\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'billingAddress']/div/div") {
        match($done, "no") {
            var("conditional", "false")
              $(".//img[@alt = \"icon_ad_pool\"]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvPadding0510")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBillPhoneNo"], ["selector", ".Shopping_Bag_content"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", "#phoneNumber"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' Shopping_Bag_content ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[@id = 'phoneNumber']") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvBillPhoneNo")
            }
          }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvBillPhoneNo .clearboth + span, .billing_style4 > .clearboth, .checkoutContainer > br.clearboth"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvBillPhoneNo ')]//*[contains(concat(' ', @class, ' '), ' clearboth ')]/following-sibling::*[1]/self::span") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' billing_style4 ')]/*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/br[contains(concat(' ', @class, ' '), ' clearboth ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", ".mvPromoCodeWrapper"], ["before_me", "#mcyCheckoutPricingSummary"], ["map_moves", ""]]
      $("(//*[@id = 'mcyCheckoutPricingSummary'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvPromoCodeWrapper ')])[1]", "before")
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", "span[class^=\"Shopping_Bag_giftCard_radio\"]"], ["class_name", "mvPadding10"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//span[starts-with(@class, \"Shopping_Bag_giftCard_radio\")])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvPadding10")
            move_here("//span[starts-with(@class, \"Shopping_Bag_giftCard_radio\")][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "label[for=\"useShipping\"]"], ["after_me", ".BillingRegister_creditCard_radio"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' BillingRegister_creditCard_radio ')])[1]") {
        move_here("(//label[@for = \"useShipping\"])[1]", "after")
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".checkoutContainer > .billing_checkbox_1, .checkoutContainer > .billing_content_1"], ["class_name", "mvCheckoutNewCardWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/*[contains(concat(' ', @class, ' '), ' billing_checkbox_1 ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvCheckoutNewCardWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/*[contains(concat(' ', @class, ' '), ' billing_checkbox_1 ')][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/*[contains(concat(' ', @class, ' '), ' billing_content_1 ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/*[contains(concat(' ', @class, ' '), ' billing_content_1 ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvCheckoutNewCardWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/*[contains(concat(' ', @class, ' '), ' billing_checkbox_1 ')][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/*[contains(concat(' ', @class, ' '), ' billing_content_1 ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvCreditCardTitle"], ["selector", ".mvDarkGrayBar"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "div.h2:contains(\"Credit Card\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//div[contains(concat(' ', @class, ' '), ' h2 ') and contains(., \"Credit Card\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvCreditCardTitle")
            }
          }
            }
        }
      }
      
      
      #credit card field
      #when gift card balance > order total, this need to be hidden
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", ".checkoutContainer .billing_style3[style=\"display:none;\"]"], ["negate", "true"]]
      var("element_exists", "false")
      $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]//*[contains(concat(' ', @class, ' '), ' billing_style3 ') and @style = \"display:none;\"])[1]") {
        var("element_exists", "true")
      }
      match($element_exists, "false") {
      
        #
        #Content::Formatting::MoveBefore
        #[["move_me", ".mvCreditCardTitle"], ["before_me", "#mcyCheckoutMainContent"], ["map_moves", ""]]
        $("(//*[@id = 'mcyCheckoutMainContent'])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' mvCreditCardTitle ')])[1]", "before")
        }
        
        
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPhoneOptions"], ["selector", ".row"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "#phoneArea"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' row ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[@id = 'phoneArea']") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPhoneOptions")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/removeBtn.png"], ["selector", "img[alt=\"Remove\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[@alt = \"Remove\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/removeBtn.png")
        attribute('src', asset('buttons/remove.png', 'image'))
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addAnother.png"], ["selector", "img[onclick*=\"showGiftCardNumber\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[contains(@onclick, \"showGiftCardNumber\")]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addAnother.png")
        attribute('src', asset('buttons/addAnother.png', 'image'))
      }
      
      
      #
      #Content::Formatting::RemoveWhiteSpace
      #[["selector", ".mvPhoneOptions .Shopping_Bag_content"]]
      # NOTE: This will remove text elements that are whitespace only, but it will not remove
      # the preceding or following whitespace from elements that have some text
      $("//*[contains(concat(' ', @class, ' '), ' mvPhoneOptions ')]//*[contains(concat(' ', @class, ' '), ' Shopping_Bag_content ')]/text()[normalize-space(.) = '']") {
        remove()
      }
      
      
    }
    
    
    #For part of price pay by gift card
    #express checkout doesn't has gift card options, unless edit payment method
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#expressCheckoutSummary"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[@id = 'expressCheckoutSummary'])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Formatting::WrapElement
      #[["selector", ".orderSummaryTotalCell2"], ["class_name", "mvSummaryTotal"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' orderSummaryTotalCell2 ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvSummaryTotal")
            move_here("//*[contains(concat(' ', @class, ' '), ' orderSummaryTotalCell2 ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
    }
    
    
    #shipmentReview
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "form[name=\"shipmentReview\"]"], ["negate", ""]]
    $("(//form[@name = \"shipmentReview\"])[1]") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", "#mcyCheckoutMainContent .checkoutContainer > div:first-of-type"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'mcyCheckoutMainContent']//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]/div[position() = 1]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvDarkGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", ".MultipleShipment_error"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_error ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBox")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".MultipleShipment_price"], ["wrapper_class", "mvItemPriceContainer"], ["sibling_count", "2"]]
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_price ')]") {
        wrap("div") {
          attribute("class", "mvItemPriceContainer")
          move_here("(following-sibling::*)[1]", "bottom")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".MultipleShipment_price"], ["text", "Price: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_price ')]") {
        inner() {
          prepend("Price: ")
        }
      }
      
      
      #
      #setinner html or set innertext inside .MultipleShipment_qty will lost qty.
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvQtyLabel\">Qty. </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".MultipleShipment_qty"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_qty ')]") {
        inject_before("<span class=\"mvQtyLabel\">Qty. </span>")
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".MultipleShipment_total"], ["text", "Total: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_total ')]") {
        inner() {
          prepend("Total: ")
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".MultipleShipment_dashedLine + div, .MultipleShipment_clickcontinueforpayment, .MultipleShipment_dashedLine, .spacer, .MultipleShipment_dashedLineBottom, .mvHideElement + br, #checkoutSummary > div > br"]]
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_dashedLine ')]/following-sibling::*[1]/self::div") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_clickcontinueforpayment ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_dashedLine ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' spacer ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_dashedLineBottom ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvHideElement ')]/following-sibling::*[1]/self::br") {
        remove()
      }
      $("//*[@id = 'checkoutSummary']/div/br") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRegistryItemStart"], ["selector", ".MultipleShipment_error > .row"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".shippingDetails_registrantAddress_giftIcon"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_error ')]/*[contains(concat(' ', @class, ' '), ' row ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' shippingDetails_registrantAddress_giftIcon ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                set("mvRegistryItemStart")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvRegistryItemStart"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRegistryItemStart ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBonusReviewRow"], ["selector", ".MultipleShipment_error > .row"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".promoPrice"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' MultipleShipment_error ')]/*[contains(concat(' ', @class, ' '), ' row ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' promoPrice ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                append(" mvBonusReviewRow")
            }
          }
            }
        }
      }
      
      
    }
    
    
    #Edit Billing content
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".Edit_Billing_content"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' Edit_Billing_content ')])[1]") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvEditBillRow"], ["selector", ".Edit_Billing_content"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' Edit_Billing_content ')]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                append(" mvEditBillRow")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#billingAddress > br"]]
      $("//*[@id = 'billingAddress']/br") {
        remove()
      }
      
      
    }
    
    
    #Review your order
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#checkoutSummary"], ["negate", ""]]
    $("(//*[@id = 'checkoutSummary'])[1]") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".OrderReview_virtualShipment"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_virtualShipment ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvDarkGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapTextChildren
      #[["selector", ".checkoutContainer.contInfo"], ["tag_name", "div"], ["class_name", "mvPadding0510"], ["multiple", "true"], ["split_delimiter", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' contInfo ')]") {
        wrap_text_children("div", class: 'mvPadding0510')
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#checkoutSummary > br, .mvDarkGrayBar > br, .mvDarkGrayBar > .clearboth, #masterTable, .checkoutContainer.BillInfo > div:first-of-type, .OrderReview_items > .spacer,.OrderReview_items .OrderReview_dashedLineBottom, .checkoutContainer.contInfo > div:first-of-type, #mcyCheckoutMainContent > .clearboth, #mcyCheckoutMainContent > .spacer, .checkoutContainer.contInfo br"]]
      $("//*[@id = 'checkoutSummary']/br") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]/br") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]/*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
        remove()
      }
      $("//*[@id = 'masterTable']") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' BillInfo ')]/div[position() = 1]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_items ')]/*[contains(concat(' ', @class, ' '), ' spacer ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_items ')]//*[contains(concat(' ', @class, ' '), ' OrderReview_dashedLineBottom ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' contInfo ')]/div[position() = 1]") {
        remove()
      }
      $("//*[@id = 'mcyCheckoutMainContent']/*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
        remove()
      }
      $("//*[@id = 'mcyCheckoutMainContent']/*[contains(concat(' ', @class, ' '), ' spacer ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' contInfo ')]//br") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", ".OrderReview_items"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_items ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBox")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".OrderReview_price"], ["wrapper_class", "mvReviewItemPriceContainer"], ["sibling_count", "2"]]
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_price ')]") {
        wrap("div") {
          attribute("class", "mvReviewItemPriceContainer")
          move_here("(following-sibling::*)[1]", "bottom")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Total: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".OrderReview_total > strong"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_total ')]/strong") {
        inject_before("<span>Total: </span>")
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".OrderReview_price"], ["text", "Price: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_price ')]") {
        inner() {
          prepend("Price: ")
        }
      }
      
      
      #
      #setinner html or set innertext inside .MultipleShipment_qty will lost qty.
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvQtyLabel\">Qty. </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".OrderReview_qty"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_qty ')]") {
        inject_before("<span class=\"mvQtyLabel\">Qty. </span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvOrderReviewBtn"], ["selector", ".OrderReview_buttons"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_buttons ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvOrderReviewBtn")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".mvOrderReviewBtn"], ["after_me", "#mcyCheckoutPricingSummary"], ["map_multiple", ""]]
      $("(//*[@id = 'mcyCheckoutPricingSummary'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvOrderReviewBtn ')])[1]", "after")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvOverviewRegistryItem"], ["selector", ".OrderReview_items > .row"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".shippingDetails_registrantAddress_giftIcon"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_items ')]/*[contains(concat(' ', @class, ' '), ' row ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' shippingDetails_registrantAddress_giftIcon ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                set("mvOverviewRegistryItem")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvOverviewRegistryItem"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvOverviewRegistryItem ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "div[style=\"CLEAR: both\"]"]]
      $("//div[@style = \"CLEAR: both\"]") {
        remove()
      }
      
      
      #Review order for single shipping address
      #this include express checkout, checkout as guest, single shipping address for checkout
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", ".checkoutContainer.shipAddr"], ["negate", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')])[1]") {
      
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvPromoteWrap"], ["selector", "#promoToRemove"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'promoToRemove']") {
          match($done, "no") {
            $("..") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvPromoteWrap")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::MoveBefore
        #[["move_me", ".mvPromoteWrap"], ["before_me", "#expressCheckoutSummary"], ["map_moves", ""]]
        $("(//*[@id = 'expressCheckoutSummary'])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' mvPromoteWrap ')])[1]", "before")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "id"], ["value", "mvSingleShipping"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//body") {
          match($done, "no") {
              var("done", "yes")
            attribute("id") {
              value() {
                  set("mvSingleShipping")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".checkoutContainer.shipMeth > h2, .checkoutContainer.shipMeth > h2 + a"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipMeth ')]/h2)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvDarkGrayBar")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipMeth ')]/h2[not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipMeth ')]/h2/following-sibling::*[1]/self::a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipMeth ')]/h2/following-sibling::*[1]/self::a)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvDarkGrayBar")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipMeth ')]/h2[not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipMeth ')]/h2/following-sibling::*[1]/self::a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".checkoutContainer.shipAddr > h2, .checkoutContainer.shipAddr > h2 + a"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/h2)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvDarkGrayBar")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/h2[not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/h2/following-sibling::*[1]/self::a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/h2/following-sibling::*[1]/self::a)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvDarkGrayBar")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/h2[not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/h2/following-sibling::*[1]/self::a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", ".OrderReview_normalShipment"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' OrderReview_normalShipment ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  set("mvShadowBox")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", "h2.withSubText:contains(\"merchandise\"), h2.withSubText:contains(\"merchandise\") + a"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//h2[contains(concat(' ', @class, ' '), ' withSubText ') and contains(., \"merchandise\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvDarkGrayBar")
              move_here("//h2[contains(concat(' ', @class, ' '), ' withSubText ') and contains(., \"merchandise\")][not (@the_wrapper)]", "bottom")
              move_here("//h2[contains(concat(' ', @class, ' '), ' withSubText ') and contains(., \"merchandise\")]/following-sibling::*[1]/self::a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//h2[contains(concat(' ', @class, ' '), ' withSubText ') and contains(., \"merchandise\")]/following-sibling::*[1]/self::a)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvDarkGrayBar")
              move_here("//h2[contains(concat(' ', @class, ' '), ' withSubText ') and contains(., \"merchandise\")][not (@the_wrapper)]", "bottom")
              move_here("//h2[contains(concat(' ', @class, ' '), ' withSubText ') and contains(., \"merchandise\")]/following-sibling::*[1]/self::a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::MoveUp
        #[["move_me", ".checkoutContainer.shipAddr > .mvDarkGrayBar"]]
        $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
          move_to("..", "before")
        }
        
        
        #
        #Content::Formatting::MoveUp
        #[["move_me", ".checkoutContainer.shipMeth > .mvDarkGrayBar"]]
        $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipMeth ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
          move_to("..", "before")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvTitle"], ["selector", "form[name=\"ordeReviewForm\"] > h1"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//form[@name = \"ordeReviewForm\"]/h1") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvTitle")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::MoveBefore
        #[["move_me", "form[name=\"ordeReviewForm\"] > h1"], ["before_me", "#checkoutSummary"], ["map_moves", ""]]
        $("(//*[@id = 'checkoutSummary'])[1]") {
          move_here("(//form[@name = \"ordeReviewForm\"]/h1)[1]", "before")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRegistryItemStart"], ["selector", ".row"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".shippingDetails_registrantAddress_giftIcon"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' row ')]") {
          match($done, "no") {
              var("conditional", "false")
                $(".//*[contains(concat(' ', @class, ' '), ' shippingDetails_registrantAddress_giftIcon ')]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
            attribute("class") {
              value() {
                  set("mvRegistryItemStart")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Formatting::MoveUp
        #[["move_me", ".mvRegistryItemStart"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvRegistryItemStart ')]") {
          move_to("..", "before")
        }
        
        
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding10"], ["selector", ".checkoutContainer.BillInfo .headerEditLink + div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' BillInfo ')]//*[contains(concat(' ', @class, ' '), ' headerEditLink ')]/following-sibling::*[1]/self::div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvPadding10")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".checkoutContainer.BillInfo  h2, .checkoutContainer.shipAddr > h1"], ["wrapper_class", "mvDarkGrayBar"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' BillInfo ')]//h2") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' shipAddr ')]/h1") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".checkoutContainer.contInfo > h2.withSubText"], ["tag_name", "div"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' contInfo ')]/h2[contains(concat(' ', @class, ' '), ' withSubText ')]") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
        }
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".OrderReview_giftOptions"], ["after_me", ".OrderReview_shippingOptions"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_shippingOptions ')]") {
        var("counter") {
          append("a")
        }
        attribute("id2433", $counter)
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_giftOptions ')]") {
        var("counter") {
          append("a")
        }
        var("xpath") {
          set("//*[@id2433 = '")
          append($counter)
          append("']")
        }
        move_to($xpath, "after")
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".OrderReview_shippingDetails, .OrderReview_shippingOptions, .OrderReview_giftOptions"], ["tag_name", "div"], ["class_name", "mvLightGrayBox"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_shippingDetails ')]") {
        wrap("div") {
          attribute("class", "mvLightGrayBox")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_shippingOptions ')]") {
        wrap("div") {
          attribute("class", "mvLightGrayBox")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_giftOptions ')]") {
        wrap("div") {
          attribute("class", "mvLightGrayBox")
        }
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", ".checkoutContainer.contInfo > a.headerEditLink"], ["to_end_of_me", ".checkoutContainer.contInfo > div:first-of-type"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' contInfo ')]/div[position() = 1])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' checkoutContainer ') and contains(concat(' ', @class, ' '), ' contInfo ')]/a[contains(concat(' ', @class, ' '), ' headerEditLink ')])[1]", "bottom")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvHideElement + br, .mvRemoveElement, .OrderReview_giftOptions > div + br"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvHideElement ')]/following-sibling::*[1]/self::br") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' OrderReview_giftOptions ')]/div/following-sibling::*[1]/self::br") {
        remove()
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", ".headerEditLink, .mvPromoteWrap"]]
      $("//*[contains(concat(' ', @class, ' '), ' headerEditLink ')]") {
        attribute("style") {
          remove()
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvPromoteWrap ')]") {
        attribute("style") {
          remove()
        }
      }
      
      
      #Express checkout
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvExpressCheckoutForm"], ["selector", "form[name=\"ordeReviewForm\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "#expressCheckoutSummary"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//form[@name = \"ordeReviewForm\"]") {
          match($done, "no") {
              var("conditional", "false")
                $(".//*[@id = 'expressCheckoutSummary']") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvExpressCheckoutForm")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", "#expressCheckoutSummary .orderSummaryTotalCell2"], ["class_name", "mvSummaryTotal"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[@id = 'expressCheckoutSummary']//*[contains(concat(' ', @class, ' '), ' orderSummaryTotalCell2 ')])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvSummaryTotal")
              move_here("//*[@id = 'expressCheckoutSummary']//*[contains(concat(' ', @class, ' '), ' orderSummaryTotalCell2 ')][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    }
    
    
    #remove style properly
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::CSS::RemoveStyleProperty
      #[["property_name", "margin"], ["selector", "div, span, p, a"]]
      $("//div[@style]") {
        attribute("style") {
          value() {
            replace(/margin[^;]+(;|$)/, "")
          }
        }
      }
      $("//span[@style]") {
        attribute("style") {
          value() {
            replace(/margin[^;]+(;|$)/, "")
          }
        }
      }
      $("//p[@style]") {
        attribute("style") {
          value() {
            replace(/margin[^;]+(;|$)/, "")
          }
        }
      }
      $("//a[@style]") {
        attribute("style") {
          value() {
            replace(/margin[^;]+(;|$)/, "")
          }
        }
      }
      
      
      #
      #Content::CSS::RemoveStyleProperty
      #[["property_name", "padding"], ["selector", "div, span, p, a"]]
      $("//div[@style]") {
        attribute("style") {
          value() {
            replace(/padding[^;]+(;|$)/, "")
          }
        }
      }
      $("//span[@style]") {
        attribute("style") {
          value() {
            replace(/padding[^;]+(;|$)/, "")
          }
        }
      }
      $("//p[@style]") {
        attribute("style") {
          value() {
            replace(/padding[^;]+(;|$)/, "")
          }
        }
      }
      $("//a[@style]") {
        attribute("style") {
          value() {
            replace(/padding[^;]+(;|$)/, "")
          }
        }
      }
      
      
      #
      #Content::CSS::RemoveStyleProperty
      #[["property_name", "WIDTH"], ["selector", "div, span, p, a"]]
      $("//div[@style]") {
        attribute("style") {
          value() {
            replace(/WIDTH[^;]+(;|$)/, "")
          }
        }
      }
      $("//span[@style]") {
        attribute("style") {
          value() {
            replace(/WIDTH[^;]+(;|$)/, "")
          }
        }
      }
      $("//p[@style]") {
        attribute("style") {
          value() {
            replace(/WIDTH[^;]+(;|$)/, "")
          }
        }
      }
      $("//a[@style]") {
        attribute("style") {
          value() {
            replace(/WIDTH[^;]+(;|$)/, "")
          }
        }
      }
      
      
      #
      #Content::CSS::RemoveStyleProperty
      #[["property_name", "float"], ["selector", "div, span, p, a"]]
      $("//div[@style]") {
        attribute("style") {
          value() {
            replace(/float[^;]+(;|$)/, "")
          }
        }
      }
      $("//span[@style]") {
        attribute("style") {
          value() {
            replace(/float[^;]+(;|$)/, "")
          }
        }
      }
      $("//p[@style]") {
        attribute("style") {
          value() {
            replace(/float[^;]+(;|$)/, "")
          }
        }
      }
      $("//a[@style]") {
        attribute("style") {
          value() {
            replace(/float[^;]+(;|$)/, "")
          }
        }
      }
      
      
      #
      #Content::CSS::RemoveStyleProperty
      #[["property_name", "FLOAT"], ["selector", "div, span, p, a"]]
      $("//div[@style]") {
        attribute("style") {
          value() {
            replace(/FLOAT[^;]+(;|$)/, "")
          }
        }
      }
      $("//span[@style]") {
        attribute("style") {
          value() {
            replace(/FLOAT[^;]+(;|$)/, "")
          }
        }
      }
      $("//p[@style]") {
        attribute("style") {
          value() {
            replace(/FLOAT[^;]+(;|$)/, "")
          }
        }
      }
      $("//a[@style]") {
        attribute("style") {
          value() {
            replace(/FLOAT[^;]+(;|$)/, "")
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "width"], ["selector", "div, span"]]
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
      #Content::CSS::RemoveStyles
      #[["selector", ".checkoutContainer"]]
      $("//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::CSS::RemoveStyleProperty
      #[["property_name", "width"], ["selector", "div, span, p, a"]]
      $("//div[@style]") {
        attribute("style") {
          value() {
            replace(/width[^;]+(;|$)/, "")
          }
        }
      }
      $("//span[@style]") {
        attribute("style") {
          value() {
            replace(/width[^;]+(;|$)/, "")
          }
        }
      }
      $("//p[@style]") {
        attribute("style") {
          value() {
            replace(/width[^;]+(;|$)/, "")
          }
        }
      }
      $("//a[@style]") {
        attribute("style") {
          value() {
            replace(/width[^;]+(;|$)/, "")
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "align"], ["selector", "div, span"]]
      $("//div") {
        attribute("align") {
          remove()
        }
      }
      $("//span") {
        attribute("align") {
          remove()
        }
      }
      
      
    # end BasicGroup
    
    #replace image buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueCheckout2.png"], ["selector", "#bag_buttons img[alt=\"CONTINUE\"], #bag_buttons img[alt=\"CONTINUE CHECKOUT\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'bag_buttons']//img[@alt = \"CONTINUE\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueCheckout2.png")
        attribute('src', asset('buttons/continueCheckout2.png', 'image'))
      }
      $("//*[@id = 'bag_buttons']//img[@alt = \"CONTINUE CHECKOUT\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueCheckout2.png")
        attribute('src', asset('buttons/continueCheckout2.png', 'image'))
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/saveContiuneBtn.png"], ["selector", "#bag_buttons img[alt=\"SAVE & CONTINUE\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'bag_buttons']//img[@alt = \"SAVE & CONTINUE\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/saveContiuneBtn.png")
        attribute('src', asset('buttons/saveContinue.png', 'image'))
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/applyBtn.png"], ["selector", "#applyButton"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'applyButton']") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/applyBtn.png")
        attribute('src', asset('buttons/apply.png', 'image'))
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/applyBtn.png"], ["selector", "img[alt=\"Apply\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[@alt = \"Apply\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/applyBtn.png")
        attribute('src', asset('buttons/apply.png', 'image'))
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/placeOrderBtn.png"], ["selector", "img[alt=\"PLACE ORDER\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[@alt = \"PLACE ORDER\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/placeOrderBtn.png")
        attribute('src', asset('buttons/placeOrder.png', 'image'))
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/onestepbackBtn2.png"], ["selector", "img[alt=\"BACK ONE STEP\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[@alt = \"BACK ONE STEP\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/onestepbackBtn2.png")
        attribute('src', asset('buttons/onestepback2.png', 'image'))
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".shortSpacer,  div[style*=\"BORDER-BOTTOM:\"], #billingAddress >  div > br, .billing_style3 > .row > br"]]
    $("//*[contains(concat(' ', @class, ' '), ' shortSpacer ')]") {
      remove()
    }
    $("//div[contains(@style, \"BORDER-BOTTOM:\")]") {
      remove()
    }
    $("//*[@id = 'billingAddress']/div/br") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' billing_style3 ')]/*[contains(concat(' ', @class, ' '), ' row ')]/br") {
      remove()
    }
    
    
    #Shipping Items Popup
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", "#viewShipmentItems .checkoutContainer .itemSelection"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'viewShipmentItems']//*[contains(concat(' ', @class, ' '), ' checkoutContainer ')]//*[contains(concat(' ', @class, ' '), ' itemSelection ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvShadowBottom")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRegistryRow"], ["selector", "#viewShipmentItems_c .row"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "img[alt=\"RegistryIcon\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'viewShipmentItems_c']//*[contains(concat(' ', @class, ' '), ' row ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//img[@alt = \"RegistryIcon\"]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvRegistryRow")
            }
          }
            }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", "#bag_buttons"], ["to_end_of_me", "form"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//form)[1]") {
      move_here("(//*[@id = 'bag_buttons'])[1]", "bottom")
    }
    
    
    #move input inside the from
    #For fixed move selected item to different shipping address
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#macysGlobalLayout > input[name=\"_eventId\"]"], ["after_me", "form[name=\"shipmentReview\"] > #bag_buttons"], ["map_multiple", ""]]
      $("(//form[@name = \"shipmentReview\"]/*[@id = 'bag_buttons'])[1]") {
        move_here("(//*[@id = 'macysGlobalLayout']/input[@name = \"_eventId\"])[1]", "after")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#macysGlobalLayout > input[name=\"shipmentNickName\"]"], ["after_me", "form[name=\"shipmentReview\"] > #bag_buttons"], ["map_multiple", ""]]
      $("(//form[@name = \"shipmentReview\"]/*[@id = 'bag_buttons'])[1]") {
        move_here("(//*[@id = 'macysGlobalLayout']/input[@name = \"shipmentNickName\"])[1]", "after")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#macysGlobalLayout > input[name=\"shipmentNumber\"]"], ["after_me", "form[name=\"shipmentReview\"] > #bag_buttons"], ["map_multiple", ""]]
      $("(//form[@name = \"shipmentReview\"]/*[@id = 'bag_buttons'])[1]") {
        move_here("(//*[@id = 'macysGlobalLayout']/input[@name = \"shipmentNumber\"])[1]", "after")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#macysGlobalLayout > input[name=\"execution\"]"], ["after_me", "form[name=\"shipmentReview\"] > #bag_buttons"], ["map_multiple", ""]]
      $("(//form[@name = \"shipmentReview\"]/*[@id = 'bag_buttons'])[1]") {
        move_here("(//*[@id = 'macysGlobalLayout']/input[@name = \"execution\"])[1]", "after")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#macysGlobalLayout > input[name=\"moveFromShipment\"]"], ["after_me", "form[name=\"shipmentReview\"] > #bag_buttons"], ["map_multiple", ""]]
      $("(//form[@name = \"shipmentReview\"]/*[@id = 'bag_buttons'])[1]") {
        move_here("(//*[@id = 'macysGlobalLayout']/input[@name = \"moveFromShipment\"])[1]", "after")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#macysGlobalLayout > input[name=\"moveToShipment\"]"], ["after_me", "form[name=\"shipmentReview\"] > #bag_buttons"], ["map_multiple", ""]]
      $("(//form[@name = \"shipmentReview\"]/*[@id = 'bag_buttons'])[1]") {
        move_here("(//*[@id = 'macysGlobalLayout']/input[@name = \"moveToShipment\"])[1]", "after")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Passthrough::Attribute
    #[["selector", ".Shopping_Bag_giftCard_image > img"], ["attribute", "src"], ["regex_capture", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' Shopping_Bag_giftCard_image ')]/img") {
      attribute("src") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
    #Popup window close btn
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCloseBtn"], ["selector", "a:contains(\"close\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[contains(., \"close\")]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCloseBtn")
          }
        }
        }
      }
    }
    
    
    #Estimated Tax
    #Group::URLMatcherGroup
    #[["url_matcher", "(\\/estimatedTax\\/content\\.jsp)|(\\/checkout\\/estimatedtax\\.jsp)"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /(\/estimatedTax\/content\.jsp)|(\/checkout\/estimatedtax\.jsp)/) {
    
      #
      #Content::Formatting::RemoveElements
      #[["selector", "br"]]
      $("//br") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "mvEstimatedTax"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvEstimatedTax")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPopupTitle"], ["selector", "img[alt=\"Estimated Tax\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@alt = \"Estimated Tax\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPopupTitle")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvPopupTitle"], ["html", "<div>Estimated Tax</div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvPopupTitle ')]") {
        inner("<div>Estimated Tax</div>")
      }
      
      
    }
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "href"], ["value", "/"], ["selector", "#globalMastheadLogo a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'globalMastheadLogo']//a") {
      match($done, "no") {
          var("done", "yes")
        attribute("href") {
          value() {
              set("/")
          }
        }
      }
    }
    
    
    #
    #This help #checkoutSummary > div only show when it has content
    #Content::Formatting::WrapTextChildren
    #[["selector", "#checkoutSummary > div"], ["tag_name", "div"], ["class_name", ""], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[@id = 'checkoutSummary']/div)[1]") {
      wrap_text_children("div")
    }
    
    
  }
  
  
  #receipt page
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "input[name=\"KEYWORD_GO_BUTTON\"]"], ["negate", ""]]
  $("(//input[@name = \"KEYWORD_GO_BUTTON\"])[1]") {
  
     # Add page specific class
       $("//html/body") {
            add_class("mw_receipt")
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTitle"], ["selector", "h1"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//h1") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvTitle")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "h1"], ["before_me", "#bd"], ["map_moves", ""]]
    $("(//*[@id = 'bd'])[1]") {
      move_here("(//h1)[1]", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "img[alt=\"PRINT PAGE\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"PRINT PAGE\"]") {
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
    #[["selector", ".mvRemoveElement, .tabHolder.activeTab,.colHeader, div[style=\" clear:both;\"], #checkoutConfirmation > br"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' tabHolder ') and contains(concat(' ', @class, ' '), ' activeTab ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' colHeader ')]") {
      remove()
    }
    $("//div[@style = \" clear:both;\"]") {
      remove()
    }
    $("//*[@id = 'checkoutConfirmation']/br") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", "#checkoutConfirmation > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "strong"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'checkoutConfirmation']") {
      $("div/div/strong/..") {
        add_class("mvShadowBottom")
      }

      $("div/div[contains(@class,'lty_rewards')]"){
        $(".//img[@id='printOfferLink']/..|div[@id='printPageOnlyExclusions']"){
          remove()
        }
        add_class("mvShadowBottom")

      }
      #create profile while guest checkout
      $("div/form[@name='quickRegistration']"){
        $("div/div[1]"){
          add_class("mvSubTitle")
        }
        $("div/div[2]"){
          add_class("mvPadding10")
        }
        $("div/div[@id='confirmPageCreateProfile']") {
            $("div/div"){
             
              $(".//input[@value='QUCIKREGISTER_BUTTON']"){
                 attribute('src', asset('buttons/createProfile.png', 'image'))
                 $(".."){ 
                   name("div")
                   add_class("mvPadding10")
                   }
              }
              add_class("mvNewProfileRow")
              $(".//span[@id='myContextEl']/.."){
                remove()
              }
               $("span[3]"){
                  name("div")
                  add_class("mvPadding0510")
                }
              
              $(".//input[@type='text']|.//input[@type='password']"){
                add_class("mvNewProfileInput")
              }
            }
            
        }
      }
    }

    
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvErrorBox"], ["selector", "#checkoutConfirmation > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".generalError.errorText"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'checkoutConfirmation']/div/div") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' generalError ') and contains(concat(' ', @class, ' '), ' errorText ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvErrorBox")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShippingContainer"], ["selector", "#checkoutConfirmation > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "h2"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'checkoutConfirmation']/div/div") {
      match($done, "no") {
          var("conditional", "false")
            $(".//h2") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvShippingContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", "h2"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//h2") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvDarkGrayBar")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", ".mvShippingContainer > .mvDarkGrayBar ~ div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvShippingContainer ')]/*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]/following-sibling::div") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvShadowBottom")
          }
        }
      }
    }
    
    
   
     
    #each item
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvItemData"], ["selector", "#masterTable > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "img[src*=\"products\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'masterTable']") {
        $("../preceding-sibling::div") {
           add_class("mvShadowBottom")
         }
        $("../../following-sibling::div"){
          add_class("mvPadding0510")
        }
        $("div"){
          match($done, "no") {
            var("conditional", "false")
            $(".//img[contains(@src, \"products\")]") {
              var("conditional", "true")
            }
            match($conditional, "true") {
              attribute("class") {
                value() {
                  set("mvItemData")
                }
              }
            }
          }
        }
      }


      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".mvItemData > span:first-of-type"], ["wrapper_class", "mvItemContent"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvItemData ')]/span[position() = 1]") {
        wrap("div") {
          attribute("class", "mvItemContent")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvItemContent"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvItemContent ')]") {
        move_to("..", "before")
      }
      
     
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".mvItemData > span:nth-of-type(2)"], ["text", "Price: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' mvItemData ')]/span[position() = 2]") {
        inner() {
          prepend("Price: ")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".mvItemData > span:nth-of-type(3)"], ["text", "Qty: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' mvItemData ')]/span[position() = 3]") {
        inner() {
          prepend("Qty: ")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".mvItemData > span:nth-of-type(4)"], ["text", "Toal: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' mvItemData ')]/span[position() = 4]") {
        inner() {
          prepend("Toal: ")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".mvItemData > span:nth-of-type(1)"], ["text", "Gift Box: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' mvItemData ')]/span[position() = 1]") {
        inner() {
          prepend("Gift Box: ")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRegistryItemStart"], ["selector", ".shippingDetails_registrantAddress_giftIcon"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_registrantAddress_giftIcon ')]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvRegistryItemStart")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPriceTotal"], ["selector", "span[bgcolor=\"#EAEAEA\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//span[@bgcolor = \"#EAEAEA\"]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvPriceTotal")
            }
          }
          }
        }
      }
      $("//*[@id = 'masterTable']") {
        $("div[contains(@class, 'mvItemContent')]") {
          wrap("div", class: "mvShadowBox")
        }
        $("div[contains(@class, 'mvItemData')]") {
          move_to("preceding-sibling::div[@class='mvShadowBox'][1]", "bottom")
        }
       
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRedFont"], ["selector", "div[style*=\"color:#CC0000;\"],span[style*=\"color:#CC0000;\"],div[style*=\"color:#cc0000;\"],span[style*=\"color:#cc0000;\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//div[contains(@style, \"color:#CC0000;\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvRedFont")
            }
          }
        }
      }
      $("//span[contains(@style, \"color:#CC0000;\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvRedFont")
            }
          }
        }
      }
      $("//div[contains(@style, \"color:#cc0000;\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvRedFont")
            }
          }
        }
      }
      $("//span[contains(@style, \"color:#cc0000;\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvRedFont")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvOrderSummary"], ["selector", ".mvPriceTotal"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvPriceTotal ')]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvOrderSummary")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveEmptyElements
      #[["selector", "#masterTable ~ div"]]
      $("//*[@id = 'masterTable']/following-sibling::div[not(descendant::*)]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", "#masterTable ~ div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'masterTable']/following-sibling::div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvShadowBottom")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPricRow"], ["selector", ".mvOrderSummary > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvOrderSummary ')]/div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvPricRow")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBottom"], ["selector", ".mvShippingContainer + div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvShippingContainer ')]/following-sibling::*[1]/self::div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvShadowBottom")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "align"], ["selector", "div, span"]]
      $("//div") {
        attribute("align") {
          remove()
        }
      }
      $("//span") {
        attribute("align") {
          remove()
        }
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
      #Content::Formatting::RemoveAttribute
      #[["attribute", "width"], ["selector", "div, span"]]
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
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvShippingContainer + div > br"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvShippingContainer ')]/following-sibling::*[1]/self::div/br") {
      remove()
    }
    
    
  }
  
  
}
