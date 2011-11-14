# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
       add_class("mw_myinfo")
     }

  #
  #Content::Absolutize::AbsolutizeInputTags
  #[]
  $("//input[@src]") {
    var("src", fetch("./@src"))
    attribute("src") {
      value() {
        # if the src starts with a slash (/) but not a double slash (//) then add the host
        match($src, /^\/[^\/]/) {
          prepend($source_host)
          prepend("//")
        }
        # TODO: handle the case where the image URL is page-relative (doesn't start with http
        # or a slash)
      }
    }
  }

  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "width"], ["selector", "table"]]
  $("//table") {
    attribute("width") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".clearboth"]]
  $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
    remove()
  }
  
  
  #Account Nav Only
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "form[name=\"offer\"]"], ["negate", ""]]
  $("(//form[@name = \"offer\"])[1]") {
  
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvAccountNavBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvAccountNavBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#nav_title"], ["html", "<span valign=\"top\" class=\"mvTitle\">my account</span>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'nav_title']") {
      inner("<span valign=\"top\" class=\"mvTitle\">my account</span>")
    }
    
    
    #SUPC
    #promote code shows on my account page when create profile.
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".cssContent > table:first-of-type strong"], ["new_tag_name", "div"], ["class_name", "mvSUPC"]]
      $("//*[contains(concat(' ', @class, ' '), ' cssContent ')]/table[position() = 1]//strong") {
        name("div")
        attribute("class", "mvSUPC")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".mvSUPC"], ["after_me", "#nav_title"], ["map_multiple", ""]]
      $("(//*[@id = 'nav_title'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvSUPC ')])[1]", "after")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "a:contains(\"my gift registry\")"], ["after_me", "li a:contains(\"My Wish List\")"], ["map_multiple", ""]]
    $("(//li//a[contains(., \"My Wish List\")])[1]") {
      move_here("(//a[contains(., \"my gift registry\")])[1]", "after")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "a:contains(\"My Wish List\")"]]
    $("//a[contains(., \"My Wish List\")]") {
      remove()
    }
    
    
    #Insert HTML--Macy's Card
    #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mvMacysCardWrapper"], ["selector", ".nav_cat_item_bold"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "span:contains(\"MY MACY'S CARD\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
            match($done, "no") {
                var("conditional", "false")
                  $(".//span[contains(., \"MY MACY'S CARD\")]") {
                    var("conditional", "true")
                  }
                match($conditional, "true") {
                var("done", "yes")
             add_class("mvMacysCardWrapper")
                }
            }
          }
    #inject html for macy's card nav
      $("//li[contains(concat(' ', @class, ' ') ,'mvMacysCardWrapper')]") {
      inject_after("<div class='mvMacysCardLinks mvAccountGroup'><a href='/service/credit/account.ognc'>View My Credit Account</a><a  href='/service/credit/paybill/index.ognc'>Pay Your Bill</a><a href='/service/credit/acctmgmt/manageaccount.ognc' >Manage Your Credit Account</a><a href='/service/credit/activation/prop.ognc'>Activate Your Macy's Card</a><a href='/service/credit/activation/amex.ognc'>Activate Your Macy's American Express Card</a> <a href='/service/credit/contactus/index.ognc' >Contact Credit Services</a></div>")
      }
     
      #Content::Formatting::RemoveElements
      #[["selector", "//a[contains(text(), \"Macy's Credit Card\")]/.."]]
      $("//a[contains(text(), \"Macy's Credit Card\")]/..") {
        remove()
       }
       
      
         
    # end BasicGroup
    
    #My Store
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvMyStore"], ["selector", "//a[contains(text(), \"directions\")]/../../.."], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//a[contains(text(), \"directions\")]/../../..") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvMyStore")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", "form[name=\"offer\"]"]]
      $("//form[@name = \"offer\"]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvMyStore, form[name=\"offer\"], form[name=\"offer\"] + div"], ["class_name", "mvMyStoreWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvMyStore ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMyStoreWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMyStore ')][not (@the_wrapper)]", "bottom")
            move_here("//form[@name = \"offer\"][not (@the_wrapper)]", "bottom")
            move_here("//form[@name = \"offer\"]/following-sibling::*[1]/self::div[not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//form[@name = \"offer\"])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMyStoreWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMyStore ')][not (@the_wrapper)]", "bottom")
            move_here("//form[@name = \"offer\"][not (@the_wrapper)]", "bottom")
            move_here("//form[@name = \"offer\"]/following-sibling::*[1]/self::div[not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//form[@name = \"offer\"]/following-sibling::*[1]/self::div)[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMyStoreWrapper")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMyStore ')][not (@the_wrapper)]", "bottom")
            move_here("//form[@name = \"offer\"][not (@the_wrapper)]", "bottom")
            move_here("//form[@name = \"offer\"]/following-sibling::*[1]/self::div[not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", ".mvMyStoreWrapper"], ["before_me", "#localContentContainer"], ["map_moves", ""]]
      $("(//*[@id = 'localContentContainer'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvMyStoreWrapper ')])[1]", "before")
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "form[name=\"offer\"] li"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//form[@name = \"offer\"]//li") {
        name("div")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#localContentContainer, a[title=\"stores near you\"], a[title=\"stores near you\"] + br"]]
      $("//*[@id = 'localContentContainer']") {
        remove()
      }
      $("//a[@title = \"stores near you\"]") {
        remove()
      }
      $("//a[@title = \"stores near you\"]/following-sibling::*[1]/self::br") {
        remove()
      }
      
      
      #
      #Content::Formatting::Table::Remove::PreserveLayout
      #[["selector", ".mvMyStore"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMyStore ')]" ) {
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
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvMyStoreSelector mvWhiteGrayBar\"><span>MY STORE</span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">− </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMyStoreWrapper"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMyStoreWrapper ')])[1]") {
        inject_before("<div class=\"mvMyStoreSelector mvWhiteGrayBar\"><span>MY STORE</span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvMyStoreSelector"], ["content_selector", ".mvMyStoreWrapper"], ["open_on_load", "true"], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[contains(concat(' ', @class, ' '), ' mvMyStoreWrapper ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_con")
              append($counter)
              append("73314")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvMyStoreSelector ')]") {
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
              append("73314")
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
      #Content::Inject::InjectHTML
      #[["html", "<br/>"], ["add_after", ""], ["multiple", ""], ["add_before", "b:contains(\"Tomorrow's Hours :\")"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//b[contains(., \"Tomorrow's Hours :\")])[1]") {
        inject_before("<br/>")
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMyStore, form[name=\"offer\"], form[name=\"offer\"] + div"], ["tag_name", "div"], ["class_name", "mvShadowBox"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMyStore ')]") {
        wrap("div") {
          attribute("class", "mvShadowBox")
        }
      }
      $("//form[@name = \"offer\"]") {
        wrap("div") {
          attribute("class", "mvShadowBox")
        }
      }
      $("//form[@name = \"offer\"]/following-sibling::*[1]/self::div") {
        wrap("div") {
          attribute("class", "mvShadowBox")
        }
      }
      
      
    # end BasicGroup
    
    #Navs
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvMyOrders"], ["selector", ".nav_cat_item_bold"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "span:contains(\"MY ORDERS\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//span[contains(., \"MY ORDERS\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvMyOrders")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGiftCard"], ["selector", ".nav_cat_item_bold"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "span:contains(\"GIFT CARDS\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//span[contains(., \"GIFT CARDS\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvGiftCard")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".mvMyOrders + li"], ["wrapper_class", "mvAccountGroup"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMyOrders ')]/following-sibling::*[1]/self::li") {
        wrap("div") {
          attribute("class", "mvAccountGroup")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
     
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvAccountGroup"], ["selector", ".mvGiftCard + li"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvGiftCard ')]/following-sibling::*[1]/self::li") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvAccountGroup")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", ".nav_cat_item_bold"], ["wrapper_class", "mvAccountGroupWrapper"], ["sibling_count", "1"]]
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
                    wrap("div") {
                      attribute("class", "mvAccountGroupWrapper")
                      move_here("(following-sibling::*)[1]", "bottom")
                    }
                  }
                 
       
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvAccountGroupWrapper a"], ["tag_name", "div"], ["class_name", "mvLightGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvAccountGroupWrapper ')]//a") {
        wrap("div") {
          attribute("class", "mvLightGrayBar")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvWhiteGrayBar"], ["selector", ".nav_cat_item_bold"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvWhiteGrayBar")
            }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["add_after", ".nav_cat_item_bold > span"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]/span") {
        inject_after("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".localnav > .menuitem > a"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' localnav ')]/*[contains(concat(' ', @class, ' '), ' menuitem ')]/a") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvWhiteGrayBar"], ["selector", ".nav_cat_item_bold"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvWhiteGrayBar")
            }
          }
        }
      }
      
      $("//li[@class='mvMacysCardWrapper']") {
        add_class("mvWhiteGrayBar")
      }
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".nav_cat_item_bold"], ["content_selector", ".mvAccountGroup"], ["ancestor_selector", ".mvAccountGroupWrapper"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvAccountGroupWrapper ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' mvAccountGroup ')]") {
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
                append("72460")
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
        $(".//*[contains(concat(' ', @class, ' '), ' nav_cat_item_bold ')]") {
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
                append("72460")
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
    
    #Remove Links
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"New Card Perks\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//a[contains(., \"New Card Perks\")]") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Apply for a Macy's Card\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//a[contains(., \"Apply for a Macy's Card\")]") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Credit Card Privacy Policy\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//a[contains(., \"Credit Card Privacy Policy\")]") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Current Credit Card Agreements\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//a[contains(., \"Current Credit Card Agreements\")]") {
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
      
      
    # end BasicGroup
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", "div, span, table, tr, td"]]
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
    $("//table") {
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
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvRemoveElement"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    
    
  }
  
  
  #Account Sub pages
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "form[name=\"offer\"]"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//form[@name = \"offer\"])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#localNavigationContainer, #depthpathContainer"]]
    $("//*[@id = 'localNavigationContainer']") {
      remove()
    }
    $("//*[@id = 'depthpathContainer']") {
      remove()
    }
    
    
   
    #Rewards
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/mymacysrewards\\/accountassociation"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/mymacysrewards\/accountassociation/) {
    
      #Page Title
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\"><span>My Macy's Rewards</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bd'])[1]") {
        inject_before("<div class=\"mvTitle\"><span>My Macy's Rewards</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", "label, input"]]
      $("//label") {
        attribute("style") {
          remove()
        }
      }
      $("//input") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "img[alt=\"My Macy's Rewards\"], br"]]
      $("//img[@alt = \"My Macy's Rewards\"]") {
        remove()
      }
      $("//br") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "style"], ["value", "padding:10px 10px 0 10px;"], ["selector", "#macysGlobalLayout > p"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']/p") {
        match($done, "no") {
          attribute("style") {
            value() {
                set("padding:10px 10px 0 10px;")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "#myMacysRewardsAccountAssociationForm"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'myMacysRewardsAccountAssociationForm']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvShadowBox")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".buttonSubmitBorders"], ["class_name", "mvFormBtnContainer"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvFormBtnContainer")
            move_here("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #Replace Img Btn
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/addToProfile_btn.gif"], ["selector", "#submitImg"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[@id = 'submitImg']") {
        #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/addToProfile_btn.gif")
        attribute('src', asset('images/buttons/addToProfile.gif'))
      }
      
      
      #Error Meg
      #Content::Formatting::WrapElement
      #[["selector", ".generalError"], ["class_name", "mvErrorMeg"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' generalError ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvErrorMeg")
            move_here("//*[contains(concat(' ', @class, ' '), ' generalError ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
    }
    
    #Rewards summary
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/mymacysrewards\\/accountsummary"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/mymacysrewards\/accountsummary/) {
    
      #Page Title
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\"><span>My Macy's Rewards Summary</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bd'])[1]") {
        inject_before("<div class=\"mvTitle\"><span>My Macy's Rewards Summary</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mainBlock > div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "img"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mainBlock ')]/div") {
        match($done, "no") {
            var("conditional", "false")
              $(".//img") {
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
      #[["selector", "img[alt=\"My Macy's Rewards\"], br, .mvRemoveElement, .mainBlock > div:empty, #macysGlobalLayout > div:first-of-type"]]
      $("//img[@alt = \"My Macy's Rewards\"]") {
        remove()
      }
      $("//br") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mainBlock ')]/div[not (node())]") {
        remove()
      }
      $("//*[@id = 'macysGlobalLayout']/div[position() = 1]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding10"], ["selector", "#macysGlobalLayout > div:first-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']/div[position() = 1]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPadding10")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "mvRewardSummaryBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvRewardSummaryBody")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".titleBar, .mainBlock"], ["class_name", "mvShadowBox"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' titleBar ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvShadowBox")
            move_here("//*[contains(concat(' ', @class, ' '), ' titleBar ')][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mainBlock ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mainBlock ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvShadowBox")
            move_here("//*[contains(concat(' ', @class, ' '), ' titleBar ')][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mainBlock ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
    }
    
   
    }
  
  #Profile--learn more
  #Group::URLMatcherGroup
  #[["url_matcher", "storeCard\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /storeCard\.jsp/) {
  
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvRedTitle\">ADD A STORE CARD TO YOUR PROFILE</div>"], ["add_after", "img[alt=\"ADD A STORE CARD TO YOUR PROFILE\"]"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//img[@alt = \"ADD A STORE CARD TO YOUR PROFILE\"])[1]") {
      inject_after("<div class=\"mvRedTitle\">ADD A STORE CARD TO YOUR PROFILE</div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".formText img,  br"]]
    $("//*[contains(concat(' ', @class, ' '), ' formText ')]//img") {
      remove()
    }
    $("//br") {
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
    #Content::CSS::RemoveStyles
    #[["selector", "div, span, p"]]
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
    
    
  }
    
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvLinkBars"], ["selector", "#globalContentContainer .mvDarkGrayBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'globalContentContainer']//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
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
  
  # hack because somewhere, the menuitem sprite is being removed or not added properly
  $("html/body//li[contains(@class, 'mvDarkGrayBar')]/a") {
    add_class("sprite_me-arrow_right_white")
  }
  
}
