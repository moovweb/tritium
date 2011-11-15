#add class to body so that the css can be added to main. css
$("//html/body"){
 add_class("mvRegistry")
 
 $("//script[contains(@src, 'container-min.js')]"){
   $src = fetch("./@src"){
     replace(/\/assets\./i, "\/www.")
   }
   $src{
     rewrite("link")
   }
   $("./@src"){
     text(){
       set($src)
     }
   }
 }


 #remove desktop site header
 $(".//div[@id='r_nav_top_logo']/a/img"){
  remove()
 }
}
$(".//input[contains(@name, 'signInInfo') and contains(@name, 'password') or contains(@name, 'verifyPassword')]") {
  attribute("value", "")
  attribute("placeholder", "password")
}

$(".//div[@class='passwordOverlayButtons']") {
  $("div[@class='passwordOverlayButtonsLeft']/a") {
    add_class("mvGreyButton")
    text(fetch("img/@alt"))
  }
  $("div[@class='passwordOverlayButtonsRight']/a") {
    add_class("mvButton")
    text(fetch("img/@alt"))
  }
}
$(".//div[@class='generalError']/div[@class='errorMsg']") {
  wrap_text_children("span")
  $("span") {
    text() {
      replace(/\u00a0/, " ")
    }
  }
  $("a") {
    attribute("style", "")
  }
}


# this doesn't appear to be necessary anymore (ticket #963)
# Fix the successful account creation issue
#$("//html/head/script[contains(text(), 'registryAccount.nextPage')]"){ 
#  $("/html/body") {
#    add_class("mw_go_to_next_page")
#    insert_javascript("BLOOMIES.registry.registryAccount.nextPage = window.location.origin+'/registry/wedding/registrymanager';")
#    insert_javascript("setTimeout(function(){window.location = window.location.origin+'/registry/wedding/registrymanager'}, 2000);")
#  }
#}

$("//html/head/script[contains(@src, 'registryAccount.js')]"){
  attribute("src", asset("js/registryAccount.js", "js"))
}
#pass through BLOOMIES.registry.registryAccount.nextPage variable so redirect works
$("//html/head/script"){
  inner(){
    replace(/registryAccount\.nextPage.+?(http.+?\.com)/){
      $1{
        rewrite("link")
      }
    }  
  }
}
$("./html") {
  inner(){
    replace(/registryAccount\.nextPage.+?(http.+?\.com)/){
      $1{
        rewrite("link")
      }
    }  
  }
}


#change password label tagname to div to prevent android bug
$("//label[@for='password']"){
  name("div")
}
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts



