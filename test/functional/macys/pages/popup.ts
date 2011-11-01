
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
@import base.ts



# ----- ParsedHTMLBlocks ----
html() {
   
    # Add page specific class
     $("//html/body") {
          add_class("mw_popup")
        }
  
  #
  #Content::Formatting::Table::RemoveWidths
  #[]
  $("//body") {
    $(".//span[@class='text14']/a"){
      attribute("href"){
        value(){
          replace(/openLink/, "open")
        }
      }
    }
    $(".//table|.//tr|.//td") {
      attribute("width") {
        remove()
      }
    }
  }
  
  #remove spacer image
  #Content::Formatting::RemoveImages
  #[["original_src_path", "http://www1.macys.com/img/spacer.gif"]]
  $("//img[substring(@src, string-length(@src) - 35, 36) = 'http://www1.macys.com/img/spacer.gif']") {
    remove()
  }
  
  
  #Dump table
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", ".popupTable"]]
    $("//*[contains(concat(' ', @class, ' '), ' popupTable ')]" ) {
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
    
    
    #
    #Content::CSS::RemoveStyleProperty
    #[["property_name", "width"], ["selector", "div, span"]]
    $("//div[@style]") {
      attribute("style") {
        value() {
          replace(/width[^;]+(;|$)/, "")
        }
      }
    }
    $("//span[@style]") {
      attribute("style") {
        value() {
          replace(/width[^;]+(;|$)/, "")
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvPopupClose"], ["selector", "a:contains(\"close\")"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//a[contains(., \"close\")]") {
    match($done, "no") {
      $("..") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mvPopupClose")
        }
      }
      }
    }
  }
  
  
  #registryRecommended_popup
  #Group::URLMatcherGroup
  #[["url_matcher", ".*?registry.*?_popup\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /.*?registry.*?_popup\.jsp/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPopupClose"], ["selector", "img[title=\"close\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@title = \"close\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvPopupClose")
          }
        }
        }
      }
    }
    
    
  }
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "style"], ["selector", ".mvPopupClose"]]
  $("//*[contains(concat(' ', @class, ' '), ' mvPopupClose ')]") {
    attribute("style") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".popupBranding"], ["html", "<img  src=\"https://moovweb-gage.s3.amazonaws.com/yupu/macys/macys_logo.png\" width=\"120px\" height=\"33px\" alt=\"Macy's\" title=\"Macy's\" border=\"0\" class=\"mvLogo\">"], ["prepend", ""], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' popupBranding ')]") {
    #inner("<img  src=\"https://moovweb-gage.s3.amazonaws.com/yupu/macys/macys_logo.png\" width=\"120px\" height=\"33px\" alt=\"Macy's\" title=\"Macy's\" border=\"0\" class=\"mvLogo\">")
    inner("")
    #insert("img", src: asset('images/logo.png'), width: "120px", height: "33px", alt: "Macy's", title: "Macy's", border: "0", class: "mvLogo")
    insert("div", alt: "Macy's", title: "Macy's", border: "0", class: "mvLogo sprite_me-logo")
  }
  
  
  #size chart
  #Group::URLMatcherGroup
  #[["url_matcher", "size\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /size\.jsp/) {
  
    #Add Class for big contaner
    #Add this class on top level of div. Use it as conditional selector.
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSizeChart"], ["selector", ".popupTable"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "h1:contains(\"size chart\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' popupTable ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//h1[contains(., \"size chart\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvSizeChart")
          }
        }
          }
      }
    }
    
    
    #Remove horizontal line, br, title
    #Content::Formatting::RemoveElements
    #[["selector", ".mvSizeChart .standard > div:first-of-type, .mvSizeChart br"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvSizeChart ')]//*[contains(concat(' ', @class, ' '), ' standard ')]/div[position() = 1]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvSizeChart ')]//br") {
      remove()
    }
    
    
  }
  
  #rug gallery popup
  #Group::URLMatcherGroup
  #[["url_matcher", "rugs_popup\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /rugs_popup\.jsp/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCloseBtn"], ["selector", "img[title=\"close\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@title = \"close\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCloseBtn")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvCloseBtn"], ["html", "<div> <a href=\"javascript:self.close();\">close</a>&nbsp;<a href=\"javascript:self.close();\"> <img alt=\"close this window.\" src=\"http://www1.macys.com/img/misc/close_sqr.gif\"></a> </div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCloseBtn ')]") {
      inner("<div> <a href=\"javascript:self.close();\">close</a>&nbsp;<a href=\"javascript:self.close();\"> <img alt=\"close this window.\" src=\"http://www1.macys.com/img/misc/close_sqr.gif\"></a> </div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img[src*=\"rugs_popup\"]"]]
    $("//img[contains(@src, \"rugs_popup\")]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", "div, span"]]
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
    #Content::Formatting::SetInnerHTML
    #[["selector", "#doc3 > div > div > div:nth-of-type(3)"], ["html", "<div class=\"mvPopupTitle\">Find your area rug in store</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'doc3']/div/div/div[position() = 3]") {
      inner("<div class=\"mvPopupTitle\">Find your area rug in store</div>")
    }
    
    
   
    
    
  }
  
}
