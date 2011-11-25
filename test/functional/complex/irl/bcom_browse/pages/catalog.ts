
$("//div[@id='coach_thumbnailsContainer']"){
  wrap("div"){
    attribute("id","thumbnails")
  }
  $(".//a | .//a/following-sibling::div[1]"){
    wrap("div"){
    }
  }
}

  # force the path to correct qury parameter 
  match($path){
    # with(/shop\/women\?/){
    #   $path = concat($path, "?MVshoes=1")
    #   export("Path", $path)
    # }
    with(/shop\/contemporary\?/){
      $path = concat($path, "?MVcontemporary=1")
      export("Path", $path)
    }
    # with(/shop\/shoes\?/) {
    #   $path = concat($path, "?MVshoes=1")
    #   export("Path", $path)
    # }
    # with(/shop\/handbags\?/) {
    #   $path = concat($path, "?MVhandbags=1")
    #   export("Path", $path)
    # }
    # with(/shop\/jewelry-accessories\?/) {
    #   $path = concat($path, "?MVaccessories=1")
    #   export("Path", $path)
    # }
    # with(/shop\/beauty\?/) {
    #   $path = concat($path, "?MVbeauty=1")
    #   export("Path", $path)
    # }
    # with(/shop\/mens\?/){
    #   $path = concat($path, "?MVmen=1")
    #   export("Path", $path)
    # }
    # with(/shop\/kids\?/){
    #   $path = concat($path, "?MVkids=1")
    #   export("Path", $path)
    # }
    # with(/shop\/home\?/){
    #   $path = concat($path, "?MVhome=1")
    #   export("Path", $path)
    # }
    with(/shop\/gifts\?/){
      $path = concat($path, "?MVgift=1")
      export("Path", $path)
    }
    with(/shop\/sale\?/){
      $path = concat($path, "?MVsave=1")
      export("Path", $path)
    }
  }
  
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#coach_header_logoContainer"], ["negate", ""]]
  $("(//*[@id = 'coach_header_logoContainer'])[1]") {
  
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".bl_catsplash_container"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' bl_catsplash_container ')])[1]") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvCoachImageHeader\">   <img src=\"http://assets.bloomingdales.com/web20/assets/img/coach/header/coach_header_logo.gif\" alt=\"Coach Logo\">   </div> <div class=\"gn_left_nav_container mvBorderWrap\"> <ul> <li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21533&cm_sp=Coach_Landing-_-TOP_NAV-_-all_handbags&PageID=92487387942545\">handbags</a>   </li><li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21534&amp;cm_sp=Coach_Landing-_-TOP_NAV-_-accessories\">accessories</a>   </li><li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21535&cm_sp=Coach_Landing-_-TOP_NAV-_-shoes\">shoes</a>  </li><li> <a href=\"/coach/catalog/index.ognc?CategoryID=22774&cm_sp=Coach_Landing-_-TOP_NAV-_-watches&PageID=97816300579098\">watches</a>   </li><li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21533&cm_sp=Coach_Landing-_-TOP_NAV-_-all_handbags&PageID=92487387942545\">what's new</a>   </li><li>     <a href=\"/coach/catalog/index.ognc?CategoryID=21538&cm_sp=Coach_Landing-_-TOP_NAV-_-poppy&PageID=92507496639105\">poppy</a>     </li>     </ul> </div>"], ["add_after", "#bl_hp_main"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'bl_hp_main'])[1]") {
        inject_after("<div class=\"mvCoachImageHeader\">   <img src=\"http://assets.bloomingdales.com/web20/assets/img/coach/header/coach_header_logo.gif\" alt=\"Coach Logo\">   </div> <div class=\"gn_left_nav_container mvBorderWrap\"> <ul> <li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21533&cm_sp=Coach_Landing-_-TOP_NAV-_-all_handbags&PageID=92487387942545\">handbags</a>   </li><li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21534&amp;cm_sp=Coach_Landing-_-TOP_NAV-_-accessories\">accessories</a>   </li><li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21535&cm_sp=Coach_Landing-_-TOP_NAV-_-shoes\">shoes</a>  </li><li> <a href=\"/coach/catalog/index.ognc?CategoryID=22774&cm_sp=Coach_Landing-_-TOP_NAV-_-watches&PageID=97816300579098\">watches</a>   </li><li>   <a href=\"/coach/catalog/index.ognc?CategoryID=21534&PageID=92490265802504\">what's new</a>   </li><li>     <a href=\"/coach/catalog/index.ognc?CategoryID=21538&cm_sp=Coach_Landing-_-TOP_NAV-_-poppy&PageID=92507496639105\">poppy</a>     </li> <li>     <a href=\"/coach/catalog/index.ognc?CategoryID=23304&amp;cm_sp=Coach_Landing-_-TOP_NAV-_-gifts\">gifts</a>     </li><li>     <a href=\"/coach/catalog/index.ognc?CategoryID=23305&amp;cm_sp=Coach_Landing-_-TOP_NAV-_-special_offers\">special offers</a>     </li>    </ul> </div>")
      }
      
      
    }
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".coach_subcategory_header"]]
    # $("//*[contains(concat(' ', @class, ' '), ' coach_subcategory_header ')]") {
    #   remove()
    # }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bq_template1_pool1"]]
    $("//*[@id = 'bq_template1_pool1']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_thumbnailsContainer .coach_backToTopContainer"]]
    #$("//*[@id = 'coach_thumbnailsContainer']//*[contains(concat(' ', @class, ' '), ' coach_backToTopContainer ')]") {
    #  remove()
    #}
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_thumbnailsContainer .clearBoth"]]
    $("//*[@id = 'coach_thumbnailsContainer']//*[contains(concat(' ', @class, ' '), ' clearBoth ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_topNavContainer"]]
    $("//*[@id = 'coach_topNavContainer']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_thumbnailsContainer .firstTwoProducts"]]
    $("(//*[@id = 'coach_thumbnailsContainer']//*[contains(concat(' ', @class, ' '), ' firstTwoProducts ')])") {
      $("./../../div[@class='coach_eolProductThumbnails' and position() = 1]/div[@class='firstTwoProducts']") {
        $("./div[@class='productThumbnail']") {
          add_class("mvFirstTwo")
        }
      }
      $("./div[contains(@class,'productThumbnail')]") {
        move_to("../..")
      }
      remove()
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".coach_eolProductThumbnails > div"]]
    $("//*[contains(concat(' ', @class, ' '), ' coach_eolProductThumbnails ')]/div") {
      move_to("..", "before")
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#coach_thumbnailsContainer .coach_eolProductThumbnails"]]
    $("//*[@id = 'coach_thumbnailsContainer']//*[contains(concat(' ', @class, ' '), ' coach_eolProductThumbnails ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "thumbnails"], ["selector", "#coach_thumbnailsContainer"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'coach_thumbnailsContainer']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("thumbnails")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCoachPage"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvCoachPage")
          }
        }
      }
    }
    
    
  }
  
  
  #
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//li/a[contains(text(),\"Skincare Guide\")]/.."]]
    $("//li/a[contains(text(),\"Skincare Guide\")]/..") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//li/a[contains(@href,\"FASHION%20INDEX\")]/.."]]
    $("//li/a[contains(@href,\"FASHION%20INDEX\")]/..") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//li/a[contains(@href,\"Designer%20Shop\")]/.."]]
    $("//li/a[contains(@href,\"Designer%20Shop\")]/..") {
      remove()
    }
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "img.extras[src*=\"video.gif\"]"]]
  $("//img[contains(concat(' ', @class, ' '), ' extras ') and contains(@src, \"video.gif\")]") {
    remove()
  }
  
  
  #
  #Content::Formatting::AddQueryParameter
  #[["query_parameter_name", "mvView"], ["query_parameter_value", "1"], ["selector", "#filters form"], ["tag_attribute", "action"], ["if_not_present", ""], ["get_parameter_value_from_chain_args", ""]]
  $("//*[@id = 'filters']//form") {
    attribute("action") {
      value() {
        append("?mvView=1")
        # change the last question mark into an ampersand for valid query parameters
        replace(/(\?.+)\?/, "\\1&")
      }
    }
  }
  
  
  #
  #Content::Formatting::MoveBefore
  #[["move_me", ".bl_nav_side_no_padding"], ["before_me", "#mvBDSiteMenuHeader"], ["map_moves", ""]]
  $("(//*[@id = 'mvBDSiteMenuHeader'])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')])[1]", "before")
  }
  
  
  #
  #Content::Formatting::MoveToBeginningOf
  #[["move_me", "#bq_template3_products_container"], ["to_beginning_of_me", ".bl_main"], ["map_multiple", ""], ["ancestor_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
    move_here("(//*[@id = 'bq_template3_products_container'])[1]", "top")
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#bl_bq_main"]]
  $("//*[@id = 'bl_bq_main']") {
    remove()
  }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#iShip_gwpThumbnailContainer"]]
  $("//*[@id = 'iShip_gwpThumbnailContainer']") {
    remove()
  }
  
  
  #bcomsplashPages
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #womenSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVwomen"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVwomen\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", " <div class=\"mvSplash\" id=\"moovWomenSplashContainer\">     <div class=\"pageName\">       Women     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvDresses\"><span>Dresses</span></li>            <li class=\"mvTops\"><span>Tops</span></li>            <li class=\"mvCoats\"><span>Coats</span></li>            <li class=\"mvDenim\"><span>Denim</span></li>            <li class=\"mvIntimates\"><span>Intimates</span></li>         </ul>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before(" <div class=\"mvSplash\" id=\"moovWomenSplashContainer\">     <div class=\"pageName\">       Women     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvDresses\"><span class='splash_text-dresses'></span></li>            <li class=\"mvTops\"><span class='splash_text-tops'></span></li>            <li class=\"mvCoats\"><span class='splash_text-coats'></span></li>            <li class=\"mvDenim\"><span class='splash_text-denim'></span></li>            <li class=\"mvIntimates\"><span class='splash_text-intimates'></span></li>         </ul>       </div>     </div>   </div>")
      }

      #Attributes
      $("//div[@id='gn_left_nav_container']") {
        $("div/ul/li/a[contains(@href, 'intimates-shapewear')]") {
          add_class("mvIntimatesLink")
        }
        $("div/ul/li/a[contains(@href, 'coats-jackets')]") {
          add_class("mvCoatsLink")
        }
        $("div/ul/li/a[contains(@href, 'denim')]") {
          add_class("mvDenimLink")
        }
        $("div/ul/li/a[contains(@href, 'tops')]") {
          add_class("mvTopsLink")
        }
        $("div/ul/li/a[contains(@href, 'dresses')]") {
          add_class("mvDressesLink")
        }
      }

      #eventTriggers
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvIntimatesLink"], ["target_event", "click"], ["trigger", ".mvIntimates"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvIntimatesLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("47913")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvIntimates ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("47913")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvDenimLink"], ["target_event", "click"], ["trigger", ".mvDenim"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDenimLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("95645")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDenim ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("95645")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvCoatsLink"], ["target_event", "click"], ["trigger", ".mvCoats"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvCoatsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("22539")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvCoats ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("22539")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvTopsLink"], ["target_event", "click"], ["trigger", ".mvTops"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTopsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("2478")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTops ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("2478")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvDressesLink"], ["target_event", "click"], ["trigger", ".mvDresses"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDressesLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("41752")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDresses ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("41752")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    }
    
    #shoesSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVshoes"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVshoes\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "  <div class=\"mvSplash\" id=\"moovShoesSplashContainer\">     <div class=\"pageName\">       Shoes     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvWedges\"><span>Wedges</span></li>            <li class=\"mvAnkleBoots\"><span>Ankle Boots</span></li>            <li class=\"mvTallBoots\"><span>Tall Boots</span></li>            <li class=\"mvFlats\"><span>Flats</span></li>            <li class=\"mvPumps\"><span>Pumps</span></li>         </ul>         <a class=\"mvAnkleBootsLink\" href=\"?CategoryID=17404&amp;PageID=74752740207364\"></a>         <a class=\"mvTallBootsLink\" href=\"?CategoryID=17408&PageID=74770004375421\"></a>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div class=\"mvSplash\" id=\"moovShoesSplashContainer\"><div class=\"pageName\">Shoes</div> <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvWedges\"><span class='splash_text-wedges'></span></li>            <li class=\"mvAnkleBoots\"><span class='splash_text-ankleboots'></span></li>            <li class=\"mvTallBoots\"><span class='splash_text-tallboots'></span></li>            <li class=\"mvFlats\"><span class='splash_text-flats'></span></li>            <li class=\"mvPumps\"><span class='splash_text-pumps'></span></li>         </ul>         <a class=\"mvAnkleBootsLink\" href=\"/catalog/index.ognc?CategoryID=17404&PageID=74752740207364\"></a>         <a class=\"mvTallBootsLink\" href=\"/catalog/index.ognc?CategoryID=17408&PageID=74770004375421\"></a>       </div>     </div>   </div>")
      }

      #Attributes
      $("//div[@id='gn_left_nav_container']") {
        $("div/ul/li/a[contains(@href, 'wedges')]") {
          add_class("mvWedgesLink")
        }
        # These are being injected since they are not in the menu
        #$("div/ul/li/a[contains(@href, 'boots')]") {
        #  add_class("mvAnkleBootsLink")
        #}
        #$("div/ul/li/a[contains(@href, 'boots')]") {
        #  add_class("mvTallBootsLink")
        #}
        $("div/ul/li/a[contains(@href, 'flats')]") {
          add_class("mvFlatsLink")
        }
        $("div/ul/li/a[contains(@href, 'pumps')]") {
          add_class("mvPumpsLink")
        }
      }

      #eventTriggers
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".gn_left_nav_section a[href*=\"Flats\"]"], ["target_event", "click"], ["trigger", ".mvFlats"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFlatsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("94871")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFlats ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("94871")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvAnkleBootsLink"], ["target_event", "click"], ["trigger", ".mvAnkleBoots"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvAnkleBootsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("28489")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvAnkleBoots ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("28489")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvTallBootsLink"], ["target_event", "click"], ["trigger", ".mvTallBoots"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTallBootsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("87597")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTallBoots ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("87597")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvPumpsLink"], ["target_event", "click"], ["trigger", ".mvPumps"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvPumpsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("27035")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvPumps ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("27035")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvWedgesLink"], ["target_event", "click"], ["trigger", ".mvWedges"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvWedgesLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("60158")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvWedges ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("60158")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    }
    
    #accessoriesSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVaccessories"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVaccessories\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", " <div class=\"mvSplash\" id=\"moovMenSplashContainer\">     <div class=\"pageName\">       Men     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvCoatsJackets\"><span>Coats &amp;<br />           Jackets</span></li>            <li class=\"mvBoots\"><span>Boots</span></li>            <li class=\"mvSweaters\"><span>Sweaters</span></li>            <li class=\"mvDenim\"><span>Denim</span></li>            <li class=\"mvAccessories\"><span>Accessories</span></li>         </ul>         <a class=\"mvBootsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20620&PageID=88564548903541\"></a>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before(" <div class=\"mvSplash\" id=\"moovAccessoriesSplashContainer\">     <div class=\"pageName\">       Jewelry & Accessories     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvFineJewelery\"><span class='splash_text-finejewelry'></span></li>            <li class=\"mvSunglasses\"><span class='splash_text-sunglasses'></span></li>            <li class=\"mvWatches\"><span class='splash_text-watches'></span></li>            <li class=\"mvFJewelery\"><span class='splash_text-fashionjewelry'></span></li>            <li class=\"mvScarves\"><span></span></li>         </ul>         <a class=\"mvBootsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20620&PageID=88564548903541\"></a>       </div>     </div>   </div>")
      }
      
      $("//div[@id='moovRight']/ul/li[contains(@class, 'mvFineJewelery')]/span"){
        wrap('a')
        $('..'){
          attribute("href", "/shop/fine-jewelry?id=16975&cm_sp=FineJewerly-_-Leftnav-_-JAFineJewelry")
          add_class("splash_text-finejewelry")
        }
      }
      
      $("//div[@id='moovRight']/ul/li[contains(@class, 'mvSunglasses')]/span"){
        wrap('a')
        $('..'){
          attribute("href", "/catalog/index.ognc?CategoryID=4520&AdID=22126&LinkType=SiteAd&LinkLoc=3376&PageID=19414086289335&cm_re=0.0.0-_-TEMP2_JEWELRY_ACCESS_POOL3-_-IMAGEMAP%20--%2022126%20--%204520%3AAll%20Sunglasses")
          add_class("splash_text-sunglasses")
        }
      }
      
      $("//div[@id='moovRight']/ul/li[contains(@class, 'mvWatches')]/span"){
        wrap('a')
        $('..'){
          attribute("href", "/catalog/index.ognc?CategoryID=20532&AdID=22126&LinkType=SiteAd&LinkLoc=3376&PageID=88187619115236&cm_re=0.0.0-_-TEMP2_JEWELRY_ACCESS_POOL3-_-IMAGEMAP%20--%2022126%20--%2020532%3AAll%20Watches")
          add_class("splash_text-watches")
        }
      }
      
      $("//div[@id='moovRight']/ul/li[contains(@class, 'mvFJewelery')]/span"){
        wrap('a')
        $('..'){
          attribute("href", "/catalog/index.ognc?CategoryID=20033&AdID=22126&LinkType=SiteAd&LinkLoc=3376&PageID=86044715247308&cm_re=0.0.0-_-TEMP2_JEWELRY_ACCESS_POOL3-_-IMAGEMAP%20--%2022126%20--%2020033%3AAll%20Jewelry")
          add_class("splash_text-fashionjewelry")  
       }
      }
      $("//div[@id='moovRight']/ul/li[contains(@class, 'mvScarves')]/span"){
        wrap('a')
        $('..'){
          attribute("href", "/catalog/index.ognc?CategoryID=21314&AdID=22126&LinkType=SiteAd&LinkLoc=3376&PageID=91543099505461&cm_re=0.0.0-_-TEMP2_JEWELRY_ACCESS_POOL3-_-IMAGEMAP%20--%2022126%20--%2021314%3AScarves%20%26%20Wraps")
          add_class("splash_text-scarves")    
        }
      }
    }
    
    #handbagsSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVhandbags"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVhandbags\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", " <div class=\"mvSplash\" id=\"moovHandbagsSplashContainer\">     <div class=\"pageName\">       Handbags     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvCoach\"><span>coach</span></li>            <li class=\"mvMark\"><span>marc by<br />           marc jacobs</span></li>            <li class=\"mvMJ\"><span>Marc Jacobs</span></li>            <li class=\"mvBurberry\"><span>Burberry</span></li>            <li class=\"mvToryBurch\"><span>Tory Burch</span></li>         </ul><a class=\"mvCoachLink\" href=         \"/coach/catalog/index.ognc?CategoryID=21533&cm_sp=Coach_Landing-_-TOP_NAV-_-all_handbags&PageID=92487387942545\"></a>         <a class=\"mvMarcLink\" href=         \"/catalog/index.ognc?CategoryID=17339&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74474668912038&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017339%3AMARC%20BY%20MARC%20JACOBS\">         <a class=\"mvJacobsLink\" href=         \"/catalog/index.ognc?CategoryID=17331&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74440274803836&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017331%3AMarc%20Jacobs\">         <a class=\"mvBurberryLink\" href=         \"/catalog/index.ognc?CategoryID=17319&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74387163363593&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017319%3ABurberry\">         <a class=\"mvTorryLink\" href=         \"/catalog/index.ognc?CategoryID=17344&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74492448828202&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017344%3ATory%20Burch\">         </a>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
      inject_before(" <div class=\"mvSplash\" id=\"moovHandbagsSplashContainer\">     <div class=\"pageName\">       Handbags     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvCoach\"><span class='splash_text-coach'></span></li>            <li class=\"mvMark\"><span class='splash_text-marcbymarc'></span></li>            <li class=\"mvMJ\"><span class='splash_text-marcjacobs'></span></li>            <li class=\"mvBurberry\"><span class='splash_text-burberry'></span></li>            <li class=\"mvToryBurch\"><span class='splash_text-toryburch'></span></li>         </ul><a class=\"mvCoachLink\" href=         \"/coach/catalog/index.ognc?CategoryID=21533&cm_sp=Coach_Landing-_-TOP_NAV-_-all_handbags&PageID=92487387942545\"></a>         <a class=\"mvMarcLink\" href=         \"/catalog/index.ognc?CategoryID=17339&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74474668912038&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017339%3AMARC%20BY%20MARC%20JACOBS\">         <a class=\"mvJacobsLink\" href=         \"/catalog/index.ognc?CategoryID=17331&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74440274803836&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017331%3AMarc%20Jacobs\">         <a class=\"mvBurberryLink\" href=         \"/catalog/index.ognc?CategoryID=17319&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74387163363593&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017319%3ABurberry\">         <a class=\"mvTorryLink\" href=         \"/catalog/index.ognc?CategoryID=17344&AdID=22119&LinkType=SiteAd&LinkLoc=16958&PageID=74492448828202&cm_re=0.0.0-_-TEMP1_HANDBAGS_POOL5-_-IMAGEMAP%20--%2022119%20--%2017344%3ATory%20Burch\">         </a>       </div>     </div>   </div>")
      }
      
      
      #eventTriggers
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvBurberryLink"], ["target_event", "click"], ["trigger", ".mvBurberry"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvBurberryLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("63277")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvBurberry ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("63277")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvMarcLink"], ["target_event", "click"], ["trigger", ".mvMark"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvMarcLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("82606")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvMark ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("82606")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvJacobsLink"], ["target_event", "click"], ["trigger", ".mvMJ"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvJacobsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("30868")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvMJ ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("30868")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvCoachLink"], ["target_event", "click"], ["trigger", ".mvCoach"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvCoachLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("82208")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvCoach ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("82208")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvTorryLink"], ["target_event", "click"], ["trigger", ".mvToryBurch"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTorryLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("26709")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvToryBurch ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("26709")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    }
    
    #BeautySplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVbeauty"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVbeauty\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "  <div class=\"mvSplash\" id=\"moovBeautySplashContainer\">     <div class=\"pageName\">       Beauty     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvFallColor\"><span>Fall Color</span></li>            <li class=\"mvFragranceHer\">             <span>Fragrance             <div class=\"mvTinyText\"> \t\t\t\tfor her             </div></span>            </li>            <li class=\"mvSkincare\"><span>Skincare</span></li>            <li class=\"mvFragranceHim\">             <span>Fragrance<br />              <div class=\"mvTinyText\">               for him             </div></span>           </li>            <li class=\"mvTechTools\"><span>Tech Tools</span></li>         </ul>         <a class=\"mvFallColorsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=14720&AdID=22145&LinkType=SiteAd&LinkLoc=2921&PageID=63224951177322&cm_re=0.0.0-_-TEMP2_BEAUTY_POOL3-_-IMAGEMAP%20--%2022145%20--%2014720%3AMakeup\"></a>         <a class=\"mvFragranceForHerLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20398&PageID=87612754478433\"></a>         <a class=\"mvFragranceForHimLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20407&PageID=87649541930102\"></a>         <a class=\"mvTechToolsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=14873&AdID=22145&LinkType=SiteAd&LinkLoc=2921&PageID=63881345217101&cm_re=0.0.0-_-TEMP2_BEAUTY_POOL3-_-IMAGEMAP%20--%2022145%20--%2014873%3ATools%20%26%20Accessories\"></a>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
      inject_before("  <div class=\"mvSplash\" id=\"moovBeautySplashContainer\">     <div class=\"pageName\">       Beauty     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvFallColor\"><span class='splash_text-fallcolor'></span></li><li class=\"mvFragranceHer\"><span class='splash_text-fragranceher'></span></li><li class=\"mvSkincare\"><span class='splash_text-skincare'></span></li><li class=\"mvFragranceHim\"><span class='splash_text-fragrancehim'></span></li><li class=\"mvTechTools\"><span class='splash_text-techtools'></span></li>         </ul>         <a class=\"mvFallColorsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=14720&AdID=22145&LinkType=SiteAd&LinkLoc=2921&PageID=63224951177322&cm_re=0.0.0-_-TEMP2_BEAUTY_POOL3-_-IMAGEMAP%20--%2022145%20--%2014720%3AMakeup\"></a>         <a class=\"mvFragranceForHerLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20398&PageID=87612754478433\"></a>         <a class=\"mvFragranceForHimLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20407&PageID=87649541930102\"></a>         <a class=\"mvTechToolsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=14873&AdID=22145&LinkType=SiteAd&LinkLoc=2921&PageID=63881345217101&cm_re=0.0.0-_-TEMP2_BEAUTY_POOL3-_-IMAGEMAP%20--%2022145%20--%2014873%3ATools%20%26%20Accessories\"></a>       </div>     </div>   </div>")
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvSkincareLink"], ["selector", ".gn_left_nav_section a[href*=\"Skincare\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' gn_left_nav_section ')]//a[contains(@href, \"Skincare\")]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvSkincareLink")
            }
          }
        }
      }
      
      
      #eventTriggers
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvTechToolsLink"], ["target_event", "click"], ["trigger", ".mvTechTools"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTechToolsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("53137")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTechTools ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("53137")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvSkincareLink"], ["target_event", "click"], ["trigger", ".mvSkincare"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvSkincareLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("43504")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvSkincare ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("43504")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvFragranceForHimLink"], ["target_event", "click"], ["trigger", ".mvFragranceHim"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFragranceForHimLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("64329")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFragranceHim ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("64329")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvFragranceForHerLink"], ["target_event", "click"], ["trigger", ".mvFragranceHer"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFragranceForHerLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("18876")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFragranceHer ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("18876")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvFallColorsLink"], ["target_event", "click"], ["trigger", ".mvFallColor"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFallColorsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("79047")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvFallColor ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("79047")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    }
    
    #menSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVmen"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVmen\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", " <div class=\"mvSplash\" id=\"moovMenSplashContainer\">     <div class=\"pageName\">       Men     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvCoatsJackets\"><span>Coats &amp;<br />           Jackets</span></li>            <li class=\"mvBoots\"><span>Boots</span></li>            <li class=\"mvSweaters\"><span>Sweaters</span></li>            <li class=\"mvDenim\"><span>Denim</span></li>            <li class=\"mvAccessories\"><span>Accessories</span></li>         </ul>         <a class=\"mvBootsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20620&PageID=88564548903541\"></a>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_bottom(read("/html/mens.html"))
      }
      # end BasicGroup
    }
    
    #kidsSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVkids"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVkids\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", " <div class=\"mvSplash\" id=\"moovMenSplashContainer\">     <div class=\"pageName\">       Men     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvCoatsJackets\"><span>Coats &amp;<br />           Jackets</span></li>            <li class=\"mvBoots\"><span>Boots</span></li>            <li class=\"mvSweaters\"><span>Sweaters</span></li>            <li class=\"mvDenim\"><span>Denim</span></li>            <li class=\"mvAccessories\"><span>Accessories</span></li>         </ul>         <a class=\"mvBootsLink mvRemoveMe\" href=\"/catalog/index.ognc?CategoryID=20620&PageID=88564548903541\"></a>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before(read('/html/kids.html'))
      }
    }
    
    #homeSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVhome"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVhome\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "  <div class=\"mvSplash\" id=\"moovHomeSplashContainer\">     <div class=\"pageName\">       Home     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvBed\"><span>Bed</span></li>            <li class=\"mvBath\"><span>Bath</span></li>            <li class=\"mvDining\"><span>Dining</span></li>            <li class=\"mvHomeDecor\"><span>Home Decor</span></li>            <li class=\"mvKitchen\"><span>Kitchen</span></li>         </ul>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("  <div class=\"mvSplash\" id=\"moovHomeSplashContainer\">     <div class=\"pageName\">       Home     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvBed\"><span class='splash_text-bed'></span></li>            <li class=\"mvBath\"><span class='splash_text-bath'></span></li>            <li class=\"mvDining\"><span class='splash_text-dining'></span></li>            <li class=\"mvHomeDecor\"><span class='splash_text-homedecor'></span></li>            <li class=\"mvKitchen\"><span class='splash_text-kitchen'></span></li>         </ul>       </div>     </div>   </div>")
      }

      #Attributes
      $("//div[@id='gn_left_nav_container']") {
        $("div/ul/li/a[contains(., 'Bedding')]") {
          add_class("mvBedLink")
        }
        $("div/ul/li/a[contains(., 'Bath')]") {
          add_class("mvBathLink")
        }
        $("div/ul/li/a[contains(., 'Dining')]") {
          add_class("mvDiningLink")
        }
        $("div/ul/li/a[contains(., 'Home Décor')]") {
          add_class("mvHomeLink")
        }
        $("div/ul/li/a[contains(., 'Kitchen')]") {
          add_class("mvKitchenLink")
        }
      }

      #eventTriggers
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvDiningLink"], ["target_event", "click"], ["trigger", ".mvDining"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDiningLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("31136")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDining ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("31136")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvBathLink"], ["target_event", "click"], ["trigger", ".mvBath"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvBathLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("85016")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvBath ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("85016")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvHomeLink"], ["target_event", "click"], ["trigger", ".mvHomeDecor"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvHomeLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("57882")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvHomeDecor ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("57882")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvBedLink"], ["target_event", "click"], ["trigger", ".mvBed"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvBedLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("92823")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvBed ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("92823")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvKitchenLink"], ["target_event", "click"], ["trigger", ".mvKitchen"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvKitchenLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("51845")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvKitchen ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("51845")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    }
    
    #SaleSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVsave"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVsave\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvSaleSplashPage"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvSaleSplashPage")
            }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvSplash\" id=\"moovSaveSplashContainer\"><div class=\"pageName\">Sale</div><div class=\"moovSplashContainer mvEmptySplash\">splash image</div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div class=\"mvSplash\" id=\"moovSaveSplashContainer\"><div class=\"pageName\">Sale</div><div class=\"mw_nospash_spacer\"></div></div></div>")
      }
      
      
    }
    
    #giftSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVgift"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVgift\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvSplash\" id=\"moovGiftSplashContainer\"><div class=\"pageName\">Gifts &amp; Gift Cards</div><div class=\"moovSplashContainer mvEmptySplash\">splash image</div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div class=\"mvSplash\" id=\"moovGiftSplashContainer\"><div class=\"pageName\">Gifts &amp; Gift Cards</div><div class=\"mw_nospash_spacer\"></div></div></div>")
      }
      
      
    }
    
    #ContemporarySplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVcontemporary"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVcontemporary\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvSplash\" id=\"moovContemporarySplashContainer\">     <div class=\"pageName\">       Contemporary     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvDresses\"><span>Dresses</span></li>            <li class=\"mvTops\"><span>Tops</span></li>            <li class=\"mvCoats\"><span>Coats</span></li>            <li class=\"mvDenim\"><span>Denim</span></li>            <li class=\"mvIntimates\"><span>Intimates</span></li>         </ul>       </div>     </div>   </div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div class=\"mvSplash\" id=\"moovContemporarySplashContainer\">     <div class=\"pageName\">       Contemporary     </div>      <div class=\"moovSplashContainer\">       <div id=\"moovLeft\"></div>        <div id=\"moovRight\">         <ul class=\"mvMenu\">           <li class=\"mvDresses\"><span class='splash_text-dresses'></span></li>            <li class=\"mvTops\"><span class='splash_text-tops'></span></li>            <li class=\"mvCoats\"><span class='splash_text-coats'></span></li>            <li class=\"mvDenim\"><span class='splash_text-coats'></span></li>            <li class=\"mvIntimates\"><span class='splash_text-intimates'></span></li>         </ul>       </div>     </div>   </div>")
      }

      #Attributes
      $("//div[@id='gn_left_nav_container']") {
        $("div/ul/li/a[contains(@href, 'dresses')]") {
          add_class("mvDressesLink")
        }
        $("div/ul/li/a[contains(@href, 'tops')]") {
          add_class("mvTopsLink")
        }
        $("div/ul/li/a[contains(@href, 'coats-jackets')]") {
          add_class("mvJacketsLink")
        }
        $("div/ul/li/a[contains(@href, 'denim')]") {
          add_class("mvDenimLink")
        }
        $("div/ul/li/a[contains(@href, 'intimates-shapewear')]") {
          add_class("mvIntimatesLink")
        }
      }

      #eventTriggers
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvDressesLink"], ["target_event", "click"], ["trigger", ".mvDresses"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDressesLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("69946")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDresses ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("69946")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvDenimLink"], ["target_event", "click"], ["trigger", ".mvDenim"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDenimLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("82246")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvDenim ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("82246")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvJacketsLink"], ["target_event", "click"], ["trigger", ".mvCoats"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvJacketsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("63658")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvCoats ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("63658")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvIntimatesLink"], ["target_event", "click"], ["trigger", ".mvIntimates"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvIntimatesLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("65615")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvIntimates ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("65615")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvTopsLink"], ["target_event", "click"], ["trigger", ".mvTops"], ["trigger_event", "mouseup"], ["multiple", "true"], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", "true"], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("targets", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTopsLink ')]") {
          var("targets") {
            append("a")
          }
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etarget")
                append("47948")
              }
            }
          }
          var($targets, fetch("./@id"))
        }
        var("counter", "")
        $("//*[contains(concat(' ', @class, ' '), ' mvTops ')]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("etrigger")
                append("47948")
              }
            }
          }
          var("trigger_id", fetch("./@id"))
          var("counter") {
            append("a")
          }
          var("target_id", var(var("counter")))
          $("//html/body") {
            insert_bottom("script") {
              inner() {
                set("document.getElementById('")
                append($trigger_id)
                append("').addEventListener('mouseup', function(){moovweb_trigger('click', '")
                append($target_id)
                append("')},true);")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveMe"], ["selector", ".bl_main"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' bl_main ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvRemoveMe")
            }
          }
        }
      }
      
      
    }
    
  # end BasicGroup
  
  #registry splashPages
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #Kitchen SplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVkitchen"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVkitchen\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div id=\"moovKitchenSplashContainer\"><div class=\"pageName\">Kitchen</div><div class=\"moovSplashContainer mvEmptySplash\">splash image</div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div id=\"moovKitchenSplashContainer\"><div class=\"pageName\">Kitchen</div></div>")
      }
      
      
    }
    
    #bed and bath SplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVbedAndBath"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVbedAndBath\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div id=\"moovBedBathSplashContainer\"><div class=\"pageName\">Bed &amp; Bath</div><div class=\"moovSplashContainer mvEmptySplash\">splash image</div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div id=\"moovBedBathSplashContainer\"><div class=\"pageName\">Bed &amp; Bath</div></div>")
      }
      
      
    }
    
    #home DecorSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVhomeDecor"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVhomeDecor\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div id=\"moovHomeDecorSplashContainer\"><div class=\"pageName\">Home Decor</div><div class=\"moovSplashContainer mvEmptySplash\">splash image</div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div id=\"moovHomeDecorSplashContainer\"><div class=\"pageName\">Home Decor</div></div>")
      }
      
      
    }
    
    #home DecorSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVluggage"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVluggage\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div id=\"moovLuggageSplashContainer\"><div class=\"pageName\">Luggage</div><div class=\"moovSplashContainer mvEmptySplash\">splash image</div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div id=\"moovLuggageSplashContainer\"><div class=\"pageName\">Luggage</div></div>")
      }
      
      
    }
    
    #diningSplashPage
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVdining"], ["negate", ""], ["parameter_value", "1"], ["if_present", ""]]
      var("param_matched", "false")
      match($path) {
        with(/MVdining\=1/) {
          var("param_matched", "true")
        }
      }
        match($param_matched, "true") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div id=\"moovDiningSplashContainer\"><div class=\"pageName\">Dining</div><div class=\"moovSplashContainer mvEmptySplash\">splash image</div></div></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
        inject_before("<div id=\"moovDiningSplashContainer\"><div class=\"pageName\">Dining</div></div>")
      }
      
      
    }
    
  # end BasicGroup
  
  #categoriesMenu
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCategoriesHeader"], ["selector", "//span[text()='Categories']"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//span[text()='Categories']") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvCategoriesHeader")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvCategories"], ["selector", ".mvCategoriesHeader"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvCategoriesHeader ')]") {
      match($done, "no") {
        $("..") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvCategories")
          }
        }
        }
      }
    }
    
    
    # #
    # #Content::Formatting::MoveToBeginningOf
    # # #[["move_me", ".mvCategories"], ["to_beginning_of_me", ".gn_left_nav_container"], ["map_multiple", ""], ["ancestor_selector", ""]]
    # $("(//*[contains(concat(' ', @class, ' '), ' gn_left_nav_container ')])[1]") {
    #   move_here("(//*[contains(concat(' ', @class, ' '), ' mvCategories ')])[1]", "top")
    # }
    
    
  # end BasicGroup
  
  #remove Stuff
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #sale link
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBDSale"], ["selector", ".gn_left_nav_sale"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' gn_left_nav_sale ')]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvBDSale")
            }
          }
          }
        }
      }
      
      
    # end BasicGroup
    
    #designers link
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvBDDesigner"], ["selector", "span:contains(\"Designer Shops\")"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//span[contains(., \"Designer Shops\")]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" mvBDDesigner")
            }
          }
          }
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".gwpZoomLink"]]
    $("//*[contains(concat(' ', @class, ' '), ' gwpZoomLink ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".productImages >script"]]
    $("//*[contains(concat(' ', @class, ' '), ' productImages ')]/script") {
      remove()
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "#zoomHrefImage"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//*[@id = 'zoomHrefImage']") {
      name("div")
    }
    
    
  # end BasicGroup
  
  #types of product views
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".thumbnails .clearBothOverflow"]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnails ')]//*[contains(concat(' ', @class, ' '), ' clearBothOverflow ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", ".thumbnails"], ["tag_name", "div"], ["class_name", ""], ["id", "moovThumbsWrap"], ["multiple", "true"]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnails ')]") {
      wrap("div") {
        attribute("id", "moovThumbsWrap")
      }
    }
    
    # anthony
    $("/html/body") {
      $(".//div[@id='productThumbnailLink']") {
        insert_after("div", class: "mw_prod_info") {
          move_here("following-sibling::div | following-sibling::img")
        }
      }
    }
    
    #
    #Group::CookieMatcherGroup
    #[["cookie_name", "mvView"], ["cookie_value_regex", "1"], ["no_cookie_counts", ""], ["any", ""]]
    var("run_group", "false")
        # match if the cookie is found and matches a particular regex
        match($cookie, /mvView=1/) {
          var("run_group", "true")
        }
    match($run_group, "true") {
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".productThumbnail"], ["tag_name", "div"], ["class_name", "mvBDProductListBox"], ["id", ""], ["multiple", "true"]]
      #anthony
      #$("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
      #  wrap("div") {
      #    attribute("class", "mvBDProductListBox")
      #  }
      #}
      $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
        $className = fetch("./@class")
        $className {
          replace(/mvBDListView/, "")
        }
        attribute("class", $className)
        add_class("mvBDProductListBox")
      }
      
      
    }
    
    #
    #Group::CookieMatcherGroup
    #[["cookie_name", "mvView"], ["cookie_value_regex", "2"], ["no_cookie_counts", "true"], ["any", ""]]
    var("run_group", "false")
      # when the cookie is not found I still run the group
      match($cookie, not(/mvView/)) {
        var("run_group", "true")
      }
      # when the cookie is found I only run the group if it matches 
      match($cookie, /mvView=2/) {
        var("run_group", "true")
      }
    match($run_group, "true") {
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".productThumbnail"], ["tag_name", "div"], ["class_name", "mvBDListView"], ["id", ""], ["multiple", "true"]]
      
