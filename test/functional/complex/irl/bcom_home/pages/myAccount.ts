





#
#Content::Raw::RegexReplace
#[["match", "(,https:\\/\\/www\\.bloomingdales\\.com)"], ["replace", ","], ["multiline", ""]]




# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts


# ----- ParsedHTMLBlocks ----
#html() {
  #myOnlineAccount
  #Group::URLMatcherGroup
  #[["url_matcher", "(myinfo\\/index)|(credit\\/index)"], ["negate", ""]]
/*  # This is a 'fake' url because it has http when it might mean https
  inner(){
    replace(/(,https:\/\/www\.bloomingdales\.com)/, ",")
  }
  */
# $("//div[@class='bl_breadcrumb_object']//script") {
#   dump()
#   inner() {
#     #replace(/<\/a>.*>/, "</a>")
#   } 
#   dump()  
# }
# log("=================================") 
 

#  $("//script[not(parent::div[@class='bl_breadcrumb_object'])]") {
#    remove()
#  }

  #putting all the raw blocks inside an html scope so i can get rid of the html tag
  $("//script"){
     text(){
       #regex capture - remove first item in breadcrumb
       #Content::Raw::RegexReplaceCapture
       #[["match", "for\\s+?\\(var\\s+?i=(0);\\s+?i<NameArray\\."], ["replace", "1"], ["multiline", ""]]
     #replace(/for\s+?\(var\s+?i=0;\s+?i<NameArray\./, "for \(var i=1; i<NameArray\.")

     #  replace("(function cT\(e\) {)") {
     #    replace($1,"function ceT\(e\) {")
     #  }
      
      # ----- RawHTMLBlocks ----
      #
      #Content::Raw::RegexReplaceCapture
      #[["match", "UrlArray.*(http.*bloomingdales\\.com\\/)"], ["replace", "/"], ["multiline", ""]]
      replace(/UrlArray.*(http.*bloomingdales\.com\/)/) {
        replace($1, "/")
      }
    }

  }
