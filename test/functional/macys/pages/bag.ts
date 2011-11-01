# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "merge.ognc"], ["negate", "true"]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  
  #Add ID to body
  #Content::Formatting::AddAttribute
  #[["attribute", "id"], ["value", "mvBagBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//body") {
    match($done, "no") {
        var("done", "yes")
      attribute("id") {
        value() {
            set("mvBagBody")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#cmIO_CARTZ1, #freeShippingEveryDay"]]
  $("//*[@id = 'cmIO_CARTZ1']") {
    remove()
  }
  $("//*[@id = 'freeShippingEveryDay']") {
    remove()
  }
  
  
  #Dump table
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Table::RemoveWidths
    #[]
    $("html") {
      $(".//table|.//tr|.//td") {
        attribute("width") {
          remove()
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
    #Content::CSS::RemoveStyles
    #[["selector", "div, span, a"]]
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
    $("//a") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "height"], ["selector", "div, span"]]
    $("//div") {
      attribute("height") {
        remove()
      }
    }
    $("//span") {
      attribute("height") {
        remove()
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".formColHeading:contains(\"Item\"), .formColHeading:contains(\"item\")"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' formColHeading ') and contains(., \"Item\")]") {
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
    $("//*[contains(concat(' ', @class, ' '), ' formColHeading ') and contains(., \"item\")]") {
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
    
    
  # end BasicGroup
  
  #Add MW Attributes
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "//a[@class=\"secondary\"]/../.."], ["new_tag_name", "div"], ["class_name", "mvBagBtns"]]
    $("//a[@class=\"secondary\"]/../..") {
      name("div")
      attribute("class", "mvBagBtns")
    }
    
    
    #Each Item container
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #This is for merge bag because it is missing this class.
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "checkout"], ["selector", ".mvBagBtns"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvBagBtns ')]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("checkout")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<br>"], ["add_after", ".mvBagBtns"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvBagBtns ')]") {
        inject_after("<br>")
      }
      
      
      #
      #Content::Formatting::ChunkChildren
      #[["selector", ".checkout"], ["split_tag", ""], ["chunk_tag", ""], ["split_class", ""], ["keep_split_elements", ""], ["keep_trailing_elements", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' checkout ')]") {
        $("br") {
          wrap("div") {
            move_here("preceding-sibling::*[not(@wrapper)]")
            attribute("wrapper", "true")
          }
          remove()
        }
        $("*[not(@wrapper)]") {
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
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", ".checkout > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' checkout ')]/div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvShadowBox")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRegistryItemsTitle"], ["selector", ".formColHeading"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", "img"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' formColHeading ')]") {
        match($done, "no") {
            var("conditional", "false")
              $(".//img") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          $("..") {
          attribute("class") {
            value() {
                set("mvRegistryItemsTitle")
            }
          }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvRegistryItemsTitle"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRegistryItemsTitle ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBagItemImage"], ["selector", ".mvShadowBox > div > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "img[src*=\"product\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvShadowBox ')]/div/span") {
        match($done, "no") {
            var("conditional", "false")
              $(".//img[contains(@src, \"product\")]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                set("mvBagItemImage")
            }
          }
            }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBagItemContent"], ["selector", ".mvBagItemImage"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvBagItemImage ')]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvBagItemContent")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvItemNotAvailable"], ["selector", ".formText > div:contains(\"This item is not available\")"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' formText ')]/div[contains(., \"This item is not available\")]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvItemNotAvailable")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveBr"], ["selector", "br"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//br") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvRemoveBr")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvKeepBr"], ["selector", ".mvBagItemContent br"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvBagItemContent ')]//br") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvKeepBr")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvRemoveElement, .mvRemoveBr"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveBr ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBagItemInfo"], ["selector", ".mvBagItemContent > span:nth-of-type(2)"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvBagItemContent ')]/span[position() = 2]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvBagItemInfo")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerText
    #[["selector", ".formPrice"], ["text", "Total: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' formPrice ')]") {
      inner() {
        prepend("Total: ")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerText
    #[["selector", ".bagItemPrice > div:first-of-type"], ["text", "Price: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' bagItemPrice ')]/div[position() = 1]") {
      inner() {
        prepend("Price: ")
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBagQty"], ["selector", ".formText > *[name^=\"Quantity\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' formText ')]/*[starts-with(@name, \"Quantity\")]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvBagQty")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBagQty"], ["selector", ".formText > *[name^=\"mergeQuantity\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' formText ')]/*[starts-with(@name, \"mergeQuantity\")]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvBagQty")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerText
    #[["selector", ".mvBagQty"], ["text", "Qty: "], ["match_string", ""], ["replace_string", ""], ["prepend", "true"], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' mvBagQty ')]") {
      inner() {
        prepend("Qty: ")
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBagTotalContainer"], ["selector", ".checkout + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".totalsTotal"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' checkout ')]/following-sibling::*[1]/self::div") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' totalsTotal ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvBagTotalContainer")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTotalsStandard"], ["selector", ".totalsStandard"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' totalsStandard ')]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvTotalsStandard")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBagFinalTotal"], ["selector", "span.totalsTotal"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//span[contains(concat(' ', @class, ' '), ' totalsTotal ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvBagFinalTotal")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvHideElement"], ["selector", ".mvBagTotalContainer"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".checkout:empty"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvBagTotalContainer ')]") {
      match($done, "no") {
          var("conditional", "false")
            $("//*[contains(concat(' ', @class, ' '), ' checkout ') and not (node())]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvHideElement")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvHideElement"], ["selector", ".hideTriangle"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".checkout:empty"], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' hideTriangle ')]") {
      match($done, "no") {
          var("conditional", "false")
            $("//*[contains(concat(' ', @class, ' '), ' checkout ') and not (node())]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvHideElement")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvHideElement"], ["selector", ".checkout:empty"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' checkout ') and not (node())]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvHideElement")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvHideElement"], ["selector", ".totalsStandard:empty"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' totalsStandard ') and not (node())]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvHideElement")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTitle"], ["selector", ".checkout_red_header"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' checkout_red_header ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvTitle")
          }
        }
      }
    }
    
    
    #Promote code
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPromoCode"], ["selector", "//div[@id=\"estimatedShippingContentRow\"]/preceding-sibling::div[1]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//div[@id=\"estimatedShippingContentRow\"]/preceding-sibling::div[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvPromoCode")
          }
        }
      }
    }
    
    
    #Error Message
    #Content::Formatting::MoveAfter
    #[["move_me", ".generalError"], ["after_me", ".mvTitle"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' generalError ')])[1]", "after")
    }
    
    
    #Order Summary Title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvOrederSummary\">ORDER SUMMARY</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#estimatedShippingContentRow > span"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'estimatedShippingContentRow']/span)[1]") {
      inject_before("<div class=\"mvOrederSummary\">ORDER SUMMARY</div>")
    }
    
    
  # end BasicGroup
  
  #Content
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".checkout_red_header"]]
    $("//*[contains(concat(' ', @class, ' '), ' checkout_red_header ')]") {
      move_to("..", "before")
    }
    
    
    #Shopping bag info
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPadding10"], ["selector", "//div[@class=\"checkout_red_header mvTitle\" and contains(text(), \"shopping bag\")]/following-sibling::span[1]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//div[@class=\"checkout_red_header mvTitle\" and contains(text(), \"shopping bag\")]/following-sibling::span[1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvPadding10")
          }
        }
      }
    }
    
    
    #Save item info
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", ".checkout_red_header:contains(\"saved items\") + span > div:first-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' checkout_red_header ') and contains(., \"saved items\")]/following-sibling::*[1]/self::span/div[position() = 1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvPadding0510")
          }
        }
      }
    }
    
    
    #For bag only, not merge bag
    #Group::URLMatcherGroup
    #[["url_matcher", "index\\.ognc"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /index\.ognc/) {
    
      #Save item info
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", ".generalError + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' generalError ')]/following-sibling::*[1]/self::div") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPadding0510")
            }
          }
        }
      }
      
      
    }
    
  # end BasicGroup
  
  #special offer and bonus
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "#offerTable .productThumbnail"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'offerTable']//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
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
    #[["attribute", "class"], ["value", "mvTitle"], ["selector", "#offerTable > h3"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'offerTable']/h3") {
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
    #Content::Formatting::MoveUp
    #[["move_me", "#offerTable .productThumbnail .productThumb.productThumbBorder"]]
    $("//*[@id = 'offerTable']//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' productThumbBorder ')]") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvOffersInfo"], ["selector", "#offerTable .productThumb.productThumbBorder + div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'offerTable']//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' productThumbBorder ')]/following-sibling::*[1]/self::div") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvOffersInfo")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPromoDiscount"], ["selector", ".promoDiscount"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' promoDiscount ')]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvPromoDiscount")
          }
        }
        }
      }
    }
    
    
  # end BasicGroup
  
  #find promote code
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "href"], ["value", "http://social.macys.com/mc/main.jsp?campaign_id=61&channel_id=1"], ["selector", "a[title=\"find one now\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[@title = \"find one now\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("href") {
          value() {
              set("http://social.macys.com/mc/main.jsp?campaign_id=61&channel_id=1")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "target"], ["value", "_blank"], ["selector", ".mvPromoCode a.standard:contains(\"find one now\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvPromoCode ')]//a[contains(concat(' ', @class, ' '), ' standard ') and contains(., \"find one now\")]") {
      match($done, "no") {
          var("done", "yes")
        attribute("target") {
          value() {
              set("_blank")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #replace button images
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/applyBtn.png"], ["selector", "#applyButton"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[@id = 'applyButton']") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/applyBtn.png")
      attribute('src', asset('images/buttons/apply.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/smallAddToBag.png"], ["selector", "input[value=\"ADDTOBAG_BUTTON\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@value = \"ADDTOBAG_BUTTON\"]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/smallAddToBag.png")
      attribute('src', asset('images/buttons/smallAddToBag.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueShoppingBagBtn.png"], ["selector", "input[value=\"CONTINUE_BUTTON\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@value = \"CONTINUE_BUTTON\"]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueShoppingBagBtn.png")
      attribute('src', asset('images/buttons/continueShopping.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addToCurrentBagBtn.png"], ["selector", "input[alt=\"ADD TO CURRENT BAG\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"ADD TO CURRENT BAG\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/addToCurrentBagBtn.png")
      attribute('src', asset('images/buttons/addToCurrentBag.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/chectoutBagBtn.png"], ["selector", "input[value=\"CHECKOUT_BUTTON\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@value = \"CHECKOUT_BUTTON\"]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/chectoutBagBtn.png")
      attribute('src', asset('images/buttons/checkoutBag.png'))
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/expressCheckout.png"], ["selector", "input[alt=\"EXPRESS CHECKOUT\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"EXPRESS CHECKOUT\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/expressCheckout.png")
      attribute('src', asset('images/buttons/expressCheckout.png'))
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvAddToCurrentBag"], ["selector", "input[alt=\"ADD TO CURRENT BAG\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//input[@alt = \"ADD TO CURRENT BAG\"]") {
    match($done, "no") {
      $("..") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mvAddToCurrentBag")
        }
      }
      }
    }
  }
  
  
  #Debit Card Authorization
  #Group::URLMatcherGroup
  #[["url_matcher", "debitauthorization\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /debitauthorization\.jsp/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvDebitCard"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvDebitCard")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPopupTitle"], ["selector", "img[alt=\"Debit Card Authorization\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"Debit Card Authorization\"]") {
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
    #[["selector", ".mvPopupTitle"], ["html", "<div>Debit Card Authorization</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvPopupTitle ')]") {
      inner("<div>Debit Card Authorization</div>")
    }
    
    
  }
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".myDynPopupLineHeight"], ["html", "<div class=\"mvCloseBtn\">  <a  href=\"javascript:self.close();\">close</a>&nbsp;<a href=\"javascript:self.close();\"> <img  alt=\"close this window.\" src=\"https://www.macys.com/img/misc/close_sqr.gif\"></a>  </div>"], ["prepend", ""], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' myDynPopupLineHeight ')]") {
    inner("<div class=\"mvCloseBtn\">  <a  href=\"javascript:self.close();\">close</a>&nbsp;<a href=\"javascript:self.close();\"> <img  alt=\"close this window.\" src=\"https://www.macys.com/img/misc/close_sqr.gif\"></a>  </div>")
  }
  
  
  #
  #Go directly to Order Review using your saved primary shipping and billing information.
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", "input[alt=\"EXPRESS CHECKOUT\"] + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//input[@alt = \"EXPRESS CHECKOUT\"]/following-sibling::*[1]/self::div") {
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
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvDirectVendor"], ["selector", ".mvBagItemInfo div:contains(\"Direct from vendor:\")"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' mvBagItemInfo ')]//div[contains(., \"Direct from vendor:\")]") {
    match($done, "no") {
      attribute("class") {
        value() {
            set("mvDirectVendor")
        }
      }
    }
  }
}
