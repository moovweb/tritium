  #add class to body so that the css can be added to main. css
  $("//html/body"){
   add_class("mvCheckout") 
  }

  $multiple_shipping_possible = "false"
  $(".//label[@for='shipToMultipleAddr']") {
    $multiple_shipping_possible = "true"
  }
  
  $(".//div[@id='ch_shipMultAddresses']") {
    $multiple_shipping_possible = "true"
  }
  
  $egift_card_present = "false"
  $(".//div[contains(@class, 'ch_review_shipmentHeader')]") {
    $egift_card_present = "true"
  }
  
  $registry_item_present = "false"
  $("/html/body//img[@class='reviewRegistryImg']") {
    $registry_item_present = "true"
    log(concat("registry_item_present------------------>", $registry_item_present))
  }
  
  $multiple_registry_items_present = 'false'
  $("./div[@class='registryImgCh']") {
    $multiple_registry_items_present = 'true';
  }
  log(concat("=>  $multiple_registry_items_present:  ", $multiple_registry_items_present))
  
  match($egift_card_present) {
    with(/true/) {
      $(".//form[@id='ch_form']") {
        insert_top("div", class: "mw_brown_bag_accordian", data-ur-set: "toggler") {
          insert_bottom("div", class: "mw_bb_title", data-ur-toggler-component: "button") {
            insert_bottom("div", "SHOW MY BROWN BAG", class: "mw_bb_title_under") 
          }
          insert_bottom("div", class: "mw_bb_items_container", data-ur-toggler-component: "content") {
            insert_bottom("div", class: "mw_review_merchandiseBackToBagTxt") {
              insert_bottom("span", "Need to change your order?")
              insert_bottom("a", "  Go back to shopping bag.", href:"/bag/index.ognc")
            }

            move_here("//div[contains(concat(' ', @class, ' '), ' ch_itemsInfoContainer ')] | //div[contains(concat(' ', @class, ' '), ' ch_itemsInfoContainer ')]/preceding-sibling::* | //div[contains(concat(' ', @class, ' '), ' ch_itemsInfoContainer ')]/following-sibling::*", "bottom")
            $("./div[contains(concat(' ', @class, ' '), ' ch_itemsInfoContainer ')]") {
              insert_after("div", class: "ch_itemsSeparator")
            }
          }
        }
        insert_top("div", class: "mw_hold_my_shit")
        insert_top("div", class: "mw_hold_my_titles")
      }
      $(".//div[@class='ch_reviewShipAddressContainer']") {
        wrap_text_children("span", class: "mw_wrap_tc")
        insert_top("div", class: "mw_hold_spans")
        $("./span") {
          move_to("../div[@class='mw_hold_spans']", "bottom")
        }
				$("./div[@class='divaddr']") {
					 move_to("../div[@class='mw_hold_spans']", "bottom")
				}
        $("./div[@class='mw_hold_spans']") {
          move_to("//div[@class='mw_hold_my_shit']", "bottom")
        }
        $("./br") {
          remove()
        }
      }
      $index="mw_1"
      $(".//div[@class='ch_review_shipmentHeader']") {
        attribute("class", $index)
        move_to("//div[@class='mw_hold_my_titles']", "bottom")
        $index {
          append("1")
        }
      }
    }
  }
  
   #remove stuff
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".mvStoreAndEventsWrap"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' mvStoreAndEventsWrap ')]") {
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
       #Content::Formatting::RemoveAttribute
       #[["attribute", "style"], ["selector", "input[type=\"text\"]"]]
       $("//input[@type = \"text\"]") {
         attribute("style") {
           remove()
         }
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".mvMenuWrap"]]
       $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrap ')]") {
         remove()
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".ch_nav_top_sub"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_nav_top_sub ')]") {
         remove()
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".ch_adPlaceHolder"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_adPlaceHolder ')]") {
         remove()
       }
       
       
       # replace header image with text
       $("//*[contains(concat(' ', @class, ' '), ' ch_header ')][img]") {
         text(fetch("img/@alt"))
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".ch_billing_frmContents > img"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_frmContents ')]/img") {
         remove()
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".ch_review_main > form > .ch_review_header"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_review_main ')]/form/*[contains(concat(' ', @class, ' '), ' ch_review_header ')]") {
         remove()
       }
       
       
     # end BasicGroup
     
     #format buttons
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[type=\"image\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//input[@type = \"image\"]") {
         match($done, "no") {
           attribute("class") {
             value() {
                 set("mvButton")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "type"], ["value", "submit"], ["selector", ".mvButton"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
         match($done, "no") {
           attribute("type") {
             value() {
                 set("submit")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::RemoveAttribute
       #[["attribute", "src"], ["selector", ".mvButton"]]
       $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
         attribute("src") {
           remove()
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "value"], ["value", "guest check out"], ["selector", "input[name=\"CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//input[@name = \"CHECKOUT_BUTTON\"]") {
         match($done, "no") {
           attribute("value") {
             value() {
                 set("guest check out")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "value"], ["value", "Sign In"], ["selector", "input[name=\"SIGNINSIGNIN_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//input[@name = \"SIGNINSIGNIN_BUTTON\"]") {
         match($done, "no") {
           attribute("value") {
             value() {
                 set("Sign In")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "value"], ["value", "express checkout"], ["selector", "input[name=\"EXPRESS_CHECKOUT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//input[@name = \"EXPRESS_CHECKOUT_BUTTON\"]") {
         match($done, "no") {
           attribute("value") {
             value() {
                 set("express checkout")
             }
           }
         }
       }
       
       
     # end BasicGroup
     
     #guest checkout text
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".ch_signin_noRegister > .ch_signin_Header"], ["html", "guest"], ["prepend", ""], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_signin_noRegister ')]/*[contains(concat(' ', @class, ' '), ' ch_signin_Header ')]") {
         inner("guest")
       }
       
       
       #
       #Content::Inject::InjectHTML
       #[["html", "<div class=\"mvGuestCheckout\">you are welcome to check out as a Guest. you will be given the opportunity to create an account during checkout.</div>"], ["add_after", ".ch_signin_noRegister > .ch_signin_Header"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_signin_noRegister ')]/*[contains(concat(' ', @class, ' '), ' ch_signin_Header ')])[1]") {
         inject_after("<div class=\"mvGuestCheckout\">you are welcome to check out as a Guest. you will be given the opportunity to create an account during checkout.</div>")
       }
       
       
     # end BasicGroup
     
     #
     #Content::Formatting::MoveBefore
     #[["move_me", ".ch_review_orderTotalsBottom"], ["before_me", "#ch_form"], ["map_moves", ""]]
     $("(//*[@id = 'ch_form'])[1]") {
       move_here("(//*[contains(concat(' ', @class, ' '), ' ch_review_orderTotalsBottom ')])[1]", "before")
     }
     
     
     #edit buttons
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #ship to multiple
       #Group::BasicGroup
       #[]
       # No need to wrap the contents at all
         #
         #Content::Formatting::ReplaceTag
         #[["selector", ".ch_shippingButtonMultiShip img"], ["new_tag_name", "input"], ["class_name", "mvButton"]]
         $("//*[contains(concat(' ', @class, ' '), ' ch_shippingButtonMultiShip ')]//img") {
           name("input")
           attribute("class", "mvButton")
         }
         
         
         #
         #Content::Formatting::AddAttribute
         #[["attribute", "value"], ["value", "s addresses"], ["selector", ".ch_shippingButtonMultiShip .mvButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
         var("done", "no")
         $("//*[contains(concat(' ', @class, ' '), ' ch_shippingButtonMultiShip ')]//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
           match($done, "no") {
               var("done", "yes")
             attribute("value") {
               value() {
                   set("multiple addresses")
               }
             }
           }
         }
         
         
       # end BasicGroup
       
       #
       #Content::Formatting::MoveToEndOf
       #[["move_me", ".ch_review_paymentContainer .ch_review_subHeaderEdit"], ["to_end_of_me", ".ch_review_paymentContainer .ch_review_subHeader"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
       var("counter", "a")
       $("//*[contains(concat(' ', @class, ' '), ' ch_review_paymentContainer ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeader ')]") {
         var("counter") {
           append("a")
         }
         attribute("id2742", $counter)
       }
       var("counter", "a")
       $("//*[contains(concat(' ', @class, ' '), ' ch_review_paymentContainer ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeaderEdit ')]") {
         var("counter") {
           append("a")
         }
         var("xpath") {
           set("//*[@id2742 = '")
           append($counter)
           append("']")
         }
         move_to($xpath, "bottom")
       }
       
       
       #
       #Content::Formatting::MoveToEndOf
       #[["move_me", ".ch_reviewShipContainer .ch_review_subHeaderEdit"], ["to_end_of_me", ".ch_reviewShipContainer .ch_review_subHeader"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
       var("counter", "a")
       $("//*[contains(concat(' ', @class, ' '), ' ch_reviewShipContainer ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeader ')]") {
         var("counter") {
           append("a")
         }
         attribute("id3566", $counter)
       }
       var("counter", "a")
       $("//*[contains(concat(' ', @class, ' '), ' ch_reviewShipContainer ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeaderEdit ')]") {
         var("counter") {
           append("a")
         }
         var("xpath") {
           set("//*[@id3566 = '")
           append($counter)
           append("']")
         }
         move_to($xpath, "bottom")
       }
       
       
     # end BasicGroup
     
     #
     #Content::Formatting::MoveToBeginningOf
     #[["move_me", ".ch_summary_orderTotalsBottom"], ["to_beginning_of_me", ".ch_review_left"], ["map_multiple", ""], ["ancestor_selector", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_review_left ')])[1]") {
       move_here("(//*[contains(concat(' ', @class, ' '), ' ch_summary_orderTotalsBottom ')])[1]", "top")
     }
     
     
     #coHeaders
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #shippingHeader
       #Group::ConditionalSelectorGroup
       #[["conditional_selector", "#ch_shipFormContainer"], ["negate", ""]]
       $("(//*[@id = 'ch_shipFormContainer'])[1]") {
       
         #
         #Content::Inject::InjectHTML
         #[["html", "<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">1.shipping</div> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#globalContentContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
         $("(//*[@id = 'globalContentContainer'])[1]") {
           inject_before("<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">1.shipping</div> </div>")
         }
         
         
       }
       
       
       #ShippingMethod
       #Group::ConditionalSelectorGroup
       #[["conditional_selector", ".ch_shippingDetailsTitleMethod"], ["negate", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_shippingDetailsTitleMethod ')])[1]") {
       
         #
         #Content::Inject::InjectHTML
         #[["html", "<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">2.Shipping Method</div> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#globalContentContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
         $("(//*[@id = 'globalContentContainer'])[1]") {
           inject_before("<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">2.Shipping Method</div> </div>")
         }
         
         
       }
       
       
       #paymentMethod
       #Group::ConditionalSelectorGroup
       #[["conditional_selector", ".ch_billing_main"], ["negate", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_billing_main ')])[1]") {
       
         #
         #Content::Inject::InjectHTML
         #[["html", "<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">3.Payment Method</div> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#globalContentContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
         $("(//*[@id = 'globalContentContainer'])[1]") {
           inject_before("<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">3.Payment Method</div> </div>")
         }
         
         
       }
       
       
       #orderSummary
       #Group::ConditionalSelectorGroup
       #[["conditional_selector", ".ch_summary_orderTotalsBottom"], ["negate", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_summary_orderTotalsBottom ')])[1]") {
       
         #
         #Content::Inject::InjectHTML
         #[["html", "<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">4.Order Review</div> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#globalContentContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
         $("(//*[@id = 'globalContentContainer'])[1]") {
           inject_before("<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">4.Order Review</div> </div>")
         }
         
         
       }
       
       
     # end BasicGroup
     
     #CO headers - ignore Group
     #Group::IgnoreGroup
     #[]
     # No match necessary - contents will be commented out
     #  #BillingHeader
     #  #Group::ConditionalSelectorGroup
     #  #[["conditional_selector", ".ch_billing_frmElements"], ["negate", ""]]
     #  $("(//*[contains(concat(' ', @class, ' '), ' ch_billing_frmElements ')])[1]") {
     #  
     #    #
     #    #Content::Inject::InjectHTML
     #    #[["html", "<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">3.payment</div> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#globalContentContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
     #    $("(//*[@id = 'globalContentContainer'])[1]") {
     #      inject_before("<div class=\"mvCheckoutHeaderWrap\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">3.payment</div> </div>")
     #    }
     #    
     #    
     #  }
     #  
     #  
     #  #expressCheckoutHeader
     #  #Group::ConditionalSelectorGroup
     #  #[["conditional_selector", ".ch_orderReview_buttonsExpress"], ["negate", ""]]
     #  $("(//*[contains(concat(' ', @class, ' '), ' ch_orderReview_buttonsExpress ')])[1]") {
     #  
     #    #
     #    #Content::Inject::InjectHTML
     #    #[["html", "<div>wo hoo im a header</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".ch_review_left"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
     #    $("(//*[contains(concat(' ', @class, ' '), ' ch_review_left ')])[1]") {
     #      inject_before("<div>wo hoo im a header</div>")
     #    }
     #    
     #    
     #  }
     #  
     #  
     #  #ReviewOrder
     #  #Group::ConditionalSelectorGroup
     #  #[["conditional_selector", ".ch_summary_orderTotalsBottom"], ["negate", ""]]
     #  $("(//*[contains(concat(' ', @class, ' '), ' ch_summary_orderTotalsBottom ')])[1]") {
     #  
     #    #
     #    #Content::Inject::InjectHTML
     #    #[["html", "<div class=\"mvCheckoutHeaderWrap\"><div class=\"mvHeaderDropshadow\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">4.review</div> </div></div>"], ["add_after", ".mvHeaderWrapper"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
     #    $("(//*[contains(concat(' ', @class, ' '), ' mvHeaderWrapper ')])[1]") {
     #      inject_after("<div class=\"mvCheckoutHeaderWrap\"><div class=\"mvHeaderDropshadow\"> <div class=\"mvCheckoutText\"></div> <div class=\"mvCurentPage_Shipping\">4.review</div> </div></div>")
     #    }
     #    
     #    
     #  }
     #  
     #  
     
     
     #browBagList
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::MoveUp
       #[["move_me", ".ch_reviewShipContainer"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_reviewShipContainer ')]") {
         move_to("..", "before")
       }
       
       
       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".ch_merchandiseContainer"], ["tag_name", "div"], ["class_name", "mvBoxWrap"], ["id", ""], ["multiple", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_merchandiseContainer ')]") {
         wrap("div") {
           attribute("class", "mvBoxWrap")
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvBloomMenuHeader mvBrowBagList"], ["selector", ".mvBoxWrap .ch_review_subHeader"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' mvBoxWrap ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeader ')]") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 set("mvBloomMenuHeader mvBrowBagList")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::MoveBefore
       #[["move_me", ".mvBloomMenuHeader"], ["before_me", ".ch_review_billShipMerchContainer"], ["map_moves", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_review_billShipMerchContainer ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')])[1]", "before")
       }
       
       
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".mvBrowBagList"], ["html", "<span>Show My Brown Bag</span>"], ["prepend", ""], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' mvBrowBagList ')]") {
         inner("<span>Show My Brown Bag</span>")
       }
       
       
       #
       #Content::Formatting::Dynamic::Accordian3
       #[["link_selector", ".mvBloomMenuHeader"], ["content_selector", ".ch_review_billShipMerchContainer"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
       var("counter", "")
       var("content_id_string", "[")
       $("//*[contains(concat(' ', @class, ' '), ' ch_review_billShipMerchContainer ')]") {
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
               append("92971")
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
       $("//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]") {
         var("counter") {
           append("a")
         }
         var("id", fetch("./@id"))
         match($id, /^$/) {
           attribute("id") {
             value() {
               set("acc_link")
               append($counter)
               append("92971")
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
     
     #shippingAddress
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::WrapElement
       #[["selector", ".ch_reviewShipAddress"], ["class_name", "mvBoxWrap mvShippingAddessOptions"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
       var("found", "false")
       match($found, "false") {
         $("(//*[contains(concat(' ', @class, ' '), ' ch_reviewShipAddress ')])[1]") {
           var("found", "true")
           insert_before("div") {
             attribute("the_wrapper", "true")
             attribute("class", "mvBoxWrap mvShippingAddessOptions")
             move_here("//*[contains(concat(' ', @class, ' '), ' ch_reviewShipAddress ')][not (@the_wrapper)]", "bottom")
             attribute("the_wrapper") {
               remove()
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::SetInnerText
       #[["selector", "//label/strong[contains(.,\"Enter a new address\")]"], ["text", "shipping address"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
       # NOTE: not sure if /html() or /text() is what I want to be using here
       $("//label/strong[contains(.,\"Enter a new address\")]") {
         inner() {
           set("shipping address")
         }
       }
       
       
       #
       #Content::Formatting::MoveUp
       #[["move_me", ".ch_reviewShipAddress .ch_review_subHeader"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_reviewShipAddress ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeader ')]") {
         move_to("..", "before")
       }
       
       
     # end BasicGroup
     
     #shippingOptions
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".ch_shippingOptionsContainer .invisible"], ["tag_name", "div"], ["class_name", "mvBoxWrap"], ["id", ""], ["multiple", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_shippingOptionsContainer ')]//*[contains(concat(' ', @class, ' '), ' invisible ')]") {
         wrap("div") {
           attribute("class", "mvBoxWrap")
         }
       }
       
       
       #
       #Content::Formatting::ReplaceTag
       #[["selector", ".ch_shippingOptionsContainer .outOfScreen"], ["new_tag_name", "div"], ["class_name", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_shippingOptionsContainer ')]//*[contains(concat(' ', @class, ' '), ' outOfScreen ')]") {
         name("div")
       }
       
       
       #
       #Content::Formatting::WrapElement
       #[["selector", ".ch_reviewShipOptions"], ["class_name", "mvBoxWrap mvShippingOptions"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
       var("found", "false")
       match($found, "false") {
         $("(//*[contains(concat(' ', @class, ' '), ' ch_reviewShipOptions ')])[1]") {
           var("found", "true")
           insert_before("div") {
             attribute("the_wrapper", "true")
             attribute("class", "mvBoxWrap mvShippingOptions")
             move_here("//*[contains(concat(' ', @class, ' '), ' ch_reviewShipOptions ')][not (@the_wrapper)]", "top")
             attribute("the_wrapper") {
               remove()
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::MoveUp
       #[["move_me", ".ch_reviewShipOptions .ch_review_subHeader"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_reviewShipOptions ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeader ')]") {
         move_to("..", "before")
       }
       
       
     # end BasicGroup
     
     #giftOptions
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::WrapElement
       #[["selector", ".ch_reviewGiftOptions"], ["class_name", "mvBoxWrap mvGiftOptions"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
       var("found", "false")
       match($found, "false") {
         $("(//*[contains(concat(' ', @class, ' '), ' ch_reviewGiftOptions ')])[1]") {
           var("found", "true")
           insert_before("div") {
             attribute("the_wrapper", "true")
             attribute("class", "mvBoxWrap mvGiftOptions")
             move_here("//*[contains(concat(' ', @class, ' '), ' ch_reviewGiftOptions ')][not (@the_wrapper)]", "bottom")
             attribute("the_wrapper") {
               remove()
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::MoveUp
       #[["move_me", ".ch_reviewGiftOptions .ch_review_subHeader"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_reviewGiftOptions ')]//*[contains(concat(' ', @class, ' '), ' ch_review_subHeader ')]") {
         move_to("..", "before")
       }
       
       
     # end BasicGroup
     
     #moveIntoCorrectOrder
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::MoveToBeginningOf
       #[["move_me", ".ch_review_contactInfo"], ["to_beginning_of_me", ".ch_review_paymentContainer"], ["map_multiple", ""], ["ancestor_selector", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_review_paymentContainer ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' ch_review_contactInfo ')])[1]", "top")
       }
       
       
       #
       #Content::Formatting::MoveAfter
       #[["move_me", ".ch_reviewShipContainer"], ["after_me", ".ch_review_contactInfo"], ["map_multiple", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_review_contactInfo ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' ch_reviewShipContainer ')])[1]", "after")
       }
       
       
     # end BasicGroup
     
     #place order button
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::DuplicateAttribute
       #[["duplicate_source", ".ch_b_continue img"], ["duplicate_target", ".ch_b_continue"], ["attribute", "onclick"], ["multiple", ""], ["ancestor", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_b_continue ')]//img)[1]") {
         var("duplicate_attribute", fetch("./@onclick"))
         $("(//*[contains(concat(' ', @class, ' '), ' ch_b_continue ')])[1]") {
           attribute("onclick", $duplicate_attribute)
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvButton"], ["selector", ".ch_b_continue"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' ch_b_continue ')]") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvButton")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::SetInnerText
       #[["selector", ".ch_b_continue"], ["text", "Continue"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
       # NOTE: not sure if /html() or /text() is what I want to be using here
       $("//*[contains(concat(' ', @class, ' '), ' ch_b_continue ')]") {
         inner() {
           set("Continue")
         }
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".mvButton > img"]]
       $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]/img") {
         remove()
       }
       
       
     # end BasicGroup
     
     #checkout footer
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::WrapTextChildren
       #[["selector", ".ch_billing_frmValue > .invisible"], ["tag_name", "span"], ["class_name", "mvWrappedText"], ["multiple", ""], ["split_delimiter", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_billing_frmValue ')]/*[contains(concat(' ', @class, ' '), ' invisible ')])[1]") {
         wrap_text_children("span", class: 'mvWrappedText')
       }
       
       
       #
       #Content::Inject::InjectHTML
       #[["html", "<div class=\"mvCheckoutFooter\"><ul> <li class=\"mvShopSecure\"><div id=\"mvLockIcon\"></div>Shopping on bloomingdales.com is always safe and secure. Guaranteed. <a href=\"http://customerservice.bloomingdales.com/app/answers/detail/a_id/360/theme/popup/?cm_sp=NAVIGATION-_-BOTTOM_LINKS-_-SECURITY\">Details</a></li> <li class=\"mvEasyReturns\"><div id=\"mvBoxIcon\"></div>Enjoy easy returns. <a href=\"http://customerservice.bloomingdales.com/app/answers/detail/a_id/359/theme/popup/?cm_sp=NAVIGATION-_-BOTTOM_LINKS-_-RETURNS\">Details</a></li> <li class=\"mvCustomerService\"><div id=\"mvPhoneIcon\"></div>Customer Service <a href=\"tel:+1-800-777-0000\">1-800-777-0000</a></li> </ul></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_nav_bot_service_container"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container ')])[1]") {
         inject_before("<div class=\"mvCheckoutFooter\"><ul> <li class=\"mvShopSecure\"><div id=\"mvLockIcon\"></div>Shopping on bloomingdales.com is always safe and secure. Guaranteed. <a href=\"http://customerservice.bloomingdales.com/app/answers/detail/a_id/360/theme/popup/?cm_sp=NAVIGATION-_-BOTTOM_LINKS-_-SECURITY\">Details</a></li> <li class=\"mvEasyReturns\"><div id=\"mvBoxIcon\"></div>Enjoy easy returns. <a href=\"http://customerservice.bloomingdales.com/app/answers/detail/a_id/359/theme/popup/?cm_sp=NAVIGATION-_-BOTTOM_LINKS-_-RETURNS\">Details</a></li> <li class=\"mvCustomerService\"><div id=\"mvPhoneIcon\"></div>Customer Service <a href=\"tel:+1-800-777-0000\">1-800-777-0000</a></li> </ul></div>")
       }
       
       
     # end BasicGroup
     
     #
     #Content::Formatting::ReplaceTag
     #[["selector", ".ch_billing_main legend.outOfScreen"], ["new_tag_name", "div"], ["class_name", ""]]
     $("//*[contains(concat(' ', @class, ' '), ' ch_billing_main ')]//legend[contains(concat(' ', @class, ' '), ' outOfScreen ')]") {
       name("div")
     }
     
     
     #
     #Content::Formatting::ReplaceTag
     #[["selector", ".ch_billing_main .ch_billing_leftpad label"], ["new_tag_name", "div"], ["class_name", ""]]
     $("//*[contains(concat(' ', @class, ' '), ' ch_billing_main ')]//*[contains(concat(' ', @class, ' '), ' ch_billing_leftpad ')]//label") {
       name("div")
     }
     
     
     #
     #Content::Formatting::AddAttribute
     #[["attribute", "class"], ["value", "mvRemoveStyle"], ["selector", ".ch_buttons"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
     var("done", "no")
     $("//*[contains(concat(' ', @class, ' '), ' ch_buttons ')]") {
       match($done, "no") {
         $("..") {
           var("done", "yes")
         attribute("class") {
           value() {
               set("mvRemoveStyle")
           }
         }
         }
       }
     }
     
     
     #
     #Content::Formatting::MoveToBeginningOf
     #[["move_me", ".ch_placeOrderButtonTop"], ["to_beginning_of_me", ".ch_buttons"], ["map_multiple", ""], ["ancestor_selector", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_buttons ')])[1]") {
       move_here("(//*[contains(concat(' ', @class, ' '), ' ch_placeOrderButtonTop ')])[1]", "top")
     }
     
     
     #giftCard
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Passthrough::Attribute
       #[["selector", "img[src*=\"securityword.ognc\"]"], ["attribute", "src"], ["regex_capture", ""]]
       $("//img[contains(@src, \"securityword.ognc\")]") {
         attribute("src") {
           value() {
             rewrite("link")
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "type"], ["value", "submit"], ["selector", ".ch_billing_applyButton img"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_applyButton ')]//img") {
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
       #[["attribute", "value"], ["value", "Apply"], ["selector", ".ch_billing_applyButton img"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_applyButton ')]//img") {
         match($done, "no") {
             var("done", "yes")
           attribute("value") {
             value() {
                 set("Apply")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::ReplaceTag
       #[["selector", ".ch_billing_applyButton img"], ["new_tag_name", "input"], ["class_name", "mvButton"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_applyButton ')]//img") {
         name("input")
         attribute("class", "mvButton")
       }
       
       
     # end BasicGroup
     
     #promoCodeButton
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::ReplaceTag
       #[["selector", ".ch_billing_frmElements .ch_billing_promo #applyButton"], ["new_tag_name", "input"], ["class_name", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_frmElements ')]//*[contains(concat(' ', @class, ' '), ' ch_billing_promo ')]//*[@id = 'applyButton']") {
         name("input")
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "value"], ["value", "Apply Code(s)"], ["selector", ".ch_billing_frmElements .ch_billing_promo #applyButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_frmElements ')]//*[contains(concat(' ', @class, ' '), ' ch_billing_promo ')]//*[@id = 'applyButton']") {
         match($done, "no") {
             var("done", "yes")
           attribute("value") {
             value() {
                 set("Apply Code(s)")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "type"], ["value", "button"], ["selector", ".ch_billing_frmElements .ch_billing_promo #applyButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_frmElements ')]//*[contains(concat(' ', @class, ' '), ' ch_billing_promo ')]//*[@id = 'applyButton']") {
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
       #[["attribute", "class"], ["value", "mvButton"], ["selector", ".ch_billing_frmElements .ch_billing_promo #applyButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' ch_billing_frmElements ')]//*[contains(concat(' ', @class, ' '), ' ch_billing_promo ')]//*[@id = 'applyButton']") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 set("mvButton")
             }
           }
         }
       }
       
       
     # end BasicGroup
     
     #chek0ut button
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "type"], ["value", "submit"], ["selector", ".buttonSubmitBorders"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
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
       #[["attribute", "value"], ["value", "Place Order"], ["selector", ".buttonSubmitBorders"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
         match($done, "no") {
             var("done", "yes")
           attribute("value") {
             value() {
                 set("Place Order")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvButton mvPinkButton"], ["selector", ".buttonSubmitBorders"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvButton mvPinkButton")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::ReplaceTag
       #[["selector", ".buttonSubmitBorders"], ["new_tag_name", "input"], ["class_name", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
         name("input")
       }
       
       
       #
       #Content::Formatting::RemoveAttribute
       #[["attribute", "src"], ["selector", ".buttonSubmitBorders"]]
       $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
         attribute("src") {
           remove()
         }
       }
       
       
     # end BasicGroup
     
     # #Content::Formatting::MoveAfter
     # #[["move_me", ".ch_review_billingContainerPadding"], ["after_me", ".ch_review_billShipMerchContainer"], ["map_multiple", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_review_billShipMerchContainer ')])[1]") {
       move_here("(//*[contains(concat(' ', @class, ' '), ' ch_review_billingContainerPadding ')])[1]", "after")
     }
     
     
     #
     #Content::Formatting::WrapWithNextSibling
     #[["selector", ".ch_shippingDetailsTitleMethod"], ["wrapper_class", "mvBorder"], ["sibling_count", "5"]]
     $("//*[contains(concat(' ', @class, ' '), ' ch_shippingDetailsTitleMethod ')]") {
       wrap("div") {
         attribute("class", "mvBorder")
         move_here("(following-sibling::*)[1]", "bottom")
         move_here("(following-sibling::*)[1]", "bottom")
         move_here("(following-sibling::*)[1]", "bottom")
         move_here("(following-sibling::*)[1]", "bottom")
         move_here("(following-sibling::*)[1]", "bottom")
       }
     }
     
     
     #
     #Content::Formatting::MoveBefore
     #[["move_me", ".ch_shipMultAddresses"], ["before_me", ".ch_buttons"], ["map_moves", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_buttons ')])[1]") {
       move_here("(//*[contains(concat(' ', @class, ' '), ' ch_shipMultAddresses ')])[1]", "before")
     }
     
     
     #backButton
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "value"], ["value", "Back"], ["selector", "input[onclick=\"submitEvent('back')\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//input[@onclick = \"submitEvent('back')\"]") {
         match($done, "no") {
             var("done", "yes")
           attribute("value") {
             value() {
                 set("Back")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvGreyButton"], ["selector", "input[onclick=\"submitEvent('back')\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//input[@onclick = \"submitEvent('back')\"]") {
         match($done, "no") {
           var("done", "yes")
           attributes(class: "mvGreyButton", type: "button")
         }
       }
       
       
     # end BasicGroup
     
     #
     #Content::Formatting::MoveUp
     #[["move_me", ".shippingDetails_content"]]
     $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content ')]") {
       move_to("..", "before")
     }
     
     
     #
     #Content::Formatting::MoveUp
     #[["move_me", ".shippingDetails_content"]]
     $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content ')]") {
       move_to("..", "before")
     }
     
     
     #
     #Content::Formatting::MoveAfter
     #[["move_me", "#ch_shipFormContainer .shippingDetails_checkbox_1:last-of-type"], ["after_me", "#ch_shipFormContainer"], ["map_multiple", ""]]
     $("(//*[@id = 'ch_shipFormContainer'])[1]") {
       move_here("(//*[@id = 'ch_shipFormContainer']//*[contains(concat(' ', @class, ' '), ' shippingDetails_checkbox_1 ') and position() = last()])[1]", "after")
     }
     
     
     #
     #Content::Formatting::MoveAfter
     #[["move_me", "#ch_shipFormContainer .shippingDetails_content_1:last-of-type"], ["after_me", "#ch_shipFormContainer"], ["map_multiple", ""]]
     $("(//*[@id = 'ch_shipFormContainer'])[1]") {
       move_here("(//*[@id = 'ch_shipFormContainer']//*[contains(concat(' ', @class, ' '), ' shippingDetails_content_1 ') and position() = last()])[1]", "after")
     }
     
     
     #
     #Content::Formatting::MoveToEndOf
     #[["move_me", ".ShippingOption_shippingMethod"], ["to_end_of_me", ".mvBorder"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' mvBorder ')])[1]") {
       move_here("(//*[contains(concat(' ', @class, ' '), ' ShippingOption_shippingMethod ')])[1]", "bottom")
     }
     
     
     #ship to radio button
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvShipToMultipleRadio"], ["selector", "#shipToMultipleAddr"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[@id = 'shipToMultipleAddr']") {
         match($done, "no") {
           $("..") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvShipToMultipleRadio")
             }
           }
           }
         }
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvShipToMultipleText"], ["selector", "[for=\"shipToMultipleAddr\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[@for = \"shipToMultipleAddr\"]") {
         match($done, "no") {
           $("..") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvShipToMultipleText")
             }
           }
           }
         }
       }
       
       
       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".mvShipToMultipleRadio"], ["tag_name", ""], ["class_name", "mvShipToMultipleRadioWrap"], ["id", ""], ["multiple", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' mvShipToMultipleRadio ')]") {
         wrap("div") {
           attribute("class", "mvShipToMultipleRadioWrap")
         }
       }
       
       
       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".mvShipToMultipleText"], ["tag_name", ""], ["class_name", "mvShipToMultipleTextWrap"], ["id", ""], ["multiple", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' mvShipToMultipleText ')]") {
         wrap("div") {
           attribute("class", "mvShipToMultipleTextWrap")
         }
       }
       
       
       #
       #Content::Formatting::MoveToEndOf
       #[["move_me", ".mvShipToMultipleTextWrap"], ["to_end_of_me", ".mvShipToMultipleRadioWrap"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' mvShipToMultipleRadioWrap ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' mvShipToMultipleTextWrap ')])[1]", "bottom")
       }
       
       
       #
       #Content::Formatting::MoveAfter
       #[["move_me", ".mvShipToMultipleRadioWrap"], ["after_me", "#ch_shipFormContainer"], ["map_multiple", ""]]
       $("(//*[@id = 'ch_shipFormContainer'])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' mvShipToMultipleRadioWrap ')])[1]", "after")
       }
       
       
     # end BasicGroup
     
     #edit shipping address
     #Group::ConditionalSelectorGroup
     #[["conditional_selector", "[name=\"editShippingDetails\"]"], ["negate", ""]]
     $("(//*[@name = \"editShippingDetails\"])[1]") {
     
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvEditShippingAddress"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//body") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvEditShippingAddress")
             }
           }
         }
       }
       
       
       #
       #Content::Inject::InjectHTML
       #[["html", "<div class=\"mvEditHeader\">Edit Shipping Address</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "[name=\"editShippingDetails\"] > div:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
       $("(//*[@name = \"editShippingDetails\"]/div[position() = 1])[1]") {
         inject_before("<div class=\"mvEditHeader\">Edit Shipping Address</div>")
       }
       
       
     }
     
     
     #paymentMethod
     #Group::ConditionalSelectorGroup
     #[["conditional_selector", ".ch_billing_main"], ["negate", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_billing_main ')])[1]") {
     
       #
       #Content::Formatting::SetInnerText
       #[["selector", "#cardExpiration + select > option:first-of-type"], ["text", "Year"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
       # NOTE: not sure if /html() or /text() is what I want to be using here
       $("//*[@id = 'cardExpiration']/following-sibling::*[1]/self::select/option[position() = 1]") {
         inner() {
           set("Year")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerText
       #[["selector", "#cardExpiration > option:first-of-type"], ["text", "Month"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
       # NOTE: not sure if /html() or /text() is what I want to be using here
       $("//*[@id = 'cardExpiration']/option[position() = 1]") {
         inner() {
           set("Month")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerText
       #[["selector", "//div[contains(@class, \"ch_heading\")][contains(.,\"CREDIT CARD\")]"], ["text", "pay with "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
       # NOTE: not sure if /html() or /text() is what I want to be using here
       $("//div[contains(@class, \"ch_heading\")][contains(.,\"CREDIT CARD\")]") {
         inner() {
           prepend("pay with ")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", "//div[contains(@class, \"ch_heading\")][contains(.,\"CREDIT CARD\")]"], ["html", "<span class=\"mvRequired\">*required</span>"], ["prepend", ""], ["append", "true"]]
       $("//div[contains(@class, \"ch_heading\")][contains(.,\"CREDIT CARD\")]") {
         inner() {
           append("<span class=\"mvRequired\">*required</span>")
         }
       }
       
       
       #expiration date drop downs
       #Group::BasicGroup
       #[]
       # No need to wrap the contents at all# end BasicGroup
       
     }
     
     
     #confirmation Page
     #Group::ConditionalSelectorGroup
     #[["conditional_selector", ".ch_confirmationOrderInfoHeader"], ["negate", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_confirmationOrderInfoHeader ')])[1]") {
     
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvOrderConfirmationPage"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//body") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvOrderConfirmationPage")
             }
           }
         }
       }
       
       
       #
       #Content::Formatting::SetInnerText
       #[["selector", ".shippingDetails_content_1 label strong"], ["text", "shipping address"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
       # NOTE: not sure if /html() or /text() is what I want to be using here
       $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content_1 ')]//label//strong") {
         inner() {
           set("shipping address")
         }
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", "a[href*=\"bag/index\"]"]]
       $("//a[contains(@href, \"bag/index\")]") {
         remove()
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".ch_confirmationPoolBig"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_confirmationPoolBig ')]") {
         remove()
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".bl_nav_top_contain_outer"]]
       $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]") {
         remove()
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".ch_summary_headerImage"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_summary_headerImage ')]") {
         remove()
       }
       
       
       #
       #Content::Formatting::RemoveElements
       #[["selector", ".ch_confirmationPrint"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_confirmationPrint ')]") {
         remove()
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvCheckoutItemWrap"], ["selector", ".ch_itemsInfoItemWide"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoItemWide ')]") {
         match($done, "no") {
           $("..") {
             var("done", "yes")
           attribute("class") {
             value() {
                 set("mvCheckoutItemWrap")
             }
           }
           }
         }
       }
       
       
       #
       #Content::Formatting::MoveToBeginningOf
       #[["move_me", ".ch_confirmationShipHeader"], ["to_beginning_of_me", ".mvCheckoutItemWrap"], ["map_multiple", ""], ["ancestor_selector", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' mvCheckoutItemWrap ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' ch_confirmationShipHeader ')])[1]", "top")
       }
       
       
       #
       #Content::Formatting::MoveAfter
       #[["move_me", ".ch_confirmationShipAddress"], ["after_me", ".ch_confirmationShipContactinfo"], ["map_multiple", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_confirmationShipContactinfo ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' ch_confirmationShipAddress ')])[1]", "after")
       }
       
       
       #
       #Content::Inject::InjectHTML
       #[["html", "<div class=\"mvConfHeader\"><div class=\"mvThanks mvConfHeader\">thank you!</div><div class=\"mvConfHeader\">we've received  your order.</div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".ch_confirmationOrderInfoContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_summary_header ')])[1]") {
         inject_top("<div class=\"mvConfHeader\"><div class=\"mvThanks mvConfHeader\">thank you!</div><div class=\"mvConfHeader\">we've received  your order.</div></div>")
       }
       
       
       #
       #Content::Formatting::WrapTextChildren
       #[["selector", ".ch_confirmationOrderInfoContainer .ch_standardBold:first-of-type"], ["tag_name", "span"], ["class_name", "mvOrderNumberText"], ["multiple", "true"], ["split_delimiter", " "]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_confirmationOrderInfoContainer ')]//*[contains(concat(' ', @class, ' '), ' ch_standardBold ') and position() = 1]") {
         wrap_text_children("span", class: 'mvOrderNumberText')
       }
       
       
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvOrderTotal"], ["selector", "//span[@class = \"ch_standardBold\"][contains(.,\"Order Total\")]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//span[@class = \"ch_standardBold\"][contains(.,\"Order Total\")]") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvOrderTotal")
             }
           }
         }
       }
       
       
       #
       #Content::Inject::InjectHTML
       #[["html", "<span>Your order number is </span>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvOrderNumberText"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' mvOrderNumberText ')])[1]") {
         text() {
           replace(/Order Number: /, "")
         }
         inject_before("<span>Your order number is </span>")
       }
       
       
     }
     
     
     #
     #Content::Formatting::MoveUp
     #[["move_me", ".mvCheckoutHeaderWrap"]]
     $("//*[contains(concat(' ', @class, ' '), ' mvCheckoutHeaderWrap ')]") {
       move_to("..", "before")
     }
     
     
     #
     #Content::Formatting::AddAttribute
     #[["attribute", "class"], ["value", "mvSecurityCodeTitle"], ["selector", ".ch_billing_existingCCcontainer .formLabel"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
     var("done", "no")
     $("//*[contains(concat(' ', @class, ' '), ' ch_billing_existingCCcontainer ')]//*[contains(concat(' ', @class, ' '), ' formLabel ')]") {
       match($done, "no") {
         $("..") {
         attribute("class") {
           value() {
               append(" mvSecurityCodeTitle")
           }
         }
         }
       }
     }
     
     
     #Multiple ShippingRewrite
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       
       match($multiple_shipping_possible) {
        with(/true/) {
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mvMultipleShipping\"></div>"], ["add_after", "#ch_shipFormContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'ch_shipFormContainer'])[1]") {
            inject_after("<div class=\"mvMultipleShipping\"></div>")
          }


          #
          #Content::Formatting::SetInnerHTML
          #[["selector", ".mvMultipleShipping"], ["html", "<div class=\"mvMultipleShippingHeader\">Shipping to multiple addresses?</div><div class=\"mvMultipleShilpping\">please visit our <span class=\"desktopSiteLink\"><span></span></span> for this option.</div>"], ["prepend", ""], ["append", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' mvMultipleShipping ')]") {
            inner("<div class=\"mvMultipleShippingHeader\">Shipping to multiple addresses?</div><div class=\"mvMultipleShilpping\">please visit our <span class=\"desktopSiteLink\"><span></span></span> for this option.</div>")
          }  
          #
          #Content::Inject::InjectDesktopSiteLink
          #[["add_after", ".desktopSiteLink > span"]]
          # --- not found ---

          #
          #Content::Formatting::SetInnerHTML
          #[["selector", ".mvMultipleShilpping .desktop_site"], ["html", "full site"], ["prepend", ""], ["append", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' mvMultipleShilpping ')]//*[contains(concat(' ', @class, ' '), ' desktop_site ')]") {
            inner("full site")
          }
        }
       }
       
       
     # end BasicGroup
     
     #expressCheckoutHeader
     #Group::ConditionalSelectorGroup
     #[["conditional_selector", ".ch_summary_orderTotalsBottom"], ["negate", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_summary_orderTotalsBottom ')])[1]") {
     
       #
       #Content::Formatting::AddAttribute
       #[["attribute", "class"], ["value", "mvOrderReview"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
       var("done", "no")
       $("//body") {
         match($done, "no") {
             var("done", "yes")
           attribute("class") {
             value() {
                 append(" mvOrderReview")
             }
           }
         }
         $(".//div[@class='divline']") {
           $("./div[@class='ch_os_TotalLineItemContainer'][./div[@class='ch_os_TotalLineDollarRed']]") {
             add_class('mw_has_red_text')
           }
         }
       }
       
       
       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".ch_itemsInfoPriceConf"], ["tag_name", "div"], ["class_name", "mvItemSumaryPrice"], ["id", ""], ["multiple", "true"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoPriceConf ')]") {
         wrap("div") {
           attribute("class", "mvItemSumaryPrice")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".mvItemSumaryPrice"], ["html", "<div class=\"mvItemTitle\">price:</div>"], ["prepend", "true"], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' mvItemSumaryPrice ')]") {
         inner() {
           prepend("<div class=\"mvItemTitle\">price:</div>")
         }
       }
       
       
       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".ch_itemsInfoTotal"], ["tag_name", "div"], ["class_name", "mvItemSumaryTotal"], ["id", ""], ["multiple", "true"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoTotal ')]") {
         wrap("div") {
           attribute("class", "mvItemSumaryTotal")
         }
       }
       
       
       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".ch_itemsInfoQty"], ["tag_name", "div"], ["class_name", "mvItemSumaryQty"], ["id", ""], ["multiple", "true"]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoQty ')]") {
         wrap("div") {
           attribute("class", "mvItemSumaryQty")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".mvItemSumaryQty"], ["html", "<div class=\"mvItemTitle\">qty:</div>"], ["prepend", "true"], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' mvItemSumaryQty ')]") {
         inner() {
           prepend("<div class=\"mvItemTitle\">qty:</div>")
         }
       }
       
       
     }
     
     
     #
     #Content::Formatting::AddAttribute
     #[["attribute", "checked"], ["value", ""], ["selector", ".shippingDetails_content input[type=\"radio\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
     var("done", "no")
     $("//*[contains(concat(' ', @class, ' '), ' shippingDetails_content ')]//input[@type = \"radio\"]") {
       match($done, "no") {
         var("done", "yes")
       }
     }
     
     
     #
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".ch_itemsGiftBox"], ["html", "<span class=\"itemInfo\">gift box: </span>"], ["prepend", "true"], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsGiftBox ')]") {
         inner() {
           prepend("<span class=\"itemInfo\">gift box: </span>")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".ch_itemsInfoPriceWide"], ["html", "<span class=\"itemInfo\">price: </span>"], ["prepend", "true"], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoPriceWide ')]") {
         inner() {
           prepend("<span class=\"itemInfo\">price: </span>")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".ch_itemsInfoQtyConf"], ["html", "<span class=\"itemInfo\">qty: </span>"], ["prepend", "true"], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoQtyConf ')]") {
         inner() {
           prepend("<span class=\"itemInfo\">qty: </span>")
         }
       }
       
       
       #
       #Content::Formatting::SetInnerHTML
       #[["selector", ".ch_itemsInfoTotal"], ["html", "<span class=\"itemInfo\">total: </span>"], ["prepend", "true"], ["append", ""]]
       $("//*[contains(concat(' ', @class, ' '), ' ch_itemsInfoTotal ')]") {
         inner() {
           prepend("<span class=\"itemInfo\">total: </span>")
         }
       }
       
       
     # end BasicGroup
     
     #
     #Content::Formatting::SetInnerText
     #[["selector", ".ch_os_TotalLineItemKeyWide_total > b"], ["text", "SUBTOTAL: "], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
     # NOTE: not sure if /html() or /text() is what I want to be using here
     $("//*[contains(concat(' ', @class, ' '), ' ch_os_TotalLineItemKeyWide_total ')]/b") {
       inner() {
         set("SUBTOTAL: ")
       }
     }
     
     
     #Ant Blocks
     #Group::BasicGroup
     #[]
     # No need to wrap the contents at all
       #
       #Content::Formatting::MoveToEndOf
       #[["move_me", ".ch_os_TotalLineItemContainerWide_total .ch_os_TotalLineItemValue_total"], ["to_end_of_me", ".ch_os_TotalLineItemContainerWide_total .ch_os_TotalLineDollar"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' ch_os_TotalLineItemContainerWide_total ')]//*[contains(concat(' ', @class, ' '), ' ch_os_TotalLineDollar ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' ch_os_TotalLineItemContainerWide_total ')]//*[contains(concat(' ', @class, ' '), ' ch_os_TotalLineItemValue_total ')])[1]", "bottom")
       }
       
       
     # end BasicGroup
     
     #
     #Content::Formatting::MoveBefore
     #[["move_me", ".ch_review_billShipMerchContainer  .ch_errorMsg"], ["before_me", ".ch_summary_orderTotalsBottom"], ["map_moves", ""]]
     $("(//*[contains(concat(' ', @class, ' '), ' ch_summary_orderTotalsBottom ')])[1]") {
       move_here("(//*[contains(concat(' ', @class, ' '), ' ch_review_billShipMerchContainer ')]//*[contains(concat(' ', @class, ' '), ' ch_errorMsg ')])[1]", "before")
     }
     
     $("//html//input[contains(@name, 'REGISTER_BUTTON')]"){
       name('input')
       attribute("value"){
         value() {
           set("Register")
         }
       }
     }
     #insert desktop site link
     $("//div[contains(@class, 'mvMultipleShilpping')]/span[contains(@class, 'desktopSiteLink')]"){
       $myUrl = concat("https://", $source_host, $path)
       insert_bottom("a", id: "mw_desktop_link_1", href: $myUrl) {
         text(){
           set('full site')
         }
       }
     }
     $("//input[@class='phone']") {
       attribute("onkeyup", "")
     }
     $("//div[@class='ch_shippingMethodEst']") {
       text() {
         replace(/^\s+/, "")
         replace(/\s+$/, "")
         prepend("(")
         append(")")
       }
     }
  match($egift_card_present) {
    with(/true/) {
      $(".//div[@class='ch_reviewShipAddress']") {
        move_here("//div[@class='mw_hold_my_shit']/div[1]", "bottom")
      }
      # # Kenny UAT_287
      # $(".//div[@class='ch_summary_orderTotalsBottom']") {
      #   move_here("//div[@class='mw_brown_bag_accordian']", "after")
      # }
      # Collate titles to take care of the differences in layout with a gift card
      $item = "mw_1"
      $(".//div[(@class='ch_reviewShipAddressContainer')]") {
        $(".//div[@class='ch_review_subHeader']") {
          $("./div[@class='ch_review_subHeaderEdit']") {
            insert_after("div", class: "mw_item_specifics") {
              copy_here(concat("//div[@class='mw_hold_my_titles']/div[@class='", $item, "']"), "bottom")
              $item {
                append("1")
              }
            }
          }
        }
      }
      $item = "mw_1"
      $(".//div[contains(concat(' ', @class, ' '), ' mvShippingOptions ')]") {
        $(".//div[@class='ch_review_subHeader']") {
          $("./div[@class='ch_review_subHeaderEdit']") {
            insert_after("div", class: "mw_item_specifics") {
              copy_here(concat("//div[@class='mw_hold_my_titles']/div[@class='", $item, "']"), "bottom")
              $item {
                append("1")
              }
            }
          }
        }
      }
      $item = "mw_1"
      $(".//div[contains(concat(' ', @class, ' '), ' mvGiftOptions ')]") {
        $(".//div[@class='ch_review_subHeader']") {
          $("./div[@class='ch_review_subHeaderEdit']") {
            insert_after("div", class: "mw_item_specifics") {
              copy_here(concat("//div[@class='mw_hold_my_titles']/div[@class='", $item, "']"), "bottom")
              $item {
                append("1")
              }
            }
          }
        }
      }
      $(".//div[@class='mw_hold_my_titles']") {
        remove()
      }
      $("//div[contains(@class, 'ch_review_shipmentTotals')]"){
        $("./preceding-sibling::div[contains(@class, 'ch_itemsSeparator')][1]"){
          remove()
        }
        remove()
      }
    }
    with(/false/) {
      # force all product items into the correct div.
      $("/html/body[contains(@class, 'mvOrderReview')]//div[contains(@class, 'ch_itemsInfoContainer')] | /html/body[contains(@class, 'mvOrderReview')]//div[contains(@class, 'ch_itemsInfoContainer')]/following-sibling::*"){
        move_to("/html/body[contains(@class, 'mvCheckout')][contains(@class, 'mvOrderReview')]//div[contains(@class, 'ch_merchandiseContainer')]", "bottom")  
      }
    }
  }
  #}
