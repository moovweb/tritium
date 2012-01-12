
# ----- RawHTMLBlocks ----
#
#Content::Raw::PassthroughHostFromCapture
#[["regex", "<meta.*((www\\.eharmony\\.com|r7\\.eharmony\\.com))"]]
# --- not found ---


# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts
@import subscription.ts



# ----- ParsedHTMLBlocks ----
html() {
  $subscription_renew_cost = fetch("//form[@name='ProcessSubscriptionForm']//div[contains(@class, 'billform')]/div/p/strong/text()")
  
  $("/html/body//form//div[contains(@class, 'radiobox')]") {
    inner() {
      replace(/<br\s*\/?>/, " ")
    }
  }
  
  #Extract Confirmation Price Text
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Duplicate
    #[["duplicate_me", ".mw_pricing_text_1"], ["after_me", ".mw_pricing_text_1"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
    # $("(//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_1 ')])[1]") {
    #   copy_here("(//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_1 ')])[1]", "after")
    # }
    
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".mw_pricing_text_2"], ["to_beginning_of_me", "body"], ["map_multiple", ""], ["ancestor_selector", ""]]
    # $("(//body)[1]") {
    #   move_here("(//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_2 ')])[1]", "top")
    # }
    
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".mw_pricing_text_1:last-of-type"], ["to_beginning_of_me", "body"], ["map_multiple", ""], ["ancestor_selector", ""]]
    # $("(//body)[1]") {
    #   move_here("(//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_1 ') and position() = last()])[1]", "top")
    # }
    
    
  # end BasicGroup
  
  #All Block Flows
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #ParseJSVars
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all# end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mSelectPlan"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "form[name=\"SelectSubscriptionForm\"]"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//body)[1]") {
      match($done, "no") {
          var("conditional", "false")
            $("//form[@name = \"SelectSubscriptionForm\"]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mSelectPlan")
          }
        }
          }
      }
    }
    
    
    #Remove Unnecessary Elements
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mSelectPlan .intro"]]
      $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[contains(concat(' ', @class, ' '), ' intro ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mSelectPlan .multi-pay-present"]]
      $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[contains(concat(' ', @class, ' '), ' multi-pay-present ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mSelectPlan .subad"]]
      $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[contains(concat(' ', @class, ' '), ' subad ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mSelectPlan #m2box"]]
      $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[@id = 'm2box']") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mSelectPlan .col_rt"]]
      $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[contains(concat(' ', @class, ' '), ' col_rt ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mSelectPlan .col_lt .separator"]]
      $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[contains(concat(' ', @class, ' '), ' col_lt ')]//*[contains(concat(' ', @class, ' '), ' separator ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mSelectPlan #one-month"]]
      $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[@id = 'one-month']") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".billstep"]]
      $("//*[contains(concat(' ', @class, ' '), ' billstep ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #Congrats Confirmation
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "form[name=\"ConfirmationForm\"]"], ["negate", ""]]
    $("(//form[@name = \"ConfirmationForm\"])[1]") {
    
      #Upsell Congrats
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "body.venice"], ["negate", ""]]
      $("(//body[contains(concat(' ', @class, ' '), ' venice ')])[1]") {
      
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#header-wrapper"]]
        $("//*[@id = 'header-wrapper']") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#orange-navbar"]]
        $("//*[@id = 'orange-navbar']") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#smartbanner"]]
        $("//*[@id = 'smartbanner']") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".eh-footer"]]
        $("//*[contains(concat(' ', @class, ' '), ' eh-footer ')]") {
          remove()
        }
        
        
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mCongrats"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("(//body)[1]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mCongrats")
            }
          }
        }
      }
      
      
      #Set Breadcrumb
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mBreadcrumbItemLinkActiveFull"], ["selector", ".mBreadcrumbItem:nth-of-type(3) .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 3]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mBreadcrumbItemLinkActiveFull")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mBreadcrumbItemLinkComplete"], ["selector", ".mBreadcrumbItem:nth-child(1) .mBreadcrumbItemLink, .mBreadcrumbItem:nth-child(2) .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mBreadcrumbItemLinkComplete")
              }
            }
          }
        }
        $("//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 2]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mBreadcrumbItemLinkComplete")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #Remove And Reorganize
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsForm"], ["selector", ".mCongrats form"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mCongrats ')]//form)[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mCongratsForm")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".mCongratsForm > *:not(#continue-div)"], ["class_name", "mCongratsFormContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' mCongratsForm ')]/*[not (@id = 'continue-div')])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mCongratsFormContent")
              move_here("//*[contains(concat(' ', @class, ' '), ' mCongratsForm ')]/*[not (@id = 'continue-div')][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsFormContentTitle"], ["selector", ".mCongratsFormContent h2"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFormContent ')]//h2)[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mCongratsFormContentTitle")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".mCongratsFormContent > h3:first-of-type"]]
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsFormContent ')]/h3[position() = 1]") {
          remove()
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".mCongratsFormContent > *:not(.mCongratsFormContentTitle)"], ["class_name", "mCongratsFormContentInner"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFormContent ')]/*[not (contains(concat(' ', @class, ' '), ' mCongratsFormContentTitle '))])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mCongratsFormContentInner")
              move_here("//*[contains(concat(' ', @class, ' '), ' mCongratsFormContent ')]/*[not (contains(concat(' ', @class, ' '), ' mCongratsFormContentTitle '))][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsFormContentInnerList"], ["selector", ".mCongratsFormContentInner .confirm"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInner ')]//*[contains(concat(' ', @class, ' '), ' confirm ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mCongratsFormContentInnerList")
              }
            }
          }
        }
        
        
        #
        #Content::Labeling::NumberElements
        #[["selector", ".mCongratsFormContentInnerList"], ["prefix", "mCongratsFormConInList_"]]
        # Requires tritium >= 0.6.191
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInnerList ')][not (@id)]") {
          $mw_temp = "mCongratsFormConInList_"
          $mw_temp {
            append(index())
          }
          attribute("id", $mw_temp)
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsFormContentInnerListItem"], ["selector", ".mCongratsFormContentInnerList li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInnerList ')]//li") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mCongratsFormContentInnerListItem")
              }
            }
          }
        }
        
        
        #
        #Content::Labeling::NumberElements
        #[["selector", ".mCongratsFormContentInnerListItem"], ["prefix", "mCongratsFormConInListIt_"]]
        # Requires tritium >= 0.6.191
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInnerListItem ')][not (@id)]") {
          $mw_temp = "mCongratsFormConInListIt_"
          $mw_temp {
            append(index())
          }
          attribute("id", $mw_temp)
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#mCongratsFormConInListIt_5"]]
        $("//*[@id = 'mCongratsFormConInListIt_5']") {
          remove()
        }
        
        
      # end BasicGroup
      
      #Text Rearranging and Modification
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#mCongratsFormConInListIt_1 .label"], ["text", "Confirmation Number"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'mCongratsFormConInListIt_1']//*[contains(concat(' ', @class, ' '), ' label ')]") {
          inner() {
            set("Confirmation Number")
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#mCongratsFormConInListIt_2 .label"], ["text", "Purchased Membership Plan"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'mCongratsFormConInListIt_2']//*[contains(concat(' ', @class, ' '), ' label ')]") {
          inner() {
            set("Purchased Membership Plan")
          }
        }
        
        
        #
        #Content::Formatting::Duplicate
        #[["duplicate_me", "#mCongratsFormConInListIt_3 .value"], ["after_me", "#mCongratsFormConInListIt_2 .value"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
        $("(//*[@id = 'mCongratsFormConInListIt_2']//*[contains(concat(' ', @class, ' '), ' value ')])[1]") {
          copy_here("(//*[@id = 'mCongratsFormConInListIt_3']//*[contains(concat(' ', @class, ' '), ' value ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#mCongratsFormConInListIt_3"]]
        $("//*[@id = 'mCongratsFormConInListIt_3']") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#mCongratsFormConInListIt_6 .label"]]
        $("//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' label ')]") {
          remove()
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<span class=\"mCongratsFormContentInnerListItemSubtitle\">This subscription will auto-renew at</span>"], ["add_after", ""], ["multiple", ""], ["add_before", "#mCongratsFormConInListIt_6 .value"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' value ')])[1]") {
          inject_before("<span class=\"mCongratsFormContentInnerListItemSubtitle\">This subscription will auto-renew at</span>")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsFormContentInnerTitle"], ["selector", ".mCongratsFormContentInner > h3"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInner ')]/h3)[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mCongratsFormContentInnerTitle")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::Duplicate
        #[["duplicate_me", "#mCongratsFormConInListIt_7 .value"], ["after_me", "#mCongratsFormConInListIt_6 .mCongratsFormContentInnerListItemSubtext"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
        $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInnerListItemSubtext ')])[1]") {
          copy_here("(//*[@id = 'mCongratsFormConInListIt_7']//*[contains(concat(' ', @class, ' '), ' value ')])[1]", "after")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<span class=\"mCongratsFormContentInnerListItemSubtext\"> on</span>"], ["add_after", "#mCongratsFormConInListIt_6 .value:last-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' value ') and position() = last()])[1]") {
          inject_after("<span class=\"mCongratsFormContentInnerListItemSubtext\"> on</span>")
        }
        
        
        #
        #Content::Formatting::Duplicate
        #[["duplicate_me", "#mCongratsFormConInListIt_8 .value"], ["after_me", "#mCongratsFormConInListIt_6 .mCongratsFormContentInnerListItemSubtext"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
        $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInnerListItemSubtext ')])[1]") {
          copy_here("(//*[@id = 'mCongratsFormConInListIt_8']//*[contains(concat(' ', @class, ' '), ' value ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::Duplicate
        #[["duplicate_me", "#mCongratsFormConInListIt_7 .value"], ["after_me", "#mCongratsFormConInListIt_6 .mCongratsFormContentInnerListItemSubtitle"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
        $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInnerListItemSubtitle ')])[1]") {
          copy_here("(//*[@id = 'mCongratsFormConInListIt_7']//*[contains(concat(' ', @class, ' '), ' value ')])[1]", "after")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<span class=\"mCongratsFormContentInnerListItemSubtext\"> for </span>"], ["add_after", "#mCongratsFormConInListIt_6 .value"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' value ')])[1]") {
          inject_after("<span class=\"mCongratsFormContentInnerListItemSubtext\"> for </span>")
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#mCongratsFormConInListIt_6 .value"], ["text", ""], ["match_string", " Renewal"], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' value ')]") {
          inner() {
            replace(" Renewal", "")
          }
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#mCongratsFormConInListIt_7, #mCongratsFormConInListIt_8"]]
        $("//*[@id = 'mCongratsFormConInListIt_7']") {
          remove()
        }
        $("//*[@id = 'mCongratsFormConInListIt_8']") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".mCongratsFormContentInner > div"]]
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInner ')]/div") {
          remove()
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", "#continue-div input"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'continue-div']//input") {
        attribute("src", asset("images/continue_text.png"))
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mCongratsFooter\"><span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText\">In order to ensure uninterrupted service, all eHarmony subscriptions will be automatically renewed 24 hours before they expire. You may disable this option after completing your purchase on your Account Settings page. Please note that if you paid for your subscription or renewal using a multi-part payment option, you may only disable the auto-renew feature after the final payment on your subscription/renewal has been made.</span></div>"], ["add_after", "#continue-div"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'continue-div'])[1]") {
        inject_after("<div class=\"mCongratsFooter\"><span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText\">In order to ensure uninterrupted service, all eHarmony subscriptions will be automatically renewed 24 hours before they expire. You may disable this option after completing your purchase on your Account Settings page. Please note that if you paid for your subscription or renewal using a multi-part payment option, you may only disable the auto-renew feature after the final payment on your subscription/renewal has been made.</span></div>")
      }
      
      
      #
      #Group::IgnoreGroup
      #[]
      # No match necessary - contents will be commented out
      #  #Footer
      #  #Group::BasicGroup
      #  #[]
      #  # No need to wrap the contents at all
      #    #
      #    #Content::Inject::InjectHTML
      #    #[["html", "<div class=\"mCongratsFooter\"></div>"], ["add_after", "#continue-div"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      #    $("(//*[@id = 'continue-div'])[1]") {
      #      inject_after("<div class=\"mCongratsFooter\"></div>")
      #    }
      #    
      #    
      #    #
      #    #Content::Formatting::SetInnerHTML
      #    #[["selector", ".mCongratsFooter"], ["html", "<span class=\"mCongratsFooterText\"><span class=\"mCongratsFooterTextStrong\">Please Note:</span> At the end of this subscription term your membership will renew for only <span class=\"mCongratsFooterTextPrice\"></span> for <span class=\"mCongratsFooterTextDuration\"></span>.</span>"], ["prepend", ""], ["append", ""]]
      #    $("//*[contains(concat(' ', @class, ' '), ' mCongratsFooter ')]") {
      #      inner("<span class=\"mCongratsFooterText\"><span class=\"mCongratsFooterTextStrong\">Please Note:</span> At the end of this subscription term your membership will renew for only <span class=\"mCongratsFooterTextPrice\"></span> for <span class=\"mCongratsFooterTextDuration\"></span>.</span>")
      #    }
      #    
      #    
      #    #
      #    #Content::Formatting::DuplicateInnerText
      #    #[["duplicate_source", "#mCongratsFormConInListIt_6 .value"], ["duplicate_target", ".mCongratsFooterText .mCongratsFooterTextPrice"], ["multiple", ""], ["common_ancestor", ""]]
      #    $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' value ')])[1]") {
      #      var("text", fetch("text()"))
      #      $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterText ')]//*[contains(concat(' ', @class, ' '), ' mCongratsFooterTextPrice ')])[1]") {
      #        inner($text)
      #      }
      #    }
      #    
      #    
      #    #
      #    #Content::Formatting::DuplicateInnerText
      #    #[["duplicate_source", "#mCongratsFormConInListIt_6 .value:contains(\"Month\")"], ["duplicate_target", ".mCongratsFooterText .mCongratsFooterTextDuration"], ["multiple", ""], ["common_ancestor", ""]]
      #    $("(//*[@id = 'mCongratsFormConInListIt_6']//*[contains(concat(' ', @class, ' '), ' value ') and contains(., \"Month\")])[1]") {
      #      var("text", fetch("text()"))
      #      $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterText ')]//*[contains(concat(' ', @class, ' '), ' mCongratsFooterTextDuration ')])[1]") {
      #        inner($text)
      #      }
      #    }
      #    
      #    
      #    #
      #    #Content::Inject::InjectHTML
      #    #[["html", "<span class=\"mCongratsFooterText\">You may disable this option after completing your purchase by logging into your eHarmony account and clicking the \"Cancel My Subscription\" link on your Account Settings page. Please note that if you paid for your subscription using a multi-part payment option you may only disable the auto-renew feature after the final payment on your subscription has been made.</span>"], ["add_after", ".mCongratsFooterText"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      #    $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterText ')])[1]") {
      #      inject_after("<span class=\"mCongratsFooterText\">You may disable this option after completing your purchase by logging into your eHarmony account and clicking the \"Cancel My Subscription\" link on your Account Settings page. Please note that if you paid for your subscription using a multi-part payment option you may only disable the auto-renew feature after the final payment on your subscription has been made.</span>")
      #    }
      #    
      #    
      #  # end BasicGroup
      #  
      
      
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "#relyIdDisclaimer"]]
    $("//*[@id = 'relyIdDisclaimer']") {
      attribute("style") {
        remove()
      }
    }
    
    
    #ConditionalSelectorGroup - Do Not Target Upsell
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "body.venice"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//body[contains(concat(' ', @class, ' '), ' venice ')])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #Normal Flow
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #Choose Plan
        #Group::ConditionalSelectorGroup
        #[["conditional_selector", "form[name=\"SelectSubscriptionForm\"]"], ["negate", ""]]
        $("(//form[@name = \"SelectSubscriptionForm\"])[1]") {
        
          #Tabs
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mTabs"], ["selector", ".tab-container"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' tab-container ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mTabs")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mTabsItem"], ["selector", ".mTabs li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mTabs ')]//li") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mTabsItem")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mTabsItemLink"], ["selector", ".mTabsItem a"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mTabsItem ')]//a") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mTabsItemLink")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mTabsItemLinkText"], ["selector", ".mTabsItemLink span"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mTabsItemLink ')]//span") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mTabsItemLinkText")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::SetInnerText
            #[["selector", ".mTabsItemLinkText"], ["text", ""], ["match_string", " Plan"], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
            # NOTE: not sure if /html() or /text() is what I want to be using here
            $("//*[contains(concat(' ', @class, ' '), ' mTabsItemLinkText ')]") {
              inner() {
                replace(" Plan", "")
              }
            }
            
            
            #
            #Content::Formatting::SetInnerHTML
            #[["selector", ".mTabsItem:first-child .mTabsItemLinkText"], ["html", "<span class=\"mTabsItemLinkTextTotal\">Total</span>Connect"], ["prepend", ""], ["append", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mTabsItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mTabsItemLinkText ')]") {
              inner("<span class=\"mTabsItemLinkTextTotal\">Total</span>Connect")
            }
            
            
          # end BasicGroup
          
          #
          #Content::Formatting::WrapElement
          #[["selector", ".mTabs ~ div"], ["class_name", "mBodySegment"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//*[contains(concat(' ', @class, ' '), ' mTabs ')]/following-sibling::div)[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                attribute("class", "mBodySegment")
                move_here("//*[contains(concat(' ', @class, ' '), ' mTabs ')]/following-sibling::div[not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #Plan Table Transformation
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".plan-desc"]]
            $("//*[contains(concat(' ', @class, ' '), ' plan-desc ')]") {
              remove()
            }
            
            
            #
            #Content::Formatting::RemoveExcept
            #[["remove", ".plans"], ["keep", "tr"]]
            # 1 move all the keep stuff just after the remove stuff
            $("//*[contains(concat(' ', @class, ' '), ' plans ')]") {
              move_here(".//tr", "before")
              remove()
            }
            
            
            #
            #Content::Formatting::ReplaceTag
            #[["selector", ".plan-table"], ["new_tag_name", "ul"], ["class_name", "mPlanList"]]
            $("//*[contains(concat(' ', @class, ' '), ' plan-table ')]") {
              name("ul")
              attribute("class", "mPlanList")
            }
            
            
            #
            #Content::Formatting::ReplaceTag
            #[["selector", ".mPlanList .plan"], ["new_tag_name", "li"], ["class_name", "mPlanListItem"]]
            $("//*[contains(concat(' ', @class, ' '), ' mPlanList ')]//*[contains(concat(' ', @class, ' '), ' plan ')]") {
              name("li")
              attribute("class", "mPlanListItem")
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".separator, .offer, #tcdiv"]]
            $("//*[contains(concat(' ', @class, ' '), ' separator ')]") {
              remove()
            }
            $("//*[contains(concat(' ', @class, ' '), ' offer ')]") {
              remove()
            }
            $("//*[@id = 'tcdiv']") {
              remove()
            }
            
            
            #Plan List Title
            #Group::BasicGroup
            #[]
            # No need to wrap the contents at all
              #
              #Content::Inject::InjectHTML
              #[["html", "<div class=\"mPlanTitle\"> <span class=\"mPlanTitleLarge\">Upgrade your Membership!</span> <span class=\"mPlanTitleSub\">Communicate, View Photos and more.</span> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mPlanList"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
              $("(//*[contains(concat(' ', @class, ' '), ' mPlanList ')])[1]") {
                inject_before("<div class=\"mPlanTitle\"> <span class=\"mPlanTitleLarge\">Upgrade your Membership!</span> <span class=\"mPlanTitleSub\">Communicate, View Photos and more.</span> </div>")
              }
              
              
            # end BasicGroup
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mPlanListTotalConnect"], ["selector", "#tc-plans"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[@id = 'tc-plans'])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mPlanListTotalConnect")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mPlanListBasic"], ["selector", "#basic-plans"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[@id = 'basic-plans'])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mPlanListBasic")
                  }
                }
              }
            }
            
            
          # end BasicGroup
          
          #Plan List Item
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::MoveBefore
            #[["move_me", ".mPlanListItem .savings"], ["before_me", ".mPlanListItem .price"], ["map_moves", "true"]]
            var("counter", "a")
            $("//*[contains(concat(' ', @class, ' '), ' mPlanListItem ')]//*[contains(concat(' ', @class, ' '), ' price ')]") {
              var("counter") {
                append("a")
              }
              attribute("parent_id", $counter)
            }
            var("counter", "a")
            $("//*[contains(concat(' ', @class, ' '), ' mPlanListItem ')]//*[contains(concat(' ', @class, ' '), ' savings ')]") {
              var("counter") {
                append("a")
              }
              var("xpath") {
                set("//*[@parent_id = '")
                append($counter)
                append("']")
              }
              move_to($xpath, "before")
            }
            
            
            #
            #Content::Formatting::WrapTextChildren
            #[["selector", ".mPlanListItem .price"], ["tag_name", "span"], ["class_name", "mPlanListItemPriceSubtext"], ["multiple", "true"], ["split_delimiter", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mPlanListItem ')]//*[contains(concat(' ', @class, ' '), ' price ')]") {
              wrap_text_children("span", class: 'mPlanListItemPriceSubtext')
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".extra-offer-container"]]
            $("//*[contains(concat(' ', @class, ' '), ' extra-offer-container ')]") {
              remove()
            }
            
            
          # end BasicGroup
          
          #Plan List Item Special Offer
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mPlanListItem mPlanListItemSpecial"], ["selector", ".specialofferbox"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' specialofferbox ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mPlanListItem mPlanListItemSpecial")
                  }
                }
              }
            }
            
            
            #
            #Group::IgnoreGroup
            #[]
            # No match necessary - contents will be commented out
            #  #
            #  #Content::Formatting::RemoveElements
            #  #[["selector", ".mPlanListItemSpecial .header"]]
            #  $("//*[contains(concat(' ', @class, ' '), ' mPlanListItemSpecial ')]//*[contains(concat(' ', @class, ' '), ' header ')]") {
            #    remove()
            #  }
            #  
            #  
            
            
            #
            #Content::Formatting::MoveBefore
            #[["move_me", ".mPlanListItemSpecial"], ["before_me", ".mPlanList"], ["map_moves", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mPlanList ')])[1]") {
              move_here("(//*[contains(concat(' ', @class, ' '), ' mPlanListItemSpecial ')])[1]", "before")
            }
            
            
          # end BasicGroup
          
          #Features List Items
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mFeatureListWrap"], ["selector", "#sub-featurebox"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[@id = 'sub-featurebox'])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mFeatureListWrap")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBodySegment"], ["selector", ".mFeatureListWrap"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mFeatureListWrap ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mBodySegment")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mFeatureList"], ["selector", ".mFeatureListWrap .featurebox"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mFeatureListWrap ')]//*[contains(concat(' ', @class, ' '), ' featurebox ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mFeatureList")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mFeatureListItem"], ["selector", ".mFeatureList .headup"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mFeatureList ')]//*[contains(concat(' ', @class, ' '), ' headup ')]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mFeatureListItem")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mFeatureListItemCheck"], ["selector", ".mFeatureListItem > span:not(.headtitle)"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mFeatureListItem ')]/span[not (contains(concat(' ', @class, ' '), ' headtitle '))]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mFeatureListItemCheck")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mFeatureList .headup:first-child"]]
            $("//*[contains(concat(' ', @class, ' '), ' mFeatureList ')]//*[contains(concat(' ', @class, ' '), ' headup ') and position() = 1]") {
              remove()
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mFeatureListItem br"]]
            $("//*[contains(concat(' ', @class, ' '), ' mFeatureListItem ')]//br") {
              remove()
            }
            
            
            #
            #Content::Formatting::ReverseChildrenOrder
            #[["selector", ".mFeatureListItem"]]
            $("//*[contains(concat(' ', @class, ' '), ' mFeatureListItem ')]/*") {
              move_to("..", "top")
            }
            
            
            #
            #Content::Formatting::SetInnerHTML
            #[["selector", ".mFeatureListItemCheck.basic-chk"], ["html", "<span class=\"mFeatureListItemCheckText\">B</span>"], ["prepend", ""], ["append", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mFeatureListItemCheck ') and contains(concat(' ', @class, ' '), ' basic-chk ')]") {
              inner("<span class=\"mFeatureListItemCheckText\">B</span>")
            }
            
            
            #
            #Content::Formatting::SetInnerHTML
            #[["selector", ".mFeatureListItemCheck.total-chk"], ["html", "<span class=\"mFeatureListItemCheckText\">TC</span>"], ["prepend", ""], ["append", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mFeatureListItemCheck ') and contains(concat(' ', @class, ' '), ' total-chk ')]") {
              inner("<span class=\"mFeatureListItemCheckText\">TC</span>")
            }
            
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<div class=\"mFeaturesTitle\"><span class=\"mFeaturesTitleLarge\">Membership Features</span> <span class=\"mFeaturesTitleSub\">TotalConnect gives you 2 additional features.</span> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mFeatureList"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mFeatureList ')])[1]") {
              inject_before("<div class=\"mFeaturesTitle\"><span class=\"mFeaturesTitleLarge\">Membership Features</span> <span class=\"mFeaturesTitleSub\">TotalConnect gives you <span id=\"mw_feature_diff\"></span> additional features.</span> </div>") {
                $(".//span[@id='mw_feature_diff']") {
                  match($region) {
                    with(/us/) {
                      text("3")
                    }
                    else() {
                      text("2")
                    }
                  }
                }
              }
            }
            
            
          # end BasicGroup
          
          #Plan List Items Text Replacement
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mPlanListItemButtonText"], ["selector", ".mPlanListItem button span"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mPlanListItem ')]//button//span") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mPlanListItemButtonText")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::SetInnerHTML
            #[["selector", ".mPlanListTotalConnect .mPlanListItemButtonText"], ["html", "<span class=\"mPlanListItemButtonTextTotal\">Total</span>Connect"], ["prepend", ""], ["append", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mPlanListTotalConnect ')]//*[contains(concat(' ', @class, ' '), ' mPlanListItemButtonText ')]") {
              inner("<span class=\"mPlanListItemButtonTextTotal\">Total</span>Connect")
            }
            
            
            #
            #Content::Formatting::SetInnerHTML
            #[["selector", ".mPlanListBasic .mPlanListItemButtonText"], ["html", "Basic"], ["prepend", ""], ["append", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mPlanListBasic ')]//*[contains(concat(' ', @class, ' '), ' mPlanListItemButtonText ')]") {
              inner("Basic")
            }
            
            
            #
            #Content::Formatting::SetInnerHTML
            #[["selector", ".mPlanListItemSpecial .mPlanListItemButtonText"], ["html", "Special Offer"], ["prepend", ""], ["append", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mPlanListItemSpecial ')]//*[contains(concat(' ', @class, ' '), ' mPlanListItemButtonText ')]") {
              inner("Special Offer")
            }
            
            
          # end BasicGroup
          
          #Promo Code
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mPromoWrap"], ["selector", "#promobox"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[@id = 'promobox'])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mPromoWrap")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mSelectPlan #one-month-option"]]
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlan ')]//*[@id = 'one-month-option']") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mPromo"], ["selector", ".mPromoWrap div"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mPromoWrap ')]//div)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mPromo")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::RemoveExcept
            #[["remove", ".mPromoWrap"], ["keep", ".mPromo"]]
            # 1 move all the keep stuff just after the remove stuff
            $("//*[contains(concat(' ', @class, ' '), ' mPromoWrap ')]") {
              move_here(".//*[contains(concat(' ', @class, ' '), ' mPromo ')]", "before")
              remove()
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mPromo br, .mPromo label"]]
            $("//*[contains(concat(' ', @class, ' '), ' mPromo ')]//br") {
              remove()
            }
            $("//*[contains(concat(' ', @class, ' '), ' mPromo ')]//label") {
              remove()
            }
            
            
            #
            #Content::Formatting::ReplaceTag
            #[["selector", ".mPromo b"], ["new_tag_name", "span"], ["class_name", "mPromoTitle"]]
            $("//*[contains(concat(' ', @class, ' '), ' mPromo ')]//b") {
              name("span")
              attribute("class", "mPromoTitle")
            }
            
            
            #
            #Content::Formatting::SetInnerText
            #[["selector", ".mPromoTitle"], ["text", "Use Promotion Code"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
            # NOTE: not sure if /html() or /text() is what I want to be using here
            $("//*[contains(concat(' ', @class, ' '), ' mPromoTitle ')]") {
              inner() {
                set("Use Promotion Code")
              }
            }
            
            
            #
            #Content::Formatting::WrapTextChildren
            #[["selector", ".mPromo"], ["tag_name", "span"], ["class_name", "mPromoOptionalText"], ["multiple", ""], ["split_delimiter", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mPromo ')])[1]") {
              wrap_text_children("span", class: 'mPromoOptionalText')
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Enter Code"], ["selector", ".mPromo input"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mPromo ')]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      append(" Enter Code")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::MoveBefore
            #[["move_me", ".mPromo"], ["before_me", ".mFeatureListWrap"], ["map_moves", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mFeatureListWrap ')])[1]") {
              move_here("(//*[contains(concat(' ', @class, ' '), ' mPromo ')])[1]", "before")
            }
            
            
          # end BasicGroup
          
          #Current Renewal Rates
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Group::IgnoreGroup
            #[]
            # No match necessary - contents will be commented out
            #  #
            #  #Content::Inject::InjectHTML
            #  #[["html", "<div class=\"mCurrentRatesWrap mBodySegment\"> \t<div class=\"mCurrentRatesTitle\">Current Renewal Rates</div> \t \t<ul class=\"mCurrentRatesList\"> \t\t<li class=\"mCurrenteRatesListItem\">12 Month Subscription Plan renews on a monthly basis for a total price of $22.95 per month.</li> \t\t<li class=\"mCurrenteRatesListItem\">6 Month Subscription Plan renew in six-month increments for a total price of $161.75 for six months.</li> \t\t<li class=\"mCurrenteRatesListItem\">3 Month Subscription Plan renew in three-month increments for a total price of $107.85 for three months.</li> \t</ul> </div>"], ["add_after", ".mFeatureListWrap"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            #  $("(//*[contains(concat(' ', @class, ' '), ' mFeatureListWrap ')])[1]") {
            #    inject_after("<div class=\"mCurrentRatesWrap mBodySegment\"> 	<div class=\"mCurrentRatesTitle\">Current Renewal Rates</div> 	 	<ul class=\"mCurrentRatesList\"> 		<li class=\"mCurrenteRatesListItem\">12 Month Subscription Plan renews on a monthly basis for a total price of $22.95 per month.</li> 		<li class=\"mCurrenteRatesListItem\">6 Month Subscription Plan renew in six-month increments for a total price of $161.75 for six months.</li> 		<li class=\"mCurrenteRatesListItem\">3 Month Subscription Plan renew in three-month increments for a total price of $107.85 for three months.</li> 	</ul> </div>")
            #  }
            #  
            #  
            
            
          # end BasicGroup
          
          #Footnotes
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mSubscriptionFootnotes"], ["selector", "#sub_notes"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[@id = 'sub_notes'])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mSubscriptionFootnotes")
                  }
                }
              }
            }
            
            
            #
            #Group::IgnoreGroup
            #[]
            # No match necessary - contents will be commented out
            
          # end BasicGroup
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mSubscriptionFootnotes br, .col_lt > br"]]
          $("//*[contains(concat(' ', @class, ' '), ' mSubscriptionFootnotes ')]//br") {
            remove()
          }
          $("//*[contains(concat(' ', @class, ' '), ' col_lt ')]/br") {
            remove()
          }
          
          
          #
          #Group::IgnoreGroup
          #[]
          # No match necessary - contents will be commented out
          
          #
          #Content::Labeling::NumberElements
          #[["selector", ".mPlanListItem"], ["prefix", "mPlanListIt_"]]
          # Requires tritium >= 0.6.191
          $("//*[contains(concat(' ', @class, ' '), ' mPlanListItem ')][not (@id)]") {
            $mw_temp = "mPlanListIt_"
            $mw_temp {
              append(index())
            }
            attribute("id", $mw_temp)
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBreadcrumbItemLinkActive"], ["selector", ".mBreadcrumbItem:first-child .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBreadcrumbItemLinkActive")
                }
              }
            }
          }
          
          
          #
          #Group::IgnoreGroup
          #[]
          # No match necessary - contents will be commented out
          #  #
          #  #Content::Inject::InjectHTML
          #  #[["html", "<span class=\"mPlanListItemButtonText\"><span class=\"mPlanListItemButtonTextTotal\">Total</span>Connect </span>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mPlanListItemSpecial button span"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          #  $("(//*[contains(concat(' ', @class, ' '), ' mPlanListItemSpecial ')]//button//span)[1]") {
          #    inject_before("<span class=\"mPlanListItemButtonText\"><span class=\"mPlanListItemButtonTextTotal\">Total</span>Connect </span>")
          #  }
          #  
          #  
          
          
          #
          #Content::Formatting::MoveBefore
          #[["move_me", ".mPlanListItemSpecial .plan"], ["before_me", "button .mPlanListItemButtonText"], ["map_moves", ""]]
          $("(//button//*[contains(concat(' ', @class, ' '), ' mPlanListItemButtonText ')])[1]") {
            move_here("(//*[contains(concat(' ', @class, ' '), ' mPlanListItemSpecial ')]//*[contains(concat(' ', @class, ' '), ' plan ')])[1]", "before")
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mPlanListItemButtonTextOffer\">Offer expires in 14 days.</span>"], ["add_after", ".mPlanListItemSpecial button > span:last-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mPlanListItemSpecial ')]//button/span[position() = last()])[1]") {
            inject_after("<span class=\"mPlanListItemButtonTextOffer\">Offer expires in 14 days.</span>")
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "target"], ["value", "_self"], ["selector", ".mSubscriptionFootnotes a"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mSubscriptionFootnotes ')]//a)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("target") {
                value() {
                    append(" _self")
                }
              }
            }
          }
          
          
          #Remove Jquery
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "jquery"]]
          $("//script[contains(@src, 'jquery')]") {
            remove()
          }
          
          
          #Remove Jquery
          #Content::Javascript::RemoveScriptTagContains
          #[["match", "if(typeof jQuery"]]
          $("//script[contains(text(),'if(typeof jQuery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagContains
          #[["match", "fbcdn"]]
          $("//script[contains(text(),'fbcdn')]") {
            remove()
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "href"], ["value", "JavaScript:void(0);"], ["selector", ".mTabsItemLink"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mTabsItemLink ')]") {
            match($done, "no") {
              attribute("href") {
                value() {
                    set("JavaScript:void(0);")
                }
              }
            }
          }
          
          
          #
          #Content::Javascript::AddScriptTag
          #[["javascript_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/joinTabSwitch_min.js?moov_cache_name=eharmony-joinTabSwitch_min.js&moov_cache_version=998689328529"], ["add_after", ""]]
          $("//html/head") {
            insert_bottom("script") {
              attribute("src", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/joinTabSwitch_min.js?moov_cache_name=eharmony-joinTabSwitch_min.js&moov_cache_version=998689328529")
              attribute("language", "javascript")
            }
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<ul class=\"footnotes\"><li><a name=\"footnote-1\"></a><sup>1</sup> <span>Savings based off the 3 Month TotalConnect plan.</span></li><li><a name=\"footnote-2\"></a><sup>2</sup> <span>Savings based off the 1 Month Basic plan.</span></li></ul>"], ["add_after", ".mSubscriptionFootnotes p"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mSubscriptionFootnotes ')]//p)[1]") {
            inject_after("<ul class=\"footnotes\"><li><a name=\"footnote-1\"></a><sup>1</sup> <span>Savings based off the 3 Month TotalConnect plan.</span></li><li><a name=\"footnote-2\"></a><sup>2</sup> <span>Savings based off the 1 Month Basic plan.</span></li></ul>")
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mPlanListIt_2 sup"], ["text", "1"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mPlanListIt_2']//sup") {
            inner() {
              set("1")
            }
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mPlanListIt_3 sup"], ["text", "1"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mPlanListIt_3']//sup") {
            inner() {
              set("1")
            }
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mPlanListIt_5 sup"], ["text", "2"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mPlanListIt_5']//sup") {
            inner() {
              set("2")
            }
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mPlanListIt_6 sup"], ["text", "2"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mPlanListIt_6']//sup") {
            inner() {
              set("2")
            }
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mPlanListIt_7 sup"], ["text", "2"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mPlanListIt_7']//sup") {
            inner() {
              set("2")
            }
          }
          
          
          #
          #Content::Formatting::Duplicate
          #[["duplicate_me", "#mPlanListIt_3 sup"], ["after_me", "#mPlanListIt_1 .savings strong"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
          $("(//*[@id = 'mPlanListIt_1']//*[contains(concat(' ', @class, ' '), ' savings ')]//strong)[1]") {
            copy_here("(//*[@id = 'mPlanListIt_3']//sup)[1]", "after")
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mPlanListIt_1 sup"], ["text", "1"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mPlanListIt_1']//sup") {
            inner() {
              set("1")
            }
          }
          
          
          #Loading Spinner
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Inject::InjectHTML
            #[["html", "<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("(//body/*[position() = 1 and self::*])[1]") {
              inject_before("<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>")
            }
            
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", "#mPlanListIt_2 button"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget12493")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[@id = 'mPlanListIt_2']//button)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger12493")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", "#mPlanListIt_3 button"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget29396")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[@id = 'mPlanListIt_3']//button)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger29396")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", "#mPlanListIt_4 button"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget50112")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[@id = 'mPlanListIt_4']//button)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger50112")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", "#mPlanListIt_1 button"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget307")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[@id = 'mPlanListIt_1']//button)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger307")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", "#mPlanListIt_5 button"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget261")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[@id = 'mPlanListIt_5']//button)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger261")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", "#mPlanListIt_6 button"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget69535")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[@id = 'mPlanListIt_6']//button)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger69535")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", "#mPlanListIt_7 button"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget93464")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[@id = 'mPlanListIt_7']//button)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger93464")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
          # end BasicGroup
          
        }
        
        
        #
        #Group::IgnoreGroup
        #[]
        # No match necessary - contents will be commented out
        #  #Optimize
        #  #Group::BasicGroup
        #  #[]
        #  # No need to wrap the contents at all
        #    #
        #    #Content::Javascript::RemoveScriptTagSrcContains
        #    #[["src_phrase", "mbox"]]
        #    $("//script[contains(@src, 'mbox')]") {
        #      remove()
        #    }
        #    
        #    
        #    #
        #    #Content::Javascript::AddScriptTag
        #    #[["javascript_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/jq_bundle.js?moov_cache_name=eharmony-jq_bundle.js&moov_cache_version=998689328529"], ["add_after", "title"]]
        #    $("//title") {
        #      insert_after("script") {
        #        attribute("src", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/jq_bundle.js?moov_cache_name=eharmony-jq_bundle.js&moov_cache_version=998689328529")
        #        attribute("language", "javascript")
        #      }
        #    }
        #    
        #    
        #  # end BasicGroup
        #  
        #  #
        #  #Content::Formatting::AddEventTrigger
        #  #[["target", ".mPlanListItem button"], ["target_event", "click"], ["trigger", ".mPlanListItem"], ["trigger_event", "mousedown"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
        #  var("targets", "")
        #  $("//*[contains(concat(' ', @class, ' '), ' mPlanListItem ')]//button") {
        #    var("targets") {
        #      append("a")
        #    }
        #    var("id", fetch("./@id"))
        #    match($id, /^$/) {
        #      attribute("id") {
        #        value() {
        #          set("etarget")
        #          append("42136")
        #        }
        #      }
        #    }
        #    var($targets, fetch("./@id"))
        #  }
        #  var("counter", "")
        #  $("//*[contains(concat(' ', @class, ' '), ' mPlanListItem ')]") {
        #    var("id", fetch("./@id"))
        #    match($id, /^$/) {
        #      attribute("id") {
        #        value() {
        #          set("etrigger")
        #          append("42136")
        #        }
        #      }
        #    }
        #    var("trigger_id", fetch("./@id"))
        #    var("counter") {
        #      append("a")
        #    }
        #    var("target_id", var(var("counter")))
        #    $("//html/body") {
        #      insert_bottom("script") {
        #        inner() {
        #          set("document.getElementById('")
        #          append($trigger_id)
        #          append("').addEventListener('mousedown', function(){moovweb_trigger('click', '")
        #          append($target_id)
        #          append("')},false);")
        #        }
        #      }
        #    }
        #  }
        #  
        #  
        
        
        #Payment Info
        #Group::ConditionalSelectorGroup
        #[["conditional_selector", "form[name=\"PHOptionalBillingInfoForm\"]"], ["negate", ""]]
        $("(//form[@name = \"PHOptionalBillingInfoForm\"])[1]") {
        
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBillingInformationWrap"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "form[name=\"SelectSubscriptionForm\"]"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//body)[1]") {
            match($done, "no") {
                var("conditional", "false")
                  $("//form[@name = \"SelectSubscriptionForm\"]") {
                    var("conditional", "true")
                  }
                match($conditional, "true") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBillingInformationWrap")
                }
              }
                }
            }
          }
          
          
          #Remove and Reorganize Elements
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".billform > h1, .billform > h2, .billform > ul:first-of-type"]]
            $("//*[contains(concat(' ', @class, ' '), ' billform ')]/h1") {
              remove()
            }
            $("//*[contains(concat(' ', @class, ' '), ' billform ')]/h2") {
              remove()
            }
            $("//*[contains(concat(' ', @class, ' '), ' billform ')]/ul[position() = 1]") {
              remove()
            }
            
            
            #
            #Content::Formatting::WrapElement
            #[["selector", ".billform > h3, .billform > ul:first-of-type"], ["class_name", "mBillingInformation"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
            var("found", "false")
            match($found, "false") {
              $("(//*[contains(concat(' ', @class, ' '), ' billform ')]/h3)[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformation")
                  move_here("//*[contains(concat(' ', @class, ' '), ' billform ')]/h3[not (@the_wrapper)]", "bottom")
                  move_here("//*[contains(concat(' ', @class, ' '), ' billform ')]/ul[position() = 1][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[contains(concat(' ', @class, ' '), ' billform ')]/ul[position() = 1])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformation")
                  move_here("//*[contains(concat(' ', @class, ' '), ' billform ')]/h3[not (@the_wrapper)]", "bottom")
                  move_here("//*[contains(concat(' ', @class, ' '), ' billform ')]/ul[position() = 1][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mBillingInformation > h3:nth-child(2)"]]
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]/*[position() = 2 and self::h3]") {
              remove()
            }
            
            
          # end BasicGroup
          
          #Input Placeholder Text
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "First Name"], ["selector", ".mBillingInformation li:nth-child(1) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = 1 and self::li]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      set("First Name")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Last Name"], ["selector", ".mBillingInformation li:nth-child(2) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = 2 and self::li]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      set("Last Name")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Street Address"], ["selector", ".mBillingInformation li:nth-child(3) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = 3 and self::li]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      set("Street Address")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Street Address 2"], ["selector", ".mBillingInformation li:nth-child(4) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = 4 and self::li]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      set("Street Address 2")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "City"], ["selector", ".mBillingInformation li:nth-child(5) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = 5 and self::li]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      set("City")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "ZIP"], ["selector", ".mBillingInformation li:nth-child(6) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = 6 and self::li]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      set("ZIP")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Phone (optional)"], ["selector", ".mBillingInformation li:nth-child(8) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = 8 and self::li]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      set("Phone (optional)")
                  }
                }
              }
            }
            
            
          # end BasicGroup
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBillingInformationInput"], ["selector", ".mBillingInformation input, .mBillingInformation select"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//input") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mBillingInformationInput")
                }
              }
            }
          }
          $("//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//select") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mBillingInformationInput")
                }
              }
            }
          }
          
          
          #
          #Content::Labeling::NumberElements
          #[["selector", ".mBillingInformationInput"], ["prefix", "mBillingInfoIn_"]]
          # Requires tritium >= 0.6.191
          $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationInput ')][not (@id)]") {
            $mw_temp = "mBillingInfoIn_"
            $mw_temp {
              append(index())
            }
            attribute("id", $mw_temp)
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "size"], ["selector", ".mBillingInformationInput"]]
          $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationInput ')]") {
            attribute("size") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "maxlength"], ["selector", ".mBillingInformationInput"]]
          $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationInput ')]") {
            attribute("maxlength") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBillingInformationSelect"], ["selector", ".mBillingInformation select"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//select") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mBillingInformationSelect")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBillingInformationUserEmail"], ["selector", ".mBillingInformation li:last-child span"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//*[position() = last() and self::li]//span)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBillingInformationUserEmail")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::WrapElement
          #[["selector", ".billform > ul"], ["class_name", "mPaymentInformation"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//*[contains(concat(' ', @class, ' '), ' billform ')]/ul)[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                attribute("class", "mPaymentInformation")
                move_here("//*[contains(concat(' ', @class, ' '), ' billform ')]/ul[not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mPaymentInformationTitle\">Payment Information</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mPaymentInformation ul"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mPaymentInformation ')]//ul)[1]") {
            inject_before("<div class=\"mPaymentInformationTitle\">Payment Information</div>")
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mPaymentInformationItem"], ["selector", ".mPaymentInformation li .value label"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformation ')]//li//*[contains(concat(' ', @class, ' '), ' value ')]//label") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mPaymentInformationItem")
                }
              }
            }
          }
          
          
          #
          #Content::Labeling::NumberElements
          #[["selector", ".mPaymentInformationItem"], ["prefix", "mPaymentInfoIt_"]]
          # Requires tritium >= 0.6.191
          $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformationItem ')][not (@id)]") {
            $mw_temp = "mPaymentInfoIt_"
            $mw_temp {
              append(index())
            }
            attribute("id", $mw_temp)
          }
          
          
          #Form
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Inject::InjectHTML
            #[["html", "<span class=\"mPaymentInformationItemName\">Paypal</span>"], ["add_after", "#mPaymentInfoIt_2 img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("//label[contains(@id, 'mPaymentInfoIt_')]//img") {
              $mw_item_name = fetch("@src")
              
              var("mw_item_name") {
                replace(/^.*\/cc-([a-zA-Z]+)\.gif$/, "$1")
              }
              
              match($mw_item_name) {
                with(/paypal/) {
                  $mw_item_name = "PayPal"
                }
                with(/visa/) {
                  $mw_item_name = "Visa"
                }
                with(/mastercard/) {
                  $mw_item_name = "MasterCard"
                }
                with(/maestro-solo/) {
                  $mw_item_name = "Maestro Solo"
                }
                with(/amexpress/) {
                  $mw_item_name = "American Express"
                }
                with(/discover/) {
                  $mw_item_name = "Discover"
                }
              }
              
              var("mw_item_name") {
                prepend("<span class=\"mPaymentInformationItemName\">")
                append("</span>")
              }
              
              inject_after($mw_item_name)
            }
            
            # $("(//*[@id = 'mPaymentInfoIt_2']//img)[1]") {
            #   inject_after("<span class=\"mPaymentInformationItemName\">MasterCard</span>")
            # }
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<span class=\"mPaymentInformationItemName\">Visa</span>"], ["add_after", "#mPaymentInfoIt_3 img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            # $("(//*[@id = 'mPaymentInfoIt_3']//img)[1]") {
            #   inject_after("<span class=\"mPaymentInformationItemName\">Visa</span>")
            # }
            
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<span class=\"mPaymentInformationItemName\">Mastercard</span>"], ["add_after", "#mPaymentInfoIt_4 img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            # $("(//*[@id = 'mPaymentInfoIt_4']//img)[1]") {
            #   inject_after("<span class=\"mPaymentInformationItemName\">Mastercard</span>")
            # }
            
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<span class=\"mPaymentInformationItemName\">American Express</span>"], ["add_after", "#mPaymentInfoIt_5 img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            # $("(//*[@id = 'mPaymentInfoIt_5']//img)[1]") {
            #   inject_after("<span class=\"mPaymentInformationItemName\">American Express</span>")
            # }
            
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<span class=\"mPaymentInformationItemName\">Discover</span>"], ["add_after", "#mPaymentInfoIt_6 img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            # $("(//*[@id = 'mPaymentInfoIt_6']//img)[1]") {
            #   inject_after("<span class=\"mPaymentInformationItemName\">Discover</span>")
            # }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mPaymentInformation br"]]
            $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformation ')]//br") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mPaymentInformationCard"], ["selector", ".mPaymentInformation li:not(.payment-options)"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformation ')]//li[not (contains(concat(' ', @class, ' '), ' payment-options '))]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mPaymentInformationCard")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::RemoveAttribute
            #[["attribute", "size"], ["selector", ".mPaymentInformationCard input"]]
            $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformationCard ')]//input") {
              attribute("size") {
                remove()
              }
            }
            
            
            #
            #Content::Formatting::RemoveAttribute
            #[["attribute", "maxlength"], ["selector", ".mPaymentInformationCard input"]]
            $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformationCard ')]//input") {
              attribute("maxlength") {
                remove()
              }
            }
            
            
            #
            #Content::Formatting::RemoveWhiteSpace
            #[["selector", ".mPaymentInformationCard .value"]]
            # NOTE: This will remove text elements that are whitespace only, but it will not remove
            # the preceding or following whitespace from elements that have some text
            $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformationCard ')]//*[contains(concat(' ', @class, ' '), ' value ')]/text()[normalize-space(.) = '']") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Card Number"], ["selector", ".mPaymentInformationCard input[name=\"creditCardNumber\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformationCard ')]//input[@name = \"creditCardNumber\"]") {
              match($done, "no") {
                attribute("placeholder") {
                  value() {
                      set("Card Number")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Security Code"], ["selector", ".mPaymentInformationCard input[name*=\"CVVNumber\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mPaymentInformationCard ')]//input[contains(@name, \"CVVNumber\")]") {
              match($done, "no") {
                attribute("placeholder") {
                  value() {
                      set("Security Code")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::ReplaceTag
            #[["selector", ".billform font"], ["new_tag_name", "span"], ["class_name", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' billform ')]//font") {
              name("span")
            }
            
            
            #
            #Content::Formatting::RemoveAttribute
            #[["attribute", "color"], ["selector", ".billform .asterisktxt"]]
            $("//*[contains(concat(' ', @class, ' '), ' billform ')]//*[contains(concat(' ', @class, ' '), ' asterisktxt ')]") {
              attribute("color") {
                remove()
              }
            }
            
            
            #
            #Content::Formatting::AddFileAttribute
            #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", "#continue-div input"]]
            # NOTE: just sets the attribute - doesn't do anything special for files
            $("//*[@id = 'continue-div']//input") {
              attribute("src", asset("images/continue_text.png"))
            }
            
            
            #
            #Group::IgnoreGroup
            #[]
            # No match necessary - contents will be commented out
            #  #
            #  #Content::Formatting::AddAttribute
            #  #[["attribute", "value"], ["value", "Continue"], ["selector", "#continue-div input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            #  var("done", "no")
            #  $("(//*[@id = 'continue-div']//input)[1]") {
            #    match($done, "no") {
            #        var("done", "yes")
            #      attribute("value") {
            #        value() {
            #            set("Continue")
            #        }
            #      }
            #    }
            #  }
            #  
            #  
            #  #
            #  #Modifying the value of an input changes what gets submitted to a customer. In this case it breaks the form submission.
            #  #Content::Formatting::AddAttribute
            #  #[["attribute", "type"], ["value", "button"], ["selector", "#continue-div input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            #  var("done", "no")
            #  $("(//*[@id = 'continue-div']//input)[1]") {
            #    match($done, "no") {
            #        var("done", "yes")
            #      attribute("type") {
            #        value() {
            #            set("button")
            #        }
            #      }
            #    }
            #  }
            #  
            #  
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", "#payment-paypal"]]
            $("//*[@id = 'payment-paypal']") {
              remove()
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mBillingInformation label"]]
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformation ')]//label") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBreadcrumbItemLinkActiveFull"], ["selector", ".mBreadcrumbItem:nth-of-type(2) .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 2]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mBreadcrumbItemLinkActiveFull")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBreadcrumbItemLinkComplete"], ["selector", ".mBreadcrumbItem:nth-of-type(1) .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mBreadcrumbItemLinkComplete")
                  }
                }
              }
            }
            
            
          # end BasicGroup
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mBillingInfoIn_6 option:first-child"], ["text", "Select A Country"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mBillingInfoIn_6']//*[position() = 1 and self::option]") {
            inner() {
              set("Select A Country")
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "type"], ["value", "number"], ["selector", "#mBillingInfoIn_6, #mBillingInfoIn_8"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[@id = 'mBillingInfoIn_6']") {
            match($done, "no") {
              attribute("type") {
                value() {
                    set("number")
                }
              }
            }
          }
          $("//*[@id = 'mBillingInfoIn_8']") {
            match($done, "no") {
              attribute("type") {
                value() {
                    set("number")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "type"], ["value", "number"], ["selector", "#cc-number input"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[@id = 'cc-number']//input") {
            match($done, "no") {
              attribute("type") {
                value() {
                    set("number")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "type"], ["value", "number"], ["selector", "li[id*=\"cvv-div\"] input[type=\"text\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//li[contains(@id, \"cvv-div\")]//input[@type = \"text\"]") {
            match($done, "no") {
              attribute("type") {
                value() {
                    set("number")
                }
              }
            }
          }
          
          
          #Loading Spinner
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Inject::InjectHTML
            #[["html", "<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("(//body/*[position() = 1 and self::*])[1]") {
              inject_before("<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>")
            }
            
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", ".billform #continue-div input"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget91781")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[contains(concat(' ', @class, ' '), ' billform ')]//*[@id = 'continue-div']//input)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger91781")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
          # end BasicGroup
          
        }
        
        
        #Billing Information
        #Group::ConditionalSelectorGroup
        #[["conditional_selector", "form[name=\"ProcessSubscriptionForm\"]"], ["negate", ""]]
        $("(//form[@name = \"ProcessSubscriptionForm\"])[1]") {
        
          #
          #Group::IgnoreGroup
          #[]
          # No match necessary - contents will be commented out
          #  #
          #  #Content::Formatting::AddAttribute
          #  #[["attribute", "class"], ["value", "mBillingInformationEnteredContent"], ["selector", ".mBillingInformationEntered .billform"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          #  var("done", "no")
          #  $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEntered ')]//*[contains(concat(' ', @class, ' '), ' billform ')])[1]") {
          #    match($done, "no") {
          #        var("done", "yes")
          #      attribute("class") {
          #        value() {
          #            append(" mBillingInformationEnteredContent")
          #        }
          #      }
          #    }
          #  }
          #  
          #  
          #  #
          #  #Content::Formatting::WrapWithNextSibling
          #  #[["selector", ".mBillingInformationEnteredContent h3"], ["wrapper_class", "mBillingInformationEnteredContentSegment"], ["sibling_count", "2"]]
          #  $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContent ')]//h3") {
          #    wrap("div") {
          #      attribute("class", "mBillingInformationEnteredContentSegment")
          #      move_here("(following-sibling::*)[1]", "bottom")
          #      move_here("(following-sibling::*)[1]", "bottom")
          #    }
          #  }
          #  
          #  
          #  #
          #  #Content::Formatting::AddAttribute
          #  #[["attribute", "class"], ["value", "mBillingInformationEnteredContentSegmentTitle"], ["selector", ".mBillingInformationEnteredContentSegment h3"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          #  var("done", "no")
          #  $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContentSegment ')]//h3") {
          #    match($done, "no") {
          #      attribute("class") {
          #        value() {
          #            append(" mBillingInformationEnteredContentSegmentTitle")
          #        }
          #      }
          #    }
          #  }
          #  
          #  
          #  #
          #  #Content::Formatting::AddAttribute
          #  #[["attribute", "class"], ["value", "mBillingInformationEnteredContentSegmentContent"], ["selector", ".mBillingInformationEnteredContentSegment > ul, .mBillingInformationEnteredContentSegment > div"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          #  var("done", "no")
          #  $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContentSegment ')]/ul") {
          #    match($done, "no") {
          #      attribute("class") {
          #        value() {
          #            append(" mBillingInformationEnteredContentSegmentContent")
          #        }
          #      }
          #    }
          #  }
          #  $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContentSegment ')]/div") {
          #    match($done, "no") {
          #      attribute("class") {
          #        value() {
          #            append(" mBillingInformationEnteredContentSegmentContent")
          #        }
          #      }
          #    }
          #  }
          #  
          #  
          #  #
          #  #Content::Formatting::AddAttribute
          #  #[["attribute", "class"], ["value", "mBillingInformationEnteredContentSegmentContentEdit"], ["selector", ".mBillingInformationEnteredContentSegmentContent .value a:contains(\"Edit\")"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          #  var("done", "no")
          #  $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContentSegmentContent ')]//*[contains(concat(' ', @class, ' '), ' value ')]//a[contains(., \"Edit\")]") {
          #    match($done, "no") {
          #      attribute("class") {
          #        value() {
          #            append(" mBillingInformationEnteredContentSegmentContentEdit")
          #        }
          #      }
          #    }
          #  }
          #  
          #  
          #  #
          #  #Content::Formatting::MoveAfter
          #  #[["move_me", ".mBillingInformationEnteredContentSegmentContentEdit"], ["after_me", ".mBillingInformationEnteredContentSegment:nth-of-type(2) .mBillingInformationEnteredContentSegmentTitle"], ["map_multiple", ""]]
          #  $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContentSegment ') and position() = 2]//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContentSegmentTitle ')])[1]") {
          #    move_here("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredContentSegmentContentEdit ')])[1]", "after")
          #  }
          #  
          #  
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBillingInformationEntered"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//body)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBillingInformationEntered")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".conftitle"]]
          $("//*[contains(concat(' ', @class, ' '), ' conftitle ')]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".billform > div:not(.padtop)"]]
          $("//*[contains(concat(' ', @class, ' '), ' billform ')]/div[not (contains(concat(' ', @class, ' '), ' padtop '))]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".billform br"]]
          $("//*[contains(concat(' ', @class, ' '), ' billform ')]//br") {
            remove()
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBillingInformationEnteredForm"], ["selector", ".billform"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' billform ')])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBillingInformationEnteredForm")
                }
              }
            }
          }
          
          
          #Form
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBillingInformationEnteredFormSegment"], ["selector", ".mBillingInformationEnteredForm ul"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredForm ')]//ul)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mBillingInformationEnteredFormSegment")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::ReplaceTag
            #[["selector", ".mBillingInformationEnteredForm .confirm li"], ["new_tag_name", "div"], ["class_name", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredForm ')]//*[contains(concat(' ', @class, ' '), ' confirm ')]//li") {
              name("div")
            }
            
            
            #
            #Content::Formatting::RemoveExcept
            #[["remove", ".mBillingInformationEnteredForm .confirm"], ["keep", "div"]]
            # 1 move all the keep stuff just after the remove stuff
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredForm ')]//*[contains(concat(' ', @class, ' '), ' confirm ')]") {
              move_here(".//div", "before")
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBillingInformationEnteredFormSegmentItem"], ["selector", ".mBillingInformationEnteredForm > div:not(.alt)"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredForm ')]/div[not (contains(concat(' ', @class, ' '), ' alt '))]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mBillingInformationEnteredFormSegmentItem")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBillingInformationEnteredFormSegmentTitle"], ["selector", ".mBillingInformationEnteredForm > div:not(.mBillingInformationEnteredFormSegmentItem)"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredForm ')]/div[not (contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentItem '))]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mBillingInformationEnteredFormSegmentTitle")
                  }
                }
              }
            }
            
            
            #
            #Content::Labeling::NumberElements
            #[["selector", ".mBillingInformationEnteredFormSegmentItem"], ["prefix", "mBIEFormSegItem_"]]
            # Requires tritium >= 0.6.191
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentItem ')][not (@id)]") {
              $mw_temp = "mBIEFormSegItem_"
              $mw_temp {
                append(index())
              }
              attribute("id", $mw_temp)
            }
            
            
            #
            #Content::Labeling::NumberElements
            #[["selector", ".mBillingInformationEnteredFormSegmentTitle"], ["prefix", "mBIEFormSegTitle_"]]
            # Requires tritium >= 0.6.191
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentTitle ')][not (@id)]") {
              $mw_temp = "mBIEFormSegTitle_"
              $mw_temp {
                append(index())
              }
              attribute("id", $mw_temp)
            }
            
            
            #
            #Content::Formatting::WrapElement
            #[["selector", "#mBIEFormSegItem_1, #mBIEFormSegItem_2, #mBIEFormSegItem_3"], ["class_name", "mBillingInformationEnteredFormSegmentContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
            var("found", "false")
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_1'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_1'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_2'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_3'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_2'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_1'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_2'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_3'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_3'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_1'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_2'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_3'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::WrapElement
            #[["selector", "#mBIEFormSegItem_4, #mBIEFormSegItem_5, #mBIEFormSegItem_6, #mBIEFormSegItem_7, #mBIEFormSegItem_8, #mBIEFormSegItem_9, #mBIEFormSegItem_10"], ["class_name", "mBillingInformationEnteredFormSegmentContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
            var("found", "false")
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_4'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_4'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_5'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_6'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_7'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_8'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_9'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_10'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_5'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_4'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_5'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_6'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_7'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_8'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_9'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_10'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_6'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_4'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_5'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_6'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_7'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_8'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_9'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_10'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_7'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_4'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_5'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_6'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_7'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_8'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_9'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_10'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_8'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_4'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_5'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_6'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_7'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_8'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_9'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_10'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_9'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_4'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_5'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_6'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_7'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_8'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_9'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_10'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_10'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_4'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_5'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_6'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_7'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_8'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_9'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_10'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::WrapElement
            #[["selector", "#mBIEFormSegItem_11, #mBIEFormSegItem_12, #mBIEFormSegItem_13"], ["class_name", "mBillingInformationEnteredFormSegmentContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
            var("found", "false")
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_11'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_11'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_12'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_13'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_12'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_11'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_12'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_13'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            match($found, "false") {
              $("(//*[@id = 'mBIEFormSegItem_13'])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[@id = 'mBIEFormSegItem_11'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_12'][not (@the_wrapper)]", "bottom")
                  move_here("//*[@id = 'mBIEFormSegItem_13'][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mBillingInformationEnteredForm h3"]]
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredForm ')]//h3") {
              remove()
            }
            
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<div class=\"mBillingInformationEnteredFormSegmentTitle\">Subscription Information</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mBillingInformationEnteredFormSegment li"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegment ')]//li)[1]") {
              inject_before("<div class=\"mBillingInformationEnteredFormSegmentTitle\">Subscription Information</div>")
            }
            
            
            #
            #Content::Formatting::ReplaceTag
            #[["selector", ".mBillingInformationEnteredFormSegment li, .mBillingInformationEnteredFormSegment ul"], ["new_tag_name", "div"], ["class_name", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegment ')]//li") {
              name("div")
            }
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegment ')]//ul") {
              name("div")
            }
            
            
            #
            #Content::Formatting::WrapWithNextSibling
            #[["selector", ".mBillingInformationEnteredForm > .mBillingInformationEnteredFormSegmentTitle"], ["wrapper_class", "mBillingInformationEnteredFormSegment"], ["sibling_count", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredForm ')]/*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentTitle ')]") {
              wrap("div") {
                attribute("class", "mBillingInformationEnteredFormSegment")
                move_here("(following-sibling::*)[1]", "bottom")
              }
            }
            
            
            #
            #Content::Formatting::WrapElement
            #[["selector", ".mBillingInformationEnteredFormSegment:first-of-type > div:not(.mBillingInformationEnteredFormSegmentTitle)"], ["class_name", "mBillingInformationEnteredFormSegmentContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
            var("found", "false")
            match($found, "false") {
              $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegment ') and position() = 1]/div[not (contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentTitle '))])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mBillingInformationEnteredFormSegmentContent")
                  move_here("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegment ') and position() = 1]/div[not (contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentTitle '))][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBillingInformationEnteredFormSegmentEdit"], ["selector", ".mBillingInformationEnteredFormSegmentTitle .value"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentTitle ')]//*[contains(concat(' ', @class, ' '), ' value ')]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mBillingInformationEnteredFormSegmentEdit")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::MoveUp
            #[["move_me", ".mBillingInformationEnteredFormSegmentEdit"]]
            $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentEdit ')]") {
              move_to("..", "before")
            }
            
            
            #Submit Button
            #Group::BasicGroup
            #[]
            # No need to wrap the contents at all
              #
              #Content::Formatting::RemoveExcept
              #[["remove", "#mBIEFormSegItem_14"], ["keep", "#ez2"]]
              # 1 move all the keep stuff just after the remove stuff
              $("//*[@id = 'mBIEFormSegItem_14']") {
                move_here(".//*[@id = 'ez2']", "before")
                remove()
              }
              
              
              #
              #Content::Formatting::AddAttribute
              #[["attribute", "class"], ["value", "mBillingInformationEnteredSubmitWrap"], ["selector", "#ez2"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
              var("done", "no")
              $("(//*[@id = 'ez2'])[1]") {
                match($done, "no") {
                    var("done", "yes")
                  attribute("class") {
                    value() {
                        append(" mBillingInformationEnteredSubmitWrap")
                    }
                  }
                }
              }
              
              
              #
              #Content::Formatting::AddFileAttribute
              #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", ".mBillingInformationEnteredSubmitWrap input"]]
              # NOTE: just sets the attribute - doesn't do anything special for files
              $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredSubmitWrap ')]//input") {
                attribute("src", asset("images/continue_text.png"))
              }
              
              
              #
              #Content::Formatting::WrapTextChildren
              #[["selector", ".mBillingInformationEnteredSubmitWrap"], ["tag_name", ""], ["class_name", "mRemove"], ["multiple", ""], ["split_delimiter", ""]]
              $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredSubmitWrap ')])[1]") {
                wrap_text_children("div", class: 'mRemove')
              }
              
              
              #
              #Content::Formatting::RemoveElements
              #[["selector", ".mBillingInformationEnteredSubmitWrap span, .mRemove"]]
              $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredSubmitWrap ')]//span") {
                remove()
              }
              $("//*[contains(concat(' ', @class, ' '), ' mRemove ')]") {
                remove()
              }
              
              
            # end BasicGroup
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBreadcrumbItemLinkActiveFull"], ["selector", ".mBreadcrumbItem:nth-of-type(2) .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".mBillingInformationEntered"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 2]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
              match($done, "no") {
                  var("conditional", "false")
                    $("//*[contains(concat(' ', @class, ' '), ' mBillingInformationEntered ')]") {
                      var("conditional", "true")
                    }
                  match($conditional, "true") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mBreadcrumbItemLinkActiveFull")
                  }
                }
                  }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mBreadcrumbItemLinkComplete"], ["selector", ".mBreadcrumbItem:first-child .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mBreadcrumbItemLinkComplete")
                  }
                }
              }
            }
            
            
          # end BasicGroup
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mBillingInformationEnteredSubmitThanks\">Thank You! Please select \"Continue\" to complete your subscription.</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mBillingInformationEnteredSubmitWrap"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredSubmitWrap ')])[1]") {
            inject_before("<div class=\"mBillingInformationEnteredSubmitThanks\">Thank You! Please select \"Continue\" to complete your subscription.</div>")
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mCongratsFooter\"> <span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText_1\">At the end of this subscription term your membership will renew for</span> <span class=\"mCongratsFooterText_2\"></span>. <div class=\"mCongratsFooterText_3\">You may disable this option after completing your purchase by logging into your eHarmony account and clicking on the \"Cancel My Subscription\" link on your Account Settings page. Please note that if you paid for your subscription or renewal using a multi-part payment option, you may only disable the auto-renew feature after the final payment on your subscription/renewal has been made.</div></div>"], ["add_after", "#ez2"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'ez2'])[1]") {
            inject_after("<div class=\"mCongratsFooter\"> <span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText_1\">At the end of this subscription term your membership will renew for</span> <span class=\"mCongratsFooterText_2\" style=\"font-weight: bold\"></span>. <div class=\"mCongratsFooterText_3\">You may disable this option after completing your purchase by logging into your eHarmony account and clicking on the \"Cancel My Subscription\" link on your Account Settings page. Please note that if you paid for your subscription or renewal using a multi-part payment option, you may only disable the auto-renew feature after the final payment on your subscription/renewal has been made.</div></div>")
          }
          
          
          #
          #Content::Formatting::MoveToEndOf
          #[["move_me", ".mw_pricing_text_1"], ["to_end_of_me", ".mCongratsFooterText_2"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterText_2 ')])[1]") {
            move_here("(//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_1 ')])[1]", "bottom")
          }
          
          
          #
          #Content::Formatting::MoveToEndOf
          #[["move_me", ".mw_pricing_text_2"], ["to_end_of_me", ".mCongratsFooterText_2"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterText_2 ')])[1]") {
            move_here("(//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_2 ')])[1]", "bottom")
          }
          
          
          #Loading Spinner
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Inject::InjectHTML
            #[["html", "<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("(//body/*[position() = 1 and self::*])[1]") {
              inject_before("<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>")
            }
            
            
            #
            #Content::Formatting::Dynamic::RemoveClassOnEvent
            #[["target", ".mw_SpinnerOverlay"], ["trigger", ".mBillingInformationEnteredSubmitWrap input"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
            $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstarget86650")
                  }
                }
              }
              var("target_id", fetch("./@id"))
            }
            $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredSubmitWrap ')]//input)[1]") {
              var("id", fetch("./@id"))
              match($id, /^$/) {
                attribute("id") {
                  value() {
                    set("addclasstrigger86650")
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
                      append("'),'mw_SpinnerOverlayHide');},false);")
                    }
                  }
                }
              }
            }
            
          # end BasicGroup
          
          #
          #Group::IgnoreGroup
          #[]
          # No match necessary - contents will be commented out
          #  #
          #  #Content::Inject::InjectHTML
          #  #[["html", "<div class=\"mCongratsFooter\">Receiving email is an important part of using eHarmony. Some spam filters may prevent you from receiving important account updates or matching notifications via email. To ensure that you receive all of your eHarmony emails, please add eHarmony to your email Address Book or Safe List. You may disable your subscription auto-renewal on your Account Settings page.</div>"], ["add_after", "#ez2"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          #  $("(//*[@id = 'ez2'])[1]") {
          #    inject_after("<div class=\"mCongratsFooter\">Receiving email is an important part of using eHarmony. Some spam filters may prevent you from receiving important account updates or matching notifications via email. To ensure that you receive all of your eHarmony emails, please add eHarmony to your email Address Book or Safe List. You may disable your subscription auto-renewal on your Account Settings page.</div>")
          #  }
          #  
          #  
          
          
          #
          #Group::IgnoreGroup
          #[]
          # No match necessary - contents will be commented out
          #  #Footer
          #  #Group::BasicGroup
          #  #[]
          #  # No need to wrap the contents at all
          #    #
          #    #Content::Inject::InjectHTML
          #    #[["html", "<div class=\"mCongratsFooter\"></div>"], ["add_after", ".cntrpage"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          #    $("(//*[contains(concat(' ', @class, ' '), ' cntrpage ')])[1]") {
          #      inject_after("<div class=\"mCongratsFooter\"></div>")
          #    }
          #    
          #    
          #    #
          #    #Content::Formatting::SetInnerHTML
          #    #[["selector", ".mCongratsFooter"], ["html", "<span class=\"mCongratsFooterText\"><span class=\"mCongratsFooterTextStrong\">Please Note:</span> At the end of this subscription term your membership will renew for only <span class=\"mCongratsFooterTextPrice\"></span> for <span class=\"mCongratsFooterTextDuration\"></span>.</span>"], ["prepend", ""], ["append", ""]]
          #    $("//*[contains(concat(' ', @class, ' '), ' mCongratsFooter ')]") {
          #      inner("<span class=\"mCongratsFooterText\"><span class=\"mCongratsFooterTextStrong\">Please Note:</span> At the end of this subscription term your membership will renew for only <span class=\"mCongratsFooterTextPrice\"></span> for <span class=\"mCongratsFooterTextDuration\"></span>.</span>")
          #    }
          #    
          #    
          #    #
          #    #Content::Formatting::DuplicateInnerText
          #    #[["duplicate_source", ".mBillingInformationEnteredFormSegment:first-of-type .mBillingInformationEnteredFormSegmentContent .even .value"], ["duplicate_target", ".mCongratsFooterTextPrice"], ["multiple", ""], ["common_ancestor", ""]]
          #    $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegment ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentContent ')]//*[contains(concat(' ', @class, ' '), ' even ')]//*[contains(concat(' ', @class, ' '), ' value ')])[1]") {
          #      var("text", fetch("text()"))
          #      $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterTextPrice ')])[1]") {
          #        inner($text)
          #      }
          #    }
          #    
          #    
          #    #
          #    #Content::Formatting::DuplicateInnerText
          #    #[["duplicate_source", ".mBillingInformationEnteredFormSegment:first-of-type .mBillingInformationEnteredFormSegmentContent .odd .value strong"], ["duplicate_target", ".mCongratsFooterText .mCongratsFooterTextDuration"], ["multiple", ""], ["common_ancestor", ""]]
          #    $("(//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegment ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBillingInformationEnteredFormSegmentContent ')]//*[contains(concat(' ', @class, ' '), ' odd ')]//*[contains(concat(' ', @class, ' '), ' value ')]//strong)[1]") {
          #      var("text", fetch("text()"))
          #      $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterText ')]//*[contains(concat(' ', @class, ' '), ' mCongratsFooterTextDuration ')])[1]") {
          #        inner($text)
          #      }
          #    }
          #    
          #    
          #    #
          #    #Content::Inject::InjectHTML
          #    #[["html", "<span class=\"mCongratsFooterText\">You may disable this option after completing your purchase by logging into your eHarmony account and clicking the \"Cancel My Subscription\" link on your Account Settings page. Please note that if you paid for your subscription using a multi-part payment option you may only disable the auto-renew feature after the final payment on your subscription has been made.</span>"], ["add_after", ".mCongratsFooterText"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          #    $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooterText ')])[1]") {
          #      inject_after("<span class=\"mCongratsFooterText\">You may disable this option after completing your purchase by logging into your eHarmony account and clicking the \"Cancel My Subscription\" link on your Account Settings page. Please note that if you paid for your subscription using a multi-part payment option you may only disable the auto-renew feature after the final payment on your subscription has been made.</span>")
          #    }
          #    
          #    
          #    #
          #    #Content::Formatting::SetInnerText
          #    #[["selector", ".mCongratsFooterTextPrice"], ["text", ""], ["match_string", "One Payment of "], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          #    # NOTE: not sure if /html() or /text() is what I want to be using here
          #    $("//*[contains(concat(' ', @class, ' '), ' mCongratsFooterTextPrice ')]") {
          #      inner() {
          #        replace("One Payment of ", "")
          #      }
          #    }
          #    
          #    
          #    #
          #    #Content::Formatting::SetInnerText
          #    #[["selector", ".mCongratsFooterTextDuration"], ["text", ""], ["match_string", " TotalConnect"], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          #    # NOTE: not sure if /html() or /text() is what I want to be using here
          #    $("//*[contains(concat(' ', @class, ' '), ' mCongratsFooterTextDuration ')]") {
          #      inner() {
          #        replace(" TotalConnect", "")
          #      }
          #    }
          #    
          #    
          #  # end BasicGroup
          #  
          
          
        }
        
        
        #
        #Group::IgnoreGroup
        #[]
        # No match necessary - contents will be commented out
        #  #
        #  #Content::Formatting::RemoveElements
        #  #[["selector", ".mSubscriptionFootnotes a"]]
        #  $("//*[contains(concat(' ', @class, ' '), ' mSubscriptionFootnotes ')]//a") {
        #    remove()
        #  }
        #  
        #  
        
        
        #
        #Content::Formatting::RemoveExcept
        #[["remove", "body > table"], ["keep", ".errorMessageBox"]]
        # 1 move all the keep stuff just after the remove stuff
        $("//body/table") {
          move_here(".//*[contains(concat(' ', @class, ' '), ' errorMessageBox ')]", "before")
          remove()
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".errorMessageBox"], ["after_me", ".mBreadcrumbs"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbs ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' errorMessageBox ')])[1]", "after")
        }
        
        
        #
        #Group::IgnoreGroup
        #[]
        # No match necessary - contents will be commented out
        #  #
        #  #Content::Formatting::SetInnerText
        #  #[["selector", ".mSubscriptionFootnotes strong"], ["text", ""], ["match_string", " to view our current renewal rates."], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        #  # NOTE: not sure if /html() or /text() is what I want to be using here
        #  $("//*[contains(concat(' ', @class, ' '), ' mSubscriptionFootnotes ')]//strong") {
        #    inner() {
        #      replace(" to view our current renewal rates.", "")
        #    }
        #  }
        #  
        #  
        #  #InsertExtracted HTML (Broken)
        #  #Group::BasicGroup
        #  #[]
        #  # No need to wrap the contents at all
        #    #
        #    #Content::Features::InsertExtractedHTMLChunk
        #    #[["add_after", ".featurebox"], ["chunk_name", "renewalRates"], ["source_url", "http://r7.eharmony.com/singles/servlet/subscription/renewal/info?x=0.5242861283477396"], ["source_selector", "body table:first-of-type"], ["dont_cache", "true"]]
        #    # NOTE: No converter for this block because it is rarely used.
        #    # On macys it is always in an ignore group
        #    # Might be used on movies, lendingtree, hammacher, and eharmony
        #    
        #    
        #  # end BasicGroup
        #  
        
        
      # end BasicGroup
      
    }
    
    
    #ConditionalSelectorGroup - Target Upsell
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "body.venice"], ["negate", ""]]
    $("(//body[contains(concat(' ', @class, ' '), ' venice ')])[1]") {
    
      #Choose Plan
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "form[name=\"SelectSubscriptionForm\"]"], ["negate", ""]]
      $("(//form[@name = \"SelectSubscriptionForm\"])[1]") {
      
        #Remove and Reorganize
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#header-wrapper"]]
          $("//*[@id = 'header-wrapper']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#orange-navbar"]]
          $("//*[@id = 'orange-navbar']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#smartbanner"]]
          $("//*[@id = 'smartbanner']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "body table td:first-of-type"]]
          $("//body//table//td[position() = 1]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".eh-footer"]]
          $("//*[contains(concat(' ', @class, ' '), ' eh-footer ')]") {
            remove()
          }
          
          
          #
          #Content::Formatting::Table::Remove::ColumnDump
          #[["selector", "table:first-of-type"]]
          $("//table[position() = 1]") {
            # TODO: only go forward if this is a table element
            $("tr") {
              $("td") {
                name("div")
                move_to("..", "before")
              }
              remove()
            }
            name("div")
            attribute("was_table", "true")
            attribute("cellspacing") {
              remove()
            }
            attribute("cellpadding") {
              remove()
            }
            attribute("border") {
              remove()
            }
          }
          
          
        # end BasicGroup
        
        #Choose Plan
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mSelectPlanContent"], ["selector", "form > div"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//form/div)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mSelectPlanContent")
                }
              }
            }
          }
          
          
          #Plan Listing
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mSelectPlanContent h1"]]
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContent ')]//h1") {
              remove()
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", "mSelectPlanContent .red"]]
            $("//mSelectPlanContent//*[contains(concat(' ', @class, ' '), ' red ')]") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mSelectPlanContentPlans"], ["selector", ".mSelectPlanContent .selectbox"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContent ')]//*[contains(concat(' ', @class, ' '), ' selectbox ')])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mSelectPlanContentPlans")
                  }
                }
              }
              
              $("./div[contains(@class, 'plan-')]") {
                add_class("radiobox")
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mSelectPlanContentPlans > br"]]
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlans ')]/br") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mSelectPlanContentPlansItem"], ["selector", ".mSelectPlanContentPlans .radiobox"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlans ')]//*[contains(concat(' ', @class, ' '), ' radiobox ')]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mSelectPlanContentPlansItem")
                  }
                }
              }
            }
            
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<div class=\"mPlanTitle\"> <span class=\"mPlanTitleLarge\">Upgrade your Membership!</span> <span class=\"mPlanTitleSub\">Communicate, View Photos and more.</span> </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mSelectPlanContentPlansItem"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItem ')])[1]") {
              inject_before("<div class=\"mPlanTitle\"> <span class=\"mPlanTitleLarge\">Upgrade your Membership!</span> <span class=\"mPlanTitleSub\">Communicate, View Photos and more.</span> </div>")
            }
            
            
            #
            #Content::Labeling::NumberElements
            #[["selector", ".mSelectPlanContentPlansItem"], ["prefix", "mSelectPlanConPlanIt_"]]
            # Requires tritium >= 0.6.191
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItem ')][not (@id)]") {
              $mw_temp = "mSelectPlanConPlanIt_"
              $mw_temp {
                append(index())
              }
              attribute("id", $mw_temp)
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mSelectPlanContentPlansItem br"]]
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItem ')]//br") {
              remove()
            }
            
            
            #
            #Content::Formatting::RemoveEmptyElements
            #[["selector", ".mSelectPlanContentPlansItem > p"]]
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItem ')]") {
              $("./p") {
                # Trim white spaces
                $("self::p[not(descendant::*)]") {
                  text() {
                    replace(/^\s*|\s*$/, "")
                  }
                }
                # if after trim, there's no text, then remove
                match(fetch("./text()"), "") {
                  remove()
                }
                $("self::p[contains(@class, 'plan-period')]") {
                  wrap_text_children("span", class: "txt18")
                }
                $("self::p[contains(@class, 'plan-savings')]") {
                  inner() {
                    replace(/^\s*/, "<strong>")
                    replace(/%/, "%</strong>")
                  }
                }
                inner() {
                  replace(/(\d{1,2} [mM]onths?)/, "<span class=\"txt18\">$1</span>")
                }
              }
              $("./label/span[contains(@class, 'plan-price')]") {
                wrap_text_children("b")
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mSelectPlanContentPlansItem > .red:first-child"]]
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItem ')]/*[contains(concat(' ', @class, ' '), ' red ') and position() = 1]") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mSelectPlanContentPlansItemTitle"], ["selector", ".mSelectPlanContentPlansItem > p:first-child"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItem ')]/*[position() = 1 and self::p]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mSelectPlanContentPlansItemTitle")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mSelectPlanContentPlansItemRadio"], ["selector", ".mSelectPlanContentPlansItem > div:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItem ')]/div[position() = 1]") {
              match($done, "no") {
                attribute("class") {
                  value() {
                      append(" mSelectPlanContentPlansItemRadio")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::WrapTextChildren
            #[["selector", "#mSelectPlanConPlanIt_1"], ["tag_name", "span"], ["class_name", ""], ["multiple", ""], ["split_delimiter", ""]]
            $("(//*[@id = 'mSelectPlanConPlanIt_1'])[1]") {
              wrap_text_children("span")
            }
            
            
            #
            #Content::Formatting::WrapWithNextSibling
            #[["selector", "#mSelectPlanConPlanIt_1 .mSelectPlanContentPlansItemRadio"], ["wrapper_class", "mSelectPlanContentPlansItemRadioWrap"], ["sibling_count", ""]]
            $("//*[@id = 'mSelectPlanConPlanIt_1']//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPlansItemRadio ')]") {
              wrap("div") {
                attribute("class", "mSelectPlanContentPlansItemRadioWrap")
                move_here("(following-sibling::*)[1]", "bottom")
              }
            }
            
            
          # end BasicGroup
          
          #Promo
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::WrapElement
            #[["selector", ".giftcard"], ["class_name", "mSelectPlanContentPromo"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
            var("found", "false")
            match($found, "false") {
              $("(//*[contains(concat(' ', @class, ' '), ' giftcard ')])[1]") {
                var("found", "true")
                insert_before("div") {
                  attribute("the_wrapper", "true")
                  attribute("class", "mSelectPlanContentPromo")
                  move_here("//*[contains(concat(' ', @class, ' '), ' giftcard ')][not (@the_wrapper)]", "bottom")
                  attribute("the_wrapper") {
                    remove()
                  }
                }
              }
            }
            
            
            #
            #Content::Inject::InjectHTML
            #[["html", "<span class=\"mSelectPlanContentPromoTitle\">Use A Gift Card</span>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mSelectPlanContentPromo .giftcard"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromo ')]//*[contains(concat(' ', @class, ' '), ' giftcard ')])[1]") {
              inject_before("<span class=\"mSelectPlanContentPromoTitle\">Use A Gift Card</span>")
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".giftcard br"]]
            $("//*[contains(concat(' ', @class, ' '), ' giftcard ')]//br") {
              remove()
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".giftcard br, .giftcard label"]]
            $("//*[contains(concat(' ', @class, ' '), ' giftcard ')]//br") {
              remove()
            }
            $("//*[contains(concat(' ', @class, ' '), ' giftcard ')]//label") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Number"], ["selector", ".mSelectPlanContentPromo input:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromo ')]//input[position() = 1])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      append(" Number")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "PIN"], ["selector", ".mSelectPlanContentPromo input:nth-of-type(2)"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromo ')]//input[position() = 2])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      append(" PIN")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "placeholder"], ["value", "Enter Code"], ["selector", ".mSelectPlanContentPromo input:nth-of-type(3)"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromo ')]//input[position() = 3])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("placeholder") {
                  value() {
                      append(" Enter Code")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::WrapTextChildren
            #[["selector", ".mSelectPlanContentPromo .giftcard"], ["tag_name", "div"], ["class_name", "mSelectPlanContentPromoText"], ["multiple", ""], ["split_delimiter", ""]]
            $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromo ')]//*[contains(concat(' ', @class, ' '), ' giftcard ')])[1]") {
              wrap_text_children("div", class: 'mSelectPlanContentPromoText')
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mSelectPlanContentPromoCodeTitle"], ["selector", ".giftcard div:nth-of-type(2)"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' giftcard ')]//div[position() = 2])[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mSelectPlanContentPromoCodeTitle")
                  }
                }
              }
            }
            
            
            #
            #Content::Formatting::SetInnerHTML
            #[["selector", ".mSelectPlanContentPromoCodeTitle"], ["html", "<span class=\"mSelectPlanContentPromoCodeTitleSub_1\">Promotional Code</span><span class=\"mSelectPlanContentPromoCodeTitleSub_2\">(optional)</span>"], ["prepend", ""], ["append", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromoCodeTitle ')]") {
              inner("<span class=\"mSelectPlanContentPromoCodeTitleSub_1\">Promotional Code</span><span class=\"mSelectPlanContentPromoCodeTitleSub_2\">(optional)</span>")
            }
            
            
          # end BasicGroup
          
          #Continue Button
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".continue a"]]
            $("//*[contains(concat(' ', @class, ' '), ' continue ')]//a") {
              remove()
            }
            
            
            #
            #Content::Formatting::AddFileAttribute
            #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", ".continue input"]]
            # NOTE: just sets the attribute - doesn't do anything special for files
            $("//*[contains(concat(' ', @class, ' '), ' continue ')]//input") {
              attribute("src", asset("images/continue_text.png"))
            }
            
            
            #
            #Content::Formatting::AddAttribute
            #[["attribute", "class"], ["value", "mSelectPlanContentContinue"], ["selector", ".continue input"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
            var("done", "no")
            $("(//*[contains(concat(' ', @class, ' '), ' continue ')]//input)[1]") {
              match($done, "no") {
                  var("done", "yes")
                attribute("class") {
                  value() {
                      append(" mSelectPlanContentContinue")
                  }
                }
              }
            }
            
            
          # end BasicGroup
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mSelectPlanContent br, .mSelectPlanContent .footnote"]]
          $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContent ')]//br") {
            remove()
          }
          $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContent ')]//*[contains(concat(' ', @class, ' '), ' footnote ')]") {
            remove()
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBreadcrumbItemLinkActive"], ["selector", ".mBreadcrumbItem:first-child .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBreadcrumbItemLinkActive")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mSelectPlanContentPromoTitle, .mSelectPlanContentPromoText"]]
          $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromoTitle ')]") {
            remove()
          }
          $("//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentPromoText ')]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".giftcard input[name=\"giftCardNumber\"]"]]
          $("//*[contains(concat(' ', @class, ' '), ' giftcard ')]//input[@name = \"giftCardNumber\"]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".giftcard input[name=\"giftCardPin\"]"]]
          $("//*[contains(concat(' ', @class, ' '), ' giftcard ')]//input[@name = \"giftCardPin\"]") {
            remove()
          }
          
          
        # end BasicGroup
        
        #Loading Spinner
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//body/*[position() = 1 and self::*])[1]") {
            inject_before("<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>")
          }
          
          
          #
          #Content::Formatting::Dynamic::RemoveClassOnEvent
          #[["target", ".mw_SpinnerOverlay"], ["trigger", ".mSelectPlanContentContinue"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
          $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstarget51905")
                }
              }
            }
            var("target_id", fetch("./@id"))
          }
          $("(//*[contains(concat(' ', @class, ' '), ' mSelectPlanContentContinue ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstrigger51905")
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
                    append("'),'mw_SpinnerOverlayHide');},false);")
                  }
                }
              }
            }
          }
          
        # end BasicGroup
        
        #Optimize
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "jquery"]]
          $("//script[contains(@src, 'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagContains
          #[["match", "jquery"]]
          $("//script[contains(text(),'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "prototype"]]
          $("//script[contains(@src, 'prototype')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "facebook"]]
          $("//script[contains(@src, 'facebook')]") {
            remove()
          }
          
          
        # end BasicGroup
        
      }
      
      
      #Upsell Page 1
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "form[name=\"subContinueButtonForm\"]"], ["negate", ""]]
      $("(//form[@name = \"subContinueButtonForm\"])[1]") {
      
        #Remove and Reorganize
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#header-wrapper"]]
          $("//*[@id = 'header-wrapper']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#orange-navbar"]]
          $("//*[@id = 'orange-navbar']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#smartbanner"]]
          $("//*[@id = 'smartbanner']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "body table td:first-of-type"]]
          $("//body//table//td[position() = 1]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".eh-footer"]]
          $("//*[contains(concat(' ', @class, ' '), ' eh-footer ')]") {
            remove()
          }
          
          
          #
          #Content::Formatting::Table::Remove::ColumnDump
          #[["selector", "table:first-of-type"]]
          $("//table[position() = 1]") {
            # TODO: only go forward if this is a table element
            $("tr") {
              $("td") {
                name("div")
                move_to("..", "before")
              }
              remove()
            }
            name("div")
            attribute("was_table", "true")
            attribute("cellspacing") {
              remove()
            }
            attribute("cellpadding") {
              remove()
            }
            attribute("border") {
              remove()
            }
          }
          
          
        # end BasicGroup
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mUpsell1"], ["selector", "form > div"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//form/div)[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mUpsell1")
              }
            }
          }
        }
        
        
        #Upsell Items
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsell1 #addonBanner"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsell1 ')]//*[@id = 'addonBanner']") {
            remove()
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsell1Content"], ["selector", ".mUpsell1 fieldset"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mUpsell1 ')]//fieldset)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mUpsell1Content")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsell1Content > legend"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsell1Content ')]/legend") {
            remove()
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mUpsell1ContentTitle\">I'd like to also purchase: </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mUpsell1Content"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mUpsell1Content ')])[1]") {
            inject_before("<div class=\"mUpsell1ContentTitle\">I'd like to also purchase: </div>")
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsell1ContentItem"], ["selector", ".mUpsell1Content li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mUpsell1Content ')]//li") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mUpsell1ContentItem")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsell1ContentItem hr"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsell1ContentItem ')]//hr") {
            remove()
          }
          
          
          #
          #Content::Formatting::MoveToBeginningOf
          #[["move_me", ".mUpsell1ContentItem .leftColumn img"], ["to_beginning_of_me", ".mUpsell1ContentItem .rightColumn"], ["map_multiple", "true"], ["ancestor_selector", ""]]
          var("counter", "a")
          $("//*[contains(concat(' ', @class, ' '), ' mUpsell1ContentItem ')]//*[contains(concat(' ', @class, ' '), ' rightColumn ')]") {
            var("counter") {
              append("a")
            }
            attribute("parent_id", $counter)
          }
          var("counter", "a")
          $("//*[contains(concat(' ', @class, ' '), ' mUpsell1ContentItem ')]//*[contains(concat(' ', @class, ' '), ' leftColumn ')]//img") {
            var("counter") {
              append("a")
            }
            var("xpath") {
              set("//*[@parent_id = '")
              append($counter)
              append("']")
            }
            move_to($xpath, "top")
          }
          
          
          #
          #Content::Formatting::AddFileAttribute
          #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", ".mUpsell1 .formActions input"]]
          # NOTE: just sets the attribute - doesn't do anything special for files
          $("//*[contains(concat(' ', @class, ' '), ' mUpsell1 ')]//*[contains(concat(' ', @class, ' '), ' formActions ')]//input") {
            attribute("src", asset("images/continue_text.png"))
          }
          
          
          #
          #Content::Formatting::MoveToEndOf
          #[["move_me", ".mUpsell1ContentItem .leftColumn a"], ["to_end_of_me", ".mUpsell1ContentItem .rightColumn"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mUpsell1ContentItem ')]//*[contains(concat(' ', @class, ' '), ' rightColumn ')])[1]") {
            move_here("(//*[contains(concat(' ', @class, ' '), ' mUpsell1ContentItem ')]//*[contains(concat(' ', @class, ' '), ' leftColumn ')]//a)[1]", "bottom")
          }
          
          
        # end BasicGroup
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mBreadcrumbItemLinkActive"], ["selector", ".mBreadcrumbItem:first-of-type .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mBreadcrumbItemLinkActive")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::RemoveAttribute
        #[["attribute", "style"], ["selector", ".mUpsell1 div:first-of-type"]]
        $("//*[contains(concat(' ', @class, ' '), ' mUpsell1 ')]//div[position() = 1]") {
          attribute("style") {
            remove()
          }
        }
        
        
        #Loading Spinner
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//body/*[position() = 1 and self::*])[1]") {
            inject_before("<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>")
          }
          
          
          #
          #Content::Formatting::Dynamic::RemoveClassOnEvent
          #[["target", ".mw_SpinnerOverlay"], ["trigger", ".formActions input"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
          $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstarget10699")
                }
              }
            }
            var("target_id", fetch("./@id"))
          }
          $("(//*[contains(concat(' ', @class, ' '), ' formActions ')]//input)[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstrigger10699")
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
                    append("'),'mw_SpinnerOverlayHide');},false);")
                  }
                }
              }
            }
          }
          
        # end BasicGroup
        
        #Optimize
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "property-populator"]]
          $("//script[contains(@src, 'property-populator')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "sitetour"]]
          $("//script[contains(@src, 'sitetour')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagContains
          #[["match", "jquery"]]
          $("//script[contains(text(),'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "facebook"]]
          $("//script[contains(@src, 'facebook')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "jquery"]]
          $("//script[contains(@src, 'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "eh-dv"]]
          $("//script[contains(@src, 'eh-dv')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "prototype"]]
          $("//script[contains(@src, 'prototype')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "eh-1"]]
          $("//script[contains(@src, 'eh-1')]") {
            remove()
          }
          
          
        # end BasicGroup
        
      }
      
      
      #Upsell Billing
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "form[name=\"PHOptionalBillingInfoForm\"]"], ["negate", ""]]
      $("(//form[@name = \"PHOptionalBillingInfoForm\"])[1]") {
      
        #Remove Unnecessary Elements
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#header-wrapper"]]
          $("//*[@id = 'header-wrapper']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#orange-navbar"]]
          $("//*[@id = 'orange-navbar']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".eh-footer"]]
          $("//*[contains(concat(' ', @class, ' '), ' eh-footer ')]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveExcept
          #[["remove", "form > table"], ["keep", "table"]]
          # 1 move all the keep stuff just after the remove stuff
          $("//form/table") {
            move_here(".//table", "before")
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "form > table:first-of-type"]]
          $("//form/table[position() = 1]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "form > table:first-of-type"]]
          $("//form/table[position() = 1]") {
            remove()
          }
          
          
        # end BasicGroup
        
        #Billing Information
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellBilling"], ["selector", "body form"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//body//form)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mUpsellBilling")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellBillingContentWrap"], ["selector", ".mUpsellBilling table"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mUpsellBilling ')]//table)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mUpsellBillingContentWrap")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellBillingContent"], ["selector", ".mUpsellBillingContentWrap tbody"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentWrap ')]//tbody)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mUpsellBillingContent")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::WrapElement
          #[["selector", ".mUpsellBillingContentWrap > *"], ["class_name", "mUpsellBillingContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentWrap ')]/*)[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                attribute("class", "mUpsellBillingContent")
                move_here("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentWrap ')]/*[not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellBillingContent"], ["new_tag_name", "tbody"], ["class_name", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContent ')]") {
            name("tbody")
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsellBillingContent td:first-child"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContent ')]//*[position() = 1 and self::td]") {
            remove()
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellBillingContentWrap"], ["new_tag_name", "div"], ["class_name", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentWrap ')]") {
            name("div")
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellBillingContent"], ["new_tag_name", "div"], ["class_name", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContent ')]") {
            name("div")
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellBillingContent tr"], ["new_tag_name", "div"], ["class_name", "mUpsellBillingContentItem"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContent ')]//tr") {
            name("div")
            attribute("class", "mUpsellBillingContentItem")
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellBillingContent td"], ["new_tag_name", "span"], ["class_name", "mUpsellBillingContentItemInner"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContent ')]//td") {
            name("span")
            attribute("class", "mUpsellBillingContentItemInner")
          }
          
          
          #
          #Content::Labeling::NumberElements
          #[["selector", ".mUpsellBillingContentItem"], ["prefix", "mUpBillConIt_"]]
          # Requires tritium >= 0.6.191
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItem ')][not (@id)]") {
            $mw_temp = "mUpBillConIt_"
            $mw_temp {
              append(index())
            }
            attribute("id", $mw_temp)
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#mUpBillConIt_9, #mUpBillConIt_10, #mUpBillConIt_11, #mUpBillConIt_12, #mUpBillConIt_13"]]
          $("//*[@id = 'mUpBillConIt_9']") {
            remove()
          }
          $("//*[@id = 'mUpBillConIt_10']") {
            remove()
          }
          $("//*[@id = 'mUpBillConIt_11']") {
            remove()
          }
          $("//*[@id = 'mUpBillConIt_12']") {
            remove()
          }
          $("//*[@id = 'mUpBillConIt_13']") {
            remove()
          }
          
          
          #
          #Content::Formatting::WrapWithNextSibling
          #[["selector", "#mUpBillConIt_1"], ["wrapper_class", "mUpsellBillingContentInner"], ["sibling_count", "7"]]
          $("//*[@id = 'mUpBillConIt_1']") {
            wrap("div") {
              attribute("class", "mUpsellBillingContentInner")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
            }
          }
          
          
          #
          #Content::Formatting::WrapWithNextSibling
          #[["selector", ".mUpsellBillingContent > .mUpsellBillingContentItem"], ["wrapper_class", "mUpsellBillingContentInner"], ["sibling_count", "7"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContent ')]/*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItem ')]") {
            wrap("div") {
              attribute("class", "mUpsellBillingContentInner")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
              move_here("(following-sibling::*)[1]", "bottom")
            }
          }
          
          
        # end BasicGroup
        
        #Billing Information 2
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::ReplaceTag
          #[["selector", "form > table:first-of-type td"], ["new_tag_name", "div"], ["class_name", "mUpsellBillingContentInner"]]
          $("//form/table[position() = 1]//td") {
            name("div")
            attribute("class", "mUpsellBillingContentInner")
          }
          
          
          #
          #Content::Formatting::RemoveExcept
          #[["remove", "form > table:first-of-type"], ["keep", ".mUpsellBillingContentInner"]]
          # 1 move all the keep stuff just after the remove stuff
          $("//form/table[position() = 1]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsellBillingContentInner > br"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentInner ')]/br") {
            remove()
          }
          
          
          #
          #Content::Labeling::NumberElements
          #[["selector", ".mUpsellBillingContentInner"], ["prefix", "mUpBillConIn_"]]
          # Requires tritium >= 0.6.191
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentInner ')][not (@id)]") {
            $mw_temp = "mUpBillConIn_"
            $mw_temp {
              append(index())
            }
            attribute("id", $mw_temp)
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "width"], ["selector", ".mUpsellBillingContentItemInner"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemInner ')]") {
            attribute("width") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "size"], ["selector", ".mUpsellBillingContentItemInner input"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemInner ')]//input") {
            attribute("size") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "maxlength"], ["selector", ".mUpsellBillingContentItemInner input"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemInner ')]//input") {
            attribute("maxlength") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellBillingContentItemInnerInput"], ["selector", ".mUpsellBillingContentItemInner input"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemInner ')]//input") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mUpsellBillingContentItemInnerInput")
                }
              }
            }
          }
          
          
          #
          #Content::Labeling::NumberElements
          #[["selector", ".mUpsellBillingContentItemInnerInput"], ["prefix", "mUpBillConItInIn_"]]
          # Requires tritium >= 0.6.191
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemInnerInput ')][not (@id)]") {
            $mw_temp = "mUpBillConItInIn_"
            $mw_temp {
              append(index())
            }
            attribute("id", $mw_temp)
          }
          
          
        # end BasicGroup
        
        #Billing Information 3
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsellBillingContentItemInner > br"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemInner ')]/br") {
            remove()
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellBillingContentItemCVV"], ["selector", ".mUpsellBillingContentItem[id*=\"cvv\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItem ') and contains(@id, \"cvv\")]") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mUpsellBillingContentItemCVV")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "Security Code"], ["selector", ".mUpsellBillingContentItemCVV input"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemCVV ')]//input") {
            match($done, "no") {
              attribute("placeholder") {
                value() {
                    set("Security Code")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::RemoveExcept
          #[["remove", "form > table:first-of-type"], ["keep", "input, font"]]
          # 1 move all the keep stuff just after the remove stuff
          #$("//form/table[position() = 1]") {
          #  move_here(".//input", "before")
          #  remove()
          #}
          
          
          #
          #Content::Formatting::WrapElement
          #[["selector", "form > input[name=\"submitBilling\"], form > font"], ["class_name", "mUpsellBillingContentContinue"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//form/input[@name = \"submitBilling\"])[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                attribute("class", "mUpsellBillingContentContinue")
                move_here("//form/input[@name = \"submitBilling\"][not (@the_wrapper)]", "bottom")
                move_here("//form/font[not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          match($found, "false") {
            $("(//form/font)[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                attribute("class", "mUpsellBillingContentContinue")
                move_here("//form/input[@name = \"submitBilling\"][not (@the_wrapper)]", "bottom")
                move_here("//form/font[not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::ReverseChildrenOrder
          #[["selector", ".mUpsellBillingContentContinue"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentContinue ')]/*") {
            move_to("..", "top")
          }
          
          
          #
          #Content::Formatting::AddFileAttribute
          #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", ".mUpsellBillingContentContinue input"]]
          # NOTE: just sets the attribute - doesn't do anything special for files
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentContinue ')]//input") {
            attribute("src", asset("images/continue_text.png"))
          }
          
          
        # end BasicGroup
        
        #Set Text Placeholders and Card Names
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "Last Name"], ["selector", "#mUpBillConItInIn_2"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[@id = 'mUpBillConItInIn_2'])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("placeholder") {
                value() {
                    set("Last Name")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "Street Address"], ["selector", "#mUpBillConItInIn_3"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[@id = 'mUpBillConItInIn_3'])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("placeholder") {
                value() {
                    set("Street Address")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "Street Address 2"], ["selector", "#mUpBillConItInIn_4"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[@id = 'mUpBillConItInIn_4'])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("placeholder") {
                value() {
                    set("Street Address 2")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "City"], ["selector", "#mUpBillConItInIn_5"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[@id = 'mUpBillConItInIn_5'])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("placeholder") {
                value() {
                    set("City")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "ZIP"], ["selector", "#mUpBillConItInIn_6"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[@id = 'mUpBillConItInIn_6'])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("placeholder") {
                value() {
                    set("ZIP")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "Phone Number (optional)"], ["selector", "#mUpBillConItInIn_7"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[@id = 'mUpBillConItInIn_7'])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("placeholder") {
                value() {
                    set("Phone Number (optional)")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "placeholder"], ["value", "Card Number"], ["selector", "#mUpBillConItInIn_9"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[@id = 'mUpBillConItInIn_9'])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("placeholder") {
                value() {
                    set("Card Number")
                }
              }
            }
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mUpsellBillingContentInnerCardText\">Visa</span>"], ["add_after", "#mUpBillConIn_3 .payment-type:first-of-type img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mUpBillConIn_3']//*[contains(concat(' ', @class, ' '), ' payment-type ') and position() = 1]//img)[1]") {
            inject_after("<span class=\"mUpsellBillingContentInnerCardText\">Visa</span>")
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mUpsellBillingContentInnerCardText\">Mastercard</span>"], ["add_after", "#mUpBillConIn_3 .payment-type:nth-of-type(2) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mUpBillConIn_3']//*[contains(concat(' ', @class, ' '), ' payment-type ') and position() = 2]//img)[1]") {
            inject_after("<span class=\"mUpsellBillingContentInnerCardText\">Mastercard</span>")
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mUpsellBillingContentInnerCardText\">American Express</span>"], ["add_after", "#mUpBillConIn_3 .payment-type:nth-of-type(3) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mUpBillConIn_3']//*[contains(concat(' ', @class, ' '), ' payment-type ') and position() = 3]//img)[1]") {
            inject_after("<span class=\"mUpsellBillingContentInnerCardText\">American Express</span>")
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mUpsellBillingContentInnerCardText\">Discover</span>"], ["add_after", "#mUpBillConIn_3 .payment-type:nth-of-type(4) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mUpBillConIn_3']//*[contains(concat(' ', @class, ' '), ' payment-type ') and position() = 4]//img)[1]") {
            inject_after("<span class=\"mUpsellBillingContentInnerCardText\">Discover</span>")
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mUpsellBillingContentInnerTitle\">Enter Card Information</span>"], ["add_after", ""], ["multiple", ""], ["add_before", "#mUpBillConIn_2 div:first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mUpBillConIn_2']//*[position() = 1 and self::div])[1]") {
            inject_before("<span class=\"mUpsellBillingContentInnerTitle\">Enter Card Information</span>")
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mUpBillConIt_6 .mUpsellBillingContentItemInner select option:first-child"], ["text", "Choose a Country"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mUpBillConIt_6']//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentItemInner ')]//select//*[position() = 1 and self::option]") {
            inner() {
              set("Choose a Country")
            }
          }
          
          
        # end BasicGroup
        
        #Set Breadcrumb States
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBreadcrumbItemLinkComplete"], ["selector", ".mBreadcrumbItem:first-of-type .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBreadcrumbItemLinkComplete")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mBreadcrumbItemLinkActiveFull"], ["selector", ".mBreadcrumbItem:nth-of-type(2) .mBreadcrumbItemLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItem ') and position() = 2]//*[contains(concat(' ', @class, ' '), ' mBreadcrumbItemLink ')])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mBreadcrumbItemLinkActiveFull")
                }
              }
            }
          }
          
          
        # end BasicGroup
        
        #
        #Content::Formatting::WrapElement
        #[["selector", "#mUpBillConIn_3 label"], ["class_name", "mUpsellBillingCardSelections"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[@id = 'mUpBillConIn_3']//label)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mUpsellBillingCardSelections")
              move_here("//*[@id = 'mUpBillConIn_3']//label[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".mUpsellBillingCardSelections"], ["after_me", "#mUpBillConIn_2 .mUpsellBillingContentInnerTitle"], ["map_multiple", ""]]
        $("(//*[@id = 'mUpBillConIn_2']//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentInnerTitle ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' mUpsellBillingCardSelections ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#mUpBillConIn_3"]]
        $("//*[@id = 'mUpBillConIn_3']") {
          remove()
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "type"], ["value", "number"], ["selector", "#mUpBillConItInIn_6, #mUpBillConItInIn_7, #cc-number input, div[id*=\"cvv-div\"] input[type=\"text\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'mUpBillConItInIn_6']") {
          match($done, "no") {
            attribute("type") {
              value() {
                  set("number")
              }
            }
          }
        }
        $("//*[@id = 'mUpBillConItInIn_7']") {
          match($done, "no") {
            attribute("type") {
              value() {
                  set("number")
              }
            }
          }
        }
        $("//*[@id = 'cc-number']//input") {
          match($done, "no") {
            attribute("type") {
              value() {
                  set("number")
              }
            }
          }
        }
        $("//div[contains(@id, \"cvv-div\")]//input[@type = \"text\"]") {
          match($done, "no") {
            attribute("type") {
              value() {
                  set("number")
              }
            }
          }
        }
        
        
        #Loading Spinner
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//body/*[position() = 1 and self::*])[1]") {
            inject_before("<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>")
          }
          
          
          #
          #Content::Formatting::Dynamic::RemoveClassOnEvent
          #[["target", ".mw_SpinnerOverlay"], ["trigger", ".mUpsellBillingContentContinue input[name=\"submitBilling\"]"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
          $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstarget17154")
                }
              }
            }
            var("target_id", fetch("./@id"))
          }
          $("(//*[contains(concat(' ', @class, ' '), ' mUpsellBillingContentContinue ')]//input[@name = \"submitBilling\"])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstrigger17154")
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
                    append("'),'mw_SpinnerOverlayHide');},false);")
                  }
                }
              }
            }
          }
          
        # end BasicGroup
        
        #Optimize
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "property-populator"]]
          $("//script[contains(@src, 'property-populator')]") {
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
          #[["match", "jquery"]]
          $("//script[contains(text(),'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "jquery"]]
          $("//script[contains(@src, 'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "prototype"]]
          $("//script[contains(@src, 'prototype')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "eh-1"]]
          $("//script[contains(@src, 'eh-1')]") {
            remove()
          }
          
          
        # end BasicGroup
        
      }
      
      
      #Upsell Confirmation
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "form[name=\"ProcessSubscriptionForm\"]"], ["negate", ""]]
      $("(//form[@name = \"ProcessSubscriptionForm\"])[1]") {
      
        #Remove Unnecessary Elements
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#header-wrapper"]]
          $("//*[@id = 'header-wrapper']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#orange-navbar"]]
          $("//*[@id = 'orange-navbar']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#smartbanner"]]
          $("//*[@id = 'smartbanner']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".eh-footer"]]
          $("//*[contains(concat(' ', @class, ' '), ' eh-footer ')]") {
            remove()
          }
          
          
        # end BasicGroup
        
        #Form
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::RemoveElements
          #[["selector", "form > table tr:first-of-type > td:first-of-type, form > table tr:first-of-type > td:nth-of-type(2)"]]
          $("//form/table//tr[position() = 1]/td[position() = 1]") {
            remove()
          }
          $("//form/table//tr[position() = 1]/td[position() = 2]") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "form > table table tr:first-of-type"]]
          $("//form/table//table//tr[position() = 1]") {
            remove()
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellConfirmContent"], ["selector", "form > table table tr:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//form/table//table//tr[position() = 1])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mUpsellConfirmContent")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellConfirmContinueWrap"], ["selector", ".mUpsellConfirmContent ~ tr"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContent ')]/following-sibling::tr)[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mUpsellConfirmContinueWrap")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellConfirmContinueWrap, .mUpsellConfirmContent"], ["new_tag_name", "div"], ["class_name", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContinueWrap ')]") {
            name("div")
          }
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContent ')]") {
            name("div")
          }
          
          
          #
          #Content::Formatting::RemoveExcept
          #[["remove", "form > table"], ["keep", ".mUpsellConfirmContent, .mUpsellConfirmContinueWrap"]]
          # 1 move all the keep stuff just after the remove stuff
          $("//form/table") {
            move_here(".//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContent ')]", "before")
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsellConfirmContent br"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContent ')]//br") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mUpsellConfirmContinueWrap br"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContinueWrap ')]//br") {
            remove()
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mUpsellConfirmContentSegment"], ["selector", ".mUpsellConfirmContent table"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContent ')]//table") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mUpsellConfirmContentSegment")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellConfirmContentSegment"], ["new_tag_name", "div"], ["class_name", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ')]") {
            name("div")
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellConfirmContentSegment tr"], ["new_tag_name", "div"], ["class_name", "mUpsellConfirmContentSegmentTr"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ')]//tr") {
            name("div")
            attribute("class", "mUpsellConfirmContentSegmentTr")
          }
          
          
          #
          #Content::Formatting::WrapElement
          #[["selector", ".mUpsellConfirmContentSegment:nth-of-type(1) .mUpsellConfirmContentSegmentTr"], ["class_name", ""], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')])[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                move_here("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 1]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')][not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::WrapElement
          #[["selector", ".mUpsellConfirmContentSegment:nth-of-type(2) .mUpsellConfirmContentSegmentTr"], ["class_name", ""], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 2]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')])[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                move_here("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 2]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')][not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::WrapElement
          #[["selector", ".mUpsellConfirmContentSegment:nth-of-type(3) .mUpsellConfirmContentSegmentTr"], ["class_name", ""], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 3]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')])[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                move_here("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 3]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')][not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::WrapElement
          #[["selector", ".mUpsellConfirmContentSegment:nth-of-type(4) .mUpsellConfirmContentSegmentTr"], ["class_name", ""], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
          var("found", "false")
          match($found, "false") {
            $("(//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 4]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')])[1]") {
              var("found", "true")
              insert_before("div") {
                attribute("the_wrapper", "true")
                move_here("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ') and position() = 4]//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')][not (@the_wrapper)]", "bottom")
                attribute("the_wrapper") {
                  remove()
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellConfirmContentSegment tbody"], ["new_tag_name", "div"], ["class_name", "mUpsellConfirmContentSegmentTb"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegment ')]//tbody") {
            name("div")
            attribute("class", "mUpsellConfirmContentSegmentTb")
          }
          
          
          #
          #Content::Formatting::ReplaceTag
          #[["selector", ".mUpsellConfirmContentSegmentTr td"], ["new_tag_name", "div"], ["class_name", "mUpsellConfirmContentSegmentTd"]]
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContentSegmentTr ')]//td") {
            name("div")
            attribute("class", "mUpsellConfirmContentSegmentTd")
          }
          
          
          #
          #Content::Formatting::AddFileAttribute
          #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", ".mUpsellConfirmContinueWrap input"]]
          # NOTE: just sets the attribute - doesn't do anything special for files
          $("//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContinueWrap ')]//input") {
            attribute("src", asset("images/continue_text.png"))
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mCongratsFooter\"><span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText\">In order to ensure uninterrupted service, all eHarmony subscriptions will be automatically renewed 24 hours before they expire. You may disable this option after completing your purchase on your Account Settings page. Please note that if you paid for your subscription or renewal using a multi-part payment option, you may only disable the auto-renew feature after the final payment on your subscription/renewal has been made.</span></div>"], ["add_after", "#processingMessage"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'processingMessage'])[1]") {
            inject_after("<div class=\"mCongratsFooter\"><span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText\">In order to ensure uninterrupted service, all eHarmony subscriptions will be automatically renewed 24 hours before they expire. You may disable this option after completing your purchase on your Account Settings page. Please note that if you paid for your subscription or renewal using a multi-part payment option, you may only disable the auto-renew feature after the final payment on your subscription/renewal has been made.</span></div>")
          }
          
          
        # end BasicGroup
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "body > .mw_pricing_text_1:first-of-type"]]
        $("//body/*[contains(concat(' ', @class, ' '), ' mw_pricing_text_1 ') and position() = 1]") {
          remove()
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".mw_pricing_text_2"], ["after_me", ".mUpsellConfirmContent .mw_pricing_text_1"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mUpsellConfirmContent ')]//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_1 ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' mw_pricing_text_2 ')])[1]", "after")
        }
        
        
        #Loading Spinner
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "body > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//body/*[position() = 1 and self::*])[1]") {
            inject_before("<div class=\"mw_SpinnerOverlay mw_SpinnerOverlayHide\"><div class=\"mw_SpinnerOverlaySpinner\"></div></div>")
          }
          
          
          #
          #Content::Formatting::Dynamic::RemoveClassOnEvent
          #[["target", ".mw_SpinnerOverlay"], ["trigger", "#ez2 input"], ["old_class", "mw_SpinnerOverlayHide"], ["trigger_event", "click"]]
          $("(//*[contains(concat(' ', @class, ' '), ' mw_SpinnerOverlay ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstarget36870")
                }
              }
            }
            var("target_id", fetch("./@id"))
          }
          $("(//*[@id = 'ez2']//input)[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstrigger36870")
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
                    append("'),'mw_SpinnerOverlayHide');},false);")
                  }
                }
              }
            }
          }
          
        # end BasicGroup
        
        #Optimize
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "facebook"]]
          $("//script[contains(@src, 'facebook')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagContains
          #[["match", "jquery"]]
          $("//script[contains(text(),'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "jquery"]]
          $("//script[contains(@src, 'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "eh-dev"]]
          $("//script[contains(@src, 'eh-dev')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "sitetour"]]
          $("//script[contains(@src, 'sitetour')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "prototype"]]
          $("//script[contains(@src, 'prototype')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "eh-1"]]
          $("//script[contains(@src, 'eh-1')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "property-populator"]]
          $("//script[contains(@src, 'property-populator')]") {
            remove()
          }
          
          
        # end BasicGroup
        
      }
      
      
      #Upsell Congrats
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "form[name=\"ConfirmationForm\"]"], ["negate", ""]]
      $("(//form[@name = \"ConfirmationForm\"])[1]") {
      
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsTableFirst"], ["selector", ".mCongratsFormContentInner table:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInner ')]//table[position() = 1])[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mCongratsTableFirst")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsTableSecond"], ["selector", ".mCongratsFormContentInner table:not(.mCongratsTableFirst)"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInner ')]//table[not (contains(concat(' ', @class, ' '), ' mCongratsTableFirst '))])[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mCongratsTableSecond")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mCongratsTableThird"], ["selector", ".mCongratsTableSecond table:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("(//*[contains(concat(' ', @class, ' '), ' mCongratsTableSecond ')]//table[position() = 1])[1]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mCongratsTableThird")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::RemoveExcept
        #[["remove", ".mCongratsTableFirst"], ["keep", ".mCongratsTableThird"]]
        # 1 move all the keep stuff just after the remove stuff
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsTableFirst ')]") {
          move_here(".//*[contains(concat(' ', @class, ' '), ' mCongratsTableThird ')]", "before")
          remove()
        }
        
        
        #
        #Content::Formatting::Table::Remove::PreserveLayout
        #[["selector", ".mCongratsTableThird"]]
        $("//*[contains(concat(' ', @class, ' '), ' mCongratsTableThird ')]" ) {
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
        
        
        #Form
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mCongratsHeader"], ["selector", ".mCongratsTableThird div:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("(//*[contains(concat(' ', @class, ' '), ' mCongratsTableThird ')]//div[position() = 1])[1]") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    append(" mCongratsHeader")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::MoveBefore
          #[["move_me", ".mCongratsHeader"], ["before_me", ".mCongratsFormContentInner"], ["map_moves", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFormContentInner ')])[1]") {
            move_here("(//*[contains(concat(' ', @class, ' '), ' mCongratsHeader ')])[1]", "before")
          }
          
          
          #
          #Content::Formatting::AddFileAttribute
          #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/congrats.png?moov_cache_name=eharmony-congrats.png&moov_cache_version=998689328529"], ["selector", ".mCongratsHeader img"]]
          # NOTE: just sets the attribute - doesn't do anything special for files
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsHeader ')]//img") {
            attribute("src", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/congrats.png?moov_cache_name=eharmony-congrats.png&moov_cache_version=998689328529")
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "width"], ["selector", ".mCongratsHeader img"]]
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsHeader ')]//img") {
            attribute("width") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "height"], ["selector", ".mCongratsHeader img"]]
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsHeader ')]//img") {
            attribute("height") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mCongratsHeader br, .mCongratsHeader p"]]
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsHeader ')]//br") {
            remove()
          }
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsHeader ')]//p") {
            remove()
          }
          
          
          #
          #Content::Formatting::WrapTextChildren
          #[["selector", ".mCongratsHeader span"], ["tag_name", "div"], ["class_name", "mCongratsHeaderText"], ["multiple", ""], ["split_delimiter", ""]]
          $("(//*[contains(concat(' ', @class, ' '), ' mCongratsHeader ')]//span)[1]") {
            wrap_text_children("div", class: 'mCongratsHeaderText')
          }
          
          
          #
          #Content::Labeling::NumberElements
          #[["selector", ".mCongratsTableThird > div"], ["prefix", "mCongratsTable_"]]
          # Requires tritium >= 0.6.191
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsTableThird ')]/div[not (@id)]") {
            $mw_temp = "mCongratsTable_"
            $mw_temp {
              append(index())
            }
            attribute("id", $mw_temp)
          }
          
          
          #
          #Content::Formatting::SetInnerHTML
          #[["selector", "#mCongratsTable_1 span[align=\"right\"]"], ["html", "<span class=\"mCongratsItemLabel\">Confirmation Number</span>"], ["prepend", ""], ["append", ""]]
          $("//*[@id = 'mCongratsTable_1']//span[@align = \"right\"]") {
            inner("<span class=\"mCongratsItemLabel\">Confirmation Number</span>")
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mCongratsTable_2 .right"], ["text", "Purchased Membership Plan"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mCongratsTable_2']//*[contains(concat(' ', @class, ' '), ' right ')]") {
            inner() {
              set("Purchased Membership Plan")
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mCongratsItem"], ["selector", ".mCongratsTableThird div[id*=\"mCongratsTable_\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsTableThird ')]//div[contains(@id, \"mCongratsTable_\")]") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mCongratsItem")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mCongratsItemLabel"], ["selector", ".mCongratsItem span[align=\"right\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsItem ')]//span[@align = \"right\"]") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mCongratsItemLabel")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#mCongratsTable_5"]]
          $("//*[@id = 'mCongratsTable_5']") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".mCongratsItem br"]]
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsItem ')]//br") {
            remove()
          }
          
          
          #
          #Content::Formatting::RemoveAttribute
          #[["attribute", "align"], ["selector", ".mCongratsItemLabel"]]
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsItemLabel ')]") {
            attribute("align") {
              remove()
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mCongratsItemText"], ["selector", ".mCongratsItem span:not(.mCongratsItemLabel)"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsItem ')]//span[not (contains(concat(' ', @class, ' '), ' mCongratsItemLabel '))]") {
            match($done, "no") {
              attribute("class") {
                value() {
                    append(" mCongratsItemText")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddFileAttribute
          #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/continue_text.png?moov_cache_name=eharmony-continue_text.png&moov_cache_version=998689328529"], ["selector", "#mCongratsTable_11 input"]]
          # NOTE: just sets the attribute - doesn't do anything special for files
          $("//*[@id = 'mCongratsTable_11']//input") {
            attribute("src", asset("images/continue_text.png"))
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#mCongratsTable_10"]]
          $("//*[@id = 'mCongratsTable_10']") {
            remove()
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", ".mCongratsHeaderText"], ["text", "Your order was processed. Now you are an eHarmony member!"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[contains(concat(' ', @class, ' '), ' mCongratsHeaderText ')]") {
            inner() {
              set("Your order was processed. Now you are an eHarmony member!")
            }
          }
          
          
          #
          #Content::Formatting::MoveToEndOf
          #[["move_me", "#mCongratsTable_11"], ["to_end_of_me", "form"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
          $("(//form)[1]") {
            move_here("(//*[@id = 'mCongratsTable_11'])[1]", "bottom")
          }
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mCongratsItemTextPrice\"></span>"], ["add_after", "#mCongratsTable_2 .mCongratsItemText"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mCongratsTable_2']//*[contains(concat(' ', @class, ' '), ' mCongratsItemText ')])[1]") {
            inject_after("<span class=\"mCongratsItemTextPrice\"></span>")
          }
          
          
          #
          #Content::Formatting::DuplicateInnerText
          #[["duplicate_source", "#mCongratsTable_3 .mCongratsItemText"], ["duplicate_target", ".mCongratsItemTextPrice"], ["multiple", ""], ["common_ancestor", ""]]
          $("(//*[@id = 'mCongratsTable_3']//*[contains(concat(' ', @class, ' '), ' mCongratsItemText ')])[1]") {
            var("text", fetch("text()"))
            $("(//*[contains(concat(' ', @class, ' '), ' mCongratsItemTextPrice ')])[1]") {
              inner($text)
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#mCongratsTable_6"]]
          $("//*[@id = 'mCongratsTable_6']") {
            remove()
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", "#mCongratsTable_2 .mCongratsItemLabel"], ["text", "Purchased Membership Plan"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[@id = 'mCongratsTable_2']//*[contains(concat(' ', @class, ' '), ' mCongratsItemLabel ')]") {
            inner() {
              set("Purchased Membership Plan")
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", "#mCongratsTable_3, #mCongratsTable_4"]]
          $("//*[@id = 'mCongratsTable_3']") {
            remove()
          }
          $("//*[@id = 'mCongratsTable_4']") {
            remove()
          }
          
          
          #
          #Group::IgnoreGroup
          #[]
          # No match necessary - contents will be commented out
          #  #
          #  #Content::Inject::InjectHTML
          #  #[["html", "<div class=\"mCongratsFooter\">Receiving email is an important part of using eHarmony. Some spam filters may prevent you from receiving important account updates or matching notifications via email. To ensure that you receive all of your eHarmony emails, please add eHarmony to your email Address Book or Safe List. You may disable your subscription auto-renewal on your Account Settings page.</div>"], ["add_after", "#mCongratsTable_11"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          #  $("(//*[@id = 'mCongratsTable_11'])[1]") {
          #    inject_after("<div class=\"mCongratsFooter\">Receiving email is an important part of using eHarmony. Some spam filters may prevent you from receiving important account updates or matching notifications via email. To ensure that you receive all of your eHarmony emails, please add eHarmony to your email Address Book or Safe List. You may disable your subscription auto-renewal on your Account Settings page.</div>")
          #  }
          #  
          #  
          #  #
          #  #Content::Inject::InjectHTML
          #  #[["html", "<div class=\"mCongratsFooter\"><span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText\">In order to ensure uninterrupted service, all eHarmony subscriptions will be automatically renewed 24 hours before they expire.</span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mCongratsFooter"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          #  $("(//*[contains(concat(' ', @class, ' '), ' mCongratsFooter ')])[1]") {
          #    inject_before("<div class=\"mCongratsFooter\"><span class=\"mCongratsFooterIntro\">Please Note: </span><span class=\"mCongratsFooterText\">In order to ensure uninterrupted service, all eHarmony subscriptions will be automatically renewed 24 hours before they expire.</span></div>")
          #  }
          #  
          #  
          
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<span class=\"mCongratsItemText\">This subscription will auto-renew on </span>"], ["add_after", ""], ["multiple", ""], ["add_before", "#mCongratsTable_9 .mCongratsItemText"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mCongratsTable_9']//*[contains(concat(' ', @class, ' '), ' mCongratsItemText ')])[1]") {
            inject_before("<span class=\"mCongratsItemText\">This subscription will auto-renew on </span>")
          }
          
          
          #Double Price Text Fix
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Formatting::SetInnerText
            #[["selector", ".mCongratsItemText"], ["text", ""], ["match_string", "$"], ["replace_string", " $"], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
            # NOTE: not sure if /html() or /text() is what I want to be using here
            $("//*[contains(concat(' ', @class, ' '), ' mCongratsItemText ')]") {
              inner() {
                replace("$", " $")
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".mCongratsItemTextPrice:nth-of-type(2)"]]
            $("//*[contains(concat(' ', @class, ' '), ' mCongratsItemTextPrice ') and position() = 2]") {
              remove()
            }
            
            
          # end BasicGroup
          
          #
          #Content::Inject::InjectHTML
          #[["html", "<div class=\"mCongratsFooter\">Receiving email is an important part of using eHarmony. Some spam filters may prevent you from receiving important account updates or matching notifications via email. To ensure that you receive all of your eHarmony emails, please add eHarmony to your email Address Book or Safe List. You may disable your subscription auto-renewal on your Account Settings page.</div>"], ["add_after", "#mCongratsTable_11"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
          $("(//*[@id = 'mCongratsTable_11'])[1]") {
            inject_after("<div class=\"mCongratsFooter\">Receiving email is an important part of using eHarmony. Some spam filters may prevent you from receiving important account updates or matching notifications via email. To ensure that you receive all of your eHarmony emails, please add eHarmony to your email Address Book or Safe List. You may disable your subscription auto-renewal on your Account Settings page.</div>")
          }
          
          
        # end BasicGroup
        
        #Optimize
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "facebook"]]
          $("//script[contains(@src, 'facebook')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagContains
          #[["match", "jquery"]]
          $("//script[contains(text(),'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "jquery"]]
          $("//script[contains(@src, 'jquery')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "sitetour"]]
          $("//script[contains(@src, 'sitetour')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "eh-dev"]]
          $("//script[contains(@src, 'eh-dev')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "prototype"]]
          $("//script[contains(@src, 'prototype')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "eh-1"]]
          $("//script[contains(@src, 'eh-1')]") {
            remove()
          }
          
          
          #
          #Content::Javascript::RemoveScriptTagSrcContains
          #[["src_phrase", "property-populator"]]
          $("//script[contains(@src, 'property-populator')]") {
            remove()
          }
          
          
        # end BasicGroup
        
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".errorMessageBox"], ["after_me", ".mBreadcrumbs"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mBreadcrumbs ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' errorMessageBox ')])[1]", "after")
      }
      
      
    }
    
    
  # end BasicGroup
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "(\\/pe$|pe.html$)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(\/pe$|pe.html$)/) {
  
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".cntrpage"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[contains(concat(' ', @class, ' '), ' cntrpage ')])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mPleaseWaitNote\"><span class=\"mPleaseWait\">Please wait while we redirect you to the next step.</span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "iframe:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//iframe[position() = 1])[1]") {
        inject_before("<div class=\"mPleaseWaitNote\"><span class=\"mPleaseWait\">Please wait while we redirect you to the next step.</span></div>")
      }
      
      
    }
    
    
  }
  
  #URLMatcherGroup - Format Redirect Pages
  #Group::URLMatcherGroup
  #[["url_matcher", "processorder"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /processorder/) {
    $("/html/head/meta[@http-equiv='refresh']") {
      $mw_redirect_url = fetch("@content")
      $mw_redirect_url {
        rewrite("link")
      }
      attribute("content", $mw_redirect_url)
    }
  
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".mboxDefault"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mboxDefault ')])[1]") {
    
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "height"], ["selector", "iframe"]]
      $("//iframe") {
        attribute("height") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "width"], ["selector", "iframe"]]
      $("//iframe") {
        attribute("width") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mBreadcrumbs"]]
      $("//*[contains(concat(' ', @class, ' '), ' mBreadcrumbs ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "style"], ["value", "display: none;"], ["selector", "iframe"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//iframe") {
        match($done, "no") {
          attribute("style") {
            value() {
                set("display: none;")
            }
          }
        }
      }
      
      
    }
    
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "confirmation"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /confirmation/) {
  
    #
    #Content::Formatting::SetInnerText
    #[["selector", "#mCongratsFormConInListIt_2 .value:first-of-type"], ["text", ""], ["match_string", "of$"], ["replace_string", "of $"], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[@id = 'mCongratsFormConInListIt_2']//*[contains(concat(' ', @class, ' '), ' value ') and position() = 1]") {
      inner() {
        replace("of$", "of $")
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#mCongratsFormConInListIt_2 .value:nth-of-type(2)"]]
    $("//*[@id = 'mCongratsFormConInListIt_2']//*[contains(concat(' ', @class, ' '), ' value ') and position() = 2]") {
      remove()
    }
    
    
  }
  
  #
  #app=true
  #Content::Javascript::AddScriptTag
  #[["javascript_path", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/custom.js?moov_cache_name=eharmony-custom.js&moov_cache_version=998689328529"], ["add_after", "body > :last-child"]]
  $("/html/body") {
    insert_bottom("script", type: "text/javascript", src: asset("javascript/custom.js"))
  }
  
  
  #
  #Content::Javascript::AddInlineScriptTag
  #[["script", "window.addEventListener(\"load\",function(){   var b = document.getElementsByClassName(\"mw_SpinnerOverlay\")[0];   b.style.height = document.body.offsetHeight + \"px\";   var c = b.getElementsByTagName(\"div\")[0]; /* the spinner */   remove_class(b, \"mw_SpinnerOverlayHide\");   c.style.left = (window.innerWidth - c.offsetWidth)/2 + \"px\";     c.style.margin = \"0\";   add_class(b, \"mw_SpinnerOverlayHide\");   window.addEventListener(\"scroll\", function(){     c.style.top = (window.innerHeight - c.offsetHeight)/2 + document.body.scrollTop + \"px\";   }, false); }, false);"], ["add_after", "body > :last-child"], ["add_before", ""]]
    $("(//body/*[position() = last() and self::*])[1]") {
      insert_after("script") {
        attribute("language", "javascript")
        inner("window.addEventListener(\"load\",function(){   var b = document.getElementsByClassName(\"mw_SpinnerOverlay\")[0];   b.style.height = document.body.offsetHeight + \"px\";   var c = b.getElementsByTagName(\"div\")[0]; /* the spinner */   remove_class(b, \"mw_SpinnerOverlayHide\");   c.style.left = (window.innerWidth - c.offsetWidth)/2 + \"px\";     c.style.margin = \"0\";   add_class(b, \"mw_SpinnerOverlayHide\");   window.addEventListener(\"scroll\", function(){     c.style.top = (window.innerHeight - c.offsetHeight)/2 + document.body.scrollTop + \"px\";   }, false); }, false);")
      }
    }
  
  
  #Subflow Error Login Page
  #this page appears when you log out and then paste in a url that you need to be logged in to see.
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "form[name=\"loginForm\"]"], ["negate", ""]]
  $("(//form[@name = \"loginForm\"])[1]") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "body > br"]]
    $("//body/br") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "body > .sFooter"]]
    $("//body/*[contains(concat(' ', @class, ' '), ' sFooter ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::Table::Remove::ColumnDump
    #[["selector", ".content_box > table"]]
    $("//*[contains(concat(' ', @class, ' '), ' content_box ')]/table") {
      # TODO: only go forward if this is a table element
      $("tr") {
        $("td") {
          name("div")
          move_to("..", "before")
        }
        remove()
      }
      name("div")
      attribute("was_table", "true")
      attribute("cellspacing") {
        remove()
      }
      attribute("cellpadding") {
        remove()
      }
      attribute("border") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".content_box > div > div:last-child"]]
    $("//*[contains(concat(' ', @class, ' '), ' content_box ')]/div/*[position() = last() and self::div]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mw_Login"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//body)[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mw_Login")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mw_LoginForm"], ["selector", "form[name=\"loginForm\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//form[@name = \"loginForm\"])[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mw_LoginForm")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveExcept
    #[["remove", ".mw_LoginForm > table"], ["keep", "table"]]
    # 1 move all the keep stuff just after the remove stuff
    $("//*[contains(concat(' ', @class, ' '), ' mw_LoginForm ')]/table") {
      move_here(".//table", "before")
      remove()
    }
    
    
    #
    #Content::Formatting::Table::Remove::Dump
    #[["selector", ".mw_LoginForm table"]]
    $("//*[contains(concat(' ', @class, ' '), ' mw_LoginForm ')]//table") {
      # TODO: only go forward if this is a table element
      $("tr") {
        $("td") {
          insert_before("br")
          $("*") {
            move_to("..", "before")
          }
          remove()
        }
        $("*") {
          move_to("..", "before")
        }
        remove()
      }
      name("div")
      attribute("was_table", "true")
      attribute("cellspacing") {
        remove()
      }
      attribute("cellpadding") {
        remove()
      }
      attribute("border") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mw_LoginForm > div > br"]]
    $("//*[contains(concat(' ', @class, ' '), ' mw_LoginForm ')]/div/br") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mw_LoginFormHead"], ["selector", ".mw_LoginForm > div:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//*[contains(concat(' ', @class, ' '), ' mw_LoginForm ')]/div[position() = 1])[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mw_LoginFormHead")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mw_LoginFormFieldWrap"], ["selector", ".mw_LoginForm > div:nth-of-type(2)"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("(//*[contains(concat(' ', @class, ' '), ' mw_LoginForm ')]/div[position() = 2])[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mw_LoginFormFieldWrap")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "size"], ["selector", ".mw_LoginFormFieldWrap input"]]
    $("//*[contains(concat(' ', @class, ' '), ' mw_LoginFormFieldWrap ')]//input") {
      attribute("size") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/spacer.gif?moov_cache_name=eharmony-spacer.gif&moov_cache_version=998689328529"], ["selector", ".mw_LoginFormFieldWrap input[type=\"image\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' mw_LoginFormFieldWrap ')]//input[@type = \"image\"]") {
      attribute("src", "//d35wknniannwqo.cloudfront.net/eharmony/998689328529/spacer.gif?moov_cache_name=eharmony-spacer.gif&moov_cache_version=998689328529")
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".mw_LoginFormFieldWrap input:last-child"], ["class_name", "mw_LoginFormFieldSubmitWrap"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mw_LoginFormFieldWrap ')]//*[position() = last() and self::input])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mw_LoginFormFieldSubmitWrap")
          move_here("//*[contains(concat(' ', @class, ' '), ' mw_LoginFormFieldWrap ')]//*[position() = last() and self::input][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#mPlanListIt_4 sup.footnote"]]
  $("//*[@id = 'mPlanListIt_4']//sup[contains(concat(' ', @class, ' '), ' footnote ')]") {
    remove()
  }
  
  
  #
  #Content::Formatting::Duplicate
  #[["duplicate_me", "#mPlanListIt_5 sup.footnote"], ["after_me", "#mPlanListIt_4 .savings strong"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
  $("(//*[@id = 'mPlanListIt_4']//*[contains(concat(' ', @class, ' '), ' savings ')]//strong)[1]") {
    copy_here("(//*[@id = 'mPlanListIt_5']//sup[contains(concat(' ', @class, ' '), ' footnote ')])[1]", "after")
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "&nbsp;"], ["add_after", "#mPlanListIt_4 strong"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//*[@id = 'mPlanListIt_4']//strong)[1]") {
    inject_after("&nbsp;")
  }
  
  # regional postal code fix
  $("//input[@placeholder='ZIP']") {
    match($region) {
      with(/au/) {
        attribute("placeholder", "Postcode")
        attribute("type", "number")
      }
      with(/uk/) {
        attribute("placeholder", "Postcode")
        attribute("type", "text")
      }
      with(/ca/) {
        attribute("placeholder", "Postal Code")
        attribute("type", "text")
      }
    }
  }
  
  $("//div[@class='mPaymentInformation']/ul/li/span") {
    wrap_text_children("span", mark: "remove")
    
    $(".//span[@mark='remove']") {
      remove()
    }
  }
  
  # Fixin special offer overflow problem
  $("/html/body//form[@name='SelectSubscriptionForm']//div[contains(@class, 'specialofferbox')]//button//div[contains(@class, 'plan')]") {
    text() {
      replace(/^\s*|\s*$/, "")
      replace(" Plan", "")
    }
  }
  
  $("/html/body//form[@name='ConfirmationForm']") {
    match($region) {
      with(/us|ca/) {
        $(".//div[@id='mCongratsTable_2']") {
          inner() {
            replace(/\$?[0-9\.]{4,}\s*<\/span>\s*<span.*>\s*/, " ")
          }
        }
        $(".//img[contains(@src, 'congrats.png')]/preceding-sibling::div[contains(@class, 'mCongratsHeaderText')]") {
          remove()
        }
      }
    }
  }
  
  # Re-layout the form
  $("/html/body//form[@name='SelectSubscriptionForm']") {
    match($region) {
      # Only do this for US site
      with(/us|ca/) {
        $(".//div[contains(@class, 'radiobox')]") {
          # Marks it so we can come back to it later
          attribute("mw-current-box", "BOX")

          insert_bottom("div", "", mw-keep: "radiobox") {
            move_here("..//span[contains(@class, 'txt18')]/span[contains(@class, 'txt18')]") {
              wrap("div", class: "mSelectPlanContentPlansItemTitle")
            }
            move_here("..//span[contains(@class, 'txt11')]") {
              wrap("div")
            }
            insert_bottom("div") {
              move_here("../../strong/following-sibling::span[1]", "top") {
                text() {
                  replace(/^\s*|\s*$/, "")
                }
              }
              move_here("../../strong", "top") {
                text() {
                  replace(/$/, " ") # append a space in the end
                }
              }
            }
            move_here("../p[contains(@class, 'plan-benefits')]") {
              name("div")
            }
            # This selector is only used as for..each loop
            $("..//input[@type='radio']") {
              $("/html/body//form[@name='SelectSubscriptionForm']//div[@mw-current-box]/div[@mw-keep]") {
                move_here("../div[contains(@class, 'red') or contains(@class, 'alt-')]") {
                  name("label")
                  
                  move_here("../..//input[@type='radio'][1]", "top")
                }
              }
            }
          }

          $("./*[not(@mw-keep)]") {
            remove()
          }

          attribute("mw-current-box") {
            remove()
          }
        }
      }
    }
  }

  $("/html/body//form//span[contains(@class, 'mCongratsFooterText_2')]") {
    match($region) {
      # Ticket 176: Applies to ca, uk, au only
      # Ticket 184: Applies to us too
      with(/ca|uk|au|us/) {
        text($subscription_renew_cost)
      }
    }
  }
}
