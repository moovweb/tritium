# URL: checkout/checkoutdeliveryslotgridcontainergridcontainer.jsp
# Grid Slot
match($path){
  # adding a class for the deliveryslot inner frame only
  with(/deliveryslotcontainer/){
    $("/html/body") {
      add_class("mw_deliverySlot")
      
      $("./div[@id='mw_mainWrapper']") {
      
        $("./div[@class='outwrap']") {
          remove()
        }
        
        $("./form[@name='delaccessiblegridform']") {
          $("./div[@id='deliveryslots']") {
          
            $("./div[@class='notes']") {
              add_class("mw_testing")
              move_to("../../..", "after")

            }
          }
        }
        
        # For accessiblity view button removal
        $(".//button[@id='topbookslot']") {
          add_class("mw_testing")
          wrap("div", id: "mw_topbookslot") {
            # insert_top("span", id: "mw_top_book_slot_msg") {
            #     text("Confirm your delivery slot")
            # }
            move_to("../..//h2[contains(@class,'sifr')]", "after")
            move_here("/html/body/div[@id='mw_mainWrapper']//div[@id='deliveryslot']", "top") {
              $(".//img") {
                remove();
              }
            }
            move_here("/html/body/div[@id='mw_mainWrapper']//div[@id='reservepane']", "top")
            
            
          }
          $(".//span[@class='buttoncopy']") {
            inner("Confirm your delivery slot")
          }
        }
        
        insert_bottom("div", class: "mw_reduce_emissions") {
          inner("Reduce carbon emissions. A van might be in your area.")
        }
        
      }
    }
  }
}

# outwrap

$("./body[@id='basketframe']|body[@id='gridBodyElement']") {
  $("./div[@id='mw_mainWrapper']") {
    insert_bottom("div", class: "mw_reduce_emissions") {
      inner("Reduce carbon emissions. A van might be in your area.")
    }
  }
}
# Non-framed page
$("./body//a[@id='middleframe']") {
  $("..") {
    insert_bottom("div", class: "mw_reduce_emissions") {
      inner("Reduce carbon emissions. A van might be in your area.")
    }
  }
}

