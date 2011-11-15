# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts
$("//html/body"){
 add_class("mvCartBag") 
}
  #fixing old regex so that i can remove extra html() scope
  $("//a"){
    attribute("href") {
       value() {
         replace(/javascript:pop\('(http.+?com\/)/) {
           replace($1, "/")
         }
      }
    }

  }
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvWasTable"], ["selector", "table"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//table") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvWasTable")
        }
      }
    }
  }

  #
  #Content::Formatting::RemoveElements
  #[["selector", ".ch_bag_right"]]
  $("//*[contains(concat(' ', @class, ' '), ' ch_bag_right ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".ch_itemsHeaderContainer"]]
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemsHeaderContainer ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::Dynamic::Accordian2
  #[["link_selector", ".ch_bag_padding > div:first-of-type"], ["content_selector", "ch_bag_input_container"]]
  var("counter", "")
  $("//ch_bag_input_container") {
    # assign id if it doesn't exist
    var("id", fetch("./@id"))
    match($id, /^$/) {
      attribute("id") {
        value() {
          set("acc_con")
          append($counter)
          append("accordian72780")
        }
      }
    }
    var("counter") {
      append("a")
    }
    var($counter, fetch("./@id"))
    attribute("style") {
      value() {
        append(";display: none;")
      }
    }
  }
  var("counter", "")
  $("//*[contains(concat(' ', @class, ' '), ' ch_bag_padding ')]/div[position() = 1]") {
    var("id", fetch("./@id"))
    match($id, /^$/) {
      attribute("id") {
        value() {
          set("acc_link")
          append($counter)
          append("accordian72780")
        }
      }
    }
    var("id", fetch("./@id"))
    var("counter") {
      append("a")
    }
    attribute("onclick") {
      value() {
        set("moovweb_toggle_accordian('")
        append($id)
        append("', '")
        append(var($counter))
        append("')")
      }
    }
  }
  
  
  #
  #Content::Formatting::MoveUp
  #[["move_me", ".ch_itemDescr > a"]]
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemDescr ')]/a") {
    move_to("..", "before")
  }
  
  
  #brown bag header
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    $("(//*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')])[1]") {
      $myAsset = concat("<div id=\"mvBrownBagImg\"><img src=\"", asset("/images/yourBrownBag.png"), "\"></div>")
      inject_before($myAsset)
    }
    
    
  # end BasicGroup
  
  #various Buttons
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #Continu Shopping Button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<a id=\"mvContinuShopping\" href=\"http://www1.bloomingdales.moov1.com/index.ognc\">Continue Shopping</a>"], ["add_after", ""], ["multiple", ""], ["add_before", "#myBagLink"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      #$("(//*[@id = 'myBagLink'])[1]") {
      #  inject_before("<a id=\"mvContinuShopping\" href=\"http://www1.bloomingdales.moov1.com/index.ognc\">Continue Shopping</a>")
      #}
      
      
    # end BasicGroup
    
    #merge bag button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "src"], ["selector", "input[name=\"ADD_TO_BAG_BUTTON_CHECKOUT2\"]"]]
      $("//input[@name = \"ADD_TO_BAG_BUTTON_CHECKOUT2\"]") {
        attribute("src") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"ADD_TO_BAG_BUTTON_CHECKOUT2\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"ADD_TO_BAG_BUTTON_CHECKOUT2\"]") {
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
      #[["attribute", "class"], ["value", "mvButton mvAddToCurrentBag"], ["selector", "input[name=\"ADD_TO_BAG_BUTTON_CHECKOUT2\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"ADD_TO_BAG_BUTTON_CHECKOUT2\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvAddToCurrentBag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "add to current bag"], ["selector", "input[name=\"ADD_TO_BAG_BUTTON_CHECKOUT2\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"ADD_TO_BAG_BUTTON_CHECKOUT2\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("add to current bag")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #checkout buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".ch_bag_buttonsLeft"]]
      $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonsLeft ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Continue Checkout"], ["selector", "[name=\"CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"CHECKOUT_BUTTON\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Continue Checkout")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Express Checkout"], ["selector", "[name=\"EXPRESS_CHECKOUT_BUTTON_CHECKOUT2\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"EXPRESS_CHECKOUT_BUTTON_CHECKOUT2\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Express Checkout")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "moovCheckoutButton"], ["selector", "*[name*=\"CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(@name, \"CHECKOUT_BUTTON\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("moovCheckoutButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "type"], ["selector", ".moovCheckoutButton"]]
      $("//*[contains(concat(' ', @class, ' '), ' moovCheckoutButton ')]") {
        attribute("type") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "src"], ["selector", ".moovCheckoutButton"]]
      $("//*[contains(concat(' ', @class, ' '), ' moovCheckoutButton ')]") {
        attribute("src") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "[name=\"CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"CHECKOUT_BUTTON\"]") {
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
      #[["attribute", "type"], ["value", "submit"], ["selector", "[name=\"EXPRESS_CHECKOUT_BUTTON_CHECKOUT2\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"EXPRESS_CHECKOUT_BUTTON_CHECKOUT2\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("type") {
            value() {
                set("submit")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  # end BasicGroup
  
  #
  #Content::Formatting::WrapTextChildren
  #[["selector", ".ch_itemDescr"], ["tag_name", "span"], ["class_name", ""], ["multiple", "true"], ["split_delimiter", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemDescr ')]") {
    wrap_text_children("span")
  }
  
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".ch_bag_padding > div:first-of-type"], ["text", "Promo Code(s)"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[contains(concat(' ', @class, ' '), ' ch_bag_padding ')]/div[position() = 1]") {
    inner() {
      set("Promo Code(s)")
    }
  }
  
  
  #
  #Content::Formatting::RemoveWhiteSpace
  #[["selector", ".ch_bag_input_container"]]
  # NOTE: This will remove text elements that are whitespace only, but it will not remove
  # the preceding or following whitespace from elements that have some text
  $("//*[contains(concat(' ', @class, ' '), ' ch_bag_input_container ')]/text()[normalize-space(.) = '']") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".bl_apply_button img"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_apply_button ')]//img") {
    remove()
  }
  
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".bl_apply_button a"], ["text", "Apply"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[contains(concat(' ', @class, ' '), ' bl_apply_button ')]//a") {
    inner() {
      set("Apply")
    }
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<div id=\"moovOrderSummary\">order summary</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".ch_bag_orderTotalsBottom"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' ch_bag_orderTotalsBottom ')])[1]") {
    inject_before("<div id=\"moovOrderSummary\">order summary</div>")
  }
  
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", ".ch_itemSummary > .ch_itemDescr > .ch_standardBold:first-of-type"], ["to_beginning_of_me", ".ch_itemSummary"], ["map_multiple", "true"], ["ancestor_selector", ".ch_itemsInfoItem"]]
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoItem ')]") {
    $("(.//*[contains(concat(' ', @class, ' '), ' ch_itemSummary ')])[1]") {
      move_here("(.//*[contains(concat(' ', @class, ' '), ' ch_itemSummary ')]/*[contains(concat(' ', @class, ' '), ' ch_itemDescr ')]/*[contains(concat(' ', @class, ' '), ' ch_standardBold ') and position() = 1])[1]", "top")
    }
  }
  
  
  #pink text
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".ch_itemShipInfo"], ["tag_name", "span"], ["class_name", ""], ["multiple", "true"], ["split_delimiter", " "]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_itemShipInfo ')]") {
      wrap_text_children("span")
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".ch_itemsInfoQty"], ["after_me", ".ch_itemDescr"], ["map_multiple", "true"]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' ch_itemDescr ')]") {
      var("counter") {
        append("a")
      }
      attribute("id3630", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoQty ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id3630 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "after")
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveToEndOf
  #[["move_me", ".ch_itemsInfoQty"], ["to_end_of_me", ".ch_itemDescr"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemDescr ')]") {
    var("counter") {
      append("a")
    }
    attribute("id9813", $counter)
  }
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoQty ')]") {
    var("counter") {
      append("a")
    }
    var("xpath") {
      set("//*[@id9813 = '")
      append($counter)
      append("']")
    }
    move_to($xpath, "bottom")
  }
  
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".ch_itemShipInfo"], ["before_me", ".ch_itemDescr"], ["map_moves", "true"]]
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemDescr ')]") {
    var("counter") {
      append("a")
    }
    attribute("id9571", $counter)
  }
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemShipInfo ')]") {
    var("counter") {
      append("a")
    }
    var("xpath") {
      set("//*[@id9571 = '")
      append($counter)
      append("']")
    }
    move_to("../*[1][self::div[@class='ch_itemDescr']]/span[@class='ch_standardBold']", "after")
    move_to("../div[@class='ch_itemDescr']", "before")
  }
  
  
  #
  #Content::Formatting::MoveToEndOf
  #[["move_me", ".ch_itemRemove"], ["to_end_of_me", ".ch_itemShipInfo"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemShipInfo ')]") {
    var("counter") {
      append("a")
    }
    attribute("id99", $counter)
  }
  var("counter", "a")
  $("//*[contains(concat(' ', @class, ' '), ' ch_itemRemove ')]") {
    var("counter") {
      append("a")
    }
    var("xpath") {
      set("//*[@id99 = '")
      append($counter)
      append("']")
    }
    move_to($xpath, "bottom")
  }
  
  
  #individual product price
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".ch_itemsInfoPrice"], ["tag_name", "div"], ["class_name", "mvProductPrice"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoPrice ')]") {
      wrap("div") {
        attribute("class", "mvProductPrice")
      }
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".ch_itemsInfoTotal"], ["tag_name", "div"], ["class_name", "mvProductPrice"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoTotal ')]") {
      wrap("div") {
        attribute("class", "mvProductPrice")
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvPrice\">Price:</div>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".ch_itemsInfoPrice"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoPrice ')]") {
      inject_before("<div class=\"mvPrice\">Price:</div>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTotal\">Total:</div>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".ch_itemsInfoTotal"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoTotal ')]") {
      inject_before("<div class=\"mvTotal\">Total:</div>")
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", ".ch_errorMsg"], ["after_me", ".ch_bag_subHeader"], ["map_multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' ch_bag_subHeader ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' ch_errorMsg ')])[1]", "after")
  }
  
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<a id=\"mvContinuShopping\" href=\"/index.ognc\">Continue Shopping</a>"], ["add_after", ""], ["multiple", ""], ["add_before", "#myBagLink"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//div[contains(@class, 'bl_nav_top_logo')])[1]") {
    inject_before("<a id=\"mvContinuShopping\" href=\"/index.ognc\">Continue Shopping</a>")
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<span class=\"mvQTYTitle\">Qty: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".ch_bag_areaContainer .ch_itemsInfoQty select"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' ch_bag_areaContainer ')]//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoQty ')][*]") {
    inject_top("<span class=\"mvQTYTitle\">Qty: </span>")
  }
  
  
  #
  #Content::Formatting::MoveAfter
  #[["move_me", ".ch_bag_buttonsContainer"], ["after_me", ".ch_bag_totals"], ["map_multiple", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' ch_bag_totals ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonsContainer ')])[1]", "after")
  }
  
  
  #wrapItemList
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", "form > .ch_sb_brownbag_name"], ["tag_name", "div"], ["class_name", "mvProductSumaryWrap"], ["id", ""], ["multiple", ""]]
    $("//form/*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')]") {
      wrap("div") {
        attribute("class", "mvProductSumaryWrap")
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".ch_bag_subHeader"], ["after_me", ".ch_sb_brownbag_name"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' ch_bag_subHeader ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".ch_errorMsg"], ["after_me", ".ch_bag_subHeader"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' ch_bag_subHeader ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' ch_errorMsg ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", ".ch_bag_areaContainer"], ["to_end_of_me", ".mvProductSumaryWrap"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrap ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' ch_bag_areaContainer ')])[1]", "bottom")
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", "form > .ch_sb_brownbag_name"], ["tag_name", "div"], ["class_name", "mvProductSumaryWrapCurrent"], ["id", ""], ["multiple", ""]]
    $("//form/*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')]") {
      wrap("div") {
        attribute("class", "mvProductSumaryWrapCurrent")
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "form > .ch_bag_areaContainer"], ["after_me", ".mvProductSumaryWrapCurrent .ch_sb_brownbag_name"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrapCurrent ')]//*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')])[1]") {
      move_here("(//form/*[contains(concat(' ', @class, ' '), ' ch_bag_areaContainer ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".mvProductSumaryWrapCurrent + .ch_errorMsg"], ["after_me", ".mvProductSumaryWrapCurrent .ch_sb_brownbag_name"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrapCurrent ')]//*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrapCurrent ')]/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' ch_errorMsg ')])[1]", "after")
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#mvBDSiteMenuHeader"]]
  $("//*[@id = 'mvBDSiteMenuHeader']") {
    remove()
  }
  
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", "#iShip_bagTotal"], ["text", "SUBTOTAL"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[@id = 'iShip_bagTotal']") {
    inner() {
      set("SUBTOTAL")
    }
  }
  
  
  #footer
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvCheckoutFooter\"><ul> <li class=\"mvShopSecure\"><div id=\"mvLockIcon\"></div>Shopping on bloomingdales.com is always safe and secure. Guaranteed. <a href=\"#\">Details</a></li> <li class=\"mvEasyReturns\"><div id=\"mvBoxIcon\"></div>Enjoy easy returns. <a href=\"https://customerservice.bloomingdales.com/app/answers/detail/a_id/354/c/22/theme/popup/#returns\">Details</a></li> <li class=\"mvCustomerService\"><div id=\"mvPhoneIcon\"></div>Customer Service <a href=\"tel:+1-800-777-0000\">1-800-777-0000</a></li> </ul></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_nav_bot_service_container"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container ')])[1]") {
      inject_before("<div class=\"mvCheckoutFooter\"><ul> <li class=\"mvShopSecure\"><div id=\"mvLockIcon\"></div>Shopping on bloomingdales.com is always safe and secure. Guaranteed. <a href=\"https://customerservice.bloomingdales.com/app/answers/detail/a_id/360/theme/popup/?cm_sp=NAVIGATION-_-BOTTOM_LINKS-_-SECURITY\">Details</a></li> <li class=\"mvEasyReturns\"><div id=\"mvBoxIcon\"></div>Enjoy easy returns. <a href=\"https://customerservice.bloomingdales.com/app/answers/detail/a_id/354/c/22/theme/popup/#returns\">Details</a></li> <li class=\"mvCustomerService\"><div id=\"mvPhoneIcon\"></div>Customer Service <a href=\"tel:+1-800-777-0000\">1-800-777-0000</a></li> </ul></div>")
    }

  # end BasicGroup
  
  #checkoutButton
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "checkout"], ["selector", ".ch_bag_buttonsRightContinue input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonsRightContinue ')]//input") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("checkout")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #promoCodeText
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveWhiteSpace
    #[["selector", ".ch_register_bottompad"]]
    # NOTE: This will remove text elements that are whitespace only, but it will not remove
    # the preceding or following whitespace from elements that have some text
    $("//*[contains(concat(' ', @class, ' '), ' ch_register_bottompad ')]/text()[normalize-space(.) = '']") {
      remove()
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvPromoCode\">Enter Code (2)</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "input[name=\"PromoCode2\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//input[@name = \"PromoCode2\"])[1]") {
      inject_before("<div class=\"mvPromoCode\">Enter Code (2)</div>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvPromoCode\">Enter Code (1)</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "input[name=\"PromoCode\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//input[@name = \"PromoCode\"])[1]") {
      inject_before("<div class=\"mvPromoCode\">Enter Code (1)</div>")
    }
    
    
  # end BasicGroup
  
  #popups
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", ".bl_pop table"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop ')]//table" ) {
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
    #[["attribute", "class"], ["value", "mvButton"], ["selector", ".bl_pop_top_contain a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop_top_contain ')]//a") {
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
    #[["selector", ".bl_pop_top_contain a"], ["html", "<span>back</span>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop_top_contain ')]//a") {
      inner("<span>back</span>")
    }
    
    
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "shippingfees"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /shippingfees/) {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvExampleTable"], ["selector", ".F1_S1_C1_T1_W1 > .mvWasTable"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' F1_S1_C1_T1_W1 ')]/*[contains(concat(' ', @class, ' '), ' mvWasTable ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvExampleTable")
            }
          }
        }
      }
      
      # add class to body for popup
      $("//body") {
        add_class("mvShippingCost")
      }

      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", ".mvExampleTable > div > span"], ["selector", "width"]]
      $("//width") {
        attribute(".mvExampleTable > div > span") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvExampleTable > div > span:empty"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvExampleTable ')]/div/span[not (node())]") {
        remove()
      }
      
      
    }
    
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "shippolicy"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /shippolicy/) {
    
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".bl_pop_body"], ["html", "<div class=\"bl_pop_body\"> <a name=\"top\"></a><div class=\"mvShippingHeader\"><img border=\"0\" src=\"https://www.bloomingdales.com/img/headers/header_shippolicy.gif\" alt=\"Shipping Policy\"></div>  <br><div class=\"un_separate\"> <b>In Stock Merchandise</b>  <br>Usually is processed and shipped (in other words, leaves our fulfillment center) within 3 business days. bloomingdales.com will let you know at checkout or by a follow-up message if the merchandise you have selected is not currently in stock or if we need to confirm availability. For that merchandise, we will give you an expected shipping time at checkout. All orders are subject to credit approval. </div> <div class=\"un_separate\"> <b>Jewelry</b>  <br>Jewelry cannot be shipped to P.O. Boxes. These items must be sent to a street address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Standard delivery</b>  <br>We deliver via UPS or a comparable delivery service. We use U.S. Postal Service for PO Boxes, APO and FPO addresses. Items ordered at the same time may not always be shipped together; your delivery charge, however, will be based on the total merchandise amount per address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Free Shipping Policy</b>  <br>We offer free standard shipping everyday for orders over $300* or on orders over $150** if you shop using your Bloomingdale's card. <a href=\"/service/credit/index.ognc\">Apply for a Bloomingdale's card now</a>. </div> <div class=\"un_separate\">*Free standard shipping on orders of $300 or more at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <div class=\"un_separate\">**Free standard shipping on orders of $150 or more when you use your Bloomingdale's card at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <a name=\"costs\"></a><span class=\"mvTitle\">Shipping Fees</span> <br><div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Under $25.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">$6.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">$6.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$25.01 - $50.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$50.01 - $75.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$75.01 - $100.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$100.01 - $149.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$150.00* - $200.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$16.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$200.01 - $299.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$18.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$300.00 and Up</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Premium Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Express Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Shipping to more than one address</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> </div> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Thursday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Friday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Monday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Tuesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> </div>Note: Since the merchandise you order may be filled from several locations, items may arrive separately. You will not incur additional shipping charges under these circumstances. However, when ordering gift items that you wish to have shipped to different addresses, there will be a separate charge for each address.<br><div class=\"un_separate\"> <b>Shipping Surcharges</b>  <br>Based on their size and/or weight, certain items bear a Shipping Surcharge. Shipping Surcharges are shown on product pages before you place an item in your Shopping Bag and will be added into the total shipping costs for your order. </div> <div class=\"un_separate\"> <b>Shipping To Multiple Locations</b>  <br>When you ship items to multiple addresses, we will add $5.00 for each additional address. Orders including only electronic gift cards are not charged the additional fee. </div> <div class=\"un_separate\"> <a name=\"rush\"></a><span class=\"mvTitle\">Rush Delivery</span> <br><span class=\"un_normal\" style=\"color: #C00\">Please Note: We are unable to provide express shipping to P.O. Boxes.</span>  </div> <div class=\"un_separate\"> <b>Premium Delivery</b> - add $7.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br>* Some shipments to Alaska and Hawaii require additional time in transit<br>* Some shipments to and from certain locations may require additional time in transit<br> </div> <div class=\"un_separate\"> <b>Premium Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> </div> <b>Express Delivery</b> - add $13.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br><div class=\"un_separate\"> <b>Express Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> </div> <a name=\"giftwrap\"></a><span class=\"mvTitle\">Gift Boxes, Wraps &amp; Messages</span> <br><b>Gift Boxes</b>  <br>Let us package your gifts in our exclusive boxes. A gift card with your personal message can be enclosed, if you wish. One item per box: $5.00 (not available on all items). Click on \"Add Gift Options\" during checkout on the order summary page. <br><div class=\"un_separate\"> <b>Gift Wrap</b>  <br>Registry gifts will be wrapped in our premier white croc-embossed gift paper with a champagne grosgrain ribbon. One item per box: $5.00 </div> <div class=\"un_separate\"> <b>Gift Messages </b>  <br>You can create a personalized gift message on the Shipping Information page during checkout whether you have selected a gift box or not. Your message will be delivered along with your shipment. </div> <a href=\"#top\"> <div class=\"un_right\">Back to Top</div> </a> </div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_pop_body ')]") {
        inner("<div class=\"bl_pop_body\"> <a name=\"top\"></a><div class=\"mvShippingHeader\"><img border=\"0\" src=\"https://www.bloomingdales.com/img/headers/header_shippolicy.gif\" alt=\"Shipping Policy\"></div>  <br><div class=\"un_separate\"> <b>In Stock Merchandise</b>  <br>Usually is processed and shipped (in other words, leaves our fulfillment center) within 3 business days. bloomingdales.com will let you know at checkout or by a follow-up message if the merchandise you have selected is not currently in stock or if we need to confirm availability. For that merchandise, we will give you an expected shipping time at checkout. All orders are subject to credit approval. </div> <div class=\"un_separate\"> <b>Jewelry</b>  <br>Jewelry cannot be shipped to P.O. Boxes. These items must be sent to a street address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Standard delivery</b>  <br>We deliver via UPS or a comparable delivery service. We use U.S. Postal Service for PO Boxes, APO and FPO addresses. Items ordered at the same time may not always be shipped together; your delivery charge, however, will be based on the total merchandise amount per address. </div> <div class=\"un_separate\"> <a name=\"standard\"></a><b>Free Shipping Policy</b>  <br>We offer free standard shipping everyday for orders over $300* or on orders over $150** if you shop using your Bloomingdale's card. <a href=\"/service/credit/index.ognc\">Apply for a Bloomingdale's card now</a>. </div> <div class=\"un_separate\">*Free standard shipping on orders of $300 or more at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <div class=\"un_separate\">**Free standard shipping on orders of $150 or more when you use your Bloomingdale's card at Bloomingdales.com and Bloomingdales.com/Registry. Not valid when shipping to multiple addresses. No adjustments to prior purchases. Offer excludes Gift Cards, COACH (offer may apply at special times, see COACH Shop for details), Furniture, and Mattresses. Not valid in Bloomingdale's stores or Bloomingdale's The Outlet stores. Valid only when shipping to the U.S. </div> <a name=\"costs\"></a><span class=\"mvTitle\">Shipping Fees</span> <br><div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Under $25.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">$6.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">$6.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$25.01 - $50.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$8.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$50.01 - $75.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$10.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$75.01 - $100.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$11.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$100.01 - $149.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$150.00* - $200.00</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$16.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$200.01 - $299.99*</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;$18.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;$300.00 and Up</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">&nbsp;Free&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Premium Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$7.00&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Express Delivery</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$13.00&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Pre-tax Order Total:</span><span class=\"tab_cont\">&nbsp;Shipping to more than one address</span> <br><span class=\"un_bold\">Standard Shipping:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> <br><span class=\"un_bold\">Standard Shipping with Bloomingdales Credit Card:</span><span class=\"tab_cont\">Additional&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$5.00&nbsp;</span> </div> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Thursday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Friday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Monday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Tuesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Standard Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Standard Order Shipped By:</span><span class=\"tab_cont\">Wednesday&nbsp;&nbsp;</span> <br><span class=\"un_bold\">Expected Delivery:</span><span class=\"tab_cont\">1-6 business days later&nbsp;</span> </div> </div>Note: Since the merchandise you order may be filled from several locations, items may arrive separately. You will not incur additional shipping charges under these circumstances. However, when ordering gift items that you wish to have shipped to different addresses, there will be a separate charge for each address.<br><div class=\"un_separate\"> <b>Shipping Surcharges</b>  <br>Based on their size and/or weight, certain items bear a Shipping Surcharge. Shipping Surcharges are shown on product pages before you place an item in your Shopping Bag and will be added into the total shipping costs for your order. </div> <div class=\"un_separate\"> <b>Shipping To Multiple Locations</b>  <br>When you ship items to multiple addresses, we will add $5.00 for each additional address. Orders including only electronic gift cards are not charged the additional fee. </div> <div class=\"un_separate\"> <a name=\"rush\"></a><span class=\"mvTitle\">Rush Delivery</span> <br><span class=\"un_normal\" style=\"color: #C00\">Please Note: We are unable to provide express shipping to P.O. Boxes.</span>  </div> <div class=\"un_separate\"> <b>Premium Delivery</b> - add $7.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br>* Some shipments to Alaska and Hawaii require additional time in transit<br>* Some shipments to and from certain locations may require additional time in transit<br> </div> <div class=\"un_separate\"> <b>Premium Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> </div> <b>Express Delivery</b> - add $13.00 to Standard Shipping Costs. Orders placed before 5:00 p.m. ET for in-stock merchandise are processed the following business day.<br><div class=\"un_separate\"> <b>Express Delivery</b> <br> </div> <div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Sunday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Monday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Tuesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Wednesday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Thursday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Wednesday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Thursday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Friday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Thursday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Friday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Monday</span> </div> <div class=\"un_bag_prod\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Friday before 5:00pm EST</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> <div class=\"un_bag_prod_last\"> <span class=\"un_bold\">Order Received By:</span><span class=\"tab_cont\">&nbsp;Saturday</span> <br><span class=\"un_bold\">Order Shipped By:</span><span class=\"tab_cont\">&nbsp;Monday</span> <br><span class=\"un_bold\">Expected Delivery Day:</span><span class=\"tab_cont\">&nbsp;Tuesday</span> </div> </div> <a name=\"giftwrap\"></a><span class=\"mvTitle\">Gift Boxes, Wraps &amp; Messages</span> <br><b>Gift Boxes</b>  <br>Let us package your gifts in our exclusive boxes. A gift card with your personal message can be enclosed, if you wish. One item per box: $5.00 (not available on all items). Click on \"Add Gift Options\" during checkout on the order summary page. <br><div class=\"un_separate\"> <b>Gift Wrap</b>  <br>Registry gifts will be wrapped in our premier white croc-embossed gift paper with a champagne grosgrain ribbon. One item per box: $5.00 </div> <div class=\"un_separate\"> <b>Gift Messages </b>  <br>You can create a personalized gift message on the Shipping Information page during checkout whether you have selected a gift box or not. Your message will be delivered along with your shipment. </div> <a href=\"#top\"> <div class=\"un_right\">Back to Top</div> </a> </div>")
      }
      
      
    }
    
  # end BasicGroup
  
  #bonus add to bag button
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", ".ch_bag_buttonAdd input"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonAdd ')]//input") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "add to bag"], ["selector", ".ch_bag_buttonAdd input"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonAdd ')]//input") {
      match($done, "no") {
        attribute("value") {
          value() {
              set("add to bag")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton mvSmallButton"], ["selector", ".ch_bag_buttonAdd input"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_buttonAdd ')]//input") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvButton mvSmallButton")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".mvProductSumaryWrapCurrent .ch_errorMsg"], ["before_me", ".mvProductSumaryWrap"], ["map_moves", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrap ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrapCurrent ')]//*[contains(concat(' ', @class, ' '), ' ch_errorMsg ')])[1]", "before")
  }
  
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", ".ch_bag_subHeader"], ["to_beginning_of_me", ".mvProductSumaryWrapCurrent"], ["map_multiple", ""], ["ancestor_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrapCurrent ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' ch_bag_subHeader ')])[1]", "top")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mv_cart_heading"], ["selector", ".ch_sb_brownbag_name"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')]") {
    match($done, "no") {
      add_class("mv_cart_heading")
      $("self::*[contains(text(), 'Your Brown Bag')]") {
        text("Available Now")
      }
    }
  }
  
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".ch_sb_brownbag_name"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
 
 # $("//*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')]") {
    #inner() {
    #  set("blah")
    #}
  #}
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "img[src*=\"img/spacer.gif\"]"]]
  $("//img[contains(@src, \"img/spacer.gif\")]") {
    remove()
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvColorText"], ["selector", "//span[@class = \"ch_standardBold\"][contains(.,\"Color\")]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//span[@class = \"ch_standardBold\"][contains(.,\"Color\")]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvColorText")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::InnerRegexReplace
  #[["selector", ".mvColorText + span"], ["regex", "(,)"], ["replacement", " "], ["multiple", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvColorText ')]/following-sibling::*[1]/self::span") {
    inner() {
      replace(/,/, " ")
    }
  }
  
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".mvProductSumaryWrapCurrent > .ch_sb_brownbag_name"], ["before_me", ".ch_bag_subHeader"], ["map_moves", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' ch_bag_subHeader ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mvProductSumaryWrapCurrent ')]/*[contains(concat(' ', @class, ' '), ' ch_sb_brownbag_name ')])[1]", "before")
  }
  
  
  #
  #Content::Formatting::SetAttribute
  #[["selector", "input[name='ADD_TO_BAG_BUTTON_CHECKOUT2']"], ["attribute_name", "value"], ["match", "add to current bag"], ["replace", "add to current brown bag"]]
  $("//input[@name = 'ADD_TO_BAG_BUTTON_CHECKOUT2']") {
    attribute("value") {
      value() {
        replace("add to current bag", "add to current brown bag")
      }
    }
  }
  
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".bl_nav_top_contain_outer"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]") {
    remove()
  }
  $("//div[contains(@class, ' ch_registryNonLastItem')]/following-sibling::div[1]") {
    add_class("mw_ch_registryLastItem")
  }
