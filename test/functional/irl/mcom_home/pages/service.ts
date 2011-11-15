 
# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
    add_class("mw_service")
  }


  
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  
 #my order 
  match($fake_url, /\/order\/index\.ognc/) {
    $("/html/body") {
      add_class("mvMyOrderBody")
      $(".//div[@id='macysGlobalBanner']/table//td[img]") {
        add_class("mvTitle")
        insert("a", "Back", class: "mvBackBtn", onclick: "history.go(-1)")
        $("img") {
          wrap("span") {
            text(fetch("img/@alt"))
          }
        }
      }
      
      #dump table
      $(".//table") {
        name("div")
        $(".//tr") {
          name("div")
          $("td") {
            name("span")
            $("table//tr/td") {
              wrap_text_children("span")
              $("span") {
                text() {
                  replace(/^[\u00a0\s]+/, "")
                }
              }
            }
          }
        }
      }
      
      $(".//div[@id='macysGlobalLayout']"){
        $("div[contains(@class,'generalError')]") {
          add_class("mvGeneralError")
        }
         # on order status detail page
        $("form[@name='orderStatusForm']") {
          # EXPLICIT: div[@class='tabsPanel']
          $("div") {
            # EXPLICIT: div[@class='tabContainer']/div[starts-with(@class, 'tabHolder')]
            $("div[@class='tabContainer']/div") {
              add_class("mvDarkGrayBar")
              # EXPLICIT: div[@class='pdpTab']/div[starts-with(@class, 'pdpTabLabel')]/div[@class='tabCorner']
              $("div/div/div") {
                remove()
              }
            }
            # EXPLICIT: div[@class='tabContentContainer']/div[starts-with(@class, 'tabContent')]/div
            $("div[@class='tabContentContainer']/div/div") {
              $("div[2]/span/div") {
                # remove header labels
                $("div[1]") {
                  remove()
                }
                $("div") {
                  add_class("mvShadowBox")
                  $("span[2]") {
                    insert_top("strong", "Gift box: ")
                  }
                  $("span[3]") {
                    insert_top("strong", "Qty: ")
                  }
                  $("span[4]") {
                    insert_top("strong", "Price: ")
                  }
                  $("span[5]") {
                    insert_top("strong", "Total: ")
                  }
                }
              }
              $("div[3]/span/div") {
                $("div/span[@rowspan]") {
                  wrap("div") {
                    move_to("..", "before")
                  }
                }
                $("div[span[@colspan]]") {
                  remove()
                }
                $("div") {
                  add_class("mvWhiteBar")
                  $("span[1]/*[1]") {
                    text() {
                      append("\u00a0")
                    }
                  }
                }
              }
            }
          }
        }
        
        $(".//div[@id='orderNumberPopInLink']/..") {
          attribute("data-ur-set", "toggler")
          $("div[@id='orderNumberPopInLink']") {
            # prevent onclick handler
            attribute("id", "mw_orderNumberPopInLink")
            attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
          }
          move_here("//div[@id='orderNumberPopIn']") {
            attribute("class", "")
            attributes(data-ur-toggler-component: "content", data-ur-state: "disabled")
          }
        }
        
        $(".//form[@name='signin']"){
          $(".//p[@id='showAllOrdersLink']"){
             attribute("style", "")
             attribute("onclick","var rows = document.getElementsByTagName('div'); for (i = 0; i < rows.length; i++) {								rows[i].className = rows[i].className.replace(/toggleOrders/,''); }	" )
           }
          add_class("mvOrderFrom")
         
          $("div[1]/div[1]") {
            remove()
          }
          $(".//div[@class='orderHistory']") {
            $("div[contains(@class,'row1')]"){
              remove()
            }
            $("div[contains(@class,'row0')]"){
            add_class("mvShadowBottom")
            $("span[@colspan='3']/.."){
              remove()
            }
            $("span") {
              name("div")
              
            }
            $("div[1]") {
              inject_top("<b>order date:</b>")
            }
            $("div[2]") {
               inject_top("<b>recipient:</b>")
            }
            $("div[3]") {
               inject_top("<b>order number:   </b>")
            }
          }
          
        }
          $(".//img[contains(@src,'hor-divider')]/../..") {
            remove()
          }
          $(".//br") {
            remove()
          }
        }
        $("form[@name='orderStatusForm']") {
          # useless border
          $("img") {
            remove()
          }
        }
        $("div[@class='myorderLabel']") {
          add_class("mvTitle")
          inject_bottom("<a class='mvBackBtn' href='/myinfo/index.ognc'>Account</a>")
        }
        $("div[@class='orderStatusLabel']"){
          add_class("mvSubTitle")
          inner("Order Status")
        }
      }
    }
    
  }
  
  
  #Star Rewards
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/credit\\/overview\\.ognc"], ["negate", ""]]
  match($fake_url, /\/credit\/overview\.ognc/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvAboutCards"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvAboutCards")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "img[src*=\"rule.gif\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[contains(@src, \"rule.gif\")]") {
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
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#background-art, .mvRemoveElement, .menu_spacer"]]
    $("//*[@id = 'background-art']") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' menu_spacer ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCardHelp"], ["selector", "img[name*=\"Macy's Elite cardholders get Priority customer service\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[contains(@name, \"Macy's Elite cardholders get Priority customer service\")]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCardHelp")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCardBenefits"], ["selector", "img[title*=\"Every Macy's card has these benefits\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[contains(@title, \"Every Macy's card has these benefits\")]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCardBenefits")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvCardBenefits"], ["html", "<div class=\"mvDarkGrayBar\">Every Macy's Card Has These Benefits</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCardBenefits ')]") {
      inner("<div class=\"mvDarkGrayBar\">Every Macy's Card Has These Benefits</div>")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvCardHelp"], ["html", "<div class=\"mvDarkGrayBar\">Plus, Macy's Elite Cardholders Get Priority Customer Service</div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCardHelp ')]") {
      inner("<div class=\"mvDarkGrayBar\">Plus, Macy's Elite Cardholders Get Priority Customer Service</div>")
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", "#sv-cr-xx-xx-overview > div:first-of-type"]]
    $("//*[@id = 'sv-cr-xx-xx-overview']/div[position() = 1]") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCardItems"], ["selector", "#sv-cr-xx-xx-overview > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "img"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'sv-cr-xx-xx-overview']/div") {
      match($done, "no") {
          var("conditional", "false")
            $(".//img") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvCardItems")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvStarRewardsTop"], ["selector", "#macysGlobalLayout > div:first-child"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'macysGlobalLayout']/*[position() = 1 and self::div]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvStarRewardsTop")
          }
        }
      }
    }
    
    
  }
  
  #Service global group
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", "table, tr, td"]]
      match($fake_url, not(/\/credit\/popups\/privacy\.jsp/)){
    $("//table") {
      attribute("width") {
        remove()
      }
    }
    $("//tr") {
      attribute("width") {
        remove()
      }
    }
    $("//td") {
      attribute("width") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#localNavigationContainer, #depthpathContainer, div[style=\"clear:both;\"], .css_masthead, .css_masthead_rule, .clearboth, .creditServicesHeading"]]
    $("//*[@id = 'localNavigationContainer']") {
      remove()
    }
    $("//*[@id = 'depthpathContainer']") {
      remove()
    }
    $("//div[@style = \"clear:both;\"]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' css_masthead ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' css_masthead_rule ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' clearboth ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' creditServicesHeading ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "align"], ["selector", "div, span, table, td, tr"]]
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
    $("//table") {
      attribute("align") {
        remove()
      }
    }
    $("//td") {
      attribute("align") {
        remove()
      }
    }
    $("//tr") {
      attribute("align") {
        remove()
      }
    }
    
    
    #
    #Content::CSS::RemoveStyles
    #[["selector", "div, span, table, td, tr, input, label"]]
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
    $("//td") {
      attribute("style") {
        remove()
      }
    }
    $("//tr") {
      attribute("style") {
        remove()
      }
    }
    $("//input") {
      attribute("style") {
        remove()
      }
    }
    $("//label") {
      attribute("style") {
        remove()
      }
    }
  }
    
  # end BasicGroup
  
  #Pay Bill
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/credit\\/paybill\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/credit\/paybill\//) {
  
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvPayBillBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvPayBillBody")
          }
        }
      }
    }
    
    
    #Page title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span>pay your bill</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'globalMastheadContainer'])[1]") {
      inject_after("<div class=\"mvTitle\"><span>pay your bill</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPadding10"], ["selector", ".cssContent > div:first-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' cssContent ')]/div[position() = 1]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvPadding10")
          }
        }
      }
    }
    
    
    #Payment method
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", ".rowContainer > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' rowContainer ')]/div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvShadowBox")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvShadowBox > div > div:first-of-type"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvShadowBox ')]/div/div[position() = 1]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvShadowBox > div:first-of-type"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvShadowBox ')]/div[position() = 1]") {
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
      #[["attribute", "class"], ["value", "mvPadding10"], ["selector", ".mvShadowBox > div:nth-of-type(2)"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvShadowBox ')]/div[position() = 2]") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvPadding10")
            }
          }
        }
      }
      
      
      #Button
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvFormBtnContainer"], ["selector", ".mvShadowBox img"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvShadowBox ')]//img") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                set("mvFormBtnContainer")
            }
          }
          }
        }
      }
      
      
    # end BasicGroup
    
    #Change link to find store
    #Content::Formatting::AddAttribute
    #[["attribute", "href"], ["value", "/store/index.ognc"], ["selector", "a[alt=\"STORE LOCATOR\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//a[@alt = \"STORE LOCATOR\"]") {
      match($done, "no") {
          var("done", "yes")
        attribute("href") {
          value() {
              set("/store/index.ognc")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mvShadowBox"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "strong:contains(\"Fiserv Service\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvShadowBox ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//strong[contains(., \"Fiserv Service\")]") {
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
    #[["selector", ".mvRemoveElement"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    
    
  }
  
  #Furniture and Mattress
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/furniture\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/furniture\//) {
  
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvFurnitureBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    $("html/body") {
    attribute("id","mvFurnitureBody" )
     $("//div[@id = 'macysGlobalLayout']") {
       $("div[position( ) > 1]") {
         add_class("mvPadding0510")
       }
    #page title
    $("div[@id = 'macysGlobalBanner']") {
      $("table//tr/td/div"){
        attribute("style", "")
        $("span") {
          attribute("style", "")
        }
        $("span[1]") {
          add_class("mvTitle")
          inject_bottom("<a class='mvBackBtn' href='/myinfo/index.ognc'>Account</a>")
        }
        $("span[2]") {
          remove()
        }
        $("span[2]") {
          add_class("mvSubTitle")
          text("Furniture & Mattress Delivery Status")
        }
      }
    }
  }
  }
   
    
   
    $("//*[@id = 'macysGlobalLayout']/img") {
      remove()
    }
    
    
    #Dump table
    #Content::Formatting::ReplaceTag
    #[["selector", "table, tr, td"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//table") {
      name("div")
    }
    $("//tr") {
      name("div")
    }
    $("//td") {
      name("div")
    }
    
    
    #
    #Content::Formatting::RemoveWhiteSpace
    #[["selector", "div, span"]]
    # NOTE: This will remove text elements that are whitespace only, but it will not remove
    # the preceding or following whitespace from elements that have some text
    $("//div/text()[normalize-space(.) = '']") {
      remove()
    }
    $("//span/text()[normalize-space(.) = '']") {
      remove()
    }
    
    
    #Reset Btn
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/resetBtn.png"], ["selector", ".buttonNonSubmitBorders"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' buttonNonSubmitBorders ')]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/resetBtn.png")
      attribute('src', asset('buttons/registry/reset.png', 'image'))
    }
    
    
    #Submit Btn
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSubmitBtn.png"], ["selector", ".buttonSubmitBorders"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSubmitBtn.png")
      attribute('src', asset('buttons/registry/submit.png', 'image'))
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "img[alt=\"icon_error\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"icon_error\"]") {
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
    #[["selector", ".mvRemoveElement, form .errorText img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//form//*[contains(concat(' ', @class, ' '), ' errorText ')]//img") {
      remove()
    }
    
    $("//a[@title='reset']") {
      text("")
      insert("img", src: asset("buttons/registry/reset.png", "image"))
    }
    $("//input[@name='SUBMIT_BUTTON']") {
      attributes(type: "image", src: asset("buttons/registry/submit.png", "image"))
    }
    $("//span[@id='saleCheckPopInLink']/..") {
      attribute("data-ur-set", "toggler")
      $("span[@id='saleCheckPopInLink']") {
        attribute("id", "mw_saleCheckPopInLink")
        attributes(data-ur-toggler-component: "button", data-ur-state: "disabled")
      }
      move_here("//div[@id='saleCheckPopIn']") {
        attributes(data-ur-toggler-component: "content", data-ur-state: "disabled")
      }
    }
  }
  
  
  #Gift card
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/gift\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/gift\//) {
  
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvGiftBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvGiftBody")
          }
        }
      }
    }
    
    
    #Page title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span>Gifts & Gift Cards</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'globalMastheadContainer'])[1]") {
      inject_after("<div class=\"mvTitle\"><span>Gifts & Gift Cards</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#macysGlobalBanner, #macysGlobalLayout br, .formLabel"]]
    $("//*[@id = 'macysGlobalBanner']") {
      remove()
    }
    $("//*[@id = 'macysGlobalLayout']//br") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' formLabel ')]") {
      remove()
    }
    
    
    #Page Nav Bar
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapElement
      #[["selector", "#static_tabs > a"], ["class_name", "mvMyGiftNav"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'static_tabs']/a)[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMyGiftNav")
            move_here("//*[@id = 'static_tabs']/a[not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".mvMyGiftNav > .current"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMyGiftNav ')]/*[contains(concat(' ', @class, ' '), ' current ')]") {
        move_to("..", "before")
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", "#static_tabs > a"], ["class_name", "mvSubTitle"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'static_tabs']/a)[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvSubTitle")
            move_here("//*[@id = 'static_tabs']/a[not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvPageMenu\"></span>"], ["add_after", ".mvSubTitle > a"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvSubTitle ')]/a)[1]") {
        inject_after("<span class=\"mvPageMenu\"></span>")
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMyGiftNav > a"], ["tag_name", "div"], ["class_name", "mvWhiteBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMyGiftNav ')]/a") {
        wrap("div") {
          attribute("class", "mvWhiteBar")
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvPageMenu"], ["content_selector", ".mvMyGiftNav"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[contains(concat(' ', @class, ' '), ' mvMyGiftNav ')]") {
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
              append("15819")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvPageMenu ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("15819")
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
    
    #Dump table
    #Content::Formatting::ReplaceTag
    #[["selector", "table, tr, td"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//table") {
      name("div")
    }
    $("//tr") {
      name("div")
    }
    $("//td") {
      name("div")
    }
    
    
    #Gift Card Balance
    #Group::URLMatcherGroup
    #[["url_matcher", "index\\.ognc"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /index\.ognc/) {
    
      #Replace btn image
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/checkValueBtn.gif"], ["selector", ".buttonSubmitBorders"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
        #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/checkValueBtn.gif")
        attribute('src', asset('buttons/checkValue.gif', 'image'))
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "form[name=\"giftcard_form\"] > div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ".buttonSubmitBorders"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//form[@name = \"giftcard_form\"]/div") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvShadowBox")
            }
          }
            }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding10"], ["selector", "form[name=\"giftcard_form\"] > div:first-of-type"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//form[@name = \"giftcard_form\"]/div[position() = 1]") {
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
      #[["attribute", "class"], ["value", "mvFormBtnContainer"], ["selector", ".buttonSubmitBorders"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvFormBtnContainer")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "style"], ["value", "padding:10px 0;"], ["selector", ".mvShadowBox input[type=\"text\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvShadowBox ')]//input[@type = \"text\"]") {
        match($done, "no") {
          $("..") {
          attribute("style") {
            value() {
                set("padding:10px 0;")
            }
          }
          }
        }
      }
      
      
      #
      #for show gift card image
      #Content::Passthrough::Attribute
      #[["selector", "img[src*='securityword.ognc']"], ["attribute", "src"], ["regex_capture", ""]]
      $("//img[contains(@src, 'securityword.ognc')]") {
        attribute("src") {
          value() {
            rewrite("link")
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapElement
      #[["selector", "#mvGiftBody .errorText"], ["class_name", "mvErrorMeg"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'mvGiftBody']//*[contains(concat(' ', @class, ' '), ' errorText ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvErrorMeg")
            move_here("//*[@id = 'mvGiftBody']//*[contains(concat(' ', @class, ' '), ' errorText ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
    }
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "href"], ["value", "http://macys.com/service/faqs/credit.jsp"], ["selector", ".cssFooter a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' cssFooter ')]//a") {
      match($done, "no") {
          var("done", "yes")
        attribute("href") {
          value() {
              set("http://macys.com/service/faqs/credit.jsp")
          }
        }
      }
    }
    
    
    #Gift boxes and messages
    #Group::URLMatcherGroup
    #[["url_matcher", "messages\\.jsp"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /messages\.jsp/) {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", "#macysGlobalLayout > div > div > div, #macysGlobalLayout > div > div > span"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']/div/div/div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvPadding0510")
            }
          }
        }
      }
      $("//*[@id = 'macysGlobalLayout']/div/div/span") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvPadding0510")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvTextHeader"], ["selector", "#macysGlobalLayout > div > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".textHeader"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']/div/div/div") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' textHeader ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                set("mvTextHeader")
            }
          }
            }
        }
      }
      
      
    }
    
    #Terms and conditions
    #Group::URLMatcherGroup
    #[["url_matcher", "terms\\.jsp"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /terms\.jsp/) {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", "#macysGlobalLayout > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']/div/div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvPadding0510")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvTextHeader"], ["selector", "#macysGlobalLayout > div > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".textHeader"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']/div/div") {
        match($done, "no") {
            var("conditional", "false")
              $(".//*[contains(concat(' ', @class, ' '), ' textHeader ')]") {
                var("conditional", "true")
              }
            match($conditional, "true") {
          attribute("class") {
            value() {
                set("mvTextHeader")
            }
          }
            }
        }
      }
      
      
    }
    
    #Terms and conditions popup
    #http://www1.moov1.macys.com/service/gift/vgc_terms.jsp
    #Group::URLMatcherGroup
    #[["url_matcher", "/vgc_terms\\.jsp"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/vgc_terms\.jsp/) {
    
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
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/mvDynamicPopupLogo.gif"], ["selector", "img[src*=\"r40035_popup_01.gif\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[contains(@src, \"r40035_popup_01.gif\")]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/mvDynamicPopupLogo.gif")
        #attribute('src', asset('logo.png', 'image'))
        name('div')
        attribute('src', '')
        add_class('sprite_me-logo')
      }
      
      
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
      #Content::Formatting::RemoveAttribute
      #[["attribute", "height"], ["selector", "img"]]
      $("//img") {
        attribute("height") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "width"], ["selector", "img"]]
      $("//img") {
        attribute("width") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPopupContent"], ["selector", "#doc3 > div > div > div > div > div:nth-of-type(2)"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'doc3']/div/div/div/div/div[position() = 2]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPopupContent")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPopupHeader"], ["selector", "#doc3 > div > div > div > div > div:nth-of-type(1)"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'doc3']/div/div/div/div/div[position() = 1]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvPopupHeader")
            }
          }
        }
      }
      
      
    }
    
  }
  
  #Contact Credit Service
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/credit\\/contactus\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/credit\/contactus\//) {
  
    #Page title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span >Contact Credit Service</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'globalMastheadContainer'])[1]") {
      inject_after("<div class=\"mvTitle\"><span >Contact Credit Service</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #contact credit card service landing page
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".checkout_subNav"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' checkout_subNav ')])[1]") {
    
      #Add Page ID
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "mvCardServiceBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvCardServiceBody")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", ".cssContent > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' cssContent ')]/div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvPadding0510")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".contactCreditServicesHeader"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' contactCreditServicesHeader ')]") {
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
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding10"], ["selector", "form[name=\"contact_email_form\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//form[@name = \"contact_email_form\"]") {
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
      #[["attribute", "class"], ["value", "mvFormBtnContainer"], ["selector", "input[alt=\"SUBMIT\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//input[@alt = \"SUBMIT\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvFormBtnContainer")
            }
          }
          }
        }
      }
      
      
      #
      #Content::CSS::RemoveStyles
      #[["selector", "form[name=\"contact_email_form\"] *"]]
      $("//form[@name = \"contact_email_form\"]//*") {
        attribute("style") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "//div[@class=\"cssContent\"]/div[position() < 6]"]]
      $("//div[@class=\"cssContent\"]/div[position() < 6]") {
        remove()
      }
      
      
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/submit_btn.png"], ["selector", "input[alt=\"SUBMIT\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//input[@alt = \"SUBMIT\"]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macys/account_btns/submit_btn.png")
      attribute('src', asset('buttons/submitSmall.png', 'image'))
    }
    
    
    #contact credit card service after submit form
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#macysGlobalLayout table a[title=\"Customer Service\"]"], ["negate", ""]]
    $("(//*[@id = 'macysGlobalLayout']//table//a[@title = \"Customer Service\"])[1]") {
    
      #Add Page ID
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "mvCardServiceFormSubmited"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvCardServiceFormSubmited")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvPadding10"], ["selector", "#macysGlobalLayout"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'macysGlobalLayout']") {
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
      #Content::Formatting::RemoveElements
      #[["selector", "#macysGlobalLayout > img, #macysGlobalBanner, #macysGlobalLayout > br, #macysGlobalLayout > h2, .header_bold br, #macysGlobalLayout table a[title=\"Customer Service\"]"]]
      $("//*[@id = 'macysGlobalLayout']/img") {
        remove()
      }
      $("//*[@id = 'macysGlobalBanner']") {
        remove()
      }
      $("//*[@id = 'macysGlobalLayout']/br") {
        remove()
      }
      $("//*[@id = 'macysGlobalLayout']/h2") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' header_bold ')]//br") {
        remove()
      }
      $("//*[@id = 'macysGlobalLayout']//table//a[@title = \"Customer Service\"]") {
        remove()
      }
      
      
    }
    
    
    #contact credit card service selections
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "select[name=\"RoutingOption\"]"], ["negate", ""]]
    $("(//select[@name = \"RoutingOption\"])[1]") {
    
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#macysGlobalLayout > img, #macysGlobalBanner, #macysGlobalLayout > br, #macysGlobalLayout > h2, form[name=\"contact_email_form\"] > br"]]
      $("//*[@id = 'macysGlobalLayout']/img") {
        remove()
      }
      $("//*[@id = 'macysGlobalBanner']") {
        remove()
      }
      $("//*[@id = 'macysGlobalLayout']/br") {
        remove()
      }
      $("//*[@id = 'macysGlobalLayout']/h2") {
        remove()
      }
      $("//form[@name = \"contact_email_form\"]/br") {
        remove()
      }
      
      
      #Add Page ID
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "mvCardServiceSelections"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("mvCardServiceSelections")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveEmptyElements
      #[["selector", "label"]]
      $("//label[not(descendant::*)]") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/resetBtn.png"], ["selector", "img[alt=\"Reset\"]"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//img[@alt = \"Reset\"]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/resetBtn.png")
        attribute('src', asset('buttons/registry/reset.png', 'image'))
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "table, tr,td"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//table") {
        name("div")
      }
      $("//tr") {
        name("div")
      }
      $("//td") {
        name("div")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvFormLabel2"], ["selector", "label"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//label") {
        match($done, "no") {
          $("..") {
          attribute("class") {
            value() {
                append(" mvFormLabel2")
            }
          }
          }
        }
      }
      
      
    }
    
    
  }
  
  #Macy's Credit Card landing apage
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/service\\/credit\\/index.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/service\/credit\/index.ognc/) {
  
    #Page title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span >Macy's Credit Card</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'globalMastheadContainer'])[1]") {
      inject_after("<div class=\"mvTitle\"><span >Macy's Credit Card</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvMacyCardLanding"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvMacyCardLanding")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#disclaimer"], ["before_me", ".cssContent"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' cssContent ')])[1]") {
      move_here("(//*[@id = 'disclaimer'])[1]", "before")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".cssContent"]]
    $("//*[contains(concat(' ', @class, ' '), ' cssContent ')]") {
      remove()
    }
    
    
  }
  
  #Activation of Credit Card
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/credit\\/activation\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/credit\/activation\//) {
  
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvActivationBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvActivationBody")
          }
        }
      }
    }
    
    
    #Macy's card
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/prop\\.ognc"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/prop\.ognc/) {
    
      #Page title
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\"><span >Activate Your Macy's Card</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalMastheadContainer'])[1]") {
        inject_after("<div class=\"mvTitle\"><span >Activate Your Macy's Card</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
      }
      
      
    }
    
    #clean up
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", ".cssContent > table > tr > td > table > tr:nth-of-type(2) > td"], ["new_tag_name", "div"], ["class_name", "mvPadding10"]]
      $("//*[contains(concat(' ', @class, ' '), ' cssContent ')]/table/tr/td/table/tr[position() = 2]/td") {
        name("div")
        attribute("class", "mvPadding10")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".ccActivationForm"], ["after_me", "form[name=\"cc_activation\"] > table:first-of-type"], ["map_multiple", ""]]
      $("(//form[@name = \"cc_activation\"]/table[position() = 1])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' ccActivationForm ')])[1]", "after")
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", ".cssContent .mvPadding10"], ["before_me", ".cssContent"], ["map_moves", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' cssContent ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' cssContent ')]//*[contains(concat(' ', @class, ' '), ' mvPadding10 ')])[1]", "before")
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", "form[name=\"cc_activation\"]"], ["before_me", ".cssContent"], ["map_moves", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' cssContent ')])[1]") {
        move_here("(//form[@name = \"cc_activation\"])[1]", "before")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", "form[name=\"cc_activation\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//form[@name = \"cc_activation\"]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvShadowBox")
            }
          }
        }
      }
      
      
      #Error Meg
      #Content::Formatting::MoveBefore
      #[["move_me", ".generalError"], ["before_me", "form[name=\"cc_activation\"] > table:first-of-type"], ["map_moves", ""]]
      $("(//form[@name = \"cc_activation\"]/table[position() = 1])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' generalError ')])[1]", "before")
      }
      
      
      #Card examples
      #Must before Submit btn group
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvCardExample"], ["selector", ".ccActivationForm + table"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' ccActivationForm ')]/following-sibling::*[1]/self::table") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvCardExample")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRedFont"], ["selector", "span:contains(\"OLD\"), span:contains(\"NEW\")"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//span[contains(., \"OLD\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvRedFont")
            }
          }
        }
      }
      $("//span[contains(., \"NEW\")]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvRedFont")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::Table::Remove::PreserveLayout
      #[["selector", ".mvCardExample"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvCardExample ')]" ) {
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
      #[["selector", ".cssContent, #myContext1, .ccActivationForm > tr:first-of-type, .mvCardExample img[src*=\"arrow\"]"]]
      $("//*[contains(concat(' ', @class, ' '), ' cssContent ')]") {
        remove()
      }
      $("//*[@id = 'myContext1']") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' ccActivationForm ')]/tr[position() = 1]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvCardExample ')]//img[contains(@src, \"arrow\")]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #American express card
    #Group::URLMatcherGroup
    #[["url_matcher", "amex\\.ognc"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /amex\.ognc/) {
    
      #Page title
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\"><span style=\"font-size:15px; width:80%; display:inline-block;\">Activate Your Macy's American Express Card</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalMastheadContainer'])[1]") {
        inject_after("<div class=\"mvTitle\"><span style=\"font-size:15px; width:80%; display:inline-block;\">Activate Your Macy's American Express Card</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", "input#ACCOUNTNUMBER_TEXTFIELD"], ["to_end_of_me", "//label[@for=\"ACCOUNTNUMBER_TEXTFIELD\"]/.."], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
      $("(//label[@for=\"ACCOUNTNUMBER_TEXTFIELD\"]/..)[1]") {
        move_here("(//input[@id = 'ACCOUNTNUMBER_TEXTFIELD'])[1]", "bottom")
      }
      
      
    }
    
    #Submit btn
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "//input[@class=\"buttonSubmitBorders\"]/.."], ["new_tag_name", "div"], ["class_name", "mvFormBtnContainer"]]
      $("//input[@class=\"buttonSubmitBorders\"]/..") {
        name("div")
        attribute("class", "mvFormBtnContainer")
      }
      
      
      #
      #Content::Formatting::MoveAfter
      #[["move_me", ".mvFormBtnContainer"], ["after_me", ".ccActivationForm"], ["map_multiple", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' ccActivationForm ')])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvFormBtnContainer ')])[1]", "after")
      }
      
      
      #Replace submit btn
      #Content::Formatting::AddFileAttribute
      #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/submitBtn.png"], ["selector", ".buttonSubmitBorders"]]
      # NOTE: just sets the attribute - doesn't do anything special for files
      $("//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')]") {
        #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/submitBtn.png")
        attribute('src', asset('buttons/submit.png', 'image'))
      }
      
      
    # end BasicGroup
    
    #Step no. Bars
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvDarkGrayBar\">Step 1: Activate Your Card</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#globalContentContainer"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalContentContainer'])[1]") {
        inject_before("<div class=\"mvDarkGrayBar\">Step 1: Activate Your Card</div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div><div class=\"mvDarkGrayBar\">Step 2: Confirmation</div><div class=\"mvDarkGrayBar\">Step 3: Add Card To Your Profile</div><div class=\"mvDarkGrayBar\">Step 4: Receive Promo Code</div></div>"], ["add_after", "#globalContentContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalContentContainer'])[1]") {
        inject_after("<div><div class=\"mvDarkGrayBar\">Step 2: Confirmation</div><div class=\"mvDarkGrayBar\">Step 3: Add Card To Your Profile</div><div class=\"mvDarkGrayBar\">Step 4: Receive Promo Code</div></div>")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::Table::Remove::PreserveLayout
    #[["selector", ".ccActivationForm"]]
    $("//*[contains(concat(' ', @class, ' '), ' ccActivationForm ')]" ) {
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
  
  #View My Credit Card
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/credit\\/account\\.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/credit\/account\.ognc/) {
  
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvViewAccountBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvViewAccountBody")
          }
        }
      }
    }
    
    
    #Page title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span >View My Credit Account</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'globalMastheadContainer'])[1]") {
      inject_after("<div class=\"mvTitle\"><span >View My Credit Account</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/makePaymentBtn.png"], ["selector", "img[alt=\"MAKE A PAYMENT\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//img[@alt = \"MAKE A PAYMENT\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/makePaymentBtn.png")
      attribute('src', asset('buttons/makePayment.png', 'image'))
    }
    
    
    #dump revolving table
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "table"], ["new_tag_name", "div"], ["class_name", ""]]
      $("//table") {
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
      #[["selector", "tr"], ["new_tag_name", "div"], ["class_name", "mvRevolvingTr"]]
      $("//tr") {
        name("div")
        attribute("class", "mvRevolvingTr")
      }
      
      
    # end BasicGroup
    
    #Remove View Statements
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".buttonNonSubmitBorders"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' buttonNonSubmitBorders ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvRemoveElement")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvRemoveElement"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::WrapWithNextSibling
    #[["selector", ".accounttype"], ["wrapper_class", "mvShadowBox"], ["sibling_count", "1"]]
    $("//*[contains(concat(' ', @class, ' '), ' accounttype ')]") {
      wrap("div") {
        attribute("class", "mvShadowBox")
        move_here("(following-sibling::*)[1]", "bottom")
      }
    }
    
    
    #Transations
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#transactdetail > .inner > div > div:first-of-type"]]
      $("//*[@id = 'transactdetail']/*[contains(concat(' ', @class, ' '), ' inner ')]/div/div[position() = 1]") {
        remove()
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#transactdetail > .inner > div > div > span:nth-of-type(1)"], ["html", "<b>Date: </b>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'transactdetail']/*[contains(concat(' ', @class, ' '), ' inner ')]/div/div/span[position() = 1]") {
        inner() {
          prepend("<b>Date: </b>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#transactdetail > .inner > div > div > span:nth-of-type(2)"], ["html", "<b>Account: </b>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'transactdetail']/*[contains(concat(' ', @class, ' '), ' inner ')]/div/div/span[position() = 2]") {
        inner() {
          prepend("<b>Account: </b>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#transactdetail > .inner > div > div > span:nth-of-type(3)"], ["html", "<b>Description: </b>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'transactdetail']/*[contains(concat(' ', @class, ' '), ' inner ')]/div/div/span[position() = 3]") {
        inner() {
          prepend("<b>Description: </b>")
        }
      }
      
      
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#transactdetail > .inner > div > div > span:nth-of-type(4)"], ["html", "<b>Amount: </b>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'transactdetail']/*[contains(concat(' ', @class, ' '), ' inner ')]/div/div/span[position() = 4]") {
        inner() {
          prepend("<b>Amount: </b>")
        }
      }
      
      
      #
      #Content::Formatting::MoveBefore
      #[["move_me", "#transactdetail"], ["before_me", "#store .subaccountbox"], ["map_moves", ""]]
      $("(//*[@id = 'store']//*[contains(concat(' ', @class, ' '), ' subaccountbox ')])[1]") {
        move_here("(//*[@id = 'transactdetail'])[1]", "before")
      }
      
      
    # end BasicGroup
    
  }
  
  #Manage Your Credit Account
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/credit\\/acctmgmt\\/manageaccount\\.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/credit\/acctmgmt\/manageaccount\.ognc/) {
  
    #Page title
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvTitle\"><span>Manage My Credit Account</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'globalMastheadContainer'])[1]") {
      inject_after("<div class=\"mvTitle\"><span>Manage My Credit Account</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
    }
    
    
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvManageAccountBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvManageAccountBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".manageCreditNavList > img, #myContextEl"]]
    $("//*[contains(concat(' ', @class, ' '), ' manageCreditNavList ')]/img") {
      remove()
    }
    $("//*[@id = 'myContextEl']") {
      remove()
    }
    
    
    #Transaction Dispute
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "action"], ["negate", ""], ["parameter_value", "DisputeTran"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/["action"]\=DisputeTran/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "href"], ["value", "http://www1.macys.com/dyn_img/pdf/09F461_C2_Transaction_Dispute_Form.pdf"], ["selector", ".creditServicesPrimaryContent a.stepByStep"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' creditServicesPrimaryContent ')]//a[contains(concat(' ', @class, ' '), ' stepByStep ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("href") {
            value() {
                set("http://www1.macys.com/dyn_img/pdf/09F461_C2_Transaction_Dispute_Form.pdf")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "target"], ["value", "_blank"], ["selector", ".creditServicesPrimaryContent a.stepByStep"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' creditServicesPrimaryContent ')]//a[contains(concat(' ', @class, ' '), ' stepByStep ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("target") {
            value() {
                set("_blank")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".stepByStepLarge"], ["text", "."], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", "true"], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' stepByStepLarge ')]") {
        inner() {
          append(".")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDisputeForm"], ["selector", "a.stepByStep"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//a[contains(concat(' ', @class, ' '), ' stepByStep ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvDisputeForm")
            }
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
      
      
    }
    
    #Paper Statement
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "#paperStatement"], ["negate", ""]]
    $("(//*[@id = 'paperStatement'])[1]") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvRedBigTitle\">Turn off / on paper statement delivery</div>"], ["add_after", ".mvTitle"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
        inject_after("<div class=\"mvRedBigTitle\">Turn off / on paper statement delivery</div>")
      }
      
      
    }
    
    
  }
  
  #
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSubmitBtn.png"], ["selector", "input[alt=\"SUBMIT\"]"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//input[@alt = \"SUBMIT\"]") {
    #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/regSubmitBtn.png")
    attribute('src', asset('buttons/registry/submit.png', 'image'))
  }
  
  
   #Quick Pay
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/service\\/credit\\/ezpay\\/"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/service\/credit\/ezpay\//) {
 
     #Add Page ID
      # #Content::Formatting::AddAttribute
      #       #[["attribute", "id"], ["value", "mvQuickPayBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      #       var("done", "no")
      #       $("//body") {
      #         match($done, "no") {
      #             var("done", "yes")
      #           attribute("id") {
      #             value() {
      #                 set("mvQuickPayBody")
      #             }
      #           }
      #         }
      #       }
     $("//body") {
       attribute("id", "mvQuickPayBody")
     }
     
      #Page title
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvTitle\"><span >Quick Pay</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>"], ["add_after", "#globalMastheadContainer"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalMastheadContainer'])[1]") {
        inject_after("<div class=\"mvTitle\"><span >Quick Pay</span><a class=\"mvBackBtn\" href=\"/myinfo/index.ognc\">Account</a></div>")
      }
      
     $("//div[@id='macysGlobalLayout']"){
       $(".//form[@name='EZselect_form']"){
         $(".//img[@src='https://www.macys.com/img/spacer.gif']"){
           remove()
         }
       }
       #
       #Content::Formatting::AddFileAttribute
       #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png"], ["selector", "input[name=\"CONTINUE_BUTTON\"]"]]
       # NOTE: just sets the attribute - doesn't do anything special for files
       $(".//input[@name = \"CONTINUE_BUTTON\"]") {
         #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png")
         attribute('src', asset('buttons/continue.png', 'image'))
       }
       # remove chat items (page source have differnt layout)
       $(".//a[@class='checkout_subNav']|.//img[@alt='Click to Call']|.//img[@alt='Chat']"){
         remove()
       }
     
     #dump table
         $("//table") {
           name("div")
             $(".//tr") {
                name("div")
              }
              $(".//tbody") {
                name("div")
              }
              $(".//td") {
                name("div")
              }
         }
       
      
     
      #
      #Content::Formatting::MoveUp
      #[["move_me", ".disclosureCheckboxContainer"]]
      $(".//*[contains(concat(' ', @class, ' '), ' disclosureCheckboxContainer ')]") {
        move_to("..", "before")
      }
      
      
     #
       #Content::Formatting::MoveAfter
       #[["move_me", ".buttonSubmitBorders"], ["after_me", ".disclosureCheckboxContainer"], ["map_multiple", ""]]
       $("(.//*[contains(concat(' ', @class, ' '), ' disclosureCheckboxContainer ')])[1]") {
         move_here("(//*[contains(concat(' ', @class, ' '), ' buttonSubmitBorders ')])[1]", "after")
       }
       
        $(".//br"){
        remove()
        }
      
       $(".//img[@title = 'Account Information']") {
        inject_before("<div class='mvRedTitle'>Account Information</div>")
        remove()
       }
       $(".//div[@class='mvRedTitle']/.."){
        
         $("span"){
           name("div")
           add_class("mvPadding050")
         }
       }
        $(".//img[@title = 'Important Disclosure']") {
         inject_before("<div class='mvRedTitle'>Important Disclosure</div>")
         remove()
        }
         $(".//img[src='https://www.macys.com/img/spacer.gif']") {
                         remove()
                       }
                     }
       #
       #Content::Formatting::RemoveElements
       #[["selector", "#macysGlobalBanner, .mvRemoveElement, #localContentContainer img[width=\"178\"], #macysGlobalLayout br, .mvRedTitle img"]]
       $("//*[@id = 'macysGlobalBanner']") {
         remove()
       }
       $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
         remove()
       }
       $("//*[@id = 'localContentContainer']//img[@width = \"178\"]") {
         remove()
       }
      
       
       #your checking/credit info
       #Group::ConditionalSelectorGroup
       #[["conditional_selector", "form[name=\"EZpay_form\"]"], ["negate", ""]]
       $("(//form[@name = \"EZpay_form\"])[1]") {
       
         #
         #Content::Inject::InjectHTML
         #[["html", "<div class=\"mvRedBigTitle\">your checking/credit information</div>"], ["add_after", ".mvTitle"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
         $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
           inject_after("<div class=\"mvRedBigTitle\">your checking/credit information</div>")
         }
         
         
         #
         #Content::Formatting::WrapWithNextSibling
         #[["selector", ".bg_light_gray"], ["wrapper_class", "mvAccountTypeWrapper"], ["sibling_count", "1"]]
         $("//*[contains(concat(' ', @class, ' '), ' bg_light_gray ')]") {
           wrap("div") {
             attribute("class", "mvAccountTypeWrapper")
             move_here("(following-sibling::*)[1]", "bottom")
           }
         }
         
         
         #
         #Content::Formatting::MoveToEndOf
         #[["move_me", ".mvAccountTypeWrapper > div:nth-of-type(2) > div:nth-of-type(1)"], ["to_end_of_me", ".mvAccountTypeWrapper > div:nth-of-type(1) > div:nth-of-type(1)"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
         var("counter", "a")
         $("//*[contains(concat(' ', @class, ' '), ' mvAccountTypeWrapper ')]/div[position() = 1]/div[position() = 1]") {
           var("counter") {
             append("a")
           }
           attribute("id7319", $counter)
         }
         var("counter", "a")
         $("//*[contains(concat(' ', @class, ' '), ' mvAccountTypeWrapper ')]/div[position() = 2]/div[position() = 1]") {
           var("counter") {
             append("a")
           }
           var("xpath") {
             set("//*[@id7319 = '")
             append($counter)
             append("']")
           }
           move_to($xpath, "bottom")
         }
         
         
         #
         #Content::Formatting::MoveToEndOf
         #[["move_me", ".mvAccountTypeWrapper > div:nth-of-type(2) > div:nth-of-type(1)"], ["to_end_of_me", ".mvAccountTypeWrapper > div:nth-of-type(1) > div:nth-of-type(2)"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
         var("counter", "a")
         $("//*[contains(concat(' ', @class, ' '), ' mvAccountTypeWrapper ')]/div[position() = 1]/div[position() = 2]") {
           var("counter") {
             append("a")
           }
           attribute("id4936", $counter)
         }
         var("counter", "a")
         $("//*[contains(concat(' ', @class, ' '), ' mvAccountTypeWrapper ')]/div[position() = 2]/div[position() = 1]") {
           var("counter") {
             append("a")
           }
           var("xpath") {
             set("//*[@id4936 = '")
             append($counter)
             append("']")
           }
           move_to($xpath, "bottom")
         }
         
         
         #
         #Content::Formatting::MoveToEndOf
         #[["move_me", ".mvAccountTypeWrapper > div:nth-of-type(2) > div:nth-of-type(1)"], ["to_end_of_me", ".mvAccountTypeWrapper > div:nth-of-type(1) > div:nth-of-type(3)"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", ""]]
         var("counter", "a")
         $("//*[contains(concat(' ', @class, ' '), ' mvAccountTypeWrapper ')]/div[position() = 1]/div[position() = 3]") {
           var("counter") {
             append("a")
           }
           attribute("id7501", $counter)
         }
         var("counter", "a")
         $("//*[contains(concat(' ', @class, ' '), ' mvAccountTypeWrapper ')]/div[position() = 2]/div[position() = 1]") {
           var("counter") {
             append("a")
           }
           var("xpath") {
             set("//*[@id7501 = '")
             append($counter)
             append("']")
           }
           move_to($xpath, "bottom")
         }
         
         
         #
         #Content::Formatting::AddAttribute
         #[["attribute", "class"], ["value", "mvCreditAccountTotal"], ["selector", "span.sup:contains(\"2\")"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
         var("done", "no")
         $("//span[contains(concat(' ', @class, ' '), ' sup ') and contains(., \"2\")]") {
           match($done, "no") {
             $("..") {
               var("done", "yes")
             attribute("class") {
               value() {
                   set("mvCreditAccountTotal")
               }
             }
             }
           }
         }
         
         
         #
         #Content::Formatting::AddAttribute
         #[["attribute", "class"], ["value", "mvCreditAccountTotalLabel"], ["selector", ".mvCreditAccountTotal"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
         var("done", "no")
         $("//*[contains(concat(' ', @class, ' '), ' mvCreditAccountTotal ')]") {
           match($done, "no") {
             $("..") {
               var("done", "yes")
             attribute("class") {
               value() {
                   set("mvCreditAccountTotalLabel")
               }
             }
             }
           }
         }
         
         
         #
         #Content::Formatting::MoveToBeginningOf
         #[["move_me", ".mvCreditAccountTotalLabel .mvCreditAccountTotal"], ["to_beginning_of_me", ".mvCreditAccountTotalLabel + div > div:nth-of-type(2)"], ["map_multiple", ""], ["ancestor_selector", ""]]
         $("(//*[contains(concat(' ', @class, ' '), ' mvCreditAccountTotalLabel ')]/following-sibling::*[1]/self::div/div[position() = 2])[1]") {
           move_here("(//*[contains(concat(' ', @class, ' '), ' mvCreditAccountTotalLabel ')]//*[contains(concat(' ', @class, ' '), ' mvCreditAccountTotal ')])[1]", "top")
         }
         
         
         #
         #Content::Formatting::MoveToBeginningOf
         #[["move_me", ".mvCreditAccountTotalLabel > div:nth-of-type(2)"], ["to_beginning_of_me", ".mvCreditAccountTotalLabel + div > div:nth-of-type(3)"], ["map_multiple", ""], ["ancestor_selector", ""]]
         $("(//*[contains(concat(' ', @class, ' '), ' mvCreditAccountTotalLabel ')]/following-sibling::*[1]/self::div/div[position() = 3])[1]") {
           move_here("(//*[contains(concat(' ', @class, ' '), ' mvCreditAccountTotalLabel ')]/div[position() = 2])[1]", "top")
         }
         
       
       }
       
       
       #confirm payment
       #Group::ConditionalSelectorGroup
       #[["conditional_selector", "form[name=\"EZconfirm_form\"]"], ["negate", ""]]
       $("(//form[@name = \"EZconfirm_form\"])[1]") {
       
         #
         #Content::Inject::InjectHTML
         #[["html", "<div class=\"mvRedBigTitle\">confirm payment</div>"], ["add_after", ".mvTitle"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
         $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
           inject_after("<div class=\"mvRedBigTitle\">confirm payment</div>")
         }
         
         
         #
         #Content::Formatting::AddFileAttribute
         #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/changeInfoAbove.png"], ["selector", "input[alt=\"CHANGE THE INFORMATION ABOVE\"]"]]
         # NOTE: just sets the attribute - doesn't do anything special for files
         $("//input[@alt = \"CHANGE THE INFORMATION ABOVE\"]") {
           #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/changeInfoAbove.png")
           attribute('src', asset('buttons/changeInfoAbove.png', 'image'))
         }
         
         
         #
         #Content::Formatting::AddFileAttribute
         #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png"], ["selector", "input[alt=\"CONTINUE\"]"]]
         # NOTE: just sets the attribute - doesn't do anything special for files
         $("//input[@alt = \"CONTINUE\"]") {
           #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/continueBtn.png")
           attribute('src', asset('buttons/continue.png', 'image'))
         }
         
         
       }
       
       
   }
  #  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvPadding0510"], ["selector", ".cssFooter, #cssPolicies"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' cssFooter ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvPadding0510")
        }
      }
    }
  }
  $("//*[@id = 'cssPolicies']") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvPadding0510")
        }
      }
    }
  }
  
  
  #My macys card TransactionDeatil
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/credit\\/transactionDetail\\.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/credit\/transactionDetail\.ognc/) {
  
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
    #[["attribute", "class"], ["value", "mvTitle"], ["selector", "img[alt=\"view credit account\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"view credit account\"]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvTitle")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::DumpImgAltText
    #[["image_selector", "img[alt=\"view credit account\"]"], ["target_selector", ".mvTitle"], ["map_multiple", ""]]
    $("(//img[@alt = \"view credit account\"])[1]") {
      var("alt", fetch("./@alt"))
      $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
        text($alt)
      }
    }
    
    
    #Add Page ID
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvTransactionDetail"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvTransactionDetail")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/backBtn.png"], ["selector", "img[alt=\"Back\"]"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//img[@alt = \"Back\"]") {
      #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/backBtn.png")
      attribute('src', asset('buttons/back.png', 'image'))
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#macysGlobalLayout > img, #macysGlobalLayout > br, img[alt=\"view credit account\"]"]]
    $("//*[@id = 'macysGlobalLayout']/img") {
      remove()
    }
    $("//*[@id = 'macysGlobalLayout']/br") {
      remove()
    }
    $("//img[@alt = \"view credit account\"]") {
      remove()
    }
    
    
  }
  
  #Account Verification
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "form[name=\"verifyCVN\"]"], ["negate", ""]]
  $("(//form[@name = \"verifyCVN\"])[1]") {
  
    #
    #Content::Formatting::SetInnerText
    #[["selector", ".mvTitle > span"], ["text", "Account Verification"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' mvTitle ')]/span") {
      inner() {
        set("Account Verification")
      }
    }
    
    
  }
  
  
  #salescheck
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/furniture\\/salescheck\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/furniture\/salescheck\.jsp/) {
  }
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvPopupRedTitle"], ["selector", "img[title=\"what's your number\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//img[@title = \"what's your number\"]") {
    match($done, "no") {
      $("..") {
        var("done", "yes")
      attribute("class") {
        value() {
            set("mvPopupRedTitle")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::SetInnerHTML
  #[["selector", ".mvPopupRedTitle"], ["html", "<div>what's your number</div>"], ["prepend", ""], ["append", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvPopupRedTitle ')]") {
    inner("<div>what's your number</div>")
  }
   match($fake_url, /(\/credit\/popups\/privacy\.jsp)/){
     $("//html"){
     $("head/meta[@name='viewport']"){
         remove()
       }
     $("body"){
       
        attribute("id","mvCreditPrivacy")
        $(".//img[@title='print']/../.."){
          remove()
        }
      }
   } 
 }
  
}
