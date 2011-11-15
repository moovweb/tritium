# ----- ParsedHTMLBlocks ----
html() {
  
    # Add page specific class
     $("//html/body") {
          add_class("mw_offer")
        }
  
  
  #dump table
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "tr"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//tr") {
      name("div")
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "td"], ["new_tag_name", "span"], ["class_name", ""]]
    $("//td") {
      name("span")
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "table"], ["new_tag_name", "h1"], ["class_name", ""]]
    $("//table") {
      name("h1")
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "div, span, h1"]]
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
    $("//h1") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", "div, span, h1"]]
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
    $("//h1") {
      attribute("width") {
        remove()
      }
    }
    
    
  # end BasicGroup
  
  #back to bag
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBackBag mvTitle"], ["selector", "img[alt=\"Back To Bag\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"Back To Bag\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvBackBag mvTitle")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvBackBag"], ["html", "<div>&lt; Back To Bag</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvBackBag ')]") {
      inner("<div>&lt; Back To Bag</div>")
    }
    
    
  # end BasicGroup
  
  #back to product
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBackProduct mvTitle"], ["selector", "img[alt=\"Back To Product\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"Back To Product\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvBackProduct mvTitle")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvBackProduct"], ["html", "<div>&lt; Back To Product</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvBackProduct ')]") {
      inner("<div>&lt; Back To Product</div>")
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".mvTitle"], ["before_me", ".bonusOfferContentContainer"], ["map_moves", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' bonusOfferContentContainer ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]", "before")
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class=\"mvOffersPageTitle\">Special Offer Detail</div>"], ["add_after", ".mvTitle"], ["multiple", ""], ["add_before", ""], ["conditional_selector", "img[alt=\"Special Offer Detail\"]"], ["negate_conditional_selector", ""]]
  $("(//img[@alt = \"Special Offer Detail\"])[1]") {
  $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
    inject_after("<div class=\"mvOffersPageTitle\">Special Offer Detail</div>")
  }
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<div class=\"mvOffersPageTitle\">Bonus Offer Detail</div>"], ["add_after", ".mvTitle"], ["multiple", ""], ["add_before", ""], ["conditional_selector", "img[alt=\"Bonus Offer Detail\"]"], ["negate_conditional_selector", ""]]
  $("(//img[@alt = \"Bonus Offer Detail\"])[1]") {
  $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
    inject_after("<div class=\"mvOffersPageTitle\">Bonus Offer Detail</div>")
  }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "br, img[alt=\"Bonus Offer Detail\"], img[alt=\"Special Offer Detail\"], .productThumb.productThumbBorder +h1 > div:first-child"]]
  $("//br") {
    remove()
  }
  $("//img[@alt = \"Bonus Offer Detail\"]") {
    remove()
  }
  $("//img[@alt = \"Special Offer Detail\"]") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' productThumbBorder ')]/following-sibling::*[1]/self::h1/*[position() = 1 and self::div]") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "href"], ["selector", "#zoomHrefImage"]]
  $("//*[@id = 'zoomHrefImage']") {
    attribute("href") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvOfftersProductContent"], ["selector", "//span[@class=\"productDetailShort\"]/../../.."], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//span[@class=\"productDetailShort\"]/../../..") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvOfftersProductContent")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvOtherOffersTitle"], ["selector", "img[title=\" Other Offers Related To This Product\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//img[@title = \" Other Offers Related To This Product\"]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvOtherOffersTitle")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".mvOtherOffersTitle"], ["html", "<div>Other Offers Related To This Product</div>"], ["prepend", ""], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvOtherOffersTitle ')]") {
    inner("<div>Other Offers Related To This Product</div>")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvOtherQualifyTitle"], ["selector", "img[title*=\"Other Offers You Qualify For\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//img[contains(@title, \"Other Offers You Qualify For\")]") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            set("mvOtherQualifyTitle")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".mvOtherQualifyTitle"], ["html", "<div>Other Offers You Qualify For</div>"], ["prepend", ""], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvOtherQualifyTitle ')]") {
    inner("<div>Other Offers You Qualify For</div>")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvOtherOffersItemWrapper"], ["selector", "h1[bgcolor=\"#F1F1F1\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//h1[@bgcolor = \"#F1F1F1\"]") {
    match($done, "no") {
      attribute("class") {
        value() {
            set("mvOtherOffersItemWrapper")
        }
      }
    }
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "align"], ["selector", "span, div"]]
  $("//span") {
    attribute("align") {
      remove()
    }
  }
  $("//div") {
    attribute("align") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::ReplaceTag
  #[["selector", ".mvOfftersProductContent li"], ["new_tag_name", "div"], ["class_name", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvOfftersProductContent ')]//li") {
    name("div")
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvOfferColorIcon"], ["selector", ".productThumb.productThumbBorder +h1"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' productThumb ') and contains(concat(' ', @class, ' '), ' productThumbBorder ')]/following-sibling::*[1]/self::h1") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvOfferColorIcon")
        }
      }
    }
  }
  
  
  #remove Back Product for app
  #Group::CookieMatcherGroup
  #[["cookie_name", "ishop_app"], ["cookie_value_regex", ""], ["no_cookie_counts", ""], ["any", ""]]
  var("run_group", "false")
      # match if the cookie is found
      match($cookie, /ishop_app/) {
        var("run_group", "true")
      }
  match($run_group, "true") {
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvBackProduct"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvBackProduct ')]") {
      remove()
    }
    
    
  }
  
}