#----------------#
# when the block below is commented, no duplicate ajax request is made.
# why is this causing a duplicate ajax request?
# to reproduce:
# 1: http://mlocal.bloomingdales.com/shop/womens/designer-shops/rachel-zoe?id=22868
# 2: narrow by --> size --> 2 (no issues)
# 3: remove filter 2 (duplicate ajax request is made)
# this only happens on the first narrow by.  you'll need to clear cache and cookies to see it happen again.
      #$("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]") {
      #  wrap("div") {
      #    attribute("class", "mvBDListView")
      #  }
      #}
#----------------#
      
    }
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", "#featuredProductsThumbnails a, #eolProductThumbnails a"], ["regex", "(wid=\\d+)"], ["replacement", "wid=250"], ["multiple", "true"]]
    $("//*[@id = 'featuredProductsThumbnails']//a") {
      inner() {
        replace(/(wid=\d+)/, "wid=250")
      }
    }
    
    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".productImages > a"]]
    #$("//*[contains(concat(' ', @class, ' '), ' productImages ')]/a") {
    #  move_to("..", "before")
    #}

    
    #
    #Content::Formatting::MoveUp
    #[["move_me", ".thumbnailImage > a"]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]/a") {
      move_to("..", "before")
    }
    
    
    ##
    ##Content::Formatting::MoveUp
    ##[["move_me", ".productThumbnail > a"]]
    $("//*[contains(concat(' ', @class, ' '), ' productThumbnail ')]/a") {
      move_to("..", "before")
    }
    
    
    
  # end BasicGroup
  
  #accordionize
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::Dynamic::Accordian4
    #[["link_selector", ".gn_left_nav_top"], ["content_selector", ".gn_left_nav_top + ul"], ["ancestor_selector", ".gn_left_nav_section"], ["open_on_load", ""], ["hide_with_zero_height", ""]]

    var("anc_counter", "")
   $("//div[contains(@class, 'gn_left_nav_section')]/ul/li/../.."){
      var("anc_counter") {
        append("b")
      }
      var("counter", "")
      var("content_id_string", "[")
      $(".//*[contains(concat(' ', @class, ' '), ' gn_left_nav_top ')]/following-sibling::*[1]/self::ul") {
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
              append("78859")
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
      $(".//*[contains(concat(' ', @class, ' '), ' gn_left_nav_top ')]") {
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
              append("78859")
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
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    
  # end BasicGroup
  
  #always force categories to display open
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "gn_left_nav_top mvCategoriesHeader mvBloomMenuHeader moovweb_open"], ["selector", ".mvCategoriesHeader"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvCategoriesHeader ')]") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("gn_left_nav_top mvCategoriesHeader mvBloomMenuHeader moovweb_open")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", ""], ["selector", ".mvCategoriesHeader + ul"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvCategoriesHeader ')]/following-sibling::*[1]/self::ul") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("")
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", ".thumbnailImage"], ["negate", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')])[1]") {
  
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".brand"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[contains(concat(' ', @class, ' '), ' brand ')])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"brand\"></div>"], ["add_after", "#breadcrumbs"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'breadcrumbs'])[1]") {
        inject_after("<div class=\"brand\"></div>")
      }
      
      
      #
      #Group::ConditionalSelectorGroup
      #[["conditional_selector", "#breadcrumbs"], ["negate", "true"]]
      var("element_exists", "false")
      $("(//*[@id = 'breadcrumbs'])[1]") {
        var("element_exists", "true")
      }
      match($element_exists, "false") {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"brand\"></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".bl_main"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' bl_main ')])[1]") {
          inject_before("<div class=\"brand\"></div>")
        }
        
        
      }
      
      
    }
    
    
    #
    #Group::QueryParameterMatcherGroup
    #[["parameter_name", "MVsave"], ["negate", "true"], ["parameter_value", ""], ["if_present", "true"]]
      var("param_matched", "false")
      match($path) {
        with("MVsave") {
          var("param_matched", "true")
        }
      }
        match($param_matched, "false") {
    
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".bl_nav_side_no_padding"]]
      $("//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')]") {
        remove()
      }
      
      
    }
    
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvSizeText\">Sort</div>"], ["add_after", ""], ["multiple", ""], ["add_before", "select#size"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//select[@id = 'size'])[1]") {
      inject_before("<div class=\"mvSizeText\">Sort</div>")
    }
    
    
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvAlignRight\"><div class=\"mvBDViewChangeButtonGroup\"> <div class=\"mvViewText\">View</div>    \t\t<div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDListView', '2')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToListView\"><div></div></div> \t\t \t\t <div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDProductListBox', '1')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToBoxView\"><div></div></div>        \t </div></div>"], ["add_after", ".brand"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' brand ')])[1]") {
      inject_after("<div class=\"mvAlignRight\"><div class=\"mvBDViewChangeButtonGroup\"> <div class=\"mvViewText\">View</div>        <div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDListView', '2')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToListView\"><div></div></div>         <div onclick=\"moovChangeClass(this.id,'thumbnails', 'mvBDProductListBox', '1')\" class=\"mvBDViewChangeButton\" id=\"mvChangeToBoxView\"><div></div></div>           </div></div>")
    }
    
    
    #JS productViewSwitcher
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Javascript::AddScriptTag
      #[["javascript_path", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/productViewSwitcher.js"], ["add_after", "body > script:last-of-type"]]
      #$("//body/script[position() = last()]") {
      #  insert_after("script") {
      #    attribute("src", "http://dl.dropbox.com/u/19014985/projects/bloomingdales/productViewSwitcher.js")
      #    attribute("language", "javascript")
      #  }
      #}
      
      
    # end BasicGroup
    
    #putAllProductsInOneDiv
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", "#bloomiesGlobalLayout"], ["html", "<div class=\"mvTempThumbnails\"></div>"], ["prepend", "true"], ["append", ""]]
      $("//*[@id = 'bloomiesGlobalLayout']") {
        inner() {
          prepend("<div class=\"mvTempThumbnails\"></div>")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "moovThumbsWrap"], ["selector", "#bloomiesGlobalLayout"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'bloomiesGlobalLayout']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("moovThumbsWrap")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::MoveToEndOf
      #[["move_me", ".moovThumbsWrap .thumbnails > div"], ["to_end_of_me", ".mvTempThumbnails"], ["map_multiple", "true"], ["ancestor_selector", ""], ["move_to_one_element", "true"]]
          $("//*[contains(concat(' ', @class, ' '), ' moovThumbsWrap ')]//*[contains(concat(' ', @class, ' '), ' thumbnails ')]/div") {
            move_to("(//*[contains(concat(' ', @class, ' '), ' mvTempThumbnails ')])[1]", "bottom")
          }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "thumbnails"], ["selector", ".mvTempThumbnails"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvTempThumbnails ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("thumbnails")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
  }
  
  
  #sortAndViewsContainer
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::WrapIndividualElements
    #[["selector", "div.size"], ["tag_name", "div"], ["class_name", "mvSortAndViewWrap"], ["id", ""], ["multiple", ""]]
    $("//div[contains(concat(' ', @class, ' '), ' size ')]") {
      wrap("div") {
        attribute("class", "mvSortAndViewWrap")
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//div[@class = \"thumbnails\"]/div[not(node())]"]]
    $("//div[@class = \"thumbnails\"]/div[not (node())]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".thumbnails > img"]]
    $("//*[contains(concat(' ', @class, ' '), ' thumbnails ')]/img") {
      remove()
    }
    
    
    #
    #Content::Formatting::MoveBefore
    #[["move_me", ".mvBDViewChangeButtonGroup"], ["before_me", "div.size"], ["map_moves", ""]]
    $("(//div[contains(concat(' ', @class, ' '), ' size ')])[1]") {
      move_here("(//*[contains(concat(' ', @class, ' '), ' mvBDViewChangeButtonGroup ')])[1]", "before")
    }
    
    
  # end BasicGroup
  
  #
  #Group::QueryParameterMatcherGroup
  #[["parameter_name", "kw"], ["negate", ""], ["parameter_value", "Furniture"], ["if_present", ""]]
    var("param_matched", "false")
    match($path) {
      with(/kw\=Furniture/) {
        var("param_matched", "true")
      }
    }
      match($param_matched, "true") {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvProductFurnature"], ["selector", "#bl_hp_main"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'bl_hp_main']") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              append(" mvProductFurnature")
          }
        }
      }
    }
    
    
  }
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "gift\\/index"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /gift\/index/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvBonusOffer"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        add_class("mvBonusOffer")
      }
    }
    
    
    #
    #Content::Formatting::SetInnerText
    #[["selector", ".bl_pdp_gwp_Header"], ["text", " "], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
    # NOTE: not sure if /html() or /text() is what I want to be using here
    $("//*[contains(concat(' ', @class, ' '), ' bl_pdp_gwp_Header ')]") {
      inner() {
        set(" ")
      }
    }
    
    
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".gwpButtonWrapper img[src*=\"b_backtobag.jpg\"]"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' gwpButtonWrapper ')]//img[contains(@src, \"b_backtobag.jpg\")])[1]") {
    
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".gwpButtonWrapper a"], ["html", "<div class=\"\">back to bag</div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' gwpButtonWrapper ')]//a") {
        inner("<div class=\"\">back to bag</div>")
      }
      
      
    }
    
    
    #
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".gwpButtonWrapper img[src*=\"b_backToProduct.gif\"]"], ["negate", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' gwpButtonWrapper ')]//img[contains(@src, \"b_backToProduct.gif\")])[1]") {
    
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".gwpButtonWrapper a"], ["html", "<div class=\"\">back to product</div>"], ["prepend", ""], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' gwpButtonWrapper ')]//a") {
        inner("<div class=\"\">back to product</div>")
      }
      
      
    }
    
    
  }
  
  #removeFlashLinks
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//li/a[contains(.,\"DIANE von FURSTENBERG Home\")]/.."]]
    #$("//li/a[contains(.,\"DIANE von FURSTENBERG Home\")]/..") {
    #  remove()
    #}
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "//li/a[contains(.,\"Shoe Seeker\")]/.."]]
    $("//li/a[contains(.,\"Shoe Seeker\")]/..") {
      remove()
    }
    
    
  # end BasicGroup
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvUlGroup"], ["selector", ".gn_left_nav_section ul"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' gn_left_nav_section ')]//ul") {
    match($done, "no") {
      $("..") {
      attribute("class") {
        value() {
            append(" mvUlGroup")
        }
      }
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvBloomMenuHeader"], ["selector", ".mvUlGroup > div"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' mvUlGroup ')]/div") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvBloomMenuHeader")
        }
      }
    }
  }
  
  
  #
  #Group::URLMatcherGroup
  #[["url_matcher", "registry"], ["negate", ""]]
  # This is a 'fake' url because it has http when it might mean https
  var("fake_url") {
    set(var("source_host"))
    append(var("path"))
    prepend("http://")
  }
  match($fake_url, /registry/) {
  
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkHeader mvBloomMenuHeader gn_left_nav_top"], ["selector", ".gn_left_nav_container .mvBloomMenuHeader > a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' gn_left_nav_container ')]//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]/a") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvLinkHeader mvBloomMenuHeader gn_left_nav_top")
          }
        }
        }
      }
    }
    
    
    #
    #Content::Formatting::ReplaceTag
    #[["selector", "//div[contains(@class, \"mvUlGroup\")]/ul/li/../../div/a"], ["new_tag_name", "div"], ["class_name", ""]]
    $("//div[contains(@class, \"mvUlGroup\")]/ul/li/../../div/a") {
      name("div")
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkHeader gn_left_nav_top"], ["selector", ".mvBloomMenuHeader > a"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvBloomMenuHeader ')]/a") {
      match($done, "no") {
        $("..") {
        attribute("class") {
          value() {
              set("mvLinkHeader gn_left_nav_top")
          }
        }
        }
      }
    }
    
    
  }
  
  #
  #Content::Formatting::MoveToEndOf
  #[["move_me", ".gwpPdpDescriptionShort"], ["to_end_of_me", ".gwpInnerLeft"], ["map_multiple", ""], ["ancestor_selector", ""], ["move_to_one_element", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' gwpInnerLeft ')])[1]") {
    move_here("(//*[contains(concat(' ', @class, ' '), ' gwpPdpDescriptionShort ')])[1]", "bottom")
  }
  
  
  #
  #Content::Formatting::Duplicate
  #[["duplicate_me", ".gwpButtonWrapper"], ["after_me", ".mvBDHeader"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' bl_gwp_left ')])[1]") {
    copy_here("(//*[contains(concat(' ', @class, ' '), ' gwpButtonWrapper ')])[1]", "top")
  }
  
  
  #
  #Group::QueryParameterMatcherGroup
  #[["parameter_name", "mvOffers"], ["negate", ""], ["parameter_value", "true"], ["if_present", ""]]
    var("param_matched", "false")
    match($path) {
      with(/mvOffers\=true/) {
        var("param_matched", "true")
      }
    }
      match($param_matched, "true") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".mvSplash"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvSplash ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvOffers"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvOffers")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::SetInnerHTML
    #[["selector", ".bl_nav_side_no_padding"], ["html", "<div class=\"mvOffersTitle\"></div><div class=\"mvOffersWrap\" id=\"mvOffers\"><div class=\"mvOffersHeader\">Offers</div><div class=\"mvOffersContent\" id=\"mvOffersContentBox\"></div></div>"], ["prepend", ""], ["append", ""]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_nav_side_no_padding ')]") {
      inner("<div class=\"mvOffersTitle\"></div><div class=\"mvOffersWrap\" id=\"mvOffers\"><div class=\"mvOffersHeader\">Offers</div><div class=\"mvOffersContent\" id=\"mvOffersContentBox\"></div></div>")
    }
    
    
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "document.addEventListener('load',mvXHR('/promo_data?offers=true', mvOffers, 'mvStoredResponseOffers')); "], ["add_after", "body > div:last-of-type"], ["add_before", ""]]
      $("(//body/div[position() = last()])[1]") {
        insert_after("script") {
          attribute("language", "javascript")
          inner("document.addEventListener('load',mvXHR('/promo_data?offers=true', mvOffers, 'mvStoredResponseOffers')); ")
        }
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
  #Content::Formatting::RemoveElements
  #[["selector", "#mvTitleRating"]]
  $("//*[@id = 'mvTitleRating']") {
    remove()
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvColorText"], ["selector", ".ch_standardBold"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[contains(concat(' ', @class, ' '), ' ch_standardBold ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            set("mvColorText")
        }
      }
    }
  }
  
  
  #removes llf shop the look container
  $("//div/a/img[not(position()=last())]"){
    remove()
  }
  #removes llf shop the look container
  $("//div[contains(@id, 'quickView')]"){
    remove()
  }
  #removes llf shop the look container
  $("//img[contains(@id, 'quickViewLauncher')]"){
    remove()
  }