# $("//div[@class='bl_breadcrumb_object']//script") {
#   dump()  
# }
 
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }



  match($fake_url, /(myinfo\/index)|(credit\/index)/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", ".bl_mainContent_register_button a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent_register_button ')]//a") {
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
    #[["attribute", "class"], ["value", "mvButton"], ["selector", ".bl_mainContent_sign_button a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent_sign_button ')]//a") {
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
    #[["selector", ".bl_mainContent_sign_button a"], ["html", "Sign In"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent_sign_button ')]//a") {
      inner("Sign In")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".bl_mainContent_register_button a"], ["html", "Register"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent_register_button ')]//a") {
      inner("Register")
    }
    
    
    #credit services link
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::MoveAfter
      #[["move_me", "#ln_creditServices"], ["after_me", ".bl_lineThrough"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_lineThrough ')])[1]") {
        move_here("(//*[@id = 'ln_creditServices'])[1]", "after")
      }
      
      
      #
      #Content::Formatting::WrapWithNextSibling
      #[["selector", "#ln_crApply"], ["wrapper_class", "mvCreditLinkWrap"], ["sibling_count", "7"]]
      $("//*[@id = 'ln_crApply']") {
        wrap("div") {
          attribute("class", "mvCreditLinkWrap")
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
      #Content::Formatting::MoveAfter
      #[["move_me", ".mvCreditLinkWrap"], ["after_me", ".cr_header_noborder"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' cr_header_noborder ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvCreditLinkWrap ')])[1]", "after")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvCredidService"], ["selector", "#ln_creditServices"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'ln_creditServices']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvCredidService")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  }
  
  #pass through base tag href attribute
  #Content::Passthrough::Attribute
  #[["selector", "base"], ["attribute", "href"], ["regex_capture", ""]]
  $("//base") {
    attribute("href") {
      value() {
        rewrite("link")
      }
    }
  }
  
  
  #
  #Content::CSS::AddCSS
  #[["css_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/myAccount.css"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", href: asset("pages/myAccount.css", "stylesheet"))
  #  insert_bottom("link", rel: "stylesheet", type: "text/css", href: "http://dl.dropbox.com/u/19014985/projects/bloomingdales/myAccount.css")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#rightRail"]]
  $("//*[@id = 'rightRail']") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#BC_Content_gno"]]
  $("//*[@id = 'BC_Content_gno']") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#rn_PageContent li img"]]
  $("//*[@id = 'rn_PageContent']//li//img") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveAttribute
  #[["attribute", "width"], ["selector", "*"]]
  $("//*") {
    attribute("width") {
      remove()
    }
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", ".bl_cs_banner"]]
  $("//*[contains(concat(' ', @class, ' '), ' bl_cs_banner ')]") {
    remove()
  }
  
  
  #myAccount index
  #Group::URLMatcherGroup
  #[["url_matcher", "myinfo\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /myinfo\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMyAccount"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvMyAccount")
          }
        }
      }
    }
    
    
  }
  
  #customer service
  #Group::URLMatcherGroup
  #[["url_matcher", "app"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /app/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCustomerService"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCustomerService")
          }
        }
      }
    }
    
    
  }
  
  #Credit Service
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
    #[["attribute", "class"], ["value", "body"], ["selector", "mvCreditServicesTitle"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//mvCreditServicesTitle") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("body")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "//span[@class = \"cr_callout_large_black_txt\"][contains(., \"Insider Benefits\")]/../.."], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//span[@class = \"cr_callout_large_black_txt\"][contains(., \"Insider Benefits\")]/../..") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".cr_css_disclamer"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' cr_css_disclamer ')]") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "//div[@class = \"cr_box_header\"][contains(., \"Bloomingdale's\")]/../../.."], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//div[@class = \"cr_box_header\"][contains(., \"Bloomingdale's\")]/../../..") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvRemoveMe")
          }
        }
      }
    }
    
    
  }
  
  #Credit Service - my account
  #Group::URLMatcherGroup
  #[["url_matcher", "(credit\\/account)|(credit\\/onlinestatements)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(credit\/account)|(credit\/onlinestatements)/) {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".cr_box_css_section_right"]]
    $("//*[contains(concat(' ', @class, ' '), ' cr_box_css_section_right ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMyCreditAccount"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvMyCreditAccount")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".cr_onlineStatement_backToSummary a"], ["html", "Back To Account Summary"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' cr_onlineStatement_backToSummary ')]//a") {
      inner("Back To Account Summary")
    }
    
    
    #make a payment button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "button"], ["selector", "input.mvButton"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[contains(concat(' ', @class, ' '), ' mvButton ')]") {
        match($done, "no") {
          attribute("type") {
            value() {
                set("button")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "make a payment"], ["selector", "input.mvButton"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[contains(concat(' ', @class, ' '), ' mvButton ')]") {
        match($done, "no") {
          attribute("value") {
            value() {
                set("make a payment")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvBoxHeader"], ["selector", "#cr_main_left .cr_box_header_twoLine"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'cr_main_left']//*[contains(concat(' ', @class, ' '), ' cr_box_header_twoLine ')]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvBoxHeader")
        }
      }
    }
  }
  
  
  
  #viewMyStatement
  #Group::URLMatcherGroup
  #[["url_matcher", "(credit\\/onlinestatements)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(credit\/onlinestatements)/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvStatement"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvStatement")
          }
        }
      }
    }
    
    
  }
  
  #customerService
  #Group::URLMatcherGroup
  #[["url_matcher", "customerservice\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /customerservice\/index/) {
  
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
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_cs_item img"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_cs_item ')]//img") {
      remove()
    }
    
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    
  }
  
  #contactUs
  #Group::URLMatcherGroup
  #[["url_matcher", "(contact\\/index)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(contact\/index)/) {
  
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "align"], ["selector", "*"]]
    $("//*") {
      attribute("align") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".cu_form textarea"]]
    $("//*[contains(concat(' ', @class, ' '), ' cu_form ')]//textarea") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
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
    #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
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
    #[["attribute", "value"], ["value", "submit"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGreyButton"], ["selector", "img[name=\"RESET_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@name = \"RESET_BUTTON\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvGreyButton")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvGreyButton"], ["html", "reset"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvGreyButton ')]") {
      inner("reset")
    }
    
    
  }
  
  #contact credit services
  #Group::URLMatcherGroup
  #[["url_matcher", "(credit\\/contactus\\/index)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(credit\/contactus\/index)/) {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "img[src*=\"img/spacer.gif\"]"]]
    $("//img[contains(@src, \"img/spacer.gif\")]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvContactCreditServices"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvContactCreditServices")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvThanksText"], ["selector", ".bl_cu_mainContent > div:nth-of-type(3)"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_cu_mainContent ')]/div[position() = 3]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvThanksText")
          }
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
    #Content::Formatting::WrapTextChildren
    #[["selector", ".bl_mainContent_column_text"], ["tag_name", "span"], ["class_name", "mvWrapedText"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_mainContent_column_text ')])[1]") {
      wrap_text_children("span", class: 'mvWrapedText')
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_mainContent_column_text > a:first-of-type"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent_column_text ')]/a[position() = 1]") {
      remove()
    }
    
    
  }
  
  #myProfile
  #Group::URLMatcherGroup
  #[["url_matcher", "(\\/profile\\/)"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /(\/profile\/)/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvProfileManager"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvProfileManager")
          }
        }
      }
    }
    
    
    #formatTables
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvZipAndBirthday"], ["selector", ".cr_box_body > table:last-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' cr_box_body ')]/table[position() = last()]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvZipAndBirthday")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvAccountInfo"], ["selector", ".cr_box_body > table:first-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' cr_box_body ')]/table[position() = 1]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvAccountInfo")
            }
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
      
      
    # end BasicGroup
    
    #format Buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "[alt=\"Save\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@alt = \"Save\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvButton")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", "[alt=\"Save\"]"], ["duplicate_target", ".mvButton"], ["attribute", "onclick"], ["multiple", ""], ["ancestor", ""]]
      $("(//*[@alt = \"Save\"])[1]") {
        var("duplicate_attribute", fetch("./@onclick"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvButton ')])[1]") {
          attribute("onclick", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvButton"], ["html", "Save"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
        inner("Save")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGreyButton"], ["selector", "[alt=\"Cancel\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@alt = \"Cancel\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvGreyButton")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", "[alt=\"Cancel\"]"], ["duplicate_target", ".mvGreyButton"], ["attribute", "onclick"], ["multiple", ""], ["ancestor", ""]]
      $("(//*[@alt = \"Cancel\"])[1]") {
        var("duplicate_attribute", fetch("./@onclick"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvGreyButton ')])[1]") {
          attribute("onclick", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvGreyButton"], ["html", "Cancel"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvGreyButton ')]") {
        inner("Cancel")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".cr_tc_electronic + div"], ["to_beginning_of_me", "#cr_goGreenTC"], ["map_multiple", "true"], ["ancestor_selector", ""]]
    # var("counter", "a")
    # $("//*[@id = 'cr_goGreenTC']") {
    #   var("counter") {
    #     append("a")
    #   }
    #   attribute("id734", $counter)
    # }
    # var("counter", "a")
    # $("//*[contains(concat(' ', @class, ' '), ' cr_tc_electronic ')]/following-sibling::*[1]/self::div") {
    #   var("counter") {
    #     append("a")
    #   }
    #   var("xpath") {
    #     set("//*[@id734 = '")
    #     append($counter)
    #     append("']")
    #   }
    #   move_to($xpath, "top")
    # }
    # 
    
    #
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", ".goGreenChkBox"], ["to_beginning_of_me", ".goGreenChkBox + .goGreenChkBox_label"], ["map_multiple", "true"], ["ancestor_selector", ""]]
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' goGreenChkBox ')]/following-sibling::*[1]/self::*[contains(concat(' ', @class, ' '), ' goGreenChkBox_label ')]") {
      var("counter") {
        append("a")
      }
      attribute("id2795", $counter)
    }
    var("counter", "a")
    $("//*[contains(concat(' ', @class, ' '), ' goGreenChkBox ')]") {
      var("counter") {
        append("a")
      }
      var("xpath") {
        set("//*[@id2795 = '")
        append($counter)
        append("']")
      }
      move_to($xpath, "top")
    }
    
    
  }
  
  #wallet
  #Group::URLMatcherGroup
  #[["url_matcher", "wallet"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /wallet/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvWallet"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvWallet")
          }
        }
      }
    }
    
    
    #format Buttons
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "[name=\"SAVE_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"SAVE_BUTTON\"]") {
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
      #[["attribute", "class"], ["value", "mvSaveButtonBox"], ["selector", "[name=\"SAVE_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"SAVE_BUTTON\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvSaveButtonBox")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "Save Card"], ["selector", "[name=\"SAVE_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"SAVE_BUTTON\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Save Credit Card Information")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "[name=\"SAVE_BUTTON\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"SAVE_BUTTON\"]") {
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
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "[name=\"ADD_CARD_BUTTON\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"ADD_CARD_BUTTON\"]") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                append(" mvButton")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".bl_mainContent_form_button_left > a"], ["html", "Add Credit Card"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent_form_button_left ')]/a") {
        inner("Add Credit Card Information")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvButton img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]//img") {
      remove()
    }
    
    
  }
  
  #wishlist
  #Group::URLMatcherGroup
  #[["url_matcher", "wishlist"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /wishlist/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSortBy"], ["selector", ".bl_mainContent > table:first-of-type"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent ')]/table[position() = 1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvSortBy")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvWishlistItems"], ["selector", ".bl_mainContent > table:nth-of-type(2)"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent ')]/table[position() = 2]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvWishlistItems")
          }
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
    
    
    #remove
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all# end BasicGroup
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvWishlistItems > div:first-of-type"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvWishlistItems ')]/div[position() = 1]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvWishlistItems > div:nth-of-type(2)"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvWishlistItems ')]/div[position() = 2]") {
      remove()
    }
    
    
  }
  
  #orderStatus
  #Group::URLMatcherGroup
  #[["url_matcher", "order"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /order/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvOrderStatus"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvOrderStatus")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTable"], ["selector", "table"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//table") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvTable")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".shippingTable"]]
    $("//*[contains(concat(' ', @class, ' '), ' shippingTable ')]") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "style"], ["selector", ".shippingTable *"]]
    $("//*[contains(concat(' ', @class, ' '), ' shippingTable ')]//*") {
      attribute("style") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::SetAttribute
    #[["selector", ".shippingTable > tr[nth-of-type(2)] > td"], ["attribute_name", "colspan"], ["match", "2"], ["replace", "3"]]
    $("//*[contains(concat(' ', @class, ' '), ' shippingTable ')]/tr[position() = 2]/td") {
      attribute("colspan") {
        value() {
          replace("2", "3")
        }
      }
    }
    
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    
    #sign in button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", ".myOrder_sign_button a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' myOrder_sign_button ')]//a") {
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
      #[["selector", ".myOrder_sign_button a"], ["html", "sign in"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' myOrder_sign_button ')]//a") {
        inner("sign in")
      }
      
      
    # end BasicGroup
    
    #viewOrderButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"VIEWORDER_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"VIEWORDER_BUTTON\"]") {
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
      #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"VIEWORDER_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"VIEWORDER_BUTTON\"]") {
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
      #[["attribute", "value"], ["value", "view order"], ["selector", "input[name=\"VIEWORDER_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"VIEWORDER_BUTTON\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("view order status")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".bl_breadcrumb_object"], ["after_me", ".myOrder_title"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' myOrder_title ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvOrderAccountInfo"], ["selector", "form[name=\"orderStatusForm\"] > table"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//form[@name = \"orderStatusForm\"]/table") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvOrderAccountInfo")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", "form[name=\"orderStatusForm\"] > table"]]
    $("//form[@name = \"orderStatusForm\"]/table" ) {
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
    
    
  }
  
  #myAddressBook
  #Group::URLMatcherGroup
  #[["url_matcher", "address"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /address/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvAddressBookBody"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvAddressBookBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".bl_cu_mainContent"], ["tag_name", "div"], ["class_name", "mvWrappedText"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_cu_mainContent ')])[1]") {
      wrap_text_children("div", class: 'mvWrappedText')
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvAddressBook"], ["selector", ".bl_main"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_main ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvAddressBook")
          }
        }
      }
    }
    
    
    #addButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"ADD_ADDRESS_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"ADD_ADDRESS_BUTTON\"]") {
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
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"ADD_ADDRESS_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"ADD_ADDRESS_BUTTON\"]") {
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
      #[["attribute", "value"], ["value", "Add Address"], ["selector", "input[name=\"ADD_ADDRESS_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"ADD_ADDRESS_BUTTON\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("Add Address")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #submitButton
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", "save address"], ["selector", "input[name=\"SAVE_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"SAVE_BUTTON\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("save address")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"SAVE_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"SAVE_BUTTON\"]") {
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
      #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"SAVE_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@name = \"SAVE_BUTTON\"]") {
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
  
  #furnature
  #Group::URLMatcherGroup
  #[["url_matcher", "furniture"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /furniture/) {

    #fix furniture & mattress delivery status span format
    $("//div[@class='bl_cu_mainContent']/span[2]") {
      attribute("id") {
        value() {
          set("please_note")
        }
      }
    }
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvFurnature"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvFurnature")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "[alt*=\"Furniture and Mattress\"]"]]
    $("//*[contains(@alt, \"Furniture and Mattress\")]") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMainBox"], ["selector", ".bl_main"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_main ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvMainBox")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"SUBMIT_BUTTON\"]") {
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
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"SUBMIT_BUTTON\"]") {
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
    #[["attribute", "value"], ["value", "submit"], ["selector", "[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"SUBMIT_BUTTON\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "src"], ["selector", "[name=\"SUBMIT_BUTTON\"]"]]
    $("//*[@name = \"SUBMIT_BUTTON\"]") {
      attribute("src") {
        remove()
      }
    }
    
    
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvButton"], ["selector", ".cr_box_css_body > a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' cr_box_css_body ')]/a") {
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
  #Content::Formatting::WrapWithNextSibling
  #[["selector", ".cr_css_images > .cr_css_extraTxt"], ["wrapper_class", "mvCreditCardDescription"], ["sibling_count", "1"]]
  $("//*[contains(concat(' ', @class, ' '), ' cr_css_images ')]/*[contains(concat(' ', @class, ' '), ' cr_css_extraTxt ')]") {
    wrap("div") {
      attribute("class", "mvCreditCardDescription")
      move_here("(following-sibling::*)[1]", "bottom")
    }
  }
  
  
  #creditServices
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
    #[["attribute", "class"], ["value", "mvCreditServices"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvCreditServices")
          }
        }
      }
    }
    
    $("//div[contains(@class, 'bl_sideNav_level1_child')]"){
      attribute("class", "mw_credit_link")
      attribute("id") {
         remove()
      }
    }
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", "//span[@class=\"cr_callout_black_txt\"][contains(.,\"Fiserv\")]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//span[@class=\"cr_callout_black_txt\"][contains(.,\"Fiserv\")]") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvRemoveMe")
          }
        }
      }
    }
    
    
  }
  
  #applyForCard
  #Group::URLMatcherGroup
  #[["url_matcher", "applynow\\/creditapp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /applynow\/creditapp/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMainBox"], ["selector", ".bl_main"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_main ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvMainBox")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvHeaderImg"], ["selector", ".bl_mainContent > img"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent ')]/img") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvHeaderImg")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".mvHeaderImg"], ["class_name", "mvHeaderWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mvHeaderImg ')])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvHeaderWrapper")
          move_here("//*[contains(concat(' ', @class, ' '), ' mvHeaderImg ')][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #reset button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "reset"], ["add_after", ".formButtonContainer > a > img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' formButtonContainer ')]/a/img)[1]") {
        inject_after("reset")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".formButtonContainer > a > img"]]
      $("//*[contains(concat(' ', @class, ' '), ' formButtonContainer ')]/a/img") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGreyButton"], ["selector", ".formButtonContainer a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' formButtonContainer ')]//a") {
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
    
    #submit button
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "src"], ["selector", "[name=\"SUBMIT_BUTTON\"]"]]
      $("//*[@name = \"SUBMIT_BUTTON\"]") {
        attribute("src") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "type"], ["value", "submit"], ["selector", "[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"SUBMIT_BUTTON\"]") {
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
      #[["attribute", "class"], ["value", "mvButton"], ["selector", "[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@name = \"SUBMIT_BUTTON\"]") {
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
  
  #payCreditBill
  #Group::URLMatcherGroup
  #[["url_matcher", "credit\\/paybill"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /credit\/paybill/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPayMyBill"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvPayMyBill")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//div[@class=\"cr_box_header\"][contains(., \"Fiserv\")]/../../.."]]
    $("//div[@class=\"cr_box_header\"][contains(., \"Fiserv\")]/../../..") {
      remove()
    }
    
    
    #add button classes
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGreyButton mvStoreLocator"], ["selector", "img[src*=\"storeLocator.gif\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[contains(@src, \"storeLocator.gif\")]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvGreyButton mvStoreLocator")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvEnrollNow"], ["selector", "img[src*=\"enrollNow.gif\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[contains(@src, \"enrollNow.gif\")]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvButton mvEnrollNow")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvGreyButton mvAlreadyEnrolled"], ["selector", "img[src*=\"alreadyEnrolled.gif\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[contains(@src, \"alreadyEnrolled.gif\")]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvGreyButton mvAlreadyEnrolled")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvButton mvQuickPay"], ["selector", "img[src*=\"quickPay.gif\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[contains(@src, \"quickPay.gif\")]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvButton mvQuickPay")
            }
          }
          }
        }
      }
      
      
    # end BasicGroup
    
    #remove button images
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvEnrollNow"], ["html", "Enroll Now"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvEnrollNow ')]") {
        inner("Enroll Now")
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvGreyButton"], ["html", "Already Enrolled"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvGreyButton ')]") {
        inner("Already Enrolled")
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvStoreLocator"], ["html", "Store Locator"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvStoreLocator ')]") {
        inner("Store Locator")
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".mvQuickPay"], ["html", "Quick Pay"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvQuickPay ')]") {
        inner("Quick Pay")
      }
      
      
    # end BasicGroup
    
  }
  
  #credit ez-pay
  #Group::URLMatcherGroup
  #[["url_matcher", "credit\\/ezpay\\/select"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /credit\/ezpay\/select/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvEzPay"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvEzPay")
          }
        }
      }
      $("//div[@class='cr_box_header']") {
        move_here("div[@class='cr_box_header_comment']")
      }
      $('//form/../../span[contains(@class, cr_callout_large_txt)]'){
        move_to("//form[@name = 'EZselect_form']", "before")
      }
      $('//div/div[contains(@class, "cr_payBill_disclosure_cta_right")]/../../..'){
        move_to("//form[@name = 'EZselect_form']", "bottom")
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".chat_quickPay_reactiveChatLinkContainer"]]
    $("//*[contains(concat(' ', @class, ' '), ' chat_quickPay_reactiveChatLinkContainer ')]") {
      remove()
    }
    
    
  }
  
  #activateCard
  #Group::URLMatcherGroup
  #[["url_matcher", "credit\\/activation"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /credit\/activation/) {
  
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "src"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"]]
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
      attribute("src") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvActivateMyCard"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvActivateMyCard")
          }
        }
        $(".//div[@class='bd']") {
          insert_top("div", "If you have received a Bloomingdale's American Express card as a replacement to your Bloomingdale's Visa card, please follow these steps to activate your new Bloomingdale's American Express account.")
          insert_bottom("div", class: "mw_bd1")
          insert_bottom("div", class: "mw_bd2")
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
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
    #[["attribute", "value"], ["value", "Submit"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("Submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "input[name=\"SUBMIT_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = \"SUBMIT_BUTTON\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvButton")
          }
        }
      }
    }
    
    
  }
  
  #gift card balance
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/gift\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/gift\//) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGiftCard"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvGiftCard")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "submit"], ["selector", "[name=\"CHECK_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"CHECK_BUTTON\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("submit")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "[name=\"CHECK_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"CHECK_BUTTON\"]") {
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
    #[["attribute", "class"], ["value", "mvTitle"], ["selector", ".bl_breadcrumb_object + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')]/following-sibling::*[1]/self::div") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", "[name=\"CHECK_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"CHECK_BUTTON\"]") {
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
    #Content::Formatting::RemoveAttribute
    #[["attribute", "src"], ["selector", ".bl_mainContentFormNumberValue > input"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContentFormNumberValue ')]/input") {
      attribute("src") {
        remove()
      }
    }
    
    
  }
  
  #register
  #Group::URLMatcherGroup
  #[["url_matcher", "register\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /register\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvEmailSignUp"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvEmailSignUp")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".cr_header_left > img"]]
    $("//*[contains(concat(' ', @class, ' '), ' cr_header_left ')]/img") {
      remove()
    }
   
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton"], ["selector", "#cr_buttons_yourInfo a > img.img"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'cr_buttons_yourInfo']//a/img[contains(concat(' ', @class, ' '), ' img ')]") {
      match($done, "no") {
	var("altValueAccount",fetch("@alt"))
	log(concat("Alt Value: ",$altValueAccount))

        $("..") {
            var("done", "yes")
	    attribute("class") {
            value() {
                append(" mvButton")
            }
          }
        }
      }
    }
 
        #
    #Content::Formatting::AddAttribute
    #[["attribute", "value"], ["value", "Register"], ["selector", ".mvButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
      match($done, "no") {
          var("done", "yes")

		attribute("value") {
          value() {
              set($altValueAccount)
          }
        }
      }
    }   

 
    #
    #Content::Formatting::DuplicateAttribute
    #[["duplicate_source", "#cr_buttons_yourInfo a > img"], ["duplicate_target", "#cr_buttons_yourInfo a"], ["attribute", "onclick"], ["multiple", "true"], ["ancestor", ""]]
    var("counter", "")
    $("//*[@id = 'cr_buttons_yourInfo']//a/img") {
      var("counter") {
        append("a")
      }
      var($counter, fetch("./@onclick"))
    }
    var("counter", "")
    $("//*[@id = 'cr_buttons_yourInfo']//a") {
      var("counter") {
        append("a")
      }
      attribute("onclick", var($counter))
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvGreyButton"], ["selector", "#cr_buttons_yourInfo a > [alt=\"Cancel\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'cr_buttons_yourInfo']//a/*[@alt = \"Cancel\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvGreyButton")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBirthMonth"], ["selector", "[name=\"BirthMonth\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"BirthMonth\"]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvBirthMonth")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvDateSelector"], ["selector", "[name=\"BirthDay\"], [name=\"BirthYear\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@name = \"BirthDay\"]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvDateSelector")
          }
        }
        }
      }
    }
    $("//*[@name = \"BirthYear\"]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvDateSelector")
          }
        }
        }
      }
    }
    
    

    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "register"], ["add_after", "#cr_buttons_yourInfo a >  img.img"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'cr_buttons_yourInfo']//a/img[contains(concat(' ', @class, ' '), ' img ')])[1]") {
      inject_after("register")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "Cancel"], ["add_after", "#cr_buttons_yourInfo a >  [alt=\"Cancel\"]"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'cr_buttons_yourInfo']//a/*[@alt = \"Cancel\"])[1]") {
      inject_after("Cancel")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#cr_buttons_yourInfo a > img"]]
    $("//*[@id = 'cr_buttons_yourInfo']//a/img") {
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
    #Content::Formatting::MoveToBeginningOf
    #[["move_me", "[name=\"cr_agreeTC\"]"], ["to_beginning_of_me", "#cr_goGreenTC"], ["map_multiple", ""], ["ancestor_selector", ""]]
    $("(//*[@id = 'cr_goGreenTC'])[1]") {
      move_here("(//*[@name = \"cr_agreeTC\"])[1]", "top")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", ".mvButton"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvButton ')]") {
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
    #Content::Formatting::ReplaceTag
    #[["selector", "a.mvButton"], ["new_tag_name", "input"], ["class_name", ""]]
    $("//a[contains(concat(' ', @class, ' '), ' mvButton ')]") {
      name("input")
    }
    
    
  }
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #
  #  #Content::Formatting::InnerRegexReplace
  #  #[["selector", ".cr_breadcrumb_container > script"], ["regex", "breadCrumb"], ["replacement", "YUPU"], ["multiple", ""]]
  #  $("(//*[contains(concat(' ', @class, ' '), ' cr_breadcrumb_container ')]/script)[1]") {
  #    inner() {
  #      replace(/breadCrumb/, "YUPU")
  #    }
  #  }
  #  
  #  
  
  
  #customerService
  #Group::URLMatcherGroup
  #[["url_matcher", "policies\\/privacy"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /policies\/privacy/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvMainWrap"], ["selector", ".bl_mainContent"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvMainWrap")
          }
        }
      }
    }
    
    
  }
  
  #customerService
  #Group::URLMatcherGroup
  #[["url_matcher", "app\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /app\//) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton mvSmallButton"], ["selector", ".rn_SubmitButton"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' rn_SubmitButton ')]") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvButton mvSmallButton")
          }
        }
      }
    }
    
    
  }
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #
  #  #Content::Formatting::AddAttribute
  #  #[["attribute", "mw_what"], ["value", "true"], ["selector", ".shippingTable > tr[nth-of-type(2)] > td"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  #  var("done", "no")
  #  $("//*[contains(concat(' ', @class, ' '), ' shippingTable ')]/tr[position() = 2]/td") {
  #    match($done, "no") {
  #        var("done", "yes")
  #      attribute("mw_what") {
  #        value() {
  #            set("true")
  #        }
  #      }
  #    }
  #  }
  #  
  #  
  
  
  #popups
  #Group::URLMatcherGroup
  #[["url_matcher", "furniture\\/popup\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /furniture\/popup\.jsp/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvSalesIdPopup"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvSalesIdPopup")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvButton mvBackButton"], ["selector", ".bl_pop_top_contain > a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_pop_top_contain ')]/a") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvButton mvBackButton")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvBackButton"], ["html", "<span>back</span>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvBackButton ')]") {
      inner("<span>back</span>")
    }
  }

  match($path){
    with(/credit\/ezpay\/pay/){
      $("//body"){
        add_class("mw_quick_pay")
        $(".//div[contains(@class, 'chat_quickPay_reactiveChatLinkContainer')]"){
          remove()
        }
        $("div[contains(@class, 'cr_payBill_info_withMinHeight')]"){
          # move_here("//form[name='EZpay_form']", "bottom")
        }
        $("//td/img"){
          remove()
        }
      }
    }
    with(/acctmgmt\/manageaccount/i){
      $("//body"){
        add_class("mw_manage_credit_account")
        # $("//div[@id='mma_container']"){
        #   remove()
        # }
        # $("//div[@id='mma_introText']"){
        #           remove()
        #         }
        $("//div[contains(@class, 'mma_submitForm')]/input[contains(@src, 'save.gif')]"){
          attribute("type", "submit")
          attribute("value", "save")
          add_class("mvButton")
          $("./@src"){
            remove()
          }
        }
        $("//div[contains(@class, 'mma_authBuyerSubmit')]/input[contains(@src, 'send.gif')]"){
          attribute("type", "submit")
          attribute("value", "save")
          add_class("mvButton")
          $("./@src"){
            remove()
          }
        }
      }
    }
  }
