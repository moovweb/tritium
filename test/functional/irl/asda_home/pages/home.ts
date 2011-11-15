# This gets matched when the user is SIGNED-OUT/no frames (state 1)
match($path) {
  with(/(index|homecontainer)\.jsp/) { 

    # When the user visits the page for the first time without loggin in or any user cookies the page is constructed without using the frames
    $("./body[contains(@class, 'mw_containers')]/div[@id='mw_mainWrapper']") {
      add_class("mw_homePageNoFrames mw_ts_home mw_late_load_active")
      # Since the style tags are being imported in the body, we have to seperatly delete the styles for this page
      $("./style | ./link") {
        remove()
      }

      # Remove faceted searchs (wat)
      $("./div[@id='facetedSearchs']") {
        remove()
      }

  #     $("/html/head/link[@media='all']") {
  #       add_class("mw_testing")
  #     }
      # Moving all of the selected elements to the <head> of the page
      $("./script | ./title | ./meta") {
        move_to("/html/head", "bottom")
      }
      # There is more here that needs to be "moo"ved in the <head>
      $("./div[@id='header']") {
        $("./style | ./link") {
          remove()
        }
        $("./script | ./title | ./meta") {
          move_to("/html/head", "bottom")
        }
      }
      # Moving the two top prodcuts out of the container before it gets removed
      # move_here(".//div[@id='groceryhome']/div[@class='homecontent']")
      # above selector doesn't get homeproduct in 11.7 (removed), so we pull individual products
      move_here(".//div[@class='homeproduct']/..") {
        # show only the first 2 items
        $("./div[@class='homeproduct' and position() > 2]") {
          remove()
        }
      }
      
      
      # Removing the Banners from the QA environment       
      # TARUN-QA - This applies only the QA                
      $("./div[contains(@class,'blueBox')]") {
        remove()
      }
      
      # Pulling out the login wrapper from the Header and then deleting it
      $("./div[@id='header']") {
        $("div[@id='hdialog']") {
          move_to("/html/body/div[@id='mw_mainWrapper']", "top")
          # STATE 1: USER NOT LOGGED IN
          $("./div[1]/div[@id='rightcol']") {
            # Changing the text for the header and the forget password to accomadate the mock ups
            $(".//form[@id='signinform']") {
              $("./input[@value='Email Address']") {
                attribute("autocorrect", "off")
                attribute("autocapitalize", "off")
                attribute("type", "email")
              }
              
  
              $("./a") {
                add_class("mw_forgotPasswordLink")
                inner() {
                  set("Forgot password?")
                }
              }
             $("./label[@for='h-signin-input1']") {
                inner() {
                  set("<b>Already Registered?</b> Please sign in")
                }
                
                # Creating containers for the ID and Password's input fields
                # older devices have a wacky support for floating elements
                # specially when it comes to elements being floated but thier sibblings not
                # so to better accomodate those devices I wrapped the floating elements in wrappers
                # and had more of a robust styling for the wrapper
                insert_after("div", id:"mw_password"){
                  move_here("../input[contains(@title, 'password')] | ../a[contains(@class, 'mw_forgotPasswordLink')]")
                }
                
                insert_after("div", id:"mw_email_address"){
                  move_here("../input[@value='Email Address'] | ../button[@id='h-signin-button']")
                }

              }

            }
            # once the changes are done, move the whole login form on top of the register form
            move_to("..", "top")
          }
          
          # RegisterNow wrapper
          $("./div[@class='ie6minwidth']/form[@id='postCodeForm1']") {
            $response = "false"
            $("./div/div[contains(@class,'response')]") {
              $("..") {
                add_class("mw_postalResponse")
              }
              $response = "true"
            }
            wrap("div", id: "mw_registerNow") {
              match($response) {
                with(/false/) {
                  inject_top("<div id='mw_notRegWrap'> <span>Not registered yet?</span> <a id='mw_RegNowBtn' href='#' data-ur-toggler-component='button' data-ur-id='registerNow_toggler' >Register Now</a></div>")
                }
              }
              inject_bottom("<div id='mw_store_locator'><span>Find your nearest store</span> <a target='_parent' id='mw_locator_btn' href='http://storelocator.asda.com/'><span class='icons-locator'>&nbsp;</span>Find a store</a></div>")
            }
            #Adding the attributes for the toggler
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            attribute("data-ur-id", "registerNow_toggler")
            # setup toggler
            $("..") {
              attribute("data-ur-set", "toggler")
              $("./form/div/div[contains(@class,'response')]") {
                # if we have a respond, set toggler to enable
                $("../..") {
                  attribute("data-ur-state") {
                    value("enable")
                  }
                  $("../div[@id='mw_notRegWrap']/a") {
                    attribute("data-ur-state") {
                      value("enable")
                    }
                    add_class("mw_hide")
                  }
                }
                $("../../..") {
                  move_to("..", "top")
                }
              }
            }
            # If there is an error in the responce, have the toggler content
            # to stay open
            $("./div/div/div[@class='errorcontainer']") {
              $("../../..") {
                attribute("data-ur-state") {
                  value("enable")
                }
              }
            }
          }
        }
        remove()
#         add_class("mw_testing")
      } # Ending Header

      $(".//div[@class='homeproduct']/div[@class='item']") {
        $(".//div[@class='itemimage']") {
          attribute("style") { 
            name("data-style") 
          }
        }      
        $("./div[@class='itemcontent']") {
        
          $(".//div[@class='homeFormShort']") {
            add_class("mw_by_qty")
            # Removing the - and + button to remove two addtional request from the homepage
            $(".//input[@name='li-plus' or @name='li-minus']") {
              remove()
            }
            $(".//input[@class = 'quantity']") {
              inject_before("<span class='mw_qty'>Qty</span>")
                attribute("pattern", "[0-9]*")
            }
          }

          $(".//div[@class='homeForm']") {
            # Removing the - and + button to remove two addtional request from the homepage
            $(".//input[@name='li-plus' or @name='li-minus']") {
              remove()
            }
            $(".//input[@class = 'quantity']") {
                attribute("pattern", "")
            }
          }
          

          # Changing anchor contents to full titles rather than shortened text
          $("./ul/li/a[@title]") {
            inner() {
              set(fetch("./@title"))
            }
          }
        }
      }
      
#       OJ TODO - Visit this back once I see a product with KG in the - add proper attribute to the quanity input field too
#       Home page
#       $(".//div[@class='homeproduct']/div[@class='item']/div[@class='itemcontent']") {
#         $("./div/fieldset/span[contains(text(), 'kg')]") {
#           $("..") {
#             add_class("mw_itemBykg")
#           }
#         }
#       }
#       
      $("./div[@id='footer'] | ./div[@class='noframes-content'] | ./ul[contains(@class, 'hideoffscreen')]") {
        remove()
#         add_class("mw_testing")
      }
      # After the code release from ASDA (11.7) the whole structured changed
      # the following code removes all the unnecessary content that was added by the release
      # and keeps the important content
#       $(".") {
#         # There are more items to remove than to style so
#         # all the content will be wrapped with a container and then removed but before removing it 
#         # i will pull out the content that needs to be on the page
#         inner_wrap("div", id:"mw_mainProductContainer") {
#           $("./div[@id='hdialog']") {
#             move_to("..", position = "before")
#           }
#           $("./div[@class='noframes-contentMain']/div[@class='content-main']/div[@class='left']") {
#             add_class("mw_homeProdcutContainer")
#             move_to("../../..", position = "before")
#           }
#           add_class("mw_testing")
#           remove()
#         }
#       }

      # HARI: need to pull out the 'a new password has been sent' infobox
      $(".//div[@class='content-main']/div[contains(@class,'infobox')]") {
        move_to("../../../div[@id='hdialog']","top")
      }
      # HARI: home container (signed out) contains some items and banners we need to remove
      $("./div[@class='noframes-contentMain'] | ./div[contains(@class,'ideasInspir')]") {
#         add_class("mw_testing2")
        $(".//div[@id='mobile_banner']") {
          move_to("/html/body/div[@id='mw_mainWrapper']", "top")
        }
        remove();
      }
    }
    # clearing refresh on home main page
    $("/html/body/div[@id='mw_mainWrapper']//iframe[@name='maincontent']") {
      attribute("onload","")
    }
  }
  
  # USER LOGGED IN
  # When the user logs in or have a user cookie the homepage is constructed with iframes and thats when this comes to play
  $("./body[@class='mw_containerFrame']/div[@id='mw_mainWrapper']") {
    add_class("mw_homePage mw_ts_home")
    $(".//iframe[@title='ASDA Header and main navigation']") {
      add_class("mw_topNavigation")
    }
  }
  
  # Middle Frame with the content
  # This gets matched when it is a KNOWN USER/framed page (signed-in or expired -- states 2/3/4)
  with(/(\/home\-with\-deliverydate|home\-firsttime)\.jsp/) {
    # There is a hidden input in the head which contains the user's state, for specialized content
    # and the genuises from asda decided to put this hidden input in the header tag so the browser
    # moves it to the body since its not symantically correct
    $user_state = fetch("//input[@value]")
    $("/html/body") {
      add_class("mw_homeMain mw_ts_home")

      # MOVING THIS WITHIN THE MATCH BELOW -- ONLY FOR SIGNED IN USERS (NOT EXPIRED)
      # inject_top("<div id='mw_QuickShop'><h2>Quick<span>Shop</span></h2><ul><li><a class='mw_searchBrowse icons-add_reciept' target='_parent' href='/asda-estore/catalog/categorylistingpage.jsp'>Search or browse for items</a></li><li><a class='mw_allFav icons-favourites' target='_parent' href='/asda-estore/favourites/favouritelayout.jsp'>See all your favourite items from previous shops</a></li><li><a class='mw_ShopingList icons-shopping_list' target='_parent' href='/asda-estore/myaccount/yourshoppinglistcontainer.jsp' >Set up your own custom shopping lists</a></li><li><a class='mw_searchList icons-search_shopping ' target='_parent' href='/asda-estore/search/searchbylistcontainer.jsp'>Search by list</a></li><ul></div>")
#       Add Place Holder
#      inject_bottom("<div id='mw_mobileAddPlaceHolder'><span>Mobile Ad Place Holder</span></div>")
      $("./div[@id='mw_mainWrapper']") {
        # need to pull accesskeys out of the wrapper before we remove so content is loaded in properly
        insert_top("div", class:"mw_accesskeys mw_hide") {
          move_here("../ul[contains(@class,'accesskeys')]")
          move_to("../..")
        }
        
        $("./div[@id='profileDetails']") {
          $user_name = fetch("./input[@id='profileFirstName']/@value")
          $user_email = fetch("./input[@id='profileEmail']/@value")
          move_to("../..")
          
        }
        

        match($user_state) {
          # with value='AutoSigned', the user's session has expired but they are remembered (STATE 2)
          with(/AutoSigned/) {
            # This injected code is displayed temporary because of a meta-refresh below
            $("/html/body") {
              log("++ Injecting login_form.html")
              inject_top(read("login_form.html"))
  
            $(".//div[@class='mw_login_wrapper']") {
              $(".//span[@class='mw_name']") {
                inject_top($user_name)
              }
              $(".//input[@id='mw_email_value']") {
                attribute("value") {
                  value(){
                    set($user_email)
                  }
                }
              }
            }

              # inject_top("<div id='exp'><h2 class='welc'>Welcome back!</h2> Your session has expired, redirecting you to sign back in.</div>")

              
              
#               insert_bottom("div", id:"mw_welcome") {
#                 insert_top("div", class:"mw_left_welcome"){
#                   insert("span", id:"mw_welcome_text", "Not Registered Yet?")
#                   insert("a", id:"mw_register", "Register Now")
#                 }
#                 insert_bottom("div", class:"mw_right_welcome"){
#                   insert("a", id:"mw_welcome_signout", href:"/asda-estore/register/signoutcontainer.jsp", target:"_parent", "Find your nearest Store")
#                   insert("a", id:"mw_welcome_locator", href:"http://storelocator.asda.com/", target:"_parent", "Find a store") {
#                     insert_top("span", class:"icons-locator")
#                   }
#                 }
#               }              
                
            }
            # We need to redirect the user to the signincontainer so that we don't have to replicate the signon form (not in this frame).
#             $("/html/head") {
#               insert_bottom("meta") {
#                 attribute("http-equiv","refresh")
#                 attribute("content","0; url=javascript:window.open('/asda-estore/register/signincontainer.jsp','_parent');")
#               }
#             }
          }
          # else, value='Sig4203829382', the user is logged in (STATE 3 & STATE 4)
          else() {
            $("/html/body") {
              inject_top("<div id='mw_QuickShop'><h2>Quick<span>Shop</span></h2><ul><li><a class='mw_searchBrowse icons-add_reciept' target='_parent' href='/asda-estore/catalog/categorylistingpage.jsp'>Search or browse for items</a></li><li><a class='mw_allFav icons-favourites' target='_parent' href='/asda-estore/favourites/favouritelayout.jsp?maxItemsToBeShown=15'>See all your favourite items from previous shops</a></li><li><a class='mw_ShopingList icons-shopping_list' target='_parent' href='/asda-estore/myaccount/yourshoppinglistcontainer.jsp' >Set up your own custom shopping lists</a></li><li><a class='mw_searchList icons-search_shopping ' target='_parent' href='/asda-estore/search/searchbylistcontainer.jsp'>Search by list</a></li><ul></div>")
            }
            insert_top("div", id:"mw_welcome") {
              insert_top("div", class:"mw_left_welcome"){
                insert("span", id:"mw_welcome_text", "Welcome back ") {
                  insert_bottom("span", class:"mw_user_name"){
                    insert_before("br")
                    inject_top($user_name) {
                      inner(){
                        append("!")
                      }
                    }
                  }
                }
                insert("a", id:"mw_searchBrowse", "Start Shopping", href:"/asda-estore/catalog/categorylistingpage.jsp", target:"_parent")
              }
              insert_bottom("div", class:"mw_right_welcome"){
                insert("a", id:"mw_welcome_signout", href:"/asda-estore/register/signoutcontainer.jsp", target:"_parent", "Sign out completely")
                insert("a", id:"mw_welcome_locator", href:"http://storelocator.asda.com/", target:"_parent", "Find a store") {
                  insert_top("span", class:"icons-locator")
                }
              }
              move_to("../..", "top")
            }
            $("./div[@id='groceryhome']/div/div[contains(@class,'infobox')]") {
              inner_wrap("div", class:"mw_order_text") {
                # move the link out
                $("./a") {
                  move_to("../..","top")
                }
                # remove the chevron
                $("./img") {
                  remove()
                }
              }
#               inner() {
#                 prepend("<hr>")
#                 append("<hr>")
#               }
              move_to("../../../../div[@id='mw_welcome']") {
                $("./p") {
                  remove()
                }
              }
            }
          } # Ending
        } # Ending Match

        $(".//div[@id='mobile_banner']") {
          move_to("/html/body", "top")
        }
#         add_class("mw_testing")
        remove()
      }
    }
#     $("/html") {
#       # Removing unnecessary content located sibbling to the body
#       $("./body/following-sibling::div") {
# #         remove()
#         add_class("mw_testing")
#         log($path)
#       }
#     }
#     $("./body") {
#       add_class("mw_homeMain mw_ts_home")
#       
#       $("./div[@id='mw_mainWrapper']") {
#   
#         # Pulling the only wrapper that needs to be in this page then removing everything esle
#         $("./div[@id='groceryhome']/div[@class='colwrapper']/div[contains(@class, 'infobox')]") {
#           move_to("/html/body/div[@id='mw_mainWrapper']", "top")
#           $("./span") {
#             inner() {
#               replace(/\,/, "<br>")
#             }
#           }
#           $("./img") {
#             remove()
#           }
#         }
#         $("./ul[contains(@class,'accesskeys')] | ./div[@id='groceryhome']") {
#           add_class("mw_hideTemoprarly")
# #           remove()
#         }
#         # Removing all the unnecessary contents
# #         $("./div[@id='footer' or @id='header' or @id='groceryhome'] | ./ul | ./a | ./div[@id='topbox']") {
# #           remove()
# #   log("basdba")
# #         }
#   
#         # Add in the container for the quickshop navigation
#         inject_bottom("<div id='mw_QuickShop'><h2>Quick<span>Shop</span></h2><ul><li><a class='mw_searchBrowse' target='_parent' href='/asda-estore/catalog/categorylistingpage.jsp'>Search or browse for items</a></li><li><a class='mw_allFav' target='_parent' onclick='javascript:BannerQuickShop_Lists_HomeRight_SI()' href='/asda-estore/favourites/favouritelayout.jsp'>See all your favourite items from previous shops</a></li><li><a class='mw_ShopingList' target='_parent' href='/asda-estore/myaccount/yourshoppinglistcontainer.jsp'>Set up your own custom shopping lists</a></li><li><a class='mw_searchList' href='/asda-estore/search/searchbylistcontainer.jsp'>Search by list</a></li><ul></div>")
#           # Add Place Holder
#         inject_bottom("<div id='mw_mobileAddPlaceHolder'><span>Mobile Ad Place Holder</span></div>")
#       }
#       # Tarun wanted us to remove this feature since it will not part of the mobile site
#       # its here in the comments just incase clients push back
#       #<li><a class='mw_tillReciept' href='#'>Search By List</a></li>
#     }
  }
  
  with(/(home\-firsttime)\.jsp/) {
    $("./body/div[@id='mw_mainWrapper']") {
  #     remove()
      add_class("mw_testing")
    }
  }
  
  # Alter the login form so that it can pass the tests
  # Some weird JS was interfering with Rotor's ablilty to access elements
  $(".//form[@id='signinform']") {
    $("./input[@id='h-signin-input1']") {
      attribute("value", "")
      attribute("placeholder", "Email Address")
    }
    $("./input[@id='h-signin-input3']") {
      remove()
    }
    $("./input[@id='h-signin-input2']") {
      attribute("style", "")
      attribute("value", "")
      attribute("autocomplete", "off")
      attribute("maxlength", "12")
      attribute("placeholder", "Password / PIN")
    }
  }

}