#}

#move fasseted nav into correct div and add accordions
$("//div[@id='navigation']"){
  move_to("//div[contains(@class, 'bl_mainContent_no_bottom_padding')]/div[contains(@class, 'brand')]", "top")
  
  #master accordion for narrow by text
  $(".//div[@id='nav_title']"){
    attribute("data-ur-toggler-component", "button")
    attribute("data-ur-state", "disabled")
    $("./span"){
      inner(){
        replace(/:/, "")
      }
      $myid = fetch("text()")
      $myid{
        replace(/\s*/, "")
      }
    }
    attribute("data-ur-id", $myid)
  }
  $("./div[@id='facets']"){
    attribute("data-ur-id", $myid)
    attribute("data-ur-toggler-component", "content")
  }
  
  
  #sub accordions for faceted navigation
  $(".//div[contains(@class, 'facet-name')][1]"){
    attribute("data-ur-toggler-component", "button")
    attribute("data-ur-state", "disabled")
    $("./span"){
      $myid = fetch("text()")
      $myid{
        replace(/\s*/, "")
      }
    }
    attribute("data-ur-id", $myid)
    log($myid)
    $("./.."){
      attribute("data-ur-id", $myid)
      attribute("data-ur-toggler-component", "content")
    }
  }
  $("./.."){
    insert_top("span", class: "mw_current_count"){
      insert_top("span", class: "mw_current_count_text"){
        inner(){
          set(' results')
        }
      }
      insert_top("span", class: "mw_current_count_num"){
        inner() {
          set(fetch("//div[contains(@class,'breadCrumb_productCount')]/span[1]/text()"))
        }
      }
    }
  }
}