$("./body") {
  add_class("mw_checkout_delivery")
  # $("./div[@id='mw_header']/div/div/a[@id='mw_trolley_icon']") {
  #   attribute("data-ur-toggler-component", "foobar")
  #   attribute("onclick", "javascript:void(0)")
  # }
  $("./div[@id='mw_mainWrapper']") {
    $("./ul") {
      # remove the top breadcrumbs
#       add_class("mw_testing")
      remove()
    }
    $(".//ul[@id='lognav'] | .//form/br") {
      remove()
    }
    $(".//div[@id='options']") {
      $("..") {
        # Want to hide this view during the javascript switching us over to the accessible view
        add_class("mw_hide")
      }
    }
    $(".//div[@id='optionDiv']") {
      # hiding the extra stuff seen on the normal book slot view
      # want to hide this during the javascript switching to the accessible view
      remove()
    }
    # Move the notes to the end of the page
    $(".//div[@class='notes']") {
      move_to("/html/body/div/div[@class='mw_reduce_emissions']", "after")
    }
    # Need to separate the two matchers in order to target the separate pages
    # Apply the go back link on the delivery slot container (iframes)
    # match($path,/deliveryslotgridframe\.jsp/) {
    #       $(".//div[@class='deliveryaddress'] | .//div[contains(@class, 'TableFooter')] | .//button[@id='topbookslot']/..") {
    #         top {
    #           insert("<a class='mw_back_to_trolley' href='/asda-estore/checkout/regularviewtrolleycontainer.jsp'>Continue Shopping</a>")
    #         }
    #       }
    #     }
    # Apply the go back link to the checkout delivery slot grid
    match($path, /checkoutdeliveryslotgridcontainer\.jsp/) {
      $(".//div[@class='deliveryaddress'] | .//div[contains(@class, 'TableFooter')]") {
        inject_top("<a class='mw_back_to_trolley' href='/asda-estore/checkout/regularviewtrolleycontainer.jsp'>Continue</a>")
      }
    }
    $(".//div[@id='promo2ndcol']") {
      move_to("..//div[@id='errMsg']", "after")
      $(".//img | .//div[@class='panecontentException']") {
        remove()
      }
    }
    $("./h3[@class='hideoffscreen']") {
      # Remove extraneous head bullshit at the bottom      
      add_class("mw_testing")
      remove()
    }
    # // used to access things on both types of pages
    $(".//form") {
    
      $("./script[contains(text(), 'delSlotChange')]") {
        add_class("mw_testing")
        move_to("/html/body/div[@id='mw_mainWrapper']", "after")
      }
      
      
      $("./div[@id='deliveryslots']") {
        # using // because differences in pages affects how specific and deep I can effectively search for the different views
        # may be able to optimize this later when not using the normal view at all

        
        # Removing this. For now we don't support it.
        $(".//div[@id='bookslotinfo']") {
          remove()
          # attribute("data-ur-set", "toggler")
          #         $("./div[@id='clickcollect']") {
          #           $("./h1") {
          #             attribute("data-ur-toggler-component", "button")
          #             move_to("..", "before") 
          #           }
          #           attribute("data-ur-toggler-component", "content")
          #           attribute("data-ur-state", "disabled")
          #         }
  
        }
        $(".//div[@id='bookslotpopupwarning']") {
          # Remove elements that we don't think we'll need inside the Click and Collect
          # confirm message
          attribute("style") {
            remove()
          }
          $(".//div") {
            attribute("align") {
              remove()
            }
          }
          $("./div/div") {
            $("./div[@class='bstopbdr' or @class='bsbtmbdr']") {
              remove()
            }
            $("./div[@class='cnfcontent']") {
              $("./br | ./table/tr/td[position()=2]") {
                remove()
              }
            }
          }
        }
        $("./div[@id='errMsg']") {
          move_to("../div[@id='promo2ndcol']", "after")
        }
        # Remove extra copy that isn't needed for navigation
        $("./div/p[@id='weekcommencing'] | ./div[@class='divfulfilmentHead']") {
          add_class("mw_hide")
          # To prevent some JS error to pop up
          # some functions are looking up this element if not available on the page the JS console barfs
  #         remove()
        }
        # Move the weekly navigation to the bottom of the slots -- less important and would clutter appearance
        # Might need to use JS to show/hide these elements as needed
        # Can't move because it breaks the page
        $("./div/a[@class='mw_back_to_trolley']") {
          move_to("../..", "bottom")
        }

        # Move the slot nav into position above the 
        $("./div[@class='weekpag']") {
          $("./ul[@class='slottype']") {
            $("..") {
              attribute("id", "mw_slot_types")
              move_to("../div[@class='delivery-slot-columns']", "before")
            }
          }
        }
        
        # Using the hidden input provided for Moovweb, I we take the value of the input and apply 
        # the active class to the respective active HR slots
        $("./input[@id='selectedSlotGroup']") {
          var("slotValue", fetch("./@value"))
          match($slotValue){
            with(/1/){
              $("../div[@class='weekpag']/ul[@class='slottype']/li[@id='slotSecond1']") {
                add_class("mw_active")
              }
            }
            with(/2/){
              $("../div[@class='weekpag']/ul[@class='slottype']/li[@id='slotSecond2']") {
                add_class("mw_active")
              }
            }
            with(/4/){
              $("../div[@class='weekpag']/ul[@class='slottype']/li[@id='slotSecond4']") {
                add_class("mw_active")
              }
            }
            with(/8/){
              $("../div[@class='weekpag']/ul[@class='slottype']/li[@id='slotSecond8']") {
                add_class("mw_active")
              }
            }
          }
        }
        
        $(".//div[@class='col']//div[@class='note']") {
          # add_class("mw_testing")
          # remove()
          name("span")
          inner("")
          add_class("mw_van")
        }
        # Add fwd/bwd links
        $("./div[@id='mw_slot_types']") {
          # $("./ul[@class='slottype']/li/span") {
          #           remove()
          #         }
          # Add in the forward backwards wrapper for the slider
          insert_before("div", class: "mw_fwd_bwd_wrap")
          # Add in the forward backwards buttons inside the wrapper
          $("../div[@class='mw_fwd_bwd_wrap']") {
              # Count element
              #insert_tag("span" , id: "mw_carousel_count") {
              #  attribute("data-ur-carousel-component" , "count")
              #  inner(" -- count -- ")
              #}
              # Previous Button
            
            # We need this element for the mw_bookslot.js
            insert_bottom("div", id:"mw_count"){
              attribute("data-ur-carousel-component","count")
              add_class("mw_hide")
            }
            insert_bottom("div", dir: "prev", id:"mw_prev_button") {
              inner("Previous day")
              attribute("data-ur-carousel-component", "button")
              attribute("data-ur-carousel-button-type", "prev")
            }
              # Next Button
            insert_bottom("div", dir: "next", id:"mw_next_button") {
              inner("Next day")
              attribute("data-ur-carousel-component", "button")
              attribute("data-ur-carousel-button-type", "next")
            }
          }
        }
        $("./div[@class='delivery-slot-columns']") {
          # Move the id attribute up to a class attribute to make the elements easier to access
          $("./div[@class='col']") {
            attribute("data-ur-carousel-component", "item")
            # Get the id of the <a> element
            var("mw_id") {
              set(fetch("a/@id"))
            }
            # Set the variable as a class on the parent element
            attribute("class") {
              value() {
                append(" ")
                append($mw_id)
              }
            }
            # $("../../div[@id='mw_slot_types']/ul/li[@id='slotSecond8']") {
            #             add_class("mw_active")
            #           }
            $("./fieldset") {
              ## Set the active tab
              ## if the fourth div (timeslot) exists, the delivery 1HR or 2HR is active
              # $("./div[4]") {
              #               $("../div[1]/label") {
              #                 $ttext = fetch("text()")
              #                   match($ttext) {
              #                   # 1HR delivery
              #                   with(/^7.*8/) {
              #                     $("../../../../../div[@id='mw_slot_types']/ul") {
              #                       $("./li[@id='slotSecond1']") {
              #                         add_class("mw_active")
              #                       }
              #                       $("./li[@id='slotSecond8']") {
              #                         attribute("class") {
              #                           remove()
              #                         }
              #                       }
              #                     }
              #                   }
              #                   with(/^8.*9/) {
              #                     $("../../../../../div[@id='mw_slot_types']/ul") {
              #                       $("./li[@id='slotSecond1']") {
              #                         add_class("mw_active")
              #                       }
              #                       $("./li[@id='slotSecond8']") {
              #                         attribute("class") {
              #                           remove()
              #                         }
              #                       }
              #                     }
              #                   }
              #                   # 2HR delivery
              #                   else() {
              #                     $("../../../../../div[@id='mw_slot_types']/ul") {
              #                       $("./li[@id='slotSecond2']") {
              #                         add_class("mw_active")
              #                       }
              #                       $("./li[@id='slotSecond8']") {
              #                         attribute("class") {
              #                           remove()
              #                         }
              #                       }
              #                     }
              #                   }
              #                 }
              #               }
              #             }
              $("./div") {
                # Set the value of the buttons
                $("./input") {
                  attribute("type", "button")
                  attribute("value", "Check Availability")
                  $id = fetch("@id")
                  # log($id) 
                  $("../label") {
                    $tx = fetch("text()")
                    match($tx) {
                      with(/X/) {
                        $("../input") {
                          attribute("value", "Not Available")
                        }
                      }
                    }
                  }
                  # match($id) {
                  #   with(/rnull/) {
                  #     attribute("value", "Not Available")
                  #   }
                  # }
                  # listener to start the spinner
                  attribute("onclick") {
                    value() {
                      append(" parent.document.getElementById('mw_spinner').className=''; document.getElementById('mw_mainWrapper').className+=' mw_loading';")
                    }
                  }
                }
                
                # TODO OJ: We need to find out why ASDA added this input field for us and change it accordingly
                # for now we are hiding it until the next sprint (where we diving in to the bookslot)
                $("./b/../input[@id='bookedTime']") {
                  add_class("mw_hide")
                }
                $("./b/../input[@name='delivery-time']") {
                  attribute("value", "Available")
                  $("..") {
                    add_class("mw_active")
                  }
                }
                $(".//label") {
                  $txt = fetch("text()")
                  match($txt) {
                    with(/Full/) {
                      $("../input") {
                        attribute("value", "Full")
                      }
                    }
                  }
                }
                # Need to do all this replace to format the numbers in the table
                $(".//label") {
                  inner() {
                    replace(/between./, "")
                    replace(/and/, "-")
                    replace(/^([1-9][ap]m)/, "&nbsp;\\1")
                  }
                }
              }
            }
          }
          # Attribute to activate the slider
          attribute("data-ur-carousel-component", "scroll_container")
        }
        # Create a wrapper for the carousel where all carousel components are contained
        $("./div[@class='mw_fwd_bwd_wrap']") {
            # Carousel Wrapper Div
          insert_before("div", id: "mw_carousel_wrapper") {
              # Set the necessary attributes
            attribute("data-ur-set", "carousel")
            attribute("data-ur-id","bookslot")
            attribute("data-ur-carousel-component", "view_container")
            attribute("data-ur-touch", "disabled")
              # Move the necessary items into the wrapper
              # One tricky thing here is that stuff should be brough in reverse order when moving to the top
            move_here("../div[@class='delivery-slot-columns']", "top")
            move_here("../div[@id='mw_slot_types']", "top")
            move_here("../div[@class='mw_fwd_bwd_wrap']", "top")
          }
        }
        $(".//div[@class='delivery-slot-columns']") {
          wrap("div", id: "mw_delivery_slot_columns_wrapper")
        }
        # Dump the table
        $(".//table") {
          name("div")
          add_class("mw_table")
          # Remove the styles on the table and its children elements
          $("..//*") {
            attribute("style") {
              remove()
            }
            attribute("width") {
              remove()
            }
          }
          $(".//tbody") {
            name("div")
            add_class("mw_tbody")
          }
          $(".//tr") {
            name("div")
            add_class("mw_tr")
          }
          $(".//td") {
            name("span")
            add_class("mw_td")
          }
          # Remove any empty elements
          $(".//div[@id='divHomeDelivery'] | .//div[@id='divClickAndCollect']") {
            $("./div[position()=1] | ./table/div/span[position()=1 or position()=4 or position()=5]") {
              add_class("mw_testing")
              remove()
            }
          }
          # Remove the Click and Collection Option for the moment
          # TODO: Figure out a way to integrate this
          # $(".//div[@id='divClickAndCollect']") {
          #   remove()
          # }
        }
        $("./div[contains(@class, 'mw_table')]//span[contains(@class, 'divfulfilmentAddrAccessible')]") {
          $("..") {
            add_class("mw_address")
          }
        }
      }
    }
    
    # Structure and styling for the checkout delivery slot container (page is slighly different)
    match($path, /checkoutdeliveryslotgridcontainer.jsp/) {
      $("/html/body") {
        add_class("mw_deliverySlot")
        
        $(".//button[@id='topbookslot']") {
          add_class("mw_testing")
          wrap("div", id: "mw_topbookslot") {
            # insert_top("span", id: "mw_top_book_slot_msg") {
            #     text("Confirm your delivery slot")
            # }
            move_to("/html/body/div[@id='mw_mainWrapper']//div[@id='deliveryslots']", "top")
            move_here("/html/body/div[@id='mw_mainWrapper']//div[@id='deliveryslot']", "top") {
              $(".//img") {
                remove();
              }
            }
            move_here("/html/body/div[@id='mw_mainWrapper']//div[@id='reservepane']", "top")
          }
          $(".//span[@class='buttoncopy']") {
            inner("Confirm your delivery slot")
          }
        }
        
        
        
      }
    
      # Page has no frames, so we want to remove the existing navigation
      $("./div[@id='header']") {
        remove()
      }
      # Adjusting differences in the structure of the page, to make it line up with the slot grid container page
      $(".//div[@id='deliveryslots']") {
        # Moves the error message when its active, the struture will change
        $("./div/p[@id='errorMessage']") {
          $("..") {
            attribute("id", "mw_error_message")
            move_to("../div[@id='promo2ndcol']", "after")
          }
        }
#         $("//div[@id='deliveryslot']|.//div[@id='promo2ndcol']") {
#           $(".//h3[@class='sifrYourslot']|.//h3[@class='sifr']") {
#             name("h2")
#             attribute("style") {
#               remove()
#             }
#             add_class("sifr")
#           }
#           insert_bottom("div", class: "mw_addr_wrap") {
#             move_here("../p", "bottom")
#           }
#           $(".//span") {
#             attribute("style") {
#               remove()
#             }
#           }
#           $("./div[@class='mw_addr_wrap']") {
#             remove()
#           }
#         }
        # bottom() {
        #   insert("<a class='mw_back_to_trolley' href='/asda-estore/home/homecontainer.jsp'>Continue Shopping</a>")
        # }
      }
    }
    
    
  }
}