# ----- ParsedHTMLBlocks ----
#html() {
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "wedding\\/registryeditgogreen"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /wedding\/registryeditgogreen/) {
  }
  
  #
  #Content::Passthrough::ReversePassthroughAttribute
  #[["selector", ".r_weddingWebsite a"], ["attribute", "href"], ["regex_capture", ""]]
  # WARNING: NOT IMPLEMENTED YET
  # To implement this we need the reverse rewrite function - rewrite("host")
  # This is not trivial because the host rewrite is different - it is an array
  # of regular expressions, not just one
  #
  #
  #$("//*[contains(concat(' ', @class, ' '), ' r_weddingWebsite ')]//a") {
  #  attribute("href") {
  #    value() {
  #      rewrite("host")
  #    }
  #  }
  #}
  # 
  #
  
  #Remove Stuff
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#r_registryPrintHeader .r_registryBarCode"]]
    $("//*[@id = 'r_registryPrintHeader']//*[contains(concat(' ', @class, ' '), ' r_registryBarCode ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bl_nav_top_banner + a"]]
    $("//*[@id = 'bl_nav_top_banner']/following-sibling::*[1]/self::a") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#hp_template_pool1"]]
    $("//*[@id = 'hp_template_pool1']") {
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
    #[["selector", "#hp_template_pool2"]]
    $("//*[@id = 'hp_template_pool2']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "a[href*=\"print()\"]"]]
    $("//a[contains(@href, \"print()\")]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#hp_template_pool3"]]
    $("//*[@id = 'hp_template_pool3']") {
      remove()
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".myBagLink .top_nav_link"], ["regex", "MY BROWN "], ["replacement", " "], ["multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' myBagLink ')]//*[contains(concat(' ', @class, ' '), ' top_nav_link ')])[1]") {
      inner() {
        replace(/MY BROWN /, " ")
      }
    }
    
    
  # end BasicGroup
  
  #remove breadcrumbs
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".breadcrumb"], ["tag_name", ""], ["class_name", "mvRemoveMe"], ["multiple", "true"], ["split_delimiter", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' breadcrumb ')]") {
      wrap_text_children("div", class: 'mvRemoveMe')
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".breadcrumb .boldUC"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' breadcrumb ')]//*[contains(concat(' ', @class, ' '), ' boldUC ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvRemoveMe")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #saveChangesButton
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "save changes"], ["selector", "#r_manager_gogreen_save"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_manager_gogreen_save']") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("save changes")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "#r_manager_gogreen_save"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_manager_gogreen_save']") {
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
    #[["attribute", "class"], ["value", "mvButton mv123"], ["selector", "#r_manager_gogreen_save"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_manager_gogreen_save']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvButton mv123")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "src"], ["selector", "#r_manager_gogreen_save"]]
    $("//*[@id = 'r_manager_gogreen_save']") {
      attribute("src") {
        remove()
      }
    }
    
    
  # end BasicGroup
  
  #back to regestry manager button
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "back to registry manager"], ["selector", "#r_manager_gogreen_backToRegistryManager"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_manager_gogreen_backToRegistryManager']") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("back to registry manager")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "#r_manager_gogreen_backToRegistryManager"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_manager_gogreen_backToRegistryManager']") {
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
    #[["attribute", "class"], ["value", "mvGreyButton mvBackToRegistryButton"], ["selector", "#r_manager_gogreen_backToRegistryManager"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'r_manager_gogreen_backToRegistryManager']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvGreyButton mvBackToRegistryButton")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #back to regestry button
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".btnContainer a"], ["html", "Back To Registry Manager"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//a") {
      inner("Back To Registry Manager")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGreyButton"], ["selector", ".btnContainer a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//a") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvGreyButton")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #guest Registry
  #Group::URLMatcherGroup
  #[["url_matcher", "guest"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /guest/) {
  
    #
    #Content::Passthrough::Attribute
    #[["selector", ".r_registryBarCode img"], ["attribute", "src"], ["regex_capture", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_registryBarCode ')]//img") {
      attribute("src") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#r_itemsContainer"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[@id = 'r_itemsContainer'])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvEmptyText\"><a href=\"/registry/wedding/registryhome\">The Registry that you have accessed currently has no products associated with it. Check back Later.</a></div>"], ["add_after", "#r_registrantHeaderInfo"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      # $("(//*[@id = 'r_registrantHeaderInfo'])[1]") {
      $("//div[@id='goGreenVR']") {
        inject_after("<div class=\"mvEmptyText\"><a href=\"/registry/wedding/registryhome\">The Registry that you have accessed currently has no products associated with it. Check back Later.</a></div>")
      }
      
      
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "[id*=\"r_addToBag\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(@id, \"r_addToBag\")]") {
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
    #[["attribute", "value"], ["value", "Add To Bag"], ["selector", "[id*=\"r_addToBag\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(@id, \"r_addToBag\")]") {
      match($done, "no") {
        attribute("value") {
          value() {
              set("Add To Bag")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "#continueShopping"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'continueShopping']") {
      match($done, "no") {
        attribute("type") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #checkoutButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", ".bagDivButton a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//a") {
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
      #[["attribute", "value"], ["value", "Add To Bag"], ["selector", ".bagDivButton a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//a") {
        match($done, "no") {
          attribute("value") {
            value() {
                set("Add To Bag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", ".bagDivButton a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//a") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".bagDivButton a"], ["html", "checkout"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//a") {
        inner("checkout")
      }
      
      
    # end BasicGroup
    
    #add to bag button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".r_addToBag"], ["new_tag_name", "input"], ["class_name", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' r_addToBag ')]") {
        name("input")
        attribute("type", "button")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", ".r_addToBag"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_addToBag ')]") {
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
      #[["attribute", "value"], ["value", "Add To Bag"], ["selector", ".r_addToBag"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_addToBag ')]") {
        match($done, "no") {
          attribute("value") {
            value() {
                append(" Add To Bag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", ".r_addToBag"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_addToBag ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvButton")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".r_itemsNeeded"], ["tag_name", "div"], ["class_name", "mvNeeds"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' r_itemsNeeded ')]") {
      wrap("div") {
        attribute("class", "mvNeeds")
      }
      
    }
    
    $("//li[contains(text(), 'completed')]"){
     add_class("mvDisplayBlock") 
    }
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".r_itemsRequested"], ["tag_name", "div"], ["class_name", "mvRequested"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' r_itemsRequested ')]") {
      wrap("div") {
        attribute("class", "mvRequested")
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "[id*=\"r_addToBag\"]"], ["new_tag_name", "input"], ["class_name", "mvButton"]]
    $("//*[contains(@id, \"r_addToBag\")]") {
      name("input")
      attribute("class", "mvButton")
      attribute("type", "button")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".r_quicklook_largerImageButton"]]
    $("//*[contains(concat(' ', @class, ' '), ' r_quicklook_largerImageButton ')]") {
      remove()
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvPriceTitle mvGuestQty\">qty: </div>"], ["add_after", ""], ["multiple", "true"], ["add_before", "select.itemQty"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//select[contains(concat(' ', @class, ' '), ' itemQty ')]") {
      inject_before("<div class=\"mvPriceTitle mvGuestQty\">quantity: </div>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span>Requested: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".r_itemsRequested"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_itemsRequested ')]") {
      inject_before("<span>Requested: </span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span>Price: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".priceBig"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' priceBig ')]") {
      inject_before("<span>Price: </span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span>Still Needs: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".r_itemsNeeded"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_itemsNeeded ')]") {
      inject_before("<span>Still Needs: </span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTopBar\"></div>"], ["add_after", "input[id*=\"r_addToBag\"]"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//input[contains(@id, \"r_addToBag\")]") {
      inject_after("<div class=\"mvTopBar\"></div>")
    }
    
    
    #back to registry button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all# end BasicGroup
    
    #accordionize content
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".r_categoryContainer"], ["tag_name", ""], ["class_name", "mvRegistryGroup"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
        wrap("div") {
          attribute("class", "mvRegistryGroup")
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".r_itemsContainerHeader"]]
      $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".r_itemsContainerHeader"], ["content_selector", ".r_itemsContainerHeader + .r_categoryContainer"], ["ancestor_selector", ".mvRegistryGroup"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvRegistryGroup ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
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
                append("60905")
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
        $(".//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
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
                append("60905")
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
    
    #
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "sortBy"], ["negate", ""], ["parameter_value", "STILL_NEED"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/sortBy\=STILL_NEED/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".r_itemsContainerHeader h3.r_categoryName"], ["html", "<span>still needs</span>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]//h3[contains(concat(' ', @class, ' '), ' r_categoryName ')]") {
        inner("<span>still needs</span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "r_categoryContainer"], ["selector", ".r_categoryContainer"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("r_categoryContainer")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "moovweb_open"], ["selector", ".r_itemsContainerHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" moovweb_open")
            }
          }
        }
      }
      
      
    }
    
    #
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "sortBy"], ["negate", ""], ["parameter_value", "PRICE_LOWEST_FIRST"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/sortBy\=PRICE_LOWEST_FIRST/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".r_itemsContainerHeader h3.r_categoryName"], ["html", "<span>sort by price</span>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]//h3[contains(concat(' ', @class, ' '), ' r_categoryName ')]") {
        inner("<span>price</span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "r_categoryContainer"], ["selector", ".r_categoryContainer"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("r_categoryContainer")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "moovweb_open"], ["selector", ".r_itemsContainerHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" moovweb_open")
            }
          }
        }
      }
      
      
    }
    
  }
  
  #registryHome
  #Group::URLMatcherGroup
  #[["url_matcher", "registryhome"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryhome/) {
  
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#r_home_registryManagerLinkContainer a"], ["html", "<div>you are signed in. <span>go to registry manager</span>.</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'r_home_registryManagerLinkContainer']//a") {
      inner("<div>You are signed in. <span>go to registry manager</span>.</div>")
      insert_before("div", "Manage", class: "mvRegistryHeader")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#r_home_registryClaimLinkContainer a"], ["html", "<div>Created your regisry in-store? <span>start here</span>.</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'r_home_registryClaimLinkContainer']//a") {
      inner("<div>Created your regisry in-store? <span>start here</span>.</div>")
    }
    
    
    #Search Registry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvRegistryHeader\">Search Registry</span>"], ["add_after", ""], ["multiple", ""], ["add_before", "#r_home_registrySearch_firstNameContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'r_home_registrySearch_firstNameContainer'])[1]") {
        inject_before("<span class=\"mvRegistryHeader\">Search Registry</span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_home_registrySearch_buttonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registrySearch_buttonContainer']//input") {
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
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "#r_home_registrySearch_buttonContainer input"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registrySearch_buttonContainer']//input") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Search"], ["selector", "#r_home_registrySearch_buttonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registrySearch_buttonContainer']//input") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Search")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #manage Registry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvRegistryHeader\">Manage Registry</span>"], ["add_after", ""], ["multiple", ""], ["add_before", "#r_home_registrySigninFormContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'r_home_registrySigninFormContainer'])[1]") {
        inject_before("<span class=\"mvRegistryHeader\">Manage Registry</span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "#r_home_registrySigninFormContainer input.r_button"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registrySigninFormContainer']//input[contains(concat(' ', @class, ' '), ' r_button ')]") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Manage"], ["selector", "#r_home_registrySigninFormContainer input.r_button"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registrySigninFormContainer']//input[contains(concat(' ', @class, ' '), ' r_button ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Manage")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_home_registrySigninFormContainer input.r_button"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registrySigninFormContainer']//input[contains(concat(' ', @class, ' '), ' r_button ')]") {
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
    
    #create Registry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvRegistryHeader\">Create Registry</span>"], ["add_after", ""], ["multiple", ""], ["add_before", "#r_home_registryCreateAccountButtonContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'r_home_registryCreateAccountButtonContainer'])[1]") {
        inject_before("<span class=\"mvRegistryHeader\">Create Registry</span>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "#r_home_registryCreateAccountButtonContainer a"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registryCreateAccountButtonContainer']//a") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_home_registryCreateAccountButtonContainer a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_home_registryCreateAccountButtonContainer']//a") {
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
      #Content::Formatting::RemoveElements
      #[["selector", "#r_home_registryCreateAccountButtonContainer a img"]]
      $("//*[@id = 'r_home_registryCreateAccountButtonContainer']//a//img") {
        remove()
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", "#r_home_registryCreateAccountButtonContainer a"], ["text", "create"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[@id = 'r_home_registryCreateAccountButtonContainer']//a") {
        inner() {
          set("create")
        }
      }
      
      
    # end BasicGroup
    
  }
  
  #manageRegestry
  #Group::URLMatcherGroup
  #[["url_matcher", "registrymanager"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrymanager/) {
  
    #manageRegestry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #addToRegestryButton
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".r_manager_addTo_registry a"], ["html", "Add to"], ["prepend", ""], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' r_manager_addTo_registry ')]//a") {
          inner("Add to")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvGreyButton mvRegistryButton"], ["selector", ".r_manager_addTo_registry a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' r_manager_addTo_registry ')]//a") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvGreyButton mvRegistryButton")
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
      #  #Content::Formatting::RemoveElements
      #  #[["selector", "#r_registrant_completionInStoreDetails"]]
      #  $("//*[@id = 'r_registrant_completionInStoreDetails']") {
      #    remove()
      #  }
      #  
      #  
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "a#r_mananger_tcm_note"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[@id = 'r_mananger_tcm_note']") {
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
    #Content::Formatting::MoveBefore
    #[["move_me", "#r_manager_header_content"], ["before_me", "#bl_hp_main"], ["map_moves", ""]]
    $("(//*[@id = 'bl_hp_main'])[1]") {
      move_here("(//*[@id = 'r_manager_header_content'])[1]", "before")
    }
    
    
    #
    #Content::Passthrough::Attribute
    #[["selector", ".r_registryBarCode img"], ["attribute", "src"], ["regex_capture", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_registryBarCode ')]//img") {
      attribute("src") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".r_printEmailRegistry"], ["tag_name", "civ"], ["class_name", "mvRemoveMe"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' r_printEmailRegistry ')])[1]") {
      wrap_text_children("civ", class: 'mvRemoveMe')
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "#r_leftNav_extras li:last-of-type"], ["after_me", "#r_leftNav_registryTools li:last-of-type"], ["map_multiple", ""]]
    $("(//*[@id = 'r_leftNav_registryTools']//li[position() = last()])[1]") {
      move_here("(//*[@id = 'r_leftNav_extras']//li[position() = last()])[1]", "after")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".r_printEmailRegistry"], ["before_me", ".r_registryBarCode"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' r_registryBarCode ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' r_printEmailRegistry ')])[1]", "before")
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", "#r_manager_header_content"], ["tag_name", "div"], ["class_name", "mvManageHeaderTextWrap"], ["multiple", ""], ["split_delimiter", ";"]]
    $("(//*[@id = 'r_manager_header_content'])[1]") {
      wrap_text_children("div", class: 'mvManageHeaderTextWrap')
    }
    
    
  }
  
  #giftCard
  #Group::URLMatcherGroup
  #[["url_matcher", "registrythankyoucardmanager"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrythankyoucardmanager/) {
  
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvThankYouCardText\">The Registry Thank You Card Manager is an organized list of who gave you what and when, even if you have yet to receive the gift. Frankly this is  the best thing to hit the thank-you note scene since ink.</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#r_mananger_tcm_noteOverlay .bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'r_mananger_tcm_noteOverlay']//*[contains(concat(' ', @class, ' '), ' bd ')])[1]") {
      inject_before("<div class=\"mvThankYouCardText\">The Registry Thank You Card Manager is an organized list of who gave you what and when, even if you have yet to receive the gift. Frankly this is  the best thing to hit the thank-you note scene since ink.</div>")
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", "#r_tcm_buttonRow .floatLeft"]]
    $("//*[@id = 'r_tcm_buttonRow']//*[contains(concat(' ', @class, ' '), ' floatLeft ')]") {
      move_to("..", "before")
    }
    
    
    #BackToMenuButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "[src*=\"back_to_registry_button.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(@src, \"back_to_registry_button.gif\")]") {
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
      #[["attribute", "class"], ["value", "mvGreyButton mvBackToManager"], ["selector", "[src*=\"back_to_registry_button.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(@src, \"back_to_registry_button.gif\")]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvGreyButton mvBackToManager")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Back To Registry"], ["selector", "[src*=\"back_to_registry_button.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(@src, \"back_to_registry_button.gif\")]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Back To Registry")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #saveButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvBackToManager"], ["selector", "[src*=\"save_changes_button.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(@src, \"save_changes_button.gif\")]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvBackToManager")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "[src*=\"save_changes_button.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(@src, \"save_changes_button.gif\")]") {
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
      #[["attribute", "value"], ["value", "Save"], ["selector", "[src*=\"save_changes_button.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(@src, \"save_changes_button.gif\")]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Save")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "thead"]]
    $("//thead") {
      remove()
    }
    
    
  }
  
  #createRegestryAccount
  #Group::URLMatcherGroup
  #[["url_matcher", "registrycaptureemail"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrycaptureemail/) {
  
    #continue button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvSignInButton"], ["selector", "#r_captureEmailFormContainer input[type=\"image\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_captureEmailFormContainer']//input[@type = \"image\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvSignInButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_captureEmailFormContainer input[type=\"image\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_captureEmailFormContainer']//input[@type = \"image\"]") {
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
    
    #sign in button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvSignInButton"], ["selector", "#r_captureEmailExistingUserFormContainer input[type=\"image\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_captureEmailExistingUserFormContainer']//input[@type = \"image\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvSignInButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_captureEmailExistingUserFormContainer input[type=\"image\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_captureEmailExistingUserFormContainer']//input[@type = \"image\"]") {
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
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", "#navigation_whyRegisterLink"], ["after_me", "#r_captureEmailFormContainer"], ["map_multiple", ""]]
    $("(//*[@id = 'r_captureEmailFormContainer'])[1]") {
      move_here("(//*[@id = 'navigation_whyRegisterLink'])[1]", "after")
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", "#navigation_whyRegisterLink"], ["tag_name", "div"], ["class_name", "mvWhyRegisterWrap"], ["id", ""], ["multiple", ""]]
    $("//*[@id = 'navigation_whyRegisterLink']") {
      wrap("div") {
        attribute("class", "mvWhyRegisterWrap")
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span>\" list.</span>"], ["add_after", "#navigation_whyRegisterLink"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'navigation_whyRegisterLink'])[1]") {
      inject_after("<span>\" list.</span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span>Have questions, read our \"</span>"], ["add_after", ""], ["multiple", ""], ["add_before", "#navigation_whyRegisterLink"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'navigation_whyRegisterLink'])[1]") {
      inject_before("<span>Have questions, read our \"</span>")
    }
    
    
  }
  
  #regestrySign In
  #Group::URLMatcherGroup
  #[["url_matcher", "registrysignin"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrysignin/) {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#mvBDSiteMenuHeader"]]
    $("//*[@id = 'mvBDSiteMenuHeader']") {
      remove()
    }
    
    
    #Create button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "create registry"], ["selector", "#r_signin_createRegistryButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_signin_createRegistryButtonContainer']//input") {
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
      #[["attribute", "class"], ["value", "mvButton mvCreateButton"], ["selector", "#r_signin_createRegistryButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_signin_createRegistryButtonContainer']//input") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvCreateButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_signin_createRegistryButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_signin_createRegistryButtonContainer']//input") {
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
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_signin_createRegistryButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_signin_createRegistryButtonContainer']//input") {
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
    
    #sign in button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_signin_signinButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_signin_signinButtonContainer']//input") {
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
      #[["attribute", "value"], ["value", "sign in"], ["selector", "#r_signin_signinButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_signin_signinButtonContainer']//input") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("sign in")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvSignInButton"], ["selector", "#r_signin_signinButtonContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_signin_signinButtonContainer']//input") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvSignInButton")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  }
  
  #createRegistryForm
  #Group::URLMatcherGroup
  #[["url_matcher", "registrycreateaccount"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrycreateaccount/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCreateAccount"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvCreateAccount")
          }
        }
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<br class=\"mvBr\">"], ["add_after", ".labelMember"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' labelMember ')]") {
      inject_after("<br class=\"mvBr\">")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#r_ra_topImage"]]
    $("//*[@id = 'r_ra_topImage']") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".r_nav_top_bag_text"], ["to_beginning_of_me", ".bl_nav_top_contain_outer"], ["map_multiple", ""], ["ancestor_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' r_nav_top_bag_text ')])[1]", "top")
    }
    
    
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "x$('#sameAddressCheckboxContainer input')[0].addEventListener(\"click\", function (){if(this.checked == true){document.getElementById('coRegistrantAddressBlock').style.display = \"none\"}else{document.getElementById('coRegistrantAddressBlock').style.display = \"block\"}})"], ["add_after", ""], ["add_before", ""]]
      $("html/body") {
        insert_bottom("script") {
          attribute("language", "javascript")
          inner("x$('#sameAddressCheckboxContainer input')[0].addEventListener(\"click\", function (){if(this.checked == true){document.getElementById('coRegistrantAddressBlock').style.display = \"none\"}else{document.getElementById('coRegistrantAddressBlock').style.display = \"block\"}})")
        }
      }
    
    
    #createRegestry button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "create registry"], ["selector", ".btnContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//input") {
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
      #[["attribute", "type"], ["value", "submit"], ["selector", ".btnContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//input") {
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
      #[["attribute", "class"], ["value", "mvButton"], ["selector", ".btnContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//input") {
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
    
  }
  
  #editRegestryAccount
  #Group::URLMatcherGroup
  #[["url_matcher", "registryeditaccount"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryeditaccount/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvEditAccount"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvEditAccount")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".generalError"], ["after_me", "#profile .r_ra_section_title"], ["map_multiple", ""]]
    $("(//*[@id = 'profile']//*[contains(concat(' ', @class, ' '), ' r_ra_section_title ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' generalError ')])[1]", "after")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<br class=\"mvBr\">"], ["add_after", ".r_rowRadio .labelMember"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_rowRadio ')]//*[contains(concat(' ', @class, ' '), ' labelMember ')]") {
      inject_after("<br class=\"mvBr\">")
    }
    
    
    #updateRegestryButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", ".btnContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//input") {
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
      #[["attribute", "class"], ["value", "mvButton"], ["selector", ".btnContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//input") {
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
      #[["attribute", "value"], ["value", "Update Registry"], ["selector", ".btnContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//input") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Update Registry")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img[src*=\"consider_it_done.gif\"]"]]
    $("//img[contains(@src, \"consider_it_done.gif\")]") {
      remove()
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#profile .r_ra_section_title"], ["html", "<div>update your registry account</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'profile']//*[contains(concat(' ', @class, ' '), ' r_ra_section_title ')]") {
      inner("<div>update your registry account</div>")
    }
    
    
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "x$('#sameAddressCheckboxContainer input')[0].addEventListener(\"click\", function (){if(this.checked == true){document.getElementById('coRegistrantAddressBlock').style.display = \"none\"}else{document.getElementById('coRegistrantAddressBlock').style.display = \"block\"}})"], ["add_after", ""], ["add_before", ""]]
      $("html/body") {
        insert_bottom("script") {
          attribute("language", "javascript")
          inner("x$('#sameAddressCheckboxContainer input')[0].addEventListener(\"click\", function (){if(this.checked == true){document.getElementById('coRegistrantAddressBlock').style.display = \"none\"}else{document.getElementById('coRegistrantAddressBlock').style.display = \"block\"}})")
        }
      }
    
    
    #editRegistry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#r_ra_topImage"]]
      $("//*[@id = 'r_ra_topImage']") {
        remove()
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".mvBDHeader"], ["to_beginning_of_me", ".bl_nav_top_contain_outer"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_nav_top_contain_outer ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvBDHeader ')])[1]", "top")
      }
      
      
    # end BasicGroup
    
  }
  
  #regestrySearch
  #Group::URLMatcherGroup
  #[["url_matcher", "registrysearch"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrysearch/) {
  
    #findRegestry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#r_container > img"]]
      $("//*[@id = 'r_container']/img") {
        remove()
      }
      
      
    # end BasicGroup
    
    #searchButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "#r_searchFieldsR input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_searchFieldsR']//input") {
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
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_searchFieldsR input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_searchFieldsR']//input") {
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
      #[["attribute", "src"], ["value", " "], ["selector", "#r_searchFieldsR input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_searchFieldsR']//input") {
        match($done, "no") {
            var("done", "yes")
          attribute("src") {
            value() {
                set(" ")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#r_searchFieldsR > div:first-child"], ["after_me", "#r_searchFieldsR > div:last-child"], ["map_multiple", ""]]
      $("(//*[@id = 'r_searchFieldsR']/*[position() = last() and self::div])[1]") {
        move_here("(//*[@id = 'r_searchFieldsR']/*[position() = 1 and self::div])[1]", "after")
      }
      
      
    # end BasicGroup
    
    #destroy table
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", "th"]]
      $("//th") {
        remove()
      }
      
      
    # end BasicGroup
    
  }
  
  #checkList
  #Group::URLMatcherGroup
  #[["url_matcher", "checklist"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /checklist/) {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#pillow_flower"]]
    $("//*[@id = 'pillow_flower']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#doublePillow"]]
    $("//*[@id = 'doublePillow']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".color_pots"]]
    $("//*[contains(concat(' ', @class, ' '), ' color_pots ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".secondBorder"]]
    $("//*[contains(concat(' ', @class, ' '), ' secondBorder ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".seperateBorder"]]
    $("//*[contains(concat(' ', @class, ' '), ' seperateBorder ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#entertaining_glasses"]]
    $("//*[@id = 'entertaining_glasses']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".appleAndKnife"]]
    $("//*[contains(concat(' ', @class, ' '), ' appleAndKnife ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvDressYourTableHolder"], ["selector", "#mvDressYourTable"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'mvDressYourTable']") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvDressYourTableHolder")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMainBox"], ["selector", "#bl_hp_main"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'bl_hp_main']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvMainBox")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvDressYourTable"], ["selector", "img[src*=\"dress_your_table.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[contains(@src, \"dress_your_table.gif\")]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvDressYourTable")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#simmer_fry_service_section .checklist_mixBlend"], ["html", "<div>Simmer, Fry, Poach and Bake.</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'simmer_fry_service_section']//*[contains(concat(' ', @class, ' '), ' checklist_mixBlend ')]") {
      inner("<div>Simmer, Fry, Poach and Bake.</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#mix_blend .checklist_mixBlend"], ["html", "<div>Mix, Blend &amp; Grill.</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'mix_blend']//*[contains(concat(' ', @class, ' '), ' checklist_mixBlend ')]") {
      inner("<div>Mix, Blend &amp; Grill.</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#look_better_in_your_Bed_bath_section .checklist_mixBlend"], ["html", "<div>Bed, Bath</div><div class=\"mvOtherLocales\">(and other Glamorous Locales)</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'look_better_in_your_Bed_bath_section']//*[contains(concat(' ', @class, ' '), ' checklist_mixBlend ')]") {
      inner("<div>Bed, Bath</div><div class=\"mvOtherLocales\">(and other Glamorous Locales)</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#entertain_like_you_section .checklist_mixBlend"], ["html", "<div>Entertain Like You Mean It</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'entertain_like_you_section']//*[contains(concat(' ', @class, ' '), ' checklist_mixBlend ')]") {
      inner("<div>Entertain Like You Mean It</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#mvDressYourTable"], ["html", "<div>Dress Your Table.</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'mvDressYourTable']") {
      inner("<div>Dress Your Table.</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#check_it_out_header"], ["html", "<div><div class=\"mvChecklistHeader\">Checklist</div><span class=\"mvChekcItOut\">Check It Out </span><span class=\"mvCheckItOff\">check it off</span></div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'check_it_out_header']") {
      inner("<div><div class=\"mvChecklistHeader\">Checklist</div><span class=\"mvChekcItOut\">Check It Out </span><span class=\"mvCheckItOff\">check it off</span></div><div><a href=\"/registry/wedding/registrymanager?cm_sp=global_nav_reg-_-manage-_-n\">Back to Registry Manager</a></div>")
    }
    
    
  }
  
  #faq
  #Group::URLMatcherGroup
  #[["url_matcher", "registryfaq"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryfaq/) {
  
    #back to regestry manager button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvBackToRegistryButton"], ["selector", ".btnContainer a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//a") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvButton mvBackToRegistryButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".btnContainer a"], ["html", "Back To Registry Manager"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' btnContainer ')]//a") {
        inner("Back To Registry Manager")
      }
      
      
    # end BasicGroup
    
  }
  
  #weddingWebsite
  #Group::URLMatcherGroup
  #[["url_matcher", "registryeditweddingwebsite"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryeditweddingwebsite/) {
  
    #edit registry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGreyButton mvEditRegistryButton"], ["selector", "#r_weddingWebsite_buttonsContainer a:last-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_weddingWebsite_buttonsContainer']//a[position() = last()]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvGreyButton mvEditRegistryButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#r_weddingWebsite_buttonsContainer a.mvEditRegistryButton"], ["html", "edit"], ["prepend", ""], ["append", ""]]
      $("//*[@id = 'r_weddingWebsite_buttonsContainer']//a[contains(concat(' ', @class, ' '), ' mvEditRegistryButton ')]") {
        inner("edit")
      }
      
      
    # end BasicGroup
    
    #back to regestry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGreyButton mvBackToRegistryButton"], ["selector", "#r_weddingWebsite_buttonsContainer a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_weddingWebsite_buttonsContainer']//a") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvGreyButton mvBackToRegistryButton")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#r_weddingWebsite_buttonsContainer a.mvBackToRegistryButton"], ["html", "Back To Registry Manager"], ["prepend", ""], ["append", ""]]
      $("//*[@id = 'r_weddingWebsite_buttonsContainer']//a[contains(concat(' ', @class, ' '), ' mvBackToRegistryButton ')]") {
        inner("Back To Registry Manager")
      }
      
      
    # end BasicGroup
    
    #submit
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "#r_weddingWebsite_buttonsContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_weddingWebsite_buttonsContainer']//input") {
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
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "#r_weddingWebsite_buttonsContainer input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'r_weddingWebsite_buttonsContainer']//input") {
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
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#r_weddingWebsite_formContainer"], ["html", "<div class=\"mvWeddingWebsiteHeader\">Wedding Website</div>"], ["prepend", "true"], ["append", ""]]
    $("//*[@id = 'r_weddingWebsite_formContainer']") {
      inner() {
        prepend("<div class=\"mvWeddingWebsiteHeader\">Wedding Website</div>")
      }
    }
    
    
  }
  
  #registryClaim
  #Group::URLMatcherGroup
  #[["url_matcher", "registryclaim"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryclaim/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRegistryClaim"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvRegistryClaim")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".generalError"]]
    $("//*[contains(concat(' ', @class, ' '), ' generalError ')]") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", "#r_claim_instructions"], ["regex", "<br>"], ["replacement", " "], ["multiple", ""]]
    $("(//*[@id = 'r_claim_instructions'])[1]") {
      inner() {
        replace(/<br>/, " ")
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img[src*=\"locatingregistryID.gif\"]"]]
    $("//img[contains(@src, \"locatingregistryID.gif\")]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "src"], ["value", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/MVwhereIsRegistryId.js"], ["selector", "script[src*=\"whereIsRegistryId.js\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//script[contains(@src, \"whereIsRegistryId.js\")]") {
      match($done, "no") {
          var("done", "yes")
        attribute("src") {
          value() {
            $temp = concat(asset("javascript/js/MVwhereIsRegistryId.js"), "")
            set($temp)
          }
        }
      }
    }
    
    
    #continue button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", ".r_rowButtonCont input"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_rowButtonCont ')]//input") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", ".r_rowButtonCont input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_rowButtonCont ')]//input") {
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
    
  }
  
  #regestryItems
  #Group::URLMatcherGroup
  #[["url_matcher", "(registrant)|(addtoregistryredirected)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(registrant)|(addtoregistryredirected)/) {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".r_quicklook_largerImageButton"]]
    $("//*[contains(concat(' ', @class, ' '), ' r_quicklook_largerImageButton ')]") {
      remove()
    }
    
    
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#r_itemsContainer"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[@id = 'r_itemsContainer'])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvEmptyText\">Currently there are no products added to your registry. Get started today!</div>"], ["add_after", "#r_registrantHeaderInfo"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      # $("(//*[@id = 'r_registrantHeaderInfo'])[1]") {
      $("//div[@id='goGreenVR']") {
        inject_after("<div class=\"mvEmptyText\">Currently there are no products added to your registry. Get started today!</div>")
      }
      
      
    }
    
    
    #updateRegistryButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvAddtoBag"], ["selector", ".r_updateRegistry"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_updateRegistry ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvButton mvAddtoBag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Update Registry"], ["selector", ".r_updateRegistry"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_updateRegistry ')]") {
        match($done, "no") {
          attribute("value") {
            value() {
                set("Update Registry")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "button"], ["selector", ".r_updateRegistry"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_updateRegistry ')]") {
        match($done, "no") {
          attribute("type") {
            value() {
                set("button")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #addToRegistry
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvAddtoBag"], ["selector", ".r_listItemBottom + img"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_listItemBottom ')]/following-sibling::*[1]/self::img") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvButton mvAddtoBag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Add To Bag"], ["selector", ".r_listItemBottom + img"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_listItemBottom ')]/following-sibling::*[1]/self::img") {
        match($done, "no") {
          attribute("value") {
            value() {
                set("Add To Bag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "button"], ["selector", ".r_listItemBottom + img"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_listItemBottom ')]/following-sibling::*[1]/self::img") {
        match($done, "no") {
          attribute("type") {
            value() {
                set("button")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".r_listItemBottom + img"], ["new_tag_name", "input"], ["class_name", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' r_listItemBottom ')]/following-sibling::*[1]/self::img") {
        name("input")
      }
      
      
    # end BasicGroup
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    #  #
    #  #Content::Formatting::ReplaceTag
    #  #[["selector", "ul"], ["new_tag_name", "div"], ["class_name", ""]]
    #  $("//ul") {
    #    name("div")
    #  }
    #  
    #  
    #  #
    #  #Content::Formatting::ReplaceTag
    #  #[["selector", "li"], ["new_tag_name", "div"], ["class_name", ""]]
    #  $("//li") {
    #    name("div")
    #  }
    #  
    #  
    
    
    #add to bag button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", ".r_addToBag"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_addToBag ')]") {
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
      #[["attribute", "value"], ["value", "Add To Bag"], ["selector", ".r_addToBag"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' r_addToBag ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Add To Bag")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".r_addToBag"], ["new_tag_name", "input"], ["class_name", "mvButton"]]
      $("//*[contains(concat(' ', @class, ' '), ' r_addToBag ')]") {
        name("input")
        attribute("class", "mvButton")
        attribute("type", "button")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span class=\"mvPriceTitle\">Price: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".r_upcPrice > .priceSale"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_upcPrice ')]/*[contains(concat(' ', @class, ' '), ' priceSale ')]") {
      inject_before("<span class=\"mvPriceTitle\">Price: </span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span class=\"mvPriceTitle\">Still Needs: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".r_itemsNeeded input:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_itemsNeeded ')]//input[position() = 1]") {
      inject_before("<span class=\"mvPriceTitle\">Still Needs: </span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span class=\"mvPriceTitle\">Quantity: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".r_purchaseDropDown > select.itemQty"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_purchaseDropDown ')]/select[contains(concat(' ', @class, ' '), ' itemQty ')]") {
      inject_before("<span class=\"mvPriceTitle\">Quantity: </span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span class=\"mvPriceTitle\">Requested: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".r_itemsRequested  input:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_itemsRequested ')]//input[position() = 1]") {
      inject_before("<span class=\"mvPriceTitle\">Requested: </span>")
    }
    
    
    #
    #Content::Formatting::WrapWithNextSibling
    #[["selector", ".r_itemsRequested"], ["wrapper_class", "mvRequestedWrapper"], ["sibling_count", "1"]]
    $("//*[contains(concat(' ', @class, ' '), ' r_itemsRequested ')]") {
      wrap("div") {
        attribute("class", "mvRequestedWrapper")
        move_here("(following-sibling::*)[1]", "bottom")
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTopBar\"></div>"], ["add_after", ".r_updateRegistry"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' r_updateRegistry ')]") {
      inject_after("<div class=\"mvTopBar\"></div>")
    }
    
    
    #accordionize content
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".r_categoryContainer"], ["tag_name", "div"], ["class_name", "mvCategoryWrap"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
        wrap("div") {
          attribute("class", "mvCategoryWrap")
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".r_itemsContainerHeader"]]
      $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".r_itemsContainerHeader"], ["content_selector", ".r_categoryContainer"], ["ancestor_selector", ".mvCategoryWrap"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvCategoryWrap ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
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
                append("75012")
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
        $(".//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
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
                append("75012")
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
      #Group::QueryParameterMatcherGroup
      #[["parameter_name", "sortBy"], ["negate", ""], ["parameter_value", "PRICE_LOWEST_FIRST"], ["if_present", ""]]
        var("param_matched", "false")
        match($path) {
          with(/sortBy\=PRICE_LOWEST_FIRST/) {
            var("param_matched", "true")
          }
        }
          match($param_matched, "true") {
      
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "h3.r_categoryName"], ["html", "<span>sort by price</span>"], ["prepend", ""], ["append", ""]]
        $("//h3[contains(concat(' ', @class, ' '), ' r_categoryName ')]") {
          inner("<span>price</span>")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "moovweb_open"], ["selector", ".r_itemsContainerHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" moovweb_open")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "r_categoryContainer"], ["selector", ".r_categoryContainer"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("r_categoryContainer")
              }
            }
          }
        }
        
        
      }
      
      #
      #Group::QueryParameterMatcherGroup
      #[["parameter_name", "sortBy"], ["negate", ""], ["parameter_value", "STILL_NEED"], ["if_present", ""]]
        var("param_matched", "false")
        match($path) {
          with(/sortBy\=STILL_NEED/) {
            var("param_matched", "true")
          }
        }
          match($param_matched, "true") {
      
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", "h3.r_categoryName"], ["html", "<span>still needs</span>"], ["prepend", ""], ["append", ""]]
        $("//h3[contains(concat(' ', @class, ' '), ' r_categoryName ')]") {
          inner("<span>still needs</span>")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "moovweb_open"], ["selector", ".r_itemsContainerHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" moovweb_open")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "r_categoryContainer"], ["selector", ".r_itemsContainerHeader + .r_categoryContainer"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' r_itemsContainerHeader ')]/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' r_categoryContainer ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("r_categoryContainer")
              }
            }
          }
        }
        
        
      }
      
    # end BasicGroup
    
  }
  
  #Why Register
  #Group::URLMatcherGroup
  #[["url_matcher", "benefits"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /benefits/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvWhyRegister"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvWhyRegister")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#mainContentBody"], ["html", "<div class=\"container\"> <div class=\"un_space\"> <div class=\"mvWhyRegisterHeader\">Why register?</div> <div>The Registry at Bloomindale's is unlike any other in the world. Here are the top 10 reasons to create a Bloomingdale's wish list.</div> </div> <div class=\"un_space\"> <a class=\"mvCreateRegistryLink\" href=\"/registry/wedding/registrysignin\">Create a Registry</a> </div> <div class=\"un_filter\"> <span class=\"un_bold\">1 - </span><span class=\"un_normal\"> Introducing your point person for all things registry-related. Our specialized consultants are here for guidance and advice on building the perfect registry. Meet your consultant at <a href=\"/store/index.ognc\">a Bloomingdale's near you.</a> </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">2 - </span><span class=\"un_normal\">In stores now: our new guide, full of effective and stylish registry pointers. With checklists and glossaries designed to put your gifts to good use, it's everything you need to know about planning your new life together. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">3 - </span><span class=\"un_normal\"> Our exclusive new tabletop tool will revolutionize the way you register. Test-drive your favorite china settings online: mix Vera Wang with Bernardaud and add a pop of Kate Spade for fun. Like what you see? Add it to your registry. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">4 - </span><span class=\"un_normal\"> Register for items from select vendors and be eligible to receive <span class=\"un_normal\">bonus gifts</span>. It doesn't stop there. You can become eligible to receive more freebies when items from select vendors are purchased from your registry. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">5 - </span><span class=\"un_normal\"> With a qualifying registry, you'll receive the ultimate in luxury when planning a vacation to one of the Leading Hotels of the World. Enjoy a couple's massage, concierge services, dinner for two, champagne and special rates (when available) and so much more. For more information, please consult a registry consultant <a href=\"/store/index.ognc\">at a Bloomingdale's near you.</a> </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">6 - </span><span class=\"un_normal\"> The best thing to hit the thank-you note scene since ink, The Registry's \"Thank You Card Manager\" is an organized list of who gave you what and when. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">7 - </span><span class=\"un_normal\"> Guests can add a personal touch by giving linens to be customized with a complimentary monogram. Simply bring your eligible items to a <a href=\"/store/index.ognc\">Bloomingdale's near you</a> to receive this service. Available in select stores. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">8 - </span><span class=\"un_normal\"> As a Bloomingdale's registrant, you're a member of a very social set. Meet product specialists and the biggest names in the wedding industry at our <a href=\"/store/index.ognc\">exclusive events.</a> </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">9 - </span><span class=\"un_normal\"> Bloomingdale's, in partnership with Wedding Channel, will provide you with a wedding website! It's a simple way to share details up to your big day. You'll get a web address, your own theme, and be able to add photos and a guest book. <a href=\"/registry/wedding/registrymanager\">Register now with Bloomingdale's</a> to start sharing your wedding story! </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">10 - </span><span class=\"un_normal\"> Bloomingdale's will give you <b>10% OFF</b> any item you registered for but didn't receive for six months following your event. </span> </div> <div class=\"un_borbot1grey\"></div> </div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'mainContentBody']") {
      inner("<div class=\"container\"> <div class=\"un_space\"> <div class=\"mvWhyRegisterHeader\">Why register?</div> <div>The Registry at Bloomindale's is unlike any other in the world. Here are the top 10 reasons to create a Bloomingdale's wish list.</div> </div> <div class=\"un_space\"> <a class=\"mvCreateRegistryLink\" href=\"/registry/wedding/registrysignin\">Create a Registry</a> </div> <div class=\"un_filter\"> <span class=\"un_bold\">1 - </span><span class=\"un_normal\"> Introducing your point person for all things registry-related. Our specialized consultants are here for guidance and advice on building the perfect registry. Meet your consultant at <a href=\"/store/index.ognc\">a Bloomingdale's near you.</a> </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">2 - </span><span class=\"un_normal\">In stores now: our new guide, full of effective and stylish registry pointers. With checklists and glossaries designed to put your gifts to good use, it's everything you need to know about planning your new life together. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">3 - </span><span class=\"un_normal\"> Our exclusive new tabletop tool will revolutionize the way you register. Test-drive your favorite china settings online: mix Vera Wang with Bernardaud and add a pop of Kate Spade for fun. Like what you see? Add it to your registry. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">4 - </span><span class=\"un_normal\"> Register for items from select vendors and be eligible to receive <span class=\"un_normal\">bonus gifts</span>. It doesn't stop there. You can become eligible to receive more freebies when items from select vendors are purchased from your registry. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">5 - </span><span class=\"un_normal\"> With a qualifying registry, you'll receive the ultimate in luxury when planning a vacation to one of the Leading Hotels of the World. Enjoy a couple's massage, concierge services, dinner for two, champagne and special rates (when available) and so much more. For more information, please consult a registry consultant <a href=\"/store/index.ognc\">at a Bloomingdale's near you.</a> </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">6 - </span><span class=\"un_normal\"> The best thing to hit the thank-you note scene since ink, The Registry's \"Thank You Card Manager\" is an organized list of who gave you what and when. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">7 - </span><span class=\"un_normal\"> Guests can add a personal touch by giving linens to be customized with a complimentary monogram. Simply bring your eligible items to a <a href=\"/store/index.ognc\">Bloomingdale's near you</a> to receive this service. Available in select stores. </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">8 - </span><span class=\"un_normal\"> As a Bloomingdale's registrant, you're a member of a very social set. Meet product specialists and the biggest names in the wedding industry at our <a href=\"/store/index.ognc\">exclusive events.</a> </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">9 - </span><span class=\"un_normal\"> Bloomingdale's, in partnership with Wedding Channel, will provide you with a wedding website! It's a simple way to share details up to your big day. You'll get a web address, your own theme, and be able to add photos and a guest book. <a href=\"/registry/wedding/registrymanager\">Register now with Bloomingdale's</a> to start sharing your wedding story! </span> </div> <div class=\"un_borbot1grey\"></div> <div class=\"un_filter\"> <span class=\"un_bold\">10 - </span><span class=\"un_normal\"> Bloomingdale's will give you <b>10% OFF</b> any item you registered for but didn't receive for six months following your event. </span> </div> <div class=\"un_borbot1grey\"></div> </div>")
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
  #[["attribute", "value"], ["value", "Continue Shopping"], ["selector", "#continueShopping"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'continueShopping']") {
    match($done, "no") {
      attribute("value") {
        value() {
            set("Continue Shopping")
        }
      }
    }
  }
  
  
  #gvr buttons
  #Group::URLMatcherGroup
  #[["url_matcher", "(registrant)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(registrant)/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", ".bagDivButton a"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//a") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", ".bagDivButton input.mvGreyButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//input[contains(concat(' ', @class, ' '), ' mvGreyButton ')]") {
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
    #Content::Formatting::SetInnerHTML
    #[["selector", ".bagDivButton a.mvButton"], ["html", "<div>checkout</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//a[contains(concat(' ', @class, ' '), ' mvButton ')]") {
      inner("<div>checkout</div>")
    }
    
    
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvButton"], ["selector", "#r_forgotPassword_submit"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'r_forgotPassword_submit']") {
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
  #[["selector", ".r_quicklook_columnHeader"], ["html", "<span>:</span>"], ["prepend", ""], ["append", "true"]]
  $("//*[contains(concat(' ', @class, ' '), ' r_quicklook_columnHeader ')]") {
    inner() {
      append("<span>:</span>")
    }
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
  #Content::Formatting::WrapTextChildren
  #[["selector", ".r_printEmailRegistry"], ["tag_name", "div"], ["class_name", "mvRemoveMe"], ["multiple", ""], ["split_delimiter", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' r_printEmailRegistry ')])[1]") {
    wrap_text_children("div", class: 'mvRemoveMe')
  }
  
  
  #
  #Content::Formatting::WrapTextChildren
  #[["selector", ".r_registrantInfo"], ["tag_name", "div"], ["class_name", "mvRegestrantText"], ["multiple", ""], ["split_delimiter", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' r_registrantInfo ')])[1]") {
    wrap_text_children("div", class: 'mvRegestrantText')
  }
  
  
  #
  #Content::Passthrough::Attribute
  #[["selector", "script[src*=\"registry/registryAccount.js\"]"], ["attribute", "src"], ["regex_capture", ""]]
  $("//script[contains(@src, \"registry/registryAccount.js\")]") {
    attribute("src") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #
  #Content::Passthrough::ReversePassthroughAttribute
  #[["selector", "#r_weddingWebsite > a"], ["attribute", "href"], ["regex_capture", ""]]
  # WARNING: NOT IMPLEMENTED YET
  # To implement this we need the reverse rewrite function - rewrite("host")
  # This is not trivial because the host rewrite is different - it is an array
  # of regular expressions, not just one
  #
  #
  #$("//*[@id = 'r_weddingWebsite']/a") {
  #  attribute("href") {
  #    value() {
  #      rewrite("host")
  #    }
  #  }
  #}
  # 
  #
  
  #jsPassThrough
  #Group::URLMatcherGroup
  #[["url_matcher", "(registryAccount\\.js)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(registryAccount\.js)/) {
  }
  
  #Ant Blocks
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mw_sale_price"], ["selector", "span.priceSale"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//span[contains(concat(' ', @class, ' '), ' priceSale ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mw_sale_price")
          }
        }
        }
      }
    }
    
    # Fix the registry creation popup script
    $mw_inject_script = "false"
    $("//script[contains(., 'confirmationOverlayBody')]") {
      $mw_inject_script = "true"
      remove()
    }
    match($mw_inject_script, "true") {
      $("/html/head") {
        inject(read("html/reg_script.html"))
      }
    }

