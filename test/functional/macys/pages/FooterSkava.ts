
# ----- RawHTMLBlocks ----
#Skava page redirect
#Content::Raw::RegexReplaceCapture
#[["match", "href=\"(http:\\/\\/.*\\.macys\\.com\\/campaign\\/social)"], ["replace", "http://social.macys.com/mc/main.jsp"], ["multiline", ""]]
replace(/href=\"(http:\/\/.*\.macys\.com\/campaign\/social)/) {
  replace($1, "http://social.macys.com/mc/main.jsp")
}



# ----- ConfigBlocks ----
#
#Config::RedirectPassthrough
#[["regex", "(fds|macys)\\.com"]]
# NOT IMPLEMENTING this is not necessary because in v2 only the locations which match the rewriter rules will be rewritten


# ----- ParsedHTMLBlocks ----
html() {
  #default blocks
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Passthrough::Form
    #[["regex_exclusion", ""]]
    # NOTE: AF: Very loose implementation. Just rewriting all the forms as
    # we tend to do in v2
    $("//form") { 
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
    #
    #Content::Development::KillBrowserCache
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Content::Development::SubdomainFix
    #[]
    # NOT IMPLEMENTING - development blocks are unnecessary
    
    
    #
    #Content::Absolutize::AbsolutizeImages
    #[]
    $("//img[@src]") {
      var("src", fetch("./@src"))
      attribute("src") {
        value() {
          # if the src starts with a slash (/) but not a double slash (//) then add the host
          match($src, /^\/[^\/]/) {
            prepend($source_host)
            prepend("//")
          }
          # TODO: handle the case where the image URL is page-relative (doesn't start with http
          # or a slash)
        }
      }
    }
    
    
    #
    #Default block
    #Content::Passthrough::Link
    #[["selector", ""], ["regex_filter", ""], ["regex_exclusion", "(\\/service\\/shipping\\/index\\.jsp)|(\\/service\\/contact\\/index\\.ognc)|(twitter\\.com)|(facebook\\.com)|(ups\\.com)|(\\/store\\/catalog\\/)|(instoresales\\.ognc)|(\\/store\\/service\\/)|(\\/store\\/corporate\\/)|(campaign_id)|(\\/dyn_img\\/pdf\\/09F461_C2_Transaction_Dispute_Form\\.pdf)"], ["force_this_blockset", ""]]
      # WARNING: regex_exclusion is not supported
    # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
    # we tend to do in v2
    $("//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    
    
    #
    #Content::CSS::RemoveCSS
    #[["regex_exclusion", ""]]
    $("//style") {
      remove()
    }
    $("//link[@rel = 'stylesheet']") {
      remove()
    }
    
    
    #
    #Content::Formatting::AddViewport
    #[["scalable", ""]]
    $("html/head") {
      insert_top("meta") {
        attribute("name", "viewport")
        attribute("content", "width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;")
      }
    }
    
    #
    #Content::Absolutize::AbsolutizeFavicon
    #[]
    $("html/head") {
      var("icon_exists", "false")
      # Find the shortcut icons and give them the source host if they don't have a host
      $(".//link[@rel = 'shortcut icon' or @rel = 'icon']") {
        var("icon_exists", "true")
        var("href", fetch("./@href"))
        attribute("href") {
          value() {
            # if the URL begins with a slash put the source host in front
            # TODO: handle the case when the favicon doesn't begin with http or a slash
            match($href, /^\//) {
              prepend($source_host)
              prepend("//")
            }
          }
        }
      }
      # If there are no shortcut icons, add one
      match($icon_exists, "false") {
        insert_bottom("link") {
          attribute("rel", "shortcut icon")
          attribute("href") {
            value() {
              set($source_host)
              prepend("//")
              append("/favicon.ico")
            }
          }
        }
      }
    }
    
    
  # end BasicGroup
  
  #
  #Content::CSS::AddCSS
  #[["css_path", "http://dl.dropbox.com/u/6208053/macys_v2/macys_skavaFooter.css"], ["encode_image_threshold", ""]]
  $('//html/head') {
    insert_bottom("link", rel: "stylesheet", type: "text/css", href: sass("pages/macys_skavaFooter"))
  }
  
  
  #Logo
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLogo"], ["selector", "#globalMastheadLogo > a > img"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'globalMastheadLogo']/a/img") {
      match($done, "no") {
          var("done", "yes")
        attribute("class") {
          value() {
              set("mvLogo")
          }
        }
      }
    }
    
    
    #Replace Logo image
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/logo.png"], ["selector", ".mvLogo"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' mvLogo ')]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/logo.png")
      #attribute('src', asset('images/logo.png'))
      name('div')
      attribute('src', '')
      add_class('sprite_me-logo')
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "width"], ["selector", ".mvLogo"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvLogo ')]") {
      attribute("width") {
        remove()
      }
    }
    
    
    #
    #Content::Formatting::RemoveAttribute
    #[["attribute", "height"], ["selector", ".mvLogo"]]
    $("//*[contains(concat(' ', @class, ' '), ' mvLogo ')]") {
      attribute("height") {
        remove()
      }
    }
    
    
  # end BasicGroup
  
  #Regular and registry header and footer
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "input[name=\"KEYWORD_GO_BUTTON\"]"], ["negate", ""]]
  $("(//input[@name = \"KEYWORD_GO_BUTTON\"])[1]") {
  
    #Header
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #search
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #Remove Search img Label
        #Content::Formatting::RemoveElements
        #[["selector", "#globalSubNav > form > img"]]
        $("//*[@id = 'globalSubNav']/form/img") {
          remove()
        }
        
        
        #
        #Content::Formatting::AddFileAttribute
        #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/go_btn.png"], ["selector", "input[value=\"KEYWORD_GO_BUTTON\"]"]]
        # NOTE: just sets the attribute - doesn't do anything special for files
        $("//input[@value = \"KEYWORD_GO_BUTTON\"]") {
          #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/go_btn.png")
          #attribute('src', asset('images/buttons/go.png'))
          name('div')
          attribute('src', '')
          add_class('sprite_me-go')
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvSearchBtn"], ["selector", "input[value=\"KEYWORD_GO_BUTTON\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//input[@value = \"KEYWORD_GO_BUTTON\"]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvSearchBtn")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #Header Cart
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::MoveAfter
        #[["move_me", "#globalMiniCartItems"], ["after_me", "#globalMastheadLogo"], ["map_multiple", ""]]
        $("(//*[@id = 'globalMastheadLogo'])[1]") {
          move_here("(//*[@id = 'globalMiniCartItems'])[1]", "after")
        }
        
        
        #
        #Content::Formatting::MoveUp
        #[["move_me", ".globalMiniCartItems"]]
        $("//*[contains(concat(' ', @class, ' '), ' globalMiniCartItems ')]") {
          move_to("..", "before")
        }
        
        
        #Hide Element from cart
        #Don't remove this, otherwise bag will be broken when sign in
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvHideElement"], ["selector", ".globalMiniCartItems + p"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' globalMiniCartItems ')]/following-sibling::*[1]/self::p") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvHideElement")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #customer service
    #Group::URLMatcherGroup
    #[["url_matcher", "customerservice\\..*\\/app"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /customerservice\..*\/app/) {
    
      #
      #Content::Inject::InjectHTML
      #[["html", "<a class=\"globalMiniCartItems\"></a>"], ["add_after", "#globalMastheadMiniCart > p"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalMastheadMiniCart']/p)[1]") {
        inject_after("<a class=\"globalMiniCartItems sprite_me-bag\"></a>")
      }
      
      
      #
      #Content::Formatting::DuplicateAttribute
      #[["duplicate_source", ".globalMiniCartShoppingBag"], ["duplicate_target", ".globalMiniCartItems"], ["attribute", "href"], ["multiple", ""], ["ancestor", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' globalMiniCartShoppingBag ')])[1]") {
        var("duplicate_attribute", fetch("./@href"))
        $("(//*[contains(concat(' ', @class, ' '), ' globalMiniCartItems ')])[1]") {
          attribute("href", $duplicate_attribute)
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "weddingRegistry"], ["selector", "img[alt=\"Wedding Registry\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@alt = \"Wedding Registry\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("weddingRegistry")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "stores"], ["selector", "img[alt=\"store locations\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[@alt = \"store locations\"]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("stores")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "id"], ["value", "giftCards"], ["selector", "img[alt*=\"Giftcards\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", "true"], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//img[contains(@alt, \"Giftcards\")]") {
        match($done, "no") {
          $("..") {
            var("done", "yes")
          attribute("id") {
            value() {
                set("giftCards")
            }
          }
          }
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvHideElement"], ["selector", "#globalMastheadMiniCart > p"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'globalMastheadMiniCart']/p") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                set("mvHideElement")
            }
          }
        }
      }
      
      
    }
    
    #Regular Menu
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/wedding\\/"], ["negate", "true"]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, not(/\/wedding\//)) {
    
      #
      #Following Ryan's asked hard code these.
      #Content::Formatting::SetInnerHTML
      #[["selector", "#globalNav"], ["html", "<div class=\"globalNavigationBar\"> <div><a href=\"/shop/womens?id=118\">Women</a></div> <div><a href=\"/shop/mens?id=1\">Men</a></div> <div><a href=\"/shop/for-the-home?id=22672\">For the Home</a></div> <div><a href=\"/shop/shoes?id=13247\">Shoes</a></div> <div><a href=\"/shop/juniors?id=16904\">Juniors</a></div> <div><a href=\"/shop/jewelry-watches?id=544\">Jewelry&nbsp;&amp;&nbsp;Watches</a></div> <div><a href=\"/shop/handbags-accessories?id=26846\">Handbags</a></div> <div><a href=\"/shop/beauty?id=669\">Beauty</a></div> <div><a href=\"/shop/kids?id=5991\">Kids</a></div> <div><a href=\"/shop/bed-bath?id=7495\">Bed&nbsp;&amp;&nbsp;Bath</a></div> <div><a href=\"/shop/furniture?id=29391\">Furniture</a></div> <div><a href=\"/shop/kitchen?id=7497\">Kitchen</a></div> <div><a href=\"/shop/sale?id=3536\">Sale</a></div> </div>"], ["prepend", ""], ["append", ""]]
      $("//*[@id = 'globalNav']") {
        inner("<div class=\"globalNavigationBar\"> <div><a href=\"/shop/womens?id=118\">Women</a></div> <div><a href=\"/shop/mens?id=1\">Men</a></div> <div><a href=\"/shop/for-the-home?id=22672\">For the Home</a></div> <div><a href=\"/shop/shoes?id=13247\">Shoes</a></div> <div><a href=\"/shop/juniors?id=16904\">Juniors</a></div> <div><a href=\"/shop/jewelry-watches?id=544\">Jewelry&nbsp;&amp;&nbsp;Watches</a></div> <div><a href=\"/shop/handbags-accessories?id=26846\">Handbags</a></div> <div><a href=\"/shop/beauty?id=669\">Beauty</a></div> <div><a href=\"/shop/kids?id=5991\">Kids</a></div> <div><a href=\"/shop/bed-bath?id=7495\">Bed&nbsp;&amp;&nbsp;Bath</a></div> <div><a href=\"/shop/furniture?id=29391\">Furniture</a></div> <div><a href=\"/shop/kitchen?id=7497\">Kitchen</a></div> <div><a href=\"/shop/sale?id=3536\">Sale</a></div> </div>")
      }
        
        #Secondary Menu
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #
          #Content::Meta::ExtractAttributeValues
          #[["selector", ".subNavImageMap img"], ["attribute", "alt"], ["regex_capture", ""], ["result_key", ""]]
          $("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//img") {
            $chain = "chain"
            $chain {
              append(index())
            }
            var($chain, fetch("./@alt"))
          }
          
          
          #
          #Content::Formatting::SetInnerText
          #[["selector", ".subNavImageMap > a"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", "true"]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]/a") {
              $chain = "chain"
              $chain {
                append(index())
              }
            inner() {
              set(var($chain))
            }
          }
          
          
          #
          #Content::Formatting::RemoveElements
          #[["selector", ".subNavImageMap img"]]
          $("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//img") {
            remove()
          }
          
          
        # end BasicGroup
        
      # end BasicGroup
      
      #more
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #More Wrapper
        #Content::Formatting::WrapElement
        #[["selector", ".noTextDecoration:contains(\"customer service\"), .subNavImageMap a:contains(\"Deals and Promotions\"), .subNavImageMap #giftCards, a.myFooter:contains(\"order tracking\"), a.myFooter:contains(\"pay your bill\")"], ["class_name", "mvMore"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//a[contains(., \"Deals and Promotions\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//*[@id = 'giftCards'][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"order tracking\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"pay your bill\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//a[contains(., \"Deals and Promotions\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//a[contains(., \"Deals and Promotions\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//*[@id = 'giftCards'][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"order tracking\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"pay your bill\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//*[@id = 'giftCards'])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//a[contains(., \"Deals and Promotions\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//*[@id = 'giftCards'][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"order tracking\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"pay your bill\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"order tracking\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//a[contains(., \"Deals and Promotions\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//*[@id = 'giftCards'][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"order tracking\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"pay your bill\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"pay your bill\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//a[contains(., \"Deals and Promotions\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]//*[@id = 'giftCards'][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"order tracking\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"pay your bill\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMenuGroup"], ["selector", ".mvMore"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvMore ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvMenuGroup")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".mvMore > a"], ["class_name", "mvSubMenu"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')]/a)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvSubMenu")
              move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')]/a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuOpener\">More<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMore .mvSubMenu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')])[1]") {
          inject_before("<div class=\"mvMenuOpener\">More<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
        
        
        #
        #Content::Passthrough::Link
        #[["selector", "a.myFooter:contains(\"pay your bill\")"], ["regex_filter", ""], ["regex_exclusion", ""], ["force_this_blockset", ""]]
        # NOTE: AF: Very loose implementation. Just rewriting all the anchor tags as
        # we tend to do in v2
        $("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"pay your bill\")]") {
          attribute("href") {
            value() {
              rewrite("link")
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "a.myFooter:contains(\"order tracking\")"], ["text", "My Orders"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"order tracking\")]") {
          inner() {
            set("My Orders")
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<a href=\"http://customerservice.macys.com/app/answers/list/c/15\" target=\"_blank\">Legal Policies</a>"], ["add_after", "#giftCards"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'giftCards'])[1]") {
          inject_after("<a href=\"http://customerservice.macys.com/app/answers/list/c/15\" target=\"_blank\">Legal Policies</a>")
        }
        
        
      # end BasicGroup
      
      #Menu Content Wrapper
      #Content::Formatting::WrapElement
      #[["selector", "#globalNav, #stores, a.myFooter:contains(\"store events\"), a.noTextDecoration:contains(\"my account\"), #weddingRegistry, .mvMore"], ["class_name", "mvMenuWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'globalNav'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'weddingRegistry'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[@id = 'stores'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'weddingRegistry'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'weddingRegistry'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'weddingRegistry'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[@id = 'weddingRegistry'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'weddingRegistry'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'weddingRegistry'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", ".subNavImageMap"]]
      $("//*[contains(concat(' ', @class, ' '), ' subNavImageMap ')]") {
        remove()
      }
      
      
      #Stores
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::WrapElement
        #[["selector", "#stores, a.myFooter:contains(\"store events\")"], ["class_name", "mvMenuGroup"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[@id = 'stores'])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMenuGroup")
              move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMenuGroup")
              move_here("//*[@id = 'stores'][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and contains(., \"store events\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuOpener\">Stores<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#stores"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'stores'])[1]") {
          inject_before("<div class=\"mvMenuOpener\">Stores<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".mvMenuGroup > a"], ["class_name", "mvSubMenu"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' mvMenuGroup ')]/a)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvSubMenu")
              move_here("//*[contains(concat(' ', @class, ' '), ' mvMenuGroup ')]/a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", "#stores"], ["text", "Find a Store"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[@id = 'stores']") {
          inner() {
            set("Find a Store")
          }
        }
        
        
      # end BasicGroup
      
      #Shop by category
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuOpener\">shop by category<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".globalNavigationBar"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')])[1]") {
          inject_before("<div class=\"mvMenuOpener\">shop by category<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvSubMenu"], ["selector", ".globalNavigationBar"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvSubMenu")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMenuGroup"], ["selector", "#globalNav"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'globalNav']") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvMenuGroup")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #Duplicate for bottom menu
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Duplicate
        #[["duplicate_me", ".mvMenuWrapper"], ["after_me", "#doc3"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
        $("(//*[@id = 'doc3'])[1]") {
          copy_here("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMenuWrapper2"], ["selector", "body > .mvMenuWrapper"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//body/*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvMenuWrapper2")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMenuWrapper .mvSubMenu a"], ["tag_name", "div"], ["class_name", "mvWhiteBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]//a") {
        wrap("div") {
          attribute("class", "mvWhiteBar")
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMenuWrapper2 .mvSubMenu a"], ["tag_name", "div"], ["class_name", "mvWhiteGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]//a") {
        wrap("div") {
          attribute("class", "mvWhiteGrayBar")
        }
      }
      
      
      #Sub Menu Accordians
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvMenuOpener"], ["content_selector", ".mvSubMenu"], ["ancestor_selector", ".mvMenuGroup"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuGroup ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]") {
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
                append("49191")
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
        $(".//*[contains(concat(' ', @class, ' '), ' mvMenuOpener ')]") {
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
                append("49191")
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
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvMenuOpener, .mvMenuWrapper > a, .mvMenuWrapper2 > a"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuOpener ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]/a") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]/a") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      
      
      #Remove My account inline style
      #only some pages have inline style on my account tag
      #Content::CSS::RemoveStyles
      #[["selector", ".noTextDecoration"]]
      $("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ')]") {
        attribute("style") {
          remove()
        }
      }
      
      
      #sign in
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::RemoveElements
        #[["selector", "#signInProfileInfo > span"]]
        $("//*[@id = 'signInProfileInfo']/span") {
          remove()
        }
        
        
      # end BasicGroup
      
      #footer links wrapper
      #Content::Formatting::WrapElement
      #[["selector", "#signInProfileInfo, a.myFooter[title=\"contact us\"]"], ["class_name", "mvFooterLinks"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'signInProfileInfo'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvFooterLinks")
            move_here("//*[@id = 'signInProfileInfo'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and @title = \"contact us\"][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//a[contains(concat(' ', @class, ' '), ' myFooter ') and @title = \"contact us\"])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvFooterLinks")
            move_here("//*[@id = 'signInProfileInfo'][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and @title = \"contact us\"][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #close general menu
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvCloseMenu mvDarkBtn\">close</div>"], ["add_after", ".mvMenuWrapper .mvMore"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvMore ')])[1]") {
        inject_after("<div class=\"mvCloseMenu mvDarkBtn\">close</div>")
      }
      
      
    }
    
    #Wedding Registry Menu
    #Group::URLMatcherGroup
    #[["url_matcher", "\\/wedding\\/"], ["negate", ""]]
    # This is a 'fake' url because it has http when it might mean https
    var("fake_url") {
      set(var("source_host"))
      append(var("path"))
      prepend("http://")
    }
    match($fake_url, /\/wedding\//) {
    
      #Registry Gift Shop
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Following Ryan's asked hard code these.
        #Content::Formatting::SetInnerHTML
        #[["selector", "#globalNav"], ["html", "<div class=\"globalNavigationBar\"> <div><a href=\"/shop/registry/wedding/bed-bath?id=7495\">Bed&nbsp;&amp;&nbsp;Bath</a></div> <div><a href=\"/shop/registry/wedding/cleaning-organizing?id=47587\">Cleaning&nbsp;&amp;&nbsp;Organizing</a></div> <div><a href=\"/shop/registry/wedding/dining-entertaining?id=7498\">Dining&nbsp;&amp;&nbsp;Entertaining</a></div> <div><a href=\"/shop/registry/wedding/home-decor?id=49573\">Home Decor</a></div> <div><a href=\"/shop/registry/wedding/kitchen?id=7497\">Kitchen</a></div> <div><a href=\"/shop/registry/wedding/luggage?id=16908\">Luggage</a></div> </div>"], ["prepend", ""], ["append", ""]]
        $("//*[@id = 'globalNav']") {
          inner("<div class=\"globalNavigationBar\"> <div><a href=\"/shop/registry/wedding/bed-bath?id=7495\">Bed&nbsp;&amp;&nbsp;Bath</a></div> <div><a href=\"/shop/registry/wedding/cleaning-organizing?id=47587\">Cleaning&nbsp;&amp;&nbsp;Organizing</a></div> <div><a href=\"/shop/registry/wedding/dining-entertaining?id=7498\">Dining&nbsp;&amp;&nbsp;Entertaining</a></div> <div><a href=\"/shop/registry/wedding/home-decor?id=49573\">Home Decor</a></div> <div><a href=\"/shop/registry/wedding/kitchen?id=7497\">Kitchen</a></div> <div><a href=\"/shop/registry/wedding/luggage?id=16908\">Luggage</a></div> </div>")
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuOpener\">Registry Categories<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".globalNavigationBar"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')])[1]") {
          inject_before("<div class=\"mvMenuOpener\">Registry Categories<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
        
        
        #Remove Images From category nav
        #Group::BasicGroup
        #[]
        # No need to wrap the contents at all
          #Top Menu
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Meta::ExtractAttributeValues
            #[["selector", ".globalNavigationBar img"], ["attribute", "alt"], ["regex_capture", ""], ["result_key", ""]]
            $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]//img") {
              $chain = "chain"
              $chain {
                append(index())
              }
              var($chain, fetch("./@alt"))
            }
            
            
            #
            #Content::Formatting::SetInnerText
            #[["selector", ".globalNavigationBar a"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", "true"]]
            # NOTE: not sure if /html() or /text() is what I want to be using here
            $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]//a") {
                $chain = "chain"
                $chain {
                  append(index())
                }
              inner() {
                set(var($chain))
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", ".globalNavigationBar img"]]
            $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]//img") {
              remove()
            }
            
            
          # end BasicGroup
          
          #Secondary Menu
          #Group::BasicGroup
          #[]
          # No need to wrap the contents at all
            #
            #Content::Meta::ExtractAttributeValues
            #[["selector", "#globalSubNavStoreLinks img"], ["attribute", "alt"], ["regex_capture", ""], ["result_key", ""]]
            $("//*[@id = 'globalSubNavStoreLinks']//img") {
              $chain = "chain"
              $chain {
                append(index())
              }
              var($chain, fetch("./@alt"))
            }
            
            
            #
            #Content::Formatting::SetInnerText
            #[["selector", "#globalSubNavStoreLinks > ul > li > a"], ["text", ""], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", "true"]]
            # NOTE: not sure if /html() or /text() is what I want to be using here
            $("//*[@id = 'globalSubNavStoreLinks']/ul/li/a") {
                $chain = "chain"
                $chain {
                  append(index())
                }
              inner() {
                set(var($chain))
              }
            }
            
            
            #
            #Content::Formatting::RemoveElements
            #[["selector", "#globalSubNavStoreLinks img"]]
            $("//*[@id = 'globalSubNavStoreLinks']//img") {
              remove()
            }
            
            
          # end BasicGroup
          
        # end BasicGroup
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvSubMenu"], ["selector", ".globalNavigationBar"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' globalNavigationBar ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvSubMenu")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMenuGroup"], ["selector", "#globalNav"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'globalNav']") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvMenuGroup")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #more
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #More Wrapper
        #Content::Formatting::WrapElement
        #[["selector", ".noTextDecoration:contains(\"customer service\"), #globalSubNavStoreLinks a:contains(\"HELP\"), .noTextDecoration:contains(\"my account\"), a:contains(\"REWARDS PROGRAM\")"], ["class_name", "mvMore"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[@id = 'globalSubNavStoreLinks']//a[contains(., \"HELP\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(., \"REWARDS PROGRAM\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//*[@id = 'globalSubNavStoreLinks']//a[contains(., \"HELP\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[@id = 'globalSubNavStoreLinks']//a[contains(., \"HELP\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(., \"REWARDS PROGRAM\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[@id = 'globalSubNavStoreLinks']//a[contains(., \"HELP\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(., \"REWARDS PROGRAM\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        match($found, "false") {
          $("(//a[contains(., \"REWARDS PROGRAM\")])[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvMore")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")][not (@the_wrapper)]", "bottom")
              move_here("//*[@id = 'globalSubNavStoreLinks']//a[contains(., \"HELP\")][not (@the_wrapper)]", "bottom")
              move_here("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"my account\")][not (@the_wrapper)]", "bottom")
              move_here("//a[contains(., \"REWARDS PROGRAM\")][not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMenuGroup"], ["selector", ".mvMore"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvMore ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvMenuGroup")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::WrapElement
        #[["selector", ".mvMore > a"], ["class_name", "mvSubMenu"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
        var("found", "false")
        match($found, "false") {
          $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')]/a)[1]") {
            var("found", "true")
            insert_before("div") {
              attribute("the_wrapper", "true")
              attribute("class", "mvSubMenu")
              move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')]/a[not (@the_wrapper)]", "bottom")
              attribute("the_wrapper") {
                remove()
              }
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuOpener\">More<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMore .mvSubMenu"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')])[1]") {
          inject_before("<div class=\"mvMenuOpener\">More<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
        
        
      # end BasicGroup
      
      #My registry
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMenuGroup"], ["selector", "#globalSubNavStoreLinks"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'globalSubNavStoreLinks']") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvMenuGroup")
              }
            }
          }
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvSubMenu"], ["selector", "#globalSubNavStoreLinks > ul"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[@id = 'globalSubNavStoreLinks']/ul") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvSubMenu")
              }
            }
          }
        }
        
        
        #
        #Content::Inject::InjectHTML
        #[["html", "<div class=\"mvMenuOpener\">My Registry<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", "#globalSubNavStoreLinks > ul"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[@id = 'globalSubNavStoreLinks']/ul)[1]") {
          inject_before("<div class=\"mvMenuOpener\">My Registry<span class=\"mvPlus\">+ </span><span class=\"mvMinus\">&minus; </span></div>")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "ul.mvSubMenu > li"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "a:contains(\"REGISTRY CHECKLIST\")"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//ul[contains(concat(' ', @class, ' '), ' mvSubMenu ')]/li") {
          match($done, "no") {
              var("conditional", "false")
                $(".//a[contains(., \"REGISTRY CHECKLIST\")]") {
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
        
        
      # end BasicGroup
      
      #Menu Content Wrapper
      #Content::Formatting::WrapElement
      #[["selector", "#globalNav, #globalSubNavStoreLinks, .mvMore"], ["class_name", "mvMenuWrapper"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[@id = 'globalNav'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'globalSubNavStoreLinks'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[@id = 'globalSubNavStoreLinks'])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'globalSubNavStoreLinks'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvMenuWrapper")
            move_here("//*[@id = 'globalNav'][not (@the_wrapper)]", "bottom")
            move_here("//*[@id = 'globalSubNavStoreLinks'][not (@the_wrapper)]", "bottom")
            move_here("//*[contains(concat(' ', @class, ' '), ' mvMore ')][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<a href=\" /registry/wedding/registryhome?cm_sp=global_nav_reg-_-wedding_registry-_-n\" class=\"mvDarkGrayBar mvRegistryHome\">Registry Home</div>"], ["add_after", ".mvMore"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')])[1]") {
        inject_after("<a href=\" /registry/wedding/registryhome?cm_sp=global_nav_reg-_-wedding_registry-_-n\" class=\"mvDarkGrayBar mvRegistryHome\">Registry Home</div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<a id=\"stores\" href=\"/store/index.ognc\">Stores</a>"], ["add_after", ".mvMore .mvSubMenu > :last-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]/*[position() = last() and self::*])[1]") {
        inject_after("<a id=\"stores\" href=\"/store/index.ognc\">Stores</a>")
      }
      
      
      #back macys.com
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::ReplaceTag
        #[["selector", "#globalSubNavStoreLinks > ul > li.last"], ["new_tag_name", "div"], ["class_name", ""]]
        $("//*[@id = 'globalSubNavStoreLinks']/ul/li[contains(concat(' ', @class, ' '), ' last ')]") {
          name("div")
        }
        
        
        #
        #Content::Formatting::MoveAfter
        #[["move_me", "#globalSubNavStoreLinks > ul > div.last"], ["after_me", ".mvRegistryHome"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvRegistryHome ')])[1]") {
          move_here("(//*[@id = 'globalSubNavStoreLinks']/ul/div[contains(concat(' ', @class, ' '), ' last ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvMenuWrapper  > div.last a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]/div[contains(concat(' ', @class, ' '), ' last ')]//a") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvDarkGrayBar")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #Duplicate for bottom menu
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Duplicate
        #[["duplicate_me", ".mvMenuWrapper"], ["after_me", "#doc3"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
        $("(//*[@id = 'doc3'])[1]") {
          copy_here("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')])[1]", "after")
        }
        
        
        #
        #Content::Formatting::AddAttribute
        #[["attribute", "class"], ["value", "mvMenuWrapper2"], ["selector", "body > .mvMenuWrapper"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//body/*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  set("mvMenuWrapper2")
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #Sub Menu Accordians
      #Content::Formatting::Dynamic::Accordian4
      #[["link_selector", ".mvMenuOpener"], ["content_selector", ".mvSubMenu"], ["ancestor_selector", ".mvMenuGroup"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("anc_counter", "")
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuGroup ')]") {
        var("anc_counter") {
          append("b")
        }
        var("counter", "")
        var("content_id_string", "[")
        $(".//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]") {
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
                append("28682")
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
        $(".//*[contains(concat(' ', @class, ' '), ' mvMenuOpener ')]") {
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
                append("28682")
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
      #[["selector", ".mvMenuWrapper .mvSubMenu a"], ["tag_name", "div"], ["class_name", "mvWhiteBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]//a") {
        wrap("div") {
          attribute("class", "mvWhiteBar")
        }
      }
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMenuWrapper2 .mvSubMenu a"], ["tag_name", "div"], ["class_name", "mvWhiteGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]//a") {
        wrap("div") {
          attribute("class", "mvWhiteGrayBar")
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvMenuOpener, .mvMenuWrapper > a, .mvMenuWrapper2 > a"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuOpener ')]") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]/a") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]/a") {
        match($done, "no") {
          attribute("class") {
            value() {
                append(" mvDarkGrayBar")
            }
          }
        }
      }
      
      
      #Remove My account inline style
      #only some pages have inline style on my account tag
      #Content::CSS::RemoveStyles
      #[["selector", ".noTextDecoration"]]
      $("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ')]") {
        attribute("style") {
          remove()
        }
      }
      
      
      #footer links wrapper
      #Content::Formatting::WrapElement
      #[["selector", ".globalMiniCartSignIn, a.myFooter[title=\"contact us\"]"], ["class_name", "mvFooterLinks"], ["id", ""], ["add_elem_counter", ""], ["elem_count_offset", ""], ["empty_message", ""], ["relative_selector", ""], ["only_include_direct_children", ""]]
      var("found", "false")
      match($found, "false") {
        $("(//*[contains(concat(' ', @class, ' '), ' globalMiniCartSignIn ')])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvFooterLinks")
            move_here("//*[contains(concat(' ', @class, ' '), ' globalMiniCartSignIn ')][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and @title = \"contact us\"][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      match($found, "false") {
        $("(//a[contains(concat(' ', @class, ' '), ' myFooter ') and @title = \"contact us\"])[1]") {
          var("found", "true")
          insert_before("div") {
            attribute("the_wrapper", "true")
            attribute("class", "mvFooterLinks")
            move_here("//*[contains(concat(' ', @class, ' '), ' globalMiniCartSignIn ')][not (@the_wrapper)]", "bottom")
            move_here("//a[contains(concat(' ', @class, ' '), ' myFooter ') and @title = \"contact us\"][not (@the_wrapper)]", "bottom")
            attribute("the_wrapper") {
              remove()
            }
          }
        }
      }
      
      
      #close registry menu
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvCloseMenu mvDarkBtn\">close</div>"], ["add_after", ".mvMenuWrapper >  div.last"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]/div[contains(concat(' ', @class, ' '), ' last ')])[1]") {
        inject_after("<div class=\"mvCloseMenu mvDarkBtn\">close</div>")
      }
      
      
    }
    
    #customer service don't passthrough
    #Content::Passthrough::ReversePassthroughAttribute
    #[["selector", "a.noTextDecoration:contains(\"customer service\")"], ["attribute", "href"], ["regex_capture", ""]]
    # WARNING: NOT IMPLEMENTED YET
    # To implement this we need the reverse rewrite function - rewrite("host")
    # This is not trivial because the host rewrite is different - it is an array
    # of regular expressions, not just one
    #
    #
    #$("//a[contains(concat(' ', @class, ' '), ' noTextDecoration ') and contains(., \"customer service\")]") {
    #  attribute("href") {
    #    value() {
    #      rewrite("host")
    #    }
    #  }
    #}
    # 
    #
    
    #Search and menu accordian
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvSearchAndMenu\"><span class=\"mvSearchDropdown\"></span><span class=\"mvMenuDropdown\"></span></span>"], ["add_after", "#globalMastheadMiniCart > a"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalMastheadMiniCart']/a)[1]") {
        add_class("sprite_me-bag")
        inject_after("<span class=\"mvSearchAndMenu\"><span class=\"mvSearchDropdown sprite_me-search_icon\"></span><span class=\"mvMenuDropdown\"></span></span>")
      }
      
      
      #Menu Accordian
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvMenuDropdown"], ["content_selector", "#globalMastheadContainer .mvMenuWrapper"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[@id = 'globalMastheadContainer']//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]") {
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
              append("6072")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("6072")
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
      
      
      #Search accordian
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvSearchDropdown"], ["content_selector", "#globalMastheadContainer #globalSubNav"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[@id = 'globalMastheadContainer']//*[@id = 'globalSubNav']") {
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
              append("36350")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("36350")
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
      
      
      #Close menu
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", ".mvMenuWrapper"], ["trigger", ".mvSearchDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "mousedown"]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget27340")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger27340")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".mvSearchDropdown"], ["trigger", ".mvMenuDropdown"], ["old_class", "moovweb_open"], ["trigger_event", "mousedown"]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget74829")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger74829")
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
                  append("'),'moovweb_open');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvMenuDropdown"], ["target_event", "click"], ["trigger", ".mvMenuWrapper .mvCloseMenu"], ["trigger_event", ""], ["multiple", ""], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("trigger_id", "")
        var("target_id", "")
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etarget")
                  append("52827")
                }
              }
            }
            var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvCloseMenu ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etrigger")
                  append("52827")
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
                 append("').addEventListener('click', function(){moovweb_trigger('click', '")
                 append($target_id)
                 append("')},false);")
                }
              }
            }
          }
        }
        
        
      # end BasicGroup
      
      #Close Search
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", "#globalMastheadContainer #globalSubNav"], ["trigger", ".mvMenuDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "mousedown"]]
        $("(//*[@id = 'globalMastheadContainer']//*[@id = 'globalSubNav'])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget7216")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger7216")
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
                  append("'),'mw_accordian_hide');},false);")
                }
              }
            }
          }
        }
        
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".mvMenuDropdown"], ["trigger", ".mvSearchDropdown"], ["old_class", "moovweb_open"], ["trigger_event", "mousedown"]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget52394")
              }
            }
          }
          var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvSearchDropdown ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstrigger52394")
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
                  append("'),'moovweb_open');},false);")
                }
              }
            }
          }
        }
        
      # end BasicGroup
      
    # end BasicGroup
    
    #bottom search
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Duplicate search to bottom
      #Content::Formatting::Duplicate
      #[["duplicate_me", "#globalSubNavBox"], ["after_me", "#doc3"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
      $("(//*[@id = 'doc3'])[1]") {
        copy_here("(//*[@id = 'globalSubNavBox'])[1]", "after")
      }
      
      
      #
      #Content::Formatting::RemoveAttribute
      #[["attribute", "class"], ["selector", "body > #globalSubNavBox > #globalSubNav"]]
      $("//body/*[@id = 'globalSubNavBox']/*[@id = 'globalSubNav']") {
        attribute("class") {
          remove()
        }
      }
      
      
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "placeholder"], ["value", "Search Keyword, Web ID"], ["selector", "body >#globalSubNavBox .globalSearchInputField"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body/*[@id = 'globalSubNavBox']//*[contains(concat(' ', @class, ' '), ' globalSearchInputField ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("placeholder") {
            value() {
                set("Search Keyword, Web ID")
            }
          }
        }
      }
      
      
      #
      #Keep value empty by default, otherwise, after search, the keyword will keep in search box
      #Content::Formatting::AddAttribute
      #[["attribute", "value"], ["value", ""], ["selector", "body >#globalSubNavBox .globalSearchInputField"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body/*[@id = 'globalSubNavBox']//*[contains(concat(' ', @class, ' '), ' globalSearchInputField ')]") {
        match($done, "no") {
            var("done", "yes")
          attribute("value") {
            value() {
                set("")
            }
          }
        }
      }
      
      
    # end BasicGroup
    
    #bottom menu accordian
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvBottomNav\">Site Menu</div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMenuWrapper2"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')])[1]") {
        inject_before("<div class=\"mvBottomNav\">Site Menu</div>")
      }
      
      
      #
      #Content::Formatting::SetInnerText
      #[["selector", ".registryHome .mvMenuWrapper2 .mvBottomNav"], ["text", "Wedding Registry Menu"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
      # NOTE: not sure if /html() or /text() is what I want to be using here
      $("//*[contains(concat(' ', @class, ' '), ' registryHome ')]//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]//*[contains(concat(' ', @class, ' '), ' mvBottomNav ')]") {
        inner() {
          set("Wedding Registry Menu")
        }
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvBottomNav"], ["content_selector", ".mvMenuWrapper2"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]") {
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
              append("76988")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvBottomNav ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("76988")
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
    
    #Footer
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvMacysFooter\"><span class=\"mvMacysCopyRight\">&copy;2011 macys.com is a registered trademark. All rights reserved.</span></div>"], ["add_after", ".mvMenuWrapper2"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')])[1]") {
        inject_after("<div class=\"mvMacysFooter\"><span class=\"mvMacysCopyRight\">&copy;2011 macys.com is a registered trademark. All rights reserved.</span></div>")
      }
      
      
      #Social Network
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #Facebook and twitter
        #Content::Formatting::MoveAfter
        #[["move_me", "#globalMastheadSocialLinks"], ["after_me", ".mvMacysCopyRight"], ["map_multiple", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMacysCopyRight ')])[1]") {
          move_here("(//*[@id = 'globalMastheadSocialLinks'])[1]", "after")
        }
        
        
        #
        #Content::Formatting::AddFileAttribute
        #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/facebook_icon.png"], ["selector", "#facebookIconImage"]]
        # NOTE: just sets the attribute - doesn't do anything special for files
        $("//*[@id = 'facebookIconImage']") {
          #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/facebook_icon.png")
          #attribute('src', asset('images/icons/facebook.png'))
          name('div')
          attribute('src', '')
          add_class('sprite_me-facebook')
        }
        
        
        #
        #Content::Formatting::AddFileAttribute
        #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/twitter_icon.png"], ["selector", "#twitterIconImage"]]
        # NOTE: just sets the attribute - doesn't do anything special for files
        $("//*[@id = 'twitterIconImage']") {
          #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/twitter_icon.png")
          #attribute('src', asset('images/icons/twitter.png'))
          name('div')
          attribute('src', '')
          add_class('sprite_me-twitter')
        }
        
        
      # end BasicGroup
      
      #Desktop site link
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #
        #Content::Inject::InjectDesktopSiteLink
        #[["add_after", ".mvFooterLinks > :nth-child(2)"]]
        # --- not found ---
        
        #
        #Content::Formatting::SetInnerText
        #[["selector", ".desktop_site"], ["text", "Macy's Full Site"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
        # NOTE: not sure if /html() or /text() is what I want to be using here
        $("//*[contains(concat(' ', @class, ' '), ' desktop_site ')]") {
          inner() {
            set("Macy's Full Site")
          }
        }
        
        
      # end BasicGroup
      
    # end BasicGroup
    
    #Remove Elements Group
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Remove Search Label
      #Content::Formatting::RemoveElements
      #[["selector", "form[name=\"keywordSearch\"] span"]]
      $("//form[@name = \"keywordSearch\"]//span") {
        remove()
      }
      
      
      #Remove Footer
      #Content::Formatting::RemoveElements
      #[["selector", "#ft"]]
      $("//*[@id = 'ft']") {
        remove()
      }
      
      
    # end BasicGroup
    
  }
  
  
  #checkout header and footer
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "input[name=\"KEYWORD_GO_BUTTON\"]"], ["negate", "true"]]
  var("element_exists", "false")
  $("(//input[@name = \"KEYWORD_GO_BUTTON\"])[1]") {
    var("element_exists", "true")
  }
  match($element_exists, "false") {
  
    #Header Cart
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Remove old bag img
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "mvRemoveElement"], ["selector", "#globalMastheadMiniCart a"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "img"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//*[@id = 'globalMastheadMiniCart']//a") {
        match($done, "no") {
            var("conditional", "false")
              $(".//img") {
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
      
      
    # end BasicGroup
    
    #Shop with confidence
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", "#checkoutFooterContent > a"], ["tag_name", "div"], ["class_name", "mvWhiteGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[@id = 'checkoutFooterContent']/a") {
        wrap("div") {
          attribute("class", "mvWhiteGrayBar")
        }
      }
      
      
      #
      #Content::Formatting::ReplaceTag
      #[["selector", "#checkoutFooterContent strong"], ["new_tag_name", "div"], ["class_name", "mvBottomNav"]]
      $("//*[@id = 'checkoutFooterContent']//strong") {
        name("div")
        attribute("class", "mvBottomNav")
      }
      
      
      #
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvBottomNav"], ["content_selector", ".mvWhiteGrayBar"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
      var("counter", "")
      var("content_id_string", "[")
      $("//*[contains(concat(' ', @class, ' '), ' mvWhiteGrayBar ')]") {
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
              append("64408")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvBottomNav ')]") {
        var("counter") {
          append("a")
        }
        var("id", fetch("./@id"))
        match($id, /^$/) {
          attribute("id") {
            value() {
              set("acc_link")
              append($counter)
              append("64408")
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
    
    #Footer
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::SetInnerHTML
      #[["selector", ".moovweb_footer"], ["html", "<div class=\"mvMacysFooter\">&copy;2011 macys.com is a registered trademark. <br/> All rights reserved.</div>"], ["prepend", "true"], ["append", ""]]
      $("//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')]") {
        inner() {
          prepend("<div class=\"mvMacysFooter\">&copy;2011 macys.com is a registered trademark. <br/> All rights reserved.</div>")
        }
      }
      
      
    # end BasicGroup
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "id"], ["value", "mvCheckOutBody"], ["selector", "body"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//body") {
      match($done, "no") {
          var("done", "yes")
        attribute("id") {
          value() {
              set("mvCheckOutBody")
          }
        }
      }
    }
    
    
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#checkoutSteps, #globalSubNavBox,#checkoutFooterContent > p, .mvRemoveElement"]]
    $("//*[@id = 'checkoutSteps']") {
      remove()
    }
    $("//*[@id = 'globalSubNavBox']") {
      remove()
    }
    $("//*[@id = 'checkoutFooterContent']/p") {
      remove()
    }
    $("//*[contains(concat(' ', @class, ' '), ' mvRemoveElement ')]") {
      remove()
    }
    
    
  }
  
  
  #
  #Content::Inject::InjectHTML
  #[["html", "<div id=\"mvSignin\"></div>"], ["add_after", ".mvMacysFooter"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
  $("(//*[contains(concat(' ', @class, ' '), ' mvMacysFooter ')])[1]") {
    inject_after("<div id=\"mvSignin\"></div>")
  }
  
  
  #
  #Content::Javascript::AddInlineScriptTag
  #[["script", "window.addEventListener(\"load\", function() {   var b = document.querySelector(\".mvFooterLinks\");   var c = document.getElementById(\"mvSignin\");   if(b && c) {     c.appendChild(b);   } }, false);"], ["add_after", ""], ["add_before", ""]]
    $("html/body") {
      insert_bottom("script") {
        attribute("language", "javascript")
        inner("window.addEventListener(\"load\", function() {   var b = document.querySelector(\".mvFooterLinks\");   var c = document.getElementById(\"mvSignin\");   if(b && c) {     c.appendChild(b);   } }, false);")
      }
    }
  
  
  #
  #Content::Formatting::RemoveElements
  #[["selector", "#globalMastheadPool, .skip,#bd"]]
  $("//*[@id = 'globalMastheadPool']") {
    remove()
  }
  $("//*[contains(concat(' ', @class, ' '), ' skip ')]") {
    remove()
  }
  $("//*[@id = 'bd']") {
    remove()
  }
  
  
  #
  #Content::Formatting::AddClassName
  #[["selector", "#hd"], ["class_name", "mvHideElement"], ["if_exists", ""]]
  $("(//*[@id = 'hd'])[1]") {
    attribute("class") {
      value() {
        append(" mvHideElement")
      }
    }
  }
  
  
  #
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvFooterReset"], ["selector", "body > #globalSubNavBox, .mvBottomNav, .mvMenuWrapper2, .mvMacysFooter, #mvSignin"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//body/*[@id = 'globalSubNavBox']") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvFooterReset")
        }
      }
    }
  }
  $("//*[contains(concat(' ', @class, ' '), ' mvBottomNav ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvFooterReset")
        }
      }
    }
  }
  $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvFooterReset")
        }
      }
    }
  }
  $("//*[contains(concat(' ', @class, ' '), ' mvMacysFooter ')]") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvFooterReset")
        }
      }
    }
  }
  $("//*[@id = 'mvSignin']") {
    match($done, "no") {
      attribute("class") {
        value() {
            append(" mvFooterReset")
        }
      }
    }
  }
  
  
}