# removes mvBoxWrap class from the shipping review container.
$("//div[contains(@class, 'ch_review_billShipMerchContainer ')]//div[contains(@class, 'mvBoxWrap')]"){
  attribute("class", "mw_mvBoxwrap_removed")
}

# add editing address Title
# Believe that adding this in should be qualified for this page, if not, then we need to check that
$("(//div[@class = 'shippingDetails_formText_virtual'])[1]") {
  $("//div[@class='bl_nav_top_container']") {
    insert_after("div", class: "mvCheckoutHeaderWrap") {
      insert_bottom("div", class: "mvCheckoutText")
      insert_bottom("div", "1. Shipping Address", class: "mvCurentPage_Shipping")
    }
  }  
}


# Make sure that when there are items from more than one registry present
# that the containers don't become nested
$(".//div[@class='mw_bb_items_container']") {
  $("./div[@class='ch_review_billingContainerPadding']") {
    move_to("//div[@class='mw_brown_bag_accordian']", "after")
  }
}


$(".//div[@class='mw_mvBoxwrap_removed']/div/div[contains(@class, 'ch_itemsInfoContainer')]") {
  move_here("../../following-sibling::div[@class='ch_errorTextBold'][1]", "bottom")
}

# # make sure no order summary inside accordion
# # Kenny UAT_287
# make sure we have bb accordion on top first.

$(".//div[@class='mw_brown_bag_accordian']") {
  # move_to("//div[@class='ch_review_left']", "after")
  move_here("//div[@class='mw_bb_items_container']/div[contains(@class, 'ch_review_left')]", "before")
  move_here("following-sibling::div//div[contains(@class, 'ch_summary_orderTotalsBottom')]", "before")
}

# spriting
$(".//div[@class='mvCheckoutFooter']") {
  $(".//div[@id='mvLockIcon']") {
    add_class("to_be_sprited-lock")
  }
  $(".//div[@id='mvBoxIcon']") {
    add_class("to_be_sprited-box")
  }
  $(".//div[@id='mvPhoneIcon']") {
    add_class("to_be_sprited-phoneimg")
  }
}