#change image size to 100px width
$("//img[contains(@class, 'thumbnailImage')]"){
  # $mySRC = fetch("src"){
  #   $mySRC{
  #     
  #     //replace(/.*/, "bbbbb")
  #   }
  # }
  # attribute("src", $mySRC)
  # dump()
}
# $("//div[@id='breadcrumbs']"){
#   move_to("//div[contains(@class, 'bl_mainContent_no_bottom_padding')]/div[contains(@class, 'brand')]", "top")
# }
#add class to body so that the css can be added to main. css
$("//html/body"){
   add_class("mvCatalog") 
  # fix the ordering
  $(".//div[contains(@class,'mvFirstTwo')]/..") {
    move_to("//div[contains(@class,'mvBDProductListBox') and position() = 1]", "after")
  }
  $(".//div[contains(@class,'mvBDProductListBox') and position() = 2]") {
    move_to("//div[contains(@class,'mvBDProductListBox') and position() = 3]", "after")
  }
}


#for some reason the add class on line 3500 .mvCatalog causes the nav to disapear.
$("//div[@id='facets']"){
  $('//body'){
    add_class("mw_faceted")
  }
}

$("//body[contains(@class, 'mw_faceted')]//div[@id='nav_title']"){
  inject_bottom("<div class='mw_faceted_close'>done</div>")
}

