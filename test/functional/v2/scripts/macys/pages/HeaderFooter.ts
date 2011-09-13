
# ----- ParsedHTMLBlocks ----
html() {
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
      #attribute("src", asset("logo.png", "image"))
      # 116 x 32, margin-top: 2px
      name('div')
      attribute('src', '')
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
        #Content::Formatting::RemoveAttribute
        #[["attribute", "onsubmit"], ["selector", "#globalSubNav form[name=\"keywordSearch\"]"]]
        $("//*[@id = 'globalSubNav']//form[@name = \"keywordSearch\"]") {
          attribute("onsubmit") {
            remove()
          }
        }
        
        
        #
        #Content::Formatting::AddFileAttribute
        #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/go_btn.png"], ["selector", "input[value=\"KEYWORD_GO_BUTTON\"]"]]
        # NOTE: just sets the attribute - doesn't do anything special for files
        $("//input[@value = \"KEYWORD_GO_BUTTON\"]") {
          #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/go_btn.png")
          #attribute('src', asset('buttons/go.png', 'image'))
          attribute('src', '')
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
                  set("mvSearchBtn sprite_me-go")
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
            $(".//img") {
              remove()
            }
          }
        }
        
        
        #Check out confirmation
        #Group::URLMatcherGroup
        #[["url_matcher", "\\/checkoutswf\\/"], ["negate", ""]]
        # This is a 'fake' url because it has http when it might mean https
        var("fake_url") {
          set(var("source_host"))
          append(var("path"))
          prepend("http://")
        }
        match($fake_url, /\/checkoutswf\//) {
        
          #
          #Content::Formatting::MoveUp
          #[["move_me", "#globalMastheadMiniCart > p > a.noTextDecoration"]]
          $("//*[@id = 'globalMastheadMiniCart']/p/a[contains(concat(' ', @class, ' '), ' noTextDecoration ')]") {
            move_to("..", "before")
          }
          
          
          #Hide Element from cart
          #Don't remove this, otherwise bag will be broken when sign in
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "mvHideElement"], ["selector", "#globalMastheadMiniCart > a.noTextDecoration + p"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[@id = 'globalMastheadMiniCart']/a[contains(concat(' ', @class, ' '), ' noTextDecoration ')]/following-sibling::*[1]/self::p") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    set("mvHideElement")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "class"], ["value", "subNavImageMap"], ["selector", "#globalSubNavStoreLinks"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[@id = 'globalSubNavStoreLinks']") {
            match($done, "no") {
                var("done", "yes")
              attribute("class") {
                value() {
                    set("subNavImageMap")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "id"], ["value", "stores"], ["selector", "a[title=\"store locations\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//a[@title = \"store locations\"]") {
            match($done, "no") {
                var("done", "yes")
              attribute("id") {
                value() {
                    set("stores")
                }
              }
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
          #[["attribute", "id"], ["value", "giftCards"], ["selector", "a[title$=\"Giftcards\"]"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//a[substring(@title, string-length(@title) - string-length(\"Giftcards\") + 1, string-length(\"Giftcards\")) = \"Giftcards\"]") {
            match($done, "no") {
                var("done", "yes")
              attribute("id") {
                value() {
                    set("giftCards")
                }
              }
            }
          }
          
          
          #
          #Content::Formatting::AddAttribute
          #[["attribute", "id"], ["value", "signInProfileInfo"], ["selector", "#globalMastheadMiniCart > p"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", "a[href*=\"signin\"]"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
          var("done", "no")
          $("//*[@id = 'globalMastheadMiniCart']/p") {
            match($done, "no") {
                var("conditional", "false")
                  $(".//a[contains(@href, \"signin\")]") {
                    var("conditional", "true")
                  }
                match($conditional, "true") {
                var("done", "yes")
              attribute("id") {
                value() {
                    set("signInProfileInfo")
                }
              }
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
        inject_after("<a class=\"globalMiniCartItems\"></a>")
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
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "img[alt=\"BACK TO MACYS.COM\"]"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//img[@alt = \"BACK TO MACYS.COM\"])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
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
        
        
        #
        #Content::Passthrough::Attribute
        #[["selector", "a[title=\"order tracking\"]"], ["attribute", "href"], ["regex_capture", ""]]
        $("//a[@title = \"order tracking\"]") {
          attribute("href") {
            value() {
              rewrite("link")
            }
          }
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
        $("(//*[@id = 'doc3'])[1]|//div[@class = 'lia-page']") {
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
                append("35349")
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
                append("35349")
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
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvMenuOpener"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
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
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMenuWrapper > a, .mvMenuWrapper2 > a"], ["tag_name", "div"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]/a") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]/a") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
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
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", "img[alt=\"BACK TO MACYS.COM\"]"], ["negate", ""]]
    $("(//img[@alt = \"BACK TO MACYS.COM\"])[1]") {
    
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
      #[["html", "<div class=\"mvDarkGrayBar mvRegistryHome\"><a href=\" /registry/wedding/registryhome?cm_sp=global_nav_reg-_-wedding_registry-_-n\" >Registry Home</a></div>"], ["add_after", ".mvMore"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[contains(concat(' ', @class, ' '), ' mvMore ')])[1]") {
        inject_after("<div class=\"mvDarkGrayBar mvRegistryHome\"><a href=\" /registry/wedding/registryhome?cm_sp=global_nav_reg-_-wedding_registry-_-n\" >Registry Home</a></div>")
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
        #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvMenuWrapper  > div.last"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
        var("done", "no")
        $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]/div[contains(concat(' ', @class, ' '), ' last ')]") {
          match($done, "no") {
              var("done", "yes")
            attribute("class") {
              value() {
                  append(" mvDarkGrayBar")
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
                append("33019")
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
                append("33019")
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
      #[["attribute", "class"], ["value", "mvDarkGrayBar"], ["selector", ".mvMenuOpener"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
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
      
      
      #
      #Content::Formatting::WrapIndividualElements
      #[["selector", ".mvMenuWrapper > a, .mvMenuWrapper2 > a"], ["tag_name", "div"], ["class_name", "mvDarkGrayBar"], ["id", ""], ["multiple", "true"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]/a") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
        }
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]/a") {
        wrap("div") {
          attribute("class", "mvDarkGrayBar")
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
      
      
      #
      #Content::Formatting::RemoveEmptyElements
      #[["selector", ".mvSubMenu  li"]]
      $("//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]//li[not(descendant::*)]") {
        remove()
      }
      
      
    }
    
    
    #Search and menu accordian
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvMask\"></div>"], ["add_after", "body > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//body/*[position() = 1 and self::*])[1]") {
        inject_after("<div class=\"mvMask\"></div>")
      }
      
      
      #
      #Content::Inject::InjectHTML
      #[["html", "<span class=\"mvSearchAndMenu\"><span class=\"mvSearchDropdown\"></span><span class=\"mvMenuDropdown\"></span></span>"], ["add_after", "#globalMastheadMiniCart > a"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'globalMastheadMiniCart']/a)[1]") {
        add_class("sprite_me-bag")
        inject_after("<span class=\"mvSearchAndMenu\"><span class=\"mvSearchDropdown sprite_me-search_icon\"></span><span class=\"mvMenuDropdown sprite_me-list_icon\"></span></span>")
      }
      match($fake_url, /(Beauty-Blog)/) {
        $("(//*[@id = 'globalMastheadMiniCart']/p)[1]") {
          inject_after("<span class=\"mvSearchAndMenu\"><span class=\"mvSearchDropdown sprite_me-search_icon\"></span><span class=\"mvMenuDropdown sprite_me-list_icon\"></span></span>")
        }
      }
      
      #Menu Accordian
      #Content::Formatting::Dynamic::Accordian3
      #[["link_selector", ".mvMenuDropdown"], ["content_selector", "#globalMastheadContainer .mvMenuWrapper, .mvMask"], ["open_on_load", ""], ["hide_with_zero_height", ""]]
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
              append("50123")
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
      $("//*[contains(concat(' ', @class, ' '), ' mvMask ')]") {
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
              append("50123")
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
              append("50123")
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
              append("36188")
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
              append("36188")
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
                set("addclasstarget79242")
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
                set("addclasstrigger79242")
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
                set("addclasstarget82707")
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
                set("addclasstrigger82707")
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
                  append("26588")
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
                  append("26588")
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
        
        
        #
        #Content::Formatting::Dynamic::RemoveClassOnEvent
        #[["target", ".mvMask"], ["trigger", ".mvMenuDropdown"], ["old_class", "moovweb_open"], ["trigger_event", "mousedown"]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMask ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget11254")
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
                set("addclasstrigger11254")
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
        #Content::Formatting::Dynamic::AddClassOnEvent
        #[["target", ".mvMask"], ["trigger", ".mvSearchDropdown"], ["new_class", "mw_accordian_hide"], ["trigger_event", "mousedown"]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMask ')])[1]") {
          var("id", fetch("./@id"))
          match($id, /^$/) {
            attribute("id") {
              value() {
                set("addclasstarget88089")
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
                set("addclasstrigger88089")
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
        #Content::Formatting::AddEventTrigger
        #[["target", ".mvMenuDropdown"], ["target_event", "click"], ["trigger", ".mvMask"], ["trigger_event", ""], ["multiple", ""], ["external_trigger_function", ""], ["trigger_return_bool_value", ""], ["trigger_phase", ""], ["add_listener_as_attribute", ""], ["single_target", ""]]
        var("trigger_id", "")
        var("target_id", "")
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuDropdown ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etarget")
                  append("8898")
                }
              }
            }
            var("target_id", fetch("./@id"))
        }
        $("(//*[contains(concat(' ', @class, ' '), ' mvMask ')])[1]") {
            var("id", fetch("./@id"))
            match($id, /^$/) {
              attribute("id") {
                value() {
                  set("etrigger")
                  append("8898")
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
                set("addclasstarget63703")
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
                set("addclasstrigger63703")
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
                set("addclasstarget86266")
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
                set("addclasstrigger86266")
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
    
    #Not for home
    #this page has class="homepage"http://www1.moov1.macys.com/campaign/affiliate.jsp
    #Group::ConditionalSelectorGroup
    #[["conditional_selector", ".homepage"], ["negate", "true"]]
    var("element_exists", "false")
    $("(//*[contains(concat(' ', @class, ' '), ' homepage ')])[1]") {
      var("element_exists", "true")
    }
    match($element_exists, "false") {
    
      #bottom search
      #Group::BasicGroup
      #[]
      # No need to wrap the contents at all
        #Duplicate search to bottom
        #Content::Formatting::Duplicate
        #[["duplicate_me", "#globalSubNavBox"], ["after_me", "#doc3"], ["multiple", ""], ["single_target", ""], ["single_source", ""]]
        $("(//*[@id = 'doc3'])[1]|//div[@class = 'lia-page']") {
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
        #[["html", "<div class=\"mvBottomNav\"><span>Site Menu</span><span class=\"mvPlus\"></span><span class=\"mvMinus\"></span></div>"], ["add_after", ""], ["multiple", ""], ["add_before", ".mvMenuWrapper2"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')])[1]") {
          inject_before("<div class=\"mvBottomNav\"><span>Site Menu</span><span class=\"mvPlus\"></span><span class=\"mvMinus\"></span></div>")
        }
        
        
        #Registry only
        #Group::URLMatcherGroup
        #[["url_matcher", "\\/registry\\/"], ["negate", ""]]
        # This is a 'fake' url because it has http when it might mean https
        var("fake_url") {
          set(var("source_host"))
          append(var("path"))
          prepend("http://")
        }
        match($fake_url, /\/registry\//) {
        
          #
          #Content::Formatting::SetInnerText
          #[["selector", ".mvBottomNav > span:first-of-type"], ["text", "Wedding Registry Menu"], ["match_string", ""], ["replace_string", ""], ["prepend", ""], ["append", ""], ["use_query_parameter", ""], ["chain", ""]]
          # NOTE: not sure if /html() or /text() is what I want to be using here
          $("//*[contains(concat(' ', @class, ' '), ' mvBottomNav ')]/span[position() = 1]") {
            inner() {
              set("Wedding Registry Menu")
            }
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
                append("23323")
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
                append("23323")
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
      
    }
    
    
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
          #attribute('src', asset('icons/facebook.png', 'image'))
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
          #attribute('src', asset('icons/twitter.png', 'image'))
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
        #Content::Inject::InjectHTML
        #[["html", "<a target=\"_blank\" class=\"desktop_site\" href=\"http://macys.com/index.ognc?stop_mobi=true\">Macy's Full Site</a>"], ["add_after", ".mvFooterLinks > :nth-child(2)"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//*[contains(concat(' ', @class, ' '), ' mvFooterLinks ')]/*[position() = 2 and self::*])[1]") {
          inject_after("<a target=\"_blank\" class=\"desktop_site\" href=\"http://macys.com/index.ognc?stop_mobi=yes\">Macy's Full Site</a>")
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
      #Content::Inject::InjectHTML
      #[["html", "<div class=\"mvBottomNav\"><span>Shop with Confidence</span><span class=\"mvPlus\"></span><span class=\"mvMinus\"></span></div>"], ["add_after", "#checkoutFooterContent > strong"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
      $("(//*[@id = 'checkoutFooterContent']/strong)[1]") {
        inject_after("<div class=\"mvBottomNav\"><span>Shop with Confidence</span><span class=\"mvPlus\"></span><span class=\"mvMinus\"></span></div>")
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#checkoutFooterContent > strong"]]
      $("//*[@id = 'checkoutFooterContent']/strong") {
        remove()
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
              append("74195")
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
              append("74195")
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
  
  
  #APP
  #Group::CookieMatcherGroup
  #[["cookie_name", "ishop_app"], ["cookie_value_regex", ""], ["no_cookie_counts", ""], ["any", ""]]
  var("run_group", "false")
      # match if the cookie is found
      match($cookie, /ishop_app/) {
        var("run_group", "true")
      }
  match($run_group, "true") {
    #header and footer free
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #
      #Content::Formatting::AddAttribute
      #[["attribute", "class"], ["value", "ishop_app"], ["selector", "body"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
      var("done", "no")
      $("//body") {
        match($done, "no") {
            var("done", "yes")
          attribute("class") {
            value() {
                append(" ishop_app")
            }
          }
        }
      }
      
      
      #
      #Content::Formatting::RemoveElements
      #[["selector", "#globalMastheadContainer, body > #globalSubNavBox, .mvBottomNav, .mvMenuWrapper2, .mvMacysFooter, .mvFooterLinks, .moovweb_footer"]]
      $("//*[@id = 'globalMastheadContainer']") {
        remove()
      }
      $("//body/*[@id = 'globalSubNavBox']") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvBottomNav ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper2 ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvMacysFooter ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' mvFooterLinks ')]") {
        remove()
      }
      $("//*[contains(concat(' ', @class, ' '), ' moovweb_footer ')]") {
        remove()
      }
      
      
    # end BasicGroup
    
    #Parameter for back btns
    #Group::BasicGroup
    #[]
    # No need to wrap the contents at all
      #Categories
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Categories\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"Categories\">")
        }
        
        
      }
      
      #Products
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/catalog\\/product"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/catalog\/product/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Products\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"Products\">")
        }
        
        
      }
      
      #Shopping Bag
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/bag\\/index\\.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/bag\/index\.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"ShoppingBag\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"ShoppingBag\">")
        }
        
        
      }
      
      #Products for bag
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/bag\\/addto\\.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/bag\/addto\.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Products\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"Products\">")
        }
        
        
      }
      
      #Sign In
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/signin"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/signin/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"SignIn\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"SignIn\">")
        }
        
        
      }
      
      #My Account
      #Group::URLMatcherGroup
      #[["url_matcher", "/myinfo"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/myinfo/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"MyAccount\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"MyAccount\">")
        }
        
        
      }
      
      #Wedding Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registry\\/wedding"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registry\/wedding/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"WeddingRegistry\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"WeddingRegistry\">")
        }
        
        
      }
      
      #Checkout
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/checkoutswf"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/checkoutswf/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Checkout\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"Checkout\">")
        }
        
        
      }
      
      #Store Locator
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/store\\/index\\.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/store\/index\.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"StoreLocator\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"StoreLocator\">")
        }
        
        
      }
      
      #Store Events
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/store\\/event\\/index\\.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/store\/event\/index\.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"StoreEvents\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"StoreEvents\">")
        }
        
        
      }
      
      #Search
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/search\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/search\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"Search\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"Search\">")
        }
        
        
      }
      
      #Find Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registrysearch"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registrysearch/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"FindRegistry\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"FindRegistry\">")
        }
        
        
      }
      
      #Manage Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/wedding\\/registrymanager"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/wedding\/registrymanager/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"ManageRegistry\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"ManageRegistry\">")
        }
        
        
      }
      
      #Create Registry
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/wedding\\/registrycreateaccount"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/wedding\/registrycreateaccount/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"CreateRegistry\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"CreateRegistry\">")
        }
        
        
      }
      
      #Registry Shop Categories
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop/registry\\/wedding\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/registry\/wedding\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"ShopRegistry\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"ShopRegistry\">")
        }
        
        
      }
      
      #Regsitry Help
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registry\\/wedding\\/registryfaq"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registry\/wedding\/registryfaq/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"RegsitryHelp\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"RegsitryHelp\">")
        }
        
        
      }
      
      #Star Rewards
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/registry\\/wedding\\/registryrsrhome"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/registry\/wedding\/registryrsrhome/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"StarRewards\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"StarRewards\">")
        }
        
        
      }
      
      #Gift Cards
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/shop\\/gifts-gift-cards\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/shop\/gifts-gift-cards\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"GiftCards\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"GiftCards\">")
        }
        
        
      }
      
      #Bill Pay
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/service\\/credit\\/paybill\\/"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/service\/credit\/paybill\//) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"BillPay\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"BillPay\">")
        }
        
        
      }
      
      #My Orders
      #Group::URLMatcherGroup
      #[["url_matcher", "\\/service\\/order\\/index\\.ognc"], ["negate", ""]]
      # This is a 'fake' url because it has http when it might mean https
      var("fake_url") {
        set(var("source_host"))
        append(var("path"))
        prepend("http://")
      }
      match($fake_url, /\/service\/order\/index\.ognc/) {
      
        #
        #Content::Inject::InjectHTML
        #[["html", "<meta ishop_app_back=\"MyOrders\">"], ["add_after", "head > :first-child"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
        $("(//head/*[position() = 1 and self::*])[1]") {
          inject_after("<meta ishop_app_back=\"MyOrders\">")
        }
        
        
      }
      
    # end BasicGroup
    
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
  
  
  #back in a few page
  #Group::ConditionalSelectorGroup
  #[["conditional_selector", "#thisContentContainer"], ["negate", ""]]
  $("(//*[@id = 'thisContentContainer'])[1]") {
  
    #
    #Content::Formatting::RemoveElements
    #[["selector", "#thisContentContainer #footerContent"]]
    $("//*[@id = 'thisContentContainer']//*[@id = 'footerContent']") {
      remove()
    }
    
    
  }
  
  
  #for no result page
  #Content::Formatting::AddAttribute
  #[["attribute", "class"], ["value", "mvRedBtn"], ["selector", "#catalogNotFoundContainer .continueBtn"], ["append_dont_overwrite", "true"], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
  var("done", "no")
  $("//*[@id = 'catalogNotFoundContainer']//*[contains(concat(' ', @class, ' '), ' continueBtn ')]") {
    match($done, "no") {
        var("done", "yes")
      attribute("class") {
        value() {
            append(" mvRedBtn")
        }
      }
    }
  }
  
  
  #BLACKBERRY
  #blackberry only
  #os=blackberry

  # matching blackberry os 4.6-5.x
  match($blackberry, "true") {

  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "style"], ["value", "top:11px;"], ["selector", "#globalMastheadMiniCart"], ["append_dont_overwrite", ""], ["multiple", ""], ["to_parent", ""], ["conditional_selector", ""], ["conditional_selector_is_relative", ""], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[@id = 'globalMastheadMiniCart']") {
      match($done, "no") {
          var("done", "yes")
        attribute("style") {
          value() {
              set("top:11px;")
          }
        }
      }
    }
    
  } # ending blackberry os 4.6-5.x block
    
  # end BasicGroup
  
  #spinners
  #Group::BasicGroup
  #[]
  # No need to wrap the contents at all
    #
    #Content::Inject::InjectHTML
    #[["html", "<div class=\"mvHideSpinner\"><a class=\"mvBarSpinner1 \"  style=\"width:10px; height:10px;\"></a><a class=\"mvBarSpinner2\"  style=\"width:10px; height:10px;\"></a></div>"], ["add_after", "body > div:first-of-type"], ["multiple", ""], ["add_before", "body > div:first-of-type"], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
    $("(//body/div[position() = 1])[1]") {
      inject_before("<div class=\"mvHideSpinner\"><a class=\"mvBarSpinner1 \"  style=\"width:10px; height:10px;\"></a><a class=\"mvBarSpinner2\"  style=\"width:10px; height:10px;\"></a></div>")
    }
    
    
    #
    #Content::Javascript::AddInlineScriptTag
    #[["script", "window.addEventListener(\"load\", function() { \tvar b = document.querySelectorAll(\".mvLinkBars a\"); \tvar i = b.length - 1; \tdo { \t\tb[i].addEventListener(\"click\", function(e) { \t\t\tvar c = document.querySelectorAll(\".mvBarSpinner\"); \t\t\tremove_class(c[0], \"mvBarSpinner\"); \t\t\tadd_class(e.target, \"mvBarSpinner\"); \t\t}, false); \t} while(i--); }, false);"], ["add_after", ""], ["add_before", ""]]
      $("html/body") {
        insert_bottom("script") {
          attribute("language", "javascript")
          inner("window.addEventListener(\"load\", function() { 	var b = document.querySelectorAll(\".mvLinkBars a\"); 	var i = b.length - 1; 	do { 		b[i].addEventListener(\"click\", function(e) { 			var c = document.querySelectorAll(\".mvBarSpinner\"); 			remove_class(c[0], \"mvBarSpinner\"); 			add_class(e.target, \"mvBarSpinner\"); 		}, false); 	} while(i--); }, false);")
        }
      }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkBars"], ["selector", ".mvWhiteGrayBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvWhiteGrayBar ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvLinkBars")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkBars"], ["selector", ".mvWhiteBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvWhiteBar ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvLinkBars")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddAttribute
    #[["attribute", "class"], ["value", "mvLinkBars"], ["selector", ".mvDarkGrayBar"], ["append_dont_overwrite", "true"], ["multiple", "true"], ["to_parent", ""], ["conditional_selector", "a"], ["conditional_selector_is_relative", "true"], ["use_value_from_parameter", ""], ["use_value_from_chain", ""]]
    var("done", "no")
    $("//*[contains(concat(' ', @class, ' '), ' mvDarkGrayBar ')]") {
      match($done, "no") {
          var("conditional", "false")
            $(".//a") {
              var("conditional", "true")
            }
          match($conditional, "true") {
        attribute("class") {
          value() {
              append(" mvLinkBars")
          }
        }
          }
      }
    }
    
    
    #
    #Content::Formatting::AddFileAttribute
    #[["attribute", "src"], ["value", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/4.gif"], ["selector", ".mvSpinnerPreload"]]
    # NOTE: just sets the attribute - doesn't do anything special for files
    $("//*[contains(concat(' ', @class, ' '), ' mvSpinnerPreload ')]") {
      #attribute("src", "https://moovweb-gage.s3.amazonaws.com/yupu/macy2/macysBtns/4.gif")
      attribute('src', asset('other/loading4.gif', 'image'))
    }
    
    
  # end BasicGroup

  # adding the sprite classes
  $("html/body//a[@class='globalMiniCartItems']") {
    add_class("sprite_me-bag")
  }
  $("html/body//div[@class='mvLogo']") {
    add_class("sprite_me-logo")
  }
  $("html/body//div[contains(@class,'mvDarkGrayBar')]/a") {
    add_class("sprite_me-arrow_right_white")
  }
  
}