$("//body[contains(concat(' ', @class, ' '), ' mvRegistry ')]") {
  $(".//a[@id='mvBDBagLinkHREF']") {
    $("./script") {
      wrap("span", id: "brownBagItemsTotal", class: "mvBagNumber")
    }
  }
  insert_javascript_bottom("x$('a[href*=\"top\"]').on('click', function(){window.scroll(0,0);})") 
  $("//div[@id='r_weddingWebsite_buttonsContainer']/input") {
    add_class("mvGreyButton")
  }
  # Remove checklist from registry
  $("//a[contains(@href,'registry/wedding/m/checklist')]") {
    remove()
  }
  
  #Fix 'Find it in store' GVR page
  $("//div[@id='srch-frm']") {
    move_here("div[@class='ovr-infrmb']")
  }
  
  #Move product details into product
  
  #Remove overlay on GVR
  #$("//img[@class='r_upcImage']") {
   # attribute("href") {
  #    remove()
  #  }
  #}
  
#  $("//a[@class='r_quickLook']") {
 #   attribute("href") {
  #    remove()
   # }
  #}

# add a back to registry manager link to BVR page
  $("//div[@id='r_itemsContainer']"){
    inject_before("<a class=\"mw_registry_manager mvGreyButton\" href=\"http://www1.bloomingdales.com/registry/wedding/registrymanager?cm_sp=NAVIGATION_REG-_-TOP_NAV-_-MANAGE\">back to registry manager</a>")
  }
}

