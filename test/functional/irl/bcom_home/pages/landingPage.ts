  #Remove Stuff
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".bl_main"]]
    $("//*[contains(concat(' ', @class, ' '), ' bl_main ')]") {
      remove()
    }
    
    #listen for the jsonp content this loads the images for the carousel
    $("//head"){
    #   #insert_top("script", type: "text/javascript") {
    #    # text("function mw_assets(myXML){var s_response = myXML.replace(/(<img)/, '<img active=\"true\" ');s_response = s_response.replace(/(src=\")/g, 'src=\"http://assets.bloomingdales.com/dyn_img/mobile/');images = s_response.match(/(<img.+?>)/g);s_response.replace(/^.+?<img/, \"<img active='true'\");images = images.toString();x$(\"#mvImageViewPort\")[0].innerHTML = images.replace(/(,)/g, '');PSInit();}")
    #   }
      
      # add new assets jsp file.

    }
    
    # bcom carousel assets, they are an html file that im convirting to jsonp.
    $("/html/body") {
      insert_top("div"){
        add_class("mw_images mw_hidden")
      }
      
      insert_bottom("script", type: "text/javascript", src: asset("js/slideshow.js", "js"))
      insert_bottom("script") {
        attribute("src", "www.bloomingdales.com/mobile/mobMainAd.jsp")
        attribute("language", "javascript")
        attribute("type", "application/javascript")
        attribute("src") {
          value() {
            rewrite("link")
            replace(/^/, "http://")
          }
        }
      }
      
    }
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#bl_nav_top_banner + a"]]
    $("//*[@id = 'bl_nav_top_banner']/following-sibling::*[1]/self::a") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#hp_template_pool1"]]
    $("//*[@id = 'hp_template_pool1']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", ".se_store_only_ad_noResults"]]
    $("//*[contains(concat(' ', @class, ' '), ' se_store_only_ad_noResults ')]") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#hp_template_pool2"]]
    $("//*[@id = 'hp_template_pool2']") {
      remove()
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#hp_template_pool3"]]
    $("//*[@id = 'hp_template_pool3']") {
      remove()
    }
    
    
    #
    #Content::Formatting::InnerRegexReplace
    #[["selector", ".myBagLink .top_nav_link"], ["regex", "MY BROWN "], ["replacement", " "], ["multiple", ""]]
    $("(//*[contains(concat(' ', @class, ' '), ' myBagLink ')]//*[contains(concat(' ', @class, ' '), ' top_nav_link ')])[1]") {
      inner() {
        replace(/MY BROWN /, " ")
      }
    }
    
    
  # # end BasicGroup
  # 
  # #
  # #Content::Inject::InjectHTML
  # #[["html", "<div id=\"mvBDhpImage\" data-ur-set=\"carousel\" data-ur-id=\"1\" data-ur-carousel-component=\"view_container\"><div data-ur-carousel-component=\"button\" id=\"mvNextButton\" data-ur-carousel-button-type=\"next\" data-ur-state=\"disabled\" mvTouchState=\"1\">Next</div><div data-ur-carousel-component=\"count\" id=\"mvCarouselCount\">asdf</div><div data-ur-carousel-component=\"scroll_container\" class=\"mvAddViewPort\" id=\"mvImageViewPort\"><img src=\"http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/getawayplan.png\"><img src=\"http://dl.dropbox.com/u/19014985/projects/bloomingdales/images/shopAway.png\"></div></div><div id=\"mvSmallBanner\">BEAUTY BENEFITS countless free gifts from your favorite brands. <span class=\"mvMoreOffers\">more offers</span></div>"], ["add_after", ".mvHeaderWrapper"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  # $("(//*[contains(concat(' ', @class, ' '), ' mvHeaderWrapper ')])[1]") {
  #   inject_after("<div id=\"mvBDhpImage\" data-ur-set=\"carousel\" data-ur-vertical-scroll='enabled' data-ur-id=\"1\" data-ur-carousel-component=\"view_container\"><div data-ur-carousel-component=\"button\" id=\"mvNextButton\" data-ur-carousel-button-type=\"next\" data-ur-state=\"disabled\" mvTouchState=\"1\">Next</div><div data-ur-carousel-component=\"count\" id=\"mvCarouselCount\"></div><div data-ur-carousel-component=\"scroll_container\" data-ur-vertical-scroll='enabled' class=\"mvAddViewPort\" id=\"mvImageViewPort\"></div></div><div id=\"mvSmallBanner\">BEAUTY BENEFITS countless free gifts from your favorite brands. <span class=\"mvMoreOffers\">more offers</span></div>")
  # }
  $("//div[contains(@class, 'mvHeaderWrapper')]") {
    inject_after(read("/html/carousel.html"))
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "data-ur-carousel-component"], ["value", "item"], ["selector", "#mvBDhpImage img"], ["append_dont_overwrite", ""], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'mvBDhpImage']//img") {
    match($done, "no") {
      attribute("data-ur-carousel-component") {
        value() {
            set("item")
        }
      }
    }
  }
  
  
  #add class to body so that the css can be added to main. css
  $("//html/body"){
   add_class("mvLandingPage") 
  }
  
  #APP Changes
  #Group::CookieMatcherGroup
  #[["cookie_name", "ishop_app"], ["cookie_value_regex", ""], ["no_cookie_counts", ""], ["any", "true"]]
    # WARNING: any is not supported
  var("run_group", "false")
      # match if the cookie is found
      match($cookie, /ishop_app/) {
        var("run_group", "true")
      }
  match($run_group, "true") {
    #open shop all products
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "moovweb_open"], ["selector", "#mvBDShopAllProducts"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'mvBDShopAllProducts']") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" moovweb_open")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "bl_nav_top_contain mvBDAccordionContent"], ["selector", "#mvBDShopAllProducts + div"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'mvBDShopAllProducts']/following-sibling::*[1]/self::div") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("bl_nav_top_contain mvBDAccordionContent")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #remove other menu items
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".mvShopAllProductsWrap ~ div"]]
      $("//div[@id='bl_nav_account_flag']"){
        move_to("./../../..", "after")
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvShopAllProductsWrap ')]/following-sibling::div") {
        remove()
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#mvBDShopAllProducts"]]
      $("//*[@id = 'mvBDShopAllProducts']") {
        remove()
      }
      
      
    # end BasicGroup
    
  }
    
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "document.addEventListener('load',mvXHR('/promo_data?splash=true', mvMainSlider, 'mvStoredResponseImages')); "], ["add_after", ""], ["add_before", ""]]
/*      $("html/body") {
        insert_bottom("script") {
          attribute("language", "javascript")
          inner("document.addEventListener('load',mvXHR('/promo_data?splash=true', mvMainSlider, 'mvStoredResponseImages')); ")
        }
      }*/
    
    
    # removes the main container that houses landing page ads
    $("//body//script[contains(text(), 'mboxCreate')]"){
      remove()
    }
  # end BasicGroup
  
    #
    #Group::IgnoreGroup
    #[]
    # No match necessary - contents will be commented out

