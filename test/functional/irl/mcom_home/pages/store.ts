@import store_nav.ts

# ----- ParsedHTMLBlocks ----
html() {
  # Add page specific class
  $("/html/body") {
    add_class("mw_store")
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
  
  
  #Photon Integration
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    #[["html", "<meta name='mw_page_type' content='Category'>"], ["add_after", "title"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//title)[1]") {
      inject_after("<meta name='mw_page_type' content='Category'>")
    }
    
    
  # end BasicGroup
  
  #Store Even
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/event\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/event\//) {
  
    #Find store event note
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvFindEvent"], ["selector", "img[alt=\"find a store event\"]"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@alt = \"find a store event\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvFindEvent")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::WrapTextChildren
      #[["selector", ".mvFindEvent"], ["tag_name", "div"], ["class_name", "mvFindEventNote"], ["multiple", "true"], ["split_delimiter", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' mvFindEvent ')]") {
        wrap_text_children("div", class: 'mvFindEventNote')
      }
      
      
      #
      #Content::Formatting::MoveToBeginningOf
      #[["move_me", ".mvFindEvent > .mvFindEventNote"], ["to_beginning_of_me", "#macysGlobalLayout"], ["map_multiple", ""], ["ancestor_selector", ""]]
      $("(//*[@id = 'macysGlobalLayout'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvFindEvent ')]/*[contains(concat(' ', @class, ' '), ' mvFindEventNote ')])[1]", "top")
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "table table"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "tr:first-of-type > td:first-of-type > img[src*=\"spacer.gif\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//table//table") {
      match($done, "no") {
          var("conditional", "false")
            $(".//tr[position() = 1]/td[position() = 1]/img[contains(@src, \"spacer.gif\")]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
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
    #[["attribute", "class"], ["value", "mvStoreEvents"], ["selector", "table table"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".tertiary"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//table//table") {
      match($done, "no") {
          var("conditional", "false")
            $(".//*[contains(concat(' ', @class, ' '), ' tertiary ')]") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              set("mvStoreEvents")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", "#macysGlobalLayout > a.standard[href=\"javascript:history.go(-1)\"]"], ["html", "<div>&lt;&lt; Back to local events</div>"], ["prepend", ""], ["append", ""]]
    $("//*[@id = 'macysGlobalLayout']/a[contains(concat(' ', @class, ' '), ' standard ') and @href = \"javascript:history.go(-1)\"]") {
      inner("<div>&lt;&lt; Back to local events</div>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "img[alt=\"Photobucket\"]"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[@alt = \"Photobucket\"]") {
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
    
    
    #RSVP form
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvPadding050"], ["selector", "form[name=\"myForm\"] > h1 > div"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//form[@name = \"myForm\"]/h1/div") {
      match($done, "no") {
        attribute("class") {
          value() {
              append(" mvPadding050")
          }
        }
      }
    }
    
    
  }
  
  #Dump Table
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
    #Content::Formatting::RemoveElements
    #[["selector", ".mvRemoveElement"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "table"], ["new_tag_name", "h1"], ["class_name", ""]]
    $("//table") {
      name("h1")
    }
    
    
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
    #Content::CSS::RemoveStyles
    #[["selector", "div, form, span"]]
    $("//div") {
      attribute("style") {
        remove()
      }
    }
    $("//form") {
      attribute("style") {
        remove()
      }
    }
    $("//span") {
      attribute("style") {
        remove()
      }
    }
    
    
  # end BasicGroup
  
  #remove Catalogs
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveUp
    #[["move_me", "a:contains(\"Directions\")"]]
    $("//a[contains(., \"Directions\")]") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "a:contains(\"Directions\") + strong"]]
    $("//a[contains(., \"Directions\")]/following-sibling::*[1]/self::strong") {
      remove()
    }
    
    
  # end BasicGroup
  
  #remove elements
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvRemoveElement, .storeImagePool, form[name=\"catalogForm\"], form[name=\"inStoreSalesForm\"], #depthpathContainer"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' storeImagePool ')]") {
      remove()
    }
    $("//form[@name = \"catalogForm\"]") {
      remove()
    }
    $("//form[@name = \"inStoreSalesForm\"]") {
      remove()
    }
    $("//*[@id = 'depthpathContainer']") {
      remove()
    }
    
    
  # end BasicGroup
  
  #visitor
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/visitor\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/visitor\//) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvAboutSubPages"], ["selector", "#macysGlobalLayout"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'macysGlobalLayout']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvAboutSubPages")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvAboutSubPages img[src$=\"jpg\"]"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvAboutSubPages ')]//img[substring(@src, string-length(@src) - string-length(\"jpg\") + 1, string-length(\"jpg\")) = \"jpg\"]") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", ".mvAboutSubPages img[src$=\"gif\"]"], ["class_name", "mvTitle"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[contains(concat(' ', @class, ' '), ' mvAboutSubPages ')]//img[substring(@src, string-length(@src) - string-length(\"gif\") + 1, string-length(\"gif\")) = \"gif\"])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvTitle")
          move_here("//*[contains(concat(' ', @class, ' '), ' mvAboutSubPages ')]//img[substring(@src, string-length(@src) - string-length(\"gif\") + 1, string-length(\"gif\")) = \"gif\"][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
  }
  
  #Page Title
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvTitle"], ["selector", "img[src*=\"headers\"]"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//img[contains(@src, \"headers\")]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              append(" mvTitle")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::DumpImgAltText
    #[["image_selector", ".mvTitle img"], ["target_selector", ".mvTitle"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')]//img)[1]") {
      var("alt", fetch("./@alt"))
      $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
        text($alt)
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvTitle img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvTitle ')]//img") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".mvTitle"], ["tag_name", "span"], ["class_name", "mvStorePageTitle"], ["multiple", ""], ["split_delimiter", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
      wrap_text_children("span", class: 'mvStorePageTitle')
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvTitle"], ["before_me", "#macysGlobalLayout"], ["map_moves", ""]]
    $("(//*[@id = 'macysGlobalLayout'])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]", "before")
    }
    
    
  # end BasicGroup
  
  #Macy's event marketing
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/marketing"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/marketing/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvShadowBox"], ["selector", ".MACYS_eventsRowContainer"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' MACYS_eventsRowContainer ')]") {
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
    #[["attribute", "class"], ["value", "mvRedTitle"], ["selector", ".MACYS_eventsDescriptionContainer h2"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' MACYS_eventsDescriptionContainer ')]//h2") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("mvRedTitle")
          }
        }
      }
    }
    
    
  }
  
  #About US
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/about\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/about\//) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mvWhiteBar"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "a:contains(\"Catalogs\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvWhiteBar ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a[contains(., \"Catalogs\")]") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".storesLinkTable > h1"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "a:contains(\"HISTORY\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' storesLinkTable ')]/h1") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a[contains(., \"HISTORY\")]") {
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
    #[["selector", ".bannerWithIconBackground img, .mvRemoveElement"]]
    $("//*[contains(concat(' ', @class, ' '), ' bannerWithIconBackground ')]//img") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    
    
  }
  
  #Store hours and location seach btn
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/searchBtn.png"], ["selector", ".bg_quaternary > input[alt=\"Search\"]"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//*[contains(concat(' ', @class, ' '), ' bg_quaternary ')]/input[@alt = \"Search\"]") {
    #attribute("src", "http://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/registryBtns/searchBtn.png")
    attribute('src', asset('buttons/registry/search.png', 'image'))
  }
  
  
  #Community Relations / employeeprograms
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/about\\/community\\/(diversity|employeeprograms)\\.jsp"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/about\/community\/(diversity|employeeprograms)\.jsp/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvAboutSubPages"], ["selector", "#macysGlobalLayout"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'macysGlobalLayout']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvAboutSubPages")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvCommunityRelations > img"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvCommunityRelations ')]/img") {
      remove()
    }
    
    
  }
  
  #Store Hours popup
  #Group::URLMatcherGroup
  #[["url_matcher", "storehours\\.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /storehours\.ognc/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvStoreHoursBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvStoreHoursBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvStoreTimeRow"], ["selector", ".bg_light_gray"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bg_light_gray ')]") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvStoreTimeRow")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvStoreHoursTable"], ["selector", ".mvStoreTimeRow"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvStoreTimeRow ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvStoreHoursTable")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "span:empty"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//span[not (node())]") {
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
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", ".mvStoreHoursTable > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "img"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvStoreHoursTable ')]/div") {
      match($done, "no") {
          var("conditional", "false")
            $(".//img") {
              var("conditional", "true")
            }
          match($conditional, "true") {
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
    #[["selector", ".mvRemoveElement, .mvStoreHoursTable > div:first-of-type"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvStoreHoursTable ')]/div[position() = 1]") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "//span[@class=\"tertiary\"]/.."], ["before_me", ".mvStoreHoursTable"], ["map_moves", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvStoreHoursTable ')])[1]") {
      move_here("(//span[@class=\"tertiary\"]/..)[1]", "before")
    }
    
    
  }
  
  #Store page Nav
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::SetInnerText
    #[["selector", "#mcyLocalNavTitle"], ["text", "store locations & hours"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[@id = 'mcyLocalNavTitle']") {
      inner() {
        set("store locations & hours")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvTitle"], ["html", "<span class=\"mvPageMenu\"></span>"], ["prepend", ""], ["append", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvTitle ')]") {
      inner() {
        append("<span class=\"mvPageMenu\"></span>")
      }
    }
    
    
    #
    #Content::Formatting::MoveAfter
    #[["move_me", ".mvStoreNavWrapper"], ["after_me", ".mvTitle"], ["map_multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvTitle ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvStoreNavWrapper ')])[1]", "after")
    }
    
    
    #
    #Content::Formatting::Dynamic::Accordian3
    #[["link_selector", ".mvPageMenu"], ["content_selector", ".mvStoreNavWrapper"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
    var("counter", "")
    var("content_id_string", "[")
    $("//*[contains(concat(' ', @class, ' '), ' mvStoreNavWrapper ')]") {
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
            append("65650")
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
            append("65650")
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
  
  #Store Hours popup
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/store\\/index\\.ognc"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
   match($fake_url, /\/store\/event\/index\.ognc/) {
   $("(//input[@name = 'ZipCode'])[1]") {
      attribute("data-ur-reverse-geocode-component","rg-zip")
      attribute("data-ur-id","1")
      attribute("id","ZipCode")
    }
  }
  match($fake_url, /\/store\/index\.ognc/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "placeholder"], ["value", "ENTER ZIP CODE"], ["selector", "h1.locatorForm > div:nth-of-type(2) input"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//h1[contains(concat(' ', @class, ' '), ' locatorForm ')]/div[position() = 2]//input") {
      match($done, "no") {
          var("done", "yes")
        attribute("placeholder") {
          value() {
              set("ENTER ZIP CODE")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".mvStorePageTitle"], ["html", "<span>Our Stores</span>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' mvStorePageTitle ')]") {
      inner("<span>Our Stores</span>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvStoreLabel\">City: </div>"], ["add_after", ""], ["multiple", ""], ["add_before", "input[name=\"City\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//input[@name = \"City\"])[1]") {
      inject_before("<div class=\"mvStoreLabel\">City: </div>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvStoreLabel\">State:</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "select[name=\"State\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//select[@name = \"State\"])[1]") {
      inject_before("<div class=\"mvStoreLabel\">State:</div>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvStoreLabel\">Zip Code:</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "input[name=\"LocatorZipCode\"]"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//input[@name = 'LocatorZipCode'])[1]") {
      attribute("data-ur-reverse-geocode-component","rg-zip")
      attribute("data-ur-id","1")
      inject_before("<div class=\"mvStoreLabel\">Zip Code:</div>")
    }
    
    
  }
  
  #
  #Content::Formatting::WrapTextChildren
  #[["selector", ".mvStoreLocatorZipCodets + h1 span"], ["tag_name", "div"], ["class_name", ""], ["multiple", "true"], ["split_delimiter", ""]]
  $("//*[contains(concat(' ', @class, ' '), ' mvStoreEvents ')]/following-sibling::*[1]/self::h1//span") {
    wrap_text_children("div")
  }
  
  #Add Geo Button
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "form[name=\"locatorForm\"]"], ["negate", ""]]
  $("(//form[@name = \"locatorForm\"])[1]") {
  
    #
    #Content::Inject::InjectHTML
    #[["html", "<div id=\"geo_button\" ></div>"], ["add_after", "#macysGlobalLayout"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'macysGlobalLayout'])[1]") {
      inject_before("<div class=\"mvShadowBottom\" data-ur-set='reverse-geocode' data-ur-id='1' data-ur-callback='submit_location()'><div  id=\"geo_button\" data-ur-reverse-geocode-component='rg-button'></div></div>")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "locatorForm"], ["selector", "form[name='locatorForm']"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//form[@name = 'locatorForm']") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("locatorForm")
          }
        }
      }
    }
    
    
    #
    #Content::Javascript::AddScriptTag
    #[["javascript_path", "http://dl.dropbox.com/u/3940085/moovweb/clients/macys-contract/js/store-locator-form.js"], ["add_after", "body > script:last-of-type"]]
    $("//body/script[position() = last()]") {
      insert_after("script") {
        attribute("src", asset('store-locator-form.js', 'js'))
        attribute("language", "javascript")
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "LocatorZipCode"], ["selector", "input[name='LocatorZipCode']"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//input[@name = 'LocatorZipCode']") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("LocatorZipCode")
          }
        }
      }
    }
    
    
    
    
  }
  
  
}