$("//div[@class='pdp_atb_buttons']") {
  # EXPLICIT: img[@id='pdp_atb_cont_shopping']
  $("img") {
    name("div")
    add_class("mvGreyButton")
    text(fetch("@alt"))
  }
  # EXPLICIT: a[@id='pdp_atb_checkout']
  $("a") {
    add_class("mvButton")
    text(fetch("img/@alt"))
  }
}

# this is for 11f
$("//div[starts-with(@class, 'bl_nav_top_contain_outer')][*[1][not(self::div[@class='r_nav_top_bag_text'])]]") {
  move_here("div[@class='r_nav_top_bag_text']", "top")
}

# Spriting
$(".//div[@class='r_nav_top_bag_links']/a") {
  inject_bottom("<div class = 'to_be_sprited-rightArrow'></div>")
}
$(".//div[@id='mvBDBloomiesLink']/a") {
  inject_bottom("<div class = 'to_be_sprited-rightArrow'></div>")
}

# add class to the enclosure cards page
$(".//div[@id='r_enclosureCardsContainer']"){
  $("//body"){
    add_class("mw_enclosure_cards")
  }
  $(".//div[@id='r_enclosureCards_submitButtonContainer']/input"){
    add_class("mvButton")
    attribute("type", "submit")
    attribute("value", "submit")
  }
}
