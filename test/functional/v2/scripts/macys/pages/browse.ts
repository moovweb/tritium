# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific classes
  $("//body[starts-with(@class,'browse')]|//body[starts-with(@class,'subSplash')]") {
    add_class("mw_browse")
  }
  $("(//body[contains(concat(' ', @class, ' '), ' splash ')])[1]") {
    add_class("mw_category")
  }

  
  # This is to stop the color swatches
  $(".//div[@class='isSuppressColorSwatches hidden']") {
    text() {
      set("true")
    }
  }
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#quickViewImage, .clearboth"]]
  $("//*[@id = 'quickViewImage']") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
    remove()
  }
  
  
  #browse
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "div[id^=\"thumbnails\"]"], ["negate", ""]]
    $("//body[starts-with(@class,'browse')]|//body[starts-with(@class,'subSplash')]") {
    #Remove Unneeded Elements
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Remove Extraneous Images
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#priceerrorborder"]]
        $("//*[@id = 'priceerrorborder']") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#priceerrorborder"]]
        $("//*[@id = 'priceerrorborder']") {
          remove()
        }
        
        
      # end BasicGroup
      
      #Remove red close image
      #Content::Formatting::RemoveImages
      #[["original_src_path", "http://assets.macys.com/navapp/web20/assets/img/faceted/x.gif"]]
      $("//img[substring(@src, string-length(@src) - 60, 61) = 'http://assets.macys.com/navapp/web20/assets/img/faceted/x.gif']") {
        remove()
      }
      
      
      #Remove Flash pages
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #Shop the Coat Catalog
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".gotoCategory"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "a:contains(\"Shop the Coat Catalog\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' gotoCategory ')]") {
          match($done, "no") {
              var("conditional", "false")
                $(".//a[contains(., \"Shop the Coat Catalog\")]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvRemoveElement")
              }
            }
              }
          }
        }
        
        
        #Shop the Coat Finder
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".gotoCategory"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "a:contains(\"Shop the Coat Finder\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' gotoCategory ')]") {
          match($done, "no") {
              var("conditional", "false")
                $(".//a[contains(., \"Shop the Coat Finder\")]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvRemoveElement")
              }
            }
              }
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvRemoveElement, .clearFloats"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' clearFloats ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #Category Header
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvTitle"], ["selector", ".currentCatHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvTitle")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".currentCatHeader .currentCategory"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')]//*[contains(concat(' ', @class, ' '), ' currentCategory ')]") {
        inner() {
          append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvLightGrayBar"], ["selector", "#nav_category .nav_cat_sub, #nav_category .parentCategories, .subCatList  > .subCategoryElement"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'nav_category']//*[contains(concat(' ', @class, ' '), ' nav_cat_sub ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvLightGrayBar")
            }
          }
        }
      }
      $("//*[@id = 'nav_category']//*[contains(concat(' ', @class, ' '), ' parentCategories ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvLightGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' subCatList ')]/*[contains(concat(' ', @class, ' '), ' subCategoryElement ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvLightGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".parentCategories"], ["to_beginning_of_me", ".subCatList"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' subCatList ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' parentCategories ')])[1]", "top")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".parentCategories"], ["after_me", ".currentCatHeader"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' parentCategories ')])[1]", "after")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".currentCatHeader"], ["content_selector", "#nav_category .subCatList, #nav_category .parentCategories"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[@id = 'nav_category']//*[contains(concat(' ', @class, ' '), ' subCatList ')]") {
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
              append("37565")
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
      $("//*[@id = 'nav_category']//*[contains(concat(' ', @class, ' '), ' parentCategories ')]") {
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
              append("37565")
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
      $("//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("37565")
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
    
    #brand list page
    #http://www1.macys.com/shop/beauty/featured-brands/more-beauty-brands?id=22993&edge=hybrid
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapElement
      #[["selector", ".macys-box"], ["class_name", "mvBrandList"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' macys-box ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvBrandList")
            move_here("//*[contains(concat(' ', @class, ' '), ' macys-box ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", ".mvBrandList"], ["before_me", "#macysGlobalBanner"], ["map_moves", ""]]
      $("(//*[@id = 'macysGlobalBanner'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvBrandList ')])[1]", "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".macys-box h2"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' macys-box ')]//h2") {
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
      #[["attribute", "class"], ["value", "mvLightGrayBar"], ["selector", ".macys-box > ul > li"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' macys-box ')]/ul/li") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvLightGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".macys-box > h2"], ["html", "<div><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' macys-box ')]/h2") {
        inner() {
          prepend("<div><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", "h2.mvDarkGrayBar"], ["content_selector", "ul"], ["ancestor_selector", ".macys-box"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' macys-box ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//ul") {
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
                append("50663")
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
        $(".//h2[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
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
                append("50663")
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
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".macys-box"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "ul > li:first-of-type:empty"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' macys-box ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//ul/li[position() = 1 and not (node())]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
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
      #[["selector", ".macys-box > h2 > a, .mvRemoveElement"]]
      $("//*[contains(concat(' ', @class, ' '), ' macys-box ')]/h2/a") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #Optimize Images
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Remove Unneeded Images
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#macysGlobalBanner"]]
        $("//*[@id = 'macysGlobalBanner']") {
          remove()
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#globalBodyFooterAdPool, #macysTV, #globalBodyFooterBannerContent"]]
        $("//*[@id = 'globalBodyFooterAdPool']") {
          remove()
        }
        $("//*[@id = 'macysTV']") {
          remove()
        }
        $("//*[@id = 'globalBodyFooterBannerContent']") {
          remove()
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
        #[["query_parameter_name", "wid"], ["query_parameter_value", "152"], ["selector", ".thumbnailImage"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
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
        #[["query_parameter_name", "hei"], ["query_parameter_value", "186"], ["selector", ".thumbnailImage"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
          attribute("src") {
            value() {
              append("?hei=186")
              # change the last question mark into an ampersand for valid query parameters
              replace(/(\?.+)\?/, "\\1&")
            }
          }
        }
        
      # end BasicGroup
      
    # end BasicGroup
    
    #Narrow by title bar accordian
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapElement
      #[["selector", ".nav_title.narrow, #breadcrumbs"], ["class_name", "mvNarrowByTitleBar"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvNarrowByTitleBar")
            move_here("//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'breadcrumbs'][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[@id = 'breadcrumbs'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvNarrowByTitleBar")
            move_here("//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'breadcrumbs'][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvHideElement"], ["selector", "#nav_title.hidden .nav_title.narrow, #nav_title.hidden + div#facets"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'nav_title' and contains(concat(' ', @class, ' '), ' hidden ')]//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvHideElement")
            }
          }
        }
      }
      $("//*[@id = 'nav_title' and contains(concat(' ', @class, ' '), ' hidden ')]/following-sibling::*[1]/self::div[@id = 'facets']") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvHideElement")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".nav_title.narrow"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')]") {
        inner() {
          append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
        }
      }
      
      
      #
      #some page add class="hidden" on it.
      #Content::Formatting::RemoveAttribute
      #[["attribute", "class"], ["selector", "#nav_title"]]
      $("//*[@id = 'nav_title']") {
        attribute("class") {
          remove()
        }
      }
      
      
      #Narrow mask
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", ".facet-name"], ["negate", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' facet-name ')])[1]") {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvNarrowMask\"></div>"], ["add_after", "#localNavigationContainer > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'localNavigationContainer']/*[position() = 1 and self::*])[1]") {
          inject_after("<div class=\"mvNarrowMask\"></div>")
        }
        
        
        #close narrow when click mask
        #Content::Formatting::AddEventTrigger
        #[["target", ".nav_title.narrow"], ["target_event", "click"], ["trigger", ".mvNarrowMask"], ["trigger_event", ""], ["multiple", ""], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("trigger_id", "")
        var("target_id", "")
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etarget")
                  append("91227")
                }
              }
            }
            var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowMask ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etrigger")
                  append("91227")
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
        
        
        #close narrow mask
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Formatting::Dynamic::AddClassOnEvent
          #[["target", ".mvNarrowMask"], ["trigger", ".currentCatHeader"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
          $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowMask ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstarget59660")
                }
              }
            }
            var("target_id", fetch("./@id"))
          }
          $("(//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstrigger59660")
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
                    append("'),'mw_accordian_hide');},false);")
                  }
                }
              }
            }
          }
          
          #
          #Content::Formatting::Dynamic::AddClassOnEvent
          #[["target", ".mvNarrowMask"], ["trigger", ".mvMenuDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
          $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowMask ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstarget83120")
                }
              }
            }
            var("target_id", fetch("./@id"))
          }
          $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstrigger83120")
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
                    append("'),'mw_accordian_hide');},false);")
                  }
                }
              }
            }
          }
          
          #
          #Content::Formatting::Dynamic::AddClassOnEvent
          #[["target", ".mvNarrowMask"], ["trigger", ".mvSearchDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
          $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowMask ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstarget18492")
                }
              }
            }
            var("target_id", fetch("./@id"))
          }
          $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("addclasstrigger18492")
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
                    append("'),'mw_accordian_hide');},false);")
                  }
                }
              }
            }
          }
          
        # end BasicGroup
        
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".nav_title.narrow"], ["content_selector", "#facets, .mvNarrowMask"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[@id = 'facets']") {
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
              append("11954")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvNarrowMask ')]") {
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
              append("11954")
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
      $("//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("11954")
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
      
      
      #close btn inside container
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvCloseMenu mvDarkBtn\">close</div>"], ["add_after", "#facets > :last-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'facets']/*[position() = last() and self::*])[1]") {
          inject_after("<div class=\"mvCloseMenu mvDarkBtn\">close</div>")
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".nav_title.narrow"], ["target_event", "click"], ["trigger", "#facets .mvCloseMenu"], ["trigger_event", ""], ["multiple", ""], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("trigger_id", "")
        var("target_id", "")
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ') and contains(concat(' ', @class, ' '), ' narrow ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etarget")
                  append("68266")
                }
              }
            }
            var("target_id", fetch("./@id"))
        }
        $("(//*[@id = 'facets']//*[contains(concat(' ', @class, ' '), ' mvCloseMenu ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etrigger")
                  append("68266")
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
        
        
      # end BasicGroup
      
      #close search when click narrow by
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", "#globalMastheadContainer #globalSubNav"], ["trigger", ".nav_title"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
        $("(//*[@id = 'globalMastheadContainer']//*[@id = 'globalSubNav'])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget71842")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger71842")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".mvSearchDropdown"], ["trigger", ".nav_title"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget53742")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger53742")
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
                  append("'),'moovweb_open');},false);")
                }
              }
            }
          }
        }
        
      # end BasicGroup
      
      #close page nav when click narrow by
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".currentCatHeader"], ["trigger", ".nav_title"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
        $("(//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget91795")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger91795")
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
                  append("'),'moovweb_open');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", ".subCatList"], ["trigger", ".nav_title"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
        $("(//*[contains(concat(' ', @class, ' '), ' subCatList ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget60774")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger60774")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
      # end BasicGroup
      
      #close narrow when click menu
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".nav_title"], ["trigger", ".mvMenuDropdown"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget73312")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger73312")
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
                  append("'),'moovweb_open');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", ".parentCategories.cat"], ["trigger", ".nav_title"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
        $("(//*[contains(concat(' ', @class, ' '), ' parentCategories ') and contains(concat(' ', @class, ' '), ' cat ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget36309")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger36309")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", "#facets"], ["trigger", ".mvMenuDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
        $("(//*[@id = 'facets'])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget48271")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger48271")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
      # end BasicGroup
      
      #close narrow when click page nav
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", "#facets"], ["trigger", ".currentCatHeader"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
        $("(//*[@id = 'facets'])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget44102")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger44102")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".nav_title"], ["trigger", ".currentCatHeader"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget77814")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' currentCatHeader ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger77814")
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
                  append("'),'moovweb_open');},false);")
                }
              }
            }
          }
        }
        
      # end BasicGroup
      
      #close narrow when click search
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".nav_title"], ["trigger", ".mvSearchDropdown"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
        $("(//*[contains(concat(' ', @class, ' '), ' nav_title ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget35128")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger35128")
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
                  append("'),'moovweb_open');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", "#facets"], ["trigger", ".mvSearchDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
        $("(//*[@id = 'facets'])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget83032")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger83032")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
      # end BasicGroup
      
    # end BasicGroup
    
    #BLACKBERRY
    #BlackBerry only
    #os=blackberry

    # matching blackberry os 4.6-5.x
    match($blackberry, "true") {

    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Javascript::RemoveScriptTags
      #[["external_only", "true"], ["regex_exclude", ""]]
      $("//script[@src]") {
        remove()
      }
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "style"], ["value", "overflow: hidden; background: #7E7E7E; padding: 5px 10px; color: white;"], ["selector", "#breadcrumbs"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'breadcrumbs']") {
        match($done, "no") {
            var("done", "yes")
          attribute("style") {
            value() {
                set("overflow: hidden; background: #7E7E7E; padding: 5px 10px; color: white;")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBBbrowse"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvBBbrowse")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#nav_category ~ *"]]
      $("//*[@id = 'nav_category']/following-sibling::*") {
        remove()
      }
      
    } # ending blackberry os 4.6-5.x block

    # end BasicGroup
    
    #Narrow by content
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #End of Category
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", ".nav_cat_sub"], ["negate", "true"]]
      var("element_exists", "false")
      $("(//*[contains(concat(' ', @class, ' '), ' nav_cat_sub ')])[1]") {
        var("element_exists", "true")
      }
      match($element_exists, "false") {
      
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "#nav_category"], ["html", "<div class=\"mvEndCate\">You have narrowed your category as far as possible.</div>"], ["prepend", ""], ["append", "true"]]
        $("//*[@id = 'nav_category']") {
          inner() {
            append("<div class=\"mvEndCate\">You have narrowed your category as far as possible.</div>")
          }
        }
        
        
      }
      
      
      #Filter Accordions
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", "#facets .facet-name"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'facets']//*[contains(concat(' ', @class, ' '), ' facet-name ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mvDarkGrayBar")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "#facets .facet-name"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", ""], ["append", "true"]]
        $("//*[@id = 'facets']//*[contains(concat(' ', @class, ' '), ' facet-name ')]") {
          inner() {
            append("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvNarrowChild"], ["selector", ".facet > ul"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' facet ')]/ul") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" mvNarrowChild")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvNarrowChild"], ["selector", ".priceRange > ul"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' priceRange ')]/ul") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvNarrowChild")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvNarrowChild"], ["selector", ".swatch-options"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' swatch-options ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvNarrowChild")
              }
            }
          }
        }
        
        
        #
        #There are two id="SIZE_NORMAL"
        #Content::Formatting::WrapElement
        #[["selector", ".button-options"], ["class_name", "mvNarrowChild"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' button-options ')])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvNarrowChild")
              move_here("//*[contains(concat(' ', @class, ' '), ' button-options ')][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::Dynamic::Accordian4
        #[["link_selector", ".facet-name"], ["content_selector", ".mvNarrowChild"], ["ancestor_selector", ".facet"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
        var("anc_counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' facet ')]") {
          var("anc_counter") {
            append("b")
          }
          var("counter", "")
          var("content_id_string", "[")
          $(".//*[contains(concat(' ', @class, ' '), ' mvNarrowChild ')]") {
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
                  append("86169")
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
          $(".//*[contains(concat(' ', @class, ' '), ' facet-name ')]") {
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
                  append("86169")
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
        #Content::Formatting::MoveToEndOf
        #[["move_me", ".facet .show-all"], ["to_end_of_me", ".mvNarrowChild"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
        var("counter", "a")
        $("//*[contains(concat(' ', @class, ' '), ' mvNarrowChild ')]") {
          var("counter") {
            append("a")
          }
          attribute("id4747", $counter)
        }
        var("counter", "a")
        $("//*[contains(concat(' ', @class, ' '), ' facet ')]//*[contains(concat(' ', @class, ' '), ' show-all ')]") {
          var("counter") {
            append("a")
          }
          var("xpath") {
            set("//*[@id4747 = '")
            append($counter)
            append("']")
          }
          move_to($xpath, "bottom")
        }
        
        
        #
        #This is for helping to set up div.facet:last-of-type and the can style it differently
        #Content::Formatting::WrapIndividualElements
        #[["selector", "#facets > .hidden"], ["tag_name", "span"], ["class_name", ""], ["id", ""], ["multiple", "true"]]
        $("//*[@id = 'facets']/*[contains(concat(' ', @class, ' '), ' hidden ')]") {
          wrap("span") {
          }
        }
        
        
      # end BasicGroup
      
      #Fix Highlighting/Touch Events
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvFilterRow"], ["selector", ".mvNarrowChild > li > span:first-child"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvNarrowChild ')]/li/*[position() = 1 and self::span]") {
          match($done, "no") {
            $("..") {
            attribute("class") {
              value() {
                  append(" mvFilterRow")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "onclick"], ["value", "return true;"], ["selector", ".swatch-options > .swatch-item > div, .swatch-options > .active-item > div, .mvNarrowChild > li, .groupSelectItem"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' swatch-options ')]/*[contains(concat(' ', @class, ' '), ' swatch-item ')]/div") {
          match($done, "no") {
            attribute("onclick") {
              value() {
                  set("return true;")
              }
            }
          }
        }
        $("//*[contains(concat(' ', @class, ' '), ' swatch-options ')]/*[contains(concat(' ', @class, ' '), ' active-item ')]/div") {
          match($done, "no") {
            attribute("onclick") {
              value() {
                  set("return true;")
              }
            }
          }
        }
        $("//*[contains(concat(' ', @class, ' '), ' mvNarrowChild ')]/li") {
          match($done, "no") {
            attribute("onclick") {
              value() {
                  set("return true;")
              }
            }
          }
        }
        $("//*[contains(concat(' ', @class, ' '), ' groupSelectItem ')]") {
          match($done, "no") {
            attribute("onclick") {
              value() {
                  set("return true;")
              }
            }
          }
        }        
        
      # end BasicGroup
      
      #clear all btn
      #Content::Formatting::SetInnerText
      #[["selector", ".facet .show-all > span"], ["text", "x"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' facet ')]//*[contains(concat(' ', @class, ' '), ' show-all ')]/span") {
        inner() {
          set("x")
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", "#facets"], ["class_name", "mvFilterContainer"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'facets'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvFilterContainer")
            move_here("//*[@id = 'facets'][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
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
    
    #Photon Integration
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<meta name='mw_page_type' content='Browse'>"], ["add_after", "title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//title)[1]") {
        inject_after("<meta name='mw_page_type' content='Browse'>")
      }
      
      
    # end BasicGroup
    
    #List view and column view
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<span><div class=\"mvColumnViewBtn\"></div><div class=\"mvlistViewBtn\"></div></span>"], ["add_after", "#sortBy"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'sortBy'])[1]") {
        inject_after("<span><div class=\"mvColumnViewBtn\"></div><div class=\"mvlistViewBtn\"></div></span>")
      }
      
      
      #
      #Content::Formatting::Dynamic::RemoveClassOnEvent
      #[["target", "#localContentContainer"], ["trigger", ".mvlistViewBtn"], ["old_class", "mvColumnView"], ["trigger_event", "click"]]
      $("(//*[@id = 'localContentContainer'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget19451")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[contains(concat(' ', @class, ' '), ' mvlistViewBtn ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger19451")
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
                append("'),'mvColumnView');},false);")
              }
            }
          }
        }
      }
      
      #
      #Content::Formatting::Dynamic::AddClassOnEvent
      #[["target", "#localContentContainer"], ["trigger", ".mvColumnViewBtn"], ["new_class", "mvColumnView"], ["trigger_event", "click"]]
      $("(//*[@id = 'localContentContainer'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget88358")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[contains(concat(' ', @class, ' '), ' mvColumnViewBtn ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger88358")
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
                append("'),'mvColumnView');},false);")
              }
            }
          }
        }
      }
      
    # end BasicGroup
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", "#weRecommend"]]
    $("//*[@id = 'weRecommend']") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "#weRecommend"]]
    $("//*[@id = 'weRecommend']") {
      attribute("style") {
        remove()
      }
    }
    
    
    #pagination bottom
    #Content::Formatting::MoveAfter
    #[["move_me", "#filtersBottom"], ["after_me", "#macysGlobalLayout"], ["map_multiple", ""]]
    $("(//*[@id = 'macysGlobalLayout'])[1]") {
      move_here("(//*[@id = 'filtersBottom'])[1]", "after")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRedFont"], ["selector", "b:contains(\"SPECIAL SAVINGS! \")"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//b[contains(., \"SPECIAL SAVINGS! \")]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvRedFont")
          }
        }
      }
    }
    
    
  }
  
  
  #splash
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "body.splash"], ["negate", ""]]
  $("(//body[contains(concat(' ', @class, ' '), ' splash ')])[1]") {
    #page title
    #Content::Formatting::ReplaceTag
    #[["selector", "#nav_title > h1 > a"], ["new_tag_name", "div"], ["class_name", "mvTitle"]]
    $("//*[@id = 'nav_title']/h1/a") {
      name("div")
      attribute("class", "mvTitle")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".nav_cat_item_bold"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "span:contains(\"gift cards - free shipping\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//span[contains(., \"gift cards - free shipping\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
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
    #[["selector", "#macysGlobalLayout, br.clearboth, .mvRemoveElement, #registrySplashPools"]]
    $("//*[@id = 'macysGlobalLayout']") {
      remove()
    }
    $("//br[contains(concat(' ', @class, ' '), ' clearboth ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[@id = 'registrySplashPools']") {
      remove()
    }
    
    
    #dark gray nav
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".nav_cat_item_bold > span"], ["new_tag_name", "div"], ["class_name", "mvDarkGrayBar"]]
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]/span") {
        name("div")
        attribute("class", "mvDarkGrayBar")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".nav_cat_item_bold > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]/div") {
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
      #[["attribute", "class"], ["value", "mvCateNav"], ["selector", ".nav_cat_item_bold > ul"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]/ul") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvCateNav")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvDarkGrayBar"], ["content_selector", ".mvCateNav"], ["ancestor_selector", ".nav_cat_item_bold"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' mvCateNav ')]") {
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
                append("91304")
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
                append("91304")
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
      #Content::Formatting::SetInnerHTML
      #[["selector", ".nav_cat_item_bold .mvDarkGrayBar"], ["html", "<div><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
        inner() {
          prepend("<div><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvWhiteGrayBar"], ["selector", ".mvCateNav li"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvCateNav ')]//li") {
        match($done, "no") {
            var("conditional", "false")
              $(".//a") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                append(" mvWhiteGrayBar")
            }
          }
            }
        }
      }
      
      
    # end BasicGroup
    
    #red font nav
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".nav_cat_item_hilite > a"], ["tag_name", "div"], ["class_name", "mvWhiteGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_hilite ')]/a") {
        wrap("div") {
          attribute("class", "mvWhiteGrayBar")
        }
      }
      
      
     
      
      #Women
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "#nav_title > h1 > a:contains(\"Women's\")"], ["negate", ""]]
      $("(//*[@id = 'nav_title']/h1/*[contains(., \"Women's\")])[1]") {
      
      
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_womens.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_womens.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_womens.jpg', 'image'))
          }
        }
        
        
      }
      
      
      #bed and bath
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/bed-bath"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/bed-bath/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_bedandbath.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_bedandbath.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_bedandbath.jpg', 'image'))
          }
        }
        
        
        
      }
      
      #for the home
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/for-the-home"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/for-the-home/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_forthehome.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_forthehome.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_forthehome.jpg', 'image'))
          }
        }
                
      }
      
      #men
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/mens"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/mens/) {
      
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_mens.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_mens.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_mens.jpg', 'image'))
          }
        }
              
      }
      
      #kids
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/kids"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/kids/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_kids.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_kids.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_kids.jpg', 'image'))
          }
        }
        
       
      }
      
      #beauty
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/beauty"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/beauty/) {
      
        #
        #Content::Formatting::MoveToEndOf
        #[["move_me", ".nav_cat_item_hilite"], ["to_end_of_me", "#localNavigationContainer > ul"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
        $("(//*[@id = 'localNavigationContainer']/ul)[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' nav_cat_item_hilite ')])[1]", "bottom")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_beauty.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_beauty.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_beauty.jpg', 'image'))
          }
        }
        
        
      }
      
      #shoes
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/shoes"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/shoes/) {
      
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_shoes.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_shoes.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_shoes.jpg', 'image'))
          }
        }
        
        
      }
      
      #handbags accessories
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/handbags-accessories"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/handbags-accessories/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_handbags.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_handbags.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_handbags.jpg', 'image'))
          }
        }
        
        
      }
      
      #junior
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/juniors"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/juniors/) {
      
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_juniors.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_juniors.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_juniors.jpg', 'image'))
          }
        }
        
        
      }
      
      #jewelry watches
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/jewelry-watches"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/jewelry-watches/) {
      
        #
        #Content::Formatting::ReplaceTag
        #[["selector", ".mvClearance"], ["new_tag_name", "a"], ["class_name", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvClearance ')]") {
          name("a")
        }
        
        
        #
        #Content::Formatting::ReplaceTag
        #[["selector", ".mvSaleClearance"], ["new_tag_name", "a"], ["class_name", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvSaleClearance ')]") {
          name("a")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_jewelryandwatches.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_jewelryandwatches.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_jewelryandwatches.jpg', 'image'))
          }
        }
        
        
      }
      
      #sale
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/sale"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/sale/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_sale.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_sale.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_sale.jpg', 'image'))
          }
        }
        
        
        #
        #Content::Formatting::MoveToBeginningOf
        #[["move_me", ".nav_cat_item_bold"], ["to_beginning_of_me", "#localNavigationContainer > ul"], ["map_multiple", ""], ["ancestor_selector", ""]]
        $("(//*[@id = 'localNavigationContainer']/ul)[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')])[1]", "top")
        }
        
        
        #
        #Content::Formatting::MoveToBeginningOf
        #[["move_me", "#localNavigationContainer > ul > li:last-of-type"], ["to_beginning_of_me", "#localNavigationContainer > ul"], ["map_multiple", ""], ["ancestor_selector", ""]]
        $("(//*[@id = 'localNavigationContainer']/ul)[1]") {
          move_here("(//*[@id = 'localNavigationContainer']/ul/li[position() = last()])[1]", "top")
        }
        
        
      }
      
      #furniture
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/furniture"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/furniture/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_furniture.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_furniture.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_furniture.jpg', 'image'))
          }
        }
        
        
      }
      
      #Kitchen
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/kitchen"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/kitchen/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_kitchen.jpg\"></div>"], ["add_after", "#nav_title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'nav_title'])[1]") {
          #inject_after("<div class=\"mvBanner\"><img src=\"http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/banners/topcat_1_kitchen.jpg\"></div>")
          insert_after("div", class: "mvBanner") {
            insert("img", src: asset('banners/topcat_1_kitchen.jpg', 'image'))
          }
        }
        
        
      }
      
     
      
    # end BasicGroup
    
    #Gifts & Gift Cards
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/gifts-gift-cards"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/gifts-gift-cards/) {
    
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", ".nav_cat_item_hilite"], ["to_end_of_me", ".nav_cat_sub_2.first"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' nav_cat_sub_2 ') and contains(concat(' ', @class, ' '), ' first ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' nav_cat_item_hilite ')])[1]", "bottom")
      }
      
      
    }
    
  }
  
  
  #brand browse
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#beautyCategoryFeatureBanner"], ["negate", ""]]
  $("(//*[@id = 'beautyCategoryFeatureBanner'])[1]") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLightGrayBar"], ["selector", ".parentCategories, .subCategoryElement"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' parentCategories ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvLightGrayBar")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' subCategoryElement ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvLightGrayBar")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#beautyGlobalBanner, #beautyCategoryFeatureBanner, #catNavheader, #catNavigationSection, #subAdOuterBorder"]]
    $("//*[@id = 'beautyGlobalBanner']") {
      remove()
    }
    $("//*[@id = 'beautyCategoryFeatureBanner']") {
      remove()
    }
    $("//*[@id = 'catNavheader']") {
      remove()
    }
    $("//*[@id = 'catNavigationSection']") {
      remove()
    }
    $("//*[@id = 'subAdOuterBorder']") {
      remove()
    }
    
    
  }
  
  
  #Back to Top
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "function scrollToTop()   {   window.scrollTo(0,0);   } "], ["add_after", ""], ["add_before", ""]]
      $("html/body") {
        insert_bottom("script") {
          attribute("language", "javascript")
          inner("function scrollToTop()   {   window.scrollTo(0,0);   } ")
        }
      }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvBackToTopContainer\"><div class=\"mvBackToTop\" onclick=\"scrollToTop()\">back to top</div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#paginateBottom"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'paginateBottom'])[1]") {
      inject_before("<div class=\"mvBackToTopContainer\"><div class=\"mvBackToTop\" onclick=\"scrollToTop()\">back to top</div></div>")
    }
    
    
  # end BasicGroup
  
  #page title too long
  #Group::URLMatcherGroup
  #[["url_matcher", "(\\/deep-cleaners-steam-cleaners)|(\\/vacuum-attachments-cleaners)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(\/deep-cleaners-steam-cleaners)|(\/vacuum-attachments-cleaners)/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "style"], ["value", "font-size:16px;"], ["selector", ".mvTitle"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvTitle ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("style") {
          value() {
              set("font-size:16px;")
          }
        }
      }
    }
  }
  #
  #The images in these elements have src='http://www1.macys.com/shop/bed-bath/bath/bath-towels' -- this request returns set-cookie headers
  #Content::Formatting::RemoveElements
  #[["selector", ".overlayImgBox"]]
  $("//*[contains(concat(' ', @class, ' '), ' overlayImgBox ')]") {
    remove()
  }
  
  
  #spinners
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkBars"], ["selector", "#globalContentContainer .mvWhiteGrayBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'globalContentContainer']//*[contains(concat(' ', @class, ' '), ' mvWhiteGrayBar ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvLinkBars")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkBars"], ["selector", "#globalContentContainer .mvWhiteBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'globalContentContainer']//*[contains(concat(' ', @class, ' '), ' mvWhiteBar ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvLinkBars")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkBars"], ["selector", "#globalContentContainer .mvLightGrayBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'globalContentContainer']//*[contains(concat(' ', @class, ' '), ' mvLightGrayBar ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvLinkBars")
          }
        }
          }
      }
    }
    # Adding how many items to display (20) on the browse pages 
    # links other than the social ones the other category pages
    # and the gift card pages
    $("//*[@id = 'localNavigationContainer']/ul/li/ul/li") {
      $("./a[contains(@href,'.com/shop') and not(contains(@href, 'gifts-gift-cards'))]") {
          attribute("href") {
           value() {
             #replace(/regex/, "replacementString")
             append("#!fn=sortBy%3DORIGINAL%26productsPerPage%3D20&!qvp=iqvp")
          }
        }
      }
    }
   $("//div[@class='mvNarrowResaultMask']"){
     attribute("class", "mvNarrowResaultMask")
   }
  
}
