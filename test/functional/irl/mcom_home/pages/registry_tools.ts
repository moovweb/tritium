# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
    add_class("mw_registry_tools")
  }

  #
  #Content::Formatting::RemoveElements
  #[["selector", ".clearFloats"]]
  $("//*[contains(concat(' ', @class, ' '), ' clearFloats ')]") {
    remove()
  }
  
  #View and guest Registry
  #Group::URLMatcherGroup
  #[["url_matcher", "(registrant|guest|addtoregistryredirected)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  
#For fix junk page after reload add reigstry page. When it doesn't find itemContainer, redirect to registrant'
  match($fake_url, /(addtoregistryredirected)/) {
    var("element_exists", "false")
     $("//div[@id = 'itemsContainer']/div") {
       var("element_exists", "true")
     }
     match($element_exists, "false") {
        export("Location", "/registry/wedding/registrant")
     }
  }
  match($fake_url, /(registrant|guest|addtoregistryredirected)/) {
  
    #Add page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvViewRegistryBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvViewRegistryBody")
          }
        }
      }
    }
    
    
    #
    #Content::CSS::AddCSS
    #[["css_path", "http://dl.dropbox.com/u/6208053/macys_v2/global.css"], ["encode_image_threshold", ""]]
    $('//html/head') {
      insert_bottom("link", rel: "stylesheet", type: "text/css", href: asset("pages/global.css", "stylesheet"))
    }
    
    
    #
    #Content::Javascript::ReplaceMatchingScriptTag
    #[["src_match", "addToBag-min.js"], ["new_src", "http://dl.dropbox.com/u/6208053/macys_v2/addToBag.js"]]
    $("(//script[contains(@src, 'addToBag-min.js')])[1]") {
      attribute("src", asset('addToBag.js', 'js'))
    }
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bvrMidAd, .clearFloats, #headerPoolArea, .messageWrapper .displayNone, #registryGiftCardAd, #registryBottomAd, .registryTableHeaderRow, #QuickTipPopup + div, .registrantMsgWebsiteArea"]]
    $("//*[contains(concat(' ', @class, ' '), ' bvrMidAd ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' clearFloats ')]") {
      remove()
    }
    $("//*[@id = 'headerPoolArea']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' messageWrapper ')]//*[contains(concat(' ', @class, ' '), ' displayNone ')]") {
      remove()
    }
    $("//*[@id = 'registryGiftCardAd']") {
      remove()
    }
    $("//*[@id = 'registryBottomAd']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' registryTableHeaderRow ')]") {
      remove()
    }
    $("//*[@id = 'QuickTipPopup']/following-sibling::*[1]/self::div") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' registrantMsgWebsiteArea ')]") {
      remove()
    }
    
    
    #registrant Info
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "#registrantHeaderInfo"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'registrantHeaderInfo']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvShadowBox")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", "#editAccLink"], ["to_end_of_me", "#registrantHeaderInfo"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//*[@id = 'registrantHeaderInfo'])[1]") {
        move_here("(//*[@id = 'editAccLink'])[1]", "bottom")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<a href=\"/registry/wedding/registryrsrhome\">Rewards program</a>"], ["add_after", "#editAccLink"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'editAccLink'])[1]") {
        inject_after("<a href=\"/registry/wedding/registryrsrhome\">Rewards program</a>")
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", "#registrantHeaderInfo > a"], ["tag_name", "div"], ["class_name", "mvDarkBtn"], ["id", ""], ["multiple", "true"]]
      $("//*[@id = 'registrantHeaderInfo']/a") {
        wrap("div") {
          attribute("class", "mvDarkBtn")
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSubTitle"], ["selector", ".sortBySelect > .registrantName"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' sortBySelect ')]/*[contains(concat(' ', @class, ' '), ' registrantName ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvSubTitle")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".mvSubTitle"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvSubTitle ')]") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvDarkBtn"], ["selector", ".saveChangesBt"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' saveChangesBt ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvDarkBtn")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRedBtn"], ["selector", ".addToBagBt"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' addToBagBt ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvRedBtn")
          }
        }
      }
    }
    
    
    #Dump table
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "table, tr"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//table") {
        name("div")
      }
      $("//tr") {
        name("div")
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "td"], ["new_tag_name", "span"], ["class_name", ""]]
      $("//td") {
        name("span")
      }
      
      
    # end BasicGroup
    
    #View Registry
    #Group::URLMatcherGroup
    #[["url_matcher", "(registrant|addtoregistryredirected)"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /(registrant|addtoregistryredirected)/) {
    
      #Page Title
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\">View Registry</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bd'])[1]") {
        inject_before("<div class=\"mvTitle\">View Registry</div>")
      }
      
      
      #Registry Category Accordian-view
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<br/>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".categoryNameRow"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' categoryNameRow ')]") {
          inject_before("<br/>")
        }
        
        
        #
        #Content::Formatting::ChunkChildren
        #[["selector", ".registryTable"], ["split_tag", ""], ["chunk_tag", ""], ["split_class", ""], ["keep_split_elements", ""], ["keep_trailing_elements", "true"]]
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]") {
          # 1. get the nodes before the splits
          $("br") {
            wrap("div") {
              move_here("preceding-sibling::*[not(@wrapper)]")
              attribute("wrapper", "true")
            }
            remove()
          }
          # 2. get the nodes after the last split
          insert_bottom("div") {
            move_here("preceding-sibling::*[not(@wrapper)]")
            attribute("wrapper", "true")
          }
          # 3. remove the wrappers that didn't get any children
          $("div[@wrapper and not(node())]") {
            remove()
          }
          $("*[@wrapper]") {
            attribute("wrapper") {
              remove()
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<br/>"], ["add_after", ""], ["multiple", "true"], ["add_before", "div[id*=\"VR_itemLevelErrorMsg\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//div[contains(@id, \"VR_itemLevelErrorMsg\")]") {
          inject_before("<br/>")
        }
        
        
        #
        #Content::Formatting::ChunkChildren
        #[["selector", ".registryTable > div"], ["split_tag", ""], ["chunk_tag", ""], ["split_class", ""], ["keep_split_elements", ""], ["keep_trailing_elements", "true"]]
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div") {
          # 1. get the nodes before the splits
          $("br") {
            wrap("div") {
              move_here("preceding-sibling::*[not(@wrapper)]")
              attribute("wrapper", "true")
            }
            remove()
          }
          # 2. get the nodes after the last split
          insert_bottom("div") {
            move_here("preceding-sibling::*[not(@wrapper)]")
            attribute("wrapper", "true")
          }
          # 3. remove the wrappers that didn't get any children
          $("div[@wrapper and not(node())]") {
            remove()
          }
          $("*[@wrapper]") {
            attribute("wrapper") {
              remove()
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRegistryCateItem"], ["selector", ".registryTable > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div/div") {
          match($done, "no") {
            attribute("class") {
              value() {
                  set("mvRegistryCateItem")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRegistryCateName"], ["selector", ".registryTable > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".categoryNameRow"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div/div") {
          match($done, "no") {
              var("conditional", "false")
                $(".//*[contains(concat(' ', @class, ' '), ' categoryNameRow ')]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
            attribute("class") {
              value() {
                  set("mvRegistryCateName")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".categoryName"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", "true"], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' categoryName ')]") {
          inner() {
            prepend("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvRegistryItemLabel\">would love: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", "input[name=\"requestedQuantities\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//input[@name = \"requestedQuantities\"]") {
        inject_before("<span class=\"mvRegistryItemLabel\">would love: </span>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span  class=\"mvRegistryItemLabel\">still need: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", "input[name=\"openQuantities\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//input[@name = \"openQuantities\"]") {
        inject_before("<span  class=\"mvRegistryItemLabel\">still need: </span>")
      }
      
      
    }
    
    #Guest Registry
    #Group::URLMatcherGroup
    #[["url_matcher", "guest"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /guest/) {
    
      #Page Title
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\">Guest Registry</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bd'])[1]") {
        inject_before("<div class=\"mvTitle\">Guest Registry</div>")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".hideTriangle"]]
      $("//*[contains(concat(' ', @class, ' '), ' hideTriangle ')]") {
        remove()
      }
      
      
      #Registry Category Accordian-guest
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvCategoryName"], ["selector", ".registryTable > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".categoryName"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div") {
          match($done, "no") {
              var("conditional", "false")
                $(".//*[contains(concat(' ', @class, ' '), ' categoryName ')]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
            attribute("class") {
              value() {
                  set("mvCategoryName")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<br/>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".mvCategoryName"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvCategoryName ')]") {
          inject_before("<br/>")
        }
        
        
        #
        #Content::Formatting::ChunkChildren
        #[["selector", ".registryTable"], ["split_tag", ""], ["chunk_tag", ""], ["split_class", ""], ["keep_split_elements", ""], ["keep_trailing_elements", "true"]]
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]") {
          # 1. get the nodes before the splits
          $("br") {
            wrap("div") {
              move_here("preceding-sibling::*[not(@wrapper)]")
              attribute("wrapper", "true")
            }
            remove()
          }
          # 2. get the nodes after the last split
          insert_bottom("div") {
            move_here("preceding-sibling::*[not(@wrapper)]")
            attribute("wrapper", "true")
          }
          # 3. remove the wrappers that didn't get any children
          $("div[@wrapper and not(node())]") {
            remove()
          }
          $("*[@wrapper]") {
            attribute("wrapper") {
              remove()
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<br/>"], ["add_after", ""], ["multiple", "true"], ["add_before", "div[id*=\"VR_itemLevelErrorMsg\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//div[contains(@id, \"VR_itemLevelErrorMsg\")]") {
          inject_before("<br/>")
        }
        
        
        #
        #Content::Formatting::ChunkChildren
        #[["selector", ".registryTable > div"], ["split_tag", ""], ["chunk_tag", ""], ["split_class", ""], ["keep_split_elements", ""], ["keep_trailing_elements", "true"]]
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div") {
          # 1. get the nodes before the splits
          $("br") {
            wrap("div") {
              move_here("preceding-sibling::*[not(@wrapper)]")
              attribute("wrapper", "true")
            }
            remove()
          }
          # 2. get the nodes after the last split
          insert_bottom("div") {
            move_here("preceding-sibling::*[not(@wrapper)]")
            attribute("wrapper", "true")
          }
          # 3. remove the wrappers that didn't get any children
          $("div[@wrapper and not(node())]") {
            remove()
          }
          $("*[@wrapper]") {
            attribute("wrapper") {
              remove()
            }
          }
        }

        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRegistryCateItem"], ["selector", ".registryTable > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div/div") {
          match($done, "no") {
            attribute("class") {
              value() {
                  set("mvRegistryCateItem")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRegistryCateName"], ["selector", ".registryTable > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".mvCategoryName"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div/div") {
          match($done, "no") {
              var("conditional", "false")
                $(".//*[contains(concat(' ', @class, ' '), ' mvCategoryName ')]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
            attribute("class") {
              value() {
                  set("mvRegistryCateName")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".categoryName"], ["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>"], ["prepend", "true"], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' categoryName ')]") {
          inner() {
            prepend("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "receivedQty"], ["selector", ".upcLineItem > span:nth-of-type(2) > .upcCellContent"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' upcLineItem ')]/span[position() = 2]/*[contains(concat(' ', @class, ' '), ' upcCellContent ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" receivedQty")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "requestedQty"], ["selector", ".upcLineItem > span:nth-of-type(3) > .upcCellContent"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' upcLineItem ')]/span[position() = 3]/*[contains(concat(' ', @class, ' '), ' upcCellContent ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" requestedQty")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".receivedQty"], ["html", "<span  class=\"mvRegistryItemLabel\">still need: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' receivedQty ')]") {
        inner() {
          prepend("<span  class=\"mvRegistryItemLabel\">still need: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".requestedQty"], ["html", "<span class=\"mvRegistryItemLabel\">would love: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' requestedQty ')]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel\">would love: </span>")
        }
      }
      
      
    }
    
    #accordian for sort by category
    #There is no QueryParameter for sort by category at the first time load the page
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "RegistryCateItemContent"], ["selector", ".mvRegistryCateItem"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvRegistryCateItem ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" RegistryCateItemContent")
            }
          }
        }
      }
      
      
      #price or still need
      #Group::QueryParameterMatcherGroup
      #[["parameter_name", "sortBy,sortBy,sortBy"], ["negate", ""], ["parameter_value", "PRICE_LOWEST_FIRST,PRICE_HIGHEST_FIRST,STILL_NEED"], ["if_present", ""]]
        var("param_matched", "false")
        match($path) {
          with(/sortBy\=PRICE_LOWEST_FIRST/) {
            var("param_matched", "true")
          }
          with(/sortBy\=PRICE_HIGHEST_FIRST/) {
            var("param_matched", "true")
          }
          with(/sortBy\=STILL_NEED/) {
            var("param_matched", "true")
          }
        }
          match($param_matched, "true") {
      
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".mvRegistryCateName"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvRegistryCateName ')]") {
          remove()
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRegistryCateItem"], ["selector", ".RegistryCateItemContent"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' RegistryCateItemContent ')]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  set("mvRegistryCateItem")
              }
            }
          }
        }
        
        
      }
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvRegistryCateName"], ["content_selector", ".RegistryCateItemContent"], ["ancestor_selector", ".registryTable > div"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' registryTable ')]/div") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' RegistryCateItemContent ')]") {
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
                append("36178")
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
        $(".//*[contains(concat(' ', @class, ' '), ' mvRegistryCateName ')]") {
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
                append("36178")
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
    #Content::Formatting::SetInnerText
    #[["selector", ".singlePrice"], ["text", "price: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' singlePrice ')]") {
      inner() {
        prepend("price: ")
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", ".mvRegistryCateItem, #bvrCompletionAd"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvRegistryCateItem ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBox")
          }
        }
      }
    }
    $("//*[@id = 'bvrCompletionAd']") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvShadowBox")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvWhiteGrayBar"], ["selector", ".categoryName"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' categoryName ')]") {
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
    #[["attribute", "class"], ["value", "mvErrorMeg "], ["selector", "#errMsg"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'errMsg']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvErrorMeg ")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapWithNextSibling
    #[["selector", ".upcImage"], ["wrapper_class", "mvRegistryItemContent"], ["sibling_count", "1"]]
    $("//*[contains(concat(' ', @class, ' '), ' upcImage ')]") {
      wrap("div") {
        attribute("class", "mvRegistryItemContent")
        move_here("(following-sibling::*)[1]", "bottom")
      }
    }
    
    
    #
    #Content::Javascript::ReplaceMatchingScriptTag
    #[["src_match", "bvr-min.js"], ["new_src", "http://dl.dropbox.com/u/9451381/moovweb/clients/macys/bvr.js"]]
    $("(//script[contains(@src, 'bvr-min.js')])[1]") {
      attribute("src", asset('bvr.js', 'js'))
    }
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<span  class=\"mvRegistryItemLabel\">purchase: </span>"], ["add_after", ""], ["multiple", "true"], ["add_before", "select[id*=\"quantity\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//select[contains(@id, \"quantity\")]") {
      inject_before("<span  class=\"mvRegistryItemLabel\">purchase: </span>")
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/checkoutBtn.png"], ["selector", ".bagDivButton input#checkout"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//input[@id = 'checkout']") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/checkoutBtn.png")
      attribute('src', asset('buttons/checkout.png', 'image'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueShoppingBtn.png"], ["selector", ".bagDivButton input#continueShopping"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' bagDivButton ')]//input[@id = 'continueShopping']") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueShoppingBtn.png")
      attribute('src', asset('buttons/continueShopping.png', 'image'))
    }
    
    # end BasicGroup
    
  }
  
  #Registry Manager
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/registrymanager"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/registrymanager/) {
  
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\">Registry Manager<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\">Registry Manager<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
    }
    
    
    #Add ID to Body
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRegistryManagerBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRegistryManagerBody")
          }
        }
      }
    }
    
    
    #Nav Bar
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapTextChildren
      #[["selector", ".topLevelItem"], ["tag_name", "div"], ["class_name", "mvRemoveElement"], ["multiple", "true"], ["split_delimiter", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' topLevelItem ')]") {
        wrap_text_children("div", class: 'mvRemoveElement')
      }
      
      
      #Remove Links
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Enclosure Cards\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"Enclosure Cards\")]") {
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
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Go Green\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"Go Green\")]") {
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
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Wedding Website\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"Wedding Website\")]") {
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
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"FAQ\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"FAQ\")]") {
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
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Benefits of Registering\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"Benefits of Registering\")]") {
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
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Gifts with Completion\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"Gifts with Completion\")]") {
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
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Registry Checklist\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"Registry Checklist\")]") {
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
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "a:contains(\"Gift with Registry\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//a[contains(., \"Gift with Registry\")]") {
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
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvTitle"], ["content_selector", "#managerNavigation"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[@id = 'managerNavigation']") {
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
              append("46768")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvTitle ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("46768")
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
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "#managerHeader, .midContainerContentHeight"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'managerHeader']") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvShadowBox")
          }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' midContainerContentHeight ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvShadowBox")
          }
        }
      }
    }
    
    
    #add/view gift img to text
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", ".goGifts img"], ["target_selector", ".goGifts"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' goGifts ')]//img)[1]") {
        var("alt", fetch("./@alt"))
        $("(//*[contains(concat(' ', @class, ' '), ' goGifts ')])[1]") {
          text($alt)
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".goGifts img"]]
      $("//*[contains(concat(' ', @class, ' '), ' goGifts ')]//img") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#managerNavigation > h4, #managerNavigation hr, .mvRemoveElement, #managerNavigation > ul > .topLevelItem:nth-of-type(2)"]]
    $("//*[@id = 'managerNavigation']/h4") {
      remove()
    }
    $("//*[@id = 'managerNavigation']//hr") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[@id = 'managerNavigation']/ul/*[contains(concat(' ', @class, ' '), ' topLevelItem ') and position() = 2]") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".topLevelItem > ul > li > a"], ["tag_name", "div"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' topLevelItem ')]/ul/li/a") {
      add_class("sprite_me-arrow_right_white")
      wrap("div") {
        attribute("class", "mvDarkGrayBar")
      }
    }
    
    
  }
  
  #Rewards
  #Group::URLMatcherGroup
  #[["url_matcher", "registryrsrhome"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryrsrhome/) {
  
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\">star rewards</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\">star rewards</div>")
    }
    
    
    #Not registered Rewards title
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#rsrNotRegisteredTitle"], ["negate", ""]]
    $("(//*[@id = 'rsrNotRegisteredTitle'])[1]") {
    
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".mvBackBtn"], ["text", "Registry home"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' mvBackBtn ')]") {
        inner() {
          set("Registry home")
        }
      }
      
      
    }
    
    
    #Add page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRewardBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRewardBody")
          }
        }
      }
    }
    
    
    #Red buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::DumpImgAltText
      #[["image_selector", ".buttonRow img"], ["target_selector", ".buttonRow a"], ["map_multiple", "true"]]
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' buttonRow ')]//img") {
        var("counter") {
          append("a")
        }
        var($counter, fetch("./@alt"))
      }
      var("counter", "a")
      $("//*[contains(concat(' ', @class, ' '), ' buttonRow ')]//a") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRedBtn"], ["selector", ".buttonRow a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' buttonRow ')]//a") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvRedBtn")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#rsrTopTitle"], ["html", "<div class=\"mvRSRtitle\"><div class=\"mvText18Red\">MACY'S REGISTRY STAR REWARDS</div><div>here's an example of how your REWARDS add up with our exclusive program...</div></div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'rsrTopTitle']") {
      inner("<div class=\"mvRSRtitle\"><div class=\"mvText18Red\">MACY'S REGISTRY STAR REWARDS</div><div>here's an example of how your REWARDS add up with our exclusive program...</div></div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".buttonRow img"]]
    $("//*[contains(concat(' ', @class, ' '), ' buttonRow ')]//img") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPadding10"], ["selector", ".tandc"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' tandc ')]") {
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
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "#bd .rounded.shadow div, #bd .rounded.shadow span,#bd .rounded.shadow img, .mvPadding10, #tandcContent"]]
    $("//*[@id = 'bd']//*[contains(concat(' ', @class, ' '), ' rounded ') and contains(concat(' ', @class, ' '), ' shadow ')]//div") {
      attribute("style") {
        remove()
      }
    }
    $("//*[@id = 'bd']//*[contains(concat(' ', @class, ' '), ' rounded ') and contains(concat(' ', @class, ' '), ' shadow ')]//span") {
      attribute("style") {
        remove()
      }
    }
    $("//*[@id = 'bd']//*[contains(concat(' ', @class, ' '), ' rounded ') and contains(concat(' ', @class, ' '), ' shadow ')]//img") {
      attribute("style") {
        remove()
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvPadding10 ')]") {
      attribute("style") {
        remove()
      }
    }
    $("//*[@id = 'tandcContent']") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "href"], ["value", "/store/index.ognc"], ["selector", "a:contains(\"in-store\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[contains(., \"in-store\")]") {
      match($done, "no") {
          var("done", "yes")
        attribute("href") {
          value() {
              set("/store/index.ognc")
          }
        }
      }
    }
    
    
    #popup close btn
    #Content::Formatting::WrapElement
    #[["selector", "#closeBtn"], ["class_name", "mvFormBtnContainer"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'closeBtn'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvFormBtnContainer")
          move_here("//*[@id = 'closeBtn'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
  }
  
  #Thank you card manager
  #Group::URLMatcherGroup
  #[["url_matcher", "registrythankyoucardmanager"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registrythankyoucardmanager/) {
  
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\">Thanks Card Manager</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\">Thanks Card Manager</div>")
    }
    
    
    #Add page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvThanksCardBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvThanksCardBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".nopadprint, thead, th.borderRight:contains(\"qty\")"]]
    $("//*[contains(concat(' ', @class, ' '), ' nopadprint ')]") {
      remove()
    }
    $("//thead") {
      remove()
    }
    $("//th[contains(concat(' ', @class, ' '), ' borderRight ') and contains(., \"qty\")]") {
      remove()
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "table, tr, th, td, tbody"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//table") {
      name("div")
    }
    $("//tr") {
      name("div")
    }
    $("//th") {
      name("div")
    }
    $("//td") {
      name("div")
    }
    $("//tbody") {
      name("div")
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".tbmark"]]
    $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]") {
      attribute("style") {
        remove()
      }
    }
    
    
    #Labels
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".tbmark > div > div:nth-of-type(2)"], ["html", "<span class=\"mvRegistryItemLabel \">Purchased by: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]/div/div[position() = 2]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel \">Purchased by: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".tbmark > div > div:nth-of-type(3)"], ["html", "<span class=\"mvRegistryItemLabel \">Category: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]/div/div[position() = 3]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel \">Category: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".tbmark > div > div:nth-of-type(4)"], ["html", "<span class=\"mvRegistryItemLabel \">Item: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]/div/div[position() = 4]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel \">Item: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".tbmark > div > div:nth-of-type(5)"], ["html", "<span class=\"mvRegistryItemLabel \">Qty: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]/div/div[position() = 5]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel \">Qty: </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".tbmark > div > div:nth-of-type(7)"], ["html", "<span class=\"mvRegistryItemLabel \">Note sent? </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]/div/div[position() = 7]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel \">Note sent? </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".tbmark > div > div:nth-of-type(6)"], ["html", "<span class=\"mvRegistryItemLabel \">Received? </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]/div/div[position() = 6]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel \">Received? </span>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".tbmark > div > div:nth-of-type(1)"], ["html", "<span class=\"mvRegistryItemLabel \">Date Purchased: </span>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' tbmark ')]/div/div[position() = 1]") {
        inner() {
          prepend("<span class=\"mvRegistryItemLabel \">Date Purchased: </span>")
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvFormBtnContainer"], ["selector", ".buttonRow"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' buttonRow ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvFormBtnContainer")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/SaveChangesBtn.png"], ["selector", ".buttonSubmitBorders"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/SaveChangesBtn.png")
      attribute('src', asset('buttons/SaveChanges.png', 'image'))
    }
    
    
  }
  
  #Enroll Rewards
  #Group::URLMatcherGroup
  #[["url_matcher", "registryrsrenroll"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryrsrenroll/) {
  
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", "#rsrEnterCardHr"], ["to_beginning_of_me", "#registryContainer"], ["map_multiple", ""], ["ancestor_selector", ""]]
    $("(//*[@id = 'registryContainer'])[1]") {
      move_here("(//*[@id = 'rsrEnterCardHr'])[1]", "top")
    }
    
    
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\">Enroll star rewards</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\">Enroll star rewards</div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".headerPane"]]
    $("//*[contains(concat(' ', @class, ' '), ' headerPane ')]") {
      remove()
    }
    
    
    #Add page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvEnrollRewardBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvEnrollRewardBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/enrollBtn.png"], ["selector", "input[alt=\"ENROLL\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"ENROLL\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/enrollBtn.png")
      attribute('src', asset('buttons/enroll.png', 'image'))
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".enterInstruct"], ["html", "<div>Enter as it appears on your credit card without any spaces or dashes.</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' enterInstruct ')]") {
      inner("<div>Enter as it appears on your credit card without any spaces or dashes.</div>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvFormBtnContainer"], ["selector", "#buttonRow"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'buttonRow']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvFormBtnContainer")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "#registryContainer div, #registryContainer span"]]
    $("//*[@id = 'registryContainer']//div") {
      attribute("style") {
        remove()
      }
    }
    $("//*[@id = 'registryContainer']//span") {
      attribute("style") {
        remove()
      }
    }
    
    
  }
  
  #Help
  #Group::URLMatcherGroup
  #[["url_matcher", "registryfaq"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registryfaq/) {
  
    #Page Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\">Help</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#bd"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'bd'])[1]") {
      inject_before("<div class=\"mvTitle\">Help</div>")
    }
    
    
    #Add page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvRegistryHelpBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvRegistryHelpBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#innerContainer > p, #innerContainer > a, .listOfContent, .backLink, #faqTitle"]]
    $("//*[@id = 'innerContainer']/p") {
      remove()
    }
    $("//*[@id = 'innerContainer']/a") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' listOfContent ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' backLink ')]") {
      remove()
    }
    $("//*[@id = 'faqTitle']") {
      remove()
    }
    
    
    #Group questions
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRewardsHelp"], ["selector", ".qa_item"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a[name*=\"item_1\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' qa_item ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//a[contains(@name, \"item_1\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                append(" mvRewardsHelp")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvManagingHelp"], ["selector", ".qa_item"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a[name*=\"item_2\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' qa_item ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//a[contains(@name, \"item_2\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                append(" mvManagingHelp")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPriceHelp"], ["selector", ".qa_item"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a[name*=\"item_3\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' qa_item ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//a[contains(@name, \"item_3\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                append(" mvPriceHelp")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRegistryHelp"], ["selector", ".qa_item"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a[name*=\"item_4\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' qa_item ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//a[contains(@name, \"item_4\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                append(" mvRegistryHelp")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGiftHelp"], ["selector", ".qa_item"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a[name*=\"item_5\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' qa_item ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//a[contains(@name, \"item_5\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                append(" mvGiftHelp")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvGiftHelp"], ["class_name", "mvHelpGroup"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvGiftHelp ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvHelpGroup")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvGiftHelp ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvRegistryHelp"], ["class_name", "mvHelpGroup"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvRegistryHelp ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvHelpGroup")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvRegistryHelp ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvPriceHelp"], ["class_name", "mvHelpGroup"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvPriceHelp ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvHelpGroup")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvPriceHelp ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvManagingHelp"], ["class_name", "mvHelpGroup"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvManagingHelp ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvHelpGroup")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvManagingHelp ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", ".mvRewardsHelp"], ["class_name", "mvHelpGroup"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvRewardsHelp ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvHelpGroup")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvRewardsHelp ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvWhiteGrayBar\">Registry Star Rewards<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvRewardsHelp"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvRewardsHelp ')])[1]") {
        inject_before("<div class=\"mvWhiteGrayBar\">Registry Star Rewards<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvWhiteGrayBar\">Managing My Registry<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvManagingHelp"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvManagingHelp ')])[1]") {
        inject_before("<div class=\"mvWhiteGrayBar\">Managing My Registry<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvWhiteGrayBar\">Products and prices<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvPriceHelp"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvPriceHelp ')])[1]") {
        inject_before("<div class=\"mvWhiteGrayBar\">Products and prices<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvWhiteGrayBar\">My Registry<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvRegistryHelp"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvRegistryHelp ')])[1]") {
        inject_before("<div class=\"mvWhiteGrayBar\">My Registry<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvWhiteGrayBar\">Giving Gifts<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvGiftHelp"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvGiftHelp ')])[1]") {
        inject_before("<div class=\"mvWhiteGrayBar\">Giving Gifts<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvWhiteGrayBar"], ["content_selector", ".qa_item"], ["ancestor_selector", ".mvHelpGroup"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvHelpGroup ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' qa_item ')]") {
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
                append("85224")
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
        $(".//*[contains(concat(' ', @class, ' '), ' mvWhiteGrayBar ')]") {
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
                append("85224")
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
    
    #question and answer accordian
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvAnswer"], ["selector", ".qa_item > a ~ *"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' qa_item ')]/a/following-sibling::*") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvAnswer")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", "a"], ["content_selector", ".mvAnswer"], ["ancestor_selector", ".qa_item"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' qa_item ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' mvAnswer ')]") {
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
                append("60440")
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
        $(".//a") {
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
                append("60440")
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
    
  }
  
  #BVR: no gift registry
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#bvrNoProductsPool"], ["negate", ""]]
  $("(//*[@id = 'bvrNoProductsPool'])[1]") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "map"]]
    $("//map") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/bvr_no_products.gif"], ["selector", "#bvrNoProductsPool img"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'bvrNoProductsPool']//img") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/bvr_no_products.gif")
      attribute('src', asset('buttons/registry/bvr_no_products.gif', 'image'))
    }
    
    
  }
  
  
  #
  #for show barcode card image
  #Content::Passthrough::Attribute
  #[["selector", "img[alt=\"Barcode\"]"], ["attribute", "src"], ["regex_capture", ""]]
  $("//img[@alt = \"Barcode\"]") {
    attribute("src") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #popup red close btn
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif"], ["selector", "#closeBtn"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//*[@id = 'closeBtn']") {
    #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/close_btn.gif")
    attribute('src', asset('buttons/close.gif', 'image'))
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
  
  
  #
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/mymacys_csa.gif"], ["selector", "img[alt=\"my macys\"]"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//img[@alt = \"my macys\"]") {
    #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/mymacys_csa.gif")
    attribute('src', asset('other/mymacys_csa.gif', 'image'))
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
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", "div > li"], ["new_tag_name", "div"], ["class_name", ""]]
  $("//div/li") {
    name("div")
  }
  
  
  #customers' top rated
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/registry\\/wedding\\/m\\/customers-top-rated"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/registry\/wedding\/m\/customers-top-rated/) {
  
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\">Customers' Top Rated</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".menu_top_normal"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' menu_top_normal ')])[1]") {
      inject_before("<div class=\"mvTitle\">Customers' Top Rated</div>")
    }
    
    
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", ".localNavigation"]]
    $("//*[contains(concat(' ', @class, ' '), ' localNavigation ')]" ) {
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
    #Content::Formatting::RemoveElements
    #[["selector", ".Creative.Content #macysGlobalLayout, .menu_spacer, .menu_parent_normal > span:first-of-type, .menu_parent_normal > span:nth-of-type(3), .menu_top_normal > span:first-of-type, br"]]
    $("//*[contains(concat(' ', @class, ' '), ' Creative ') and contains(concat(' ', @class, ' '), ' Content ')]//*[@id = 'macysGlobalLayout']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' menu_spacer ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' menu_parent_normal ')]/span[position() = 1]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' menu_parent_normal ')]/span[position() = 2]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' menu_top_normal ')]/span[position() = 1]") {
      remove()
    }
    $("//br") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".menu_top_normal a, .menu_parent_normal a"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' menu_top_normal ')]//a") {
      match($done, "no") {
        add_class("sprite_me-arrow_right_white")
        $("..") {
        attribute("class") {
          value() {
              append(" mvDarkGrayBar")
          }
        }
        }
      }
    }
    $("//*[contains(concat(' ', @class, ' '), ' menu_parent_normal ')]//a") {
      match($done, "no") {
        add_class("sprite_me-arrow_right_white")
        $("..") {
        attribute("class") {
          value() {
              append(" mvDarkGrayBar")
          }
        }
        }
      }
    }
    
    
  }
  
  
  $("//div[@id='pdpAddToBagPanel']") {
    # EXPLICIT: .../div[@class='rightCol']/div[@class='ftButtons']
    $("div[@class='bd']/div[@id='atb_content']/div[@id='atb_footer']/div[@class='rightCol']/div") {
      $("img[@id='btnContinueShopping']") {
        attribute("src", asset("buttons/continueShopping.png", "image"))
      }
      $("img[@id='btnCheckout']") {
        attribute("src", asset("buttons/checkout.png", "image"))
      }
    }
  }
}
