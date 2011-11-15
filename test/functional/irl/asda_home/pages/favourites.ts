match($path) {
  with(/favouritelayout.jsp/) {
    $("./body") {
      add_class("mw_favouritesContainer mw_ts_favourites")
    }
  }
  
  with(/favouritescontents.jsp/) {
    $("./body") {
      add_class("mw_favouritesMain mw_ts_favourites mw_late_load_active")
      $("./div[@id='mw_mainWrapper']") {

        $("./div[@id='header'] | .//div[@id='footer'] | ./link | ./ul[contains(@class, 'hideoffscreen')]") {
          remove()
        }
        
        $("./div/div[@id='quickshop-nav-wrapper']") {
          $("..") {
            remove()
          }
        }

        $(".//div[contains(@class,'itemimage')]") {
          attribute("style") { 
            name("data-style") 
          }
        }

        #--------------- STARTING Top content of the page ---------------#
        $("./div[contains(@id,'trolley')]") {
        
          $("./div[@id='favouritesdept'] | .//div[contains(@id, 'dept_container')]") {
            remove()
          }
          
          # Optimization
          $(".//script[contains(@src, 'mediaimages')] | .//link") {
            remove()
          }
          
          $(".//div[@id='RotatingFavourites']") {
            # Removing the links and sliders
            remove()
          }
          
          # wrap the select so we can preserve previous styling
          $("./div[@id='favouritesform']/form/select") {
            wrap("div", class: "mw_selectWrapper")
          }
          
          # Removing the link to the Quist Start Shopping page and
          # add a class to its container p tag
          $(".//a[contains(@href,'tillreceiptcontainer')]") {
            $("..") {
              add_class("mw_favorites_brief")
            }
            name("span")
            attribute("style","")
          }        
        
          insert_top("div", class: "mw_topHeaderWrap") {
            move_here("../h2", "top") {
              attribute("style","")
            }
            move_here("../..//form[@id='frmdisplayctrl']", "bottom") {
              # Using the selecter here I can define which view the items 
              # are sorted and then take proper action once I am in the scope below
#               $(".//a[@class='listActive']") {
#                 $("/html/body/div[@id='mw_mainWrapper']//div[@class='shelf_favbg']/span/div[contains(@class,'item')]") {
#                   add_class("mw_listView")
#                 }
#               }
#               
#               $(".//a[@class='shelfActive']") {
#                 $("/html/body/div[@id='mw_mainWrapper']//div[@class='shelf_favbg']/span/div[contains(@class,'item')]") {
#                   add_class("mw_shelfView")
#                 }
#               }
            }
          }
          
          # Styling the Pervious Order dropdown
          $("./div[@id='favouritesform']") {
            $("./form/select") {
              wrap("div", class: "mw_selectWrapper")
            }
            # Going to remove this form since we are using accordians
            # for the departments and will not need this functionality
            # for mobile
            $("./form[@name='deptDropDown']") {
              remove()
            }
          }

          # Wrapping things up in some sexy accordians
          $("./h3 | ./div/h3") {
            $("./a") {
              remove()
            }
            wrap("div", class: "mw_accordionContainer") {
              attribute("data-ur-set", "favAccordians")
              move_here("./following-sibling::div[1]", "bottom") {
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "disabled")
              }
            }
            attribute("data-ur-toggler-component", "button")
            attribute("data-ur-state", "disabled")
          }
            
          # Having the first accordian open
          $(".//div[@class='mw_accordionContainer'][1]/div | ./div/div[@class='mw_accordionContainer'][1]/h3") {
            attribute("data-ur-state", "enabled")
          }

        } # Ending Trolley
        
        #---------------  ENDING Top content of the page ---------------#
  
        # fix up the product display (into accordions)
#         $("./div[@id='productsDisplay']/h3 | h3") {
#           # first remove loose products
#           $("./../div[contains(@class,'item')]") {
#             move_to("./preceding-sibling::*[1]/span")
#           }
#           # and now create accordions
#           $("./a") {
#             remove()
#           }
#           wrap("div", class: "mw_accordionContainer") {
#             attribute("data-ur-set", "toggler")
#             move_here("./following-sibling::div[1]", "bottom") {
#               attribute("data-ur-toggler-component", "content")
#               attribute("data-ur-state", "disabled")
#             }
#           }
#           attribute("data-ur-toggler-component", "button")
#           attribute("data-ur-state", "disabled")
#           add_class("icons-accordion")
#         }

      
        
        # this block of code will fix Asda's bad markup and put the extra items
        # back into formation with the others
        # 1. Take all the div.items that are wandering outside its original container and wrap them in a temporary container
        # 2. "Moov" the tmp container inside the actual container that contains all div.items
        # 3. (Since this behaviour is specific to the shelf view) Once you open the shelf view scope unwrap the tmp container by moving the -
        # children outside of it - I will place a comment with this code "tmpItemContainerStripped" in the shelf view scope. ( You can search for the keyword and it will take you there )     
        
        $("./div[@id='productsDisplay']") {
          $("./div[@class='item'][1]") {
            insert_before("div", class:"mw_tmpItemContainer"){
              move_here("./following-sibling::div[@class='item']", "top")
              # move_to("./preceding-sibling::div[1]/div[@class='shelf_favbg']/span")
            }
          }
        }
        
        # This is for another scenario accomodating ASDA's bad mark up -
        # This time arround, the only difference is that these div.items are located one 
        # level higher in the dom tree
        
        $("./div[@class='item'][1]") {
          insert_before("div", class:"mw_tmpItemContainer2"){
            move_here("./following-sibling::div[contains(@class,'item')]", "top")
            move_to("./preceding-sibling::div[1]")
          }
        }
        
        
        # another Hack to put the content back together
        $("./h3/a[@class='hidebutton']") {
          $("..") {
            wrap("div", class:"mw_wrapper"){
              move_here("./following-sibling::div[1]", "bottom")
              move_to("../div[contains(@class,'productsdisplay')]", "bottom")
            }
          }
        }
        
        $("./div[@id='productsDisplay']//h3") {
          $("./a") {
            remove()
          }
          add_class("mw_contentHeader")
          log("blah")
        }    


            
#         $(".//div[@class='mw_accordionContainer']") {
#           $("./div[@class='shelf_favbg']/span") {
#           
#           
#           
          
          
        
        #=-=-=-=-=-=-=-=-=-=-=- PRODUCT MODULE -=-=-=-=-=-=-=-=-=-=_#
        
        # Product Module for both Shelf view and List View

        $("./div[contains(@class,'productsdisplay')]") {
          add_class("mw_product_module")
          
          # all the div.shelf are nested inside each other, this will make them sibblings of each other
          # We want to do this in order to structure the accordions properly
          move_here(".//div[@class='shelf']", "bottom")
          
          
          # All the headers are located at the bottom of another .shelf
          # Here I am assiging a class then moving outside "after" its container
          # later I will use this .mw_shelfHeader to wrap it with the accordion wrapper
          
          #$("./div[@class='shelf_favbg']/span") {
            # Structing the .item inside the shelf
            $(".//div[contains(@class, 'item')]") {
              attribute("style","")


              $("./div[@class='itemimage']") {
                attribute("style") { 
                  name("data-style") 
                }
                # This is hacky fix - Search for #6755577 for more info
                $("./a") {
                  attribute("target","_parent")
                  attribute("href") {
                    value() {
                      replace(/products\/products\.jsp/ , "catalog/sectionpagecontainer.jsp")
                    }
                  }
                }
              } # Ending .itemimage
              
              # Styling the the item's image if there is no image available
              $("./div[@class='itemimage' and contains(@data-style,'no-image-available')]") {
                #add_class("icons-ImgNotAvail") 
                attribute("class","icons-ImgNotAvail")
                attribute("data-style","") 
              }
              
              $("./div[@class='itemcontent']") {
                # Go inside fieldset and remove the plus and minus button
                # then replace the KG with a span and put a class to its parent
                $(".//fieldset") {
                  $(".//input[@type='image']") {
                    remove()
                  }
                  $(".//select[@class='unit']") {
                    add_class("mw_hide")
                  }
                  inner() {
                    replace(/kg/, "<span class='mw_kg'>kg</span>")
                  }
                  $(".//span[@class='mw_kg']") {
                    $("..") {
                      add_class("mw_by_kg")
                    }
                  }
                  # Assing the attributes for the proper ios keyboard
                  $(".//input[@class='quantity']") {
                    attribute("type", "number")
                    attribute("onlbur","if (this.value == '') {this.value = '1.0';}")
                    attribute("onfocus","if (this.value == '1.0') {this.value = '';}")
                  }
                  
                }
                # Now look for fieldset again and if doesn't have a KG class then 
                # add qty class to it then go insdie and inject a "qty" span
                $(".//form//fieldset[not(contains(@class,'mw_by_kg'))]"){
                  add_class("mw_by_qty")
                  $(".//input[@class='quantity']") {
                    insert_before("span", "Qty", class:"mw_qty")
                    attribute("pattern", "[0-9]*")
                    attribute("onlbur","if (this.value == '') {this.value = '1];}")
                    attribute("onfocus","if (this.value == '1') {this.value = '';}")
                  }
                }
                                
              } # Ending .itemcontent
            } # Ending .item
         # } # Ending .shelf

          
        } # Ending Product Module for both Shelf view and List View
        
        
        #****************** ONLY SHELF ******************#
        
        # Product Module only for Shelf View
        $("./div[contains(@class,'productsdisplay') and not(contains(@class,'list'))]") {
          add_class("mw_product_shelf_view")
          
          #$("./div[@class='shelf_favbg']/span") {
            $(".//div[contains(@class, 'item')]") {
            
              $("./div[@class='itemcontent']") {
                $("./ul") {
                  insert_top("ul", class:"flist"){
                    move_here("../li[@class='notes'] | ../li[@class='price'] | ../li[@class='priceper']")
                    move_to("../../form/fieldset", "before")
                  }
                  
                  $("./li[@class='info']/span[@class='']") {
                    add_class("mw_hide")
                  }
                  $("./li[@class='brand']/a") {
#                     var("mw_title",fetch("./@title"))
#                     log($mw_title){
#                       prepend("!!!!!!!!!!")
#                     }
                    inner(){
                      set(fetch("./@title"))
                    }
                    attribute("class","mw_brand_name")
                  }
                }
                
                $("./form[@class='dropdownunits']") {
                  $(".//a[@class='removefavourites']") {
                    $("..") {
                      move_to("../../ul", "bottom")
                    }
                  }
                }
                
                # this does not break the functionalies of (# of items in the cart)
                $("./div/div[@class='shelfholder']") {
                  add_class("mw_added_into_trolley icons-trolley_black")
                  move_to("../../ul", "bottom")
                }
              } # Ending .itemcontent
              
            } # Ending .item
          #} # Ending .shelf
          
        } # Ending .productsdisplay
        
        
        #****************** ONLY LIST ******************#
        
        # Product Module only for List View
        $("./div[contains(@class,'productsdisplay') and contains(@class,'list')]") {
          add_class("mw_product_list_view")

            $(".//div[contains(@class, 'item')]") {
              attribute("holy","molly")
              $("./div[@class='itemcontent']") {
                
                # Item Added to trolley - Being moved under products name
                $("./div[@class='formandinfo']") {
                  $("./div[contains(@class,'list_trolley')] | ./div[contains(@class,'list_alert')]") {
                    add_class("mw_added_into_trolley icons-trolley_black")
                    move_to("../../ul", "bottom")
                  }
                }
                
              } # Ending .itemcontent
              
            } # Ending .item
            $(".//div[contains(@class, 'notavailable')]") {
              $(".//div[@class='formandinfo']") {
                move_to("../..", "bottom")
              }
            }

        } # Ending .productsdisplay .mw_product_list_view


        # TODO: Fix this correctly
        # #6755577 This is hacky fix needed because of issues with the back button (https://moov.lighthouseapp.com/projects/75946/tickets/381-back-button-doesnt-work-on-the-desktop-website)
        # Unlike on the desktop site, these product links will NOT just reload the frame; they'll open up a whole new container page
        # this is very hacky fix for the back button

        #=-=-=-=-=-=-=-=-=-=-=-  Ending PRODUCT MODULE -=-=-=-=-=-=-=-=-=-=_#


          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
#             $("./div[contains(@class,'item')]") {
#               # Removing unneccesary elements
#               attribute("style", "")
#               $("./h4[@class='hideoffscreen']") {
#                 add_class("mw_testing2")
# #                 remove()
#               }
#  
#               $("./div[@class='itemcontent']") {
#                 $(".//fieldset") {
#                   # Removing the kg text from some of the products
#                   inner() {
#                     replace(/kg/, "<span class='mw_kg'>kg</span>")
#                   }
#                   
#                   $("./input[@class='quantity']") {
#                     attribute("pattern", "[0-9]*")
#                   }
#                 }
#                 # Changing anchor contents to full titles rather than shortened text
#                 $("./ul/li/a[@title]") {
#                   inner() {
#                     set(fetch("./@title"))
#                   }
#                 }
#               }
#               
#               $("./div[@class='itemimage' and contains(@data-style,'no-image-available')]") {
#                 add_class("mw_noImageAvailable")  
#               }
#             }
            
#             $("./div[contains(@class, 'mw_listView')]") {
#               $("./div[@class='itemcontent']/div[@class='formandinfo']/div[@class='list_trolley']") {
#                 move_to("../../ul", "bottom")
#                 add_class("mw_addedToTrolley")
#               }
#             }
            
                        
            # this is where we strip the tmp container, to know what I mean by tmp container
            # search for keyword:"tmpItemContainerStripped"
#             $("./div[contains(@class, 'mw_shelfView')][1]") {
#               $("..") {
#                 $("./div[@class='mw_tmpItemContainer']/div[@class='item']") {
#                   add_class("mw_shelfView")
#                   move_to("../..", "bottom")
#                 }
#                 # moving in here is the second scenario bad mark up scenario 
#                 move_here("/html/body/div/div[@class='mw_tmpItemContainer2']/div[contains(@class,'item')]", "bottom") {
#                   add_class("mw_shelfView")
#                   
#                   # Repeating some of the code here, since I am taking this items with no past modification
#                   $("./div[@class='itemcontent']") {
#                     $(".//fieldset") {
#                       # Removing the kg text from some of the products
#                       inner() {
#                         replace(/kg/, "<span class='mw_kg'>kg</span>")
#                       }
#                       
#                       $("./input[@class='quantity']") {
#                         attribute("pattern", "[0-9]*")
#                       }
#                     }
#                     # Changing anchor contents to full titles rather than shortened text
#                     $("./ul/li/a[@title]") {
#                       inner() {
#                         set(fetch("./@title"))
#                       }
#                     }
#                   }
#                 
#                 }
#               }
#             }
            
            # Shelf view specific Styling here
#             $("./div[contains(@class, 'mw_shelfView')]") {
#               $("./div[@class='itemcontent']") {
#                 $("./ul") {
#                   move_here("../div[@class='shelfholder']", "bottom") {
#                     add_class("mw_addedToTrolley")
#                   }
#     
#                   $("./li[contains(@class,'price')]") {
#                     move_to("../../form", "top")
#                   }
# 
#                   $("./li[@class='info']/span/a") {
#                     $("..") {
#                       add_class("mw_dont_remove")
#                     }
#                   }
#                   $("./li[@class='info']/span[not(contains(@class, 'mw_dont_remove'))]") {
#                     remove()
#                   }
# 
#                 }
#                 
#                 $("./form") {
#                   insert_top("ul", class:"flist"){
#                     move_here("../li", "top")
#                   }
#                   $("./fieldset/a[@class='removefavourites']") {
#                     $("..") {
#                       move_to("../../ul", "bottom")
#                     }
#                   }
#                 }
#               } # Ending Item Content
#             } # Ending mw_shelfView
            
            
            
            # Here I am adding all the information regarding the product module 
            # If its KG or QTY
            # and how should the input fields behave
#             $("./div[contains(@class, 'mw_listView')]/div[@class='itemcontent']//span[@class='mw_kg']") {
#               $("../../../../../../..") {
#                 add_class("mw_by_kg")
#                 $(".//input[@class='quantity']") {
#                   attribute("pattern", "")
#                   attribute("type","number")
#                   attribute("onlbur","if (this.value == '') {this.value = '1.0';}")
#                   attribute("onfocus","if (this.value == '1.0') {this.value = '';}")
#                 }
#               }
#             }
#             $("./div[contains(@class, 'mw_shelfView') or contains(@class, 'inbasket')]/div[@class='itemcontent']//span[@class='mw_kg']") {
#               $("../../../..") {
#                 add_class("mw_by_kg")
#                 $(".//input[@class='quantity']") {
#                   attribute("pattern", "")
#                   attribute("onlbur","if (this.value == '') {this.value = '1.0';}")
#                   attribute("onfocus","if (this.value == '1.0') {this.value = '';}")
#                 }
#               }
#             }
#             $("./div[contains(@class, 'item') and not(contains(@class, 'mw_by_kg'))]") {
#               add_class("mw_by_qty")
#             #/div[@class='itemcontent']//span[@class='mw_kg']
#               $(".//input[@class='quantity']") {
#                 attribute("onlbur","if (this.value == '') {this.value = '1';}")
#                 attribute("onfocus","if (this.value == '1') {this.value = '';}")
#                 inject_before("<span class='mw_qty'>Qty</span>")
#                 
#               }
#             }
            
            
            
            
            
  
 #         } # Ending shelf_favbg
 #       } # Ending mw_accordionContainer
        
        # MARK
        
        
        
        
        
        
        
        
        #---------- STARTING PAGINATION -------------#
        
        
        # Styling the Pagination
        # There are two Pagination one on top and the other in the bottom of the page
        # Lets hide the div that contains the first one and style second one and move it to the 
        # bottom of the page - We are hiding it since we want it to be around because we indentifying if the page
        # in a shelf view or list view
        $("./div[@class='leftmargin10']") {
          $("./div[contains(@class,'pagcont')]") {
            add_class("mw_hide")
            $("./div[@class='pagenationLeft']") {
              remove()
            }
          }
        }
              
        $(".//div[contains(@class,'pagcont')]") {
          add_class("mw_pagination")
          
          $(".//div[contains(@class,'pagenationLeft')]") {
            inner(){
              replace(/products/ , "")
            }
            move_to("../../../..", "bottom")
            copy_to("/html/body/div//div[@class='mw_shelves']", "after") {
              add_class("mw_topResultsAmount")
            }
          }
          
          $(".//div[contains(@class,'pagenationMiddle')]") {
            move_to("../../../..", "top")
            $(".//a") {
              attribute("onclick","parent.document.getElementById('mw_spinner').className='';document.getElementById('mw_mainWrapper').className+=' mw_loading';")
              attribute("href") {
                value(){
                  append("&maxItemsToBeShown=15")
                }
              } 
            }
          }
          $("./table") {
            remove()
          }
          move_to("/html/body/div[@id='mw_mainWrapper']", "bottom")
        } # Ending Pagination

        #---------- ENDING PAGINATION -------------#
        
        
        $(".//button[contains(@onclick,'tillreceiptcontainer')]") {
          remove()
        }
        $(".//div[contains(@class, 'btnNavSpacin')]") {
          inner_wrap("div") {
            remove()
          }
          attribute("style","overflow: hidden;")
          insert_top("a", "Start Shopping", class:"mw_start_shopping", href:"/asda-estore/home/homecontainer.jsp", target:"_parent")
        }
        
         
      } # Ending Main Wrapper     
    }
  }
}
