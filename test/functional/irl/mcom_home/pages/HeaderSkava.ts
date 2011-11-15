
# ----- RawHTMLBlocks ----

 # ----- ParsedHTMLBlocks ----
 html() {
   $('html') {
     $("head"){
         #Content::CSS::RemoveCSS
         $(".//style") {
           remove()
         }
         $(".//link[@rel = 'stylesheet']") {
           remove()
         }
       
       
    }
    $("body"){
      attribute("id", "mvBody")
      $("div[@id='doc3']"){
         $("div[@id='hd']"){
            $(".//li[@class='mBlogImageLink']"){
              remove()
            }
             $(".//div[@class='quickbagMasthead']"){
                 inject_top("<a id='mwCartItem' href='/bag/index.ognc'></a>")
               }
               $(".//div[@id='quickBag_c']"){
                 remove()
               }
             $(".//div[@id='quickBagHeader']"){
                                attribute("style","display:none;")
                                 $("span"){
                                   remove()
                                 }
                                 $("img"){
                                   remove()
                                 }

                               }
          }
        $("div[@class='skip']|div[@id='bd']"){
          remove()
        }
        $(".//div[@id='globalMastheadPool']|.//div[@id='globalMastheadSocialLinks']"){
          remove()
        }
      }
    }
     #Content::Passthrough::Link
      $(".//a") {
        match(fetch("@href")) {
          # V1 exclusion regex
          with (/(\/service\/contactus\/index\.jsp)|(\/service\/credit\/applynow\/creditapp\.ognc)|(\/service\/shipping\/index\.jsp)|(\/service\/contact\/index\.ognc)|(twitter\.com)|(facebook\.com)|(ups\.com)|(\/store\/catalog\/)|(instoresales\.ognc)|(\/store\/service\/)|(\/store\/corporate\/)|(campaign_id)|(\/dyn_img\/pdf\/09F461_C2_Transaction_Dispute_Form\.pdf)/) {
            #log("skipping")
          }
          else() {
            attribute("href") {
              value() {
                rewrite("link")
              }
            }
          }
        }
      }
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

       #
       #Content::Formatting::WrapIndividualElements
       #[["selector", ".mvMenuWrapper .mvSubMenu a"], ["tag_name", "div"], ["class_name", "mvWhiteBar"], ["id", ""], ["multiple", "true"]]
       $("//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvSubMenu ')]//a") {
         wrap("div") {
           attribute("class", "mvWhiteBar")
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

       #Remove My account inline style
       #only some pages have inline style on my account tag
       #Content::CSS::RemoveStyles
       #[["selector", ".noTextDecoration"]]
       $("//*[contains(concat(' ', @class, ' '), ' noTextDecoration ')]") {
         attribute("style") {
           remove()
         }
       }


      

       #close general menu
       #Content::Inject::InjectHTML
       #[["html", "<div class=\"mvCloseMenu mvDarkBtn\">close</div>"], ["add_after", ".mvMenuWrapper .mvMore"], ["multiple", ""], ["add_before", ""], ["conditional_selector", ""], ["negate_conditional_selector", ""]]
       $("(//*[contains(concat(' ', @class, ' '), ' mvMenuWrapper ')]//*[contains(concat(' ', @class, ' '), ' mvMore ')])[1]") {
         inject_after("<div class=\"mvCloseMenu mvDarkBtn\">close</div>")
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
       $("(//*[@id = 'globalMastheadMiniCart']/*)[1]") {
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

   

   

   }


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
                   inner("window.addEventListener(\"load\", function() {   var b = document.querySelector(\".mvFooterLinks\");   var c = document.getElementById(\"mvSignin\");   if(b && c) {     c.appendChild(b);   }; var e = document.getElementById('mwCartItem');   var f = document.querySelector('#itemInfo b'); f.innerHTML = f.innerHTML.replace(/(\\(|\\))/g, '');   if(e && f) {   e.appendChild(f); } }, false);")
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
$("html/body"){
  $("div[@id='doc3']/div[@id='ft']"){
    remove()
  }
   # adding the sprite classes
   $(".//a[contains(@class, 'globalMiniCartItems')]") {
     add_class("sprite_me-bag")
   }
   $(".//div[@class='mvLogo']") {
     add_class("sprite_me-logo")
   }
   $("//div[contains(@class,'mvDarkGrayBar')]/a") {
     add_class("sprite_me-arrow_right_white")
   }
 }

 }
