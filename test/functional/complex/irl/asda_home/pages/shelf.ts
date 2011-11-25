match($path) {
  # Mapping the containters of the specific flows we will be working on:
  with(/(sectionpagecontainer)|(specialofferscontainer)|(linksavecontainer)|(searchcontainer)|(\/checkout\/haveyouforgottencontainer)\.jsp/) {
    log("--> Inside shelf.ts --> Containter Section")
    $("./body") {
      add_class("mw_categoryPage mw_ts_shelf")
      
      $("./div[@id='mw_mainWrapper']") {
        $("./title | ./meta | ./link") {
          move_to("/html/head", "bottom")
        }
        
        # This is in place to late load the Trolley Frame for optomization purposes
        # Hari should have written this comment initially but he was too busy frolicing around the block
        $("./div/iframe[@title='ASDA shopping basket']") {
          attribute("id","mw_main_frame")
          # late-loading this (trolley) frame
          attribute("late_load",fetch("./@src"))
          attribute("src","")
        }
        
      }
    }
  }

  # Mapping for the Main Frames of all the flows we will be working on:
  with(/(searchlayout)|(emerchandising\_range)|(emerchandizing\_section)|(linksavepage)|(searchlayout)|(\/checkout\/havuforgottenframe)\.jsp/) {
    log("--> Inside shelf.ts --> Main Frame Section")
        
    $("./body") {
      add_class("mw_categoryMainFrame mw_ts_shelf mw_late_load_active")
      $("./div[@id='mw_mainWrapper']") {
      
        # This is only for emerchandizing_section.jps pages (Special Offers)
        # we are pulling everything out of #sectionlanding since the selector for those elements are not going inside 
        # #sectionlanding. you know what I mean.  - its late.. that explanation, is as good as it gets..
        $("./div[@id='sectionlanding']") {
          log("--> indside shelf.ts --> Special Offer Section")
          $("./*") {
            move_to("..", "before")
          }
        }

        # This is only for Special Offer's page
        # same reason as the pervious one
        $("./div[@id='productsnav']") {
          log("--> indside shelf.ts --> emerchandising_range Section")
          # Removing additional pagination
          $("./div[contains(@class,'pagcont')]") {
            remove()
          }
          $("./*") {
            move_to("..", "before")
          }
          
        }
        
        ##### Only to search page
        match($path) {
          with(/searchlayout\.jsp/) {
            $("/html/body") {
              add_class("mw_search_results")
            }
            
            # sort by
            $("./form[@name='search_resultsPerPage']//span[@class='sortResults']") {
              $("./select") {
                wrap("div", class: "mw_showSort") {
                  insert_bottom("div", class:"icons-arrow_down")
                }
              }
            }
            
            # top header information
            $("./form[@id='search_domain']") {
              # first pull out the remaining search terms (as in multiple search)
              $("./div[@id='facetedSearch']/p[contains(@class,'search')]/a[@id='remainingKeyword']") {
                $("../../../../h2[contains(@class,'sifr')]") {
                  inject_bottom("<span>, </span>")
                }
                move_to("../../../../h2[contains(@class,'sifr')]","bottom")
              }
              # remove()
              # Form required for multiple searches, so hide it
              attribute("style","display: none")
              # this section contains the number of results which need to be displayed iff it's 0
              $("./div[@id='facetedSearch']/p[contains(@class,'divider')]") {
                inner() {
                  replace(/^0 results/, '<span class="zero_results">0 results</span>') {
                  }
                  replace(/Also see(.*)/, '')
                }
              }
              $("./div[@id='facetedSearch']/p[contains(@class,'divider')]/span[@class='zero_results']") {
                $("../../..") {
                  attribute("style","swag")
                }
                $("/html/body/div/form[@id='facet_navigation_form']") {
                  attribute("style","display: none")
                }
                $("./../a") {
                  remove()
                }
                $("./../../p[@class='search-crumb']") {
                  remove()
                }
              }
            }
            
            # Pagination
            # Removing additional Pagination for Search Only
            $("./form[@name='search_pagination'][2]"){
              remove()
            } # Ending pagination
            $("./form[@name='search_pagination'][1]") {
              $("./div[contains(@class,'pagcont')]") {
                add_class("mw_pagination")
                $(".//div[@class='pagenationLeft']") {
                  inner(){
                    replace(/products/ , "")
                  }
                  move_to("../../../..", "bottom") 
                  
                  copy_to("/html/body/div/h2", "after") {
                    add_class("mw_topResultsAmount")
                  }
                }
                $(".//div[contains(@class,'pagenationMiddle')]") {
                  move_to("../../../..", "top")
                }
                $("./table") {
                  remove()
                }
              }
              move_to("..", "bottom")
            } 

          } # Ending $with
        } # Ending $path
        # Ending Search Scope
        
        #### Only for Have You forgotton page 
        match($path) {
          with(/(\/checkout\/havuforgottenframe)\.jsp/) {
            $("/html/body") {
              add_class("mw_have_you_forgotten")
            }
            $("./div[@id='RotatingContainer']") {
              remove()
            }
            $("./div[@id='para-ccbuttonSection']") {
              add_class("mw_top_info")
              $("./form") {
                move_to("..")
              }
            }
            # There are some weird differences with the product module here compared to the
            # rest of the site, so here we will try to alter that structure and make it look like 
            # the others so our product module scope later in this file can do its job
            $("./div[contains(@class,'productsdisplay')]") {
              $("./div[contains(@class, 'buttonNav')]") {
                move_to("../..")
              }
              $(".//div[contains(@class, 'item')]") {
                # itemimage is nested inside another itemimage, need take the nested out and 
                # delete the parent
                $("./div[@class='itemimage']") {
                  $("./div[@class='itemimage']") {
                    move_to("../..", "top")
                  }
                  remove()
                } 
                $("./div[@class='itemcontent']") {
                  $("./fieldset") {
                  
                    # Changin the class name so the Product Module won't get confused 
                    $(".//input[@class='quantity' and @type='hidden']") {
                      attribute("class","mw_used_to_be_quantity")
                    }
                    $("./form") {
                      inner() {
                      replace(/kg/, "kg<span class='mw_indicator'></span>")
                      }
                      
                      $(".//span[@class='mw_indicator']") {
                        $("../..") {
                          add_class("mw_by_kg")
                        }
                      }
                    }
                    
#                     wrap("div", class:"mw_wrapper_pmodule")
                    # and extra form containing the childeren that needs to be removed
#                     $("./form/*") {
#                       move_to("../..")
#                     }
                    # additional wrappers to mimick the rest of the site
                    wrap("form", class:"mw_wrapper_pmodule") {
                      wrap("div", class:"mw_wrapper_pmodule")
                    }
                  }
                  # this does not break the functionalies of (# of items in the cart)
                  $("./div[@class='shelfholder']") {
                    add_class("mw_added_into_trolley icons-trolley_black")
                    move_to("../ul", "bottom")
                  }
                } # Ending .itemcontent
              } # Ending .item             
            } # Ending .productdisplay
            
          }
        }
        
        #### Only for special offer's page
        match($path){
          with(/\/asda-estore\/specialoffers\/linksavepage\.jsp/) {
           $("/html/body") {
              add_class("mw_special_offers")  
            }
          }
        }
        

        # Styling the Bread Crumb
        # Remove all the other links except the last one that shows which page your on
        $(".//div[@id='breadcrumb'] ") {
          $("./ul/li[not(@class='on')]") {
            remove()
          }
        }
        
        # Taking this set of "access keys" out side the Main Wrapper so we can 
        # preserver no matter what we are doing with the page
        # since this is required by their JS to populate the pop trolley
        insert_top("div", class:"mw_accesskeys mw_hide") {
          move_here("../ul[contains(@class,'accesskeys')]")
          move_to("../..")
        }

        
        # Removing all the unneccesary contents
        $(".//div[@id='footer'] | .//link | ./ul | ./div[@id='main']/div[@id='slideshow'] | ./style[@type='text/css']") {
          remove()
        }

        # Removing CMS content
        $(".//div[@class='deptCMS'] | .//div[contains(@id, 'dept_container')] | .//div[contains(@class,'itemCMPanel')] | .//div/a[contains(@onclick,'Banner')]/..") {

          #moving the mobile banner out
          $("./div[@id='mobile_banner']") {
            move_to("../../div[@id='breadcrumb']", "after")
          }
          remove()
        }

        # Special Offers in emerchandizing_section.jsp - Featured Offers Page
        $("./div[@id='sectionlanding']") {
          $("./h3[@class='offers']") {
            inner() {
              replace(/Special/ , "Top special")
            }
          }
        }


        #Filters
        $(".//form[@id='facet_navigation_form']") {
          attribute("target", "_self")
          # This applies only the special offers page =-=-=-=
          # Instead of changing the whole way I have filters setup
          # I will add a wrapper to the content, so, structurely, it can look exaclty like other page
          $("./div[@id='facetWrap']") {
            wrap("div", id: "productsnav")
          }
          # END This applies only the special offers page =-=-=-=

          $("./div[@id='productsnav']") {
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            
            wrap("div", class: "mw_filterContainer") {
              attribute("data-ur-set", "toggler")
              $("./div[@id='productsnav']") {
                insert_before("div", class:"mw_filterHeader", data-ur-toggler-component:"button", "<a class='icons-accordion'>Filters</a>")
              }
            }

            $(".//div[@id='facetWrap']") {
            # I am going to pull the shelve's filter container out and do things to it.
            # 1: Make sure your pulling out only shelves, so go inside h4 and check the text if its "shelves"
            # then add a class to its parent.
            # Shelves filter contains links and a drop down select menu but the goal is to change them all 
            # to active links.
              $("./div[@class='facet']") {

                $("./h4[contains(text(), 'Shelves')]") {                                  
                  inner() {
                    set("Choose a shelf")
                  }
                  $("..") {
                    attribute("class","mw_shelves")
                    $("./select") {
                      # 2: Since we already have list of links we want to pull all the <a> that are indside the <options>
                      # from the select element and make them sibbling to the existing links
                      add_class("mw_hide")
                      $("./option[1]") {
                        remove()
                      }
                      
                      $("./option") {
                        name("span")
                        $("./a") {
                          # log(fetch("."))
                          
                          # 3: the link inside the option tags have thier href depended on the its parent.
                          # but we can overite where its pointing to with the <options> value (the Javascript calls submits the form)
                          attribute("href",fetch("../@value"))
                          # log(fetch(".")) {
                          #   prepend("!!!changes")
                          # }
                        }
                        # 4: Wrap them in li so it can be symantically correct once we put them 
                        # inside th UL alongside the other links
                        wrap("li") {
                          move_to("../../ul", "bottom")
                        } 
                      }
                      
                    }
                    # Move the whole container on top of the filters
                    move_to("../../..", "before")
                    
                    # 5: For styling purposes wrap the amounts in a span so I can style in a different color
                    # and also I am replacing the content inside of the anchor tag
                    # with Title of it since the title have the full name of the shelve with now elipses at the end.
                    $("./ul/li[not(@class='on')]//a") {
                      inner(){
                        replace(/(^.*?)\(/ , fetch("./@title")) {
                          append("<span class='mw_gray'> (")
                        }
                        replace(/\)/ , ")</span>")
                      }
                    }
                    
                    #6: If a filter is selected remove the headers from the top 
                    $("./ul/li[@class='on']") {
                      $("/html/body/div/div[@id='breadcrumb'] | /html/body/div//div[@class='mw_shelves']/h4 ") {
                        remove()
                      }
                    } 
                    
                    #7: changin the name of filters accordion if there was shelf filter inside of it
                    $("/html/body/div//div[@class='mw_filterHeader']/a") {
                      inner() {
                        set("Other filters")
                      }
                    }

                    # Adding listeners to the buttons to start the spinner onclick
                    $("./ul/li") {
                      attribute("onclick","parent.document.getElementById('mw_spinner').className='';document.getElementById('mw_mainWrapper').className+=' mw_loading';")
                    }
                    
                  }
                }
              }
              
              $("./div[@class='facet']") {
                # once a filter is selected the li gets the "on" class
                # using this information i change the parent li to a div so
                # the following code wont take effect in here
                $("./ul/li[@class='on']") {
                  # adding a spinner when canceling the filter
                  $("./a") {
                    attribute("onclick","parent.document.getElementById('mw_spinner').className=''; document.getElementById('mw_mainWrapper').className+=' mw_loading';")
                  }
                  $("..") {
                    name("div")
                    $("..") {
                      # adding a class to the container for styling purposes
                      attribute("class", "mw_selectedFilter")
                      
                      # Set the accordion to open if you have a filter selected
                      $("../../../div") {
                        attribute("data-ur-state", "enabled")
                      }
                    }
                  }
                }
                
                $("./select") {

                  # adding spinners
                  attribute("onchange") {
                    value() {
                      append("; parent.document.getElementById('mw_spinner').className=''; document.getElementById('mw_mainWrapper').className+=' mw_loading';")
                    }
                  }

                  # Remove the "View More Type" Option from the Select
                  insert_before("div", class:"mw_arrow_icon icons-arrow_down")
                  $("./option[1]") {
                    remove()
                  }
                  # This makes all the code below conditional so it applies only
                  # if there is a Select element inside the container div
                  $("..") {
                   # Take all the links convert href attributes to value and anchors to options
                   # then place it inside the the select
                    $("./ul") {
                      $("./li/a") {
                        name("option")
                        attribute("value", fetch("./@href"))
                        attribute("href", "")
                        move_to("../../../select", "top")
                      }
                      # if I wrap the ul with a placeholder span, it will 
                      # prevent the next to apply this ul, not removing it since it
                      # contains hidden input element which are vital for form's functionalities
                      wrap("span", class: "mw_gotchya")
                    }
                    # Take the header of the Select and put it inside the as 
                    # the first option
                    $("./h4") {
                      name("option")
                      move_to("../select", "top")
                    }
                  }
                }
               
               # If there are less then 5 or 6 filters they are displayed as links
               # but for consistency in the filters tab, I used all those anchors and
               # converted them to options and placed then inside a select menu
                $("./ul") {
                  name("select")
                  insert_before("div", class:"mw_arrow_icon icons-arrow_down")
                  # the Javascript call to make the select element functional, adding spinners
                  attribute("onchange", "javascript:placeFacet(this,'2'); parent.document.getElementById('mw_spinner').className=''; document.getElementById('mw_mainWrapper').className+=' mw_loading';")
                  $("./li") {
                    $("./a") {
                      name("option")
                      attribute("value", fetch("./@href"))
                      attribute("href", "")
                      move_to("../../../select", "top")
                    }
                    remove()
                  }
                  move_here("../h4", "top") {
                    name("option")
                  }
                }
              }
              
            }
          }
        } # ENDING FILTERS
        
        # romving the unpredictable ASDA banner - Using // since they keep changing the locations for the banners
        $(".//a[contains(@onclick, 'bannerClick')]") {
          $("..") {
            remove()
          }
        }
        #=-=-=-=-=-=-=-=-=-=-=- PRODUCT MODULE -=-=-=-=-=-=-=-=-=-=_#
        
        # Product Module for both Shelf view and List View
        $("./div[contains(@class,'productsdisplay')]") {
          add_class("mw_product_module")
          
          # all the div.shelf are nested inside each other, this will make them sibblings of each other
          # We want to do this in order to structure the accordions properly
          move_here(".//div[@class='shelf']", "bottom")
          
          # Removing the hide button from the header of each individual shelf and adding a class to the header itself
          $("./div/h3/a[@class='hidebutton']") {
            $("../..") {
              add_class("mw_shelf_header icons-accordion")
            }
            remove()
          }
          
          # All the headers are located at the bottom of another .shelf
          # Here I am assiging a class then moving outside "after" its container
          # later I will use this .mw_shelfHeader to wrap it with the accordion wrapper
          
          $("./div[@class='shelf'] | ./div/div[@class='shelf']") {
            $("./div/h3/a[@class='hidebutton']") {
              $("../..") {
                add_class("mw_shelf_header icons-accordion")
                move_to("..", "after")
              }
            }
            # removing the pagination located inside the .shelf
            $("./div[contains(@class,'pagcont')]") {
              remove()
            }

            
            # Structing the .item inside the shelf
            $("./div[contains(@class, 'item')]") {
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
                add_class("icons-ImgNotAvail") 
                attribute("data-style","") 
              }
              
              $("./div[@class='itemcontent']") {
                # This is hacky fix - Search for #6755577 for more info
                $(".//a") {
                  attribute("target","_parent")
                  attribute("href") {
                    value() {
                      replace(/products\/products\.jsp/ , "catalog/sectionpagecontainer.jsp")
                    }
                  }
                }
                # Go inside fieldset and remove the plus and minus button
                # then replace the KG with a span and put a class to its parent
                $("./div//fieldset") {
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
#                     attribute("style","border: 2px solid blue !important;")
#                     attribute("onlbur","if (this.value == '') {this.value = '1.0';}")
#                     attribute("onfocus","if (this.value == '1.0') {this.value = '';}")
                  }
                  
                }
                # Now look for fieldset again and if doesn't have a KG class then 
                # add qty class to it then go insdie and inject a "qty" span
                $("./div//fieldset[not(contains(@class,'mw_by_kg'))]"){
                  add_class("mw_by_qty")
                  $(".//input[@class='quantity']") {
                    insert_before("span", "Qty", class:"mw_qty")
                    attribute("pattern", "[0-9]*")
#                     attribute("onlbur","if (this.value == '') {this.value = '1];}")
#                     attribute("onfocus","if (this.value == '1') {this.value = '';}")
                  }
                }
                                
              } # Ending .itemcontent
            } # Ending .item
          } # Ending .shelf
          
          
          # Using the header I wrap all the accordions properly
          $("./div[contains(@class, 'mw_shelf_header')]") {
            # Assign the accordion attributes for button
            attribute("data-ur-toggler-component", "button")
            wrap("div", class: "mw_categoryAcc") {
              # Assign the accordion attributes for set
              attribute("data-ur-set", "toggler")
              move_here("./following-sibling::div[@class='shelf'][1]") {
                # Assign the accordion attributes for content
                attribute("data-ur-toggler-component", "content")
                attribute("data-ur-state", "disabled")
              }
            }
          }
          
          # This logic will add a class to the container if its more than one accordion
          # and using that class we can have the accordion stay open if there is only one
          $("./div[@class='mw_categoryAcc' and position() > 1]") {
            $("../div[contains(@class,'mw_categoryAcc')]") {
              attribute("class","mw_categoryAcc mw_more_than_one_cat")
            }
          }
          $("./div[contains(@class,'mw_categoryAcc') and not(contains(@class,'mw_more_than_one_cat'))]") {
            add_class("mw_one_cat")
            $("./div") {
              attribute("data-ur-state", "enabled")
            }
          }
          
          $("./div[contains(@class, 'pagcont')]") {
            remove()
          }
          
        } # Ending Product Module for both Shelf view and List View
        
        
        #****************** ONLY SHELF ******************#
        
        # Product Module only for Shelf View
        $("./div[contains(@class,'productsdisplay') and not(contains(@class,'list'))]") {
          add_class("mw_product_shelf_view")
          
          $("./div[@class='shelf'] | ./div/div[@class='shelf']") {
            $("./div[contains(@class, 'item')]") {
            
              $("./div[@class='itemcontent']") {
                $("./ul") {
                  $("./li[@class='notes'] | ./li[@class='price'] | ./li[@class='priceper']") {
                    name("div")
                    move_to("../../div/form", "before")
                  }
                  $("./li[@class='brand']/a") {
#                     var("mw_title",fetch("./@title"))
#                     log($mw_title){
#                       prepend("!!!!!!!!!!")
#                     }
                    inner(){
                      set(fetch("./@title"))
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
          } # Ending .shelf
          
        } # Ending .productsdisplay
        
        
        #****************** ONLY LIST ******************#
        
        # Product Module only for List View
        $("./div[contains(@class,'productsdisplay') and contains(@class,'list')]") {
          add_class("mw_product_list_view")
          $("./div[@class='shelf'] | ./div/div[@class='shelf']") {
            $("./div[contains(@class, 'item')]") {

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
          } # Ending .shelf
        } # Ending .productsdisplay .mw_product_list_view


        # TODO: Fix this correctly
        # #6755577 This is hacky fix needed because of issues with the back button (https://moov.lighthouseapp.com/projects/75946/tickets/381-back-button-doesnt-work-on-the-desktop-website)
        # Unlike on the desktop site, these product links will NOT just reload the frame; they'll open up a whole new container page
        # this is very hacky fix for the back button

        #=-=-=-=-=-=-=-=-=-=-=-  Ending PRODUCT MODULE -=-=-=-=-=-=-=-=-=-=_#


        # Special Offer's tab in shelf page
        $("./h3[contains(@class,'offers') and contains(text(), 'Special Offers')]") {
          inner() {
            replace(/Special/ , "Top special")
          }
          wrap("div", class:"mw_specialOffersTab") {          
            move_here("./following-sibling::div[contains(@class,'productsdisplay')][1]", "bottom")
#             move_to("../div[@class=' mw_pagination']", "before")
          }
        } # Ending Special Offer's Tab


        # Get the pagination on top change it accordingly and move it to
        # to the bottom of the page.
        $("./div[contains(@class,'pagcont')][1]") {
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

      } # Closing Body
      
      # Removing an extra pagination once you tap one of the filters
      $(".//div[@class='pagcont']") {
        remove()
      }
      
    } # Ending Main Wrapper
    
#     if you click on one of the links inside the "Special Offers" section
#     it will redirect you to this page where you will have a list view of all the
#     other products under that offer
    
    # Matching with Multil save page only
  
  } # Closing with

} # Closing match($path)