#}  
$("//body"){
    add_class("mw_myAccount")
    # 'skip to content' link
    $("div[@class='outOfScreen']") {
      remove()
    }
    # remove verification code image that's too large
    $(".//div[@class='mma_cvnLocation']/img[@alt='card verification code']") {
      remove()
    }
}

# replacing hard-coded pop-up link with relative path to contact page
$("//a[@class='cr_large_link']") {
  attribute("href") {
    value() {
      replace("javascript:pop('http://bloomingdales--pro.custhelp.com/app/contact/','ContactUs','scrollbars,width=600,height=535');", "/service/contact/index.ognc")
    }
  }
}

$("//body[contains(concat(' ', @class, ' '), ' mw_quick_pay ') or contains(concat(' ', @class, ' '), ' mvEzPay ')]") {
  $(".//div[@class='cr_payBill_header']") {
    $("./div[@class='cr_paybill_header_comment']") {
      move_to("..", "bottom")
    }
  }
  # Fix the broken ass html by moving form sections back together
  $(".//div[@class='cr_payBill_disclosure_cta_checkbox']/../../..") {
    move_to("//form[@name='EZpay_form' or @name='EZselect_form']", "bottom")
  }
}

# Ticket R_30 - Change button to say "View Order Status"
$("//div[@class='bl_mainContentFormRightColOrder']//input[@name='VIEWORDER_BUTTON']") {
  attribute("value") {
    value() {
      set("View Order Status")
    }
  }
}