# Specficially matching for the content frame
match($path) {
  with(/deliveryslotgridframe\.jsp/) {
    $("./body[contains(@class, 'framed')]//h2[@class='sifr']") {
      # Need a container div for the delivery information that I pull in via JS from the popup trolley
      insert_after("div", id: "mw_book_slot_module") {
        insert_top("div", id: "mw_deliveryslot")
        move_here("../div[@id='mw_topbookslot']", "bottom")
      }
    }
    $("./body") {
      attribute("onLoad","parent.window.scrollTo(0,1)")
    }
  }
}

# Bundling this script
# The script is required to pull the booked slot information from one Iframe into another
# $("./body[contains(@class, 'framed')]") {
#   insert_bottom("script", src: asset("mw_get_delivery_time.js", "js"))
# }


# The javascript click that was being used to change to the accessible view has been 
# deprecated in favor of a meta refesh
# Meta refresh used when clicking the Checkout button and arriving at the book slot
# page because you don't have a slot booked
# Using the Meta refresh is better because its less intrusive, more standardized, and
# faster because it does not wait for the content to completely load
match($path) {
  with(/(checkoutdeliveryslotgridcontainer|deliveryslotcontainer)/) {
    match($path) {
      log($path)
      with(/accessible=true/) {
        # log($path)
        log("--> found accessible query parameter")
      }
      else() {
        log($path)
        log("--> did not find accessible query parameter")
#         $("./body") {
#           # insert the spinner
#           inject_top("<div id='mw_spinner2'><div class='mw_bar1'></div><div class='mw_bar2'></div><div class='mw_bar3'></div><div class='mw_bar4'></div><div class='mw_bar5'></div><div class='mw_bar6'></div><div class='mw_bar7'></div><div class='mw_bar8'></div></div>")
#         }
        $("./head") {
          var("pth", $path) {
            append("&accessible=true")
          }
          var("ct", $pth) {
            prepend("0; url=")
          }
          insert_bottom("meta") {
            attribute("http-equiv", "refresh")
            attribute("content", $ct)
          }
        }
      }
    }
  }
}


# When they push Click and Collect live to the prod env
# We'll have to remove this
$(".//div[@id='divClickAndCollect']") {
  remove()
}
# match($host) {
#   with(/qa/) {
#     log("not doing anything")
#   }
#   else() {
#     $(".//div[@id='bookslotinfo']") {
#       remove()
#     }
#   }
# }
