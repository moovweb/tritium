#
#Config::IncludeBlockset
#[["blockset_name", "store_nav"]]
@import store_nav.ts



# ----- ParsedHTMLBlocks ----
html() {
  $("//table[@class='locatorForm']") {
    export("Location", "/store/index.ognc")
  }

  # Add page specific class
  $("/html/body") {
    add_class("mw_store_locator")
  }
  
  #Construct Map
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "store_table"], ["selector", "#macysGlobalLayout > table table"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'macysGlobalLayout']/table//table") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("store_table")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "column"], ["selector", ".store_table td"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' store_table ')]//td") {
      match($done, "no") {
        attribute("class") {
          value() {
              set("column")
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
    #Content::Inject::InjectHTML
    #[["html", "<span class='mw_address' >...addresses...</span>"], ["add_after", ".store_table .column > strong"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' store_table ')]//*[contains(concat(' ', @class, ' '), ' column ')]/strong") {
      inject_after("<span class='mw_address' >...addresses...</span>")
    }
    
    
    #
    #Content::Formatting::AccumulateInnerText
    #[["text_source_elements", "./div[position()>3 and position()<6]/span"], ["target_element", ".mw_address"], ["common_ancestor", ".store_table"], ["delimiter", " "]]
    $("//*[contains(concat(' ', @class, ' '), ' store_table ')]") {
      var("text", "")
      $("div[position()>3 and position()<6]/span") {
        var("text") {
          append(fetch("text()"))
          append(" ")
        }
      }
      var("text") {
        replace(/ $/, "")
      }
      $("(.//*[contains(concat(' ', @class, ' '), ' mw_address ')])[1]") {
        inner($text)
      }
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div id=\"mw_map_details\"><h1></h1><div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#macysGlobalLayout"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[@id = 'macysGlobalLayout'])[1]") {
      inject_before("<div id=\"mw_map_details\" data-ur-set='map' data-ur-state='disabled'><h1></h1><div>")
    }
    
    
    #
    #Content::Formatting::Duplicate
    #[["duplicate_me", ".store_table"], ["after_me", "#mw_map_details > h1"], ["multiple", "true"], ["single_target", "true"], ["single_source", ""]]
      # NOTE: This will not work until Tritium version 210 ( or later )
    #  $("(//*[@id = 'mw_map_details']/h1)[1]") {
    #    copy_here("//*[contains(concat(' ', @class, ' '), ' store_table ')]", "after")
    #  }
      $("//*[contains(concat(' ', @class, ' '), ' store_table ')]") {
        copy_to("(//*[@id = 'mw_map_details']/h1)[1]", "after")
      }
    
    
    #
    #The yahoo reverse geocoder doesnt like O'Farrell even though thats how it returns the address with the result data
    #Content::Formatting::SetInnerText
    #[["selector", "#mw_map_details > div .mw_address"], ["text", ""], ["match_string", "O'Farrell"], ["replace_string", "OFarrell"], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[@id = 'mw_map_details']/div//*[contains(concat(' ', @class, ' '), ' mw_address ')]") {
      inner() {
        replace("O'Farrell", "OFarrell")
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::Features::DynamicMapFromAddresses
  #[["add_after", "#mw_map_details > h1"], ["address_selector", "#mw_map_details > div .mw_address"], ["description_selector", "#mw_map_details > div"], ["icon_image_url", "http://dl.dropbox.com/u/3940085/moovweb/clients/macys/bigstar.png"], ["load_map_on_window_load", "true"], ["offset_element", "#mw_map_details"], ["domain_key", "macys.com"]]
  # WARNING: not done. need to get the api key in here

#
#  var("init_script") {
#    set("moovweb_map_globals = {locs: null, SW: null, NE: null, user_loc: null, addresses: [")
#  }
#
  $("//*[@id = 'mw_map_details']/div//*[contains(concat(' ', @class, ' '), ' mw_address ')]") {
    var(concat("address", index()), fetch("./text()"))
#
#    var("init_script") {
#      append("\"")
#      append(fetch("./text"))
#      append("\", ")
#    }
#
  }
#
#  var("init_script") {
#    replace(/, $/, "")
#    append("], description_ids: {")
#  }
#
  $("//*[@id = 'mw_map_details']/div") {
    var("id", fetch("./@id"))
    match($id, /^$/) {
    attribute("id") {
      value() {
        set("description")
          append(index())
        }
      }
    }
    attribute("description", "true")
    var("id", fetch("./@id"))
    var("init_script") {
      append("\"")
      append(var(concat("address", index())))
      append("\":\"")
      append($id)
      append("\",")
    }
  }

#
#  var("init_script") {
#    replace(/,$/, "")
#    append("}, current_address: null, icon_url: \"http://dl.dropbox.com/u/3940085/moovweb/clients/macys/bigstar.png\", button_title#: \"Map Results\", hide_button_title: \"Hide Map\", map_id: \"moovweb_id_833746\", offset_element_id: \"mw_map_details\" }")
#  }

#  $("//head") {
#    # TODO: put a real api key in here
#    inject_bottom("<script type='text/javascript' src='http://www.google.com/jsapi?key=xxx}'></script>")
#    inject_bottom(concat("<script type='text/javascript'>", $init_script,"</script>"))
#    inject_bottom(read("../v1_files/dynamic_map.css"))
#    inject_bottom("<script type='text/javascript'> window.addEventListener('load',moovweb_toggle_content, false) </script>")
#  }

  $("//*[@id = 'mw_map_details']/h1") {
    inject_after(read("../v1_files/map_button.html"))
    var("map_box") {
      set(read("../v1_files/map_box.html"))
      replace("MAP_CONTAINER_ID", "moovweb_id_833746")
    }
    inject_after($map_box)
  }
  $("//*[@id = 'mw_map_details']/div") {
    match("true", fetch(".//@description")) {
      move_to("//div[@id='moovweb_map_desc']", "top")
    }
    attribute("class") {
      value() {
        append(" mw_map_description")
      }
    }
  }

  
  #Refactor Map to be able to toggle map/descs
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#moovweb_map_container"], ["before_me", "#moovweb_map_box"], ["map_moves", ""]]
    $("(//*[@id = 'moovweb_map_box'])[1]") {
      move_here("(//*[@id = 'moovweb_map_container'])[1]", "before")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#moovweb_map_hide"], ["before_me", "#moovweb_map_show"], ["map_moves", ""]]
    $("(//*[@id = 'moovweb_map_show'])[1]") {
      move_here("(//*[@id = 'moovweb_map_hide'])[1]", "before")
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", "#moovweb_map_desc"], ["before_me", "#moovweb_map_box"], ["map_moves", ""]]
    $("(//*[@id = 'moovweb_map_box'])[1]") {
      move_here("(//*[@id = 'moovweb_map_desc'])[1]", "before")
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "onclick"], ["selector", "#moovweb_map_button_container"]]
    $("//*[@id = 'moovweb_map_button_container']") {
      attribute("onclick") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#moovweb_map_box"], ["class_name", "mvShowMapBox"], ["id", "mvMapBox"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'moovweb_map_box'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "mvShowMapBox")
          attribute("id", "mvMapBox")
          move_here("//*[@id = 'moovweb_map_box'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::WrapElement
    #[["selector", "#moovweb_map_desc"], ["class_name", "show_descriptions"], ["id", "mvMapDesc"], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
    var("found", "false")
    match($found, "false") {
      $("(//*[@id = 'moovweb_map_desc'])[1]") {
        var("found", "true")
        insert_before("div") {
          attribute("the_wrapper", "true")
          attribute("class", "show_descriptions")
          attribute("id", "mvMapDesc")
          move_here("//*[@id = 'moovweb_map_desc'][not (@the_wrapper)]", "bottom")
          attribute("the_wrapper") {
            remove()
          }
        }
      }
    }
    
    
    #Show Map
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "onclick"], ["value", "var desc = document.getElementById('mvMapDesc'); remove_class(desc, 'show_descriptions'); var mapbox = document.getElementById('mvMapBox'); remove_class(mapbox,'mvShowMapBox');"], ["selector", "#moovweb_map_hide"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'moovweb_map_hide']") {
        match($done, "no") {
            var("done", "yes")
          attribute("onclick") {
            value() {
                set("var desc = document.getElementById('mvMapDesc'); remove_class(desc, 'show_descriptions'); var mapbox = document.getElementById('mvMapBox'); remove_class(mapbox,'mvShowMapBox');")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::AddClassOnEvent
      #[["target", "#moovweb_map_hide"], ["trigger", "#moovweb_map_hide"], ["new_class", "mvCurrentBtn"], ["trigger_event", "mousedown"]]
      $("(//*[@id = 'moovweb_map_hide'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget58503")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[@id = 'moovweb_map_hide'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger58503")
            }
          }
        }
        var("trigger_id", fetch("./@id"))
      }
      match($trigger_id, not(/^$/)) {
        match($target_id, not(/^$/)) {
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mousedown', function(){add_class(document.getElementById('")
                append($target_id)
                append("'),'mvCurrentBtn');},false);")
              }
            }
          }
        }
      }
      
      #
      #Content::Formatting::Dynamic::RemoveClassOnEvent
      #[["target", "#moovweb_map_show"], ["trigger", "#moovweb_map_hide"], ["old_class", "mvCurrentBtn"], ["trigger_event", "mousedown"]]
      $("(//*[@id = 'moovweb_map_show'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget31384")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[@id = 'moovweb_map_hide'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger31384")
            }
          }
        }
        var("trigger_id", fetch("./@id"))
      }
      match($trigger_id, not(/^$/)) {
        match($target_id, not(/^$/)) {
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mousedown', function(){remove_class(document.getElementById('")
                append($target_id)
                append("'),'mvCurrentBtn');},false);")
              }
            }
          }
        }
      }
      
    # end BasicGroup
    
    #Show store list
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "onclick"], ["value", "var desc = document.getElementById('mvMapDesc'); add_class(desc, 'show_descriptions'); var mapbox = document.getElementById('mvMapBox'); add_class(mapbox,'mvShowMapBox');"], ["selector", "#moovweb_map_show"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'moovweb_map_show']") {
        match($done, "no") {
            var("done", "yes")
          attribute("onclick") {
            value() {
                set("var desc = document.getElementById('mvMapDesc'); add_class(desc, 'show_descriptions'); var mapbox = document.getElementById('mvMapBox'); add_class(mapbox,'mvShowMapBox');")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvCurrentBtn"], ["selector", "#moovweb_map_show"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'moovweb_map_show']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvCurrentBtn")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::AddClassOnEvent
      #[["target", "#moovweb_map_show"], ["trigger", "#moovweb_map_show"], ["new_class", "mvCurrentBtn"], ["trigger_event", "mousedown"]]
      $("(//*[@id = 'moovweb_map_show'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget80279")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[@id = 'moovweb_map_show'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger80279")
            }
          }
        }
        var("trigger_id", fetch("./@id"))
      }
      match($trigger_id, not(/^$/)) {
        match($target_id, not(/^$/)) {
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mousedown', function(){add_class(document.getElementById('")
                append($target_id)
                append("'),'mvCurrentBtn');},false);")
              }
            }
          }
        }
      }
      
      #
      #Content::Formatting::Dynamic::RemoveClassOnEvent
      #[["target", "#moovweb_map_hide"], ["trigger", "#moovweb_map_show"], ["old_class", "mvCurrentBtn"], ["trigger_event", "mousedown"]]
      $("(//*[@id = 'moovweb_map_hide'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstarget54223")
            }
          }
        }
        var("target_id", fetch("./@id"))
      }
      $("(//*[@id = 'moovweb_map_show'])[1]") {
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("addclasstrigger54223")
            }
          }
        }
        var("trigger_id", fetch("./@id"))
      }
      match($trigger_id, not(/^$/)) {
        match($target_id, not(/^$/)) {
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mousedown', function(){remove_class(document.getElementById('")
                append($target_id)
                append("'),'mvCurrentBtn');},false);")
              }
            }
          }
        }
      }
      
    # end BasicGroup
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "style"], ["value", "display:none"], ["selector", "#macysGlobalLayout"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'macysGlobalLayout']") {
    match($done, "no") {
        var("done", "yes")
      attribute("style") {
        value() {
            set("display:none")
        }
      }
    }
  }
  
  
  #Yupu
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapTextChildren
    #[["selector", ".store_table > div:nth-of-type(2) > .column"], ["tag_name", "div"], ["class_name", "mvHideElement"], ["multiple", "true"], ["split_delimiter", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' store_table ')]/div[position() = 2]/*[contains(concat(' ', @class, ' '), ' column ')]") {
      wrap_text_children("div", class: 'mvHideElement')
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<br/>"], ["add_after", ""], ["multiple", "true"], ["add_before", "b:contains(\"Tomorrow's Hours :\")"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("//b[contains(., \"Tomorrow's Hours :\")]") {
      inject_before("<br/>")
    }
    
    
    #page title
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#moovweb_map_button_container"], ["html", "<span class=\"mvSoreTitle\">Store Locator</span>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'moovweb_map_button_container']") {
        inner() {
          prepend("<span class=\"mvSoreTitle\">Store Locator</span>")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvTitle"], ["selector", "#moovweb_map_button_container"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'moovweb_map_button_container']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvTitle")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #Store List
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Store service
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::RemoveElements
        #[["selector", "img[alt=\"Arrow\"], img[src*=\"spacer.gif\"]"]]
        $("//img[@alt = \"Arrow\"]") {
          remove()
        }
        $("//img[contains(@src, \"spacer.gif\")]") {
          remove()
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvStoreServiceWrapper"], ["selector", ".column"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "img"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' column ')]") {
          match($done, "no") {
              var("conditional", "false")
                $(".//img") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
            attribute("class") {
              value() {
                  set("mvStoreServiceWrapper")
              }
            }
              }
          }
        }
        
        
        #
        #Content::CSS::RemoveStyles
        #[["selector", ".mvStoreServiceWrapper, .mvStoreServiceWrapper > div"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreServiceWrapper ')]") {
          attribute("style") {
            remove()
          }
        }
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreServiceWrapper ')]/div") {
          attribute("style") {
            remove()
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#moovweb_map_hide"], ["text", "Map"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'moovweb_map_hide']") {
          inner() {
            set("Map")
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#moovweb_map_show"], ["text", "Store List"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'moovweb_map_show']") {
          inner() {
            set("Store List")
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvStoreDirectionLink"], ["selector", ".column > a:contains(\"Directions\")"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' column ')]/a[contains(., \"Directions\")]") {
          match($done, "no") {
            attribute("class") {
              value() {
                  set("mvStoreDirectionLink")
              }
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvStoreServiceTitle\">STORE SERVICE</div>"], ["add_after", ""], ["multiple", "true"], ["add_before", ".mvStoreServiceWrapper"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreServiceWrapper ')]") {
          inject_before("<div class=\"mvStoreServiceTitle\">STORE SERVICE</div>")
        }
        
        
        #
        #Content::Formatting::WrapIndividualElements
        #[["selector", "a:contains(\"See more store hours\")"], ["tag_name", "div"], ["class_name", "mvMoreStoreHours"], ["id", ""], ["multiple", "true"]]
        $("//a[contains(., \"See more store hours\")]") {
          wrap("div") {
            attribute("class", "mvMoreStoreHours")
          }
        }
        
        
      # end BasicGroup
      
      #Store List Accordian
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvStoreListSelector"], ["selector", ".mw_address"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mw_address ')]") {
          match($done, "no") {
            $("..") {
            attribute("class") {
              value() {
                  set("mvStoreListSelector")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::MoveUp
        #[["move_me", ".mvStoreListSelector"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListSelector ')]") {
          move_to("..", "before")
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".store_table"], ["class_name", "mvStoreListContent"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", "div"], ["only_include_direct_children", "true"]]
        $("//*[contains(concat(' ', @class, ' '), ' store_table ')]") {
          $("(.//div)[1]") {
            # call it a divvv at first to make sure that the move_here
            # selector doesn't capture it and try to move it inside itself
            # - then later rename it to a div
            insert_before("div") {
              attribute("class", "mvStoreListContent")
            attribute("the_wrapper", "true")
              move_here("../div[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::Dynamic::Accordian4
        #[["link_selector", ".mvStoreListSelector"], ["content_selector", ".mvStoreListContent"], ["ancestor_selector", ".store_table"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
        var("anc_counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' store_table ')]") {
          var("anc_counter") {
            append("b")
          }
          var("counter", "")
          var("content_id_string", "[")
          $(".//*[contains(concat(' ', @class, ' '), ' mvStoreListContent ')]") {
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
                  append("49460")
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
          $(".//*[contains(concat(' ', @class, ' '), ' mvStoreListSelector ')]") {
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
                  append("49460")
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
        #Content::Formatting::WrapIndividualElements
        #[["selector", ".mvStoreListSelector > strong"], ["tag_name", "div"], ["class_name", "mvStoreName"], ["id", ""], ["multiple", "true"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListSelector ')]/strong") {
          wrap("div") {
            attribute("class", "mvStoreName")
          }
        }
        
        
        #
        #Content::Formatting::MoveBefore
        #[["move_me", ".mvStoreListSelector"], ["before_me", ".mvStoreListContent"], ["map_moves", "true"]]
        var("counter", "a")
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListContent ')]") {
          var("counter") {
            append("a")
          }
          attribute("id3592", $counter)
        }
        var("counter", "a")
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListSelector ')]") {
          var("counter") {
            append("a")
          }
          var("xpath") {
            set("//*[@id3592 = '")
            append($counter)
            append("']")
          }
          move_to($xpath, "before")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">− </span></span>"], ["add_after", ".mvStoreName > strong"], ["multiple", "true"], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreName ')]/strong") {
          inject_after("<span><span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></span>")
        }
        
        
      # end BasicGroup
      
      #Remove duplicated address
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvStoreListDE"], ["selector", ".mvStoreListContent  > div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ".mvStoreDirectionLink"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListContent ')]/div") {
          match($done, "no") {
              var("conditional", "false")
                $(".//*[contains(concat(' ', @class, ' '), ' mvStoreDirectionLink ')]") {
                  var("conditional", "true")
                }
              match($conditional, "true") {
            attribute("class") {
              value() {
                  set("mvStoreListDE")
              }
            }
              }
          }
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".mvStoreListDE + div, .mvStoreListDE + div + div, .mvStoreListDE ~ div > .mvStoreServiceTitle"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]/following-sibling::*[1]/self::div") {
          remove()
        }
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]/following-sibling::*[1]/self::div/following-sibling::*[1]/self::div") {
          remove()
        }
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]/following-sibling::div/*[contains(concat(' ', @class, ' '), ' mvStoreServiceTitle ')]") {
          remove()
        }
        
        
      # end BasicGroup
      
      #Remove Catalogs links
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::WrapTextChildren
        #[["selector", ".mvStoreListDE > span"], ["tag_name", "span"], ["class_name", ""], ["multiple", "true"], ["split_delimiter", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]/span") {
          wrap_text_children("span")
        }
        
        
        #
        #Content::Formatting::RemoveElements
        #[["selector", ".mvStoreListDE a:contains(\"Events\") + span, .mvStoreListDE a:contains(\"Catalogs\")"]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]//a[contains(., \"Events\")]/following-sibling::*[1]/self::span") {
          remove()
        }
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]//a[contains(., \"Catalogs\")]") {
          remove()
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvStoreListDE > span > span"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]/span/span") {
        remove()
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvStorePhone"], ["selector", ".mvStoreListDE +div"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvStoreListDE ')]/following-sibling::*[1]/self::div") {
        match($done, "no") {
          attribute("class") {
            value() {
                set("mvStorePhone")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #page nav
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #move nav after page title
      #Content::Formatting::MoveAfter
      #[["move_me", ".mvStoreNavWrapper"], ["after_me", "#moovweb_map_container"], ["map_multiple", ""]]
      $("(//*[@id = 'moovweb_map_container'])[1]") {
        move_here("(//*[contains(concat(' ', @class, ' '), ' mvStoreNavWrapper ')])[1]", "after")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvPageMenu\"></span>"], ["add_after", ".mvSoreTitle"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvSoreTitle ')])[1]") {
        inject_after("<span class=\"mvPageMenu\"></span>")
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
              append("19410")
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
              append("19410")
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
    
  # end BasicGroup
  
  ### SJ : Adding map back as uranium widget ##

# Adding tabs back causes the map widget to fail in a weird way ... no good

 $("//div[@id='localContentContainer']") {

  attribute("data-ur-set","tabs")

  $("//div[@id='mw_map_details']"){
    inject_top("<div data-ur-map-component='user_location' data-ur-state='enabled'></div>")

    inject_top("<div data-ur-map-component='icon'></div>")

    $("./div[@data-ur-map-component='icon']"){
      attribute("data-ur-url", asset("bigstar.png", "image") )
      attribute("data-ur-width", "20")
      attribute("data-ur-height", "20")
    }

    # Setup tabs widget
    $("./div[@id='moovweb_map_container']/div/a"){
      attribute("data-ur-tabs-component","button")
      attribute("data-ur-tab-id", index())
      match(index(), "2") {
        attribute("data-ur-state","enabled")
      }
    }

    $("./div[@id='mvMapDesc']") {
      attribute("data-ur-tabs-component","content")
      attribute("data-ur-tab-id", "2")
      attribute("data-ur-state","enabled")

      # Hacky v1 un-hack (it seems to add an extra empty description)
      $("./div[@id='moovweb_map_desc']/div[position()=1]") {
        remove()
      }

      $("./div[@id='moovweb_map_desc']") {
        attribute("style","")

        $("./div") {
          attribute("data-ur-map-component","description")
          $("./span/span[@class='mw_address']") { 
            attribute("data-ur-map-component","address")
          }
        }
      }
    }

    $("./div[@id='mvMapBox']") {
      attribute("data-ur-tabs-component","content")
      attribute("data-ur-tab-id", "1")

      $("./div[@id='moovweb_map_box']"){
        attribute("style","")   # Unhack the v1 conversion stuff above
        $("./div[@class='moovweb_dynamic_map']"){
          attribute("data-ur-map-component","canvas")
          attribute("style","width: 100%; height: 100%") # Unhack v1
        }
      }
    }

  }
  

  

}

}
