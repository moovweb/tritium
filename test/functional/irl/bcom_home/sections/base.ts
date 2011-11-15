
# ----- ParsedHTMLBlocks ----
#must have duplicate base files while i slowly shift all the files over.
#html() {
  #Default
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Default block
    #Content::Passthrough::Link
    #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
    # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
    # we tend to do in v2
   
   
   #this is done in HTML now
   # $("//a") {
   #   attribute("href") {
   #     value() {
   #       rewrite("link")
   #     }
  #    }
   # }
    
    #
    #Default block
    #Content::Passthrough::Form
    #[["regex_exclusion", ""]]
    # NOTE: AF: Very loose implementation. Just rewriting all the forms as
    # we tend to do in v2
    $("//form") { 
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }

    #hack the brown bag back into position.
    $("//div[@id='qb_showBagItems']/a"){
      wrap("div")
      $("./.."){
        attribute("id", "myBagLink")
      }
    }
    
    
    #
    #Default block
    #Content::Absolutize::AbsolutizeImages
    #[]
    $("//img[@src]") {
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
    #Default block
    #Content::Development::SubdomainFix
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Default block
    #Content::Development::KillBrowserCache
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Default block
    #Content::Inject::InjectSubtleMoovwebFooter
    #[]
    $("/html/body") {
      inject_bottom("<div class='moovweb_footer'>Mobile site by <a href='http://moovweb.com'><b>Moovweb</b></a></div>")
    }  
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "credit\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /credit\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "#ln_crActivateCard a"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'ln_crActivateCard']//a") {
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
    #Content::Formatting::MoveAfter
    #[["move_me", "#ln_crActivateCard .mvButton"], ["after_me", ".bl_mainContent"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_mainContent ')])[1]") {
      move_here("(//*[@id = 'ln_crActivateCard']//*[contains(concat(' ', @class, ' '), ' mvButton ')])[1]", "after")
    }
    
    
  }
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".bl_nav_bot_service_social_media"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_social_media ')]") {
    remove()
  }
  
  
  #fixCookies
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all# end BasicGroup
  
  #fix redirect secureServer variable
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all# end BasicGroup
  
  #RemoveStuff
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #remove SWF pages
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveFlashPage"], ["selector", ".bl_nav_side_no_padding *[href*=\".jsp\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')]//*[contains(@href, \".jsp\")]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvRemoveFlashPage")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvRemoveFlashPage"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRemoveFlashPage ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_top_logo img"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_logo ')]//img") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bannerAd"]]
    $("//*[contains(concat(' ', @class, ' '), ' bannerAd ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#se_designer_banner + div"]]
    $("//*[@id = 'se_designer_banner']/following-sibling::*[1]/self::div") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#se_designer_banner"]]
    $("//*[@id = 'se_designer_banner']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bl_nav_top_link_gifts a img"]]
    $("//*[@id = 'bl_nav_top_link_gifts']//a//img") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".chat_bag_reactiveChatLinkContainer"]]
    $("//*[contains(concat(' ', @class, ' '), ' chat_bag_reactiveChatLinkContainer ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".se_store_only_ad_noResults"]]
    $("//*[contains(concat(' ', @class, ' '), ' se_store_only_ad_noResults ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".ch_bag_ads"]]
    $("//*[contains(concat(' ', @class, ' '), ' ch_bag_ads ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bl_nav_top_banner"]]
    $("//*[@id = 'bl_nav_top_banner']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_side"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_side ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".myBagLink .top_nav_link"]]
    $("//*[contains(concat(' ', @class, ' '), ' myBagLink ')]//*[contains(concat(' ', @class, ' '), ' top_nav_link ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img.nav_bag"]]
    $("//img[contains(concat(' ', @class, ' '), ' nav_bag ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_top_section_navigation_options:first-of-type"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 1]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bl_nav_top_link_registry_iShip"]]
    $("//*[@id = 'bl_nav_top_link_registry_iShip']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".splashPoolsContainer"]]
    $("//*[contains(concat(' ', @class, ' '), ' splashPoolsContainer ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onmouseout"], ["selector", "#bl_nav_top_menu a"]]
    $("//*[@id = 'bl_nav_top_menu']//a") {
      attribute("onmouseout") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onmouseover"], ["selector", "#bl_nav_top_menu a"]]
    $("//*[@id = 'bl_nav_top_menu']//a") {
      attribute("onmouseover") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bl_nav_top_seasonal_ad"]]
    $("//*[@id = 'bl_nav_top_seasonal_ad']") {
      remove()
    }
    
    
  # end BasicGroup
  
  #Header
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "#myBagLink"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//*[@id = 'myBagLink']") {
      name("div")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#myBagLink .top_nav_link"], ["html", "<span>Bag: </span>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'myBagLink']//*[contains(concat(' ', @class, ' '), ' top_nav_link ')]") {
      inner("<span>Bag: </span>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvBDBagLinkHREF"], ["selector", "#myBagLink .top_nav_link"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'myBagLink']//*[contains(concat(' ', @class, ' '), ' top_nav_link ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvBDBagLinkHREF")
          }
        }
      }
    }
    
    
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "thisUser.writeCartItems();"], ["add_after", "#mvBDBagLinkHREF"], ["add_before", ""]]

    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#mvBDBagLinkHREF + script"], ["class_name", "mvBagNumber"], ["id", "brownBagItemsTotal"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'mvBDBagLinkHREF']/following-sibling::*[1]/self::script)[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvBagNumber")
          attribute("id", "brownBagItemsTotal")
          move_here("//*[@id = 'mvBDBagLinkHREF']/following-sibling::*[1]/self::script[not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #mainMenu
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #gift cards
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerText
      #[["selector", "#bl_nav_top_link_gifts a"], ["text", "Gifts & Gift Cards"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[@id = 'bl_nav_top_link_gifts']//a") {
        inner() {
          set("Gifts & Gift Cards")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "bl_nav_top_section_navigation_options"], ["selector", "#bl_nav_top_link_gifts"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'bl_nav_top_link_gifts']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("bl_nav_top_section_navigation_options")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", "#bl_nav_top_link_gifts"], ["before_me", ".bl_nav_top_section_navigation_options_last"], ["map_moves", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options_last ')])[1]") {
        move_here("(//*[@id = 'bl_nav_top_link_gifts'])[1]", "before")
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "#bl_nav_top_menu li"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//*[@id = 'bl_nav_top_menu']//li") {
        name("div")
      }
      
      
    # end BasicGroup
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #stores&events
    #  #Group::BasicGroup
    #  #[]
    #  # No need to wrap the contents at all
    #    #
    #    #Content::Formatting::MoveUp
    #    #[["move_me", "#bl_nav_top_link_stores"]]
    #    $("//*[@id = 'bl_nav_top_link_stores']") {
    #      move_to("..", "before")
    #    }
    #    
    #    
    #    #
    #    #Content::Formatting::ReplaceTag
    #    #[["selector", "#bl_nav_top_link_stores"], ["new_tag_name", "div"], ["class_name", ""]]
    #    $("//*[@id = 'bl_nav_top_link_stores']") {
    #      name("div")
    #    }
    #    
    #    
    #  # end BasicGroup
    #  
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", " <div class=\"mvBloomMenuHeader\" id=\"mvBDShopAllProducts\">shop all products</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bl_nav_top_menu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bl_nav_top_menu'])[1]") {
      inject_before(" <div class=\"mvBloomMenuHeader\" id=\"mvBDShopAllProducts\">shop all products</div>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBDAccordionContent"], ["selector", ".bl_nav_top_contain"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvBDAccordionContent")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveToEndOf
    #[["move_me", "#myBagLink"], ["to_end_of_me", ".bl_nav_top_logo"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_logo ')])[1]") {
      move_here("(//*[@id = 'myBagLink'])[1]", "bottom")
    }
    
    
    #add query parametrs to category pages
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #the css selector below works but not on all pages. if i need to fix something try putting it back in.#bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=2910\"]"], ["parameter_name", "MVwomen"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=2910\") or contains(@href, \"id=2910\")]") {
        attribute("href") {
          value() {
            append("?MVwomen=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=2911\"]"], ["parameter_name", "MVcontemporary"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=2911\") or contains(@href, \"id=2911\")]") {
        attribute("href") {
          value() {
            append("?MVcontemporary=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=16961\"]"], ["parameter_name", "MVshoes"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=16961\") or contains(@href, \"id=16961\")]") {
        attribute("href") {
          value() {
            append("?MVshoes=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=16958\"]"], ["parameter_name", "MVhandbags"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=16958\") or contains(@href, \"id=16958\")]") {
        attribute("href") {
          value() {
            append("?MVhandbags=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=3376\"]"], ["parameter_name", "MVaccessories"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=3376\") or contains(@href, \"id=3376\")]") {
        attribute("href") {
          value() {
            append("?MVaccessories=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=2921\"]"], ["parameter_name", "MVbeauty"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=2921\") or contains(@href, \"id=2921\")]") {
        attribute("href") {
          value() {
            append("?MVbeauty=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=3948\"]"], ["parameter_name", "MVgift"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=3948\") or contains(@href, \"id=3948\")]") {
        attribute("href") {
          value() {
            append("?MVgift=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=3864\"]"], ["parameter_name", "MVmen"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=3864\") or contains(@href, \"id=3864\")]") {
        attribute("href") {
          value() {
            append("?MVmen=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=3866\"]"], ["parameter_name", "MVkids"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=3866\") or contains(@href, \"id=3866\")]") {
        attribute("href") {
          value() {
            append("?MVkids=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=3865\"]"], ["parameter_name", "MVhome"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=3865\") or contains(@href, \"id=3865\")]") {
        attribute("href") {
          value() {
            append("?MVhome=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
      #
      #Content::Link::AddQueryParameter
      #[["selector", "a[href*=\"CategoryID=3977\"]"], ["parameter_name", "MVsave"], ["parameter_value", "1"]]
      $("//a[contains(@href, \"CategoryID=3977\") or contains(@href, \"id=3977\")]") {
        attribute("href") {
          value() {
            append("?MVsave=1")
            # change the last question mark into an ampersand for valid query parameters
            replace(/(\?.+)\?/, "\\1&")
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/registry\\/"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/registry\//) {
    
      #add Registry query parametrs to category pages
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #the css selector below works but not on all pages. if i need to fix something try putting it back in.#bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
        #Content::Link::AddQueryParameter
        #[["selector", "#bl_nav_top_menu a[href*=\"CategoryID=8147\"]"], ["parameter_name", "MVkitchen"], ["parameter_value", "1"]]
        $("//*[@id = 'bl_nav_top_menu']//a[contains(@href, \"CategoryID=8147\") or contains(@href, \"id=8147\")]") {
          attribute("href") {
            value() {
              append("?MVkitchen=1")
              # change the last question mark into an ampersand for valid query parameters
              replace(/(\?.+)\?/, "\\1&")
            }
          }
        }
        
        
        #
        #the css selector below works but not on all pages. if i need to fix something try putting it back in.#bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
        #Content::Link::AddQueryParameter
        #[["selector", "#bl_nav_top_menu a[href*=\"CategoryID=4282\"]"], ["parameter_name", "MVluggage"], ["parameter_value", "1"]]
        $("//*[@id = 'bl_nav_top_menu']//a[contains(@href, \"CategoryID=4282\") or contains(@href, \"id=4282\")]") {
          attribute("href") {
            value() {
              append("?MVluggage=1")
              # change the last question mark into an ampersand for valid query parameters
              replace(/(\?.+)\?/, "\\1&")
            }
          }
        }
        
        
        #
        #the css selector below works but not on all pages. if i need to fix something try putting it back in.#bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
        #Content::Link::AddQueryParameter
        #[["selector", "#bl_nav_top_menu a[href*=\"CategoryID=6455\"]"], ["parameter_name", "MVhomeDecor"], ["parameter_value", "1"]]
        $("//*[@id = 'bl_nav_top_menu']//a[contains(@href, \"CategoryID=6455\") or contains(@href, \"id=6455\")]") {
          attribute("href") {
            value() {
              append("?MVhomeDecor=1")
              # change the last question mark into an ampersand for valid query parameters
              replace(/(\?.+)\?/, "\\1&")
            }
          }
        }
        
        
        #
        #the css selector below works but not on all pages. if i need to fix something try putting it back in.#bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
        #Content::Link::AddQueryParameter
        #[["selector", "#bl_nav_top_menu a[href*=\"CategoryID=8203\"]"], ["parameter_name", "MVbedAndBath"], ["parameter_value", "1"]]
        $("//*[@id = 'bl_nav_top_menu']//a[contains(@href, \"CategoryID=8203\") or contains(@href, \"id=8203\")]") {
          attribute("href") {
            value() {
              append("?MVbedAndBath=1")
              # change the last question mark into an ampersand for valid query parameters
              replace(/(\?.+)\?/, "\\1&")
            }
          }
        }
        
        
        #
        #the css selector below works but not on all pages. if i need to fix something try putting it back in.#bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
        #Content::Link::AddQueryParameter
        #[["selector", "#bl_nav_top_menu a[href*=\"CategoryID=8237\"]"], ["parameter_name", "MVdining"], ["parameter_value", "1"]]
        $("//*[@id = 'bl_nav_top_menu']//a[contains(@href, \"CategoryID=8237\") or contains(@href, \"id=8237\")]") {
          attribute("href") {
            value() {
              append("?MVdining=1")
              # change the last question mark into an ampersand for valid query parameters
              replace(/(\?.+)\?/, "\\1&")
            }
          }
        }
        
        
      # end BasicGroup
      
    }
    
    #change Shop All Menu Items
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Women</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(1) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 1]//img)[1]") {
        inject_after("<span>Women</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Contemporary</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(2) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 2]//img)[1]") {
        inject_after("<span>Contemporary</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Shoes</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(3) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 3]//img)[1]") {
        inject_after("<span>Shoes</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Handbags</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(4) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 4]//img)[1]") {
        inject_after("<span>Handbags</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Jewelry & Accessories</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(5) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 5]//img)[1]") {
        inject_after("<span>Jewelry & Accessories</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Beauty</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(6) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 6]//img)[1]") {
        inject_after("<span>Beauty</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Men</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(7) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 7]//img)[1]") {
        inject_after("<span>Men</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Kids</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(8) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 8]//img)[1]") {
        inject_after("<span>Kids</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Home</span>"], ["add_after", ".bl_nav_top_section_navigation_options:nth-of-type(9) img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options ') and position() = 9]//img)[1]") {
        inject_after("<span>Home</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span>Sale</span>"], ["add_after", ".bl_nav_top_section_navigation_options_last img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_section_navigation_options_last ')]//img)[1]") {
        inject_after("<span>Sale</span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div>registry</div>"], ["add_after", "#bl_nav_top_link_registry img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bl_nav_top_link_registry']//img)[1]") {
        inject_after("<div>registry</div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div>stores & events</div>"], ["add_after", "#bl_nav_top_link_stores img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bl_nav_top_link_stores']//img)[1]") {
        inject_after("<div>stores & events</div>")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#bl_nav_top_link_registry img"]]
      $("//*[@id = 'bl_nav_top_link_registry']//img") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#bl_nav_top_link_stores img"]]
      $("//*[@id = 'bl_nav_top_link_stores']//img") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".bl_nav_top_contain img"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain ')]//img") {
        remove()
      }
      
      
    # end BasicGroup
    
    #stores and events
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#bl_nav_top_link_stores"]]
      $("//*[@id = 'bl_nav_top_link_stores']") {
        remove()
      }
      
      
      #chose store drop down
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuWrap mvStoreAndEventsWrap\"><div class=\"mvBloomMenuHeader\">Stores &amp; events</div><div class=\"mvBDAccordionContent\"> <form action=\"/store/index.ognc\" method=\"get\" name=\"dds\"> \t<div class=\"store_location_form\"> \t\t<input type=\"HIDDEN\" name=\"action\" value=\"STORE_DETAIL\"> \t\t<input type=\"hidden\" name=\"lstRegion\" value=\"all\"> \t\t\t<select style=\"width:255px\" onchange=\"this.form.submit();\" name=\"storeId\" id=\"storeId\"> \t\t\t\t<option value=\"\">Choose a Store</option> \t\t\t\t<option value=\"50014\">CA:Stanford</option> \t\t\t\t<option value=\"50015\">CA:Century City</option> \t\t\t\t<option value=\"50016\">CA:Beverly Center</option> \t\t\t\t<option value=\"50017\">CA:Sherman Oaks Fashion Square</option> \t\t\t\t<option value=\"50018\">CA:Newport Fashion Island</option> \t\t\t\t<option value=\"110039\">CA:San Francisco Centre</option> \t\t\t\t<option value=\"110042\">CA:Fashion Valley, San Diego</option> \t\t\t\t<option value=\"110048\">CA:South Coast Plaza</option> \t\t\t\t<option value=\"110056\">CA:Santa Monica Place</option> \t\t\t\t<option value=\"50007\">FL:Boca Raton Town Center</option> \t\t\t\t<option value=\"50008\">FL:Aventura</option> \t\t\t\t<option value=\"50009\">FL:The Falls, Miami</option> \t\t\t\t<option value=\"50010\">FL:Palm Beach Gardens</option> \t\t\t\t<option value=\"60001\">FL:Orlando, The Mall at Millenia</option> \t\t\t\t<option value=\"110059\">FL:Dolphin Mall Outlet</option> \t\t\t\t<option value=\"110061\">FL:Sawgrass Mills Outlet</option> \t\t\t\t<option value=\"110005\">GA:Perimeter Mall, Atlanta</option> \t\t\t\t<option value=\"110006\">GA:Lenox Square</option> \t\t\t\t<option value=\"50011\">IL:North Michigan Avenue</option> \t\t\t\t<option value=\"50012\">IL:Old Orchard</option> \t\t\t\t<option value=\"70001\">IL:Medinah Home, Chicago</option> \t\t\t\t<option value=\"110004\">IL:Oakbrook Center Home</option> \t\t\t\t<option value=\"50005\">MD:White Flint</option> \t\t\t\t<option value=\"110049\">MD:Wisconsin Place, Chevy Chase</option> \t\t\t\t<option value=\"50003\">MA:Chestnut Hill</option> \t\t\t\t<option value=\"50013\">MN:Mall of America</option> \t\t\t\t<option value=\"60002\">NV:Las Vegas Fashion Show Home</option> \t\t\t\t<option value=\"4\">NJ:Bridgewater Commons</option> \t\t\t\t<option value=\"10001\">NJ:Bergen Shops at Riverside</option> \t\t\t\t<option value=\"10002\">NJ:Short Hills</option> \t\t\t\t<option value=\"40001\">NJ:Willowbrook</option> \t\t\t\t<option value=\"110058\">NJ:Bergen Town Center Outlet</option> \t\t\t\t<option value=\"40002\">NY:59th Street</option> \t\t\t\t<option value=\"50001\">NY:White Plains</option> \t\t\t\t<option value=\"50002\">NY:Roosevelt Field</option> \t\t\t\t<option value=\"50019\">NY:Huntington Walt Whitman</option> \t\t\t\t<option value=\"110035\">NY:SoHo</option> \t\t\t\t<option value=\"110036\">NY:Roosevelt Field Furniture</option> \t\t\t\t<option value=\"110050\">NY:Westchester Furniture Clearance</option> \t\t\t\t<option value=\"20001\">PA:King of Prussia (The Court)</option> \t\t\t\t<option value=\"50004\">PA:Willow Grove Park</option> \t\t\t\t<option value=\"50006\">VA:Tysons Corner Center</option> \t\t\t\t<option value=\"110057\">VA:Potomac Mills Outlet</option> \t\t\t\t<option value=\"110052\">UAE:The Dubai Mall</option> \t\t\t</select> \t</div> </form> </div></div>"], ["add_after", ".bl_nav_top_contain_outer #mvBDShopAllProducts + .bl_nav_top_contain.mvBDAccordionContent"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]//*[@id = 'mvBDShopAllProducts']/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain ') and contains(concat(' ', @class, ' '), ' mvBDAccordionContent ')])[1]") {
          inject_after("<div class=\"mvMenuWrap mvStoreAndEventsWrap\"><div class=\"mvBloomMenuHeader\">Stores &amp; events</div><div class=\"mvBDAccordionContent\"> <form action=\"/store/index.ognc\" method=\"get\" name=\"dds\">   <div class=\"store_location_form\">     <input type=\"HIDDEN\" name=\"action\" value=\"STORE_DETAIL\">    <input type=\"hidden\" name=\"lstRegion\" value=\"all\">      <select style=\"width:255px\" onchange=\"if(x$('#storeId')[0].selectedIndex!=0){this.form.submit();}\" name=\"storeId\" id=\"storeId\">         <option value=\"\">Choose a Store</option>        <option value=\"50014\">CA:Stanford</option>        <option value=\"50015\">CA:Century City</option>        <option value=\"50016\">CA:Beverly Center</option>        <option value=\"50017\">CA:Sherman Oaks Fashion Square</option>         <option value=\"50018\">CA:Newport Fashion Island</option>        <option value=\"110039\">CA:San Francisco Centre</option>         <option value=\"110042\">CA:Fashion Valley, San Diego</option>        <option value=\"110048\">CA:South Coast Plaza</option>        <option value=\"110056\">CA:Santa Monica Place</option>         <option value=\"50007\">FL:Boca Raton Town Center</option>        <option value=\"50008\">FL:Aventura</option>        <option value=\"50009\">FL:The Falls, Miami</option>        <option value=\"50010\">FL:Palm Beach Gardens</option>        <option value=\"60001\">FL:Orlando, The Mall at Millenia</option>         <option value=\"110059\">FL:Dolphin Mall Outlet</option>        <option value=\"110061\">FL:Sawgrass Mills Outlet</option>        <option value=\"110005\">GA:Perimeter Mall, Atlanta</option>        <option value=\"110006\">GA:Lenox Square</option>         <option value=\"50011\">IL:North Michigan Avenue</option>         <option value=\"50012\">IL:Old Orchard</option>         <option value=\"70001\">IL:Medinah Home, Chicago</option>         <option value=\"110004\">IL:Oakbrook Center Home</option>         <option value=\"50005\">MD:White Flint</option>         <option value=\"110049\">MD:Wisconsin Place, Chevy Chase</option>         <option value=\"50003\">MA:Chestnut Hill</option>         <option value=\"50013\">MN:Mall of America</option>         <option value=\"60002\">NV:Las Vegas Fashion Show Home</option>         <option value=\"4\">NJ:Bridgewater Commons</option>         <option value=\"10001\">NJ:Bergen Shops at Riverside</option>         <option value=\"10002\">NJ:Short Hills</option>         <option value=\"40001\">NJ:Willowbrook</option>         <option value=\"110058\">NJ:Bergen Town Center Outlet</option>        <option value=\"40002\">NY:59th Street</option>         <option value=\"50001\">NY:White Plains</option>        <option value=\"50002\">NY:Roosevelt Field</option>         <option value=\"50019\">NY:Huntington Walt Whitman</option>         <option value=\"110035\">NY:SoHo</option>         <option value=\"110036\">NY:Roosevelt Field Furniture</option>        <option value=\"110050\">NY:Westchester Furniture Clearance</option>        <option value=\"20001\">PA:King of Prussia (The Court)</option>         <option value=\"50004\">PA:Willow Grove Park</option>         <option value=\"50006\">VA:Tysons Corner Center</option>        <option value=\"110057\">VA:Potomac Mills Outlet</option>         <option value=\"110052\">UAE:The Dubai Mall</option>      </select>   </div> </form> </div></div>")
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #signin
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #mainSite
      #Group::URLMatcherGroup
      #[["url_matcher", "registry"], ["negate", "true"]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      
      #Just want to match if not a registry page, not if registry occurs anywhere in the URL
      #Reason this makes a difference is that the string literal 'registry' will occur as a query param sometimes
      match($fake_url, not(/\/registry\//)) {
      
        #
        #Content::Formatting::WrapTextChildren
        #[["selector", "#bl_nav_account_flag"], ["tag_name", ""], ["class_name", "mvRemoveMe"], ["multiple", ""], ["split_delimiter", ""]]
        $("(//*[@id = 'bl_nav_account_flag'])[1]") {
          wrap_text_children("div", class: 'mvRemoveMe')
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".bl_nav_top_bag_text"], ["after_me", ".mvStoreAndEventsWrap"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvStoreAndEventsWrap ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_bag_text ')])[1]", "after")
        }
        
        
      }
      
      #The Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "registry"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /registry/) {
      
        #
        #Content::Formatting::MoveAfter
        #[["move_me", ".r_nav_top_bag_links"], ["after_me", ".mvStoreAndEventsWrap"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvStoreAndEventsWrap ')])[1]") {
          move_here("(//*[contains(concat(' ', @class, ' '), ' r_nav_top_bag_links ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::WrapTextChildren
        #[["selector", ".r_nav_top_bag_links"], ["tag_name", "div"], ["class_name", "mvRemoveMe"], ["multiple", ""], ["split_delimiter", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' r_nav_top_bag_links ')])[1]") {
          wrap_text_children("div", class: 'mvRemoveMe')
        }
        
        
        #
        #Content::Formatting::InnerRegexReplace
        #[["selector", ".r_nav_top_bag_links > script"], ["regex", "(signin\\/index)"], ["replacement", "/signin/index"], ["multiple", "true"]]
        $("//*[contains(concat(' ', @class, ' '), ' r_nav_top_bag_links ')]/script") {
          inner() {
            replace(/(signin\/index)/, "/signin/index")
          }
        }
        
        
      }
      
    # end BasicGroup
    
    #regestry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #add regestry links
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuWrap\"><div class=\"mvBloomMenuHeader  mvRegistryLink\"><div></div></div><div class=\"mvBDAccordionContent\"> <div id=\"r_home_registryCreate_clickableArea\"> \t\t\t\t\t\t<a href=\"https://www.bloomingdales.com/registry/wedding/registrycaptureemail?cm_re=register-_-n-_-n\" tabindex=\"9\">create</a> \t\t\t\t</div><div id=\"r_home_registryFind_clickableArea\"> \t\t\t\t\t\t<a href=\"http://www1.bloomingdales.com/registry/wedding/registrysearch?cm_re=give-_-n-_-n\" tabindex=\"1\">find</a> \t\t\t\t</div> \t\t\t\t \t\t\t\t<div id=\"r_home_registryManager_clickableArea\"> \t\t\t\t\t\t<a href=\"http://www1.bloomingdales.com/registry/wedding/registrymanager\" tabindex=\"5\">manage</a> \t\t\t\t</div> \t\t\t\t \t\t\t\t</div></div>"], ["add_after", ".bl_nav_top_contain_outer .bl_nav_top_bag_text"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]//*[contains(concat(' ', @class, ' '), ' bl_nav_top_bag_text ')])[1]") {
          inject_after("<div class=\"mvMenuWrap\"><div class=\"mvBloomMenuHeader  mvRegistryLink\"><div></div></div><div class=\"mvBDAccordionContent\"> <div id=\"r_home_registryCreate_clickableArea\">             <a href=\"/registry/wedding/registrycaptureemail?cm_re=register-_-n-_-n\" tabindex=\"9\">create</a>         </div><div id=\"r_home_registryFind_clickableArea\">            <a href=\"/registry/wedding/registrysearch?cm_re=give-_-n-_-n\" tabindex=\"1\">find</a>         </div>                <div id=\"r_home_registryManager_clickableArea\">             <a href=\"/registry/wedding/registrymanager\" tabindex=\"5\">manage</a>         </div>                </div></div>")
        }
        
      #   
      # # end BasicGroup
      # 
      # #pass links through
      # #Group::BasicGroup
      # #[]
      # # No need to wrap the contents at all
      #   #
      #   #Content::Passthrough::Attribute
      #   #[["selector", ".mvRegistryLink +  .mvBDAccordionContent a"], ["attribute", "href"], ["regex_capture", ""]]
      #   $("//*[contains(concat(' ', @class, ' '), ' mvRegistryLink ')]/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' mvBDAccordionContent ')]//a") {
      #     attribute("href") {
      #       value() {
      #         rewrite("link")
      #       }
      #     }
      #   }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #menuItemBorders
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", "#bl_nav_top_link_registry"], ["wrapper_class", "mvMenuWrap"], ["sibling_count", "1"]]
      $("//*[@id = 'bl_nav_top_link_registry']") {
        wrap("div") {
          attribute("class", "mvMenuWrap")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", "#mvBDMore"], ["wrapper_class", "mvMenuWrap"], ["sibling_count", "1"]]
      $("//*[@id = 'mvBDMore']") {
        wrap("div") {
          attribute("class", "mvMenuWrap")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", "#mvBDShopAllProducts"], ["wrapper_class", "mvMenuWrap mvShopAllProductsWrap"], ["sibling_count", "1"]]
      $("//*[@id = 'mvBDShopAllProducts']") {
        wrap("div") {
          attribute("class", "mvMenuWrap mvShopAllProductsWrap")
          move_here("(following-sibling::*)[1]", "bottom")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRegistryLinkWrap"], ["selector", ".mvRegistryLink"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvRegistryLink ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvRegistryLinkWrap")
            }
          }
          }
        }
      }
      
      
    # end BasicGroup
    
    #more
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", " <div class=\"mvMenuWrap\" id=\"mvMoreLinkWrap\"><div class=\"mvBloomMenuHeader\" id=\"mvBDMore\">MORE...</div><div class=\"mvBDAccordionContent\" id=\"mvMoreAccordion\"></div></div>"], ["add_after", ".mvRegistryLinkWrap, .bl_nav_top_contain_outer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//div[contains(@class, 'mvRegistryLinkWrap')][1] | //div/div[contains(@class, 'r_nav_top_bag_links')]/..") {
        inject_after(" <div class=\"mvMenuWrap\" id=\"mvMoreLinkWrap\"><div class=\"mvBloomMenuHeader\" id=\"mvBDMore\">MORE...</div><div class=\"mvBDAccordionContent\" id=\"mvMoreAccordion\"></div></div>")
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", "#bot_nav_customerService"], ["to_end_of_me", "#mvMoreAccordion"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//*[@id = 'mvMoreAccordion'])[1]") {
        move_here("(//*[@id = 'bot_nav_customerService'])[1]", "bottom")
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", "#bot_nav_shoppingServices"], ["to_end_of_me", "#mvMoreAccordion"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//*[@id = 'mvMoreAccordion'])[1]") {
        move_here("(//*[@id = 'bot_nav_shoppingServices'])[1]", "bottom")
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", "#bot_nav_orderStatus"], ["to_end_of_me", "#mvMoreAccordion"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//*[@id = 'mvMoreAccordion'])[1]") {
        move_here("(//*[@id = 'bot_nav_orderStatus'])[1]", "bottom")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvMoreLinks"], ["selector", "#mvMoreAccordion div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'mvMoreAccordion']//div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvMoreLinks")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#mvMoreAccordion #bot_nav_shoppingServices"]]
      $("//*[@id = 'mvMoreAccordion']//*[@id = 'bot_nav_shoppingServices']") {
        remove()
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvMoreLinks\" id=\"bot_nav_shoppingServices\"><a class=\"bot_nav_link\" href=\"/about/shopping/index.jsp\">shopping services</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMoreLinks:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMoreLinks ') and position() = 1])[1]") {
        inject_before("<div class=\"mvMoreLinks\" id=\"bot_nav_shoppingServices\"><a class=\"bot_nav_link\" href=\"/about/shopping/index.jsp\">shopping services</a></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvMoreLinks\"><a href=\"/service/credit/index.ognc\">Credit Services</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMoreLinks:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMoreLinks ') and position() = 1])[1]") {
        inject_before("<div class=\"mvMoreLinks\"><a href=\"/service/credit/index.ognc\">Credit Services</a></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvMoreLinks\"><a href=\"http://www1.moov1.bloomingdales.com/catalog/index.ognc?CategoryID=2910&MVwomen=1&MVwomen=1&MVwomen=1&PageID=12500576922458&mvOffers=true\">Offers</a></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMoreLinks:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMoreLinks ') and position() = 1])[1]") {
        inject_before("<div class=\"mvMoreLinks\"><a href=\"http://www1.bloomingdales.com/shop/offers?mvOffers=true\">Offers</a></div>")
      }
      
      
      #change links to text
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "customer service"], ["add_after", "#bot_nav_customerService img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'bot_nav_customerService']//img)[1]") {
          inject_after("customer service")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "shopping services"], ["add_after", "#bot_nav_shoppingServices img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'bot_nav_shoppingServices']//img)[1]") {
          inject_after("shopping services")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "order status"], ["add_after", "#bot_nav_orderStatus img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'bot_nav_orderStatus']//img)[1]") {
          inject_after("order status")
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Formatting::Dynamic::Accordian2
    #  #[["link_selector", ".mvBloomMenuHeader"], ["content_selector", ".mvBDAccordionContent"]]
    #  var("counter", "")
    #  $("//*[contains(concat(' ', @class, ' '), ' mvBDAccordionContent ')]") {
    #    # assign id if it doesn't exist
    #    var("id", fetch("./@id"))
    #    match($id, /^$/) {
    #      attribute("id") {
    #        value() {
    #          set("acc_con")
    #          append($counter)
    #          append("accordian82159")
    #        }
    #      }
    #    }
    #    var("counter") {
    #      append("a")
    #    }
    #    var($counter, fetch("./@id"))
    #    attribute("style") {
    #      value() {
    #        append(";display: none;")
    #      }
    #    }
    #  }
    #  var("counter", "")
    #  $("//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]") {
    #    var("id", fetch("./@id"))
    #    match($id, /^$/) {
    #      attribute("id") {
    #        value() {
    #          set("acc_link")
    #          append($counter)
    #          append("accordian82159")
    #        }
    #      }
    #    }
    #    var("id", fetch("./@id"))
    #    var("counter") {
    #      append("a")
    #    }
    #    attribute("onclick") {
    #      value() {
    #        set("moovweb_toggle_accordian('")
    #        append($id)
    #        append("', '")
    #        append(var($counter))
    #        append("')")
    #      }
    #    }
    #  }
    #  
    #  
    
    
    #
    #Content::Formatting::Dynamic::Accordian4
    #[["link_selector", ".mvBloomMenuHeader"], ["content_selector", ".mvBDAccordionContent"], ["ancestor_selector", ".mvMenuWrap"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("anc_counter", "")
    $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrap ')]") {
      var("anc_counter") {
        append("b")
      }
      var("counter", "")
      var("content_id_string", "[")
      $(".//*[contains(concat(' ', @class, ' '), ' mvBDAccordionContent ')]") {
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
              append("29970")
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
              append("29970")
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
    #Content::Formatting::RemoveElements
    #[["selector", ".mvBDAccordionContent a img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvBDAccordionContent ')]//a//img") {
      remove()
    }
    
    
    #searchBar
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", " <div class=\"mvBDSearchButtonBox\"><div class=\"mvBDSearchButton\" id=\"mvBDSearchButton\" onClick=\"mvVisableSwitch(document.getElementById('mvBDSearchForm'),document.getElementById('mvBDSearchButton'))\"><div id=\"mvSpyGlass\"></div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#keywordSearch"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'keywordSearch'])[1]") {
        inject_before(" <div class=\"mvBDSearchButtonBox\"><div class=\"mvBDSearchButton\" id=\"mvBDSearchButton\" onClick=\"mvVisableSwitch(document.getElementById('mvBDSearchForm'),document.getElementById('mvBDSearchButton'))\"><div id=\"mvSpyGlass\"></div></div></div>")
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "src"], ["selector", "input.bl_nav_top_sub_search_go"]]
      $("//input[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search_go ')]") {
        attribute("src") {
          remove()
        }
      }
      
      
      #
      #Group::IgnoreGroup
      #[]
      # No match necessary - contents will be commented out
      #  #
      #  #Content::Formatting::AddAttribute
      #  #[["attribute", "src"], ["value", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/go.psd"], ["selector", "input.bl_nav_top_sub_search_go"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      #  var("done", "no")
      #  $("//input[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search_go ')]") {
      #    match($done, "no") {
      #        var("done", "yes")
      #      attribute("src") {
      #        value() {
      #            set("http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/go.psd")
      #        }
      #      }
      #    }
      #  }
      #  
      #  
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".bl_nav_top_sub_search"], ["to_beginning_of_me", "#myBagLink"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'myBagLink'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search ')])[1]", "top")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#myBagLink > a  script:first-of-type"]]
      $("//*[@id = 'myBagLink']/a//script[position() = 1]") {
        remove()
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", "#keywordSearch"], ["class_name", ""], ["id", "mvBDSearchForm"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'keywordSearch'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("id", "mvBDSearchForm")
            move_here("//*[@id = 'keywordSearch'][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::InnerRegexReplace
      #[["selector", "#myBagLink > a"], ["regex", "brown"], ["replacement", " "], ["multiple", ""]]
      $("(//*[@id = 'myBagLink']/a)[1]") {
        inner() {
          replace(/brown/, " ")
        }
      }
      
      
      #
      #Group::URLMatcherGroup
      #[["url_matcher", "[a-z]+\\.com\\/?((\\?)|($)|(index.ognc))"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /[a-z]+\.com\/?((\?)|($)|(index.ognc))/) {
      
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvBDSearchToggle"], ["selector", ".mvBDSearchButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvBDSearchButton ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvBDSearchToggle")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "id"], ["value", "mvBDSearchFormToggle"], ["selector", "#mvBDSearchForm"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'mvBDSearchForm']") {
          match($done, "no") {
              var("done", "yes")
            attribute("id") {
              value() {
                  set("mvBDSearchFormToggle")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::Dynamic::Accordian3
        #[["link_selector", ".mvBDSearchToggle"], ["content_selector", "#mvBDSearchFormToggle"], ["open_on_load", "true"], ["hide_with_zero_height", ""]]
        var("counter", "")
        var("content_id_string", "[")
        $("//*[@id = 'mvBDSearchFormToggle']") {
          var("counter") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("acc_con")
                append($counter)
                append("11382")
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
        $("//*[contains(concat(' ', @class, ' '), ' mvBDSearchToggle ')]") {
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
                append("11382")
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
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvBDSearchButton"], ["content_selector", "#mvBDSearchForm"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[@id = 'mvBDSearchForm']") {
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
              append("5485")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvBDSearchButton ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("5485")
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
      #[["attribute", "id"], ["value", "mvSearchField"], ["selector", ".bl_nav_top_sub_search_box"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search_box ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvSearchField")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "placeholder"], ["value", "search"], ["selector", ".bl_nav_top_sub_search_box"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search_box ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("placeholder") {
            value() {
                set("search")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", "#mvSpyGlass"], ["tag_name", ""], ["class_name", "mvSearchButtonWrap"], ["id", ""], ["multiple", ""]]
      $("//*[@id = 'mvSpyGlass']") {
        wrap("div") {
          attribute("class", "mvSearchButtonWrap")
        }
      }
      
      
      #
      #Group::IgnoreGroup
      #[]
      # No match necessary - contents will be commented out
      #  #
      #  #Content::Javascript::AddInlineScriptTag
      #  #[["script", "x$('[name=\"KEYWORD_GO_BUTTON\"]').on('click', function (){asdf = x$('#mvSearchField')[0].value; if(asdf == 'search'){ x$('#mvSearchField')[0].value = ''}})"], ["add_after", ""], ["add_before", ""]]
      #    $("html/body") {
      #      insert_bottom("script") {
      #        attribute("language", "javascript")
      #        inner("x$('[name=\"KEYWORD_GO_BUTTON\"]').on('click', function (){asdf = x$('#mvSearchField')[0].value; if(asdf == 'search'){ x$('#mvSearchField')[0].value = ''}})")
      #      }
      #    }
      #  
      #  
      #  #
      #  #Content::Formatting::AddAttribute
      #  #[["attribute", "value"], ["value", "search"], ["selector", ".bl_nav_top_sub_search_box"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      #  var("done", "no")
      #  $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search_box ')]") {
      #    match($done, "no") {
      #        var("done", "yes")
      #      attribute("value") {
      #        value() {
      #            set("search")
      #        }
      #      }
      #    }
      #  }
      #  
      #  
      #  #
      #  #Content::Formatting::AddAttribute
      #  #[["attribute", "onclick"], ["value", "var searchID = document.getElementById('mvSearchField');  \tsearchID.focus(); \tsearchID.value='';"], ["selector", ".bl_nav_top_sub_search_box"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      #  var("done", "no")
      #  $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search_box ')]") {
      #    match($done, "no") {
      #        var("done", "yes")
      #      attribute("onclick") {
      #        value() {
      #            set("var searchID = document.getElementById('mvSearchField');    searchID.focus();   searchID.value='';")
      #        }
      #      }
      #    }
      #  }
      #  
      #  
      
      
    # end BasicGroup
    
  # end BasicGroup
  
  #Footer
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveWhiteSpace
    #[["selector", ".bl_nav_bot_service_container"]]
    # NOTE: This will remove text elements that are whitespace only, but it will not remove
    # the preceding or following whitespace from elements that have some text
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container ')]/text()[normalize-space(.) = '']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_bot_section_navigation_options, .bl_nav_bot_section_navigation_options_first"]]
    match($status, /^((?!404).)*$/) {
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_section_navigation_options ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_section_navigation_options_first ')]") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_bot_service_like_no_other"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_like_no_other ')]") {
      remove()
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", " <div class=\"mvBDFooterText\"><div><div class=\"mvFooterCustomerServicePhone\"><div id=\"mvPhoneIcon\"></div>Customer Service <a href=\"tel:+1-800-777-0000\">1-800-777-0000</a></div><div>&copy; 2011 Bloomingdale's, Inc.</div></div>"], ["add_after", ".bl_nav_bot_service_container_2"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container_2 ')])[1]") {
      inject_after(" <div class=\"mvBDFooterText\"><div><div class=\"mvFooterCustomerServicePhone\"><div id=\"mvPhoneIcon\"></div>Customer Service <a href=\"tel:+1-800-777-0000\">1-800-777-0000</a></div><div>&copy; 2011 Bloomingdale's, Inc.</div></div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_nav_bot_service_container_2"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container_2 ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".bl_nav_bot_service_container"], ["regex", "Visually impaired customers: "], ["replacement", ""], ["multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container ')])[1]") {
      inner() {
        replace(/Visually impaired customers: /, "")
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div>EMAIL SIGN-UP</div>"], ["add_after", "#bot_nav_email img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bot_nav_email']//img)[1]") {
      inject_after("<div>EMAIL SIGN-UP</div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bot_nav_email img"]]
    $("//*[@id = 'bot_nav_email']//img") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".bl_nav_bot_service_container"], ["tag_name", "span"], ["class_name", ""], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container ')])[1]") {
      wrap_text_children("span")
    }
    
    
    #
    #Content::Inject::InjectDesktopSiteLink
    #[["add_after", ".bl_nav_bot_service_container"]]
    # --- not found ---
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".desktop_site"], ["html", "Full Site"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' desktop_site ')]") {
      inner("Full Site")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".bl_nav_bot_service_container a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container ')]//a") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvRemoveMe")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "footer_link"], ["selector", "//div[@class = 'bl_nav_bot_service_container']/a[contains(text(), 'Privacy Policy')]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//div[@class = 'bl_nav_bot_service_container']/a[contains(text(), 'Privacy Policy')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("footer_link")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #JS
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #auto scroll url bar off screen
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", "#bl_nav_account_flag script"], ["regex", "href=\"https:\\/\\/www.bloomingdales.com\\/"], ["replacement", "href=\""], ["multiple", "true"]]
    $("//*[@id = 'bl_nav_account_flag']//script") {
      text() {
        replace(/href=\"https:\/\/www.bloomingdales.com\//, "href=\"")
      }
    }
    
    
  # end BasicGroup
  
  #pass through popups
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "credit\\/index"], ["negate", "true"]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, not(/credit\/index/)) {
    }
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".bl_main, .ch_main, bl_nav_side_no_padding"], ["before_me", ".bl_nav_top_contain_outer"], ["map_moves", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]", "before")
  }
  
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", ".bl_nav_side_no_padding"], ["to_beginning_of_me", ".bl_nav_top_contain_outer"], ["map_multiple", ""], ["ancestor_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')])[1]", "top")
  }
  
  
  #
  #Content::Formatting::MoveUp
  #[["move_me", "#myBagLink"]]
  $("//*[@id = 'myBagLink']") {
    move_to("..", "before")
  }
  
  
  #
  #Content::Formatting::WrapElement
  #[["selector", "#r_nav_top_logo, .bl_nav_top_logo"], ["class_name", "mvHeaderWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
  var("found", "false")
  match($found, "false") {
    $("(//*[@id = 'r_nav_top_logo'])[1]") {
      var("found", "true")
      insert_before("div") {
        attribute("the_wrapper", "true")
        attribute("class", "mvHeaderWrapper")
        move_here("//*[@id = 'r_nav_top_logo'][not (@the_wrapper)]", "bottom")
        move_here("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_logo ')][not (@the_wrapper)]", "bottom")
        move_here("./../div[@id='myBagLink']")
        attribute("the_wrapper") {
          remove()
        }
      }
    }
  }
  match($found, "false") {
    $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_logo ')])[1]") {
      var("found", "true")
      insert_before("div") {
        attribute("the_wrapper", "true")
        attribute("class", "mvHeaderWrapper")
        move_here("//*[@id = 'r_nav_top_logo'][not (@the_wrapper)]", "bottom")
        move_here("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_logo ')][not (@the_wrapper)]", "bottom")
        move_here("./../div[@id='myBagLink']")
        attribute("the_wrapper") {
          remove()
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", ".bl_nav_top_sub_search + div"], ["new_tag_name", "a"], ["class_name", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_sub_search ')]/following-sibling::*[1]/self::div") {
    name("a")
  }
  
  
  #
  #Content::Formatting::WrapWithNextSibling
  #[["selector", "#myBagLink"], ["wrapper_class", "mvBDHeader"], ["sibling_count", "1"]]
  $("//*[@id = 'myBagLink']") {
    wrap("div") {
      attribute("class", "mvBDHeader")
      move_here("(following-sibling::*)[1]", "bottom")
    }
  }
  
  
  #remove All designers index pages
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "a[href*=\"Action=designer\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[contains(@href, \"Action=designer\")]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvRemoveMe")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//li/a[contains(@href, \"Action=designer\")]/.."]]
    $("//li/a[contains(@href, \"Action=designer\")]/..") {
      remove()
    }
    
    
  # end BasicGroup
  
  #site menu
  #Group::URLMatcherGroup
  #[["url_matcher", "[a-z]+\\.com\\/?((\\?)|($)|(index.ognc))|(checkoutswf)"], ["negate", "true"]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, not(/[a-z]+\.com\/?((\?)|($)|(index.ognc))|(checkoutswf)/)) {
  
    #site menu
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvBloomMenuHeader\" id=\"mvBDSiteMenuHeader\"><div class=\"mvSiteMenuTitle\"></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_nav_top_contain_outer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')])[1]") {
        inject_before("<div class=\"mvBloomMenuHeader\" id=\"mvBDSiteMenuHeader\"><div class=\"mvSiteMenuTitle to_be_sprited-sitemenu\"></div></div>")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", "#mvBDSiteMenuHeader"], ["content_selector", "#mvBDSiteMenuHeader + .bl_nav_top_contain_outer"], ["ancestor_selector", "#bl_nav_top_container_tiles"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[@id = 'bl_nav_top_container_tiles']") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[@id = 'mvBDSiteMenuHeader']/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]") {
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
                append("63245")
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
        $(".//*[@id = 'mvBDSiteMenuHeader']") {
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
                append("63245")
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
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", "#mvBDSiteMenuHeader"], ["content_selector", "#mvBDSiteMenuHeader + .bl_nav_top_contain_outer"], ["ancestor_selector", "#r_nav_top_container"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[@id = 'r_nav_top_container']") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[@id = 'mvBDSiteMenuHeader']/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]") {
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
                append("65043")
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
        $(".//*[@id = 'mvBDSiteMenuHeader']") {
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
                append("65043")
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
      #Group::IgnoreGroup
      #[]
      # No match necessary - contents will be commented out
      #  #
      #  #Content::Formatting::Dynamic::Accordian2
      #  #[["link_selector", "#mvBDSiteMenuHeader"], ["content_selector", "#mvBDSiteMenuHeader + .bl_nav_top_contain_outer"]]
      #  var("counter", "")
      #  $("//*[@id = 'mvBDSiteMenuHeader']/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')]") {
      #    # assign id if it doesn't exist
      #    var("id", fetch("./@id"))
      #    match($id, /^$/) {
      #      attribute("id") {
      #        value() {
      #          set("acc_con")
      #          append($counter)
      #          append("accordian22390")
      #        }
      #      }
      #    }
      #    var("counter") {
      #      append("a")
      #    }
      #    var($counter, fetch("./@id"))
      #    attribute("style") {
      #      value() {
      #        append(";display: none;")
      #      }
      #    }
      #  }
      #  var("counter", "")
      #  $("//*[@id = 'mvBDSiteMenuHeader']") {
      #    var("id", fetch("./@id"))
      #    match($id, /^$/) {
      #      attribute("id") {
      #        value() {
      #          set("acc_link")
      #          append($counter)
      #          append("accordian22390")
      #        }
      #      }
      #    }
      #    var("id", fetch("./@id"))
      #    var("counter") {
      #      append("a")
      #    }
      #    attribute("onclick") {
      #      value() {
      #        set("moovweb_toggle_accordian('")
      #        append($id)
      #        append("', '")
      #        append(var($counter))
      #        append("')")
      #      }
      #    }
      #  }
      #  
      #  
      
      
    # end BasicGroup
    
  }
  
  #The Registry
  #Group::URLMatcherGroup
  #[["url_matcher", "registry"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registry/) {
  
    #
    #Content::Passthrough::ReversePassthroughAttribute
    #[["selector", "img"], ["attribute", "src"], ["regex_capture", ""]]
    # WARNING: NOT IMPLEMENTED YET
    # To implement this we need the reverse rewrite function - rewrite("host")
    # This is not trivial because the host rewrite is different - it is an array
    # of regular expressions, not just one
    #
    #
    #$("//img") {
    #  attribute("src") {
    #    value() {
    #      rewrite("host")
    #    }
    #  }
    #}
    # 
    #
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#r_nav_top_logo"], ["class_name", "mvRHeaderWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'r_nav_top_logo'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvRHeaderWrapper")
          move_here("//*[@id = 'r_nav_top_logo'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#myBagLink"], ["before_me", "#r_nav_top_logo"], ["map_moves", ""]]
    $("(//*[@id = 'r_nav_top_logo'])[1]") {
      move_here("(//*[@id = 'myBagLink'])[1]", "before")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".r_nav_top_section_navigation_options:nth-of-type(6) "]]
    $("//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options ') and position() = 6]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bl_nav_top_links ul"]]
    $("//*[@id = 'bl_nav_top_links']//ul") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".r_bl_nav_top_banner"]]
    $("//*[contains(concat(' ', @class, ' '), ' r_bl_nav_top_banner ')]") {
      remove()
    }
    
    
    #shop all product
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerText
      #[["selector", "#bl_nav_top_menu .r_nav_top_section_navigation_options:nth-of-type(1) a"], ["text", "dining"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options ') and position() = 1]//a") {
        inner() {
          set("dining")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", "#bl_nav_top_menu .r_nav_top_section_navigation_options:nth-of-type(2) a"], ["text", "kitchen"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options ') and position() = 2]//a") {
        inner() {
          set("kitchen")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", "#bl_nav_top_menu .r_nav_top_section_navigation_options:nth-of-type(3) a"], ["text", "bed & bath"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options ') and position() = 3]//a") {
        inner() {
          set("bed & bath")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", "#bl_nav_top_menu .r_nav_top_section_navigation_options:nth-of-type(4) a"], ["text", "home decor"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options ') and position() = 4]//a") {
        inner() {
          set("home decor")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", "#bl_nav_top_menu .r_nav_top_section_navigation_options:nth-of-type(5) a"], ["text", "luggage"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options ') and position() = 5]//a") {
        inner() {
          set("luggage")
        }
      }
      

      $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options_sale ')]//a") {
        inner() {
          set("sale")
        }
      }

      $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options ') ]//a[contains(@href,'events_and_stores')]") {
         $("..") {
          remove()
         }
      }
      
      # #
      # #Content::Formatting::SetInnerText
      # #[["selector", "#bl_nav_top_menu .r_nav_top_section_navigation_options_last a"], ["text", "why register?"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # # NOTE: not sure if /html() or /text() is what I want to be using here
      # $("//*[@id = 'bl_nav_top_menu']//*[contains(concat(' ', @class, ' '), ' r_nav_top_section_navigation_options_last ')]//a") {
      #   inner() {
      #     set("events & stores")
      #   }
      # }
      # 
      
    # end BasicGroup
    
    #
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/registryeditaccount"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/registryeditaccount/) {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvStoreAndEventsWrap\"><div class=\"mvBloomMenuHeader\">Stores &amp; events</div><div class=\"mvBDAccordionContent\"> <form action=\"/store/index.ognc\" method=\"get\" name=\"dds\"> \t<div class=\"store_location_form\"> \t\t<input type=\"HIDDEN\" name=\"action\" value=\"STORE_DETAIL\"> \t\t<input type=\"hidden\" name=\"lstRegion\" value=\"all\"> \t\t\t<select style=\"width:255px\" onchange=\"this.form.submit();\" name=\"storeId\" id=\"storeId\"> \t\t\t\t<option value=\"\">Choose a Store</option> \t\t\t\t<option value=\"50014\">CA:Stanford</option> \t\t\t\t<option value=\"50015\">CA:Century City</option> \t\t\t\t<option value=\"50016\">CA:Beverly Center</option> \t\t\t\t<option value=\"50017\">CA:Sherman Oaks Fashion Square</option> \t\t\t\t<option value=\"50018\">CA:Newport Fashion Island</option> \t\t\t\t<option value=\"110039\">CA:San Francisco Centre</option> \t\t\t\t<option value=\"110042\">CA:Fashion Valley, San Diego</option> \t\t\t\t<option value=\"110048\">CA:South Coast Plaza</option> \t\t\t\t<option value=\"110056\">CA:Santa Monica Place</option> \t\t\t\t<option value=\"50007\">FL:Boca Raton Town Center</option> \t\t\t\t<option value=\"50008\">FL:Aventura</option> \t\t\t\t<option value=\"50009\">FL:The Falls, Miami</option> \t\t\t\t<option value=\"50010\">FL:Palm Beach Gardens</option> \t\t\t\t<option value=\"60001\">FL:Orlando, The Mall at Millenia</option> \t\t\t\t<option value=\"110059\">FL:Dolphin Mall Outlet</option> \t\t\t\t<option value=\"110061\">FL:Sawgrass Mills Outlet</option> \t\t\t\t<option value=\"110005\">GA:Perimeter Mall, Atlanta</option> \t\t\t\t<option value=\"110006\">GA:Lenox Square</option> \t\t\t\t<option value=\"50011\">IL:North Michigan Avenue</option> \t\t\t\t<option value=\"50012\">IL:Old Orchard</option> \t\t\t\t<option value=\"70001\">IL:Medinah Home, Chicago</option> \t\t\t\t<option value=\"110004\">IL:Oakbrook Center Home</option> \t\t\t\t<option value=\"50005\">MD:White Flint</option> \t\t\t\t<option value=\"110049\">MD:Wisconsin Place, Chevy Chase</option> \t\t\t\t<option value=\"50003\">MA:Chestnut Hill</option> \t\t\t\t<option value=\"50013\">MN:Mall of America</option> \t\t\t\t<option value=\"60002\">NV:Las Vegas Fashion Show Home</option> \t\t\t\t<option value=\"4\">NJ:Bridgewater Commons</option> \t\t\t\t<option value=\"10001\">NJ:Bergen Shops at Riverside</option> \t\t\t\t<option value=\"10002\">NJ:Short Hills</option> \t\t\t\t<option value=\"40001\">NJ:Willowbrook</option> \t\t\t\t<option value=\"110058\">NJ:Bergen Town Center Outlet</option> \t\t\t\t<option value=\"40002\">NY:59th Street</option> \t\t\t\t<option value=\"50001\">NY:White Plains</option> \t\t\t\t<option value=\"50002\">NY:Roosevelt Field</option> \t\t\t\t<option value=\"50019\">NY:Huntington Walt Whitman</option> \t\t\t\t<option value=\"110035\">NY:SoHo</option> \t\t\t\t<option value=\"110036\">NY:Roosevelt Field Furniture</option> \t\t\t\t<option value=\"110050\">NY:Westchester Furniture Clearance</option> \t\t\t\t<option value=\"20001\">PA:King of Prussia (The Court)</option> \t\t\t\t<option value=\"50004\">PA:Willow Grove Park</option> \t\t\t\t<option value=\"50006\">VA:Tysons Corner Center</option> \t\t\t\t<option value=\"110057\">VA:Potomac Mills Outlet</option> \t\t\t\t<option value=\"110052\">UAE:The Dubai Mall</option> \t\t\t</select> \t</div> </form> </div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".r_nav_top_bag_links"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' r_nav_top_bag_links ')])[1]") {
        inject_before("<div class=\"mvStoreAndEventsWrap\"><div class=\"mvBloomMenuHeader\">Stores &amp; events</div><div class=\"mvBDAccordionContent\"> <form action=\"/store/index.ognc\" method=\"get\" name=\"dds\">   <div class=\"store_location_form\">     <input type=\"HIDDEN\" name=\"action\" value=\"STORE_DETAIL\">    <input type=\"hidden\" name=\"lstRegion\" value=\"all\">      <select style=\"width:255px\" onchange=\"if(x$('#storeId')[0].selectedIndex!=0){this.form.submit();}\" name=\"storeId\" id=\"storeId\">         <option value=\"\">Choose a Store</option>        <option value=\"50014\">CA:Stanford</option>        <option value=\"50015\">CA:Century City</option>        <option value=\"50016\">CA:Beverly Center</option>        <option value=\"50017\">CA:Sherman Oaks Fashion Square</option>         <option value=\"50018\">CA:Newport Fashion Island</option>        <option value=\"110039\">CA:San Francisco Centre</option>         <option value=\"110042\">CA:Fashion Valley, San Diego</option>        <option value=\"110048\">CA:South Coast Plaza</option>        <option value=\"110056\">CA:Santa Monica Place</option>         <option value=\"50007\">FL:Boca Raton Town Center</option>        <option value=\"50008\">FL:Aventura</option>        <option value=\"50009\">FL:The Falls, Miami</option>        <option value=\"50010\">FL:Palm Beach Gardens</option>        <option value=\"60001\">FL:Orlando, The Mall at Millenia</option>         <option value=\"110059\">FL:Dolphin Mall Outlet</option>        <option value=\"110061\">FL:Sawgrass Mills Outlet</option>        <option value=\"110005\">GA:Perimeter Mall, Atlanta</option>        <option value=\"110006\">GA:Lenox Square</option>         <option value=\"50011\">IL:North Michigan Avenue</option>         <option value=\"50012\">IL:Old Orchard</option>         <option value=\"70001\">IL:Medinah Home, Chicago</option>         <option value=\"110004\">IL:Oakbrook Center Home</option>         <option value=\"50005\">MD:White Flint</option>         <option value=\"110049\">MD:Wisconsin Place, Chevy Chase</option>         <option value=\"50003\">MA:Chestnut Hill</option>         <option value=\"50013\">MN:Mall of America</option>         <option value=\"60002\">NV:Las Vegas Fashion Show Home</option>         <option value=\"4\">NJ:Bridgewater Commons</option>         <option value=\"10001\">NJ:Bergen Shops at Riverside</option>         <option value=\"10002\">NJ:Short Hills</option>         <option value=\"40001\">NJ:Willowbrook</option>         <option value=\"110058\">NJ:Bergen Town Center Outlet</option>        <option value=\"40002\">NY:59th Street</option>         <option value=\"50001\">NY:White Plains</option>        <option value=\"50002\">NY:Roosevelt Field</option>         <option value=\"50019\">NY:Huntington Walt Whitman</option>         <option value=\"110035\">NY:SoHo</option>         <option value=\"110036\">NY:Roosevelt Field Furniture</option>        <option value=\"110050\">NY:Westchester Furniture Clearance</option>        <option value=\"20001\">PA:King of Prussia (The Court)</option>         <option value=\"50004\">PA:Willow Grove Park</option>         <option value=\"50006\">VA:Tysons Corner Center</option>        <option value=\"110057\">VA:Potomac Mills Outlet</option>         <option value=\"110052\">UAE:The Dubai Mall</option>      </select>   </div> </form> </div></div>")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian2
      #[["link_selector", ".mvStoreAndEventsWrap .mvBloomMenuHeader"], ["content_selector", ".mvStoreAndEventsWrap .mvBDAccordionContent"]]
      var("counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvStoreAndEventsWrap ')]//*[contains(concat(' ', @class, ' '), ' mvBDAccordionContent ')]") {
        # assign id if it doesn't exist
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_con")
              append($counter)
              append("accordian34879")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvStoreAndEventsWrap ')]//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("accordian34879")
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
      
      
    }
    
    #Registry bloomiesLink
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvBloomMenuHeader\" id=\"mvBDBloomiesLink\"><a href=\"http://www1.bloomingdales.com/index.ognc\" class=\"mvBloomiesLink\"><img src=\"http://assets.bloomingdales.com/img/nav/r09/topnav/l_mainLogo.gif\"></a></div>"], ["add_after", ".r_nav_top_bag_links"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' r_nav_top_bag_links ')])[1]") {
        inject_after("<div class=\"mvBloomMenuHeader\" id=\"mvBDBloomiesLink\"><a href=\"http://www1.bloomingdales.com/index.ognc\" class=\"mvBloomiesLink\"><img src=\"http://assets.bloomingdales.com/img/nav/r09/topnav/l_mainLogo.gif\"></a></div>")
      }
      
      
      #
      #Content::Passthrough::Attribute
      # #[["selector", ".mvBloomiesLink"], ["attribute", "href"], ["regex_capture", ""]]
      # $("//*[contains(concat(' ', @class, ' '), ' mvBloomiesLink ')]") {
      #   attribute("href") {
      #     value() {
      #       rewrite("link")
      #     }
      #   }
      # }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "#mvMoreLinkWrap"], ["after_me", "#mvBDBloomiesLink"], ["map_multiple", ""]]
    $("(//*[@id = 'mvBDBloomiesLink'])[1]") {
      move_here("(//*[@id = 'mvMoreLinkWrap'])[1]", "after")
    }
    
    
  }
  
  #breadCrumb Query Parameters
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    ##bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
    #Content::Link::AddQueryParameter
    #[["selector", "#bl_nav_top_menu a[href*=\"CategoryID=2910\"], #breadcrumbs > h2:first-of-type a[href*=\"CategoryID=2910\"]"], ["parameter_name", "MVwomen"], ["parameter_value", "1"]]
    $("//*[@id = 'bl_nav_top_menu']//a[contains(@href, \"CategoryID=2910\") or contains(@href, \"id=2910\")]") {
      attribute("href") {
        value() {
          append("?MVwomen=1")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    
    #
    ##bl_nav_top_menu a[href*="CategoryID=2910"], #breadcrumbs > h2:first-of-type a[href*="CategoryID=2910"]
    #Content::Link::AddQueryParameter
    #[["selector", "#bl_nav_top_menu a[href*=\"CategoryID=2910\"], #breadcrumbs > h2:first-of-type a[href*=\"CategoryID=2910\"]"], ["parameter_name", "MVwomen"], ["parameter_value", "1"]]
    $("//*[@id = 'bl_nav_top_menu']//a[contains(@href, \"CategoryID=2910\") or contains(@href, \"id=2910\")]") {
      attribute("href") {
        value() {
          append("?MVwomen=1")
          # change the last question mark into an ampersand for valid query parameters
          replace(/(\?.+)\?/, "\\1&")
        }
      }
    }
    
    
  # end BasicGroup
  
  #APP Changes
  #Group::CookieMatcherGroup
  #[["cookie_name", "ishop_app"], ["cookie_value_regex", ""], ["no_cookie_counts", ""], ["any", "true"]]
    # WARNING: any is not supported
  var("run_group", "false")
      # match if the cookie is found
      match($cookie, /ishop_app/) {
        var("run_group", "true")
      }
  match($run_group, "true") {
    $("/html/body"){
      add_class("mw_ishop_app")
    }
    #removeHeader & Footer for app
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvAPPREMOVE"], ["selector", "#mvBDSiteMenuHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'mvBDSiteMenuHeader']") {
        add_class("mvAPPREMOVE")
        $("//div[@id='bl_nav_account_flag']"){
          move_to("//div[@id='mvBDSiteMenuHeader']", "after")
          add_class("mw_account_group")
        }
      }

      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvAPPREMOVE"], ["selector", "#breadcrumbs"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'breadcrumbs']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvAPPREMOVE")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvAPPREMOVE"], ["selector", ".bl_breadcrumb_object"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvAPPREMOVE")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvAPPREMOVE"], ["selector", "#iShip_bcContainer"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'iShip_bcContainer']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvAPPREMOVE")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".bl_nav_top_logo"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_top_logo ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#myBagLink"]]
      $("//*[@id = 'myBagLink']") {
        remove()
      }
      
      
      #
      #app=true
      #Content::Formatting::RemoveElements
      #[["selector", ".mvBDFooterText"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvBDFooterText ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".bl_nav_bot_service_container"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_service_container ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".desktop_site"]]
      $("//*[contains(concat(' ', @class, ' '), ' desktop_site ')]") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".moovweb_footer"]]
      $("//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #remove landing page items
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all# end BasicGroup
    
    #app metatags
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #My Orders
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/service\\/order\\/index.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/service\/order\/index.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"My Orders\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"My Orders\">")
        }
        
        
      }
      
      #Bill Pay
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/service\\/credit\\/paybill\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/service\/credit\/paybill\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Bill Pay\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Bill Pay\">")
        }
        
        
      }
      
      #Gift Cards
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/gifts-gift-cards\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/gifts-gift-cards\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Gift Cards\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Gift Cards\">")
        }
        
        
      }
      
      #Star Rewards
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registry\\/wedding\\/registryrshome"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registry\/wedding\/registryrshome/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Star Rewards\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Star Rewards\">")
        }
        
        
      }
      
      #Registry Help
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registry\\/wedding\\/registryfaq"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registry\/wedding\/registryfaq/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Registry Help\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Registry Help\">")
        }
        
        
      }
      
      #Categories
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/registry\\/wedding\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/registry\/wedding\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Categories\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Categories\">")
        }
        
        
      }
      
      #Create Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/wedding\\/registrycreateaccount"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/wedding\/registrycreateaccount/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Create Registry\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Create Registry\">")
        }
        
        
      }
      
      #Manage Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/wedding\\/registrymanager"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/wedding\/registrymanager/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Manage Registry\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Manage Registry\">")
        }
        
        
      }
      
      #Registry Search
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registrysearch"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registrysearch/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Find Registry\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Find Registry\">")
        }
        
        
      }
      
      #Search
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/search\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/search\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Search\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Search\">")
        }
        
        
      }
      
      #Store Events
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/store\\/event\\/index.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/store\/event\/index.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Store Events\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Store Events\">")
        }
        
        
      }
      
      #Store Locator
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/store\\/index.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/store\/index.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Store Locator\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Store Locator\">")
        }
        
        
      }
      
      #Checkout
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/checkoutswf"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/checkoutswf/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Checkout\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Checkout\">")
        }
        
        
      }
      
      #Wedding Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registry\\/wedding"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registry\/wedding/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Wedding Registry\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Wedding Registry\">")
        }
        
        
      }
      
      #My Account
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/myinfo"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/myinfo/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"My Account\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"My Account\">")
        }
        
        
      }
      
      #Signin
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/signin"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/signin/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Sign In\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Sign In\">")
        }
        
        
      }
      
      #Shopping Bag
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/bag\\/index\\.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/bag\/index\.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Shopping Bag\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Shopping Bag\">")
        }
        
        
      }
      
      #products-bag
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/bag\\/addto\\.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/bag\/addto\.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Products\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Products\">")
        }
        
        
      }
      
      #Products-catalog
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/catalog\\/product\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/catalog\/product\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Products\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Products\">")
        }
        
        
      }
      
      #categories
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Categories\">"], ["add_after", "head meta:first-of-type"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head//meta[position() = 1])[1]") {
          inject_after("<meta ishop_app_back=\"Categories\">")
        }
        
        
      }
      
    # end BasicGroup
    
  }
  
  #REMOVE FLASH
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #flash exceptions
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveFlashObject"], ["selector", "#BC_Content_gno"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'BC_Content_gno']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvRemoveFlashObject")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", "param[name=\"@videoPlayer\"]"], ["tag_name", ""], ["class_name", "mvRemoveFlashObject"], ["id", ""], ["multiple", ""]]
    $("//param[@name = \"@videoPlayer\"]") {
      wrap("div") {
        attribute("class", "mvRemoveFlashObject")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvRemoveFlashObject"], ["html", "<div class=\"mvRemoveMe\">flash has been removed from the mobile site.</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveFlashObject ')]") {
      inner("<div class=\"mvRemoveMe\">flash has been removed from the mobile site.</div>")
    }
    
    
  # end BasicGroup
  
  #email and social bar
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    #[["html", " <div class=\"mvBDSocialFB\"><a href=\"http://www.facebook.com/Bloomingdales\"><div id=\"mvBDFBIcon\"></div><span>Like Us</span></a></div><div class=\"mvBDSocial\"><a href=\"http://mobile.twitter.com/Bloomingdales\"><div id=\"mvBDTWIcon\"></div><span>Follow Us</span></a></div>"], ["add_after", "#bot_nav_email"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bot_nav_email'])[1]") {
      inject_after(" <div class=\"mvBDSocialFB\"><a href=\"http://www.facebook.com/Bloomingdales\" target=\"_blank\"><div id=\"mvBDFBIcon\"></div><span>Like Us</span></a></div><div class=\"mvBDSocial\"><a href=\"http://mobile.twitter.com/Bloomingdales\" target=\"_blank\"><div id=\"mvBDTWIcon\"></div><span>Follow Us</span></a></div>")
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".bl_nav_bot_container"], ["tag_name", "div"], ["class_name", "mvLandingFooter"], ["id", ""], ["multiple", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_bot_container ')]") {
      wrap("div") {
        attribute("class", "mvLandingFooter")
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveToEndOf
  #[["move_me", ".mvLandingFooter"], ["to_end_of_me", ".bl_nav_top_contain_outer"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mvLandingFooter ')])[1]", "bottom")
  }
  
  
  #Ant Blocks
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", "#bl_nav_account_flag > script"], ["regex", "(document.write\\('<'\\s*\\+\\s*'a\\s*href\\s*=\")"], ["replacement", "document.write('<' + 'a class=\"mw_auth_links\" href=\"//' + window.location.host + '/"], ["multiple", "true"]]
    $("//*[@id = 'bl_nav_account_flag']/script") {
      text() {
        replace(/(document.write\('<'\s*\+\s*'a\s*href\s*=\")/, "document.write('<' + 'a class=\"mw_auth_links\" href=\"//' + window.location.host + '/")
      }
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".r_nav_top_bag_links > script"], ["regex", "https:\\/\\/www.bloomingdales\\.com\\/(signin|\\/signin)"], ["replacement", "/signin"], ["multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' r_nav_top_bag_links ')]/script)[1]") {
      inner() {
        replace(/https:\/\/www.bloomingdales\.com\/(signin|\/signin)/, "/signin")
      }
    }
    
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Javascript::AddScriptTag
    #  #[["javascript_path", "http://dl.dropbox.com/u/10250170/projects/bloomingdales/utils.js"], ["add_after", ""]]
    #  $("//html/head") {
    #    insert_bottom("script") {
    #      attribute("src", "http://dl.dropbox.com/u/10250170/projects/bloomingdales/utils.js")
    #      attribute("language", "javascript")
    #    }
    #  }
    #  
    #  
    #  #
    #  #Content::Formatting::AddAttribute
    #  #[["attribute", "id"], ["value", "mw_my_account_link"], ["selector", "//a[@class=\"top_nav_link\" and contains(text(), \"MY ACCOUNT\")]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    #  var("done", "no")
    #  $("//a[@class=\"top_nav_link\" and contains(text(), \"MY ACCOUNT\")]") {
    #    match($done, "no") {
    #        var("done", "yes")
    #      attribute("id") {
    #        value() {
    #            set("mw_my_account_link")
    #        }
    #      }
    #    }
    #  }
    #  
    #  
    #  #
    #  #Content::Formatting::InnerRegexReplace
    #  #[["selector", "#bl_nav_account_flag > script"], ["regex", "(document.write\\('<'\\s*\\+\\s*'a\\s*href\\s*=\")"], ["replacement", "document.write('<' + 'a href=\"//' + window.location.host.substring(window.location.host.indexOf(\".\")+1) + '/"], ["multiple", "true"]]
    #  $("//*[@id = 'bl_nav_account_flag']/script") {
    #    inner() {
    #      replace(/(document.write\('<'\s*\+\s*'a\s*href\s*=\")/, "document.write('<' + 'a href=\"//' + window.location.host.substring(window.location.host.indexOf(\".\")+1) + '/")
    #    }
    #  }
    #  
    #  
    #  #
    #  #Content::Formatting::SetAttribute
    #  #[["selector", "//a[@class=\"top_nav_link\" and contains(text(), \"MY ACCOUNT\")]"], ["attribute_name", "href"], ["match", "www."], ["replace", ""]]
    #  $("//a[@class=\"top_nav_link\" and contains(text(), \"MY ACCOUNT\")]") {
    #    attribute("href") {
    #      value() {
    #        replace("www.", "")
    #      }
    #    }
    #  }
    #  
    # 
    
    $("//a[@id = 'mvBDBagLinkHREF']") {
      insert_bottom("script") {
        attribute("language", "javascript")
        inner("thisUser.writeCartItems();")
      }
    }
    
    #fix sign in
    $(".//div[@id='bl_nav_account_flag']/script"){
      text(){
        replace(/(\/http.+?\.com)/, ""){
          $1{
            set("")
          }
        }
      }
    }
    
    $("//html/body/div[@id='bl_main_container']/div[contains(@class,'bl_nav_bot_service_container')]"){  
      inject_bottom("<div id='mw_footer'></div>")
      #end BasicGroup
      $("div[@id='mw_footer']") {
        inject_bottom("<div id= 'mw_desktop_site_container'><a id='mw_desktop_link' class='desktop_site' href='#'>Full Site</a></div>")
        #inject_bottom("<div id = 'mw_siteby'><p>Mobile site by </p><a id='mwLink' class = 'icons-mw-logo' href=''></a></div>")
      }
      insert_bottom("div") {
        log("--> Adding in the Hidden Desktop Div")
        attribute("id", "mw_desktop_link_config")
        attribute("matcher", $rewrite_incoming_matcher)
        attribute("replacement", $rewrite_incoming_replacement)
        attribute("rewriter_json", $rewrite_incoming_json)
        attribute("cookie_hours", "24")
      }
    }
    
    $("//div[@id='r_nav_top_logo']/a/img"){
      remove()
    }
    # # wrap brown bag number so id dosnt duplicate.
    # $("//body//div[@id='myBagLink']//script[contains(text(), 'thisUser.writeCartItems();')]"){
    #   wrap("div", id: "brownBagItemsTotal")
    # }
    
    #add the bag: text and items number to new brown bag.
    $("//span[@id=' BagItemsTotal']"){
      $("./../text()[1]"){
        text(){
          set("BAG: ")
        }
      }
      insert_bottom("script", "thisUser.writeCartItems();")
    }

$("/html/body//div[@class='bl_nav_top_sub_search']") {
  move_to("../..","bottom")
}
$("/html/body//div[@class='bl_nav_top_sub_search_go']") {
  move_to("./../div[contains(@class,'bl_nav_top_sub_search_input')]", "position")
  dump()
  $("./input"){
    attribute("value", " ")
    attribute("type", "submit")
  }
}



# add query parameter to registry bread crumbs so that the splash image will display on the appropriate page.
$("//div[@id = 'iShip_bcContainer']//a | //div[@id = 'breadcrumbs']//a"){
  $href = fetch("@href")
  log($href)
  $href{
    replace(/categoryid=(\d+?)((\&)|($))/i){
     $temp = $1
    }
  }
  log($temp)
  match($temp){
    with(/8237/){
      log("dining")
      $href{
        append("&MVdining=1")
      }
    }
    with(/8147/){
      log("kitchen")
      $href{
        append("&MVkitchen=1")
      }
    }
    with(/8203/){
      log("bed & bath")
      $href{
        append("&MVbedAndBath=1")
      }
    }
    with(/6455/){
      log("home decor")
      $href{
        append("&MVhomeDecor=1")
      }
    }
    with(/4282/){
      log("luggage")
      $href{
        append("&MVluggage=1")
        log("\n\n\n")
        log(dump())
      }
    }
  }

  $("@href"){
    inner(){
      set($href)
    }
  }
}

# # brownbag -- Kenny
# false means turn on brownbag overlay
# true means turn off brownbag overlay
$disable_quickbag = "true"

$header_selector = "mvBDHeader"
$(".//div[@class='mvRHeaderWrapper']") {
  $header_selector = "mvRHeaderWrapper"
}

match($header_selector) {
  with(/mvRHeaderWrapper/) {
    $(".//div[@class='mvRHeaderWrapper']") {
      move_here("//div[@id='qb_headerItemContainer']", "bottom")
      insert_top("div", class: "mw_bag_status") {
        move_here("../div[@id='myBagLink']", "bottom")
        match($disable_quickbag) {
          with(/false/) {
            $("../div[@id='qb_headerItemContainer']/../div[@class='mw_bag_status']/div[@id='myBagLink']/a") {
              name("div")
            }
          }
        }
        $("./*[@id='qb_addToBagOverlayLabel']") {
          attribute("href") {
            value() {
              rewrite("link")
            }
          }
        }
        $("./div[@id='myBagLink']/div") {
          attribute("onclick", "moovweb_toggle_close_accordian('mvBDSearchButton', ['mvBDSearchFormToggle', 'mvBDSearchForm'], 'mw_accordian_hide')")
        }
        $("./div[@id='myBagLink']") {
          add_class("mw_myBagLink")
          match($disable_quickbag) {
            with(/false/) {
              attribute("data-ur-toggler-component", "content")
              insert_after("div", class: 'mw_myBagLink mw_myBagLink_2') {
                attribute("data-ur-toggler-component", "content")
                insert_bottom("div", id: 'mw_close_button') {
                  inner("x CLOSE")
                }
              }
            }
          }
        }
        attribute("data-ur-toggler-component", "button")
        $("..") {
          attribute("data-ur-set", "toggler")
        }
      }
      $("./div[@id='qb_headerItemContainer']") {
        move_here("./div[@class='bl_nav_top_sub_search']/div[@id='mvBDSearchFormToggle']", "before")    
      }

    }
    
  }
  else() {
    $(".//div[@class='mvBDHeader']") {
      move_here("//div[@id='qb_headerItemContainer']", "bottom")
      insert_top("div", class: "mw_bag_status") {
        move_here("../div[@id='myBagLink']", "bottom")
        match($disable_quickbag) {
          with(/false/) {
            $("../div[@id='qb_headerItemContainer']/../div[@class='mw_bag_status']/div[@id='myBagLink']/a") {
              name("div")
            }
          }
        }
        $("./*[@id='qb_addToBagOverlayLabel']") {
          attribute("href") {
            value() {
              rewrite("link")
            }
          }
        }
        $("./div[@id='myBagLink']/div") {
          attribute("onclick", "moovweb_toggle_close_accordian('mvBDSearchButton', ['mvBDSearchFormToggle', 'mvBDSearchForm'], 'mw_accordian_hide')")
        }
        $("./div[@id='myBagLink']") {
          add_class("mw_myBagLink")
          match($disable_quickbag) {
            with(/false/) {
              attribute("data-ur-toggler-component", "content")
              insert_after("div", class: 'mw_myBagLink mw_myBagLink_2') {
                attribute("data-ur-toggler-component", "content")
                insert_bottom("div", id: 'mw_close_button') {
                  inner("x CLOSE")
                }
              }
            }
          }
        }
        attribute("data-ur-toggler-component", "button")
        $("..") {
          attribute("data-ur-set", "toggler")
        }
      }
      $("./div[@id='qb_headerItemContainer']") {
        move_here("./div[@class='bl_nav_top_sub_search']/div[@id='mvBDSearchFormToggle']", "before")    
      }
    }
  }
}

$(".//div[@id='qb_headerItemContainer']") {
  attribute("data-ur-toggler-component", "content")
}
$(".//span[@id=' BagItemsTotal']") {
  attribute("id", "brownBagItemsTotal")
  
}
$("//div[@id='bl_nav_account_flag']/script"){
  text(){
    replace(/>\s+??sign\sout\s+??</i, ">SIGN OUT<div class=\"to_be_sprited-rightArrow\"></div><")
  }
}
