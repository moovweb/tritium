match($path) {
  with(/(basket\-greyedout-hero)|(^\/asda\-estore\/catalog\/trolley\-deliveryslot)|(asda-estore\/checkout\/regularviewtrolleycontainer)|(asda-estore\/checkout\/listviewtrolleycontainer)|(deliveryslotreminderframe)|(checkoutdeliveryslot-trolley)|((myaccount|favourites)\/shoppingbasket)|(linkSaveshoppingbasket)|(specialoffers\/shoppingbasket)\.jsp/) {
    #with @id='basketframe' we are targeting only the trolley pop up
    #we are being specific here since this .ts file is targeting the full trolly view too.
    $("./body[@id='basketframe']") {
      add_class("mw_trolleyFrameBody")

      
#       $("/html/body") {
# #           insert_tag("script" , src: asset("trolley.js", "js"))
# 
#       }
      
      $("./div[@id='mw_mainWrapper']") {
        # a js snippet for the close button, this will trigger the trolley icon on the header everytime its clicked 
        inject_top("<script> document.getElementById('mw_closeBtn').addEventListener('click', function () { var e = parent.document.getElementById('mw_trolley_icon'); dispatchMouseEventOnElement(e,'click'); }); </script>")
        inject_top("<div class='mw_closeBtnCont'><a id='mw_closeBtn' href='#' >X</a></div>")
        
        $("./link") {
#           move_to("/html/head", "top")
          remove()
        }
        
        # Styling the empty Trolley - Starts
        # this scenario applies when you have selected a book slot or have a expired book slot
        $("./div[@id='basketframe']/div[@class='greyedout']/form") {
          $("./div[@class='trolly-empty']") {
            $("../../..") {
              add_class("mw_emptyTrolley")
            }
          }
          
          $("./div[@id='bannerFirst'] | ./div[contains(@id,'a11')]") {
            remove()
          }
        }
        
        # Styling the empty Trolley - Ends

        # removing unnecessary content 
        $("./ul[contains(@class,'accesskeys')] | .//div[@id='listfooter'] | ./div[@id='bannerFirst'] | ./div[contains(@id, 'a11')] | ./form/div[@id='reservepane']/img | .//div[@class='blueBoxMiniTrolley'] | .//div[@class='blueBoxforTrolley'] | .//div[@class='redBoxforTrolley'] | ./div[@class='banneradvert'] ") {
          remove()
#           add_class("mw_testing")
        }
        
        # Delivery Details Container 
        $("./form/div[@id='deliveryslot']") {
          $("./img") {
            remove()
          }
          # Setting up a variable to for the delivery cost to later on inject it back at the bottom of the page
          $("./p/span[contains(text(),'Cost:')]/following-sibling::span") {
            copy_to("/html/body/div/div/div[contains(@class, 'content')]", "top") {
              add_class("mw_deliveryCost")
              attribute("style", "")
            }
          }
#           var("deliveryCost", fetch("./p/span[contains(text(),'Cost:')]/following-sibling::span")) 
#           log($deliveryCost)

          $("./div[@class='soltDetailsyds']") {
            move_to("..", "bottom")
          }
          $("./p/span | ./h3") {
            attribute("style", "")
          }
        }
        
        # Styling the the blue container and the product list
        $("./div[@id='basket']") {
          # The Total and buttons are being styled here.
          $("./div[@class='content']") {
            
            $("./div[@class='total']") {
              attribute("id", "mw_bottomContainer")

              $("..") {
                $("./span[contains(@class,'mw_deliveryCost')]") {
                  wrap("div", class: "mw_deliverCost") {
                    insert_bottom("span", "Delivery Cost:", class: "mw_deliveryCostLabel")
                  }
                }
                
                add_class("mw_contentTotal")
                $("./button") {
                  move_to("../div[@class='total']", "after")
                }
                
                $("./div[@id='trolleyoptions']") {
                  inject_top("<a href='/asda-estore/home/homecontainer.jsp' class='mw_continueShopping' target='_parent'>Continue Shopping</a>")
                }
              }
            }
          }
          
          $("./div[@class='content' and position() = 1]") {
            inner_wrap("div", class: "mw_TrolleyWrapper") {
              $("./h3") {
                remove()
              }
              insert_bottom("div", class: "mw_trolleyLeft") {
                move_here("../h4 | ../form[2]/h4 | ../form/h4")
              }
              $("./form[1]") {
                wrap("div", class: "mw_trolleyRight") {
                  move_here("../button | ../form | ../form/p")
                }
              }
              $("./a[contains(@class, 'fulltrolleylink')]") {
                move_to("../../../div[@class='content']", "after")
              }
            }
          }
    
          $("./div[@id='listitems']") {
            
            $("./table") {
              name("div")
              add_class("mw_producListWrapper tw_table")
          
              # Table Head
              $("./thead") {
                remove()
              }
              
              # Table Body
              $("./tbody") {
                name("div")
                add_class("mw_producList mw_tbody")
                $("./tr") {
                  name("span")
                  add_class("mw_tableRow")
                  $("./td[not (@*)]") {
                    remove()
                  }
                  $("./td[1]") {
                    wrap("div", class: "mw_itemAmountWrap") {
                      move_here("../td[position()=1]", "bottom")
                      move_here("../td[position()=1]", "bottom") {
                      }

                      $(".//input[contains(@class, 'plus')]") {
                        add_class("icons-plus")
                        attribute("onclick","parent.document.getElementById('mw_spinner2').className='';document.getElementById('mw_mainWrapper').className+=' mw_loading'; document.body.className+=' mw_turn_to_white';")

                      }
                      $(".//input[contains(@class, 'minus')]") {
                        add_class("icons-minus")
                        attribute("onclick","parent.document.getElementById('mw_spinner2').className='';document.getElementById('mw_mainWrapper').className+=' mw_loading'; document.body.className+=' mw_turn_to_white';")

                      }
                      $(".//input[contains(@class, 'Disabled')]") {
                        attribute("disabled", "disabled")
                        add_class("mw_buttonDisabled")
                      }
                    }
                  }
                  $("./td") {
                    # gets inside the td and sets the text as variable
                    var("mwPrice") {
                      set(fetch("./text()"))
                    }
                    # If the variable have any digits in it (price) set a class to the current node
                    match($mwPrice, /\d/) {
                      add_class("mw_price")
                    }

                    $("./form/input[@title='Delete this product']") {
                      $("../..") {
                        add_class("mw_removeIcon")
                      }
                    }
                    name("div")
                    add_class("mw_td")
#                     wrap("div", class:"blah")
                  }
                  
                  # Moving the remove icon to the top for better styling purposes
                  $("./div[contains(@class, 'mw_removeIcon')]") {
                    move_to("../.", "top")
                    $("./form/input[@name='li-delete']") {
                      # attribute("src", asset("trashIcon.png", "image"))
                      attribute("type","submit")
                      attribute("value"," ")
                      attribute("src","")
                      add_class("icons-trash")
                      attribute("border","0")
                    }
                  }
                  
                  $("./div[contains(@class, 'li-name')]") {
                    inner() {
                      replace("<br>", "<div class='mw_extraInfo'>")
                      replace("</div>", "</div></div>")
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    # Styling the full trolley view here
    # adding a class to the body after finding the unique id which is only inside the full trolley page
    match($path){
      with(/(asda-estore\/checkout\/regularviewtrolleycontainer)|(asda-estore\/checkout\/listviewtrolleycontainer)\.jsp/){
        $("/html/body") {
          add_class("mw_fullTrolley mw_late_load_active")
#           attribute("style","width: 320px; border: 1px solid blue;")
          
          # Removing the Search Bar in the Header
          $("./div[@id='mw_header']") {
            attribute("style","height: 60px;")
            
            $("./div[@id='mw_global_search']") {
              remove()
            }
          }
          $("./div[@id='mw_mainWrapper']") {
            $("./link") {
              remove()
            }
            $("./script | ./title | ./meta") {
              move_to("/html/head", "top")
            }
            $("./ul[contains(@class,'accesskeys')] | ./div[@id='footer'] | ./div[@id='header'] | .//div[@class='promoPanel']") {
              remove()
            }
            
            # I am assuming any element that have blue box in their 
            # class is an extra div that we need to remove.
            # mostly true on a QA environment
            $(".//div[contains(@class,'blueBox')]") {
              remove()
            }
            
            $(".//div[@class='basketWrapper']") {
              $("./form/div[@id='deliveryslot'] | ./form/div[@id='reservepane']") {
                $("./img") {
                  remove()
                }
                $("./div[@class='soltDetailsyds']") {
                  move_to("..", "bottom")
                }
                $("./p/span | ./h3") {
                  attribute("style", "")
                }
              }
              move_to("../../div", "top")
            }
            
            $(".//div[@id='trolley']") {
              # Removing the Show As List/Shelf options
              $("./form") {
                remove()
              }
              
              # Removing the You Might Like Section in Shelf View
              $("./div[contains(@class, 'productsdisplay')]") {
                $("./form[@name='frm_youmightlike']") {
                  $("..") {
                    remove()
                  }
                }
              }
              
              # Removing the You Might Like Section in List View
              $("./div[@id='youmightSection']") {
    #             add_class("mw_testing")
                remove()
              }
    
              # Styling the top header of the trolley - Price & Items in cart
              $("./div[@class='paddingside10']") {
                $("./div[@id='infopanel']") {
                  add_class("mw_priceHeader")
                  move_to("..", "before")
                  # adding the content that is suppose to be on the right
                  # in one container and aligning that to the left
                  insert_bottom("div") {
                    add_class("mw_rightAlign")
                    move_here("../p[@class='minorder']", "top")
                    move_here("../div[@class='guidanceNote']", "top") {
                        # Moving the disclaimer to the bottom of the page
                      $("./span") {
                        move_to("/html/body//div[@id='trolley']", "after")
                        add_class("mw_disclaimer")
                      }
                    }
                  }
                  # This p (amount of items in the trolley) tag was on top moving it 
                  # to the bottom to accomodate the mockup
                  move_here("./p[1]", "bottom") {
                    add_class("icons-trolley_black")
                    wrap("div", class: "mw_item_amount")
                  }
                  
                  $("./div[@id='sbasket']") {
                    $("./div[@class='total']/span[@class='trllyDtls']") {
                      text() {
                        set("Total")
                      }
                    }
                    inject_bottom("<a href='/asda-estore/home/homecontainer.jsp' class='mw_continueShopping'>Continue Shopping</a>")
                  }
                }
                remove()
              }
              

             #=-=-=-=-=-=-=-=-=-=-=- PRODUCT MODULE -=-=-=-=-=-=-=-=-=-=_#
              
              # Product Module for both Shelf view and List View
              $("./div[contains(@class,'productsdisplay')]") {
                add_class("mw_trolley_product_module")
                
              } # Ending Product Module for both Shelf view and List View
              
              
              #****************** ONLY SHELF ******************#
              
              # Product Module only for Shelf View
              $("./div[contains(@class,'productsdisplay') and not(contains(@class,'list'))]") {
                add_class("mw_trolley_product_shelf_view")
                
                $("./div[@class='shelf']") {
                  # Structing the .item inside the shelf
                  $("./div[contains(@class, 'item')]") {
                    attribute("style","")
                    
                    
                    $("./div[contains(@class, 'productNA')]/..") {
                      add_class("mw_product_not_available")
                      $("..//div[@class='itemimage']") {
                        attribute("class","mw_image")
                      }
                      $(".//li[contains(@class,'notes')]") {
                        inner(){
                          set("Product Unavailable")
                        }
                      }
                    }
                    
                    $("./h4[@class='hideoffscreen'] | ./div[@class='itemimage']") {
                      remove()
#                       add_class("mw_testing")
                    }
                    

                    $("./div[contains(@class,'itemcontent')]") {
                      attribute("style","")
                      
                      # Grabbing the title of the Brand and Product names and replace the inner text
                      # text with it, since the inner text have ellipses instead of the full text
                      $("./ul/li[@class='brand']") {
                        $("./a") {
                          var("fullbrand",fetch("./@title"))
                          # log($fullbrand)
                          inner() {
                            set($fullbrand)
                          }
                        }
                      }
                      
                      $("./ul/li[@class='productname']") {
                        $("./a") {
                          var("fullname",fetch("./@title"))
                          # log($fullname)
                          inner() {
                            set($fullname)
                          }
                        }
                      }
                      
                      # Moving the price to the bottom
                      $("./ul/li[@class='price' or @class='priceper']") {
                        move_to("..", "bottom")
                      }
                      # Hiding the MultiSave link 
                      $("./ul/li[@class='info']") {
                        add_class("mw_hide")
                      }
                      $("./div[@align='center']") {
                        add_class("mw_trolley_qty")
                        move_to("../..", "top")
                        
                        $("./table") {
                          name("div")
                          add_class("mw_table")
                          $("./tr") {
                            name("span")
                            add_class("mw_tr")
                            $(".//input[@name='li-minus'] | .//input[@name='li-plus']") {
                              attribute("onclick","parent.document.getElementById('mw_spinner2').className='';document.getElementById('mw_mainWrapper').className+=' mw_loading'; document.body.className+=' mw_turn_to_white';")                            
                            }   
                            $("./td[3]") {
                              name("div")
                              add_class("mw_quantity_amount")
                              # add a br to separate the weight
                              inner() {
                                replace(/kg/,"<span class='mw_kg'>kg</span>")
                              }
                            }
                            $("./td") {
                              remove()
                            }
                          }
                        } # Ending Table
      
                      }
                      
                      $("./form[contains(@name, 'DEL')]") {
                        add_class("mw_trolley_remove icons-trash")
                        move_to("../..", "bottom")
                      }
                    } # Ending .itemcontent
                    
                  } # Ending .item
                } # Ending .shelf
              } # Ending .productsdisplay
              
              
              #****************** ONLY LIST ******************#
              
              # Product Module only for List View
              $("./div[contains(@class,'productsdisplay') and contains(@class,'list')]") {
                add_class("mw_trolley_product_list_view")
                $("./span[@class='dropbelow'] | ./div[@class='dropbelow'] | ./br") {
                  remove()
                }
                
                
                $("./div[contains(@class, 'item')]") {
                  attribute("style","")
                  
                  $("./div[@class='itemimage']") {
                    remove()
                  }
      
                  $("./div[contains(@class,'itemcontent')]") {
                    $("./ul") {
                      move_here("..//ul[@class='flist']/li[contains(@class,'price') or contains (@class, 'notes')]", "bottom")
                      $(".//div[@class='listofferholder'] | ./li[@class='notes']") {
                        add_class("mw_hide")
                      }
                      $("./li[@class='productname']") {
                        inner(){
                          replace(/\<\/a\>.*?\<span/ , "</a><span")
                        }
                      }
                    }
                    
                    
                  } # Ending .itemcontent
                  move_here(".//div[@class='plusAndMinus']/div[contains(@class,'fieldsetlist')][1]", "top") {
                    add_class("mw_trolley_qty")
                    
                    
                    $(".//table") {
                      name("div")
                      add_class("mw_table")
                      $("./tr") {
                        name("span")
                        add_class("mw_tr")
                        $("./td") {
                          $("./div[@class='li-quantityfield']") {
                            $("..") {
                              add_class("mw_quantity_amount")                          
                            }
                          }
                          add_class("mw_td")
                          name("div")
                          attribute("valign", "")
                          attribute("align", "")
                          attribute("height", "")
        
                          # add a br to separate the weight
                          inner() {
                            replace(/kg/,"<br style='display:block;'>kg")
                          }
                        }
                      }
                    } # Ending Table
                        
                    
                  }
                  move_here(".//div[@class='plusAndMinus']/div[contains(@class,'fieldsetlist')]", "bottom") {
                    add_class("mw_trolley_remove icons-trash")
                  }
                  
                } # Ending .item
                
                
              } # Ending .productsdisplay .mw_product_list_view
      
              #=-=-=-=-=-=-=-=-=-=-=-  Ending PRODUCT MODULE -=-=-=-=-=-=-=-=-=-=_#



#               # Styling Shelf
#               $(".//div[@class='shelf 123']") {
#                 
#                 # display as List View
#                 $("./div[contains(@class,'item')]") {
#                 
#                   add_class("mw_listOptionView")
#                   # Removing unneccesary elements
#                   $("./h4[@class='hideoffscreen']") {
#                     remove()
#                   }
#                   # Removing background-image request for each item
#                   $("./div[@class='itemimage']") {
#                     attribute("style","")
#                   }
#                   attribute("style", "")
#                   $("./div[@class='itemcontent']") {
#                     # wrapping all the content in one div then moving the <ul>
#                     # back out
#                     attribute("style", "")
#                     inner_wrap("div", class: "mw_totalAmount") {
#                       $("./ul") {
#                         $("./li[@class='price']") {
#                           move_to("..","bottom")
#                         }
#                         $("./li[@class='priceper' or @class='volume']") {
#                           remove()
#                         }
#                         $("./li[@class='productname']/a") {
#                           attribute("class","")
#                           $("./span") {
#                             remove()
#                           }
#                         }
#                         move_to("../..", "bottom")
#                       }
#                       $("./form") {
#                         # Spriting for trash icon
#                         $("./a") {
#                           add_class("icons-trash")
#                         }
#                         move_to("../..", "bottom")
#                       }
#                       
#                       $("./div//table") {
#                         name("div")
#                         add_class("mw_table")
#                         $("./tr") {
#                           name("span")
#                           add_class("mw_tr")
#                           $("./td") {
#                             add_class("mw_td")
#                             name("div")
#                             attribute("valign", "")
#                             attribute("align", "")
#                             attribute("height", "")
#                             inner() {
#                               replace(/\s/, "")
#                             }
#                             # add a br to separate the weight
#                             inner() {
#                               replace(/kg/,"<br> kg")
#                             }
#                           }
#                         }
#                       }
#     
#                     }
#                     
#                   }
#                 }
#               } # Closing shelf
#               
#               $(".//div[@class='productsdisplay 123 trolleydisplay list']") {
#               
#                 # display as Shelf View
#                 # Using this xpath looks for divs only with item class and 
#                 # since the list view already have another class this will apply
#                 # only when your on the shelf view
#                 $("./div[@class='item'] | ./div[contains(@class,'inbasket')]") {
#                 # Removing unneccesary elements
#                   add_class("mw_shelfView")
#                   attribute("style", "")
#     
#                   $("./div[@class='itemcontent']") {
#                   
#                     # adding a class to the price container so later on it can 
#                     # moved to the bottom of the product label container
#                     $("./div//ul[@class='flist']") {
#                       $("./li[@class='price']") {
#                         $("..") {
#                           add_class("mw_PriceContainer")
#                         }
#                       }
#                     }
#                     
#                     #add a class tot he item amount container, same story as the Price Container
#                     $("./div//div[contains(@class, 'fieldsetlist')]/div/table") {
#                       $("../..") {
#                         add_class("mw_itemAmountContainer")
#                         $(".//table") {
#                           name("div")
#                           add_class("mw_table")
#                           $("./tr") {
#                             name("span")
#                             add_class("mw_tr")
#                             $("./td") {
#                               add_class("mw_td")
#                               inner(){
#                                 replace(/kg/ , "<br>kg")
#                               }
#                               name("div")
#                               attribute("valign", "")
#                               attribute("align", "")
#                               attribute("height", "")
#                             }
#                           }
#                         }
#                       }
#                     }
#                     
#                     $("./ul") {
#                       $("./li[@class='notes'] | ./li[@class='price'] | ./li[@class='priceper']") {
#                         name("div")
#                         move_to("../../div/form", "before") {
#                         }
#                       }
#                       # Moving in the price container
#                       move_here("../div//ul[contains(@class,'mw_PriceContainer')]", "bottom")
#                     }
#                     
#                     # this does not break the functionalies of (# of items in the cart)
#                     $("./div/div[@class='shelfholder']") {
#                       add_class("mw_AddedToTrolly")
#                       move_to("../../ul", "bottom")
#                     }
#                     
#                     # Moving the item amount container to be in the root 
#                     move_here("./div//div[contains(@class,'mw_itemAmountContainer')]", "top")
#                   }
#                 }
#               } # Closing Product list

              # Bottom part of the trolley
              insert_bottom("div", class: "mw_BottomTrolley") {
                move_here("../div[@class='leftmargin5']", "bottom") {
                  $("./ul") {
                    inject_top("<li><a href='/asda-estore/home/homecontainer.jsp' class='mw_continueShopping'>Continue Shopping</a></li>")
                  }
                }
                move_here("../../span[contains(@class,'mw_disclaimer')]", "top")
                move_here("../div[contains(@class,'specificFunc')]", "top")
                $("./../div/div[@id='sbasket']/div[@class='total']") {
                  $("./span[@class='trllyDtls']") {
                    inner() {
                      append(": ")
                    }
                  }
                }
                copy_here("../div/div[@id='sbasket']/div[@class='total']", "top")
                $("./../../../div[@class='basketWrapper']/form/div[@id='deliveryslot']/p/span[contains(text(),'Cost:')]") {
                  inner() {
                    replace(/Cost\:/, "Delivery cost:")
                  }
                }
                copy_here("./../../../div[@class='basketWrapper']/form/div[@id='deliveryslot']/p/span[contains(text(),'cost:')]/..","top")
                $("./../div//span[@class='totals']") {
                  remove()
                }
              }
              
     
            } # Closing Trolley
    
          } # Closing #mw_mainWrapper
        } # Closing body
      } # Closing $with
    } # Closing match($path)
    
  } # Closing parent $with
  
  
  # Styling the empty cart here
  # for the pop up trolley
  with(/emptytrolleycontainer\.jsp/) {
    $("./body") {
      add_class("mw_emptyTrolley")
      $("./div[@id='mw_mainWrapper']") {
        $("./script | ./title | ./meta | ./link") {
  #         move_to("/html/head", "top")
          remove()
        }
        # insert a tag and pull the main content inside and get rid of the rest
        insert_top("div", class: "mw_emptyTrolleyWrap") {
          move_here("../div[@class='noframes-content']") {
          }
        }
        # Removing all the addtional content from the body
        $("./div[@id='footer' or @id='header'] | ./ul | ./a | ./h3") {
          remove()
        }
  
      }
    }
  }
}

# Now deprecated
# The following is to figure out where to inject which JS file
# match($path) {
#   with(/checkout\/regularviewtrolleycontainer\.jsp/) {
#     log("!!!! HIT THE FULL TROLLEY")
#     log($path)
    # Read the value in the cart, and set/change the cookie as needed
    # $("./head") {
    #   insert_bottom("script", src: asset("mw_trolley_value_ft.js", "js"))
    # }
  # }
  # with(/(\/home\/basket\-greyedout-hero|emptytrolleycontainer|^(checkout).*basket-greyedout-hero|trolley-deliveryslot|listviewtrolleycontainer\.jsp)|deliveryslotreminderframe\.jsp/) {
  #   log("!!!! HIT THE POPUP TROLLEY")
  #   log($path)
    # Read the value in the cart, and set/change the cookie as needed
    # Bundling this file
    # $("./head") {
    #   insert_bottom("script", src: asset("mw_trolley_value_tf.js", "js"))
    # }
#   }
# }


match($path) {
  # Some styling on the popup trolley inside of the checkout flow
  with(/deliveryslotreminderframe\.jsp/) {
    add_class("mw_bs_trolley_frame")
    # This file is now being bundled
    # $("./body") {
    #   insert_bottom("script", src: asset("mw_get_delivery_time.js", "js"))
    # }
    $("./body//div[@id='deliveryslot']") {
      $("./img") {
        remove()
      }
      $("./p/span|./h3") {
        attribute("style") {
          remove()
        }
      }
    }
  }
  
  
  # Intermediate page after you login.
  with(/intermediatetrolley/){
#    $("/html/body/div[@id='mw_header']") {
#     attribute("style","display:none;")
#    }
    $("/html/body[not( contains(@class,'mw_redirecting'))]") {
      $("./*") {
        add_class("mw_hide")
      }
      $(".//div[@id='mw_spinner']") {
        move_to("/html/body", "top")
        attribute("class","")
        attribute("id","mw_spinner1")
        wrap("div", class:"mw_spinner_container")
      }
      insert_top("div", "Redirecting, please wait...", class:"mw_redirection_message")
    }
  }
  
}

# Regexing in the right parameter to make sure we can hit the accessible version of the page off the bat
$("./body//form") {
  attribute("action") {
    value() {
      replace(/(deliveryslotcontainer.*|deliveryslotgridcontainer.*)/, "\\1&accessible=true") 
    }
  }
}
# Adding in a paramet for the button function to properly reach
# the accessible version of the page
$(".//button") {
  attribute("onclick") {
    value() {
      replace(/(deliveryslotcontainer.*\.jsp|deliveryslotgridcontainer.*\.jsp)/ , "\\1?accessible=true")
    }
  }
}

# Removing the inline styles that are present on the minimum order error popup that was added into the site
$("./body") {
  $(".//div[@id='CheckoutButtonAbovePopup']|.//div[@id='CheckoutButtonBelowPopup']") {
    attribute("style") {
      remove()
    }
  }
}
