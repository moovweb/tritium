
$("//div[@id='pdp_main']"){
  
  # format title
  $("//div[contains(@class, 'bl_pdp_left')]"){
    move_here("//h1", "before")
    move_here("//div[@id='BVCustomerRatings']", "before")
  }
  
  # swatch container formatting
  $("//div[contains(@class, 'pdp_swatches')] | //div[contains(@class, 'pdp_swatches_member')]"){
    $("./div[contains(@class, 'clearBoth')] | ./div[contains(@class, 'pdp_swatch_popup')] | ./script"){
      remove()
    }
    wrap("div"){
      wrap("div"){
        add_class("mw_carousel_relative")
      }
      $ps_id = concat("mw_swatch_",index())
      attribute("parascrollname", $ps_id)
      attribute("parascroll", "container")
      add_class("mw_swatches_container")
    }
    attribute("parascroll", "slider")
    add_class("mw_swatch_viewport")
    
    # add swatch buttons
    $("./*[@parascroll='slider']/*[2]/../.."){
      $myname = fetch("./../div/@parascrollname")
      $myhtml = concat("<div class='mw_ps_button_group' mw_ps='", $myname, "'><div class='mw_prev_button'></div><div class='mw_next_button'></div></div>")
      inject_before($myhtml)
    }
    
    $("(./div[position() mod 20 = 0])"){
        wrap("span"){
          add_class("mw_swatch_div")
          move_here("./preceding-sibling::div", "bottom")
        }
        log("group")
      }
      $("./div[1]"){
        wrap("span"){
          add_class("mw_swatch_div")
          move_here("./following-sibling::div", "bottom")
          
        }
      }
    }
    $(".//span[contains(@class, 'mw_swatch_div')][1]"){
      attribute("active", "true")
    }
  }

  $("//div[@parascroll='container']//span[contains(@class, 'mw_swatch_div')][1]/../../.."){
    inject_before("<div>available colors</div>"){
      add_class("mw_title_text")
    }
  }

  $("//div[contains(@class, 'pdp_member_description')]/div[contains(@class, 'mw_swatches_container')]"){
    move_to("./../..", "before")
  }


  $("//div[contains(@class, 'pdp_memberProductOptionLink')]/a"){
    inner(){
      set("<span class='mw_product_details'>Product Detail Page</span>")
    }
  }
  
  # $("//div[contains(@class, 'findItInStoreLinkDiv')]/img"){
  #   name("div")
  #   inner(){
  #     set("<span class='mw_product_details'>find it in store</span>")
  #   }
  # }
  # temp remove the carousel images
  # $(".//div[@id='pdp_left_image']"){
  #    remove()
  # }
  $(".//div[contains(@class, 'pdp_email_wishlist_links')]//img"){
    remove()
  }
  # remove back link
  $(".//div[contains(@class, 'pdp_backToResults')]"){
    remove()
  }
  $(".//div[contains(@class, 'pdp_zoom')]"){
    remove()
  }
  $("//li/a[contains(@href, 'denimfitguide.jsp')]/.."){
    remove()
  }
  $(".//div[contains(@class, 'cmio_PDPZ1')]"){
    remove()
  }
  
  # prepair alt images and carousel pdp_left_image
  $("//div[@id='pdp_left_image']//img"){
    wrap("div"){
      attribute("parascroll", "slider")
      wrap("div"){
        attribute("parascroll", "container")
        attribute("parascrollname", "mw_image_carousel")
        inject_after("<div id='mw_carousel_dots'></div>")
      }
      $("//div[@id='pdp_alt_images_container']//div[contains(@class, 'bl_pdp_thumb')][1]/following-sibling::div//img"){
        move_to("//div[@parascrollname='mw_image_carousel']/div[@parascroll='slider']", "bottom"){
          add_class("mw_moved_from_alt_images")
        }
      }
      $(".//img"){
        $("./@id"){
          remove()
        }
        $("./@src"){
          text(){
            replace(/wid=\d+/, "wid=300")
          }
        }
      }
      $("./img[1]"){
        attribute("active", "true")
      }
      $("./img[2]/../.."){
        inject_before("<div ps_button_name='mw_image_carousel' ps_button='prev'></div><div ps_button_name='mw_image_carousel' ps_button='next'></div>")
      }
    }
  }
  $(".//div[@id='zoomerDiv']"){
    attribute("id", "mw_carousel_wrap")
  }
  $("//div[contains(@class, 'pdp_altImages')]"){
    remove()
  }
  
  $("//div[contains(@class, 'pdp_container')]//h1"){
    move_to("//div[@id='pdp_depthpath']", "after")
    inject_after("<div id='mvTitleRating'></div>"){
      insert_top("div", id: "BVRRSummaryContainer2")
      inject_bottom("<div class='mw_clear_both'></div>")
    }
  }
  
  # move bonus offer conent
  $("//div[@id='bonusOffer']"){
    move_to("//h1", "before")
    name("a")
    attribute("href", "#")
    attribute("id", "mw_removed_bonusOfferID")
  }
  
  # pre format bz content
  $(".//div[@id='BVRRContainer']"){

    #accordion content
    attribute("data-ur-id", "mv-review-toggler")
    attribute("data-ur-state", "disabled")
    attribute("data-ur-toggler-component", "content")
    
    wrap("div"){
      add_class("mw_review_wrap")
      
      # inject reviews accordion header
      inject_top("<div class='mw_reviews_header mw_menu_header '><span>read &amp; write reviews</span><div class = 'to_be_sprited-sprite'></div></div>"){
        attribute("data-ur-id", "mv-review-toggler")
        attribute("data-ur-state", "disabled")
        attribute("data-ur-toggler-component", "button")
        inject_bottom("<div></div>"){
          attribute("id", "mw_review_number")
        }
        move_here("//div[@id='BVRRSecondarySummaryContainer']", "bottom")
      }
      insert_bottom("div", id: "mw_write_review_link", data-ur-id: "mv-review-toggler", data-ur-toggler-component: "content", data-ur-state: "disabled") {
        move_here("//div[@id='BVRRSummaryContainer']")
      }
      # email and social accordion
      inject_after("<div><span>share</span><div class = 'to_be_sprited-sprite'></div></div>"){
        attribute("data-ur-id", "mv-social-toggler")
        attribute("data-ur-state", "disabled")
        attribute("data-ur-toggler-component", "button")
        add_class("mw_social_header mw_menu_header")
        wrap("div"){
          add_class("mw_social_wrap")
          inject_bottom("<div></div>"){
            add_class("mw_social_content")
            attribute("data-ur-id", "mv-social-toggler")
            attribute("data-ur-state", "disabled")
            attribute("data-ur-toggler-component", "content")
            move_here("//div[contains(@class, 'pdp_email_wishlist_links')]//div[contains(@class, 'pdp_email_copy')]/a", "bottom")
            $waiting = concat("<div id='mw_social'><div class='mw_spinner'><img src='", asset("/images/waiting.gif"), "'></div><div>")
            inject_top($waiting)
            $("a"){
              inject_top("<div class='mw_email_icon'></div>")
              inject_bottom("<div class='to_be_sprited-rightArrow'></div>")
            }
          }
        }
      }
    }
    # move the write a review link here.
    move_here("//div[@id = 'BVSecondaryCustomerRatings']", "after")
  }
  $("//div[contains(@class, 'mw_review_wrap')]"){
    move_here("//div[contains(@class, 'bl_pdp_productInfo')]", "before")
  }
  
  # style the buttons
  $("//div/input[@id='ADDTOREG_BUTTON']"){
    name("input")
    attribute("value", "add to")
    attribute("type", "button")
    add_class("mvGreyButton mw_registry_button")
  }
  $("//div/div[contains(@class, 'finditinstore')]/img"){
    name("input")
    attribute("value", "find it in store")
    attribute("type", "button")
    add_class("mvGreyButton")
  }
  $("//div/div[@id='pdp_backToBquick']//img"){
    name("input")
    attribute("value", "back to bQuick")
    attribute("type", "button")
    add_class("mvGreyButton")
  }
  $("//div/div[contains(@class, 'pdp_add_to_bag')]/input[@id='ADDTOBAG_BUTTON']"){
    wrap("div"){
      add_class("mw_bag_button")
      inject_top("<div></div>"){
        add_class("mw_bag_img")
        add_class("sprite_cat-BB")
      }
    }
    name("input")
    attribute("value", "add to brown bag")
    attribute("type", "submit")
    add_class("mvButton")
  }
  
  # hide invisable product selections
  $("//div[contains(@class, 'pdp_sizecolor_section1')][not(node())] | //div[contains(@class, 'pdp_sizecolor_section2')][not(node())]"){
    add_class("mw_hide")
  }
  
  # product description
  # set toggler for product descriptions
  $("//div[@id='productDescription']"){
    $("./div[contains(@class, 'pdp_productInfo')]"){
      attribute("data-ur-toggler-component", "content")
      attribute("data-ur-id", "mv-discription-toggler")
      attribute("data-ur-state", "disabled")
      inject_bottom("<div class='mvToggleEvent' data-ur-state='disabled' data-ur-toggler-component='button' data-ur-id='mv-discription-toggler'><span class='mvMoreToggle'>More</span><span class='mvLessToggle'>Less</span></div>")
      inject_bottom("<div class='mw_clear_both'></div)")
      move_to("//div[contains(@class, 'mw_review_wrap')]", "before")
      $("./div[contains(@class, 'pdp_longDescription')]"){
        inject_before("<span class='mw_product_details_title'>product details</span>")
      }
    }
  }
  