$("/html/body") {
  $("./div[@id='bl_main_container']") {
    $("./div[@id='bl_nav_top_container_tiles']") {
      $("./div[@class='bl_main']") {
        $("./div[@id='bl_hp_main']") {
          $(".//div[@class='extras']") {
            $("./img[contains(@src, 'video.gif')]") {
              remove()
            }
            $("..") {
              add_class("mw_has_extras")
            }
            move_to("..", "bottom")
          }
        }
      }
    }
  }
}

# Add breadcrumbs to contemporary pages (not in main website)
match($path) {
  with(/(\/shop\/)/) { #may have to change to shop
    
    # Backpage breadcrumb (link to 'Contemporary')
    $("//a[@id='categoryParent']") {
      $mw_contemporary = fetch("./@href") 
      $mw_contemporary {
        replace(/.*(\/\w*\?id=\d*\z)/, "\\1")
        replace(/\//, "")
        replace(/\?id/, "")
      }
      attribute("href") {
        value() {
          append("&cm_sp=NAVIGATION-_-TOP_NAV-_-CONTEMPORARY&MV")
          append($mw_contemporary)
        }
      }
      
      inner() {
        replace(/(view all )/, "")
      }
      
      move_to("//div[@id='breadcrumbs']","top")
    }
    
    # Current page breadcrumb
    $("//div[@id='nav_category']//h1") {
      wrap_text_children("div", id:"currPage")
      
      $("div[@id='currPage']") {
        move_to("//div[@id='breadcrumbs']","bottom")
      }
    }
  }
}

# M.A.C. is a unique featured brand that must be handled differently
match($path) {
  with(/(beauty\/featured-brands\/mac\?id=)/) { 
    $("//div[@id='nav_category']") {
      add_class("showMeBlock")
    }
    
    $("//div[@id='nav_category']/div[contains(@class,'parentCat')]") {
      add_class("hideMe")
    }
  }
}

# “Categories” subcat should be displayed as the first category on Cat01 pages. 
# As per Story #202: “Categories” subcat should always appear first
$("//div[contains(@class,'mvCategories')]") {
  move_to("..","top")
}

# Change size and quality of the images from 236x295 to 140x175 
# which is the size we used to reduce them to using css.
# This makes the total image size 327kb instead of 722kb
$(".//div[@id='thumbnails']") {
  $("//*[contains(concat(' ', @class, ' '), ' thumbnailImage ')]") {
    attribute("src") {
      value() {
        replace(/wid=[0-9]*/, "wid=140")
        replace(/qlt\=[0-9(\,)]*/, "qlt=75,0")
        replace(/hei=[0-9]*/, "hei=175")
        # replace(/jpeg&.*/, "jpeg")
        # change the last question mark into an ampersand for valid query parameters
        replace(/(\?.+)\?/, "\\1&")
      }
    }
  }
}
# Their Javascript looks at this div and if the structure changes pagination breaks
# so can't remove'
# $(".//div[@id='pageNumbersBottom']") {
#   remove()
# }


# $(".//li[@id='topLeftArrow']") {
#   $("./div") {
#     $("./img") {
#       remove()
#     }
#     inject_bottom("<div><a id = 'sprite_cat-ct_leftArrow'> </a></div>")
#     $("./a") {
#       $("./img") {
#         remove()
#       }
#       add_class("sprite_cat-ct_leftArrow")
#       $("../div/a[@id='sprite_cat-ct_leftArrow']") {
#         remove()
#       }
#     }
#   }
# }
# 
# $(".//li[@id='topRightArrow']") {
#   $("./div") {
#     $("./img") {
#       remove()
#     }
#      inject_bottom("<div><a id = 'sprite_cat-ct_rightArrow'> </a></div>")
#     $("./a") {
#       $("./img") {
#         remove()
#       }
#       add_class("sprite_cat-ct_rightArrow")
#       $("../div/a[@id='sprite_cat-ct_rightArrow']") {
#         remove()
#       }
#     }
#   }
# }

$(".//div[@class='mvBDViewChangeButtonGroup']") {
  $("./div[@id='mvChangeToListView']/div") {
    inject_bottom("<div class = 'sprite_cat-listviewicon'></div>")
  }
  $("./div[@id='mvChangeToBoxView']/div") {
    inject_bottom("<div class = 'sprite_cat-gridViewIcon'></div>")
  }
}


$(".//div[@id='filterSort']") {
  $("./span") {
    text() {
      set("sort")
    }
  }
}
# to make this work, the js needs to be edited to add class not replace it since we're using their toggler
# $(".//li[@id='topBtwnR']") {
#   $("./div") {
#     $("./img[0]") {
#       attribute("src", "")
#       add_class("sprite_cat-ct_pageDots_down") 
#     }
#     $("./img[1]") {
#       attribute("src", "")
#       add_class("sprite_cat-ct_pageDots_off") 
#     }
#     $("./img[2]") {
#       attribute("src", "")
#       add_class("sprite_cat-ct_pageDots_down") 
#     }
#   }
# }

$("//div/span[contains(text(), 'Apparel')]"){
  text("Categories")
  $("./.."){
    add_class("moovweb_open")
    $("./following-sibling::*"){
      attribute("class", "")
    }
  }
  $("./../.."){
    move_to("./..", "top")
  }
}

$("body"){
  $("//div[@id='coach_header_logoContainer']"){
     remove()
  }
  $("//div[contains(@class, 'coach_subcategory_header')]"){
    remove()
  }
  $("//div[@id='coach_thumbnailsContainer']//a/img[contains(@class, 'thumbnailImage')]"){
    attribute("width", "")
    $("./@src"){
      text(){
        replace(/wid\=(\d+)/i, "wid=140")
      }
    }
  }
}
