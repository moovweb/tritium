
# ----- ConfigBlocks ----
#
#Config::IncludeBlockset
#[["blockset_name", "base"]]
#@import base.ts



#add class to body so that the css can be added to main. css
$("//html/body"){
 add_class("mvStoreLocator") 
}

  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "event"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /event/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvEventDates"], ["selector", ".in_stdt_endt"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' in_stdt_endt ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvEventDates")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvEventMain"], ["selector", ".bl_mainContent"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' bl_mainContent ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvEventMain")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".store_events_header > img"]]
    $("//*[contains(concat(' ', @class, ' '), ' store_events_header ')]/img") {
      remove()
    }
    
    
  }
  
  #
  #Content::Formatting::AddFileAttribute
  #[["attribute", "src"], ["value", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/contemporary.png"], ["selector", ".mvBDhpImage img"]]
  # NOTE: just sets the attribute - doesn't do anything special for files
  $("//*[contains(concat(' ', @class, ' '), ' mvBDhpImage ')]//img") {
    attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/contemporary.png")
  }
  
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", ".mvBDCurrentPage"], ["to_beginning_of_me", ".mvBDhpImage"], ["map_multiple", ""], ["ancestor_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mvBDhpImage ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' mvBDCurrentPage ')])[1]", "top")
  }
  
  
  #Store Details Page
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #create store header
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".store_details_header"], ["html", "<div class=\"mvStoreHeader\"></div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' store_details_header ')]") {
        inner("<div class=\"mvStoreHeader\"></div>")
      }
      
      
      #
      #Content::Formatting::DuplicateInnerText
      #[["duplicate_source", ".bl_breadcrumb_object span"], ["duplicate_target", ".mvStoreHeader"], ["multiple", ""], ["common_ancestor", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')]//span)[1]") {
        var("text", fetch("text()"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvStoreHeader ')])[1]") {
          inner($text)
        }
      }
      
      
    # end BasicGroup
    
    #removeImageCategoryHeaders
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #StoreDetails
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvStoreDetails mvStoreInfoHeader"], ["selector", ".store_details_landing img[src*=\"store_landing_details.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' store_details_landing ')]//img[contains(@src, \"store_landing_details.gif\")]") {
          match($done, "no") {
            $("..") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvStoreDetails mvStoreInfoHeader")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".mvStoreDetails"], ["html", "store details"], ["prepend", ""], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreDetails ')]") {
          inner("store details")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvTheBScene mvStoreInfoHeader"], ["selector", ".store_details_landing img[src*=\"store_landing_scene.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' store_details_landing ')]//img[contains(@src, \"store_landing_scene.gif\")]") {
          match($done, "no") {
            $("..") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvTheBScene mvStoreInfoHeader")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".mvTheBScene"], ["html", "The B Scene"], ["prepend", ""], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvTheBScene ')]") {
          inner("The B Scene")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvStoreHours mvStoreInfoHeader"], ["selector", ".store_details_landing img[src*=\"store_landing_hours.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' store_details_landing ')]//img[contains(@src, \"store_landing_hours.gif\")]") {
          match($done, "no") {
            $("..") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvStoreHours mvStoreInfoHeader")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".mvStoreHours"], ["html", "Store Hours"], ["prepend", ""], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvStoreHours ')]") {
          inner("Store Hours")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvServices mvStoreInfoHeader"], ["selector", ".store_details_landing img[src*=\"store_location_services.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' store_details_landing ')]//img[contains(@src, \"store_location_services.gif\")]") {
          match($done, "no") {
            $("..") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvServices mvStoreInfoHeader")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".mvServices"], ["html", "Services"], ["prepend", ""], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvServices ')]") {
          inner("Services")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRestaurants mvStoreInfoHeader"], ["selector", ".store_details_landing img[src*=\"store_landing_restaurants.gif\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' store_details_landing ')]//img[contains(@src, \"store_landing_restaurants.gif\")]") {
          match($done, "no") {
            $("..") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvRestaurants mvStoreInfoHeader")
              }
            }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerHTML
        #[["selector", ".mvRestaurants"], ["html", "Restaurants"], ["prepend", ""], ["append", ""]]
        $("//*[contains(concat(' ', @class, ' '), ' mvRestaurants ')]") {
          inner("Restaurants")
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
  # end BasicGroup
  
  #StoreEvents
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/store\\/event\\/"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/store\/event\//) {
  
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".calnavleft"], ["html", "<"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' calnavleft ')]") {
      inner("<")
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".calnavright"], ["html", ">"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' calnavright ')]") {
      inner(">")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvStoreEventsHeader\">Store <span class=\"mvPinkText\">Events</span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_breadcrumb_object"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')])[1]") {
      inject_before("<div class=\"mvStoreEventsHeader\">Store <span class=\"mvPinkText\">Events</span></div>")
    }
    
    
    #create store header
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvStoreHeader\" id=\"mvStoreTitleText\"></div>"], ["add_after", ".mvStoreEventsHeader"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvStoreEventsHeader ')])[1]") {
        inject_after("<div class=\"mvStoreHeader\" id=\"mvStoreTitleText\"></div>")
      }
      
      
      #
      #Content::Formatting::DuplicateInnerText
      #[["duplicate_source", "span.bl_breadcrumb_bold"], ["duplicate_target", ".mvStoreHeader"], ["multiple", ""], ["common_ancestor", ""]]
      $("(//span[contains(concat(' ', @class, ' '), ' bl_breadcrumb_bold ')])[1]") {
        var("text", fetch("text()"))
        $("(//*[contains(concat(' ', @class, ' '), ' mvStoreHeader ')])[1]") {
          inner($text)
        }
      }
      
      
    # end BasicGroup
    
  }
  
  #Storeindex
  #Group::URLMatcherGroup
  #[["url_matcher", "\\/store\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /\/store\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvStoreLocations"], ["selector", ".store_location_go img"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' store_location_go ')]//img") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvStoreLocations")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "type"], ["value", "submit"], ["selector", ".store_location_go img"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' store_location_go ')]//img") {
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
    #[["attribute", "value"], ["value", "GO"], ["selector", ".store_location_go img"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' store_location_go ')]//img") {
      match($done, "no") {
          var("done", "yes")
        attribute("value") {
          value() {
              set("GO")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", ".store_location_go img"], ["new_tag_name", "input"], ["class_name", "mvButton"]]
    $("//*[contains(concat(' ', @class, ' '), ' store_location_go ')]//img") {
      name("input")
      attribute("class", "mvButton")
    }
    
    
    #store location dropdown
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".store_location_bg > *"]]
      $("//*[contains(concat(' ', @class, ' '), ' store_location_bg ')]/*") {
        remove()
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "  <div class=\"mvBDAccordionContent\">       <form action=\"/store/index.ognc\" method=\"get\" name=\"dds\" id=\"dds\">         <div class=\"store_location_form\">           <input type=\"hidden\" name=\"action\" value=\"STORE_DETAIL\" /> <input type=\"hidden\"           name=\"lstRegion\" value=\"all\" /> <select style=\"width:255px\" onchange=           \"this.form.submit();\" name=\"storeId\" id=\"storeId\">             <option value=\"\">               Choose a Store             </option>              <option value=\"50014\">               CA:Stanford             </option>              <option value=\"50015\">               CA:Century City             </option>              <option value=\"50016\">               CA:Beverly Center             </option>              <option value=\"50017\">               CA:Sherman Oaks Fashion Square             </option>              <option value=\"50018\">               CA:Newport Fashion Island             </option>              <option value=\"110039\">               CA:San Francisco Centre             </option>              <option value=\"110042\">               CA:Fashion Valley, San Diego             </option>              <option value=\"110048\">               CA:South Coast Plaza             </option>              <option value=\"110056\">               CA:Santa Monica Place             </option>              <option value=\"50007\">               FL:Boca Raton Town Center             </option>              <option value=\"50008\">               FL:Aventura             </option>              <option value=\"50009\">               FL:The Falls, Miami             </option>              <option value=\"50010\">               FL:Palm Beach Gardens             </option>              <option value=\"60001\">               FL:Orlando, The Mall at Millenia             </option>              <option value=\"110059\">               FL:Dolphin Mall Outlet             </option>              <option value=\"110061\">               FL:Sawgrass Mills Outlet             </option>              <option value=\"110005\">               GA:Perimeter Mall, Atlanta             </option>              <option value=\"110006\">               GA:Lenox Square             </option>              <option value=\"50011\">               IL:North Michigan Avenue             </option>              <option value=\"50012\">               IL:Old Orchard             </option>              <option value=\"70001\">               IL:Medinah Home, Chicago             </option>              <option value=\"110004\">               IL:Oakbrook Center Home             </option>              <option value=\"50005\">               MD:White Flint             </option>              <option value=\"110049\">               MD:Wisconsin Place, Chevy Chase             </option>              <option value=\"50003\">               MA:Chestnut Hill             </option>              <option value=\"50013\">               MN:Mall of America             </option>              <option value=\"60002\">               NV:Las Vegas Fashion Show Home             </option>              <option value=\"4\">               NJ:Bridgewater Commons             </option>              <option value=\"10001\">               NJ:Bergen Shops at Riverside             </option>              <option value=\"10002\">               NJ:Short Hills             </option>              <option value=\"40001\">               NJ:Willowbrook             </option>              <option value=\"110058\">               NJ:Bergen Town Center Outlet             </option>              <option value=\"40002\">               NY:59th Street             </option>              <option value=\"50001\">               NY:White Plains             </option>              <option value=\"50002\">               NY:Roosevelt Field             </option>              <option value=\"50019\">               NY:Huntington Walt Whitman             </option>              <option value=\"110035\">               NY:SoHo             </option>              <option value=\"110036\">               NY:Roosevelt Field Furniture             </option>              <option value=\"110050\">               NY:Westchester Furniture Clearance             </option>              <option value=\"20001\">               PA:King of Prussia (The Court)             </option>              <option value=\"50004\">               PA:Willow Grove Park             </option>              <option value=\"50006\">               VA:Tysons Corner Center             </option>              <option value=\"110057\">               VA:Potomac Mills Outlet             </option>              <option value=\"110052\">               UAE:The Dubai Mall             </option>           </select>         </div>       </form>     </div>"], ["add_after", ".store_location_bg"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' store_location_bg ')])[1]") {
        inject_after("  <div class=\"mvBDAccordionContent\">       <form action=\"/store/index.ognc\" method=\"get\" name=\"dds\" id=\"dds\">         <div class=\"store_location_form\">           <input type=\"hidden\" name=\"action\" value=\"STORE_DETAIL\" /> <input type=\"hidden\"           name=\"lstRegion\" value=\"all\" /> <select style=\"width:255px\" onchange=           \"if(x$('#storeId')[0].selectedIndex!=0){this.form.submit();}\" name=\"storeId\" id=\"storeId\">             <option value=\"\">               Choose a Store             </option>              <option value=\"50014\">               CA:Stanford             </option>              <option value=\"50015\">               CA:Century City             </option>              <option value=\"50016\">               CA:Beverly Center             </option>              <option value=\"50017\">               CA:Sherman Oaks Fashion Square             </option>              <option value=\"50018\">               CA:Newport Fashion Island             </option>              <option value=\"110039\">               CA:San Francisco Centre             </option>              <option value=\"110042\">               CA:Fashion Valley, San Diego             </option>              <option value=\"110048\">               CA:South Coast Plaza             </option>              <option value=\"110056\">               CA:Santa Monica Place             </option>              <option value=\"50007\">               FL:Boca Raton Town Center             </option>              <option value=\"50008\">               FL:Aventura             </option>              <option value=\"50009\">               FL:The Falls, Miami             </option>              <option value=\"50010\">               FL:Palm Beach Gardens             </option>              <option value=\"60001\">               FL:Orlando, The Mall at Millenia             </option>              <option value=\"110059\">               FL:Dolphin Mall Outlet             </option>              <option value=\"110061\">               FL:Sawgrass Mills Outlet             </option>              <option value=\"110005\">               GA:Perimeter Mall, Atlanta             </option>              <option value=\"110006\">               GA:Lenox Square             </option>              <option value=\"50011\">               IL:North Michigan Avenue             </option>              <option value=\"50012\">               IL:Old Orchard             </option>              <option value=\"70001\">               IL:Medinah Home, Chicago             </option>              <option value=\"110004\">               IL:Oakbrook Center Home             </option>              <option value=\"50005\">               MD:White Flint             </option>              <option value=\"110049\">               MD:Wisconsin Place, Chevy Chase             </option>              <option value=\"50003\">               MA:Chestnut Hill             </option>              <option value=\"50013\">               MN:Mall of America             </option>              <option value=\"60002\">               NV:Las Vegas Fashion Show Home             </option>              <option value=\"4\">               NJ:Bridgewater Commons             </option>              <option value=\"10001\">               NJ:Bergen Shops at Riverside             </option>              <option value=\"10002\">               NJ:Short Hills             </option>              <option value=\"40001\">               NJ:Willowbrook             </option>              <option value=\"110058\">               NJ:Bergen Town Center Outlet             </option>              <option value=\"40002\">               NY:59th Street             </option>              <option value=\"50001\">               NY:White Plains             </option>              <option value=\"50002\">               NY:Roosevelt Field             </option>              <option value=\"50019\">               NY:Huntington Walt Whitman             </option>              <option value=\"110035\">               NY:SoHo             </option>              <option value=\"110036\">               NY:Roosevelt Field Furniture             </option>              <option value=\"110050\">               NY:Westchester Furniture Clearance             </option>              <option value=\"20001\">               PA:King of Prussia (The Court)             </option>              <option value=\"50004\">               PA:Willow Grove Park             </option>              <option value=\"50006\">               VA:Tysons Corner Center             </option>              <option value=\"110057\">               VA:Potomac Mills Outlet             </option>              <option value=\"110052\">               UAE:The Dubai Mall             </option>           </select>         </div>       </form>     </div>")
      }
      
      
    # end BasicGroup
    
  }
  
  #
  #Group::IgnoreGroup
  #[]
  # No match necessary - contents will be commented out
  #  #
  #  #Content::Formatting::RemoveElements
  #  #[["selector", ".bl_breadcrumb_object"]]
  #  $("//*[contains(concat(' ', @class, ' '), ' bl_breadcrumb_object ')]") {
  #    remove()
  #  }
  #  
  #  
  
  
  #
  #Content::Javascript::AddInlineScriptTag
  #[["script", "document.body.addEventListener('load', function (){var asdf = NameArray[NameArray.length-1]; x$('.mvStoreHeader')[0].innerText = asdf});"], ["add_after", ""], ["add_before", ".mvStoreHeader"]]
    $("(//*[contains(concat(' ', @class, ' '), ' mvStoreHeader ')])[1]") {
      insert_before("script") {
        attribute("language", "javascript")
        inner("document.body.addEventListener('load', function (){var asdf = NameArray[NameArray.length-1]; x$('.mvStoreHeader')[0].innerText = asdf});")
      }
    }
  $("//a[@id='resetDates']") {
    attribute("href", "javascript://")
  }
  
  $("//ul[@class='store_events_filter']/li/a") {
    attribute("href", "javascript://")
  }
#}