# }

# add classes for find it in store submit button
$(".//div[@id='cont-frm2']/div[contains(@class, 'submit-btn')]") {
  add_class("mvButton")  
}

$(".//div[contains(@class, 'ovr-infrm')]/following-sibling::div[1][node()]/preceding-sibling::div[1]") {
  add_class("mw_has_or")
  insert_after("div", class: "mw_OR_c") {
    insert_bottom("div", class: "mw_OR") {
      inner("OR")
    }
  }
}
$(".//input[@id='accessRegistryButton' or @id='createRegistryButton']") {
  attributes(src: "", type: "button")
  add_class("mvGreyButton")
}

$(".//div[@class='pdp_atb_main']") {
  move_here("./div[@class='pdp_atb_buttons']/a[@id='pdp_atb_checkout']", "bottom")
  $("./div[@class='pdp_atb_buttons']") {
    inner("CONTINUE SHOPPING")
    add_class("mvGreyButton")
    attribute("id", "pdp_atb_cont_shopping")
  }
  $("./a[@id='pdp_atb_checkout']") {
    inner("CHECKOUT")
    add_class("mvButton")
  }
  $("//form[@id='bedSizeForm']"){
    move_to("//div[@id='productDescription']", "before")
  }
}

# # appending the link so that the cat page works with the splash screen
# # did this in base.ts. Should we transfer the code here in the future?
# # Maybe. That is why I kept it here
#
# $(".//div[@class='bl_breadCrumbContainer']") {
#   log("--> msg")
#   log("--> msg")log("--> msg")log("--> msg")log("--> msg")log("--> msg")log("--> msg")log("--> msg")log("--> msg")log("--> msg")
#   $(".//a[contains(@href, \"id=2910\")]") {
#     attribute("href") {
#       value() {
#         append("?MVwomen=1")
#         # change the last question mark into an ampersand for valid query parameters
#         replace(/(\?.+)\?/, "\\1&")
#       }
#     }
#   }
# }
