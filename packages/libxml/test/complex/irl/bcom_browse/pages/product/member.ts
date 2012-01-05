    $("//div[contains(@class, 'pdp_descriptionAndPrice')]"){
      
      move_to("//div[contains(@class, 'pdp_member_area')]/div/div[contains(@class, 'clearBoth')][1]", "after")
      $("./preceding-sibling::div[contains(@class, 'clearBoth')][1]"){
        add_class("mw_bottom_dots")
      }
    }
    
    $("//div[contains(@class, 'pdp_member_area')]"){
      inject_before("<div class='mw_bottom_dots mw_clear_both' id='mw_selector_devide'></div>")
      # re-arrange the product values
      $("./div/div[contains(@class, 'pdp_sizecolor_section1')]/*/.."){
        move_to("./../div[contains(@class, 'pdp_sizecolor_section2')]", "after")
        inject_before("<div class='mw_bottom_dots mw_clear_both' id='mw_selector_devide'></div>")
      }
      $("./div/div[contains(@class, 'pdp_sizecolor_section1')][not(node())]"){
        add_class("mw_remove_me")
      }
    }
