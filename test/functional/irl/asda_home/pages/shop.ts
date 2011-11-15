# REF_URL: asda-estore/catalog/categorylistingpage.jsp
# A category listing, arrived at by hitting the Shop icon in the header

$("./body") {
  add_class("mw_ts_shop mw_shop mw_trolley_amount_enabled")
  
  # This file is now bundled
  # insert_bottom("script", src: asset("scroll.js", "js"))

  # Temporary Place holder for the mobile_banner
  $("./div[@id='mw_mainWrapper']") {
#    inject_top("<div id='mw_mobileAddPlaceHolder'><span>Mobile Ad Place Holder</span></div>")
  
    # Search Form
    $("./form[@name='globalform']") {
      remove()
    }
  }

  # Accordian For individual Sections
  $("./div/div[@id='mainnav']") {

# HARI 7/22 SWITCHING FROM TABS TO ACCORDIONS, COMMENTING OUT LINES 25 - 95

#    $("./ul") {
#      attribute("data-ur-set", "tabs")
#      
#      # Moving the special li outside the soon to be container for all the accordion
#      # Since this is only a link not an accordion
#      $("./li[@id='dept:Special Offers']") {
#        name("div")
#        add_class("mw_special_offers_link")
#        move_to("../..", "bottom")
#      }
#      $("./li") {
##         $data = fetch(".")
#        
#        add_class("mw_accordianBtn")
#        # Wrapping the li(accordian button) then moving the div's(accordian content) inside
#
#        
#        # this adds a copy of the li in the Accordian Content
#        # so the user can actualy click on it
#        copy_to("./following-sibling::div[1]/ul", "top") {
#        
##         Couple of things we need to do once we move this header(Accordion Btn) to top of its sibbling container (Accordion Content)
##         1- Its anchor tag contains the URL to Featured Offers of the department, (we will be replacing the anchor tag with a span later, since this acts as an accordion btn)
##           but right now we are replacing the text from the coppied version to "Featured Offers" and preseving the links
#          $("./a") {
#            inner(){
#              replace(/([a-z|A-Z].*)/ , "Featured Offers")
#            }          
#          }
#          
##         2- This div that we are copying over contains an unique ID that we will use for the Tabs (Uranium) functionality
##            So we are going to set its id as a variable
#          $dataYourId = fetch("./@id") 
#
##         3- We will use the variable to assign it ot the accordion btn and container to make them toggle. Since they require
##            unique ids to work          
#          $("../..") {
#            attribute("data-ur-tab-id", $dataYourId)
#            $("./preceding-sibling::li") {
#             attribute("data-ur-tab-id", $dataYourId)
#            }
#          }
#        }
#        
#        
#        
#        # Accordian button Selector
#        attribute("data-ur-tabs-component", "button")
#        attribute("data-ur-state", "disabled")
#        $("./a") {
#          attribute("href", "")
#          attribute("target","")
#          attribute("id","")
#          name("span")
#        }
#        inner() {
#          replace(/\<span\>/ , "")
#          replace(/\<\/span\>/ , "")
#        }
#        wrap("div", class: "mw_accordianContainer") {
##           attribute("data-ur-set", "toggler")
#          move_here("./following-sibling::div[1]", "bottom") {
#            # as I am moving the content inside I added the uranium tags
#            add_class("mw_accordianContent")
#            attribute("data-ur-tabs-component", "content")
#            attribute("data-ur-state", "disabled")
#            $("./div[@class='dropbelow']") {
#              remove()
#            }
#            $("./ul/li") {
#              attribute("class","mw_subTab")

# HARI 7/22 ADDING THE GITHUB COPY TO HAVE ACCORDIONS AGAIN, NOT TABS (THROUGH LINE 139)

    $("./ul") {
      # HARI 7/22 THESE LINES WERE NOT IN GITHUB BUT ARE NECESSARY FOR SPECIAL OFFERS
      # Moving the special li outside the soon to be container for all the accordion
      # Since this is only a link not an accordion
      $("./li[@id='dept:Special Offers']") {
        name("div")
        add_class("mw_special_offers_link")
        move_to("../..", "bottom")
        $("./a") {
          attribute("href") {
            value(){
              append("&maxItemsToBeShown=15")
            }
          } 
        }
      }
      # HARI 7/22 RESUME GITHUB COPY
      $("./li") {
        add_class("mw_accordianBtn")
        add_class("icons-accordion")
        # Wrapping the li(accordian button) then moving the div's(accordian content) inside
        # this adds a copy of the li in the Accordian Content
        # so the user can actualy click on it
        copy_to("./following-sibling::div[1]/ul", "top")
        # Accordian button Selector
        attribute("data-ur-toggler-component", "button")
        $("./a") {
          attribute("href", "")
          attribute("target","")
          name("span")
        }
        wrap("div", class: "mw_accordianContainer") {
          attribute("data-ur-set", "toggler")
          move_here("./following-sibling::div[1]", "bottom") {
            # as I am moving the content inside I added the uranium tags
            add_class("mw_accordianContent")
            attribute("data-ur-toggler-component", "content")
            attribute("data-ur-state", "disabled")
            $("./div[@class='dropbelow']") {
              remove()
            }
            $("./ul/li[1]/a") {
#               log("s")
              inner(){
                replace(/([a-z|A-Z].*)/ , "Featured Offers")
              }
            }
            $("./ul/li") {
              attribute("class","mw_subTab")
              $("./a") {
                attribute("href") {
                  value(){
                    append("&maxItemsToBeShown=15")
                  }
                } 
              }

# HARI 7/22 DONE SWITCHING BACK TO ACCORDIONS, REMOVE ABOVE TO GET BACK TO TABS

              # Removing Departments:
              # 1. 1214921923714
              $("./a[@id='1214921923714']") {
                $("./../../../..") {
                  remove()
                }
              }
              # Removing Aisles:
              # 1. 1215025717412
              # 2. 1215024475248
              # 3. 1215030197693
              # 4. 1215029489534
              # 5. 1215023226774
              # 6. 1215011215448
              # 7. 1215014418900
              # 8. 1215030873607
              $("./a[contains(@id,'1215025717412') or contains(@id,'1215024475248') or contains(@id,'1215030197693') or contains(@id,'1215029489534') or contains(@id,'1215023226774') or contains(@id,'1215011215448') or contains(@id,'1215014418900') or contains(@id,'1215030873607')]") {
                $("..") {
                  remove()
                }
              }
            }
          }
        }
        # Adding a special class for the special offer
#         $("./a[contains(text(),'Special Offers')]") {
#           add_class("mw_SpecialOffers")
#         }
      }
    }
  }
}
