# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
    add_class("mw_search")
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "id"], ["value", "mvNarrowClose"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//body") {
    match($done, "no") {
        var("done", "yes")
      attribute("id") {
        value() {
            set("mvNarrowClose")
        }
      }
    }
  }
  
  
  #
  #Content::Labeling::AddBodyId
  #[["body_id", "mvNarrowOpen"], ["path_regex", "Action=expand"]]
  match($path, /Action=expand/) {
    $("/html/body") {
      attribute("id", "mvNarrowOpen")
    }
  }
  
  
  #clean up layout
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".esnDepthpath h5"], ["after_me", ".esnDepthpath"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' esnDepthpath ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' esnDepthpath ')]//h5)[1]", "after")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".localNavigation > tr > td > table"], ["before_me", ".localNavigation"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' localNavigation ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' localNavigation ')]/tr/td/table)[1]", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "select[name=\"resultsPerPage\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//select[@name = \"resultsPerPage\"]") {
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
    #[["selector", ".searchBanner img, .productThumbnailTableGutter, .pagination .arrow,.localNavigation, .esnDepthpath,.simpleHeader, .mvRemoveElement, .compareCheckbox, #esnCompareButton, br"]]
    $("//*[contains(concat(' ', @class, ' '), ' searchBanner ')]//img") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' productThumbnailTableGutter ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' pagination ')]//*[contains(concat(' ', @class, ' '), ' arrow ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' localNavigation ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' esnDepthpath ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' simpleHeader ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' compareCheckbox ')]") {
      remove()
    }
    $("//*[@id = 'esnCompareButton']") {
      remove()
    }
    $("//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvHideElement"], ["selector", "img[src*=\"tracking.gif\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[contains(@src, \"tracking.gif\")]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvHideElement")
          }
        }
      }
    }
    
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", "table, div, span, tr, td, select"]]
    $("//table") {
      attribute("style") {
        remove()
      }
    }
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
    $("//tr") {
      attribute("style") {
        remove()
      }
    }
    $("//td") {
      attribute("style") {
        remove()
      }
    }
    $("//select") {
      attribute("style") {
        remove()
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
  
  #narrow results
 
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvMoreResult"], ["selector", ".esnLocalNav > div > span.standard"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' esnLocalNav ')]/div/span[contains(concat(' ', @class, ' '), ' standard ')]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvMoreResult")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvMoreResult > span:nth-of-type(1), .mvMoreResult > span:nth-of-type(3)"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMoreResult ')]/span[1]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMoreResult ')]/span[last()]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvNarrowSearchContainer\"><span class=\"mvNarrowSearch\"><span>Narrow Results</span> <span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#localNavigationContainer"], ["conditional_selector", ".standard-normal"], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' standard-normal ')])[1]") {
    $("(//*[@id = 'localNavigationContainer'])[1]") {
      inject_before("<div class=\"mvNarrowSearchContainer\"><span class=\"mvNarrowSearch\"><span>Narrow Results</span> <span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span></div>")
    }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".menu_bucket_normal"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' menu_bucket_normal ')]") {
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
    #Content::Formatting::WrapWithNextSibling
    #[["selector", ".esnLocalNav .mvDarkGrayBar"], ["wrapper_class", "mvNarrowResultCate"], ["sibling_count", "2"]]
    $("//*[contains(concat(' ', @class, ' '), ' esnLocalNav ')]//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
      wrap("div") {
        attribute("class", "mvNarrowResultCate")
        move_here("(following-sibling::*)[1]", "bottom")
        move_here("(following-sibling::*)[1]", "bottom")
      }
    }
    
    
    #Narrow result sub accordian
    #Content::Formatting::Dynamic::Accordian4
    #[["link_selector", ".mvDarkGrayBar"], ["content_selector", ".mvDarkGrayBar ~ div"], ["ancestor_selector", ".mvNarrowResultCate"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("anc_counter", "")
    $("//*[contains(concat(' ', @class, ' '), ' mvNarrowResultCate ')]") {
      var("anc_counter") {
        append("b")
      }
      var("counter", "")
      var("content_id_string", "[")
      $(".//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]/following-sibling::div") {
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
              append("33855")
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
              append("33855")
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
    #[["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".esnLocalNav .mvDarkGrayBar > span"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' esnLocalNav ')]//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]/span") {
      inject_before("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvWhiteGrayBar"], ["selector", ".esnLocalNavContainer, .mvMoreResult > span"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' esnLocalNavContainer ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvWhiteGrayBar")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvMoreResult ')]/span[1]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvWhiteGrayBar")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSearchSortBy"], ["selector", ".formPrice"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' formPrice ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvSearchSortBy")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span><div class=\"mvColumnViewBtn\"></div><div class=\"mvlistViewBtn\"></div></span>"], ["add_after", ".mvSearchSortBy > select"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvSearchSortBy ')]/select)[1]") {
      inject_after("<span><div class=\"mvColumnViewBtn\"></div><div class=\"mvlistViewBtn\"></div></span>")
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".mvNarrowSearchContainer, #localNavigationContainer"], ["class_name", "mvNarrowWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowSearchContainer ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvNarrowWrapper")
          move_here("//*[contains(concat(' ', @class, ' '), ' mvNarrowSearchContainer ')][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'localNavigationContainer'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    match($found, "false") {
      $("(//*[@id = 'localNavigationContainer'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvNarrowWrapper")
          move_here("//*[contains(concat(' ', @class, ' '), ' mvNarrowSearchContainer ')][not (@the_wrapper)]", "bottom")
          move_here("//*[@id = 'localNavigationContainer'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvEsnLocalNav"], ["selector", "#localNavigationContainer > .esnLocalNav"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".mvNarrowResultCate"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'localNavigationContainer']/*[contains(concat(' ', @class, ' '), ' esnLocalNav ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' mvNarrowResultCate ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvEsnLocalNav")
          }
        }
          }
      }
    }
    
    
    #Inject mask
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".menu_bucket_normal"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' menu_bucket_normal ')])[1]") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvNarrowResaultMask\"></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvNarrowWrapper > :first-child"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowWrapper ')]/*[position() = 1 and self::*])[1]") {
        inject_before("<div class=\"mvNarrowResaultMask\"></div>")
      }
      
      
    }
    
    
    #narrow results accordian
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", "#mvNarrowClose .mvNarrowSearch"], ["content_selector", "#mvNarrowClose #localNavigationContainer, .mvNarrowResaultMask"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[@id = 'mvNarrowClose']//*[@id = 'localNavigationContainer']") {
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
            append("82691")
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
    $("//*[@id = 'mvNarrowClose']//*[contains(concat(' ', @class, ' '), ' mvNarrowResaultMask ')]") {
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
            append("82691")
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
    $("//*[@id = 'mvNarrowClose']//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')]") {
      var("counter") {
        append("a")
      }
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("acc_link")
            append($counter)
            append("82691")
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
    
    
    #Keep More and less accordian open
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #After more or less narrow results open
      #Content::Formatting::Dynamic::Accordian3
       var("counter", "")
        var("content_id_string", "[")
        $("//*[@id = 'mvNarrowOpen']//*[@id = 'localNavigationContainer']") {
          var("counter") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("acc_con")
                append($counter)
                append("66588")
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
        $("//*[@id = 'mvNarrowOpen']//*[contains(concat(' ', @class, ' '), ' mvNarrowResaultMask ')]") {
          var("counter") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("acc_con")
                append($counter)
                append("66588")
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
        $("//*[@id = 'mvNarrowOpen']//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')]") {
          attribute("class") {
                    value() {
                              append(" moovweb_open")
                            }
                          }
          var("counter") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("acc_link")
                append($counter)
                append("66588")
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
      
      
      #keep less... accordian open
      $("//em/a[contains(text(), 'less')]/../../../../../../..") {
        attribute("id") {
          value() {
            append("mvLess")
          }
        }  
      }

      # $("//div[@class='mvNarrowResultCate'][//a[contains(text(), 'less')]]") {
      #                         
      #                        }
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "moovweb_open"], ["selector", "#mvLess .mvDarkGrayBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'mvLess']//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  append(" moovweb_open")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", " "], ["selector", "#mvLess .mw_accordian_hide"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'mvLess']//*[contains(concat(' ', @class, ' '), ' mw_accordian_hide ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  set(" ")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #switch less and more by accordian
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::WrapElement
        #[["selector", "//div[contains(@id, 'mvLess')]/div[2]/span/div[position() >10]"], ["class_name", "mvMoreCate"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//div[contains(@id, 'mvLess')]/div[2]/span/div[position() >10])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMoreCate")
              move_here("//div[contains(@id, 'mvLess')]/div[2]/span/div[position() >10][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvWhiteGrayBar mvLessBar\"><span class=\"mvMinus\"><em>Less...</em></span><span class=\"mvPlus\"><em>More...</em></span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#mvLess > div > span.standard.mvWhiteGrayBar"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'mvLess']/div/span[contains(concat(' ', @class, ' '), ' standard ') and contains(concat(' ', @class, ' '), ' mvWhiteGrayBar ')])[1]") {
          inject_before("<div class=\"mvWhiteGrayBar mvLessBar\"><span class=\"mvMinus\"><em>Less...</em></span><span class=\"mvPlus\"><em>More...</em></span></div>")
        }
        
        
        #
        #Content::Formatting::Dynamic::Accordian3
        #[["link_selector", ".mvLessBar"], ["content_selector", ".mvMoreCate"], ["open_on_load", "true"], ["hide_with_zero_height", ""]]
        var("counter", "")
        var("content_id_string", "[")
        $("//*[contains(concat(' ', @class, ' '), ' mvMoreCate ')]") {
          var("counter") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("acc_con")
                append($counter)
                append("98123")
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
        $("//*[contains(concat(' ', @class, ' '), ' mvLessBar ')]") {
          attribute("class") {
            value() {
              append(" moovweb_open")
            }
          }
          var("counter") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("acc_link")
                append($counter)
                append("98123")
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
        #Content::Javascript::AddInlineScriptTag
        #[["script", "function scrollToWindow()   {    var ypos = document.getElementById('mvLess').offsetTop;    window.scrollTo(0,ypos);   } "], ["add_after", ""], ["add_before", ""]]
          $("html/body") {
            insert_bottom("script") {
              attribute("language", "javascript")
              inner("function scrollToWindow()   {    var ypos = document.getElementById('mvLess').offsetTop;    window.scrollTo(0,ypos);   } ")
            }
          }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "onMouseup"], ["value", "scrollToWindow()"], ["selector", ".mvLessBar.moovweb_open"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvLessBar ') and contains(concat(' ', @class, ' '), ' moovweb_open ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("onMouseup") {
              value() {
                  set("scrollToWindow()")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #close btn inside narrow by container
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#localNavigationContainer > .esnLocalNav"], ["html", "<div class=\"mvCloseMenu mvDarkBtn\">close</div>"], ["prepend", ""], ["append", "true"]]
      $("//*[@id = 'localNavigationContainer']/*[contains(concat(' ', @class, ' '), ' esnLocalNav ')]") {
        inner() {
          append("<div class=\"mvCloseMenu mvDarkBtn\">close</div>")
        }
      }
      
      
      #
      #Content::Formatting::AddEventTrigger
      #[["target", ".mvNarrowSearch"], ["target_event", "click"], ["trigger", "#localNavigationContainer .mvCloseMenu"], ["trigger_event", ""], ["multiple", ""], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
      var("trigger_id", "")
      var("target_id", "")
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("54835")
              }
            }
          }
          var("target_id", fetch("./@id"))
      }
      $("(//*[@id = 'localNavigationContainer']//*[contains(concat(' ', @class, ' '), ' mvCloseMenu ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("54835")
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
    
    #clase narrow when click mask
    #Content::Formatting::AddEventTrigger
    #[["target", ".mvNarrowSearch"], ["target_event", "click"], ["trigger", ".mvNarrowResaultMask"], ["trigger_event", ""], ["multiple", ""], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
    var("trigger_id", "")
    var("target_id", "")
    $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("etarget")
              append("30308")
            }
          }
        }
        var("target_id", fetch("./@id"))
    }
    $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowResaultMask ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("etrigger")
              append("30308")
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
    
    
    #close Search when click narrow
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::Dynamic::AddClassOnEvent
      #[["target", "#globalSubNav"], ["trigger", ".mvNarrowSearch"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
      $("(//*[@id = 'globalSubNav'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget30302")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger30302")
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
      #[["target", ".mvSearchDropdown"], ["trigger", ".mvNarrowSearch"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget38038")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger38038")
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
    
    #close narrow when click Search
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::Dynamic::AddClassOnEvent
      #[["target", "#localNavigationContainer"], ["trigger", ".mvSearchDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
      $("(//*[@id = 'localNavigationContainer'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget55426")
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
              set("addclasstrigger55426")
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
      #[["target", ".mvNarrowSearch"], ["trigger", ".mvSearchDropdown"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget79778")
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
              set("addclasstrigger79778")
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
    
    #close narrow when click menu
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::Dynamic::AddClassOnEvent
      #[["target", "#localNavigationContainer"], ["trigger", ".mvMenuDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
      $("(//*[@id = 'localNavigationContainer'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget38946")
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
              set("addclasstrigger38946")
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
      #[["target", ".mvNarrowSearch"], ["trigger", ".mvMenuDropdown"], ["old_class", "moovweb_open"], ["trigger_event", "click"]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowSearch ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget67197")
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
              set("addclasstrigger67197")
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
    
    #close narrow result mask
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::Dynamic::AddClassOnEvent
      #[["target", ".mvNarrowResaultMask"], ["trigger", ".mvMenuDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowResaultMask ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget41904")
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
              set("addclasstrigger41904")
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
      #[["target", ".mvNarrowResaultMask"], ["trigger", ".mvSearchDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "click"]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvNarrowResaultMask ')])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget28679")
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
              set("addclasstrigger28679")
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
  
  #Column view and list view
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Dynamic::RemoveClassOnEvent
    #[["target", "#browseLayout"], ["trigger", ".mvlistViewBtn"], ["old_class", "mvColumnView"], ["trigger_event", "click"]]
    $("(//*[@id = 'browseLayout'])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstarget76067")
          }
        }
      }
      var("target_id", fetch("./@id"))
      match($cookie, /mw_grid_view=true/) {
        add_class("mvColumnView")
      }
    }
    $("(//*[contains(concat(' ', @class, ' '), ' mvlistViewBtn ')])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstrigger76067")
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
              append("'),'mvColumnView'); setCookie('mw_grid_view', 'false', null, '.macys.com'); },false);")
            }
          }
        }
      }
    }
    
    #
    #Content::Formatting::RemoveWhiteSpace
    #[["selector", ".mvSearchSortBy"]]
    # NOTE: This will remove text elements that are whitespace only, but it will not remove
    # the preceding or following whitespace from elements that have some text
    $("//*[contains(concat(' ', @class, ' '), ' mvSearchSortBy ')]/text()[normalize-space(.) = '']") {
      remove()
    }
    
    
    #
    #Content::Formatting::Dynamic::AddClassOnEvent
    #[["target", "#browseLayout"], ["trigger", ".mvColumnViewBtn"], ["new_class", "mvColumnView"], ["trigger_event", "click"]]
    $("(//*[@id = 'browseLayout'])[1]") {
      var("id", fetch("./@id"))
      match($id, /^$/) {
        attribute("id") {
          value() {
            set("addclasstarget46215")
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
            set("addclasstrigger46215")
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
              append("'),'mvColumnView'); setCookie('mw_grid_view', 'true', null, '.macys.com'); },false);")
            }
          }
        }
      }
    }
    
  # end BasicGroup
  
  #Items
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #Thumbnails
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "wid"], ["query_parameter_value", "155"], ["selector", "img[name=\"CATimage\"]"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//img[@name = \"CATimage\"]") {
        attribute("src") {
          value() {
            append("?wid=155")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Formatting::AddQueryParameter
      #[["query_parameter_name", "hei"], ["query_parameter_value", "190"], ["selector", "img[name=\"CATimage\"]"], ["tag_attribute", "src"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
      $("//img[@name = \"CATimage\"]") {
        attribute("src") {
          value() {
            append("?hei=190")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
    # end BasicGroup
    
    #more colors
      
    $("//img[@title = 'More Colors Available']/..") {
        add_class("mvMoreColor")
        text("more colors available")
        move_to("..", "bottom")
      
    }
      
    # end BasicGroup
    
    #mvBuyMore
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBuyMore"], ["selector", "img[title=\"Buy More, Save More\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@title = \"Buy More, Save More\"]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvBuyMore")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", "img[title=\"Buy More, Save More\"]"], ["target_selector", ".mvBuyMore"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//img[@title = \"Buy More, Save More\"]") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvBuyMore ')]") {
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
      #[["selector", ".mvBuyMore > img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvBuyMore ')]/img") {
        remove()
      }
      
      
    # end BasicGroup
    
    #Bonus Offer
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBonusOffer"], ["selector", "img[title=\"Bonus Offer\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@title = \"Bonus Offer\"]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvBonusOffer")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", "img[title*=\"Bonus Offer\"]"], ["target_selector", ".mvBonusOffer"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//img[contains(@title, \"Bonus Offer\")]") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvBonusOffer ')]") {
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
      #[["selector", ".mvBonusOffer > img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvBonusOffer ')]/img") {
        remove()
      }
      
      
    # end BasicGroup
    
    #Special Offer
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvSpecialOffer"], ["selector", "img[title=\"Special Offer\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@title = \"Special Offer\"]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvSpecialOffer")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", "img[title=\"Special Offer\"]"], ["target_selector", ".mvSpecialOffer"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//img[@title = \"Special Offer\"]") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' mvSpecialOffer ')]") {
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
      #[["selector", ".mvSpecialOffer > img"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvSpecialOffer ')]/img") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", "span.productThumb"], ["tag_name", "div"], ["class_name", "mvSearchItemsWrapper"], ["id", ""], ["multiple", "true"]]
    $("//span[contains(concat(' ', @class, ' '), ' productThumb ')]") {
      wrap("div") {
        attribute("class", "mvSearchItemsWrapper")
      }
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".productThumb.productThumbBorder"]]
    $("//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' productThumbBorder ')]") {
      move_to("..", "before")
    }
    
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Formatting::MoveToBeginningOf
    #  #[["move_me", ".productThumbDescContainer"], ["to_beginning_of_me", "span.productThumb"], ["map_multiple", "true"], ["ancestor_selector", ".mvSearchItemsWrapper"]]
    #  $("//*[contains(concat(' ', @class, ' '), ' mvSearchItemsWrapper ')]") {
    #    $("(.//span[contains(concat(' ', @class, ' '), ' productThumb ')])[1]") {
    #      move_here("(.//*[contains(concat(' ', @class, ' '), ' productThumbDescContainer ')])[1]", "top")
    #    }
    #  }
    #  
    #  
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvItemContainer"], ["selector", ".productPagination + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
   
    $("//*[contains(concat(' ', @class, ' '), ' productPagination ')]/following-sibling::*[1]/self::div") {
              add_class("mvItemContainer")
               
              
    }
    
     
  # end BasicGroup
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  
  #
  #Content::Formatting::SetInnerText
  #[["selector", ".formPrice"], ["text", "Sort by: "], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
  # NOTE: not sure if /html() or /text() is what I want to be using here
  $("//*[contains(concat(' ', @class, ' '), ' formPrice ')]") {
    inner() {
      set("Sort by: ")
    }
  }
  
  
  #
  #Content::Passthrough::Link
  #[["selector", ".banner-box a"], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
  # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
  # we tend to do in v2
  $("//*[contains(concat(' ', @class, ' '), ' banner-box ')]//a") {
    attribute("href") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #No result
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "form[name=\"searchResultsForm\"]"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//form[@name = \"searchResultsForm\"])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvNoSearchResult"], ["selector", "#browseLayout"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'browseLayout']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvNoSearchResult")
          }
        }
      }
    }
    
    
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRelatedInfo"], ["selector", "strong:contains(\"Related Information\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//strong[contains(., \"Related Information\")]") {
    match($done, "no") {
      $("..") { 
         $("a[contains(@href,'weddingchannel')]"){
            attribute("href", "/registry/wedding/registryhome" )

          }
        var("done", "yes") 
      attribute("class") {
        value() {
            set("mvRelatedInfo")
        }
      }
     
      }
    }
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
    #[["html", "<div class=\"mvBackToTopContainer\"><div class=\"mvBackToTop\" onclick=\"scrollToTop()\">back to top</div></div>"], ["add_after", ".mvItemContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvItemContainer ')])[1]") {
      inject_after("<div class=\"mvBackToTopContainer\"><div class=\"mvBackToTop\" onclick=\"scrollToTop()\">back to top</div></div>")
    }
    
    
  # end BasicGroup
  
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
  
  
  
  
}