#move acivate my card before credit services footer links
$("//div[@id='bl_hp_main']/a[contains(@class, 'mvButton')]"){
  move_to("./../div[contains(@class, 'bl_mainContent')]//div[contains(@class, 'cr_css_bottomLinks')]", "before")
}

#add credit card image
$("//div[@class='cr_payBill_ABA_container']/table[1]") {
  inject_after("<img src='https://www.bloomingdales.com/img/credit/i_abaSample.jpg' width='258' height='69' alt='sample' border='0''>")
}

#remove 'about us' in breadcrumb on 'check gift card balance' page
$("//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')]/script") {
  text() {
    replace(/var\s+i\=0/, "var i=1")
  }
}

# move one of the input checkboxes for the 'go green' option
$("//div[@id='cr_goGreen_TC_1585']/div[@class='floatRight']") {
  move_to("//div[@id='cr_goGreenTC' and @id734='aaa']", "top")
}

# TODO: This should be moved to an optimization block, with other script removals
$("//script[not(@src) and contains(text(), 'Select this checkbox')]") {
  remove()
}

# make sure the footer msg is under site menu
$(".//div[@id='cr_register_container_noImage']//div[@class='bl_nav_bot_service_container']") {
  move_to("//div[@id='bl_nav_top_container_tiles']", "bottom")
  # make sure we have the "full site" link
  inject_bottom("<div id='mw_footer'></div>")
  #end BasicGroup
  $("div[@id='mw_footer']") {
    inject_bottom("<div id= 'mw_desktop_site_container'><a id='mw_desktop_link' class='desktop_site' href='#'>Full Site</a></div>")
  }
}
$(".//div[@id='cr_register_container_noImage']//div[@class='mvBDFooterText']") {
  move_to("//div[@id='bl_nav_top_container_tiles']", "bottom")
}

// Make the Track your delivery button a proper button
$(".//div[@class='bl_maButtonTD']") {
  $("./a") {
    inner("TRACK YOUR DELIVERY")
    add_class("mvButton")
  }
}